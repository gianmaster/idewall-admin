<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Entities\MateriasDocente;
use App\Entities\Docente;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Repositories\DocenteRepository;
use App\Validators\DocenteValidator;
use App\Validators\MateriasDocenteValidator;


class DocentesController extends Controller
{

    protected $requestFields = [
        'store'     => ['abreviatura','nombres', 'apellidos', 'identificacion', 'tipo_identificacion', 'email',
                            'email_corporativo', 'celular', 'telefono', 'estado_civil', 'genero', 'titulo_pregrado',
                            'titulo_postgrado', 'titulo_mba', 'registro_senescyt', 'fecha_nacimiento', 'nacionalidad',
                            'residencia', 'direccion', 'tipo_contrato', 'estado'],
        'update'    => ['abreviatura','nombres', 'apellidos', 'identificacion', 'tipo_identificacion', 'email',
                            'email_corporativo', 'celular', 'telefono', 'estado_civil', 'genero', 'titulo_pregrado',
                            'titulo_postgrado', 'titulo_mba', 'registro_senescyt', 'fecha_nacimiento', 'nacionalidad',
                            'residencia', 'direccion', 'tipo_contrato', 'estado']
    ];

    /**
     * @var CatalogoRepository
     */
    protected $repository;

    /**
     * @var CatalogoValidator
     */
    protected $validator;

    public function __construct(DocenteRepository $repository, DocenteValidator $validator, MateriasDocenteValidator $validatorMaterias)
    {
        $this->repository = $repository;
        $this->validator  = $validator;
        $this->validatorMaterias = $validatorMaterias;
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
            $docentes = $this->repository->orderBy($sortCol, $sortDir)->paginate($perPage);
        } else {
            $docentes = $this->repository->orderBy('id', 'asc')->paginate($perPage);
        }

        return response()->json($docentes);
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

            $docente = $this->repository->create($request->only($this->requestFields['store']));

            return response()->json($docente);

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

            $docente = $this->repository->find($id);
            return response()->json($docente);

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

        $docente = $this->repository->find($id);

        return view('catalogos.edit', compact('docente'));
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

            $this->validator->with($request->all())->setId($id)->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $docente = $this->repository->update($request->only($this->requestFields['update']), $id);

            return response()->json($docente);

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


    public function updateMaterias(Request $request, $id){

        if(!$request->has('materias')){
            return response()->json(array(
                'message' => 'No existe el atributo materias',
                'dev_message' => 'No se recibe el parametro materias'), 401);
        }

        //$materiasDocente = Docente::with('materias')->where('id', $id)->toArray();
        $materiasDocente = $this->repository->find($id)['data'];

        //desactivar todas las materias previo a validacion y actualizacion
        MateriasDocente::where('docente', $id)->update(['activo' => false]);

        foreach ($request->materias as $rKey => $rValue) {

            $flagUpdated = false;

            foreach ($materiasDocente['materias_all'] as $mKey => $mValue) {

                if ($mValue['materia'] == $rValue['materia']) {
                    MateriasDocente::where('id', $mValue['id'])->update(['materia' => $rValue['materia'], 'docente' => $id, 'activo' => true]);
                    $flagUpdated = true;
                }
            }

            if(!$flagUpdated){
                MateriasDocente::create(['materia' => $rValue['materia'], 'docente' => $id]);
            }

        }

        return response()->json(['data' => $materiasDocente]);
    }


    public function storeMaterias(Request $request)
    {

        try {

            $this->validatorMaterias->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $materias = MateriasDocente::create($request->only(['materia', 'docente']));

            return response()->json(['data' => $materias]);

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


}
