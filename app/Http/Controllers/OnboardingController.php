<?php

namespace App\Http\Controllers;

use App\Actions\SaaS\CreateSubscriptionAction;
use App\Jobs\ProvisionTenantJob;
use App\Models\Plan;
use App\Models\Role;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;

class OnboardingController extends Controller
{
    public function index()
    {
        if (Auth::check()) {
            $user = Auth::user();
            if ($user->tenant_id && $user->tenant) {
                return redirect()->route('tenant.dashboard', ['tenant' => $user->tenant->slug]);
            }
        }

        return Inertia::render('Onboarding/Index', [
            'plans' => Plan::where('active', true)->get(),
        ]);
    }

    public function register(Request $request)
    {
        $planId = $request->input('plan_id');

        return Inertia::render('onboarding/register', [
            'plan' => Plan::find($planId) ?? Plan::first(),
            'plans' => Plan::where('active', true)->get(),
        ]);
    }

    public function store(Request $request, CreateSubscriptionAction $createSubscription)
    {
        $validated = $request->validate([
            'organization_name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:50', 'alpha_dash', 'unique:tenants,slug'],
            'admin_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'min:8', 'confirmed'],
            'plan_id' => ['nullable', 'exists:plans,id'],
            'invite_emails' => ['nullable', 'array'],
            'invite_emails.*' => ['nullable', 'email', 'max:255'],
        ], [
            'email.unique' => 'This email is already registered. Please log in instead.',
            'password.confirmed' => 'The passwords do not match.',
            'slug.unique' => 'This namespace is already taken.',
        ]);

        $slug = Str::slug($validated['slug']);

        // 1. Create Tenant (MUST BE OUTSIDE TRANSACTION FOR PGSQL)
        // PostgreSQL does not allow CREATE DATABASE inside a transaction block.
        $tenant = Tenant::create([
            'id' => $slug,
            'name' => $validated['organization_name'],
            'slug' => $slug,
            'email' => $validated['email'],
            'database' => 'crm_' . str_replace('-', '_', $slug),
            'status' => 'provisioning',
        ]);

        try {
            DB::beginTransaction();

            // 2. Subscription
            if (!empty($validated['plan_id'])) {
                $plan = Plan::find($validated['plan_id']);
                if ($plan) {
                    $createSubscription->execute($tenant, $plan);
                }
            }

            // 3. Admin role
            $role = Role::firstOrCreate([
                'name' => 'Administrator',
            ], [
                'description' => 'Full access to CRM',
                'permission_type' => 'all',
            ]);

            // 4. Central Admin User
            $user = User::create([
                'tenant_id' => $tenant->id,
                'name' => $validated['admin_name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role_id' => $role->id,
                'status' => true,
                'must_change_password' => false,
            ]);

            // 5. Save collaborator invites
            $inviteEmails = collect($request->invite_emails ?? [])
                ->filter(fn($e) => filled($e) && filter_var($e, FILTER_VALIDATE_EMAIL))
                ->reject(fn($e) => strtolower($e) === strtolower($validated['email']))
                ->unique()
                ->values()
                ->toArray();

            DB::commit();
        }
        catch (\Exception $e) {
            DB::rollBack();
            // Clean up the tenant if something failed after creating it, such as user creation.
            $tenant->delete();
            throw $e;
        }

        // 6. Dispatch Provisioning
        ProvisionTenantJob::dispatch($tenant->id, $user->id, $inviteEmails);

        // 7. Auto-login into Central Auth
        Auth::login($user);
        $request->session()->regenerate();

        // 8. Redirect to the UI's provisioning screen as in the ERP
        return redirect()->route('onboarding.signup.show', [
            'tenant' => $tenant->slug,
            'email' => $validated['email'],
            'tempPassword' => $validated['password'],
            // Pass it temporarily to the frontend view exactly like ERP did for the form fill wait screen
        ]);
    }

    public function provisionShow(Request $request)
    {
        $tenant = $request->query('tenant');
        $email = $request->query('email');
        $tempPassword = $request->query('tempPassword');

        return Inertia::render('onboarding/provisioning', [
            'tenant' => $tenant,
            'email' => $email,
            'tempPassword' => $tempPassword,
        ]);
    }
}