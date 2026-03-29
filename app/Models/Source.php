<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Source extends Model {
    protected $table = 'lead_sources';
    protected $fillable = ['name'];
}
