<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\HorariosCursosCreateRequest;
use App\Http\Requests\HorariosCursosUpdateRequest;
use App\Repositories\HorariosCursosRepository;
use App\Validators\HorariosCursosValidator;


class HorariosCursosController extends Controller
{

    /**
     * @var HorariosCursosRepository
     */
    protected $repository;

    /**
     * @var HorariosCursosValidator
     */
    protected $validator;

    public function __construct(HorariosCursosRepository $repository, HorariosCursosValidator $validator)
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
        $this->repository->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
        $horariosCursos = $this->repository->all();

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $horariosCursos,
            ]);
        }

        return view('horariosCursos.index', compact('horariosCursos'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  HorariosCursosCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(HorariosCursosCreateRequest $request)
    {

        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $horariosCurso = $this->repository->create($request->all());

            $response = [
                'message' => 'HorariosCursos created.',
                'data'    => $horariosCurso->toArray(),
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
        $horariosCurso = $this->repository->find($id);

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $horariosCurso,
            ]);
        }

        return view('horariosCursos.show', compact('horariosCurso'));
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

        $horariosCurso = $this->repository->find($id);

        return view('horariosCursos.edit', compact('horariosCurso'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  HorariosCursosUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     */
    public function update(HorariosCursosUpdateRequest $request, $id)
    {

        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $horariosCurso = $this->repository->update($id, $request->all());

            $response = [
                'message' => 'HorariosCursos updated.',
                'data'    => $horariosCurso->toArray(),
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
                'message' => 'HorariosCursos deleted.',
                'deleted' => $deleted,
            ]);
        }

        return redirect()->back()->with('message', 'HorariosCursos deleted.');
    }
}
