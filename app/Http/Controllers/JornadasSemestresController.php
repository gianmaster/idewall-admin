<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\JornadasSemestreCreateRequest;
use App\Http\Requests\JornadasSemestreUpdateRequest;
use App\Repositories\JornadasSemestreRepository;
use App\Validators\JornadasSemestreValidator;


class JornadasSemestresController extends Controller
{

    /**
     * @var JornadasSemestreRepository
     */
    protected $repository;

    /**
     * @var JornadasSemestreValidator
     */
    protected $validator;

    public function __construct(JornadasSemestreRepository $repository, JornadasSemestreValidator $validator)
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
        $jornadasSemestres = $this->repository->all();

        return response()->json($jornadasSemestres);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  JornadasSemestreCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $jornadasSemestre = $this->repository->create($request->all());

            $response = [
                'message' => 'JornadasSemestre created.',
                $jornadasSemestre->toArray(),
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
        $jornadasSemestre = $this->repository->find($id);

        return response()->json($jornadasSemestre);
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

        $jornadasSemestre = $this->repository->find($id);

        return view('jornadasSemestres.edit', compact('jornadasSemestre'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  JornadasSemestreUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     */
    public function update(Request $request, $id)
    {

        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $jornadasSemestre = $this->repository->update($id, $request->all());

            $response = [
                'message' => 'JornadasSemestre updated.',
                $jornadasSemestre->toArray(),
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
    public function destroy($id)
    {
        $deleted = $this->repository->delete($id);

        return response()->json([
            'message' => 'JornadasSemestre deleted.',
            'deleted' => $deleted,
        ]);
    }
}
