<?php

namespace App\Http\Controllers;

use App\Menu;
use App\Entities\Rol;
use App\Entities\RolMenu;
use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Repositories\RolRepository;
use App\Validators\RolValidator;



class RolController extends Controller
{

    protected $requestFields = [];

    /**
     * @var MenuRepository
     */
    protected $repository;

    /**
     * @var MenuValidator
     */
    protected $validator;

    public function __construct(RolRepository $repository, RolValidator $validator)
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
        $roles = $this->repository->all();

        return response()->json($roles);
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

            //TODO

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
        $rol = $this->repository->find($id);

        return response()->json($rol);

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

        $rol = $this->repository->find($id);

        return view('rol.edit', compact('rol'));
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

            //TODO

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

            RolMenu::where('rol', $id)->delete();
            $deleted = $this->repository->delete($id);
            return response()->json(array('data' => $deleted), 204);

        } catch (Exception $e) {
            return response()->json(array(
                'message' => 'Se presento un error al tratar de hacer esta acción',
                'dev_message' => $e->getMessage()),409);
        }

    }
}
