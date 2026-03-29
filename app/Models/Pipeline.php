<?php

namespace App\Models;
use App\Traits\TenantScoped;

use Illuminate\Database\Eloquent\Model;

class Pipeline extends Model
{
    protected $table = 'lead_pipelines';

    /**
     * @var array
     */
    protected $fillable = [
        'name',
        'rotten_days',
        'is_default',
    ];

    /**
     * Get the leads.
     */
    public function leads()
    {
        return $this->hasMany(Lead::class, 'lead_pipeline_id');
    }

    /**
     * Get the stages that owns the pipeline.
     */
    public function stages()
    {
        return $this->hasMany(Stage::class, 'lead_pipeline_id')->orderBy('sort_order', 'ASC');
    }
}
