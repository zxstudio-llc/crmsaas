<?php
namespace App\Models;
use App\Traits\TenantScoped;
use Illuminate\Database\Eloquent\Model;
class Stage extends Model {
    protected $table = 'lead_pipeline_stages';
    protected $fillable = ['name', 'code', 'sort_order', 'lead_pipeline_id', 'probability'];
    public function leads() { return $this->hasMany(Lead::class, 'lead_pipeline_stage_id'); }
    public function pipeline() { return $this->belongsTo(Pipeline::class, 'lead_pipeline_id'); }
}
