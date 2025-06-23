<?php

namespace App\Models\services;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $connection = 'billing_mysql';
    protected $table = 'categories';
    protected $fillable = [
        'category',
        'status',
        'user_id'
    ];

    public function products()
    {
        return $this->hasMany(Products::class, 'category_id');
    }
}
