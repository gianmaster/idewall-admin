<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCicloLayoutReportesTable extends Migration
{

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('ciclo_layout_reportes', function(Blueprint $table) {
            $table->increments('id');

			$table->integer('ciclo')->unsigned();
			$table->foreign('ciclo')->references('id')->on('ciclos')->onDelete('cascade');

			$table->enum('tipo', ['HORARIO_CURSO', 'DISTRIBUTIVO_DOCENTE']);
			$table->string('director_carrera')->nullable(false);
			$table->string('elaborador')->nullable(false);
			$table->longText('cabecera')->nullable(true);
			$table->longText('pie')->nullable(true);

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
		Schema::dropIfExists('ciclo_layout_reportes');
	}

}
