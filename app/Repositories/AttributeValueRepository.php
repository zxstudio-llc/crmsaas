<?php

namespace App\Repositories;

use App\Models\Attribute;
use App\Models\AttributeValue;
use Carbon\Carbon;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class AttributeValueRepository
{
    /**
     * Save attribute values for an entity.
     *
     * @param  array  $data
     * @param  mixed  $entity
     * @return void
     */
    public function save(array $data, $entity): void
    {
        $entityType = $entity->getTable();
        $attributes = Attribute::where('entity_type', $entityType)->get();

        foreach ($attributes as $attribute) {
            if (! array_key_exists($attribute->code, $data)) {
                continue;
            }

            $value = $data[$attribute->code];
            $typeColumn = AttributeValue::$attributeTypeFields[$attribute->type] ?? 'text_value';

            // Sanitize values
            if ($attribute->type === 'boolean') {
                $value = $value ? 1 : 0;
            } elseif ($attribute->type === 'multiselect' || $attribute->type === 'checkbox') {
                $value = is_array($value) ? implode(',', $value) : $value;
            } elseif ($attribute->type === 'image' || $attribute->type === 'file') {
                $value = $value instanceof UploadedFile
                    ? $value->store($entityType . '/' . $entity->id)
                    : $value;
            }

            AttributeValue::updateOrCreate(
                [
                    'entity_type'  => $entityType,
                    'entity_id'    => $entity->id,
                    'attribute_id' => $attribute->id,
                ],
                [
                    $typeColumn => $value,
                ]
            );
        }
    }
}
