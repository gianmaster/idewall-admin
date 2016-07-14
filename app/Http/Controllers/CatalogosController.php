<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\CatalogoCreateRequest;
use App\Http\Requests\CatalogoUpdateRequest;
use App\Repositories\CatalogoRepository;
use App\Validators\CatalogoValidator;


class CatalogosController extends Controller
{

    protected $requestFields = [
    'store'     => ['nombre', 'descripcion'],
    'update'    => ['nombre', 'descripcion']
    ];

    /**
     * @var CatalogoRepository
     */
    protected $repository;

    /**
     * @var CatalogoValidator
     */
    protected $validator;

    public function __construct(CatalogoRepository $repository, CatalogoValidator $validator)
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

        $perPage = request()->has('per_page') ? (int) request()->per_page : 5;

        $catalogos = $this->repository->paginate($perPage);

        $data = array();

        $data['data']= $catalogos->data;
        $data['total']= $catalogos->meta->total;
        $data['current_page']= $catalogos->meta->pagination->current_page;
        $data['per_page']= $catalogos->meta->pagination->per_page;
        $data['last_page']= null;
        $data['next_page_url']= $catalogos->meta->pagination->next;
        $data['prev_page_url']= $catalogos->meta->pagination->next;
        $data['from']= 1;
        $data['to']= $catalogos->meta->pagination->count;
        //"total":101,"per_page":15,"current_page":1,"last_page":7,"next_page_url":"http:\/\/localhost:88\/admin_lte\/public\/api\/users?page=2","prev_page_url":null,"from":1,"to":15,"data"
        //
        //"total":1,"count":1,"per_page":5,"current_page":1,"total_pages":1,"links":[]}
        
        return response()->json($data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  CatalogoCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $catalogo = $this->repository->create($request->only($this->requestFields['store']));

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
    public function show($id)
    {

        try{

            $catalogo = $this->repository->find($id);
            return response()->json($catalogo);

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

        $catalogo = $this->repository->find($id);

        return view('catalogos.edit', compact('catalogo'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  CatalogoUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     */
    public function update(Request $request, $id)
    {

        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $catalogo = $this->repository->update($id, $request->only($this->requestFields['update']), $id);

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
     * Remove the specified resource from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $deleted = $this->repository->delete($id);

        return response()->json([
            'message' => 'Catalogo deleted.',
            'deleted' => $deleted,
            ]); 

        return redirect()->back()->with('message', 'Catalogo deleted.');
    }
}
