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
            $table->foreignId('provider_id')->constrained('providers', 'provider_id')->cascadeOnDelete();
            $table->foreignId('product_id')->constrained('products', 'product_id')->cascadeOnDelete();
            $table->foreignId('warehouse_id')->constrained('warehouses', 'warehouse_id')->cascadeOnDelete();
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
