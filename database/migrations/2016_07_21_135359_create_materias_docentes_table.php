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
		Schema::create('ciclo_materias_docente', function(Blueprint $table) {
            $table->increments('id');
			
			$table->integer('ciclo_docente')->unsigned();
			$table->foreign('ciclo_docente')->references('id')->on('ciclo_docentes')->onDelete('cascade')->onUpdate('cascade');

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
		Schema::dropIfExists('ciclo_materias_docente');
	}

}
