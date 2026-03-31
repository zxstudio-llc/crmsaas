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
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('type');
            $table->text('location')->nullable();
            $table->text('comment')->nullable();
            $table->text('additional')->nullable();
            $table->datetime('schedule_from')->nullable();
            $table->datetime('schedule_to')->nullable();
            $table->boolean('is_done')->default(0);
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });

        Schema::create('activity_participants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('activity_id')->constrained('activities')->onDelete('cascade');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('person_id')->nullable();
            $table->timestamps();
        });

        Schema::create('activity_files', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('path');
            $table->foreignId('activity_id')->constrained('activities')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('lead_activities', function (Blueprint $table) {
            $table->foreignId('lead_id')->constrained('leads')->onDelete('cascade');
            $table->foreignId('activity_id')->constrained('activities')->onDelete('cascade');
            $table->primary(['lead_id', 'activity_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lead_activities');
        Schema::dropIfExists('activity_files');
        Schema::dropIfExists('activity_participants');
        Schema::dropIfExists('activities');
    }
};
