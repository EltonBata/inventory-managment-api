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
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->foreignId('warehouse_id')->constrained()->cascadeOnDelete();
            $table->foreignId('delivery_id')->constrained('deliveries')->cascadeOnDelete();
            $table->softDeletes();
            $table->timestamps();

            $table->index('delivery_id');
            $table->index('product_id');
            $table->index('warehouse_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transfers', function (Blueprint $table) {
            $table->dropIndex(['warehouse_id', 'product_id', 'delivery_id', 'transfer_sent_date', 'transfer_received_date']);
            $table->drop();
        });
    }
};
