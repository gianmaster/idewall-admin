<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $request = request();

        if (request()->has('sort')) {
            list($sortCol, $sortDir) = explode('|', request()->sort);
            $query = User::orderBy($sortCol, $sortDir);
        } else {
            $query = User::orderBy('id', 'asc');
        }

        if ($request->exists('filter')) {
            $query->where(function($q) use($request) {
                $value = "%" . $request->filter . "%";
                $q->where('name', 'like', $value)
                ->orWhere('email', 'like', $value);
            });
        }

        $perPage = request()->has('per_page') ? (int) request()->per_page : null;

        return response()->json(
            $query->with('descripcionRol')->paginate($perPage)
            )
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'GET');

        //$perPage = isset($_GET['per_page']) ? $_GET['per_page'] : 10;
        //return response()->json(User::paginate($perPage));
        //return response()->json(array('data' => User::all()));
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
        $input = $request->only(['name', 'email', 'rol', 'state']);
        $input['password'] = bcrypt($input['email']);
        isset($input['state']) ? null : $input['state'] = true;
        $input['avatar'] = 'img/user-profile.png';
        $user = User::create($input);
        return response()->json(array('data' => $user));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);
        if($user)
            return response()->json(array('data' => $user));
        else
            return response()->json(array('data' => []));
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
        $user = User::find($id);
        $user->update($request->only(['name', 'email', 'rol', 'state']));
        return response()->json(array('data' => $user));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return response()->json(array('data' => User::destroy($id)));
    }
}
