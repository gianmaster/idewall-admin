<?php

namespace App\Http\Controllers;


use App\Repositories\MenuRepositoryEloquent;
use Illuminate\Http\Request;
use App\Entities\Menu;

use App\Http\Requests;

class MenuTestController extends Controller
{

    protected $repository;

    public function __construct(MenuRepositoryEloquent $repository){
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json($this->repository->findByField('cod_padre', null));
        //return response()->json(array('data' => $this->repository->findByField('nombre','menu')));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->only(['nombre', 'titulo', 'url', 'iconclass', 'cod_padre', 'orden']);
        $menu = Menu::create($input);
        return response()->json(array('data' => $menu));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json(array('data' => Menu::find($id)));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {

            $input = $request->only(['nombre', 'titulo', 'url', 'iconclass', 'cod_padre', 'orden']);
            $menu = Menu::where('id', $id)->update($input);
            return response()->json(array('data' => $menu), 200);

        } catch (Exception $e) {
            return response()->json(array(
                'message' => 'Se presento un error al tratar de hacer esta acción', 
                'dev_message' => $e->getMessage(),
                'code'  =>  409));    
        }
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {

            Menu::where('id', $id)->delete();
            Menu::where('cod_padre', $id)->delete();
            return response()->json(array('data' => []), 204);

        } catch (Exception $e) {
            return response()->json(array(
                'message' => 'Se presento un error al tratar de hacer esta acción', 
                'dev_message' => $e->getMessage(),
                'code'  =>  409));
        }
    }
}
