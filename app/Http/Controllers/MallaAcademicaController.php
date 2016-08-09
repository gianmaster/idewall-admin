<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Repositories\MallaAcademicaRepository;
use App\Validators\MallaAcademicaValidator;
use App\Entities\Silabo;
use App\Entities\MallaAcademica;
use Validator;


class MallaAcademicaController extends Controller
{

    use UtilTrait;

    protected $rootPath = 'silabos'; //root donde se guardaran los archivos

    protected $requestFields = [
        'store'     => ['codigo_materia', 'nombre_materia', 'semestre', 'horas', 'estado'],
        'update'    => ['codigo_materia', 'nombre_materia', 'semestre', 'horas', 'estado']
    ];

    /**
     * @var CatalogoRepository
     */
    protected $repository;

    /**
     * @var CatalogoValidator
     */
    protected $validator;

    public function __construct(MallaAcademicaRepository $repository, MallaAcademicaValidator $validator)
    {
        $this->repository = $repository;
        $this->validator  = $validator;
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $this->repository->skipPresenter();

        $perPage = request()->has('per_page') ? (int) request()->per_page : 5;

        if (request()->has('sort')) {
            list($sortCol, $sortDir) = explode('|', request()->sort);
            $materias = $this->repository->with('descripcionSemestre')->with('silabos')->orderBy($sortCol, $sortDir)->paginate($perPage);
        } else {
            $materias = $this->repository->with('descripcionSemestre')->with('silabos')->orderBy('id', 'asc')->paginate($perPage);
        }

        return response()->json($materias);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  CatalogoCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $materias = $this->repository->create($request->only($this->requestFields['store']));

            return response()->json($materias);

        } catch (ValidatorException $e) {
            if ($request->wantsJson()) {
                return response()->json([
                    'dev_message' => $e->getMessage(),
                    'message' => $e->getMessageBag()
                ], 403);
            }

            return redirect()->back()->withErrors($e->getMessageBag())->withInput();

        } catch (Exception $e){
            return response()->json(array(
                'message' => 'Se presento un error al tratar de hacer esta acción',
                'dev_message' => $e->getMessage()), 405);
        }
    }




    /**
     * Display the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        try{

            $materias = $this->repository->find($id);
            return response()->json($materias);

        } catch (Exception $e){
            if ($e instanceof  \NotFoundHttpException) {
                return response()->json(array(
                    'data'  => [],
                    'message' => 'No hay resultados',
                    'dev_message' => $e->getMessage()), 404);

            }
            return response()->json(array(
                'message' => 'Se presento un error al tratar de hacer esta acción',
                'dev_message' => $e->getMessage()), 405);
        }

    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

        $materias = $this->repository->find($id);

        return view('catalogos.edit', compact('materias'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  CatalogoUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     */
    public function update(Request $request, $id)
    {

        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $materias = $this->repository->update($request->only($this->requestFields['update']), $id);

            return response()->json($materias);

        } catch (ValidatorException $e) {

            if ($request->wantsJson()) {
                return response()->json([
                    'dev_message' => $e->getMessage(),
                    'message' => $e->getMessageBag()
                ], 403);
            }

            return redirect()->back()->withErrors($e->getMessageBag())->withInput();
        } catch (Exception $e){

            return response()->json(array(
                'message' => 'Se presento un error al tratar de hacer esta acción',
                'dev_message' => $e->getMessage()), 405);
        }

    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $deleted = $this->repository->delete($id);

        return response()->json([
            'message' => 'Catalogo deleted.',
            'deleted' => $deleted,
        ]);

    }



    public function indexAll(){

        $materias = $this->repository->all();
        return response()->json($materias);

    }


    
    public function silabosByMateria($id){
        $silabos = Silabo::where('id_materia_malla', $id)
            ->where('estado', true)
            ->get();

        return response()->json(array('data' => $silabos));
    }


    /**
     * Variable para definir reglas y mensajes para la subida de archivos
     * 
     * */
    private $rules = ['documentos.*' => 'required|mimes:pdf|max:20000'];

    private $messages = [
        'documentos.*.required' => 'Por favor cargue un archivo',
        'documentos.*.mimes' => 'Solo esta permitido subir archivos PDF',
        'documentos.*.max' => 'El tamaño máximo permitido es de 20MB',
    ];

    public function uploadSilabosByMateria(Request $request, $id){

        $v = Validator::make($request->all(), $this->rules, $this->messages);
        if ($v->fails()) {
            $errors = $this->validationMessages($v->errors()->toArray());
            return response()->json(array('errors' => $errors), 400);
        }

        $materia = MallaAcademica::find($id);
        Silabo::where('id_materia_malla', $id)->update(['estado' => false]);

        $path = $materia->semestre;
        $nombreArchivo = $materia->nombre_materia;

        foreach ($request->file('documentos') as $key => $file) {
            $extFile = $file->getClientOriginalExtension();
            $file->move("{$this->rootPath}/{$path}", utf8_decode("{$nombreArchivo}_{$path}_{$key}.{$extFile}"));

            Silabo::firstOrCreate([
                'id_materia_malla' => $id,
                'ruta'      => utf8_decode("{$this->rootPath}/{$path}/{$nombreArchivo}_{$path}_{$key}.{$extFile}"),
                'estado'    => true
            ]);
        }
        
        return response()->json(array('data' => 'Se subio el archivo correctamente'));
    }





}
