<?php

namespace App\Models\services\billingapp;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;
    protected $connection = 'billing_mysql';
    protected $table = 'invoices';
    protected $fillable = [
        'user_id',
        'customer_id',
        'invoice_json',
        'payment_mode',
        'total_amt'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
