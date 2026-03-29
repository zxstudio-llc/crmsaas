<?php

namespace App\Models;
use App\Traits\TenantScoped;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Traits\CustomAttribute;

class Lead extends Model
{
    use CustomAttribute, TenantScoped;

    /**
     * @var array
     */
    protected $fillable = [
        'title',
        'description',
        'lead_value',
        'status',
        'lost_reason',
        'expected_close_date',
        'closed_at',
        'user_id',
        'person_id',
        'lead_source_id',
        'lead_type_id',
        'lead_pipeline_id',
        'lead_pipeline_stage_id',
    ];

    /**
     * @var array
     */
    protected $casts = [
        'closed_at' => 'datetime:D M d, Y H:i A',
        'expected_close_date' => 'date:Y-m-d',
    ];

    /**
     * @var array
     */
    protected $appends = [
        'rotten_days',
    ];

    /**
     * Always eager load these relations to optimize performance and reach microsecond response.
     * 
     * @var array
     */
    protected $with = [
        'attribute_values',
        'pipeline',
        'stage',
        'source',
        'type'
    ];

    /**
     * Get the user that owns the lead.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the person that owns the lead.
     */
    public function person(): BelongsTo
    {
        return $this->belongsTo(Person::class);
    }

    /**
     * Get the type that owns the lead.
     */
    public function type(): BelongsTo
    {
        return $this->belongsTo(Type::class, 'lead_type_id');
    }

    /**
     * Get the source that owns the lead.
     */
    public function source(): BelongsTo
    {
        return $this->belongsTo(Source::class, 'lead_source_id');
    }

    /**
     * Get the pipeline that owns the lead.
     */
    public function pipeline(): BelongsTo
    {
        return $this->belongsTo(Pipeline::class, 'lead_pipeline_id');
    }

    /**
     * Get the pipeline stage that owns the lead.
     */
    public function stage(): BelongsTo
    {
        return $this->belongsTo(Stage::class, 'lead_pipeline_stage_id');
    }

    /**
     * Get the activities.
     */
    public function activities(): BelongsToMany
    {
        return $this->belongsToMany(Activity::class, 'lead_activities');
    }

    /**
     * Get the products.
     */
    public function products(): HasMany
    {
        return $this->hasMany(LeadProduct::class);
    }

    /**
     * The quotes that belong to the lead.
     */
    public function quotes(): BelongsToMany
    {
        return $this->belongsToMany(Quote::class, 'lead_quotes');
    }

    /**
     * The tags that belong to the lead.
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'lead_tags');
    }

    /**
     * Returns the rotten days
     */
    public function getRottenDaysAttribute()
    {
        if (! $this->stage) {
            return 0;
        }

        if (in_array($this->stage->code, ['won', 'lost'])) {
            return 0;
        }

        if (! $this->created_at) {
            return 0;
        }

        $rottenDays = $this->pipeline?->rotten_days ?? 0;
        $rottenDate = $this->created_at->addDays($rottenDays);

        return $rottenDate->diffInDays(Carbon::now(), false);
    }
}
