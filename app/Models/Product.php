<?php

namespace App\Models;
use App\Traits\TenantScoped;

use Illuminate\Database\Eloquent\Model;
use App\Traits\CustomAttribute;

class Product extends Model
{
    use CustomAttribute, TenantScoped;

    protected $fillable = [
        'sku',
        'name',
        'description',
        'quantity',
        'price',
    ];

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'product_tags');
    }

    public function leads()
    {
        return $this->belongsToMany(Lead::class, 'lead_products')
            ->withPivot('sku', 'name', 'quantity', 'price', 'amount')
            ->withTimestamps();
    }
}
