<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transfers extends Model
{
    use SoftDeletes, HasUuids;

    protected $keyType = 'string';
    protected $primaryKey = 'transfer_id';

    protected $fillable = [
        'transfer_quantity',
        'transfer_sent_date',
        'transfer_received_date',
    ];

    public function product()
    {
        return $this->belongsTo(Products::class, 'product_id')->withDefault();
    }

    public function source_warehouse()
    {
        return $this->belongsTo(Warehouses::class, 'source_warehouse_id')->withDefault();
    }

    public function destiny_warehouse()
    {
        return $this->belongsTo(Warehouses::class, 'destiny_warehouse_id')->withDefault();
    }
}
