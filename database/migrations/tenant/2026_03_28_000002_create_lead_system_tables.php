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
        // 1. Lead Sources
        Schema::create('lead_sources', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        // 2. Lead Types
        Schema::create('lead_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        // 3. Lead Pipelines
        Schema::create('lead_pipelines', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('rotten_days')->default(30);
            $table->boolean('is_default')->default(0);
            $table->timestamps();
        });

        // 4. Lead Stages
        Schema::create('lead_pipeline_stages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->nullable();
            $table->integer('sort_order')->default(0);
            $table->integer('probability')->default(0);
            $table->foreignId('lead_pipeline_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        // 5. Leads
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->double('lead_value')->default(0);
            $table->boolean('status')->default(1);
            $table->text('lost_reason')->nullable();
            $table->date('expected_close_date')->nullable();
            $table->datetime('closed_at')->nullable();

            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->unsignedBigInteger('person_id')->nullable(); // Will link later

            $table->foreignId('lead_source_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('lead_type_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('lead_pipeline_id')->constrained()->onDelete('cascade');
            $table->foreignId('lead_pipeline_stage_id')->constrained()->onDelete('cascade');

            $table->timestamps();

            // Optimización de consultas: Índices en campos clave
            $table->index('status');
            $table->index('lead_pipeline_stage_id');
        });

        // 6. Lead Tags
        Schema::create('lead_tags', function (Blueprint $table) {
            $table->foreignId('lead_id')->constrained()->onDelete('cascade');
            $table->unsignedBigInteger('tag_id'); // Will link later
            $table->primary(['lead_id', 'tag_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lead_tags');
        Schema::dropIfExists('leads');
        Schema::dropIfExists('lead_pipeline_stages');
        Schema::dropIfExists('lead_pipelines');
        Schema::dropIfExists('lead_types');
        Schema::dropIfExists('lead_sources');
    }
};
