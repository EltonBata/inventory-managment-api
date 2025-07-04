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
        Schema::create('inventories', function (Blueprint $table) {
            $table->uuid('inventory_id')->primary();
            $table->integer('inventory_quantity_available');
            $table->integer('inventory_maximum_stock_level');
            $table->integer('inventory_minimum_stock_level');
            $table->integer('inventory_reorder_point');

            $table->uuid('product_id');
            $table->foreign('product_id')->references('product_id')->on('products')->cascadeOnDelete();

            $table->uuid('warehouse_id');
            $table->foreign('warehouse_id')->references('warehouse_id')->on('warehouses')->cascadeOnDelete();

            $table->timestamps();
            $table->softDeletes();

            $table->index('product_id');
            $table->index('warehouse_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('inventories', function (Blueprint $table) {
            $table->dropIndex(['warehouse_id', 'product_id']);
            $table->drop();
        });
    }
};
