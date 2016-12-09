<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use Illuminate\Support\Facades\Auth;

use App\User;

use App\Entities\Rol;
use App\Entities\RolMenu;
use App\Entities\Menu;

class UserController extends Controller
{

    /**
     * Display the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getProfile(){
        $user = Auth::user();
        return response()->json($user);
    }
    
    
    public function uploadAvatar(Requests $request, $idUser){
        $dir = '/img/users';
        $request->file('avatar')->move($dir);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $userId = Auth::user()->id;

        $request = request();

        if (request()->has('sort')) {
            list($sortCol, $sortDir) = explode('|', request()->sort);
            $query = User::where('id','<>', $userId)
                ->orderBy($sortCol, $sortDir);
        } else {
            $query = User::where('id','<>', $userId)
                ->orderBy('id', 'asc');
        }

        if ($request->exists('filter')) {
            $query->where('id', '<>',$userId)
                ->where(function($q) use($request) {
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
        $input = $request->only(['name', 'email', 'rol', 'state', 'avatar']);
        $input['password'] = bcrypt($input['email']);
        isset($input['state']) ? null : $input['state'] = true;
        $input['avatar'] = $input['avatar'] == '' ? 'img/user-profile.png' : $input['avatar'];
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
        return $user;
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
        $pass = $request->get('password');

        if($pass){
            if(trim($pass) != '')
                $user->update(['password' => bcrypt($pass)]);
        }

        $dir = 'img/users';
        $fileName = $dir . '/' . 'photo-' . time();
        $data = $request->only(['name', 'email', 'rol', 'state', 'avatar']);

        if(strlen($data['avatar']) > 500){
            $data['avatar'] = $this->base64_to_jpeg($data['avatar'], $fileName);
        }

        $user->update($data);
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



    function base64_to_jpeg($base64_string, $output_file) {
        $data = explode(',', $base64_string);
        
        $types = array(
            'data:image/jpeg;base64' => 'jpeg',
            'data:image/jpg;base64' => 'jpg',
            'data:image/png;base64' => 'png',
        );
        
        $output_file = $output_file . '.' . $types[$data[0]];        

        $ifp = fopen($output_file, "wb"); 

        fwrite($ifp, base64_decode($data[1])); 
        fclose($ifp); 

        return $output_file; 
    }
}
