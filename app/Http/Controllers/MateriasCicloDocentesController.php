<?php

namespace App\Http\Controllers;

use App\Entities\CicloDocentes;
use Mail;
use App\Entities\Ciclo;
use App\Entities\MateriasCicloDocente;
use App\Entities\Silabo;
use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\MateriasDocenteCreateRequest;
use App\Http\Requests\MateriasDocenteUpdateRequest;
use App\Repositories\MateriasCicloDocenteRepository;
use App\Validators\MateriasCicloDocenteValidator;
use Illuminate\Support\Facades\Config;


class MateriasCicloDocentesController extends Controller
{

    /**
     * @var MateriasDocenteRepository
     */
    protected $repository;

    /**
     * @var MateriasDocenteValidator
     */
    protected $validator;

    public function __construct(MateriasCicloDocenteRepository $repository, MateriasCicloDocenteValidator $validator)
    {

        $this->repository = $repository;
        $this->validator  = $validator;
    }
    


    public function sendAllSilabosDocentes(Request $request){
        
        $ciclo = Ciclo::where('estado', 'VIGENTE')->first();
        
        if($ciclo){

            $docentes = CicloDocentes::where('ciclo', $ciclo->id)
                ->with('docenteDetail')
                ->with('materiasDocenteCiclo')
                ->get();

            foreach ($docentes as $docente) {
                $d = $docente->toArray();
                $dataDocente = ['nombre' => $d['docente_detail']['nombres'] .' '. $d['docente_detail']['apellidos'], 'email' => $d['docente_detail']['email']];
                $materias = array();
                foreach ($d['materias_docente_ciclo'] as $materiaDocente) {
                    array_push($materias, $materiaDocente['materia']);
                }
                //envio de los silabos a cada docente
                //descomentar la siguiente linea para activar el envia masivo, esto tarda varios minutos
                $this->sendSilaboDocente($dataDocente, $materiaDocente);
            }

            return response()->json(array(
                'message' => 'Silabos enviados a todos los docentes.',
                'data'    => 'ok',
            ));

        }else{
            return response()->json([
                'error'   => true,
                'message' => 'No puede realizar esta acción, no hay un ciclo activo'
            ]);
        }
    }

    public function sendSilabosDocentes(Request $request){

        $docente = $request->input('docente');
        $materias = $request->input('materias');//nombre docente y correo
        $ciclo = Ciclo::where('estado', 'VIGENTE')->first();

        $this->sendSilaboDocente($docente, $materias, $ciclo);

        return response()->json(array(
            'message' => 'Silabos enviados.',
            'data'    => 'ok',
        ));
    }


    public function sendSilaboDocente($docente, $materias, Ciclo $ciclo){
        $archivos = array();

        if(Config::get('app.email_test') === false) {

            if (preg_match('/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/', $docente['email'])) {

                foreach ($materias as $item) {

                    $silabo = Silabo::where('id_materia_malla', $item['materia'])->first();

                    if ($silabo) {
                        array_push($archivos, $silabo->ruta);
                    }
                }

                $msj = 'Ciclo ' . $ciclo->ciclo . ' Período ' . $ciclo->anio . '-' . ($ciclo->anio + 1);
                $sbj = 'Sílabos - ' . $msj;

                if (count($archivos) > 0) {
                    Mail::send("emails.envio_silabos", ['docente' => $docente['nombre'], 'mensaje' => $msj], function ($message) use ($docente, $sbj, $archivos) {

                        $message->to($docente['email'], $docente['nombre'])->subject($sbj);
                        foreach ($archivos as $archivo) {
                            $message->attach($archivo);
                        }

                    });

                }
            }

        }

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
            $docentes = $this->repository
                ->with('detalleDocente')
                ->with('detalleMateria')
                ->with('detalleCiclo')
                ->orderBy($sortCol, $sortDir)
                ->paginate($perPage);
        } else {
            $docentes = $this->repository->with('materias')->orderBy('id', 'asc')->paginate($perPage);
        }

        return response()->json($docentes);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  MateriasDocenteCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(MateriasDocenteCreateRequest $request)
    {

        try {

            dd($request->all());

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $materiasDocente = $this->repository->create($request->all());

            $response = [
                'message' => 'MateriasDocente created.',
                'data'    => $materiasDocente->toArray(),
            ];

            if ($request->wantsJson()) {

                return response()->json($response);
            }

            return redirect()->back()->with('message', $response['message']);
        } catch (ValidatorException $e) {
            if ($request->wantsJson()) {
                return response()->json([
                    'error'   => true,
                    'message' => $e->getMessageBag()
                ]);
            }

            return redirect()->back()->withErrors($e->getMessageBag())->withInput();
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
        $materiasDocente = $this->repository->find($id);

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $materiasDocente,
            ]);
        }

        return view('materiasDocentes.show', compact('materiasDocente'));
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

        $materiasDocente = $this->repository->find($id);

        return view('materiasDocentes.edit', compact('materiasDocente'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  MateriasDocenteUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     */
    public function update(MateriasDocenteUpdateRequest $request, $id)
    {

        try {

            dd($request);

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $materiasDocente = $this->repository->update($id, $request->all());

            $response = [
                'message' => 'MateriasDocente updated.',
                'data'    => $materiasDocente->toArray(),
            ];

            if ($request->wantsJson()) {

                return response()->json($response);
            }

            return redirect()->back()->with('message', $response['message']);
        } catch (ValidatorException $e) {

            if ($request->wantsJson()) {

                return response()->json([
                    'error'   => true,
                    'message' => $e->getMessageBag()
                ]);
            }

            return redirect()->back()->withErrors($e->getMessageBag())->withInput();
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

        if (request()->wantsJson()) {

            return response()->json([
                'message' => 'MateriasDocente deleted.',
                'deleted' => $deleted,
            ]);
        }

        return redirect()->back()->with('message', 'MateriasDocente deleted.');
    }
}
