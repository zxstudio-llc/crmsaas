<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class MarketingEvent extends Model {
    protected $fillable = ['name', 'event', 'actions', 'status'];
    protected $casts = ['actions' => 'array', 'status' => 'boolean'];
}
