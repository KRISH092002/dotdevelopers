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

        Schema::connection($connection)->table('products', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->after('status');
   
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $connection = env('BILLING_DB_CONNECTION', 'billing_mysql');
        Schema::connection($connection)->table('products', function (Blueprint $table) {
            $table->dropColumn('user_id');
        });
    }
};
