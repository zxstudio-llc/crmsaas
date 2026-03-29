<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Type extends Model {
    protected $table = 'lead_types';
    protected $fillable = ['name'];
}
