<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCicloDocentesTable extends Migration
{

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('ciclo_docentes', function(Blueprint $table) {
            $table->increments('id');

			$table->integer('ciclo')->unsigned();
			$table->foreign('ciclo')->references('id')->on('ciclos')->onDelete('cascade');

			$table->integer('docente')->unsigned();
			$table->foreign('docente')->references('id')->on('docentes')->onDelete('cascade');

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
		Schema::dropIfExists('ciclo_docentes');
	}

}
