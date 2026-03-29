<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class ActivityParticipant extends Model {
    protected $fillable = ['activity_id', 'user_id', 'person_id'];
    public function activity() { return $this->belongsTo(Activity::class); }
    public function user() { return $this->belongsTo(User::class); }
    public function person() { return $this->belongsTo(Person::class); }
}
