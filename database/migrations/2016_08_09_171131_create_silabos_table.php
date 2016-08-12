<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSilabosTable extends Migration
{

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('silabos', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('id_materia_malla')->unsigned();
            $table->foreign('id_materia_malla')->references('id')->on('malla_academica')->onDelete('cascade');

            $table->string('ruta')->nullable(false);
            $table->boolean('estado')->default(true);

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
		Schema::dropIfExists('silabos');
	}

}
