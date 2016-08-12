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
        $AguirreMadonadoLonardoVladimir = App\Entities\Docente::create([
            'abreviatura'         => 'Ing',
            'nombres'             => 'Leonardo Vladimir',
            'apellidos'           => 'Aguirre Maldonado',
            'identificacion'      => '0912271970',
            'tipo_identificacion' => 'CEDULA',
            'email'               => 'aguirreleonardo1971@hotmail.com',
            'email_corporativo'   => 'leonardo.aguirrem@ug.edu.ec',
            'celular'             => '0994098726',
            'telefono'            => '(04) 2 393-661',
            'estado_civil'        => 'CASADO',
            'genero'              => 'MASCULINO',
            'titulo_pregrado'     => '',
            'titulo_postgrado'    => '',
            'titulo_mba'          => '',
            'registro_senescyt'   => '',
            'fecha_nacimiento'    => '1971-06-06',
            'nacionalidad'        => 'Ecuatoriano',
            'residencia'          => 'Ecuador',
            'direccion'           => 'CDLA ATARAZANA MZ. E4 VILLA # 14',
            'tipo_contrato'       => 'TIEMPO_COMPLETO'
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $AguirreMadonadoLonardoVladimir->id,
            'materia' => 2,
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $AguirreMadonadoLonardoVladimir->id,
            'materia' => 25,
        ]);


        $AlburquerqueProanioPedroDennys = App\Entities\Docente::create([
            'abreviatura'         => 'Ing',
            'nombres'             => 'Pedro Dennys',
            'apellidos'           => 'Alburquerque Proaño',
            'identificacion'      => '0918136862',
            'tipo_identificacion' => 'CEDULA',
            'email'               => 'palbupro@gmail.com',
            'email_corporativo'   => 'pedro.alburquerquep@ug.edu.ec',
            'celular'             => '0991566395',
            'telefono'            => '(04)2 920-522',
            'estado_civil'        => 'CASADO',
            'genero'              => 'MASCULINO',
            'titulo_pregrado'     => '',
            'titulo_postgrado'    => '',
            'titulo_mba'          => '',
            'registro_senescyt'   => '',
            'fecha_nacimiento'    => '1979-05-01',
            'nacionalidad'        => 'Ecuatoriano',
            'residencia'          => 'Ecuador',
            'direccion'           => 'ALBORADA 6 ETAPA MZ. 625 SOLAR 4',
            'tipo_contrato'       => 'TIEMPO_COMPLETO'
        ]);

            App\Entities\MateriasDocente::create([
                'docente' => $AlburquerqueProanioPedroDennys->id,
                'materia' => 2,
            ]);

            App\Entities\MateriasDocente::create([
                'docente' => $AlburquerqueProanioPedroDennys->id,
                'materia' => 8,
            ]);



        $joseAntonioAlcivarGonzales = App\Entities\Docente::create([
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

        App\Entities\MateriasDocente::create([
            'docente' => $joseAntonioAlcivarGonzales->id,
            'materia' => 35,
        ]);



        $almeidaMoralesByronFernando = App\Entities\Docente::create([
            'abreviatura'         => 'Lic',
            'nombres'             => 'Byron Fernando',
            'apellidos'           => 'Almeida Morales',
            'identificacion'      => '1712495777',
            'tipo_identificacion' => 'CEDULA',
            'email'               => 'falmeida@amagua-cem.com',
            'email_corporativo'   => '',
            'celular'             => '0997205412',
            'telefono'            => '(04) 6 033-358',
            'estado_civil'        => 'CASADO',
            'genero'              => 'MASCULINO',
            'titulo_pregrado'     => '',
            'titulo_postgrado'    => '',
            'titulo_mba'          => '',
            'registro_senescyt'   => '',
            'fecha_nacimiento'    => '1979-08-12',
            'nacionalidad'        => 'Ecuatoriano',
            'residencia'          => 'Ecuador',
            'direccion'           => 'VILLA CLUB ETAPA  LUNA MZ 1 SOLAR 41',
            'tipo_contrato'       => 'MEDIO_TIEMPO'
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $almeidaMoralesByronFernando->id,
            'materia' => 27,
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $almeidaMoralesByronFernando->id,
            'materia' => 34,
        ]);



        $barrionuevo = App\Entities\Docente::create([
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


        App\Entities\MateriasDocente::create([
            'docente' => $barrionuevo->id,
            'materia' => 15,
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $barrionuevo->id,
            'materia' => 24,
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $barrionuevo->id,
            'materia' => 48,
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $barrionuevo->id,
            'materia' => 39,
        ]);




        $cabezasPadillaRoddySalvador = App\Entities\Docente::create([
            'abreviatura'         => 'Lic',
            'nombres'             => 'Roddy Salvador',
            'apellidos'           => 'Cabezas Padilla',
            'identificacion'      => '0911780518',
            'tipo_identificacion' => 'CEDULA',
            'email'               => 'consultor_de_calidad@hotmail.com',
            'email_corporativo'   => 'roddy.cabezasp@ug.edu.ec',
            'celular'             => '0986640578',
            'telefono'            => '(04) 2 071-542',
            'estado_civil'        => 'CASADO',
            'genero'              => 'MASCULINO',
            'titulo_pregrado'     => '',
            'titulo_postgrado'    => '',
            'titulo_mba'          => '',
            'registro_senescyt'   => '',
            'fecha_nacimiento'    => '1971-07-05',
            'nacionalidad'        => 'Ecuatoriano',
            'residencia'          => 'Ecuador',
            'direccion'           => 'LA JOYA, PLATINO MZ 8 VILLA 17',
            'tipo_contrato'       => 'TIEMPO_COMPLETO'
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $cabezasPadillaRoddySalvador->id,
            'materia' => 25,
        ]);


        $cardenasBolaniosBrendaXiomara = App\Entities\Docente::create([
            'abreviatura'         => 'Abo',
            'nombres'             => 'Brenda Xiomara',
            'apellidos'           => 'Cardenas Bolaños',
            'identificacion'      => '0924628100',
            'tipo_identificacion' => 'CEDULA',
            'email'               => 'ab.brendacardenas17@hotmail.com',
            'email_corporativo'   => 'brenda.cardenasb@ug.edu.ec',
            'celular'             => '0992558260',
            'telefono'            => '(04) 2 153-934',
            'estado_civil'        => 'CASADO',
            'genero'              => 'FEMENINO',
            'titulo_pregrado'     => '',
            'titulo_postgrado'    => '',
            'titulo_mba'          => '',
            'registro_senescyt'   => '',
            'fecha_nacimiento'    => '1971-07-05',
            'nacionalidad'        => 'Ecuatoriano',
            'residencia'          => 'Ecuador',
            'direccion'           => 'MANABI 115 Y CUENCA',
            'tipo_contrato'       => 'TIEMPO_COMPLETO'
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $cardenasBolaniosBrendaXiomara->id,
            'materia' => 3,
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $cardenasBolaniosBrendaXiomara->id,
            'materia' => 9,
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $cardenasBolaniosBrendaXiomara->id,
            'materia' => 6,
        ]);



        $cardenasGilerDavidXavier = App\Entities\Docente::create([
            'abreviatura'         => 'Ing',
            'nombres'             => 'David Xavier',
            'apellidos'           => 'Cardenas Giler',
            'identificacion'      => '0915249668',
            'tipo_identificacion' => 'CEDULA',
            'email'               => 'david_cardenas_g@hotmail.com',
            'email_corporativo'   => 'david.cardenasg@ug.edu.ec',
            'celular'             => '0997200492',
            'telefono'            => '(04) 2 437-840',
            'estado_civil'        => 'CASADO',
            'genero'              => 'MASCULINO',
            'titulo_pregrado'     => '',
            'titulo_postgrado'    => '',
            'titulo_mba'          => '',
            'registro_senescyt'   => '',
            'fecha_nacimiento'    => '1973-05-14',
            'nacionalidad'        => 'Ecuatoriano',
            'residencia'          => 'Ecuador',
            'direccion'           => 'LOS ESTEROS MZ. 9A VILLA 5',
            'tipo_contrato'       => 'TIEMPO_COMPLETO'
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $cardenasGilerDavidXavier->id,
            'materia' => 21,
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $cardenasGilerDavidXavier->id,
            'materia' => 29,
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $cardenasGilerDavidXavier->id,
            'materia' => 41,
        ]);



        $carrilloVeraSusanaPaola = App\Entities\Docente::create([
            'abreviatura'         => 'Eco',
            'nombres'             => 'Susana Paola',
            'apellidos'           => 'Carrillo Vera',
            'identificacion'      => '0920221637',
            'tipo_identificacion' => 'CEDULA',
            'email'               => 'susipaola@hotmail.com',
            'email_corporativo'   => 'susana.carrillov@ug.edu.ec',
            'celular'             => '0992617923',
            'telefono'            => '(04) 2 071-063',
            'estado_civil'        => 'CASADO',
            'genero'              => 'FEMENINO',
            'titulo_pregrado'     => '',
            'titulo_postgrado'    => '',
            'titulo_mba'          => '',
            'registro_senescyt'   => '',
            'fecha_nacimiento'    => '1971-07-08',
            'nacionalidad'        => 'Ecuatoriano',
            'residencia'          => 'Ecuador',
            'direccion'           => 'LA JOYA PLATINO MZ 6 VILLA 4',
            'tipo_contrato'       => 'TIEMPO_COMPLETO'
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $carrilloVeraSusanaPaola->id,
            'materia' => 12,
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $carrilloVeraSusanaPaola->id,
            'materia' => 32,
        ]);



        $cedenioMoranFranciscoJose = App\Entities\Docente::create([
            'abreviatura'         => 'Ing',
            'nombres'             => 'Francisco José',
            'apellidos'           => 'Cedeño Moran',
            'identificacion'      => '0909640724',
            'tipo_identificacion' => 'CEDULA',
            'email'               => 'panpepe26@hotmail.com',
            'email_corporativo'   => 'fca.dirisac@ug.edu.ec',
            'celular'             => '0999104477',
            'telefono'            => '(04) 2 071-063',
            'estado_civil'        => 'CASADO',
            'genero'              => 'MASCULINO',
            'titulo_pregrado'     => '',
            'titulo_postgrado'    => '',
            'titulo_mba'          => '',
            'registro_senescyt'   => '',
            'fecha_nacimiento'    => '1974-09-15',
            'nacionalidad'        => 'Ecuatoriano',
            'residencia'          => 'Ecuador',
            'direccion'           => 'CDLA. RIO GUAYAS,  MZ E ,CALLE 3, VILLA 15 -2',
            'tipo_contrato'       => 'TIEMPO_COMPLETO'
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $cedenioMoranFranciscoJose->id,
            'materia' => 1,
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $cedenioMoranFranciscoJose->id,
            'materia' => 3,
        ]);



        $changRamosFelixAlberto = App\Entities\Docente::create([
            'abreviatura'         => 'Ing',
            'nombres'             => 'Felix Alberto',
            'apellidos'           => 'Chang Ramos',
            'identificacion'      => '0904267077',
            'tipo_identificacion' => 'CEDULA',
            'email'               => 'fchang@maug.edu.ec',
            'email_corporativo'   => 'changrf@ug.edu.ec',
            'celular'             => '0996010945',
            'telefono'            => '(04) 2 992-785',
            'estado_civil'        => 'CASADO',
            'genero'              => 'MASCULINO',
            'titulo_pregrado'     => '',
            'titulo_postgrado'    => '',
            'titulo_mba'          => '',
            'registro_senescyt'   => '',
            'fecha_nacimiento'    => '1951-03-06',
            'nacionalidad'        => 'Ecuatoriano',
            'residencia'          => 'Ecuador',
            'direccion'           => 'PUERTO AZUL, MZ. F 5E, VILLA 1',
            'tipo_contrato'       => 'TIEMPO_COMPLETO'
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $changRamosFelixAlberto->id,
            'materia' => 20,
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $changRamosFelixAlberto->id,
            'materia' => 25,
        ]);

    }
}
