<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('customizations', function (Blueprint $table) {
            $table->id();
            $table->string('boja', 255)->nullable();
            $table->string('slika', 255)->nullable();
            $table->string('font', 255)->nullable();
            $table->text('tekst')->nullable();
            $table->foreignId('id_planer');
            $table->foreignId('id_vrsta');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('customizations');
    }
};
