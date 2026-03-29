<?php
namespace App\Models;
use App\Traits\TenantScoped;
use Illuminate\Database\Eloquent\Model;
use App\Traits\CustomAttribute;
class Person extends Model {
    use CustomAttribute, TenantScoped;
    protected $fillable = ['name', 'emails', 'contact_numbers', 'job_title', 'organization_id', 'user_id', 'unique_id'];
    protected $casts = ['emails' => 'array', 'contact_numbers' => 'array'];
    protected $with = ['attribute_values', 'organization'];
    public function organization() { return $this->belongsTo(Organization::class); }
    public function user() { return $this->belongsTo(User::class); }
    public function leads() { return $this->hasMany(Lead::class); }
    public function tags() { return $this->belongsToMany(Tag::class, 'person_tags'); }
}
