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

            $table->string('periodo')->unique()->nullable(false);
            $table->string('nombre')->nullable(false);
            $table->enum('estado', ['CERRADO', 'VIGENTE'])->default('VIGENTE');

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
