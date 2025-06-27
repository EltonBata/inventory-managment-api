<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Warehouses extends Model
{
    use SoftDeletes, HasUuids;

    protected $keyType = 'string';
    protected $primaryKey = 'warehouse_id';

    protected $fillable = [
        'warehouse_name',
        'warehouse_location_name',
        'warehouse_address',
        'warehouse_is_refrigereted'
    ];

    public function products()
    {
        $this->belongsToMany(Products::class)
            ->as('inventory')
            ->withPivot([
                'inventory_quantity_available',
                'inventory_maximum_stock_level',
                'inventory_minimum_stock_level',
                'inventory_reorder_point',
            ]);
    }

    public function orders()
    {
        return $this->hasMany(Products::class);
    }

  
}
