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

       $menuMenu = App\Menu::create([
       		'nombre'		=> 'menu', 
       		'titulo'		=> 'Menú', 
       		'url'			=> '/menu', 			
       		'iconclass'		=> 'fa fa-th-list', 
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

       $menuUsuarios = App\Menu::create([
       		'nombre'		=> 'usuarios', 
       		'titulo'		=> 'Usuarios', 
       		'url'			=> null, 			
       		'iconclass'		=> 'fa fa-users', 
       		'orden'			=> 4,
       		'cod_padre'		=> null
       	]);

       $menuUsuariosV1 = App\Menu::create([
       		'nombre'		=> 'mentenimiento_usuarios', 
       		'titulo'		=> 'Mantenimiento Usuarios', 
       		'url'			=> '/usuarios', 			
       		'iconclass'		=> 'fa fa-link', 
       		'orden'			=> 1,
       		'cod_padre'		=> $menuUsuarios->id
       	]);

       $menuUsuariosV2 = App\Menu::create([
       		'nombre'		=> 'mentenimiento_usuarios2', 
       		'titulo'		=> 'Mantenimiento Usuarios 2', 
       		'url'			=> '/sdk', 			
       		'iconclass'		=> 'fa fa-link', 
       		'orden'			=> 2,
       		'cod_padre'		=> $menuUsuarios->id
       	]);

       $menuUsuariosV3 = App\Menu::create([
       		'nombre'		=> 'mentenimiento_usuarios3', 
       		'titulo'		=> 'Mantenimiento Usuarios 3', 
       		'url'			=> '/paginate', 			
       		'iconclass'		=> 'fa fa-link', 
       		'orden'			=> 3,
       		'cod_padre'		=> $menuUsuarios->id
       	]);

       /**
        * Asignacion de acceso a los menus segun los roles
        * */
       App\RolMenu::create([
       		'rol'	=> $rolAdmin->id,
       		'menu'	=> $menuMenu->id,
       	]);

       App\RolMenu::create([
       		'rol'	=> $rolAdmin->id,
       		'menu'	=> $menuDashboard->id,
       	]);

       App\RolMenu::create([
       		'rol'	=> $rolAdmin->id,
       		'menu'	=> $menuUsuarios->id,
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
       		'rol'	=> $rolAdmin->id,
       		'menu'	=> $menuUsuariosV3->id,
       	]);

    }
}
