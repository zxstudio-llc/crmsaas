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
            abort(404, 'Workspace not found');
        }

        // Bind tenant to request for easy access in controllers and TenantScoped trait
        $request->merge(['tenant_context' => $tenant]);

        // If user is authenticated, ensure they belong to this tenant
        if (Auth::check()) {
            $user = Auth::user();

            if ($user->tenant_id !== $tenant->id) {
                Auth::logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();

                return redirect()->route('login')
                    ->with('error', 'You do not have access to this workspace.');
            }
        }
        else {
            // Not logged in — redirect to login
            return redirect()->route('login')
                ->with('intended', $request->url());
        }

        return $next($request);
    }
}