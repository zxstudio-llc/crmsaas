<?php
namespace App\Models;
use App\Traits\TenantScoped;
use Illuminate\Database\Eloquent\Model;
use App\Traits\CustomAttribute;
class Quote extends Model {
    use CustomAttribute, TenantScoped;
    protected $fillable = ['subject', 'description', 'billing_address', 'shipping_address', 'sub_total', 'discount_amount', 'tax_amount', 'adjustment_amount', 'grand_total', 'expired_at', 'user_id', 'person_id'];
    protected $casts = ['billing_address' => 'array', 'shipping_address' => 'array', 'expired_at' => 'datetime'];
    protected $with = ['attribute_values', 'items'];
    public function user() { return $this->belongsTo(User::class); }
    public function person() { return $this->belongsTo(Person::class); }
    public function items() { return $this->hasMany(QuoteItem::class); }
    public function leads() { return $this->belongsToMany(Lead::class, 'lead_quotes'); }
}
