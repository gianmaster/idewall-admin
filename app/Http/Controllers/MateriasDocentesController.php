<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\MateriasDocenteCreateRequest;
use App\Http\Requests\MateriasDocenteUpdateRequest;
use App\Repositories\MateriasDocenteRepository;
use App\Validators\MateriasDocenteValidator;


class MateriasDocentesController extends Controller
{

    /**
     * @var MateriasDocenteRepository
     */
    protected $repository;

    /**
     * @var MateriasDocenteValidator
     */
    protected $validator;

    public function __construct(MateriasDocenteRepository $repository, MateriasDocenteValidator $validator)
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
        $materiasDocentes = $this->repository->all();

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $materiasDocentes,
            ]);
        }

        return view('materiasDocentes.index', compact('materiasDocentes'));
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
