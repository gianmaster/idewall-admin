<?php

use Illuminate\Database\Seeder;

class DocentesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        //creacion de docentes para pruebas
        App\Entities\Docente::create([
          'abreviatura'         => 'Ing',
          'nombres'             => 'Jose Antonio',
          'apellidos'           => 'Alcivar Gonzales', 
          'identificacion'      => '0919210419', 
          'tipo_identificacion' => 'CEDULA', 
          'email'               => 'josant_83@hotmail.com',
          'email_corporativo'   => 'josealcivar@prueba.com', 
          'celular'             => '09889000925', 
          'telefono'            => '04-6-030-825', 
          'estado_civil'        => 'CASADO', 
          'genero'              => 'MASCULINO', 
          'titulo_pregrado'     => '',
          'titulo_postgrado'    => '', 
          'titulo_mba'          => '', 
          'registro_senescyt'   => '', 
          'fecha_nacimiento'    => '1983-03-06', 
          'nacionalidad'        => 'Ecuatoriano',
          'residencia'          => 'Ecuador', 
          'direccion'           => 'Metropolis 2g Mz 2060 Villa 8',
          'tipo_contrato'       => 'MEDIO_TIEMPO'
          ]);


        App\Entities\Docente::create([
          'abreviatura'         => 'Ing',
          'nombres'             => 'Cesar Gabriel',
          'apellidos'           => 'Barrionuevo De la rosa', 
          'identificacion'      => '0920214731', 
          'tipo_identificacion' => 'CEDULA', 
          'email'               => 'cesar.barrionuevod@hotmail.com',
          'email_corporativo'   => 'cesar.barrionuevo@edu.ug.ec', 
          'celular'             => '0994696504', 
          'telefono'            => '(04)2 267-145', 
          'estado_civil'        => 'CASADO', 
          'genero'              => 'MASCULINO', 
          'titulo_pregrado'     => '',
          'titulo_postgrado'    => '', 
          'titulo_mba'          => '', 
          'registro_senescyt'   => '', 
          'fecha_nacimiento'    => '1982-10-08', 
          'nacionalidad'        => 'Ecuatoriano',
          'residencia'          => 'Ecuador', 
          'direccion'           => 'Latamendi #4818 y la 23',
          'tipo_contrato'       => 'TIEMPO_COMPLETO'
          ]);


        //Asignación de materias docentes para pruebas
        App\Entities\MateriasDocente::create([
          'docente' => 1,
          'materia' => 12,
        ]);

        App\Entities\MateriasDocente::create([
          'docente' => 1,
          'materia' => 34,
        ]);

        App\Entities\MateriasDocente::create([
          'docente' => 1,
          'materia' => 41,
        ]);

        App\Entities\MateriasDocente::create([
          'docente' => 2,
          'materia' => 2,
        ]);

        App\Entities\MateriasDocente::create([
          'docente' => 2,
          'materia' => 22,
        ]);

        App\Entities\MateriasDocente::create([
          'docente' => 2,
          'materia' => 17,
        ]);
    }
}
