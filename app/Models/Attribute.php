<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    /**
     * @var array
     */
    protected $fillable = [
        'code',
        'name',
        'type',
        'lookup_type',
        'entity_type',
        'sort_order',
        'validation',
        'is_required',
        'is_unique',
        'quick_add',
        'is_user_defined',
    ];

    /**
     * Get the options for the attribute.
     */
    public function options()
    {
        return $this->hasMany(AttributeOption::class);
    }
}
