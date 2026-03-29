<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class QuoteItem extends Model {
    protected $fillable = ['sku', 'name', 'quantity', 'price', 'total', 'quote_id', 'product_id'];
    public function quote() { return $this->belongsTo(Quote::class); }
    public function product() { return $this->belongsTo(Product::class); }
}
