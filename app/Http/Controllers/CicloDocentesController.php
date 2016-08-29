<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\CicloDocentesCreateRequest;
use App\Http\Requests\CicloDocentesUpdateRequest;
use App\Repositories\CicloDocentesRepository;
use App\Validators\CicloDocentesValidator;


class CicloDocentesController extends Controller
{

    /**
     * @var CicloDocentesRepository
     */
    protected $repository;

    /**
     * @var CicloDocentesValidator
     */
    protected $validator;

    public function __construct(CicloDocentesRepository $repository, CicloDocentesValidator $validator)
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
        $cicloDocentes = $this->repository->all();

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $cicloDocentes,
            ]);
        }

        return view('cicloDocentes.index', compact('cicloDocentes'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  CicloDocentesCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(CicloDocentesCreateRequest $request)
    {

        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $cicloDocente = $this->repository->create($request->all());

            $response = [
                'message' => 'CicloDocentes created.',
                'data'    => $cicloDocente->toArray(),
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
        $cicloDocente = $this->repository->find($id);

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $cicloDocente,
            ]);
        }

        return view('cicloDocentes.show', compact('cicloDocente'));
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

        $cicloDocente = $this->repository->find($id);

        return view('cicloDocentes.edit', compact('cicloDocente'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  CicloDocentesUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     */
    public function update(CicloDocentesUpdateRequest $request, $id)
    {

        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $cicloDocente = $this->repository->update($id, $request->all());

            $response = [
                'message' => 'CicloDocentes updated.',
                'data'    => $cicloDocente->toArray(),
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
                'message' => 'CicloDocentes deleted.',
                'deleted' => $deleted,
            ]);
        }

        return redirect()->back()->with('message', 'CicloDocentes deleted.');
    }
}
