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
        Schema::create('planer', function (Blueprint $table) {
            $table->id();
            $table->string('ime', 255);
            $table->timestamp('datum_kreiranja')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->string('status', 255);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('planer');
    }
};
