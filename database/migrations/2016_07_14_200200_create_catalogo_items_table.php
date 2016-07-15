<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCatalogoItemsTable extends Migration
{

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('catalogo_items', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('catalogo')->unsigned();
            $table->foreign('catalogo')->references('id')->on('catalogos')->onUpdate('cascade')->onDelete('cascade');

            $table->string('codigo')->nullable(false);
            $table->string('descripcion')->nullable(false);
            $table->integer('orden')->default(0);
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
		Schema::dropIfExists('catalogo_items');
	}

}
