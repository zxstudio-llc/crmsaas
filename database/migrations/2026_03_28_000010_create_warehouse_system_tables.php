<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('warehouses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->json('contact_address')->nullable();
            $table->boolean('status')->default(true);
            $table->timestamps();
        });

        Schema::create('warehouse_locations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('warehouse_id')->constrained('warehouses')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('warehouse_activities', function (Blueprint $table) {
            $table->id();
            $table->string('activity_type');
            $table->json('data')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('warehouse_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('warehouse_activities');
        Schema::dropIfExists('warehouse_locations');
        Schema::dropIfExists('warehouses');
    }
};