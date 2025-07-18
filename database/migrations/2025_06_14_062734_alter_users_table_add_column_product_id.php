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
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('product_id');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
          Schema::table('users', function (Blueprint $table) {
            // Drop foreign key first (use constraint name or Laravel's default naming)
            $table->dropForeign(['product_id']); 
            // or dropForeign('posts_user_id_foreign');
            
            // Then drop the column
            $table->dropColumn('product_id');
        });
    }
};
