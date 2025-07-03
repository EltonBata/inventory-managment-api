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
        Schema::create('deliveries', function (Blueprint $table) {
            $table->uuid('delivery_id')->primary();
            $table->date('delivery_date')->index();
            $table->integer('delivery_quantity');
            $table->date('delivery_expected_date');

            $table->uuid('customer_id');
            $table->foreign('customer_id')->references('customer_id')->on('customers')->cascadeOnDelete();

            $table->uuid('product_id');
            $table->foreign('product_id')->references('product_id')->on('products')->cascadeOnDelete();

            $table->uuid('warehouse_id');
            $table->foreign('warehouse_id')->references('warehouse_id')->on('warehouses')->cascadeOnDelete();
            
            $table->timestamps();
            $table->softDeletes();

            $table->index('customer_id');
            $table->index('product_id');
            $table->index('warehouse_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('deliveries', function (Blueprint $table) {
            $table->dropIndex(['customer_id', 'product_id', 'warehouse_id', 'delivery_date']);
            $table->drop();
        });
    }
};
