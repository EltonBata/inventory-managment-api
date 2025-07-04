<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Orders extends Model
{
    use SoftDeletes, HasUuids;

    protected $keyType = 'string';
    protected $primaryKey = 'order_id';

    protected $fillable = [
        'order_date',
        'order_quantity',
        'order_expected_date'
    ];

    public function provider(){
        return $this->belongsTo(Providers::class, 'provider_id')->withDefault();
    }

    public function product(){
        return $this->belongsTo(Products::class, 'product_id')->withDefault();
    }

    public function warehouse(){
        return $this->belongsTo(Warehouses::class, 'warehouse_id')->withDefault();
    }
}
