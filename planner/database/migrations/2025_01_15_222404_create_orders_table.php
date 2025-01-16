<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->timestamp('datum_porucivanja')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->decimal('cena', 10, 2);
            $table->string('status_porudzbine', 255);
            $table->foreignId('id_korisnik');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
