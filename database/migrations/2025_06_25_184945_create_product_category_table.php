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
        Schema::create('product_category', function (Blueprint $table) {

            $table->uuid('product_id');
            $table->foreign('product_id')->references('product_id')->on('products')->cascadeOnDelete();

            $table->uuid('category_id');
            $table->foreign('category_id')->references('category_id')->on('categories')->cascadeOnDelete();

            $table->primary(['product_id', 'category_id']);
            $table->softDeletes();

            $table->index('product_id');
            $table->index('category_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_category', function (Blueprint $table) {
            $table->dropIndex(['category_id', 'product_id']);
            $table->drop();
        });
    }
};
