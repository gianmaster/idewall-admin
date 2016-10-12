<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHorariosDocentesTable extends Migration
{

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('horarios_docentes', function(Blueprint $table) {
            $table->increments('id');

			$table->integer('id_item_distributivo')->unsigned();
			$table->foreign('id_item_distributivo')->references('id')->on('item_distributivos')->onDelete('cascade');
			
			$table->integer('ciclo_docente')->unsigned();
			$table->foreign('ciclo_docente')->references('id')->on('ciclo_docentes')->onDelete('cascade');

			$table->enum('dia', ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO']);
			$table->string('etiqueta', 255)->nullable(true);
			$table->char('hora_inicio', 5)->nullable(false);
			$table->char('hora_fin', 5)->nullable(false);
			$table->decimal('num_horas');

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
		Schema::dropIfExists('horarios_docentes');
	}

}
