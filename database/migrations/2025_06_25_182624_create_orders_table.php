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
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('order_id')->primary();
            $table->date('order_date')->index();
            $table->integer('order_quantity');
            $table->date('order_expected_date');

            $table->uuid('provider_id');
            $table->foreign('provider_id')->references('provider_id')->on('providers')->cascadeOnDelete();

            $table->uuid('product_id');
            $table->foreign('product_id')->references('product_id')->on('products')->cascadeOnDelete();

            $table->uuid('warehouse_id');
            $table->foreign('warehouse_id')->references('warehouse_id')->on('warehouses')->cascadeOnDelete();
            
            $table->timestamps();
            $table->softDeletes();

            $table->index('provider_id');
            $table->index('product_id');
            $table->index('warehouse_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropIndex(['provider_id', 'product_id', 'warehouse_id', 'order_date']);
            $table->drop();
        });
    }
};
