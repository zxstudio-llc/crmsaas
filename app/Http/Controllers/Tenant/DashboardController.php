<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = auth()->user();

        return Inertia::render('tenant/dashboard', [
            'auth' => ['user' => $user],
            'mustChangePassword' => (bool) $user->must_change_password,
            'stats' => [
                'active_customers' => 0,
            ],
            'environment' => config('app.env') === 'production' ? 'production' : 'test',
        ]);
    }
}
