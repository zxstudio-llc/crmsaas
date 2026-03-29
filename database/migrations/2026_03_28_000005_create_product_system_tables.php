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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('sku')->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->integer('quantity')->default(0);
            $table->double('price', 15, 2)->default(0);
            $table->timestamps();
        });

        Schema::create('product_tags', function (Blueprint $table) {
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->unsignedBigInteger('tag_id');
            $table->primary(['product_id', 'tag_id']);
        });

        Schema::create('lead_products', function (Blueprint $table) {
            $table->id();
            $table->string('sku')->nullable();
            $table->string('name')->nullable();
            $table->integer('quantity')->default(1);
            $table->double('price', 15, 2)->default(0);
            $table->double('amount', 15, 2)->default(0);
            $table->foreignId('lead_id')->constrained('leads')->onDelete('cascade');
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lead_products');
        Schema::dropIfExists('product_tags');
        Schema::dropIfExists('products');
    }
};