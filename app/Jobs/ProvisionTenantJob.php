<?php

namespace App\Jobs;

use App\Models\Tenant;
use App\Models\WorkspaceInvite;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Str;

class ProvisionTenantJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @param  int  $adminId  El ID del usuario que invita (en la DB central)
     * @param  array  $inviteEmails  Lista de correos a invitar
     */
    public function __construct(
        protected string $tenantId,
        protected int $adminId,
        protected array $inviteEmails = []
    ) {}

    public function handle(): void
    {
        set_time_limit(600);

        $tenant = Tenant::find($this->tenantId);

        if (! $tenant) {
            return;
        }

        Artisan::call('tenants:migrate', ['--tenants' => [$tenant->id], '--force' => true]);

        if (class_exists('TenantDatabaseSeeder')) {
            try {
                Artisan::call('tenants:seed', ['--tenants' => [$tenant->id], '--class' => 'TenantDatabaseSeeder', '--force' => true]);
            } catch (\Exception $e) {
                // Ignore seeding errors if seeder isn't fully set up yet
            }
        }

        $tenant->run(function () {
            foreach ($this->inviteEmails as $email) {
                WorkspaceInvite::create([
                    // NOTA: Aquí YA NO usamos tenant_id porque estamos dentro de la DB del tenant
                    'invited_by' => $this->adminId,
                    'email' => strtolower($email),
                    'role' => 'member',
                    'token' => Str::random(40),
                    'status' => 'pending',
                    'expires_at' => now()->addDays(7),
                ]);
            }
        });

        $tenant->update(['status' => 'active']);
    }
}
