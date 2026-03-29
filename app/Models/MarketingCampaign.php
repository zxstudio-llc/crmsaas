<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class MarketingCampaign extends Model {
    protected $fillable = ['name', 'subject', 'content', 'status', 'scheduled_at'];
    protected $casts = ['scheduled_at' => 'datetime'];
}
