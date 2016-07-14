<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\CatalogoItemCreateRequest;
use App\Http\Requests\CatalogoItemUpdateRequest;
use App\Repositories\CatalogoItemRepository;
use App\Validators\CatalogoItemValidator;


class CatalogoItemsController extends Controller
{

    /**
     * @var CatalogoItemRepository
     */
    protected $repository;

    /**
     * @var CatalogoItemValidator
     */
    protected $validator;

    public function __construct(CatalogoItemRepository $repository, CatalogoItemValidator $validator)
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
        $catalogoItems = $this->repository->all();

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $catalogoItems,
            ]);
        }

        return view('catalogoItems.index', compact('catalogoItems'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  CatalogoItemCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(CatalogoItemCreateRequest $request)
    {

        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $catalogoItem = $this->repository->create($request->all());

            $response = [
                'message' => 'CatalogoItem created.',
                'data'    => $catalogoItem->toArray(),
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
        $catalogoItem = $this->repository->find($id);

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $catalogoItem,
            ]);
        }

        return view('catalogoItems.show', compact('catalogoItem'));
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

        $catalogoItem = $this->repository->find($id);

        return view('catalogoItems.edit', compact('catalogoItem'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  CatalogoItemUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     */
    public function update(CatalogoItemUpdateRequest $request, $id)
    {

        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $catalogoItem = $this->repository->update($id, $request->all());

            $response = [
                'message' => 'CatalogoItem updated.',
                'data'    => $catalogoItem->toArray(),
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
                'message' => 'CatalogoItem deleted.',
                'deleted' => $deleted,
            ]);
        }

        return redirect()->back()->with('message', 'CatalogoItem deleted.');
    }
}
