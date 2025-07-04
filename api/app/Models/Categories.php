<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Categories extends Model
{

    use SoftDeletes, HasUuids;

    protected $keyType = 'string';
    protected $primaryKey = 'category_id';

    protected $fillable = [
        'category_name',
        'category_description'
    ];

    public function products()
    {
        return $this->belongsToMany(Products::class, 'product_category', 'category_id', 'product_id');
    }
}
