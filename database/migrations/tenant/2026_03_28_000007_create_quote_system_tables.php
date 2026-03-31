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
        Schema::create('quotes', function (Blueprint $table) {
            $table->id();
            $table->string('subject');
            $table->text('description')->nullable();
            $table->json('billing_address')->nullable();
            $table->json('shipping_address')->nullable();
            $table->double('sub_total')->default(0);
            $table->double('discount_amount')->default(0);
            $table->double('tax_amount')->default(0);
            $table->double('adjustment_amount')->default(0);
            $table->double('grand_total')->default(0);
            $table->datetime('expired_at')->nullable();

            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('person_id')->constrained('persons')->onDelete('cascade');

            $table->timestamps();
        });

        Schema::create('quote_items', function (Blueprint $table) {
            $table->id();
            $table->string('sku')->nullable();
            $table->string('name')->nullable();
            $table->integer('quantity')->default(1);
            $table->double('price', 15, 2)->default(0);
            $table->double('total', 15, 2)->default(0);

            $table->foreignId('quote_id')->constrained('quotes')->onDelete('cascade');
            $table->unsignedBigInteger('product_id')->nullable();
            $table->timestamps();
        });

        Schema::create('lead_quotes', function (Blueprint $table) {
            $table->foreignId('lead_id')->constrained('leads')->onDelete('cascade');
            $table->foreignId('quote_id')->constrained('quotes')->onDelete('cascade');
            $table->primary(['lead_id', 'quote_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lead_quotes');
        Schema::dropIfExists('quote_items');
        Schema::dropIfExists('quotes');
    }
};
