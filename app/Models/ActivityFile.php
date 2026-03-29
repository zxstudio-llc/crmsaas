<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class ActivityFile extends Model {
    protected $fillable = ['name', 'path', 'activity_id'];
    public function activity() { return $this->belongsTo(Activity::class); }
}
