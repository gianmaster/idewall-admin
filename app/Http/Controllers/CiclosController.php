<?php

namespace App\Http\Controllers;

use App\Entities\Ciclo;
use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\CicloCreateRequest;
use App\Http\Requests\CicloUpdateRequest;
use App\Repositories\CicloRepository;
use App\Validators\CicloValidator;


class CiclosController extends Controller
{

    /**
     * @var CicloRepository
     */
    protected $repository;

    /**
     * @var CicloValidator
     */
    protected $validator;

    public function __construct(CicloRepository $repository, CicloValidator $validator)
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
        $ciclo = Ciclo::where('estado', 'VIGENTE')->first();

        return response()->json(array('data' => $ciclo));

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  CicloCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(CicloCreateRequest $request)
    {

        try {

            $ciclos = Ciclo::where('estado', 'VIGENTE')->first();

            if(!$ciclos){
                return response()->json([
                    'message' => 'Ya hay un ciclo vigente, debe cerrarlos para poder generar uno nuevo'
                ]);
            }else{
                $ciclo = Ciclo::all()->last();

                if($ciclo->ciclo == 2){
                    Ciclo::create([
                        'anio'  => ($ciclo->anio + 1),
                        'ciclo' => 1
                    ]);
                }else{
                    Ciclo::create([
                        'anio'  => ($ciclo->anio),
                        'ciclo' => 2
                    ]);
                }
            }

        } catch (\Exception $e) {
            return response()->json([
                'error'   => true,
                'message' => $e->getMessageBag()
            ]);
        }
    }


    /**
     * @param $id
     * @return mixed
     * Muestra el ciclo vigente
     */
    public function show($id)
    {
        response()->json(array('data' => 'Nothing to do here'));
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

        response()->json(array('data' => 'Nothing to do here'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  CicloUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     */
    public function update(CicloUpdateRequest $request, $id)
    {
        response()->json(array('data' => 'Nothing to do here'));
    }


    /**
     * @param $id
     * @return mixed
     * Dar de baja a un ciclo, esto cierra el proceso de asignacion de horarios
     */
    public function destroy($id)
    {
        $ciclo = Ciclo::find($id);
        $ciclo->estado = 'CERRADO';
        $ciclo->save();

        return response()->json([
            'message' => 'Ciclo cerrado.',
            'deleted' => $ciclo,
        ]);
    }


    public static function currentCiclo(){
        return Ciclo::where('estado', 'VIGENTE')->first();
    }

}
