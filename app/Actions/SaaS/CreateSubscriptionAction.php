<?php

namespace App\Actions\SaaS;

use App\Models\Plan;
use App\Models\Subscription;
use App\Models\Tenant;

class CreateSubscriptionAction
{
    public function execute(Tenant $tenant, Plan $plan): Subscription
    {
        return Subscription::create([
            'tenant_id' => $tenant->id,
            'plan_id' => $plan->id,
            'status' => 'trial',
            'started_at' => now(),
            'ends_at' => now()->addDays(14),
        ]);
    }
}
