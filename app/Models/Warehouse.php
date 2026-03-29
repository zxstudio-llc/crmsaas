<?php
namespace App\Models;
use App\Traits\TenantScoped;
use Illuminate\Database\Eloquent\Model;
class Warehouse extends Model {
    protected $fillable = ['name', 'description', 'contact_address', 'status'];
    protected $casts = ['contact_address' => 'array', 'status' => 'boolean'];
    public function locations() { return $this->hasMany(WarehouseLocation::class); }
}
