<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OnboardingController extends Controller
{
    public function index()
    {
        // If already authenticated, redirect to their dashboard
        if (Auth::check()) {
            $user = Auth::user();
            if ($user->tenant) {
                return redirect()->route('tenant.dashboard', ['tenant' => $user->tenant->slug]);
            }
        }

        return Inertia::render('Onboarding/Index', [
            'plans' => [
                ['id' => 'free', 'name' => 'Free', 'price' => 0],
                ['id' => 'pro', 'name' => 'Pro', 'price' => 29],
                ['id' => 'enterprise', 'name' => 'Enterprise', 'price' => 99],
            ]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'organization_name' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'admin_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|confirmed',
        ]);

        return DB::transaction(function () use ($request) {
            // 1. Generate unique slug
            $slug = Str::slug($request->slug);
            $originalSlug = $slug;
            $counter = 1;
            while (Tenant::where('slug', $slug)->exists()) {
                $slug = $originalSlug . '-' . $counter++;
            }

            // 2. Create Tenant
            $tenant = Tenant::create([
                'name' => $request->organization_name,
                'slug' => $slug,
                'email' => $request->email,
                'plan' => $request->plan ?? 'free',
            ]);

            // 3. Create Default Admin Role for Tenant
            $role = Role::create([
                'name' => 'Administrator',
                'description' => 'Full access to CRM',
                'permission_type' => 'all',
            ]);

            // 4. Create First User (Owner)
            $user = User::create([
                'tenant_id' => $tenant->id,
                'name' => $request->admin_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role_id' => $role->id,
                'status' => true,
            ]);

            // 5. Auto-login the new user
            Auth::login($user);

            // 6. Regenerate session to prevent session fixation
            $request->session()->regenerate();

            // 7. Redirect to their new tenant dashboard
            return redirect()->route('tenant.dashboard', ['tenant' => $tenant->slug])
                ->with('success', 'Welcome to ListenUp! Your CRM is ready.');
        });
    }
}