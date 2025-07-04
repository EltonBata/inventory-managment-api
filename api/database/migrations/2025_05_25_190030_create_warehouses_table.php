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
        Schema::create('warehouses', function (Blueprint $table) {
            $table->uuid('warehouse_id')->primary();
            $table->string('warehouse_name')->index();
            $table->string('warehouse_location_name');
            $table->text('warehouse_address');
            $table->boolean('warehouse_is_refrigereted');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('warehouses', function(Blueprint $table){
            $table->dropIndex(['warehouse_name']);
            $table->drop();
        });
    }
};
