<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\QuoteController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\WarehouseController;
use App\Http\Controllers\PipelineController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\OnboardingController;
use Inertia\Inertia;


// Central / Home / Onboarding
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::prefix('onboarding')->name('onboarding.')->group(function () {
    Route::get('/', [OnboardingController::class , 'index'])->name('index');
    Route::post('/', [OnboardingController::class , 'store'])->name('store');
});

// SaaS Tenant Context Routes
Route::prefix('{tenant}')->middleware(['tenant.auth'])->group(function () {
    Route::middleware(['auth', 'verified'])->group(function () {
            // Dashboard & Search
            Route::get('/dashboard', [DashboardController::class , 'index'])->name('tenant.dashboard');
            Route::get('/search', SearchController::class)->name('tenant.search');

            // CRM Core Modules
            Route::resource('leads', LeadController::class)->names('tenant.leads');
            Route::resource('persons', PersonController::class)->names('tenant.persons');
            Route::resource('organizations', OrganizationController::class)->names('tenant.organizations');
            Route::resource('products', ProductController::class)->names('tenant.products');
            Route::resource('quotes', QuoteController::class)->names('tenant.quotes');
            Route::resource('activities', ActivityController::class)->names('tenant.activities');
            Route::resource('emails', EmailController::class)->names('tenant.emails');
            Route::resource('warehouses', WarehouseController::class)->names('tenant.warehouses');

            // Configurations
            Route::resource('pipelines', PipelineController::class)->names('tenant.pipelines');
            Route::get('settings', [SettingsController::class , 'index'])->name('tenant.settings.index');
            Route::post('settings/attribute', [SettingsController::class , 'storeAttribute'])->name('tenant.settings.attribute.store');
            Route::post('settings/workflow', [SettingsController::class , 'storeWorkflow'])->name('tenant.settings.workflow.store');
        }
        );

    // Tenant Login (Fortify usually uses direct routes, but we wrap them for context if needed)
    });

require __DIR__ . '/settings.php'; // Profile settings etc.
// require __DIR__.'/auth.php'; // If it doesn't exist, we'll check where it is.