<?php

namespace App\Http\Controllers;

use App\Entities\CicloLayoutReporte;
use Illuminate\Http\Request;

use App\Http\Requests;

class CicloLayoutReporteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reporte = CicloLayoutReporte::find(1)->toArray();
        return response()->json(['data' => $reporte]);
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        $inputs = $request->only(['cabecera', 'pie', 'director_carrera', 'elaborador']);

        $reporte = CicloLayoutReporte::where('id', $id)->update([
            'cabecera'          => $inputs['cabecera'],
            'pie'               => $inputs['pie'],
            'director_carrera'  => $inputs['director_carrera'],
            'elaborador'        => $inputs['elaborador']
        ]);

        return response()->json(['data' => $reporte]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
