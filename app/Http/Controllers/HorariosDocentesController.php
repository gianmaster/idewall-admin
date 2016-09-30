<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Pagination\Paginator;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Http\Requests;
use Illuminate\Support\Facades\DB;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\HorariosDocentesCreateRequest;
use App\Http\Requests\HorariosDocentesUpdateRequest;
use App\Repositories\HorariosDocentesRepository;


class HorariosDocentesController extends Controller
{

    /**
     * @var HorariosDocentesRepository
     */
    protected $repository;

    /**
     * @var HorariosDocentesValidator
     */
    protected $validator;

    public function __construct(HorariosDocentesRepository $repository)
    {
        $this->repository = $repository;
    }

    public function paginateArray($data, $perPage = 15)
    {
        $page = Paginator::resolveCurrentPage();
        $total = count($data);
        $results = array_slice($data, ($page - 1) * $perPage, $perPage);

        return new LengthAwarePaginator($results, $total, $perPage, $page, [
            'path' => Paginator::resolveCurrentPath(),
        ]);
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = DB::select("select
                                  c.id,
                                  c.anio,
                                  c.ciclo,
                                  cd.id ciclo_docente,
                                  d.abreviatura,
                                  d.nombres,
                                  d.apellidos,
                                  d.identificacion,
                                  sum(hc.num_horas) horas_academicas_asignadas
                                from docentes d,
                                  ciclo_docentes cd,
                                  ciclos c,
                                  horarios_cursos hc,
                                  ciclo_materias_docente cmd,
                                  jornadas_semestres js
                                where c.id = 1
                                and cd.ciclo = c.id
                                and d.id = cd.docente
                                and cmd.ciclo_docente = cd.id
                                and hc.ciclo_materia_docente = cmd.id
                                and hc.ciclo_jornada_semestre = js.id
                                and js.ciclo = c.id
                                group by
                                  c.id,
                                  c.anio,
                                  c.ciclo,
                                  cd.id,
                                  d.abreviatura,
                                  d.nombres,
                                  d.apellidos,
                                  d.identificacion");

        return response()->json($this->paginateArray($data));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  HorariosDocentesCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(HorariosDocentesCreateRequest $request)
    {

        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $horariosDocente = $this->repository->create($request->all());

            $response = [
                'message' => 'HorariosDocentes created.',
                'data'    => $horariosDocente->toArray(),
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
        $horariosDocente = $this->repository->find($id);

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $horariosDocente,
            ]);
        }

        return view('horariosDocentes.show', compact('horariosDocente'));
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

        $horariosDocente = $this->repository->find($id);

        return view('horariosDocentes.edit', compact('horariosDocente'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  HorariosDocentesUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     */
    public function update(HorariosDocentesUpdateRequest $request, $id)
    {

        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $horariosDocente = $this->repository->update($id, $request->all());

            $response = [
                'message' => 'HorariosDocentes updated.',
                'data'    => $horariosDocente->toArray(),
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
                'message' => 'HorariosDocentes deleted.',
                'deleted' => $deleted,
            ]);
        }

        return redirect()->back()->with('message', 'HorariosDocentes deleted.');
    }
}
