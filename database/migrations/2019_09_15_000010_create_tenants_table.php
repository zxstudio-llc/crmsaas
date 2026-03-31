<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTenantsTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tenants', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('name')->nullable();
            $table->string('email')->unique()->nullable();
            $table->string('slug')->unique();
            // $table->string('dni')->unique()->nullable();
            $table->string('company_name')->nullable();
            $table->string('database')->nullable();
            $table->string('plan')->default('free');
            $table->timestamp('trial_ends_at')->nullable();
            $table->enum('status', ['provisioning', 'pending', 'active', 'suspended'])->default('provisioning');
            $table->softDeletes();
            $table->timestamps();
            $table->json('data')->nullable();

            $table->index('slug');
            $table->index('status');
        });

        // Add tenant_id to users
        Schema::table('users', function (Blueprint $table) {
            $table->string('tenant_id')->nullable()->after('id');
            $table->foreign('tenant_id')->references('id')->on('tenants')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['tenant_id']);
            $table->dropColumn('tenant_id');
        });
        Schema::dropIfExists('tenants');
    }
}
