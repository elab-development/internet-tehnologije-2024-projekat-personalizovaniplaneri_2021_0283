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
        Schema::table('personalizacija', function (Blueprint $table) {
            //
            $table->unsignedBigInteger('id_vrsta'); 
            $table->foreign('id_vrsta')->references('id')->on('vrsta')->onDelete('cascade');
           
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('personalizacija', function (Blueprint $table) {
            //
            $table->dropForeign(['id_vrsta']);
            $table->dropColumn('id_vrsta');
        });
    }
};
