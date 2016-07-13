<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCatalogosTable extends Migration
{

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('catalogos', function(Blueprint $table) {
            $table->increments('id');

            $table->string('nombre')->nullable(false);
            $table->string('descripcion')->nullable(false);
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
		Schema::dropIfExists('catalogos');
	}

}
