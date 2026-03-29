<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Webhook extends Model {
    protected $fillable = ['name', 'entity_type', 'event', 'url', 'method', 'headers', 'status'];
    protected $casts = ['headers' => 'array', 'status' => 'boolean'];
}
