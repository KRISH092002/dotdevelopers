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

        Schema::connection($connection)->create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('category');
            $table->string('user_id')->nullable();
            $table->boolean('status')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $connection = env('BILLING_DB_CONNECTION', 'billing_mysql');
        Schema::connection($connection)->dropIfExists('categories');
    }
};
