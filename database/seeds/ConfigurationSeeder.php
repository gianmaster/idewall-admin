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
       		'name' 			=> 'Chuck Norris',
        	'email' 		=> 'admin@admin.com',
        	'password' 		=> bcrypt('admin'),
        	'rol'			=> $rolRoot->id,
        	'remember_token' => str_random(10),
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

       $menuUsuariosV5 = App\Menu::create([
          'nombre'    => 'mantenimiento_items_catalogo', 
          'titulo'    => 'Áreas del Conocimiento', 
          'url'     => '/catalogos/1',      
          'iconclass'   => 'fa fa-link', 
          'orden'     => 4,
          'cod_padre'   => $menuUsuariosV4->id
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

       App\RolMenu::create([
          'rol' => $rolAdmin->id,
          'menu'  => $menuUsuariosV5->id,
        ]);

       /**
        * Creacion de Catalogos
        * */
       App\Entities\Catalogo::create([
          'nombre'      => 'AREAS_CONOCIMIENTO',
          'descripcion' => 'Áreas del Conocimiento de los docentes'
        ]);

    }
}
