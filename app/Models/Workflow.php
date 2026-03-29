<?php
namespace App\Models;
use App\Traits\TenantScoped;
use Illuminate\Database\Eloquent\Model;
class Workflow extends Model {
    protected $fillable = ['name', 'description', 'entity_type', 'event', 'condition_type', 'conditions', 'actions', 'status'];
    protected $casts = ['conditions' => 'array', 'actions' => 'array', 'condition_type' => 'array', 'status' => 'boolean'];
}
