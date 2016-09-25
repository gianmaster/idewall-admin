<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDistributivosTable extends Migration
{

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('distributivos', function(Blueprint $table) {
            $table->increments('id');

			$table->string('nombre')->nullable(false);
			$table->boolean('activo')->default(true);
			$table->integer('orden')->default(0);

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
		Schema::dropIfExists('distributivos');
	}

}
