<?php

namespace App\Http\Controllers;

use App\Menu;
use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\MenuCreateRequest;
use App\Http\Requests\MenuUpdateRequest;
use App\Repositories\MenuRepository;
use App\Validators\MenuValidator;



class MenusController extends Controller
{

    protected $requestFields = [
        'store'     => ['cod_padre', 'url', 'nombre', 'titulo', 'orden', 'iconclass'],
        'update'    => ['cod_padre', 'url', 'nombre', 'titulo', 'orden', 'iconclass']
    ];

    /**
     * @var MenuRepository
     */
    protected $repository;

    /**
     * @var MenuValidator
     */
    protected $validator;

    public function __construct(MenuRepository $repository, MenuValidator $validator)
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
        //$this->repository->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
        //$menus = $this->repository->all();
        $menus = $this->repository->findByField('cod_padre', null);

        return response()->json($menus);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  MenuCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        try {

            $this->validator->with($request->only($this->requestFields['store']))->passesOrFail(ValidatorInterface::RULE_CREATE);

            $menu = $this->repository->create($request->all());

            return response()->json($menu);

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
    public function show($id)
    {
        //$menu = $this->repository->find($id);
        $menu = array('data' => Menu::find($id));

        return response()->json($menu);

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

        $menu = $this->repository->find($id);

        return view('menus.edit', compact('menu'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  MenuUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     */
    public function update(Request $request, $id)
    {

        try {

            $this->validator->with($request->only($this->requestFields['update']))->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $menu = $this->repository->update($request->only($this->requestFields['update']), $id);

            return response()->json($menu);

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

        try {

            Menu::where('cod_padre', $id)->delete();
            $deleted = $this->repository->delete($id);
            return response()->json(array('data' => $deleted), 204);

        } catch (Exception $e) {
            return response()->json(array(
                'message' => 'Se presento un error al tratar de hacer esta acción',
                'dev_message' => $e->getMessage()),409);
        }

    }
}
