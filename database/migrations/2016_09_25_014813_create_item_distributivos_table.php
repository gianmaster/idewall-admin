<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateItemDistributivosTable extends Migration
{

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('item_distributivos', function(Blueprint $table) {
            $table->increments('id');

			$table->integer('id_distributivo')->unsigned();
			$table->foreign('id_distributivo')->references('id')->on('distributivos')->onDelete('cascade');

			$table->string('nombre')->nullable(false);
			$table->boolean('activo')->default(true);
			$table->integer('orden')->default(0);
			$table->boolean('modificable')->default(false)->comment = 'Indica si es un dinamico y puede ser modificado dentro de la aplicación';

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
		Schema::dropIfExists('item_distributivos');
	}

}
