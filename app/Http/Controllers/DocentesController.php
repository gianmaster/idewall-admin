<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Repositories\DocenteRepository;
use App\Validators\DocenteValidator;


class DocentesController extends Controller
{

    protected $requestFields = [
        'store'     => ['nombres', 'apellidos', 'identificacion', 'tipo_identificacion', 'email',
                            'email_corporativo', 'celular', 'telefono', 'estado_civil', 'genero', 'titulo_pregrado',
                            'titulo_postgrado', 'titulo_mba', 'registro_senescyt', 'fecha_nacimiento', 'nacionalidad',
                            'residencia', 'direccion', 'tipo_contrato'],
        'update'    => ['nombres', 'apellidos', 'identificacion', 'tipo_identificacion', 'email',
                            'email_corporativo', 'celular', 'telefono', 'estado_civil', 'genero', 'titulo_pregrado',
                            'titulo_postgrado', 'titulo_mba', 'registro_senescyt', 'fecha_nacimiento', 'nacionalidad',
                            'residencia', 'direccion', 'tipo_contrato']
    ];

    /**
     * @var CatalogoRepository
     */
    protected $repository;

    /**
     * @var CatalogoValidator
     */
    protected $validator;

    public function __construct(DocenteRepository $repository, DocenteValidator $validator)
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

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

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


}
