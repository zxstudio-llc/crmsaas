<?php

declare(strict_types=1);

use App\Http\Controllers\Tenant\AuthController;
use App\Http\Controllers\Tenant\DashboardController;
use App\Http\Controllers\Tenant\ForcedPasswordController;
use App\Http\Controllers\Tenant\Settings\PasswordController;
use App\Http\Controllers\Tenant\Settings\ProfileController;
use App\Http\Controllers\Tenant\Signup\RegisterController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
// use App\Http\Controllers\Tenant\Settings\TwoFactorAuthenticationController;
use Stancl\Tenancy\Middleware\InitializeTenancyByPath;

Route::group([
    'prefix' => '{tenant}',
    'middleware' => ['web', InitializeTenancyByPath::class],
    'as' => 'tenant.',
], function () {
    Route::group(['prefix' => 'sign-in', 'as' => 'sign-in.'], function () {
        Route::get('/', [AuthController::class, 'showLogin'])->name('show');
        Route::post('/', [AuthController::class, 'login']);
    }
    );
    Route::get('/sign-up', [RegisterController::class, 'show'])->name('sign-up.show');
    Route::post('/sign-up', [RegisterController::class, 'store'])->name('sign-up.store');
    Route::group(['prefix' => 'password', 'as' => 'password.'], function () {
        Route::put('/force', [ForcedPasswordController::class, 'update'])->name('force.update');
    }
    );

    Route::group(['middleware' => ['tenant.auth', 'tenant.active', 'tenant.provisions', 'force.password.change']], function () {

        Route::get('/dashboard', DashboardController::class)->name('dashboard');

        Route::group(['prefix' => 'settings', 'as' => 'settings.'], function () {
            Route::redirect('settings', '/profile');
            Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
            Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
            Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

            Route::get('/password', [PasswordController::class, 'edit'])->name('user-password.edit');

            Route::put('/password', [PasswordController::class, 'update'])
                ->middleware('throttle:6,1')
                ->name('user-password.update');

            Route::get('/appearance', function () {
                return Inertia::render('settings/appearance');
            }
            )->name('appearance.edit');

            // Route::get('/two-factor', [TwoFactorAuthenticationController::class, 'show'])
            //     ->name('two-factor.show');
        }
        );
    }
    );
});
