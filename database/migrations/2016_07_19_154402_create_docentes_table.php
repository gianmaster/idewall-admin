<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDocentesTable extends Migration
{

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('docentes', function(Blueprint $table) {
            $table->increments('id');

            $table->string('abreviatura');
            $table->string("nombres");
            $table->string("apellidos");
            $table->string("identificacion");
            $table->enum("tipo_identificacion", ["CEDULA", "RUC", "PASAPORTE"]);
            $table->string("email")->unique()->nullable(false);
            $table->string("email_corporativo");
            $table->string("celular")->nullable(false);
            $table->string("telefono")->nullable();
            $table->enum("estado_civil", ["SOLTERO", "CASADO", "DIVORCIADO", "VIUDA"])->nullable(false);
            $table->enum("genero", ["MASCULINO", "FEMENINO"])->nullable(false);
            $table->string("titulo_pregrado")->nullable();
            $table->string("titulo_postgrado")->nullable();
            $table->string("titulo_mba")->nullable();
            $table->string("registro_senescyt");
            $table->date("fecha_nacimiento")->nullable(false);
            $table->string("nacionalidad");
            $table->string("residencia");
            $table->string("direccion")->nullable();
            $table->enum('tipo_contrato', ['TIEMPO_COMPLETO', 'MEDIO_TIEMPO'])->default('TIEMPO_COMPLETO')->nullable(false);
            $table->enum('estado', ['CONTRATADO', 'CULMINADO', 'RENOVADO'])->default('CONTRATADO')->nullable(false);

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
		Schema::dropIfExists('docentes');
	}

}
