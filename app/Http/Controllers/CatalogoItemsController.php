<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Entities\Catalogo;
use App\Entities\CatalogoItem;

use App\Http\Requests;
use App\Validators\CatalogoValidator;
use App\Validators\CatalogoItemValidator;
use App\Repositories\CatalogoRepository;
use App\Repositories\CatalogoItemRepository;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;


class CatalogoItemsController extends Controller
{

    protected $requestFields = [
    'store'     => ['catalogo', 'codigo', 'descripcion', 'orden', 'activo'],
    'update'    => ['catalogo', 'codigo', 'descripcion', 'orden', 'activo']
    ];

    /**
     * @var CatalogoItemRepository
     */
    protected $catalogo_repositoty;
    protected $catalogo_item_repository;

    /**
     * @var CatalogoItemValidator
     */
    protected $catalogo_validator;
    protected $catalogo_item_validator;

    public function __construct(CatalogoItemRepository $repository1, CatalogoItemValidator $validator1, CatalogoRepository $repository2, CatalogoValidator $validator2)
    {
        $this->catalogo_item_repository = $repository1;
        $this->catalogo_item_validator  = $validator1;

        $this->catalogo_repository = $repository2;
        $this->catalogo_validator  = $validator2;
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($catalogos)
    {

        $perPage = request()->has('per_page') ? (int) request()->per_page : 5;
        //$items = CatalogoItem::find($catalogos)->paginate($perPage);

        if (request()->has('sort')) {
            list($sortCol, $sortDir) = explode('|', request()->sort);
            $items = CatalogoItem::where('catalogo', $catalogos)->orderBy($sortCol, $sortDir)->paginate($perPage);
        } else {
            $items = CatalogoItem::where('catalogo', $catalogos)->orderBy('id', 'asc')->paginate($perPage);
        }


        /*

        $perPage = request()->has('per_page') ? (int) request()->per_page : 5;

        if (request()->has('sort')) {
            list($sortCol, $sortDir) = explode('|', request()->sort);
            $catalogoItems = $this->repository->with('padre')->orderBy($sortCol, $sortDir)->paginate($perPage);
        } else {
            $catalogoItems = $this->repository->with('padre')->orderBy('id', 'asc')->paginate($perPage);
        }
        */
        
        return response()->json($items);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  CatalogoItemCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $catalogo)
    {

        try {

            $this->catalogo_item_validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $catalogo = $this->catalogo_item_repository->create($request->only($this->requestFields['store']));

            return response()->json($catalogo);

        } catch (ValidatorException $e) {
            if ($request->wantsJson()) {
                return response()->json([
                    'dev_message' => $e->getMessage(),
                    'message' => $e->getMessageBag()
                    ], 403);
            }

            return redirect()->back()->withErrors($e->getMessageBag())->withInput();

        } catch (Exception $e){
            return response()->json(array(
                'message' => 'Se presento un error al tratar de hacer esta acción',
                'dev_message' => $e->getMessage()), 405);
        }


    }


    /**
     * Display the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($catalogo, $id)
    {
        try{

            $itemCatalogo = $this->catalogo_item_repository->find($id);
            return response()->json($itemCatalogo);

        } catch (Exception $e){
            return response()->json(array(
                'message' => 'Se presento un error al tratar de hacer esta acción',
                'dev_message' => $e->getMessage()), 405);
        }

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
    public function update(Request $request, $catalogo, $id)
    {

        try {

            $this->catalogo_item_validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $catalogoItem = $this->catalogo_item_repository->update($request->only($this->requestFields['update']), $id);

            return response()->json($catalogoItem);

        } catch (ValidatorException $e) {

            if ($request->wantsJson()) {
                return response()->json([
                    'dev_message' => $e->getMessage(),
                    'message' => $e->getMessageBag()
                ], 403);
            }

            return redirect()->back()->withErrors($e->getMessageBag())->withInput();
        } catch (Exception $e){
            
            return response()->json(array(
                'message' => 'Se presento un error al tratar de hacer esta acción',
                'dev_message' => $e->getMessage()), 405);
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
