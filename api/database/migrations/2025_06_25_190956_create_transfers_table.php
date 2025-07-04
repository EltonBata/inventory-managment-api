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
        Schema::create('transfers', function (Blueprint $table) {
            $table->uuid('transfer_id')->primary();
            $table->integer('transfer_quantity');
            $table->date('transfer_sent_date')->index();
            $table->date('transfer_received_date')->index();

            $table->uuid('product_id');
            $table->foreign('product_id')->references('product_id')->on('products')->cascadeOnDelete();

            $table->uuid('source_warehouse_id');
            $table->foreign('source_warehouse_id')->references('warehouse_id')->on('warehouses')->cascadeOnDelete();

            $table->uuid('destiny_warehouse_id');
            $table->foreign('destiny_warehouse_id')->references('warehouse_id')->on('warehouses')->cascadeOnDelete();

            $table->softDeletes();
            $table->timestamps();

            $table->index('destiny_warehouse_id');
            $table->index('product_id');
            $table->index('source_warehouse_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transfers', function (Blueprint $table) {
            $table->dropIndex(['source_warehouse_id', 'product_id', 'destiny_warehouse_id', 'transfer_sent_date', 'transfer_received_date']);
            $table->drop();
        });
    }
};
