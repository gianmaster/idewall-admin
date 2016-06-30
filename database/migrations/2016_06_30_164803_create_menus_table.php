<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMenusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menu', function (Blueprint $table) {
            $table->increments('id');

            $table->string('nombre')->nullable(false);
            $table->string('titulo')->nullable(false);
            $table->string('url')->nullable(true);
            $table->string('iconclass')->nullable(true);
            $table->integer('orden')->nullable(true);
            $table->integer('cod_padre')->nullable(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('menu');
    }
}
