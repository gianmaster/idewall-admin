<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCiclosTable extends Migration
{

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('ciclos', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('anio')->nullable(false);
            $table->integer('ciclo')->nullable(false);
            $table->enum('estado', ['CERRADO', 'VIGENTE'])->default('VIGENTE');
			$table->date('fecha_inicio')->nullable(false);
			$table->date('fecha_fin')->nullable(false);

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
		Schema::dropIfExists('ciclos');
	}

}
