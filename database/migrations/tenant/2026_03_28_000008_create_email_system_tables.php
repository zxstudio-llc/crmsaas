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
        Schema::create('emails', function (Blueprint $table) {
            $table->id();
            $table->string('subject')->nullable();
            $table->string('source')->nullable();
            $table->string('user_type')->nullable();
            $table->boolean('is_read')->default(0);
            $table->boolean('is_draft')->default(0);
            $table->json('from')->nullable();
            $table->json('to')->nullable();
            $table->json('cc')->nullable();
            $table->json('bcc')->nullable();
            $table->json('sender')->nullable();
            $table->text('unique_id')->nullable();
            $table->text('message_id')->nullable();
            $table->text('reply')->nullable();

            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('person_id')->nullable()->constrained('persons')->onDelete('set null');
            $table->foreignId('lead_id')->nullable()->constrained('leads')->onDelete('set null');

            $table->foreignId('parent_id')->nullable()->constrained('emails')->onDelete('cascade');

            $table->timestamps();

            // Indexes for faster inbox
            $table->index('is_read');
            $table->index('is_draft');
        });

        Schema::create('email_attachments', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('path')->nullable();
            $table->integer('size')->nullable();
            $table->string('content_type')->nullable();
            $table->text('content_id')->nullable();
            $table->foreignId('email_id')->constrained('emails')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('email_tags', function (Blueprint $table) {
            $table->foreignId('email_id')->constrained('emails')->onDelete('cascade');
            $table->unsignedBigInteger('tag_id');
            $table->primary(['email_id', 'tag_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('email_tags');
        Schema::dropIfExists('email_attachments');
        Schema::dropIfExists('emails');
    }
};
