<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Tenant;
use Illuminate\Support\Facades\Auth;

class AuthenticateTenant
{
    public function handle(Request $request, Closure $next): Response
    {
        $tenantSlug = $request->route('tenant');

        if (!$tenantSlug) {
            return redirect()->route('onboarding.index');
        }

        $tenant = Tenant::where('slug', $tenantSlug)->first();

        if (!$tenant) {
            abort(404, 'Tenant not found');
        }

        // Bind tenant to request for easy access
        $request->merge(['tenant_context' => $tenant]);

        // Ensure user belongs to this tenant if logged in
        if (Auth::check() && Auth::user()->tenant_id !== $tenant->id) {
            Auth::logout();
            return redirect()->route('login', ['tenant' => $tenantSlug]);
        }

        return $next($request);
    }
}
