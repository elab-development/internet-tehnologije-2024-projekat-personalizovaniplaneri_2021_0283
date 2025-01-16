<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('user', function (Blueprint $table) {
            $table->id();
            $table->string('ime', 255);
            $table->string('prezime', 255);
            $table->string('email', 255)->unique();
            $table->string('sifra', 255);
            $table->timestamp('datum_registracije')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->foreignId('type_id');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('user');
    }
};
