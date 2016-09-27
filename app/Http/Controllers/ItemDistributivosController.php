<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\ItemDistributivoCreateRequest;
use App\Http\Requests\ItemDistributivoUpdateRequest;
use App\Repositories\ItemDistributivoRepository;


class ItemDistributivosController extends Controller
{

    /**
     * @var ItemDistributivoRepository
     */
    protected $repository;

    /**
     * @var ItemDistributivoValidator
     */
    protected $validator;

    public function __construct(ItemDistributivoRepository $repository)
    {
        $this->repository = $repository;
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id_distributivo)
    {
        $this->repository->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
        $itemDistributivos = $this->repository->findWhere(['id_distributivo' => $id_distributivo]);

        return response()->json([
            'data' => $itemDistributivos,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  ItemDistributivoCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(ItemDistributivoCreateRequest $request, $id_distributivo)
    {

        try {

            $itemDistributivo = $this->repository->create($request->all());

            $response = [
                'message' => 'ItemDistributivo created.',
                'data'    => $itemDistributivo->toArray(),
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
    public function show($idDistributivo, $id)
    {
        $itemDistributivo = $this->repository->find($id);

        return response()->json([
            'data' => $itemDistributivo,
        ]);
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

        $itemDistributivo = $this->repository->find($id);

        return view('itemDistributivos.edit', compact('itemDistributivo'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  ItemDistributivoUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     */
    public function update(ItemDistributivoUpdateRequest $request, $id_distributivo, $id)
    {

        try {

            $itemDistributivo = $this->repository->update($request->only('nombre', 'activo', 'modificable', 'orden'), $id);

            $response = [
                'message' => 'ItemDistributivo updated.',
                'data'    => $itemDistributivo->toArray(),
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
     * Remove the specified resource from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id_distributivo, $id)
    {
        $deleted = $this->repository->delete($id);

        return response()->json([
            'message' => 'ItemDistributivo deleted.',
            'deleted' => $deleted,
        ]);

    }
}
