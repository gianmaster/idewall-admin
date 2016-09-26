<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\DistributivosCreateRequest;
use App\Http\Requests\DistributivosUpdateRequest;
use App\Repositories\DistributivosRepository;


class DistributivosController extends Controller
{

    /**
     * @var DistributivosRepository
     */
    protected $repository;

    /**
     * @var DistributivosValidator
     */
    protected $validator;

    public function __construct(DistributivosRepository $repository)
    {
        $this->repository = $repository;
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $perPage = request()->has('per_page') ? (int) request()->per_page : 5;

        if (request()->has('sort')) {
            list($sortCol, $sortDir) = explode('|', request()->sort);
            $distributivos = $this->repository->with('items')->orderBy($sortCol, $sortDir)->paginate($perPage);
        } else {
            $distributivos = $this->repository->with('items')->orderBy('id', 'asc')->paginate($perPage);
        }

        return response()->json($distributivos);

        //$this->repository->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
        //$distributivos = $this->repository->all();

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  DistributivosCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(DistributivosCreateRequest $request)
    {

        try {
            
            $distributivo = $this->repository->create($request->only('nombre', 'activo', 'orden'));

            $response = [
                'message' => 'Distributivos created.',
                'data'    => $distributivo->toArray(),
            ];

            return response()->json($response);

        } catch (ValidatorException $e) {
            return response()->json([
                'error'   => true,
                'message' => $e->getMessageBag()
            ]);
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
        $distributivo = $this->repository->find($id);

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $distributivo,
            ]);
        }

        return view('distributivos.show', compact('distributivo'));
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

        $distributivo = $this->repository->find($id);

        return view('distributivos.edit', compact('distributivo'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  DistributivosUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     */
    public function update(DistributivosUpdateRequest $request, $id)
    {

        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $distributivo = $this->repository->update($id, $request->all());

            $response = [
                'message' => 'Distributivos updated.',
                'data'    => $distributivo->toArray(),
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
                'message' => 'Distributivos deleted.',
                'deleted' => $deleted,
            ]);
        }

        return redirect()->back()->with('message', 'Distributivos deleted.');
    }
}
