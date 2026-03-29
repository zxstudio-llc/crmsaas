<?php

namespace App\Models;
use App\Traits\TenantScoped;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Activity extends Model
{
    /**
     * @var array
     */
    protected $fillable = [
        'title',
        'type',
        'location',
        'comment',
        'additional',
        'schedule_from',
        'schedule_to',
        'is_done',
        'user_id',
    ];

    /**
     * @var array
     */
    protected $casts = [
        'schedule_from' => 'datetime',
        'schedule_to'   => 'datetime',
        'is_done'       => 'boolean',
    ];

    /**
     * Get the user that created the activity.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the participants.
     */
    public function participants(): HasMany
    {
        return $this->hasMany(ActivityParticipant::class);
    }

    /**
     * Get the files.
     */
    public function files(): HasMany
    {
        return $this->hasMany(ActivityFile::class);
    }

    /**
     * The leads that belong to the activity.
     */
    public function leads(): BelongsToMany
    {
        return $this->belongsToMany(Lead::class, 'lead_activities');
    }

    /**
     * The persons that belong to the activity.
     */
    public function persons(): BelongsToMany
    {
        return $this->belongsToMany(Person::class, 'activity_participants', 'activity_id', 'person_id');
    }
}
