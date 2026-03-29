<?php

namespace App\Traits;

use App\Models\Attribute;
use App\Models\AttributeValue;
use Illuminate\Support\Facades\Cache;

trait CustomAttribute
{
    /**
     * @var array
     */
    public static $attributeTypeFields = [
        'text' => 'text_value',
        'textarea' => 'text_value',
        'price' => 'float_value',
        'boolean' => 'boolean_value',
        'select' => 'integer_value',
        'multiselect' => 'text_value',
        'checkbox' => 'text_value',
        'email' => 'json_value',
        'address' => 'json_value',
        'phone' => 'json_value',
        'lookup' => 'integer_value',
        'datetime' => 'datetime_value',
        'date' => 'date_value',
        'file' => 'text_value',
        'image' => 'text_value',
    ];

    /**
     * Get the attribute values that owns the entity.
     */
    public function attribute_values()
    {
        return $this->morphMany(AttributeValue::class, 'entity');
    }

    /**
     * Get an attribute from the model.
     *
     * @param  string  $key
     * @return mixed
     */
    public function getAttribute($key)
    {
        if (! method_exists(static::class, $key) && ! isset($this->attributes[$key])) {
            if (isset($this->id)) {
                $attribute = $this->getCachedAttributes()->where('code', $key)->first();
                if ($attribute) {
                    return $this->getCustomAttributeValue($attribute);
                }
            }
        }

        return parent::getAttribute($key);
    }

    /**
     * @return array
     */
    public function attributesToArray()
    {
        $attributes = parent::attributesToArray();
        $hiddenAttributes = $this->getHidden();

        if (isset($this->id)) {
            foreach ($this->getCachedAttributes() as $attribute) {
                if (in_array($attribute->code, $hiddenAttributes)) {
                    continue;
                }
                $attributes[$attribute->code] = $this->getCustomAttributeValue($attribute);
            }
        }

        return $attributes;
    }

    /**
     * Get cached attributes for the entity type.
     *
     * @return \Illuminate\Support\Collection
     */
    protected function getCachedAttributes()
    {
        $table = $this->getTable();
        return Cache::rememberForever("attributes_{$table}", function () use ($table) {
            return Attribute::where('entity_type', $table)->get();
        });
    }

    /**
     * Get a custom attribute value.
     *
     * @param  Attribute  $attribute
     * @return mixed
     */
    public function getCustomAttributeValue($attribute)
    {
        if (! $attribute) {
            return null;
        }

        // Use relation if already loaded to avoid extra queries
        $value = $this->attribute_values->where('attribute_id', $attribute->id)->first();
        if (!$value) {
            return null;
        }

        $fieldName = self::$attributeTypeFields[$attribute->type] ?? 'text_value';
        return $value->{$fieldName};
    }

    /**
     * Boot the trait.
     */
    protected static function bootCustomAttribute()
    {
        static::deleting(function ($entity) {
            $entity->attribute_values()->delete();
        });
    }
}
