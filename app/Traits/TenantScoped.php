<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

trait TenantScoped
{
    public static function bootTenantScoped()
    {
        static::creating(function ($model) {
            if (request()->has('tenant_context')) {
                $model->tenant_id = request()->get('tenant_context')->id;
            }
        });

        static::addGlobalScope('tenant', new class implements Scope {
            public function apply(Builder $builder, Model $model)
            {
                if (request()->has('tenant_context')) {
                    $builder->where('tenant_id', request()->get('tenant_context')->id);
                }
            }
        });
    }
}