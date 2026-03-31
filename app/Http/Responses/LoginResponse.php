<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request)
    {
        $user = $request->user();

        // 1. Intentamos obtener el slug a través de la relación
        // Usamos el null-safe operator (?->) para evitar el crash
        $tenantSlug = $user->tenant?->slug;

        // 2. Si el usuario tiene un tenant, redirigimos al dashboard del tenant
        if ($tenantSlug) {
            return redirect()->route('tenant.dashboard', ['tenant' => $tenantSlug]);
        }

        // 3. Fallback: Si no tiene tenant, mándalo al onboarding o al home central
        return redirect()->route('onboarding.index');
    }
}
