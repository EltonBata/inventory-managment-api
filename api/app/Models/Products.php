<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Products extends Model
{
    use SoftDeletes, HasUuids;

    protected $keyType = 'string';
    protected $primaryKey = 'product_id';

    protected $fillable = [
        'product_code',
        'product_bar_code',
        'product_description',
        'product_name',
        'product_reorder_quantity',
        'product_packed_height',
        'product_packed_weight',
        'product_packed_depth',
        'product_refrigereted'
    ];

    public function categories()
    {
        return $this->belongsToMany(Categories::class, 'product_category', 'product_id', 'category_id');
    }

    public function orders()
    {
        return $this->hasMany(Orders::class, 'product_id');
    }

    public function deliveries()
    {
        return $this->hasMany(Deliveries::class, 'delivery_id');
    }

    public function warehouses()
    {
        $this->belongsToMany(Warehouses::class, 'product_id', 'warehouse_id')
            ->as('inventory')
            ->withPivot([
                'inventory_quantity_available',
                'inventory_maximum_stock_level',
                'inventory_minimum_stock_level',
                'inventory_reorder_point',
            ]);
    }
}
