<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJornadasSemestresTable extends Migration
{

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('jornadas_semestres', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('ciclo')->unsigned();
            $table->foreign('ciclo')->references('id')->on('ciclos')->onDelete('cascade');

            $table->string('catalogo_semestre')->nullable(false);
            $table->string('catalogo_aula')->nullable(true);
            $table->string('catalogo_jornada')->nullable(true)->default('NOC');//MAT, VES y NOC

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
		Schema::dropIfExists('jornadas_semestres');
	}

}
