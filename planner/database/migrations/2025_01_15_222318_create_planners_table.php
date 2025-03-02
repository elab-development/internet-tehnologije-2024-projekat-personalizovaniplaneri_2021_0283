<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('planner', function (Blueprint $table) {
            $table->id();
            $table->string('ime', 255);
            $table->timestamp('datum_kreiranja')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->string('status', 255);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('planner');
    }
};
