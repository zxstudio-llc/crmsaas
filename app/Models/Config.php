<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Config extends Model {
    protected $table = 'core_config';
    protected $fillable = ['code', 'value'];
}
