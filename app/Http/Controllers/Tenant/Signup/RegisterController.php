<?php

namespace App\Http\Controllers\Tenant\Signup;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class RegisterController extends Controller
{
    public function show(Request $request)
    {
        abort_if(! tenant(), 404);

        return Inertia::render('tenant/register', [
            'email' => (string) $request->query('email'),
            'tenant' => tenant('slug'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::where('email', $validated['email'])->firstOrFail();
        $user->update(['password' => Hash::make($validated['password'])]);

        Auth::login($user);

        return redirect()->route('tenant.dashboard', ['tenant' => tenant('slug')]);
    }
}
