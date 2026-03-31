<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthDiscoveryController extends Controller
{
    public function show()
    {
        return Inertia::render('auth/sign-in-discover', [
            'tenant' => session('tenant'),
        ]);
    }

    public function discover(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
        ]);

        $tenant = Tenant::query()
            ->where('email', $validated['email'])
            ->first();

        if (! $tenant) {
            return back()->withErrors([
                'email' => 'No se encontró ningún espacio de trabajo con este correo electrónico.',
            ]);
        }

        return redirect()->route('auth.sign-in.show')->with('tenant', [
            'slug' => $tenant->slug,
            'name' => $tenant->name ?? $tenant->slug,
        ]);
    }
}
