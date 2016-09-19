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

Route::get('/horas', 'JornadasSemestresController@dataHorarioValidator');

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

Route::get('test', function(){
	return 'Esto es un test de funcionalidad';
});

Route::resource('/', 'HomeController');

//Route::resource('menu2', 'MenusController');


Route::group(['middleware' => 'auth'], function(){

	Route::group(['prefix' => 'api'], function(){

		Route::get('me', 'UserController@getProfile');

		Route::resource('users', 'UserController');

		Route::resource('menu', 'MenusController');

		Route::get('/menu-list', ['uses' => 'MenusController@allMenu', 'as' => 'api.menu.list']);

		Route::resource('rol', 'RolController');

		Route::resource('catalogos', 'CatalogosController');

		Route::get('/catalogos-list', ['uses' => 'CatalogosController@allCatalogos', 'as' => 'api.catalogos.list']);
		Route::get('/catalogos-list/{catalogo}', ['uses' => 'CatalogosController@allItemsCatalogo', 'as' => 'api.itemscatalogo.list']);

		Route::resource('catalogos.items', 'CatalogoItemsController');

		Route::get('malla_academica/all', 'MallaAcademicaController@indexAll');
		Route::resource('malla_academica', 'MallaAcademicaController');
		Route::get('malla_academica/{id}/silabos', 'MallaAcademicaController@silabosByMateria');
		Route::post('malla_academica/{id}/silabos', 'MallaAcademicaController@uploadSilabosByMateria');

		Route::resource('docentes', 'DocentesController');
		//Route::post('docentes/materias', ['uses' => 'DocentesController@storeMaterias', 'as' => 'api.docentes.materias']);

		Route::get('ciclo', 'CiclosController@index');
		Route::get('ciclo/{ciclo}/docentes', 'CiclosController@docentesCiclo');
		Route::put('docentes/materias/{id}', ['uses' => 'CiclosController@updateMateriasDocenteCiclo', 'as' => 'api.docentes.materias']);

		Route::resource('jornadasemestre', 'JornadasSemestresController');

		Route::get('jornadasemestre/{jornadasemestre}/horario', 'JornadasSemestresController@horarioJornadaSemestre');
		Route::post('jornadasemestre/{jornadasemestre}/horario', 'JornadasSemestresController@saveHorarioJornadaSemestre');

		//Route::resource('ciclo.docentes.materias', 'MateriasDocentesController');

	});

});




