<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class WebFormAttribute extends Model {
    protected $fillable = ['name', 'type', 'is_required', 'sort_order', 'webform_id', 'attribute_id'];
    public function webform() { return $this->belongsTo(WebForm::class); }
    public function attribute() { return $this->belongsTo(Attribute::class); }
}
