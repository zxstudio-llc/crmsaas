<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('core_config', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->text('value')->nullable();
            $table->timestamps();
        });

        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->char('code', 2)->unique();
            $table->string('name');
            $table->string('status')->default('1');
            $table->timestamps();
        });

        Schema::create('country_states', function (Blueprint $table) {
            $table->id();
            $table->char('country_code', 2);
            $table->string('code')->nullable();
            $table->string('default_name')->nullable();
            $table->foreignId('country_id')->constrained('countries')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('country_states');
        Schema::dropIfExists('countries');
        Schema::dropIfExists('core_config');
    }
};
