<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable(false);
            $table->string('email')->unique();
            $table->string('avatar')->nullable(true);
            $table->string('password');
            $table->enum('state', ['ACTIVO', 'INACTIVO'])->default('ACTIVO');
            $table->rememberToken();

            $table->integer('rol')->unsigned();
            $table->foreign('rol')->references('id')->on('roles')->onupdate('restrict')->ondelete('restrict');

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
        Schema::dropIfExists('users');
    }
}
