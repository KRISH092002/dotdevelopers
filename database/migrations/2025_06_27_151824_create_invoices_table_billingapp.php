<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $connection = env('BILLING_DB_CONNECTION', 'billing_mysql');
        Schema::connection($connection)->create('invoices', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('customer_id')->nullable();
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('set null');
            $table->longText('invoice_json')->nullable();
            $table->string('payment_mode')->nullable();
            $table->string('total_amt')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $connection = env('BILLING_DB_CONNECTION', 'billing_mysql');
        Schema::connection($connection)->dropIfExists('invoices');
    }
};
