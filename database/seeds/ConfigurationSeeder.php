<?php

use Illuminate\Database\Seeder;

class ConfigurationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       /**
        * Creacion de los roles de usuario y acceso
        * */
        $rolAdmin = App\Rol::create([
       		'nombre'		=> 'SUPEROOT',
       		'descripcion'	=> 'Es el administrador y ve todo!'
       	]);

       $rolAdministrativo = App\Rol::create([
       		'nombre'		=> 'ADMINISTRATIVO',
       		'descripcion'	=> 'Es quien se encarga de asignar horas administrativa!'
       	]);

       $rolGestor = App\Rol::create([
       		'nombre'		=> 'GESTOR',
       		'descripcion'	=> 'Es el que se engarga de la asignacion de los horarios de clases!'
       	]);

       $rolVisitante = App\Rol::create([
       		'nombre'		=> 'VISITANTE',
       		'descripcion'	=> 'Es quien unicamente tiene acceso para verificar su información!'
       	]);

       /**
        * Creacion de los usuarios por defecto el administrador
        * */
       $admin = App\User::create([
       		'name' 			     => 'Super Admin',
        	'email' 		     => 'admin@admin.com',
        	'password' 		    => bcrypt('admin'),
        	'rol'			       => $rolAdmin->id,
        	'remember_token' => str_random(10),
          'state'          => 'ACTIVO',
          'avatar'          => 'http://giancarloscercado.com/images/dist/profile.png'
       	]);

       /**
        * Creacion de los menus
        * */

       $menuSistema = App\Menu::create([
       		'nombre'		=> 'sistema', 
       		'titulo'		=> 'Sistema', 
       		'url'			=> '/sistema', 			
       		'iconclass'		=> 'fa fa-cogs', 
       		'orden'			=> 2,
       		'cod_padre'		=> null
       	]);

       $menuDashboard = App\Menu::create([
       		'nombre'		=> 'dashboard', 
       		'titulo'		=> 'Dashboard', 
       		'url'			=> '/', 			
       		'iconclass'		=> 'fa fa-dashboard', 
       		'orden'			=> 3,
       		'cod_padre'		=> null
       	]);

       $menuUsuariosV1 = App\Menu::create([
       		'nombre'		=> 'mantenimiento_usuarios', 
       		'titulo'		=> 'Administración de Usuarios', 
       		'url'			=> '/usuarios', 			
       		'iconclass'		=> 'fa fa-users', 
       		'orden'			=> 1,
       		'cod_padre'		=> $menuSistema->id
       	]);

       $menuUsuariosV2 = App\Menu::create([
       		'nombre'		=> 'mantenimiento_menu', 
       		'titulo'		=> 'Administración de Menú', 
       		'url'			=> '/menu', 			
       		'iconclass'		=> 'fa fa-th-list', 
       		'orden'			=> 2,
       		'cod_padre'		=> $menuSistema->id
       	]);

       $menuUsuariosV3 = App\Menu::create([
       		'nombre'		=> 'mantenimiento_catalogos', 
       		'titulo'		=> 'Mantenimiento de Catálogos', 
       		'url'			=> '/catalogos', 			
       		'iconclass'		=> 'fa fa-cog', 
       		'orden'			=> 3,
       		'cod_padre'		=> $menuSistema->id
       	]);

       $menuUsuariosV4 = App\Menu::create([
          'nombre'    => 'mantenimiento_items_catalogo', 
          'titulo'    => 'Lista Items Cátalogos', 
          'url'     => '/catalogos_item',      
          'iconclass'   => 'fa fa-list', 
          'orden'     => 4,
          'cod_padre'   => $menuSistema->id
        ]);

       

       /**
        * Asignacion de acceso a los menus segun los roles
        * */
       App\RolMenu::create([
       		'rol'	=> $rolAdmin->id,
       		'menu'	=> $menuSistema->id,
       	]);

       App\RolMenu::create([
       		'rol'	=> $rolAdmin->id,
       		'menu'	=> $menuDashboard->id,
       	]);

       App\RolMenu::create([
       		'rol'	=> $rolAdmin->id,
       		'menu'	=> $menuUsuariosV1->id,
       	]);

       App\RolMenu::create([
       		'rol'	=> $rolAdmin->id,
       		'menu'	=> $menuUsuariosV2->id,
       	]);

       App\RolMenu::create([
          'rol' => $rolAdmin->id,
          'menu'  => $menuUsuariosV3->id,
        ]);

       App\RolMenu::create([
          'rol' => $rolAdmin->id,
          'menu'  => $menuUsuariosV4->id,
        ]);



      /**
       * Ciclos
       * */
      App\Entities\Ciclo::create([
        'anio' => 2016,
        'ciclo'  => 2
      ]); 



       /**
        * Creacion de Catalogos
        * */


       //Tipo de contratos
       $tipoContrato = App\Entities\Catalogo::create([
          'nombre'      => 'Tipo Contrato',
          'descripcion' => 'Tipo de contrato de los docentes'
        ]);

       App\Entities\CatalogoItem::create([
          'catalogo'    => $tipoContrato->id,
          'codigo'      => 'FULLTIME',
          'descripcion' => 'Tiempo Completo',
          'orden'       => 1,
          'activo'      => true
        ]);

       App\Entities\CatalogoItem::create([
          'catalogo'    => $tipoContrato->id,
          'codigo'      => 'PARTTIME',
          'descripcion' => 'Medio tiempo',
          'orden'       => 2,
          'activo'      => true
        ]);

       $menuTipoContrato = App\Menu::create([
          'nombre'    => 'tipo_contrato',
          'titulo'    => 'Tipo Contrato',
          'url'     => '/catalogos/1',
          'iconclass'   => 'fa fa-link',
          'orden'     => 1,
          'cod_padre'   => $menuUsuariosV4->id
        ]);

       App\RolMenu::create([
          'rol' => $rolAdmin->id,
          'menu'  => $menuTipoContrato->id,
        ]);


       

        //menu principal de administracion
        $menuAdmin = App\Menu::create([
            'nombre'    => 'administracion',
            'titulo'    => 'Administración',
            'url'     => '/administracion',
            'iconclass'   => 'fa fa-cog',
            'orden'     => 3,
            'cod_padre'   => null
        ]);

        App\RolMenu::create([
            'rol' => $rolAdmin->id,
            'menu'  => $menuAdmin->id,
        ]);

      //menu malla academica
        $menuMalla = App\Menu::create([
            'nombre'    => 'malla_academica',
            'titulo'    => 'Malla Académica',
            'url'     => '/malla_academica',
            'iconclass'   => 'fa fa-link',
            'orden'     => 1,
            'cod_padre'   => $menuAdmin->id
        ]);

        App\RolMenu::create([
            'rol' => $rolAdmin->id,
            'menu'  => $menuMalla->id,
        ]);

        //menu docentes
        $menuDocentes = App\Menu::create([
            'nombre'    => 'docentes',
            'titulo'    => 'Administración de Docentes',
            'url'     => '/docentes',
            'iconclass'   => 'fa fa-link',
            'orden'     => 2,
            'cod_padre'   => $menuAdmin->id
        ]);

        App\RolMenu::create([
            'rol' => $rolAdmin->id,
            'menu'  => $menuDocentes->id,
        ]);



       //Semestres
       $sem = App\Entities\Catalogo::create([
          'nombre'      => 'Semestres',
          'descripcion' => 'Semestres correspondientes a la malla de la carrera I.S.A.C'
        ]);

       App\Entities\CatalogoItem::create([
          'catalogo'    => $sem->id,
          'codigo'      => 'SEM1',
          'descripcion' => 'Semestre I',
          'orden'       => 1,
          'activo'      => true
        ]);

       App\Entities\CatalogoItem::create([
          'catalogo'    => $sem->id,
          'codigo'      => 'SEM2',
          'descripcion' => 'Semestre II',
          'orden'       => 2,
          'activo'      => true
        ]);

       App\Entities\CatalogoItem::create([
          'catalogo'    => $sem->id,
          'codigo'      => 'SEM3',
          'descripcion' => 'Semestre III',
          'orden'       => 3,
          'activo'      => true
        ]);

       App\Entities\CatalogoItem::create([
          'catalogo'    => $sem->id,
          'codigo'      => 'SEM4',
          'descripcion' => 'Semestre IV',
          'orden'       => 4,
          'activo'      => true
        ]);

       App\Entities\CatalogoItem::create([
          'catalogo'    => $sem->id,
          'codigo'      => 'SEM5',
          'descripcion' => 'Semestre V',
          'orden'       => 5,
          'activo'      => true
        ]);

       App\Entities\CatalogoItem::create([
          'catalogo'    => $sem->id,
          'codigo'      => 'SEM6',
          'descripcion' => 'Semestre VI',
          'orden'       => 6,
          'activo'      => true
        ]);

       App\Entities\CatalogoItem::create([
          'catalogo'    => $sem->id,
          'codigo'      => 'SEM7',
          'descripcion' => 'Semestre VII',
          'orden'       => 7,
          'activo'      => true
        ]);

       App\Entities\CatalogoItem::create([
          'catalogo'    => $sem->id,
          'codigo'      => 'SEM8',
          'descripcion' => 'Semestre VIII',
          'orden'       => 8,
          'activo'      => true
        ]);


       $menuSemestres = App\Menu::create([
          'nombre'    => 'semestres', 
          'titulo'    => 'Semestres I.S.A.C', 
          'url'     => '/catalogos/2',      
          'iconclass'   => 'fa fa-link', 
          'orden'     => 2,
          'cod_padre'   => $menuUsuariosV4->id
        ]);

       App\RolMenu::create([
          'rol' => $rolAdmin->id,
          'menu'  => $menuSemestres->id,
        ]);


       //Tipo Hora Asignacion
       $tipoHA = App\Entities\Catalogo::create([
          'nombre'      => 'Tipo Hora Asignación',
          'descripcion' => 'Tipo de hora laboral que se le asigna a los docentes'
        ]);

       App\Entities\CatalogoItem::create([
          'catalogo'    => $tipoHA->id,
          'codigo'      => 'ACA',
          'descripcion' => 'Académica',
          'orden'       => 1,
          'activo'      => true
        ]);

       App\Entities\CatalogoItem::create([
          'catalogo'    => $tipoHA->id,
          'codigo'      => 'ADM',
          'descripcion' => 'Administrativa',
          'orden'       => 2,
          'activo'      => true
        ]);


       $menuHraAsig = App\Menu::create([
          'nombre'    => 'tipo_hora_asignacion', 
          'titulo'    => 'Tipo Hora Asignación', 
          'url'     => '/catalogos/3',      
          'iconclass'   => 'fa fa-link', 
          'orden'     => 2,
          'cod_padre'   => $menuUsuariosV4->id
        ]);

       App\RolMenu::create([
          'rol' => $rolAdmin->id,
          'menu'  => $menuHraAsig->id,
        ]);


       //Aulas - paralelos
       $aulas = App\Entities\Catalogo::create([
          'nombre'      => 'Aulas',
          'descripcion' => 'Aulas o paralelos asignados a la carrera I.S.A.C'
        ]);

       App\Entities\CatalogoItem::create([
          'catalogo'    => $aulas->id,
          'codigo'      => 'A56',
          'descripcion' => 'Aula 202 - Bloque C - Piso 1',
          'orden'       => 1,
          'activo'      => true
        ]);

       App\Entities\CatalogoItem::create([
          'catalogo'    => $aulas->id,
          'codigo'      => 'A76',
          'descripcion' => 'Aula 203 - Bloque C - Piso 1',
          'orden'       => 2,
          'activo'      => true
        ]);

       App\Entities\CatalogoItem::create([
          'catalogo'    => $aulas->id,
          'codigo'      => 'B67',
          'descripcion' => 'Aula 302 - Bloque C - Piso 2',
          'orden'       => 3,
          'activo'      => true
        ]);

       App\Entities\CatalogoItem::create([
          'catalogo'    => $aulas->id,
          'codigo'      => 'D76',
          'descripcion' => 'Aula 701 - Bloque D - PB',
          'orden'       => 4,
          'activo'      => true
        ]);


       $menuAulas = App\Menu::create([
          'nombre'    => 'aulas_paralelos', 
          'titulo'    => 'Aulas o Paralelos', 
          'url'     => '/catalogos/4',      
          'iconclass'   => 'fa fa-link', 
          'orden'     => 2,
          'cod_padre'   => $menuUsuariosV4->id
        ]);

        App\RolMenu::create([
            'rol' => $rolAdmin->id,
            'menu'  => $menuAulas->id,
        ]);


        //Tipo de Jornada
       $tipoJornada = App\Entities\Catalogo::create([
          'nombre'      => 'Tipos Jornada',
          'descripcion' => 'Tipo de Jornadas para los Semestres'
        ]);

       App\Entities\CatalogoItem::create([
          'catalogo'    => $tipoJornada->id,
          'codigo'      => 'MAT',
          'descripcion' => 'Matutína',
          'orden'       => 1,
          'activo'      => true
        ]);

       App\Entities\CatalogoItem::create([
          'catalogo'    => $tipoJornada->id,
          'codigo'      => 'VES',
          'descripcion' => 'Vespertina',
          'orden'       => 2,
          'activo'      => true
        ]);

       App\Entities\CatalogoItem::create([
          'catalogo'    => $tipoJornada->id,
          'codigo'      => 'NOC',
          'descripcion' => 'Nocturna',
          'orden'       => 2,
          'activo'      => true
        ]);

       $menuTipoJornada = App\Menu::create([
          'nombre'    => 'tipo_jornada',
          'titulo'    => 'Jornadas Semestre',
          'url'     => '/catalogos/5',
          'iconclass'   => 'fa fa-link',
          'orden'     => 5,
          'cod_padre'   => $menuUsuariosV4->id
        ]);

       App\RolMenu::create([
          'rol' => $rolAdmin->id,
          'menu'  => $menuTipoJornada->id,
        ]);

        //agregar materias a la malla academica
        //Del primer semestre
        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Contabilidad Básica',
            'codigo_materia'    => '101',
            'horas'             => 8,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM1',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Matemáticas Aplicadas',
            'codigo_materia'    => '102',
            'horas'             => 8,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM1',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Derecho I',
            'codigo_materia'    => '106',
            'horas'             => 4,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM1',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Computación I',
            'codigo_materia'    => '108',
            'horas'             => 2,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM1',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Ingles I',
            'codigo_materia'    => '109',
            'horas'             => 3,
            'estado'            => 'NO_CALCULABLE',
            'semestre'          => 'SEM1',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Metodología de la Investigación I',
            'codigo_materia'    => '107',
            'horas'             => 4,
            'estado'            => 'NO_CALCULABLE',
            'semestre'          => 'SEM1',
        ]);

        //Materias del segundo semestre
        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Contabilidad Intermadia',
            'codigo_materia'    => '201',
            'horas'             => 8,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM2',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Matemáticas Financieras I',
            'codigo_materia'    => '202',
            'horas'             => 8,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM2',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Derecho II',
            'codigo_materia'    => '206',
            'horas'             => 4,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM2',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Computación II',
            'codigo_materia'    => '208',
            'horas'             => 2,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM2',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Ingles II',
            'codigo_materia'    => '209',
            'horas'             => 3,
            'estado'            => 'NO_CALCULABLE',
            'semestre'          => 'SEM2',
        ]);

        //Materias 3er semestre
        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Contabilidad de Costos y Administrativa',
            'codigo_materia'    => '301',
            'horas'             => 9,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM3',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Estadística I',
            'codigo_materia'    => '302',
            'horas'             => 5,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM3',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Derecho III',
            'codigo_materia'    => '303',
            'horas'             => 4,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM3',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Organización Computacional',
            'codigo_materia'    => '304',
            'horas'             => 3,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM3',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Ingles III',
            'codigo_materia'    => '309',
            'horas'             => 3,
            'estado'            => 'NO_CALCULABLE',
            'semestre'          => 'SEM3',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Computación III',
            'codigo_materia'    => '308',
            'horas'             => 3,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM3',
        ]);

        //Materias 4to semestre
        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Estadística II',
            'codigo_materia'    => '401',
            'horas'             => 5,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM4',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Micro y Macro',
            'codigo_materia'    => '402',
            'horas'             => 4,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM4',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Programación I',
            'codigo_materia'    => '403',
            'horas'             => 5,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM4',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Arquitectura Computacional',
            'codigo_materia'    => '404',
            'horas'             => 5,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM4',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Ingles IV',
            'codigo_materia'    => '409',
            'horas'             => 3,
            'estado'            => 'NO_CALCULABLE',
            'semestre'          => 'SEM4',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Computación IV',
            'codigo_materia'    => '408',
            'horas'             => 3,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM4',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Mantenimiento de Computadoras',
            'codigo_materia'    => '405',
            'horas'             => 2,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM4',
        ]);

        //Materias 5to semestre
        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Administración de Empresas',
            'codigo_materia'    => '501',
            'horas'             => 5,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM5',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Negociación y solución de conflictos',
            'codigo_materia'    => '502',
            'horas'             => 3,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM5',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Programación II',
            'codigo_materia'    => '503',
            'horas'             => 5,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM5',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Redes Computacionales',
            'codigo_materia'    => '504',
            'horas'             => 4,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM5',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Análisis y Diseño de Sistemas',
            'codigo_materia'    => '505',
            'horas'             => 3,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM5',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Ingles V',
            'codigo_materia'    => '509',
            'horas'             => 3,
            'estado'            => 'NO_CALCULABLE',
            'semestre'          => 'SEM5',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Comutación V',
            'codigo_materia'    => '508',
            'horas'             => 2,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM5',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Emprendedores',
            'codigo_materia'    => '506',
            'horas'             => 3,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM5',
        ]);

        //Materias 6to semestre
        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Administración Financiera I',
            'codigo_materia'    => '601',
            'horas'             => 8,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM6',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Estructura de Datos',
            'codigo_materia'    => '602',
            'horas'             => 4,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM6',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Punto Net',
            'codigo_materia'    => '603',
            'horas'             => 4,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM6',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Base de Datos',
            'codigo_materia'    => '604',
            'horas'             => 4,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM6',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Ingles VI',
            'codigo_materia'    => '609',
            'horas'             => 3,
            'estado'            => 'NO_CALCULABLE',
            'semestre'          => 'SEM6',
        ]);



         //Materias 7mo semestre
        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Administración Financiera II',
            'codigo_materia'    => '701',
            'horas'             => 6,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM7',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Sistemas de Información Gerencial',
            'codigo_materia'    => '702',
            'horas'             => 3,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM7',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Programación Orientada a Objetos',
            'codigo_materia'    => '703',
            'horas'             => 4,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM7',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Auditoria de Sistemas',
            'codigo_materia'    => '704',
            'horas'             => 3,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM7',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'E-BUSSINESS',
            'codigo_materia'    => '705',
            'horas'             => 3,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM7',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Ingles VII',
            'codigo_materia'    => '709',
            'horas'             => 3,
            'estado'            => 'NO_CALCULABLE',
            'semestre'          => 'SEM7',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Comutación VI',
            'codigo_materia'    => '708',
            'horas'             => 2,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM7',
        ]);


         //Materias 8vo semestre
        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Banca y Mercado de Valores',
            'codigo_materia'    => '801',
            'horas'             => 5,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM8',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Planeación Estratégica',
            'codigo_materia'    => '802',
            'horas'             => 5,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM8',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'OPTATIVA',
            'codigo_materia'    => '805',
            'horas'             => 4,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM8',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Tecnología de la Información',
            'codigo_materia'    => '803',
            'horas'             => 3,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM8',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Administración de Redes Sociales',
            'codigo_materia'    => '804',
            'horas'             => 3,
            'estado'            => 'VIGENTE',
            'semestre'          => 'SEM8',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Ingles VIII',
            'codigo_materia'    => '809',
            'horas'             => 3,
            'estado'            => 'NO_CALCULABLE',
            'semestre'          => 'SEM8',
        ]);


        //menu principal de GESTION DE CARGA HORARIA
        $menuCargaH = App\Menu::create([
            'nombre'    => 'carga_horaria',
            'titulo'    => 'Cargas Horarias',
            'url'     => '/cargas_horarias',
            'iconclass'   => 'fa fa-calendar-o',
            'orden'     => 4,
            'cod_padre'   => null
        ]);

        App\RolMenu::create([
            'rol' => $rolAdmin->id,
            'menu'  => $menuCargaH->id,
        ]);


        //menu jornadas por semestres
        $menuJornadaSemestre = App\Menu::create([
            'nombre'    => 'jornadas_semestre',
            'titulo'    => 'Jornadas Semestre',
            'url'     => '/jornadasemestres',
            'iconclass'   => 'fa fa-link',
            'orden'     => 1,
            'cod_padre'   => $menuCargaH->id
        ]);

        App\RolMenu::create([
            'rol' => $rolAdmin->id,
            'menu'  => $menuJornadaSemestre->id,
        ]);


        //menu materias docentes
        $menuMateriasDocentes = App\Menu::create([
            'nombre'    => 'materias_docentes',
            'titulo'    => 'Materias Docentes',
            'url'     => '/materias_docentes',
            'iconclass'   => 'fa fa-link',
            'orden'     => 2,
            'cod_padre'   => $menuCargaH->id
        ]);

        App\RolMenu::create([
            'rol' => $rolAdmin->id,
            'menu'  => $menuMateriasDocentes->id,
        ]);

    }
}
