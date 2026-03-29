<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttributeOption extends Model
{
    /**
     * @var array
     */
    protected $fillable = [
        'name',
        'attribute_id',
    ];

    /**
     * Get the attribute that owns the option.
     */
    public function attribute()
    {
        return $this->belongsTo(Attribute::class);
    }
}
