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
        //
        $connection = env('BILLING_DB_CONNECTION', 'billing_mysql');

        Schema::connection($connection)->table('products', function (Blueprint $table) use($connection) {
           if (Schema::connection($connection)->hasColumn('products', 'category')) {
                $table->dropColumn('category');
            }

            // Add 'category_id' as unsigned big int and foreign key
            $table->unsignedBigInteger('category_id')->nullable()->after('sku');

            $table->foreign('category_id')
                ->references('id')
                ->on('categories')
                ->onDelete('set null');
   
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $connection = env('BILLING_DB_CONNECTION', 'billing_mysql');
        Schema::connection($connection)->table('products', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->dropColumn('category_id');

            $table->string('category')->nullable();
        });
    }
};
