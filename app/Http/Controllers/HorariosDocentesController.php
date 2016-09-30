<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\HorariosDocentesCreateRequest;
use App\Http\Requests\HorariosDocentesUpdateRequest;
use App\Repositories\HorariosDocentesRepository;
use App\Validators\HorariosDocentesValidator;


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

    public function __construct(HorariosDocentesRepository $repository, HorariosDocentesValidator $validator)
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
        $horariosDocentes = $this->repository->all();

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $horariosDocentes,
            ]);
        }

        return view('horariosDocentes.index', compact('horariosDocentes'));
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
