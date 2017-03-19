<?php

use Illuminate\Database\Seeder;
use App\Entities\Distributivo;
use App\Entities\ItemDistributivo;

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
            'nombre' => 'ADMINISTRADOR',
            'descripcion' => 'Es el administrador y ve todo!'
        ]);

        $rolAdministrativo = App\Rol::create([
            'nombre' => 'OPERATIVO',
            'descripcion' => 'Es quien se encarga de asignar horas administrativa!'
        ]);

        /*
        $rolGestor = App\Rol::create([
            'nombre' => 'GESTOR',
            'descripcion' => 'Es el que se engarga de la asignacion de los horarios de clases!'
        ]);

        $rolVisitante = App\Rol::create([
            'nombre' => 'VISITANTE',
            'descripcion' => 'Es quien unicamente tiene acceso para verificar su información!'
        ]);
        */

        /**
         * Creacion de los usuarios por defecto el administrador
         * */
        $admin = App\User::create([
            'name' => 'Super Admin',
            'email' => 'giancarloscercado@gmail.com',
            'password' => bcrypt('admin'),
            'rol' => $rolAdmin->id,
            'remember_token' => str_random(10),
            'state' => 'ACTIVO',
            'avatar' => 'http://giancarloscercado.com/images/dist/profile.png'
        ]);

        $hurel = App\User::create([
            'name' => 'Raul Hurel',
            'email' => 'raul.hurelgu@ug.edu.ec',
            'password' => bcrypt('admin'),
            'rol' => $rolAdministrativo->id,
            'remember_token' => str_random(10),
            'state' => 'ACTIVO',
            //'avatar' => 'http://giancarloscercado.com/images/dist/profile.png'
            'avatar' => 'https://cdn3.iconfinder.com/data/icons/users-6/100/men-computer-1-512.png'
        ]);

        $susana = App\User::create([
            'name' => 'Susana Carrillo',
            'email' => 'susana.carrillov@ug.edu.ec',
            'password' => bcrypt('admin'),
            'rol' => $rolAdministrativo->id,
            'remember_token' => str_random(10),
            'state' => 'ACTIVO',
            //'avatar' => 'http://giancarloscercado.com/images/dist/profile.png'
            'avatar' => 'https://cdn3.iconfinder.com/data/icons/users-6/100/men-computer-1-512.png'
        ]);

        /**
         * Creacion de los menus
         * */

        $menuSistema = App\Menu::create([
            'nombre' => 'sistema',
            'titulo' => 'Sistema',
            'url' => '/sistema',
            'iconclass' => 'fa fa-cogs',
            'orden' => 2,
            'cod_padre' => null
        ]);

        $menuDashboard = App\Menu::create([
            'nombre' => 'dashboard',
            'titulo' => 'Dashboard',
            'url' => '/',
            'iconclass' => 'fa fa-dashboard',
            'orden' => 3,
            'cod_padre' => null
        ]);

        $menuUsuariosV1 = App\Menu::create([
            'nombre' => 'mantenimiento_usuarios',
            'titulo' => 'Administración de Usuarios',
            'url' => '/usuarios',
            'iconclass' => 'fa fa-users',
            'orden' => 1,
            'cod_padre' => $menuSistema->id
        ]);

        $menuUsuariosV2 = App\Menu::create([
            'nombre' => 'mantenimiento_menu',
            'titulo' => 'Administración de Menú',
            'url' => '/menu',
            'iconclass' => 'fa fa-th-list',
            'orden' => 2,
            'cod_padre' => $menuSistema->id
        ]);

        $menuUsuariosV3 = App\Menu::create([
            'nombre' => 'mantenimiento_catalogos',
            'titulo' => 'Mantenimiento de Catálogos',
            'url' => '/catalogos',
            'iconclass' => 'fa fa-cog',
            'orden' => 3,
            'cod_padre' => $menuSistema->id
        ]);

        $menuUsuariosV4 = App\Menu::create([
            'nombre' => 'mantenimiento_items_catalogo',
            'titulo' => 'Lista Items Cátalogos',
            'url' => '/catalogos_item',
            'iconclass' => 'fa fa-list',
            'orden' => 4,
            'cod_padre' => $menuSistema->id
        ]);


        $menuUsuariosV5 = App\Menu::create([
            'nombre' => 'mentenimiento_cabecera_reportes',
            'titulo' => 'Cabecera Reportes',
            'url' => '/config_reportes',
            'iconclass' => 'fa fa-file',
            'orden' => 5,
            'cod_padre' => $menuSistema->id
        ]);


        /**
         * Asignacion de acceso a los menus segun los roles
         * */
        App\RolMenu::create([
            'rol' => $rolAdmin->id,
            'menu' => $menuSistema->id,
        ]);

        App\RolMenu::create([
            'rol' => $rolAdministrativo->id,
            'menu' => $menuDashboard->id,
        ]);

        App\RolMenu::create([
            'rol' => $rolAdmin->id,
            'menu' => $menuUsuariosV1->id,
        ]);

        App\RolMenu::create([
            'rol' => $rolAdmin->id,
            'menu' => $menuUsuariosV2->id,
        ]);

        App\RolMenu::create([
            'rol' => $rolAdmin->id,
            'menu' => $menuUsuariosV3->id,
        ]);

        App\RolMenu::create([
            'rol' => $rolAdmin->id,
            'menu' => $menuUsuariosV4->id,
        ]);

        App\RolMenu::create([
            'rol' => $rolAdmin->id,
            'menu' => $menuUsuariosV5->id,
        ]);


        /**
         * Ciclos
         * */
        App\Entities\Ciclo::create([
            'anio' => 2017,
            'ciclo' => 1,
            'fecha_inicio'  => '2017-05-09',
            'fecha_fin'  => '2017-09-30'
        ]);


        /**
         * Creacion de Catalogos
         * */


        //Tipo de contratos
        $tipoContrato = App\Entities\Catalogo::create([
            'nombre' => 'Tipo Contrato',
            'descripcion' => 'Tipo de contrato de los docentes'
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $tipoContrato->id,
            'codigo' => 'FULLTIME',
            'descripcion' => 'Tiempo Completo',
            'orden' => 1,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $tipoContrato->id,
            'codigo' => 'PARTTIME',
            'descripcion' => 'Medio tiempo',
            'orden' => 2,
            'activo' => true
        ]);

        $menuTipoContrato = App\Menu::create([
            'nombre' => 'tipo_contrato',
            'titulo' => 'Tipo Contrato',
            'url' => '/catalogos/1',
            'iconclass' => 'fa fa-link',
            'orden' => 1,
            'cod_padre' => $menuUsuariosV4->id
        ]);

        App\RolMenu::create([
            'rol' => $rolAdmin->id,
            'menu' => $menuTipoContrato->id,
        ]);


        //menu principal de administracion
        $menuAdmin = App\Menu::create([
            'nombre' => 'administracion',
            'titulo' => 'Administración',
            'url' => '/administracion',
            'iconclass' => 'fa fa-cog',
            'orden' => 3,
            'cod_padre' => null
        ]);

        App\RolMenu::create([
            'rol' => $rolAdministrativo->id,
            'menu' => $menuAdmin->id,
        ]);

        //menu tipo de distributivos
        $menuTipoDistributivo = App\Menu::create([
            'nombre' => 'tipos_distributivo',
            'titulo' => 'Tipos Distributivo',
            'url' => '/tipos_distributivo',
            'iconclass' => 'fa fa-link',
            'orden' => 1,
            'cod_padre' => $menuAdmin->id
        ]);

        App\RolMenu::create([
            'rol' => $rolAdministrativo->id,
            'menu' => $menuTipoDistributivo->id,
        ]);

        //menu malla academica
        $menuMalla = App\Menu::create([
            'nombre' => 'malla_academica',
            'titulo' => 'Malla Académica',
            'url' => '/malla_academica',
            'iconclass' => 'fa fa-link',
            'orden' => 2,
            'cod_padre' => $menuAdmin->id
        ]);

        App\RolMenu::create([
            'rol' => $rolAdministrativo->id,
            'menu' => $menuMalla->id,
        ]);

        //menu docentes
        $menuDocentes = App\Menu::create([
            'nombre' => 'docentes',
            'titulo' => 'Administración de Docentes',
            'url' => '/docentes',
            'iconclass' => 'fa fa-link',
            'orden' => 3,
            'cod_padre' => $menuAdmin->id
        ]);

        App\RolMenu::create([
            'rol' => $rolAdministrativo->id,
            'menu' => $menuDocentes->id,
        ]);


        //Semestres
        $sem = App\Entities\Catalogo::create([
            'nombre' => 'Semestres',
            'descripcion' => 'Semestres correspondientes a la malla de la carrera I.S.A.C'
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $sem->id,
            'codigo' => 'SEM1',
            'descripcion' => 'Semestre I',
            'orden' => 1,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $sem->id,
            'codigo' => 'SEM2',
            'descripcion' => 'Semestre II',
            'orden' => 2,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $sem->id,
            'codigo' => 'SEM3',
            'descripcion' => 'Semestre III',
            'orden' => 3,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $sem->id,
            'codigo' => 'SEM4',
            'descripcion' => 'Semestre IV',
            'orden' => 4,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $sem->id,
            'codigo' => 'SEM5',
            'descripcion' => 'Semestre V',
            'orden' => 5,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $sem->id,
            'codigo' => 'SEM6',
            'descripcion' => 'Semestre VI',
            'orden' => 6,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $sem->id,
            'codigo' => 'SEM7',
            'descripcion' => 'Semestre VII',
            'orden' => 7,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $sem->id,
            'codigo' => 'SEM8',
            'descripcion' => 'Semestre VIII',
            'orden' => 8,
            'activo' => true
        ]);


        $menuSemestres = App\Menu::create([
            'nombre' => 'semestres',
            'titulo' => 'Semestres I.S.A.C',
            'url' => '/catalogos/2',
            'iconclass' => 'fa fa-link',
            'orden' => 2,
            'cod_padre' => $menuUsuariosV4->id
        ]);

        App\RolMenu::create([
            'rol' => $rolAdmin->id,
            'menu' => $menuSemestres->id,
        ]);


        //Tipo Hora Asignacion
        $tipoHA = App\Entities\Catalogo::create([
            'nombre' => 'Tipo Hora Asignación',
            'descripcion' => 'Tipo de hora laboral que se le asigna a los docentes'
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $tipoHA->id,
            'codigo' => 'ACA',
            'descripcion' => 'Académica',
            'orden' => 1,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $tipoHA->id,
            'codigo' => 'ADM',
            'descripcion' => 'Administrativa',
            'orden' => 2,
            'activo' => true
        ]);


        $menuHraAsig = App\Menu::create([
            'nombre' => 'tipo_hora_asignacion',
            'titulo' => 'Tipo Hora Asignación',
            'url' => '/catalogos/3',
            'iconclass' => 'fa fa-link',
            'orden' => 2,
            'cod_padre' => $menuUsuariosV4->id
        ]);

        App\RolMenu::create([
            'rol' => $rolAdmin->id,
            'menu' => $menuHraAsig->id,
        ]);


        //Aulas - Cursos
        $aulas = App\Entities\Catalogo::create([
            'nombre' => 'Aulas',
            'descripcion' => 'Aulas o Cursos asignados a la carrera I.S.A.C'
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $aulas->id,
            'codigo' => 'A56',
            'descripcion' => 'Aula 202 - Bloque C - Piso 1',
            'orden' => 1,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $aulas->id,
            'codigo' => 'A76',
            'descripcion' => 'Aula 203 - Bloque C - Piso 1',
            'orden' => 2,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $aulas->id,
            'codigo' => 'B67',
            'descripcion' => 'Aula 302 - Bloque C - Piso 2',
            'orden' => 3,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $aulas->id,
            'codigo' => 'D76',
            'descripcion' => 'Aula 701 - Bloque D - PB',
            'orden' => 4,
            'activo' => true
        ]);


        $menuAulas = App\Menu::create([
            'nombre' => 'aulas_paralelos',
            'titulo' => 'Aulas o Cursos',
            'url' => '/catalogos/4',
            'iconclass' => 'fa fa-link',
            'orden' => 2,
            'cod_padre' => $menuUsuariosV4->id
        ]);

        App\RolMenu::create([
            'rol' => $rolAdmin->id,
            'menu' => $menuAulas->id,
        ]);


        //Tipo de Jornada
        $tipoJornada = App\Entities\Catalogo::create([
            'nombre' => 'Tipos Jornada',
            'descripcion' => 'Tipo de Jornadas para los Semestres'
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $tipoJornada->id,
            'codigo' => 'MAT',
            'descripcion' => 'Matutína',
            'aux1' => '08:30',
            'aux2' => '12:30',
            'orden' => 1,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $tipoJornada->id,
            'codigo' => 'VES',
            'descripcion' => 'Vespertina',
            'aux1' => '14:00',
            'aux2' => '18:00',
            'orden' => 2,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $tipoJornada->id,
            'codigo' => 'NOC',
            'descripcion' => 'Nocturna',
            'aux1' => '18:40',
            'aux2' => '22:40',
            'orden' => 3,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $tipoJornada->id,
            'codigo' => 'ESP',
            'descripcion' => 'Especial',
            'aux1' => '07:30',
            'aux2' => '22:00',
            'orden' => 3,
            'activo' => true
        ]);

        $menuTipoJornada = App\Menu::create([
            'nombre' => 'tipo_jornada',
            'titulo' => 'Jornadas Semestre',
            'url' => '/catalogos/5',
            'iconclass' => 'fa fa-link',
            'orden' => 5,
            'cod_padre' => $menuUsuariosV4->id
        ]);

        App\RolMenu::create([
            'rol' => $rolAdmin->id,
            'menu' => $menuTipoJornada->id,
        ]);



        //Paralelos
        $paralelo = App\Entities\Catalogo::create([
            'nombre' => 'Paralelos',
            'descripcion' => 'Paralelos de los cursos I.S.A.C'
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $paralelo->id,
            'codigo' => '151',
            'descripcion' => '1-51',
            'orden' => 1,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $paralelo->id,
            'codigo' => '152',
            'descripcion' => '1-52',
            'orden' => 2,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $paralelo->id,
            'codigo' => '153',
            'descripcion' => '1-53',
            'orden' => 3,
            'activo' => true
        ]);


        App\Entities\CatalogoItem::create([
            'catalogo' => $paralelo->id,
            'codigo' => '251',
            'descripcion' => '2-51',
            'orden' => 1,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $paralelo->id,
            'codigo' => '252',
            'descripcion' => '2-52',
            'orden' => 2,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $paralelo->id,
            'codigo' => '253',
            'descripcion' => '2-53',
            'orden' => 3,
            'activo' => true
        ]);


        App\Entities\CatalogoItem::create([
            'catalogo' => $paralelo->id,
            'codigo' => '351',
            'descripcion' => '3-51',
            'orden' => 1,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $paralelo->id,
            'codigo' => '352',
            'descripcion' => '3-52',
            'orden' => 2,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $paralelo->id,
            'codigo' => '353',
            'descripcion' => '3-53',
            'orden' => 3,
            'activo' => true
        ]);


        App\Entities\CatalogoItem::create([
            'catalogo' => $paralelo->id,
            'codigo' => '451',
            'descripcion' => '4-51',
            'orden' => 1,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $paralelo->id,
            'codigo' => '452',
            'descripcion' => '4-52',
            'orden' => 2,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $paralelo->id,
            'codigo' => '453',
            'descripcion' => '4-53',
            'orden' => 3,
            'activo' => true
        ]);


        App\Entities\CatalogoItem::create([
            'catalogo' => $paralelo->id,
            'codigo' => '551',
            'descripcion' => '5-51',
            'orden' => 1,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $paralelo->id,
            'codigo' => '552',
            'descripcion' => '5-52',
            'orden' => 2,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $paralelo->id,
            'codigo' => '553',
            'descripcion' => '5-53',
            'orden' => 3,
            'activo' => true
        ]);



        App\Entities\CatalogoItem::create([
            'catalogo' => $paralelo->id,
            'codigo' => '651',
            'descripcion' => '6-51',
            'orden' => 1,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $paralelo->id,
            'codigo' => '652',
            'descripcion' => '6-52',
            'orden' => 2,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $paralelo->id,
            'codigo' => '653',
            'descripcion' => '6-53',
            'orden' => 3,
            'activo' => true
        ]);


        App\Entities\CatalogoItem::create([
            'catalogo' => $paralelo->id,
            'codigo' => '751',
            'descripcion' => '7-51',
            'orden' => 1,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $paralelo->id,
            'codigo' => '752',
            'descripcion' => '7-52',
            'orden' => 2,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $paralelo->id,
            'codigo' => '753',
            'descripcion' => '7-53',
            'orden' => 3,
            'activo' => true
        ]);



        App\Entities\CatalogoItem::create([
            'catalogo' => $paralelo->id,
            'codigo' => '851',
            'descripcion' => '8-51',
            'orden' => 1,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $paralelo->id,
            'codigo' => '852',
            'descripcion' => '8-52',
            'orden' => 2,
            'activo' => true
        ]);

        App\Entities\CatalogoItem::create([
            'catalogo' => $paralelo->id,
            'codigo' => '853',
            'descripcion' => '8-53',
            'orden' => 3,
            'activo' => true
        ]);


        $menuParalelos = App\Menu::create([
            'nombre' => 'paralelos_carrera',
            'titulo' => 'Paralelos',
            'url' => '/catalogos/6',
            'iconclass' => 'fa fa-link',
            'orden' => 2,
            'cod_padre' => $menuUsuariosV4->id
        ]);

        App\RolMenu::create([
            'rol' => $rolAdmin->id,
            'menu' => $menuParalelos->id,
        ]);


        //agregar materias a la malla academica
        //Del primer semestre
        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Contabilidad Básica',
            'codigo_materia' => '101',
            'horas' => 8,
            'estado' => 'ACTIVO',
            'tipo_materia' => 'BASICA',
            'tipo_asignacion' => 'NORMAL',
            'semestre' => 'SEM1',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Matemáticas Aplicadas',
            'codigo_materia' => '102',
            'horas' => 8,
            'estado' => 'ACTIVO',
            'tipo_materia' => 'BASICA',
            'tipo_asignacion' => 'NORMAL',
            'semestre' => 'SEM1',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Derecho I',
            'codigo_materia' => '106',
            'horas' => 4,
            'tipo_materia' => 'BASICA',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM1',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Computación I',
            'codigo_materia' => '108',
            'horas' => 2,
            'tipo_materia' => 'BASICA',
            'tipo_asignacion' => 'ESPECIAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM1',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Ingles I',
            'codigo_materia' => '109',
            'horas' => 3,
            'tipo_materia' => 'GENERAL',
            'tipo_asignacion' => 'ESPECIAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM1',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Metodología de la Investigación I',
            'codigo_materia' => '107',
            'horas' => 4,
            'tipo_materia' => 'GENERAL',
            'tipo_asignacion' => 'ESPECIAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM1',
        ]);

        //Materias del segundo semestre
        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Contabilidad Intermadia',
            'codigo_materia' => '201',
            'horas' => 8,
            'tipo_materia' => 'BASICA',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM2',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Matemáticas Financieras I',
            'codigo_materia' => '202',
            'horas' => 8,
            'tipo_materia' => 'BASICA',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM2',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Derecho II',
            'codigo_materia' => '206',
            'horas' => 4,
            'tipo_materia' => 'BASICA',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM2',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Computación II',
            'codigo_materia' => '208',
            'horas' => 2,
            'tipo_materia' => 'BASICA',
            'tipo_asignacion' => 'ESPECIAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM2',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Ingles II',
            'codigo_materia' => '209',
            'horas' => 3,
            'tipo_materia' => 'GENERAL',
            'tipo_asignacion' => 'ESPECIAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM2',
        ]);

        //Materias 3er semestre
        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Contabilidad de Costos y Administrativa',
            'codigo_materia' => '301',
            'horas' => 9,
            'tipo_materia' => 'BASICA',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM3',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Estadística I',
            'codigo_materia' => '302',
            'horas' => 5,
            'tipo_materia' => 'BASICA',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM3',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Derecho III',
            'codigo_materia' => '303',
            'horas' => 4,
            'tipo_materia' => 'BASICA',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM3',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Organización Computacional',
            'codigo_materia' => '304',
            'horas' => 3,
            'tipo_materia' => 'PROFESIONAL',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM3',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Ingles III',
            'codigo_materia' => '309',
            'horas' => 3,
            'tipo_materia' => 'GENERAL',
            'tipo_asignacion' => 'ESPECIAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM3',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Computación III',
            'codigo_materia' => '308',
            'horas' => 3,
            'tipo_materia' => 'BASICA',
            'tipo_asignacion' => 'ESPECIAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM3',
        ]);

        //Materias 4to semestre
        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Estadística II',
            'codigo_materia' => '401',
            'horas' => 5,
            'tipo_materia' => 'BASICA',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM4',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Micro y Macro',
            'codigo_materia' => '402',
            'horas' => 4,
            'tipo_materia' => 'BASICA',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM4',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Programación I',
            'codigo_materia' => '403',
            'horas' => 5,
            'tipo_materia' => 'PROFESIONAL',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM4',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Arquitectura Computacional',
            'codigo_materia' => '404',
            'horas' => 5,
            'tipo_materia' => 'PROFESIONAL',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM4',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Ingles IV',
            'codigo_materia' => '409',
            'horas' => 3,
            'tipo_materia' => 'GENERAL',
            'tipo_asignacion' => 'ESPECIAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM4',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Computación IV',
            'codigo_materia' => '408',
            'horas' => 3,
            'tipo_materia' => 'BASICA',
            'tipo_asignacion' => 'ESPECIAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM4',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Mantenimiento de Computadoras',
            'codigo_materia' => '405',
            'horas' => 2,
            'tipo_materia' => 'PROFESIONAL',
            'tipo_asignacion' => 'ESPECIAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM4',
        ]);

        //Materias 5to semestre
        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Administración de Empresas',
            'codigo_materia' => '501',
            'horas' => 5,
            'tipo_materia' => 'BASICA',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM5',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Negociación y solución de conflictos',
            'codigo_materia' => '502',
            'horas' => 3,
            'tipo_materia' => 'BASICA',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM5',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Programación II',
            'codigo_materia' => '503',
            'horas' => 5,
            'tipo_materia' => 'PROFESIONAL',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM5',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Redes Computacionales',
            'codigo_materia' => '504',
            'horas' => 4,
            'tipo_materia' => 'PROFESIONAL',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM5',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Análisis y Diseño de Sistemas',
            'codigo_materia' => '505',
            'horas' => 3,
            'tipo_materia' => 'PROFESIONAL',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM5',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Ingles V',
            'codigo_materia' => '509',
            'horas' => 3,
            'tipo_materia' => 'GENERAL',
            'tipo_asignacion' => 'ESPECIAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM5',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Comutación V',
            'codigo_materia' => '508',
            'horas' => 2,
            'tipo_materia' => 'BASICA',
            'tipo_asignacion' => 'ESPECIAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM5',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Emprendedores',
            'codigo_materia' => '506',
            'horas' => 3,
            'tipo_materia' => 'BASICA',
            'tipo_asignacion' => 'ESPECIAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM5',
        ]);

        //Materias 6to semestre
        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Administración Financiera I',
            'codigo_materia' => '601',
            'horas' => 8,
            'tipo_materia' => 'BASICA',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM6',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Estructura de Datos',
            'codigo_materia' => '602',
            'horas' => 4,
            'tipo_materia' => 'PROFESIONAL',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM6',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Punto Net',
            'codigo_materia' => '603',
            'horas' => 4,
            'tipo_materia' => 'PROFESIONAL',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM6',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Base de Datos',
            'codigo_materia' => '604',
            'horas' => 4,
            'tipo_materia' => 'PROFESIONAL',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM6',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Ingles VI',
            'codigo_materia' => '609',
            'horas' => 3,
            'tipo_materia' => 'GENERAL',
            'tipo_asignacion' => 'ESPECIAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM6',
        ]);


        //Materias 7mo semestre
        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Administración Financiera II',
            'codigo_materia' => '701',
            'horas' => 6,
            'tipo_materia' => 'BASICA',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM7',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Sistemas de Información Gerencial',
            'codigo_materia' => '702',
            'horas' => 3,
            'tipo_materia' => 'BASICA',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM7',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Programación Orientada a Objetos',
            'codigo_materia' => '703',
            'horas' => 4,
            'tipo_materia' => 'PROFESIONAL',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM7',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Auditoria de Sistemas',
            'codigo_materia' => '704',
            'horas' => 3,
            'tipo_materia' => 'PROFESIONAL',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM7',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'E-BUSSINESS',
            'codigo_materia' => '705',
            'horas' => 3,
            'tipo_materia' => 'PROFESIONAL',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM7',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Ingles VII',
            'codigo_materia' => '709',
            'horas' => 3,
            'tipo_materia' => 'GENERAL',
            'tipo_asignacion' => 'ESPECIAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM7',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Comutación VI',
            'codigo_materia' => '708',
            'horas' => 2,
            'tipo_materia' => 'BASICA',
            'tipo_asignacion' => 'ESPECIAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM7',
        ]);


        //Materias 8vo semestre
        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Banca y Mercado de Valores',
            'codigo_materia' => '801',
            'horas' => 5,
            'tipo_materia' => 'BASICA',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM8',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Planeación Estratégica',
            'codigo_materia' => '802',
            'horas' => 5,
            'tipo_materia' => 'BASICA',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM8',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Organización y Métodos',
            'codigo_materia' => '805',
            'horas' => 4,
            'tipo_materia' => 'OPTATIVA',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM8',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Organización y Métodos',
            'codigo_materia' => '805',
            'horas' => 4,
            'tipo_materia' => 'OPTATIVA',
            'tipo_asignacion' => 'ESPECIAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM8',
        ]);


        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Tecnología de la Información',
            'codigo_materia' => '803',
            'horas' => 3,
            'tipo_materia' => 'PROFESIONAL',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM8',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Administración de Redes Sociales',
            'codigo_materia' => '804',
            'horas' => 3,
            'tipo_materia' => 'PROFESIONAL',
            'tipo_asignacion' => 'NORMAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM8',
        ]);

        App\Entities\MallaAcademica::create([
            'nombre_materia' => 'Ingles VIII',
            'codigo_materia' => '809',
            'horas' => 3,
            'tipo_materia' => 'GENERAL',
            'tipo_asignacion' => 'ESPECIAL',
            'estado' => 'ACTIVO',
            'semestre' => 'SEM8',
        ]);


        //menu principal de GESTION DE CARGA HORARIA
        $menuCargaH = App\Menu::create([
            'nombre' => 'carga_horaria',
            'titulo' => 'Proceso Distributivo',
            'url' => '/cargas_horarias',
            'iconclass' => 'fa fa-calendar-o',
            'orden' => 4,
            'cod_padre' => null
        ]);

        App\RolMenu::create([
            'rol' => $rolAdministrativo->id,
            'menu' => $menuCargaH->id,
        ]);


        //menu materias docentes
        $menuMateriasDocentes = App\Menu::create([
            'nombre' => 'materias_docentes',
            'titulo' => 'Materias Docentes',
            'url' => '/materias_docentes',
            'iconclass' => 'fa fa-link',
            'orden' => 1,
            'cod_padre' => $menuCargaH->id
        ]);

        App\RolMenu::create([
            'rol' => $rolAdministrativo->id,
            'menu' => $menuMateriasDocentes->id,
        ]);


        //MENU jornadas por semestres
        $menuJornadaSemestre = App\Menu::create([
            'nombre' => 'jornadas_semestre',
            'titulo' => 'Jornadas Semestre',
            'url' => '/jornadasemestres',
            'iconclass' => 'fa fa-link',
            'orden' => 2,
            'cod_padre' => $menuCargaH->id
        ]);

        App\RolMenu::create([
            'rol' => $rolAdministrativo->id,
            'menu' => $menuJornadaSemestre->id,
        ]);

        //menu horario docentes
        $menuHorariosDocentes = App\Menu::create([
            'nombre' => 'horarios_docentes',
            'titulo' => 'Horarios Docentes',
            'url' => '/horariosdocentes',
            'iconclass' => 'fa fa-link',
            'orden' => 3,
            'cod_padre' => $menuCargaH->id
        ]);

        App\RolMenu::create([
            'rol' => $rolAdministrativo->id,
            'menu' => $menuHorariosDocentes->id,
        ]);


        //menu principal de REPORTES
        $menuReportes = App\Menu::create([
            'nombre' => 'reporteria',
            'titulo' => 'Reportes',
            'url' => '/reportes',
            'iconclass' => 'fa fa-file-pdf-o',
            'orden' => 5,
            'cod_padre' => null
        ]);

        App\RolMenu::create([
            'rol' => $rolAdministrativo->id,
            'menu' => $menuReportes->id,
        ]);


        //menu reporte horarios por curso
        $menuReporteHorario = App\Menu::create([
            'nombre' => 'reporte_horarios',
            'titulo' => 'Horarios Cursos',
            'url' => '/reporte_horarios_cursos',
            'iconclass' => 'fa fa-link',
            'orden' => 1,
            'cod_padre' => $menuReportes->id
        ]);

        App\RolMenu::create([
            'rol' => $rolAdministrativo->id,
            'menu' => $menuReporteHorario->id,
        ]);

        //menu reporte horarios por docente
        $menuReporteHorarioDocente = App\Menu::create([
            'nombre' => 'reporte_docente',
            'titulo' => 'Distributivos Docentes',
            'url' => '/reporte_distributivos_docentes',
            'iconclass' => 'fa fa-link',
            'orden' => 2,
            'cod_padre' => $menuReportes->id
        ]);

        App\RolMenu::create([
            'rol' => $rolAdministrativo->id,
            'menu' => $menuReporteHorarioDocente->id,
        ]);


        /**
         * CONFIGURACION DE LOS TIPOS DE DISTRIBUTIVOS
         */
        $listaDistributivos = array(
            [
                'nombre' => 'HORAS CLASES',
                'items' => [
                    [
                        'nombre' => 'TOTAL HORAS / CLASES ASIGNADAS',
                        'modificable' => false
                    ],
                    [
                        'nombre' => 'PREPARACIÓN CLASE',
                        'modificable' => false
                    ],
                ]
            ],
            [
                'nombre' => 'TUTORÍAS',
                'items' => [
                    [
                        'nombre' => 'TUTORÍAS DE CLASES',
                        'modificable' => false
                    ],
                    [
                        'nombre' => 'TUTORÍA TRABAJO DE TITULACIÓN',
                        'modificable' => false
                    ],
                ]
            ],
            [
                'nombre' => 'INVESTIGACIÓN',
                'items' => [
                    [
                        'nombre' => 'INVESTIGACIÓN',
                        'modificable' => false
                    ]
                ]
            ],
            [
                'nombre' => 'VINCULACIÓN',
                'items' => [
                    [
                        'nombre' => 'SUPERVISIÓN DE PASANTÍAS',
                        'modificable' => false
                    ],
                    [
                        'nombre' => 'SUPERVISIÓN DE PRÁCTICAS PREPROFESIONALES',
                        'modificable' => false
                    ],
                    [
                        'nombre' => 'RESPONSABILIDAD SOCIAL',
                        'modificable' => false
                    ],
                    [
                        'nombre' => 'INTERNACIONALIZACIÓN',
                        'modificable' => false
                    ],
                ]
            ],
            [
                'nombre' => 'HORAS ADMINISTRATIVAS',
                'items' => [
                    [
                        'nombre' => 'GESTIÓN EN LA CARRERA',
                        'modificable' => false
                    ],
                    [
                        'nombre' => 'GESTIÓN EN ACREDITACIÓN',
                        'modificable' => false
                    ],
                    [
                        'nombre' => 'OTRO',
                        'modificable' => true
                    ]
                ]
            ],
        );

        foreach ($listaDistributivos as $key => $value) {
            $distributivo = Distributivo::create([
                'nombre' => $value['nombre'],
                'orden' => $key + 1
            ]);

            foreach ($value['items'] as $idx => $val) {
                $item = ItemDistributivo::create([
                    'id_distributivo' => $distributivo->id,
                    'nombre' => $val['nombre'],
                    'orden' => $idx + 1,
                    'modificable' => $val['modificable']
                ]);
            }
        }

        \App\Entities\CicloLayoutReporte::create([
            'ciclo' => 1,
            'cabecera'          => 'Facultad De Ciencias Administrativas',
            'pie'               => 'Ingeniería en Sistemas Computarizados',
            'director_carrera'  => 'Ing. Francisco Cedeño',
            'elaborador'        => 'Eco. Susana Carrillo'
        ]);
    }
}
