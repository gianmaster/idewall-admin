<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHorariosCursosTable extends Migration
{

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('horarios_cursos', function(Blueprint $table) {
            $table->increments('id');

			$table->integer('ciclo_materia_docente')->unsigned();
			$table->foreign('ciclo_materia_docente')->references('id')->on('ciclo_materias_docente')->onDelete('cascade');

			$table->integer('ciclo_jornada_semestre')->unsigned();
			$table->foreign('ciclo_jornada_semestre')->references('id')->on('jornadas_semestres')->onDelete('cascade');

			$table->enum('dia', ['LUNES', 'MARTES','MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO'])->nullable(false);

			$table->char('hora_inicio', 5)->nullable(false);
			$table->char('hora_fin', 5)->nullable(false);

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
		Schema::drop('horarios_cursos');
	}

}
