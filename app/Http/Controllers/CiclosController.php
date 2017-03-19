<?php

namespace App\Http\Controllers;

use App\Entities\Ciclo;
use App\Entities\CicloDocentes;
use App\Entities\Docente;
use App\Entities\JornadasSemestre;
use App\Entities\MateriasCicloDocente;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\CicloCreateRequest;
use App\Http\Requests\CicloUpdateRequest;
use App\Repositories\CicloRepository;
use App\Validators\CicloValidator;
use Carbon\Carbon;


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
    public function store(Request $request)
    {

        $inputs = $request->only(['fecha_inicio', 'fecha_fin']);

        try {

            $ciclos = Ciclo::where('estado', 'VIGENTE')->first();

            if($ciclos){
                return response()->json([
                    'message' => 'Ya hay un ciclo vigente, debe cerrarlos para poder generar uno nuevo'
                ]);
            }else{

                $ciclo = Ciclo::all()->last();

                if($ciclo->ciclo == 2){
                    Ciclo::create([
                        'anio'  => ($ciclo->anio + 1),
                        'ciclo' => 1,
                        'fecha_inicio' => Carbon::createFromFormat('Y-m-d', $inputs['fecha_inicio']),
                        'fecha_fin' => Carbon::createFromFormat('Y-m-d', $inputs['fecha_fin'])
                    ]);
                }else{
                    Ciclo::create([
                        'anio'  => ($ciclo->anio),
                        'ciclo' => 2,
                        'fecha_inicio' => Carbon::createFromFormat('Y-m-d', $inputs['fecha_inicio']),
                        'fecha_fin' => Carbon::createFromFormat('Y-m-d', $inputs['fecha_fin'])
                    ]);
                }
            }

        } catch (\Exception $e) {
            return response()->json([
                'error'   => true,
                'message' => $e->getMessage()
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


    /**
     * @return mixed
     */
    public static function currentCiclo(){
        return Ciclo::where('estado', 'VIGENTE')->first();
    }


    /**
     * @param $id_ciclo
     * @return mixed
     * Retorna todos los docentes del ciclo enviado por parametro con sus datos aninados o relacionados
     */
    public function docentesCiclo($ciclo){
        try{

            $perPage = request()->has('per_page') ? (int) request()->per_page : 5;

            if (request()->has('sort')) {
                list($sortCol, $sortDir) = explode('|', request()->sort);
                $data = CicloDocentes::with('cicloDetail')->with('materiasDocenteCiclo')->with('docenteDetail')
                    ->where('ciclo', $ciclo)
                    ->orderBy($sortCol, $sortDir)
                    ->paginate($perPage);
            } else {
                $data = CicloDocentes::with('cicloDetail')->with('materiasDocenteCiclo')->with('docenteDetail')
                    ->where('ciclo', $ciclo)
                    ->orderBy('id', 'asc')
                    ->paginate($perPage);
            }
            /*
            $data = CicloDocentes::with('cicloDetail')->with('materiasDocenteCiclo')->with('docenteDetail')
                ->where('ciclo', $ciclo)->get();
            */

            return response()->json($data);

        }catch (\Exception $e) {
            return response()->json([
                'error'   => true,
                'message' => $e->getMessage()
            ]);
        }

    }


    /**
     * @param Request $request
     * @param $idCiclo
     * @param $idDocente
     * @return mixed
     */
    public function saveDocenteCiclo(Request $request, $idCiclo, $idDocente){
        $existe = CicloDocentes::where('docente', $idDocente)->where('ciclo', $idCiclo)->get();
        if(count($existe) > 0){
            return response()->json(['message' => 'El docente ya esta registrado en el ciclo', 'error' => true]);
        }
        //registro del docente
        $cicloDocente = CicloDocentes::create([
            'docente'   => $idDocente,
            'ciclo'     => $idCiclo
        ]);

        return response()->json(['data' => $cicloDocente]);
    }


    /**
     * @param Request $request
     * @param $idCicloDocente
     * @return mixed
     */
    public function deleteDocenteCiclo(Request $request, $idCicloDocente){
        $cicloDocente = CicloDocentes::find($idCicloDocente);
        if($cicloDocente){
            $cicloDocente->delete();
        }

        return response()->json(['data' => $cicloDocente]);
    }


    /**
     * @param Request $request
     * @param $id
     * @return mixed
     * Actualizar y/o crear materias para un docente durante un ciclo
     */
    public function updateMateriasDocenteCiclo(Request $request, $id){
        if(!$request->has('materias')){
            return response()->json(array(
                'message' => 'No existe el atributo materias',
                'dev_message' => 'No se recibe el parametro materias'), 401);
        }
        
        //$materiasDocente = Docente::with('materias')->where('id', $id)->toArray();
        $materiasDocente = MateriasCicloDocente::where('ciclo_docente', $id)->get();

        //desactivar todas las materias previo a validacion y actualizacion
        MateriasCicloDocente::where('ciclo_docente', $id)->update(['activo' => false]);

        foreach ($request->materias as $rKey => $rValue) {

            $flagUpdated = false;

            foreach ($materiasDocente as $mKey => $mValue) {

                if ($mValue['materia'] == $rValue['materia']) {
                    MateriasCicloDocente::where('id', $mValue['id'])->update(['materia' => $rValue['materia'], 'ciclo_docente' => $id, 'activo' => true]);
                    $flagUpdated = true;
                }
            }

            if(!$flagUpdated){
                MateriasCicloDocente::create(['materia' => $rValue['materia'], 'ciclo_docente' => $id]);
            }

        }

        return response()->json(['data' => $materiasDocente]);
    }
    


    /**
     * Retorna todos los ciclos 
     * @return [type] [description]
     */
    public function getAllCiclos(){
        $ciclos = Ciclo::all();
        return response()->json(['data' => $ciclos]);
    }


    public function dataDashboardByCiclo($ciclo){
        $totalDocentes = count(Docente::all());

        $dataCiclo = Ciclo::with('docentes')
            ->with('cursos')
            ->find($ciclo);
        $docentesCiclo = $dataCiclo->docentes->count();
        $cursosCiclo = $dataCiclo->cursos->count();

        //obtener los horarios asignados
        $horariosCursosAsignados = 0;
        foreach ($dataCiclo->cursos as $curso) {
            if(count($curso->horario)>0)
                $horariosCursosAsignados++;
        }

        //obtener los horarios distributivos asignados a docentes del ciclo
        $horariosDistributivosDocentesCiclo = 0;
        foreach ($dataCiclo->docentes as $docente) {
            if(count($docente->cargaDistributiva) > 0)
                $horariosDistributivosDocentesCiclo++;
        }
        
        return array(
            'total_docentes' => $totalDocentes,
            'docentes_ciclo' => $docentesCiclo,
            'cursos_ciclo' => $cursosCiclo,
            'cursos_ciclo_asignado' => $horariosCursosAsignados,
            'horarios_distributivos_asignados' => $horariosDistributivosDocentesCiclo
        );
    }
    
    public function cierreCiclo($idCiclo){
        $ciclo = Ciclo::find($idCiclo);
        $ciclo->update(['estado' => 'CERRADO']);
        return response()->json(['data' => $ciclo]);
    }

}
