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
        Schema::create('products', function (Blueprint $table) {
            $table->uuid('product_id')->primary();
            $table->string('product_code');
            $table->string('product_bar_code');
            $table->string('product_name');
            $table->text('product_description');
            $table->integer('product_reorder_quantity');
            $table->decimal('product_packed_height', 10);
            $table->decimal('product_packed_weight', 10);
            $table->decimal('product_packed_depth', 10);
            $table->boolean('product_refrigereted');
            $table->timestamps();

            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
