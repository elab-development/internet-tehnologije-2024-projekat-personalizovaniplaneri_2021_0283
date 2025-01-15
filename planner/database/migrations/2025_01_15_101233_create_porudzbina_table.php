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
        Schema::create('porudzbina', function (Blueprint $table) {
            $table->id();
            $table->string('naziv', 255);
            $table->timestamp('datum_porucivanja')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->decimal('cena', 10, 2);
            $table->string('status_porudzbine', 255);
            $table->unsignedBigInteger('id_korisnik'); 
            $table->foreign('id_korisnik')->references('id')->on('korisnik')->onDelete('cascade');
            $table->unsignedBigInteger('id_planer'); 
            $table->foreign('id_planer')->references('id')->on('planer')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('porudzbina');
    }
};
