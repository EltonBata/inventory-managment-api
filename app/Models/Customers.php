<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customers extends Model
{
    use SoftDeletes, HasUuids;

    protected $keyType = 'string';
    protected $primaryKey = 'customer_id';

    protected $fillable = [
        'customer_name',
        'customer_address'
    ];

    public function delivery(){
        return $this->hasMany(Deliveries::class);
    }

   
}
