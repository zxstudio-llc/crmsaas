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
        Schema::create('workflows', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('entity_type');
            $table->string('event');
            $table->json('condition_type')->nullable();
            $table->json('conditions')->nullable();
            $table->json('actions')->nullable();
            $table->boolean('status')->default(1);
            $table->timestamps();
        });

        Schema::create('webhooks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('entity_type');
            $table->string('event');
            $table->string('url');
            $table->string('method')->default('POST');
            $table->json('headers')->nullable();
            $table->boolean('status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('webhooks');
        Schema::dropIfExists('workflows');
    }
};
