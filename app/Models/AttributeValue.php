<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttributeValue extends Model
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
     * @var array
     */
    protected $fillable = [
        'entity_type',
        'entity_id',
        'attribute_id',
        'text_value',
        'boolean_value',
        'integer_value',
        'float_value',
        'datetime_value',
        'date_value',
        'json_value',
    ];

    /**
     * @var array
     */
    protected $casts = [
        'json_value' => 'array',
    ];

    /**
     * Get the entity associated with the value.
     */
    public function entity()
    {
        return $this->morphTo();
    }

    /**
     * Get the attribute associated with the value.
     */
    public function attribute()
    {
        return $this->belongsTo(Attribute::class);
    }
}
