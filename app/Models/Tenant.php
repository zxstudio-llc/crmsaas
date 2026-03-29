<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    protected $fillable = ['name', 'slug', 'email', 'plan', 'trial_ends_at'];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
