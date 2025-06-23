<?php

namespace App\Models\services;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;
    protected $connection = 'billing_mysql'; 
    protected $table = 'products';
    protected $fillable = [
        'name',
        'sku',
        'category',
        'purchase_price',
        'selling_price',
        'stock',
        'unit',
        'status',
        'user_id'
    ];
}
