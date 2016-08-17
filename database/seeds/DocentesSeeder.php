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


        $chavezChicaKerlySisiana = App\Entities\Docente::create([
            'abreviatura'         => 'Ing',
            'nombres'             => 'Kerly Sisiana',
            'apellidos'           => 'Chavez Chica',
            'identificacion'      => '0915399836',
            'tipo_identificacion' => 'CEDULA',
            'email'               => 'ksisiana@hotmail.com',
            'email_corporativo'   => 'sisiana.chavezc@ug.edu.ec',
            'celular'             => '0998155747',
            'telefono'            => '(04) 2 813-932',
            'estado_civil'        => 'CASADO',
            'genero'              => 'FEMENINO',
            'titulo_pregrado'     => '',
            'titulo_postgrado'    => '',
            'titulo_mba'          => '',
            'registro_senescyt'   => '',
            'fecha_nacimiento'    => '1973-07-28',
            'nacionalidad'        => 'Ecuatoriano',
            'residencia'          => 'Ecuador',
            'direccion'           => 'CIUDAD CELESTE, URBANIZACION LA DORADA MZ. 7 VILLA 2',
            'tipo_contrato'       => 'TIEMPO_COMPLETO'
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $chavezChicaKerlySisiana->id,
            'materia' => 20,
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $chavezChicaKerlySisiana->id,
            'materia' => 24,
        ]);



        $chiluizaCordovaJorgeWashinton = App\Entities\Docente::create([
            'abreviatura'         => 'Ing',
            'nombres'             => 'Jorge Washington',
            'apellidos'           => 'Chiluiza Cordova',
            'identificacion'      => '0912397676',
            'tipo_identificacion' => 'CEDULA',
            'email'               => 'jorchicor21@hotmail.com',
            'email_corporativo'   => 'jorge.chiluizaco@ug.edu.ec',
            'celular'             => '0912397676',
            'telefono'            => '(04) 2 276-387',
            'estado_civil'        => 'CASADO',
            'genero'              => 'MASCULINO',
            'titulo_pregrado'     => '',
            'titulo_postgrado'    => '',
            'titulo_mba'          => '',
            'registro_senescyt'   => '',
            'fecha_nacimiento'    => '1973-07-28',
            'nacionalidad'        => 'Ecuatoriano',
            'residencia'          => 'Ecuador',
            'direccion'           => 'CIUDAD CELESTE, URBANIZACION LA DORADA MZ. 7 VILLA 2',
            'tipo_contrato'       => 'MEDIO_TIEMPO'
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $chiluizaCordovaJorgeWashinton->id,
            'materia' => 38,
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $chiluizaCordovaJorgeWashinton->id,
            'materia' => 45,
        ]);


        $cordovaAragundijoseSaturnino = App\Entities\Docente::create([
            'abreviatura'         => 'Ing',
            'nombres'             => 'Jose Saturnino',
            'apellidos'           => 'Cordova Aragundi',
            'identificacion'      => '0917236663',
            'tipo_identificacion' => 'CEDULA',
            'email'               => 'jscordovaa@gmail.com',
            'email_corporativo'   => 'jose.cordovaa@ug.edu.ec',
            'celular'             => '0995433036',
            'telefono'            => '(04) 6 002-114',
            'estado_civil'        => 'CASADO',
            'genero'              => 'MASCULINO',
            'titulo_pregrado'     => '',
            'titulo_postgrado'    => '',
            'titulo_mba'          => '',
            'registro_senescyt'   => '',
            'fecha_nacimiento'    => '1981-10-10',
            'nacionalidad'        => 'Ecuatoriano',
            'residencia'          => 'Ecuador',
            'direccion'           => 'LA JOYA, ESMERALDA MZ 9 VILL A18',
            'tipo_contrato'       => 'MEDIO_TIEMPO'
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $cordovaAragundijoseSaturnino->id,
            'materia' => 36,
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $cordovaAragundijoseSaturnino->id,
            'materia' => 34,
        ]);




        $guerreroLopezCarlosAndres = App\Entities\Docente::create([
            'abreviatura'         => 'Ing',
            'nombres'             => 'Carlos Andres',
            'apellidos'           => 'Guerrero López',
            'identificacion'      => '0921929634',
            'tipo_identificacion' => 'CEDULA',
            'email'               => 'cguerrero@impuestosecuador.com.ec',
            'email_corporativo'   => 'carlos.guerrerolo@ug.edu.ec',
            'celular'             => '0985039251',
            'telefono'            => '(04) 2 238-647',
            'estado_civil'        => 'CASADO',
            'genero'              => 'MASCULINO',
            'titulo_pregrado'     => '',
            'titulo_postgrado'    => '',
            'titulo_mba'          => '',
            'registro_senescyt'   => '',
            'fecha_nacimiento'    => '1982-03-29',
            'nacionalidad'        => 'Ecuatoriano',
            'residencia'          => 'Ecuador',
            'direccion'           => 'KM. 14 VIA LEON FEBRES CORDERO',
            'tipo_contrato'       => 'MEDIO_TIEMPO'
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $guerreroLopezCarlosAndres->id,
            'materia' => 32,
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $guerreroLopezCarlosAndres->id,
            'materia' => 12,
        ]);



        $hurelGuzmanRaulSantiago = App\Entities\Docente::create([
            'abreviatura'         => 'Ing',
            'nombres'             => 'Raul Santiago',
            'apellidos'           => 'Hurel Guzman',
            'identificacion'      => '0916753650',
            'tipo_identificacion' => 'CEDULA',
            'email'               => 'rhurelg@gmail.com',
            'email_corporativo'   => 'raul.hurelgu@ug.edu.ec',
            'celular'             => '0992060314',
            'telefono'            => '(04) 6 002-029',
            'estado_civil'        => 'CASADO',
            'genero'              => 'MASCULINO',
            'titulo_pregrado'     => '',
            'titulo_postgrado'    => '',
            'titulo_mba'          => '',
            'registro_senescyt'   => '',
            'fecha_nacimiento'    => '1978-12-06',
            'nacionalidad'        => 'Ecuatoriano',
            'residencia'          => 'Ecuador',
            'direccion'           => 'URB. VILLA CLUB, ETAPA HERMES, MZ. 9, VILLA 15',
            'tipo_contrato'       => 'TIEMPO_COMPLETO'
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $hurelGuzmanRaulSantiago->id,
            'materia' => 39,
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $hurelGuzmanRaulSantiago->id,
            'materia' => 21,
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $hurelGuzmanRaulSantiago->id,
            'materia' => 26,
        ]);


        $incaVelizJoseArturo = App\Entities\Docente::create([
            'abreviatura'         => 'Ing',
            'nombres'             => 'Jose Arturo',
            'apellidos'           => 'Inca Veliz',
            'identificacion'      => '0911146256',
            'tipo_identificacion' => 'CEDULA',
            'email'               => 'joseincaveliz@yahoo.com',
            'email_corporativo'   => 'jose.incav@ug.edu.ec',
            'celular'             => '0998873852',
            'telefono'            => '(04) 3 081-680',
            'estado_civil'        => 'CASADO',
            'genero'              => 'MASCULINO',
            'titulo_pregrado'     => '',
            'titulo_postgrado'    => '',
            'titulo_mba'          => '',
            'registro_senescyt'   => '',
            'fecha_nacimiento'    => '1970-04-24',
            'nacionalidad'        => 'Ecuatoriano',
            'residencia'          => 'Ecuador',
            'direccion'           => 'CDLA.JUAN TANCA MARENGO Mz.B V.#2',
            'tipo_contrato'       => 'TIEMPO_COMPLETO'
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $incaVelizJoseArturo->id,
            'materia' => 13,
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $incaVelizJoseArturo->id,
            'materia' => 18,
        ]);



        $marcilloSanchezPatriciaMaria = App\Entities\Docente::create([
            'abreviatura'         => 'Lcda',
            'nombres'             => 'Patricia Maria',
            'apellidos'           => 'Marcillo Sanchez',
            'identificacion'      => '0918031691',
            'tipo_identificacion' => 'CEDULA',
            'email'               => 'patty.marcillo@gmail.com',
            'email_corporativo'   => 'patricia.marcillos@ug.edu.ec',
            'celular'             => '0996420038',
            'telefono'            => 'NA',
            'estado_civil'        => 'CASADO',
            'genero'              => 'FEMENINO',
            'titulo_pregrado'     => '',
            'titulo_postgrado'    => '',
            'titulo_mba'          => '',
            'registro_senescyt'   => '',
            'fecha_nacimiento'    => '1978-10-03',
            'nacionalidad'        => 'Ecuatoriano',
            'residencia'          => 'Ecuador',
            'direccion'           => 'PLAZA CATALUÑA N º 3 Y RAMBLAS',
            'tipo_contrato'       => 'TIEMPO_COMPLETO'
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $marcilloSanchezPatriciaMaria->id,
            'materia' => 35,
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $marcilloSanchezPatriciaMaria->id,
            'materia' => 25,
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $marcilloSanchezPatriciaMaria->id,
            'materia' => 27,
        ]);



        $martilloAvilesChristianNahun = App\Entities\Docente::create([
            'abreviatura'         => 'Ing',
            'nombres'             => 'Christian Nahun',
            'apellidos'           => 'Martillo Avilez',
            'identificacion'      => '0920126851',
            'tipo_identificacion' => 'CEDULA',
            'email'               => 'christianmartillo@gmail.com',
            'email_corporativo'   => 'christian.martilloa@ug.edu.ec',
            'celular'             => '0969667738',
            'telefono'            => '(04) 2 463-597',
            'estado_civil'        => 'CASADO',
            'genero'              => 'MASCULINO',
            'titulo_pregrado'     => '',
            'titulo_postgrado'    => '',
            'titulo_mba'          => '',
            'registro_senescyt'   => '',
            'fecha_nacimiento'    => '1978-07-02',
            'nacionalidad'        => 'Ecuatoriano',
            'residencia'          => 'Ecuador',
            'direccion'           => 'CDLA BELLAVISTA MZ 33 V 29',
            'tipo_contrato'       => 'MEDIO_TIEMPO'
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $martilloAvilesChristianNahun->id,
            'materia' => 14,
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $martilloAvilesChristianNahun->id,
            'materia' => 26,
        ]);



        $jorgeMerchan = App\Entities\Docente::create([
            'abreviatura'         => 'Ing',
            'nombres'             => 'Jorge Misael',
            'apellidos'           => 'Merchan Riera',
            'identificacion'      => '0920589892',
            'tipo_identificacion' => 'CEDULA',
            'email'               => 'jorgemerchanr@gmail.com',
            'email_corporativo'   => 'jorge.merchanr@ug.edu.ec',
            'celular'             => '0994912557',
            'telefono'            => '(04) 2 310-649',
            'estado_civil'        => 'CASADO',
            'genero'              => 'MASCULINO',
            'titulo_pregrado'     => '',
            'titulo_postgrado'    => '',
            'titulo_mba'          => '',
            'registro_senescyt'   => '',
            'fecha_nacimiento'    => '1982-07-02',
            'nacionalidad'        => 'Ecuatoriano',
            'residencia'          => 'Ecuador',
            'direccion'           => 'RIOBAMBA 146',
            'tipo_contrato'       => 'TIEMPO_COMPLETO'
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $jorgeMerchan->id,
            'materia' => 36,
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $jorgeMerchan->id,
            'materia' => 20
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $jorgeMerchan->id,
            'materia' => 40,
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $jorgeMerchan->id,
            'materia' => 6
        ]);



        $wilsonEduardoNieto = App\Entities\Docente::create([
            'abreviatura'         => 'Ing',
            'nombres'             => 'Wilson Eduardo',
            'apellidos'           => 'Nieto Safadi',
            'identificacion'      => '0907915573',
            'tipo_identificacion' => 'CEDULA',
            'email'               => 'wilsonietodj@hotmail.com',
            'email_corporativo'   => 'wilson.nietos@ug.edu.ec',
            'celular'             => '0993036075',
            'telefono'            => '(04) 2 452-723',
            'estado_civil'        => 'CASADO',
            'genero'              => 'MASCULINO',
            'titulo_pregrado'     => '',
            'titulo_postgrado'    => '',
            'titulo_mba'          => '',
            'registro_senescyt'   => '',
            'fecha_nacimiento'    => '1965-01-05',
            'nacionalidad'        => 'Ecuatoriano',
            'residencia'          => 'Ecuador',
            'direccion'           => 'ARGENTINA 3307 ENTRE 9º Y 10º',
            'tipo_contrato'       => 'TIEMPO_COMPLETO'
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $wilsonEduardoNieto->id,
            'materia' => 15,
        ]);




        $anaRosaOrallana = App\Entities\Docente::create([
            'abreviatura'         => 'Ing',
            'nombres'             => 'Ana Rosa',
            'apellidos'           => 'Orallana Granda',
            'identificacion'      => '0914905211',
            'tipo_identificacion' => 'CEDULA',
            'email'               => 'aorellanag@hotmail.com',
            'email_corporativo'   => 'ana.orellanag@ug.edu.ec',
            'celular'             => '0979469857',
            'telefono'            => '(04) 2 475-945',
            'estado_civil'        => 'CASADO',
            'genero'              => 'FEMENINO',
            'titulo_pregrado'     => '',
            'titulo_postgrado'    => '',
            'titulo_mba'          => '',
            'registro_senescyt'   => '',
            'fecha_nacimiento'    => '1973-02-07',
            'nacionalidad'        => 'Ecuatoriano',
            'residencia'          => 'Ecuador',
            'direccion'           => 'URB. LA JOYA, MZ 6, VILLA 16',
            'tipo_contrato'       => 'TIEMPO_COMPLETO'
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $anaRosaOrallana->id,
            'materia' => 7,
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $anaRosaOrallana->id,
            'materia' => 25,
        ]);



        $fernandoXavierProanio = App\Entities\Docente::create([
            'abreviatura'         => 'Ing',
            'nombres'             => 'Fernando Xavier',
            'apellidos'           => 'Proaño Sanchez',
            'identificacion'      => '0913694808',
            'tipo_identificacion' => 'CEDULA',
            'email'               => 'fer281174@hotmail.com',
            'email_corporativo'   => 'fernando.proanosa@ug.edu.ec',
            'celular'             => '0959209889',
            'telefono'            => '(04) 6 036-375',
            'estado_civil'        => 'CASADO',
            'genero'              => 'MASCULINO',
            'titulo_pregrado'     => '',
            'titulo_postgrado'    => '',
            'titulo_mba'          => '',
            'registro_senescyt'   => '',
            'fecha_nacimiento'    => '1973-02-07',
            'nacionalidad'        => 'Ecuatoriano',
            'residencia'          => 'Ecuador',
            'direccion'           => '28 NOVIEMBRE 1974',
            'tipo_contrato'       => 'TIEMPO_COMPLETO'
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $fernandoXavierProanio->id,
            'materia' => 1,
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $fernandoXavierProanio->id,
            'materia' => 46,
        ]);



        $QuirozMartinezMiguel = App\Entities\Docente::create([
            'abreviatura'         => 'Ing',
            'nombres'             => 'Miguel Angel',
            'apellidos'           => 'Quiroz Martinez',
            'identificacion'      => '0922799655',
            'tipo_identificacion' => 'CEDULA',
            'email'               => 'fer281174@hotmail.com',
            'email_corporativo'   => 'fernando.proanosa@ug.edu.ec',
            'celular'             => '0959209889',
            'telefono'            => '(04) 6 036-375',
            'estado_civil'        => 'CASADO',
            'genero'              => 'MASCULINO',
            'titulo_pregrado'     => '',
            'titulo_postgrado'    => '',
            'titulo_mba'          => '',
            'registro_senescyt'   => '',
            'fecha_nacimiento'    => '1973-02-07',
            'nacionalidad'        => 'Ecuatoriano',
            'residencia'          => 'Ecuador',
            'direccion'           => '28 NOVIEMBRE 1974',
            'tipo_contrato'       => 'TIEMPO_COMPLETO'
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $fernandoXavierProanio->id,
            'materia' => 1,
        ]);

        App\Entities\MateriasDocente::create([
            'docente' => $fernandoXavierProanio->id,
            'materia' => 46,
        ]);

    }
}
