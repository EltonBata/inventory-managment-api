<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Deliveries extends Model
{
    use SoftDeletes, HasUuids;


    protected $keyType = 'string';
    protected $primaryKey = 'delivery_id';

    protected $fillable = [
        'delivery_date',
        'delivery_quantity',
        'delivery_expected_date',
    ];

    public function customer()
    {
        return $this->belongsTo(Customers::class, 'customer_id')->withDefault();
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouses::class, 'warehouse_id')->withDefault();
    }

    public function product()
    {
        return $this->belongsTo(Products::class, 'product_id')->withDefault();
    }
}
