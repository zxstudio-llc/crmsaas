<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LeadProduct extends Model
{
    protected $table = 'lead_products';

    protected $fillable = [
        'sku',
        'name',
        'quantity',
        'price',
        'amount',
        'product_id',
        'lead_id',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function lead()
    {
        return $this->belongsTo(Lead::class);
    }
}
