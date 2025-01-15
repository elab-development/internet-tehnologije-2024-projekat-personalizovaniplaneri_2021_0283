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
        Schema::create('personalizacija', function (Blueprint $table) {
            $table->id();
            $table->string('boja', 255)->nullable();
            $table->string('slika', 255)->nullable();
            $table->string('font', 255)->nullable();
            $table->text('tekst')->nullable();
            $table->unsignedBigInteger('id_planer'); 
            $table->foreign('id_planer')->references('id')->on('planer')->onDelete('cascade');
            //$table->unsignedBigInteger('id_vrsta'); 
            //$table->foreign('id_vrsta')->references('id')->on('vrsta')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personalizacija');
    }
};
