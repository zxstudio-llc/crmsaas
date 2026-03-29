<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class State extends Model {
    protected $table = 'country_states';
    protected $fillable = ['country_code', 'code', 'default_name', 'country_id'];
    public function country() { return $this->belongsTo(Country::class); }
}
