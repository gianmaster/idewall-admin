<?php

namespace App\Http\Controllers;

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
        $this->repository->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
        $ciclos = $this->repository->all();

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $ciclos,
            ]);
        }

        return view('ciclos.index', compact('ciclos'));
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

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $ciclo = $this->repository->create($request->all());

            $response = [
                'message' => 'Ciclo created.',
                'data'    => $ciclo->toArray(),
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
        $ciclo = $this->repository->find($id);

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $ciclo,
            ]);
        }

        return view('ciclos.show', compact('ciclo'));
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

        $ciclo = $this->repository->find($id);

        return view('ciclos.edit', compact('ciclo'));
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

        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $ciclo = $this->repository->update($id, $request->all());

            $response = [
                'message' => 'Ciclo updated.',
                'data'    => $ciclo->toArray(),
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
                'message' => 'Ciclo deleted.',
                'deleted' => $deleted,
            ]);
        }

        return redirect()->back()->with('message', 'Ciclo deleted.');
    }
}
