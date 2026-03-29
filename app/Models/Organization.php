<?php
namespace App\Models;
use App\Traits\TenantScoped;
use Illuminate\Database\Eloquent\Model;
use App\Traits\CustomAttribute;
class Organization extends Model {
    use CustomAttribute, TenantScoped;
    protected $fillable = ['name', 'address', 'user_id'];
    protected $with = ['attribute_values'];
    public function persons() { return $this->hasMany(Person::class); }
    public function user() { return $this->belongsTo(User::class); }
}
