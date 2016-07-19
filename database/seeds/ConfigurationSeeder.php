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
       $rolRoot = App\Rol::create([
       		'nombre'		=> 'SUPEROOT',
       		'descripcion'	=> 'Es el administrador y ve todo!'
       	]);

       $rolAdmin = App\Rol::create([
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
       		'name' 			     => 'Chuck Norris',
        	'email' 		     => 'admin@admin.com',
        	'password' 		    => bcrypt('admin'),
        	'rol'			       => $rolRoot->id,
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
        'periodo' => 'Período: 2016 - 2017',
        'nombre'  => 'Ciclo I'
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

        //menu malla academica
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


        $menuMalla = App\Menu::create([
            'nombre'    => 'malla_academica',
            'titulo'    => 'Malla Académica',
            'url'     => '/malla_academica',
            'iconclass'   => 'fa fa-link',
            'orden'     => 3,
            'cod_padre'   => $menuAdmin->id
        ]);

        App\RolMenu::create([
            'rol' => $rolAdmin->id,
            'menu'  => $menuMalla->id,
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
          'descripcion' => 'Semestre 6',
          'orden'       => 6,
          'activo'      => true
        ]);

       App\Entities\CatalogoItem::create([
          'catalogo'    => $sem->id,
          'codigo'      => 'SEM7',
          'descripcion' => 'Semestre 7',
          'orden'       => 7,
          'activo'      => true
        ]);

       App\Entities\CatalogoItem::create([
          'catalogo'    => $sem->id,
          'codigo'      => 'SEM8',
          'descripcion' => 'Semestre 8',
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

        //agregar materias a la malla academica
        App\Entities\MallaAcademica::create([
            'nombre_materia'    => 'Contabilidad Básica',
            'codigo_materia'    => '101',
            'horas'             => 8,
            'estado'            => 'ACTIVO',
            'semestre'          => 'SEM1',
        ]);

    }
}
