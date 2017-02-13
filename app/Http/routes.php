<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

/*
Route::get('/', function () {
    return view('welcome');
});
*/

Route::get('/correo', function(){
	$res = \Illuminate\Support\Facades\Config::get('app.email_test');
	return response()->json(array('message' => $res));
});

Route::get('/mail', function(){

	Mail::send("emails.test", [], function($message) {
		$message->to("giancarloscercado@gmail.com", "Giancarlos Cercado")
			->subject("Bienvenido a Laravel y Gmail!");
	});

	return response()->json(['data' => 'todo esta ok, y se envio']);
});

Route::get('/horas', 'JornadasSemestresController@dataHorarioValidator');

Route::get('api/v2/data/{type}', function($type){
	$data = $type == 'normal' ? App\Entities\Docente::all() : App\Entities\Docente::paginate(10);
	return response()->json($data);
});

Route::get('query/{ciclojornadasemestre}', function($ciclojornadasemestre){
	$result = DB::select("select d.abreviatura, d.nombres, d.apellidos, ma.semestre, cmd.id ciclo_materia_docente, ma.nombre_materia, ma.codigo_materia, ma.id id_materia
      from docentes d, ciclo_docentes cd, malla_academica ma, ciclo_materias_docente cmd, jornadas_semestres js
      where js.id = $ciclojornadasemestre
            AND js.ciclo = cd.ciclo
            AND cd.docente = d.id
            AND cmd.ciclo_docente = cd.id
            and cmd.materia = ma.id
            AND ma.semestre = js.catalogo_semestre");

	return response()->json(array('data' => $result));
});

Route::group(['domain' => '{user}.ug_laravel_vue.dev'], function ($user) {
	Route::get('/', function ($user) {
		return 'hola '.$user;
	});
});


Route::get('/vista', function(){
	return view('test');
});


//Route::resource('menu2', 'MenusController');
Route::get('/reportes/cursos/{ciclojornadasemestre}/jornadasemestre', 'ReportesPdfController@downloadHorarioCurso');

Route::get('/reportes/cursos/{ciclodocente}/distributivo', 'ReportesPdfController@donwloadDistributivoDocente');


Route::group(['middleware' => 'auth'], function(){

	Route::group(['prefix' => 'api'], function(){

		Route::get('dashborad/{ciclo}', 'CiclosController@dataDashboardByCiclo');

		Route::get('me', 'UserController@getProfile');

		Route::resource('users', 'UserController');

		Route::get('avatar', 'UserController@uploadAvatar');

		Route::resource('menu', 'MenusController');

		Route::get('/menu-list', ['uses' => 'MenusController@allMenu', 'as' => 'api.menu.list']);

		Route::resource('rol', 'RolController');

		Route::resource('catalogos', 'CatalogosController');

		Route::get('/catalogos-list', ['uses' => 'CatalogosController@allCatalogos', 'as' => 'api.catalogos.list']);
		Route::get('/catalogos-list/{catalogo}', ['uses' => 'CatalogosController@allItemsCatalogo', 'as' => 'api.itemscatalogo.list']);

		Route::resource('catalogos.items', 'CatalogoItemsController');

		Route::resource('tiposdistributivo', 'DistributivosController');
		Route::get('tipodistributivo/all', 'DistributivosController@getAll');
		Route::resource('tiposdistributivo.item', 'ItemDistributivosController');

		Route::get('malla_academica/all', 'MallaAcademicaController@indexAll');
		Route::resource('malla_academica', 'MallaAcademicaController');
		Route::get('malla_academica/{id}/silabos', 'MallaAcademicaController@silabosByMateria');
		Route::post('malla_academica/{id}/silabos', 'MallaAcademicaController@uploadSilabosByMateria');

		Route::resource('docentes', 'DocentesController');
		Route::get('download/docentes', 'DocentesController@exportarExcelDocentes');
		//Route::post('docentes/materias', ['uses' => 'DocentesController@storeMaterias', 'as' => 'api.docentes.materias']);

		Route::post('ciclo/cierre/{ciclo}', 'CiclosController@cierreCiclo');
		Route::get('ciclo', 'CiclosController@index');
		Route::get('ciclos', 'CiclosController@getAllCiclos');
		Route::get('ciclo/{ciclo}/docentes', 'CiclosController@docentesCiclo');
		Route::put('docentes/materias/{id}', ['uses' => 'CiclosController@updateMateriasDocenteCiclo', 'as' => 'api.docentes.materias']);

		Route::resource('ciclodocente', 'CicloDocentesController');

		Route::resource('jornadasemestre', 'JornadasSemestresController');
		Route::get('jornadasemestre/{ciclo}/ciclo', 'JornadasSemestresController@getListaJornadasSemestresCiclo');

		Route::get('jornadasemestre/{jornadasemestre}/horario', 'JornadasSemestresController@horarioJornadaSemestre');
		Route::post('jornadasemestre/{jornadasemestre}/horario', 'JornadasSemestresController@saveHorarioJornadaSemestre');

		Route::get('horariomateriasdocente/{ciclodocente}', 'HorariosDocentesController@horarioCicloDocente');

		Route::resource('ciclohorariodocente', 'HorariosDocentesController');
		Route::get('ciclohorariodocente/{ciclo}/ciclo', 'HorariosDocentesController@getHorarioDocenteByCiclo');
		Route::post('ciclohorariodocente/{idciclodocente}/save', 'HorariosDocentesController@saveHorarioDistributivosDocente');

		//reporteria
		Route::get('reporte/horarios/{ciclo}', 'ReportesController@listarHorariosCursos');
		

		//Route::resource('ciclo.docentes.materias', 'MateriasDocentesController');

		//envio de silabos
		Route::post('silabos/envio/docente', 'MateriasCicloDocentesController@sendSilabosDocentes');

		Route::post('silabos/envio/docente/todos', 'MateriasCicloDocentesController@sendAllSilabosDocentes');

		//configuraciones de facultad y carrera en reportes
		Route::resource('config/reportes', 'CicloLayoutReporteController');
	});

});

Route::group(['middleware' => 'web'], function () {
	Route::auth();

	Route::get('/', [
		'uses' => 'HomeController@index',
		'as' => 'home'
	]);

	//rutas para redirigir al home
	Route::get('/{q}', function($q){
		return redirect()->route('home');
	});
	Route::get('/{q}/{q1}', function($q,$q1){
		return redirect()->route('home');
	});
	Route::get('/{q}/{q1}/{q2}', function($q, $q1, $q2){
		return redirect()->route('home');
	});

});

