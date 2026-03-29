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
        Schema::create('webforms', function (Blueprint $table) {
            $table->id();
            $table->string('form_id')->unique();
            $table->string('title');
            $table->string('submit_button_label')->default('Submit');
            $table->string('submit_success_action')->default('message');
            $table->text('submit_success_content')->nullable();
            $table->string('submit_success_url')->nullable();
            $table->boolean('create_lead')->default(1);
            $table->timestamps();
        });

        Schema::create('webform_attributes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type')->nullable();
            $table->boolean('is_required')->default(0);
            $table->integer('sort_order')->default(0);
            $table->foreignId('webform_id')->constrained('webforms')->onDelete('cascade');
            $table->foreignId('attribute_id')->constrained('attributes')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('webform_attributes');
        Schema::dropIfExists('webforms');
    }
};