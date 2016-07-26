<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMateriasDocentesTable extends Migration
{

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('materias_docente', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('docente')->unsigned();
            $table->foreign('docente')->references('id')->on('docentes')->onDelete('cascade')->onUpdate('cascade');

            $table->integer('materia')->unsigned();
            $table->foreign('materia')->references('id')->on('malla_academica')->onDelete('cascade')->onUpdate('cascade');

            $table->boolean('activo')->default(true);

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
		Schema::dropIfExists('materias_docente');
	}

}
