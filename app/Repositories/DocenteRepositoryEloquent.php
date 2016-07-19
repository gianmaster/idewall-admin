<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\DocenteRepository;
use App\Presenters\DocentePresenter;
use App\Entities\Docente;
use App\Validators\DocenteValidator;

/**
 * Class DocenteRepositoryEloquent
 * @package namespace App\Repositories;
 */
class DocenteRepositoryEloquent extends BaseRepository implements DocenteRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Docente::class;
    }

    /**
    * Specify Validator class name
    *
    * @return mixed
    */
    public function validator()
    {

        return DocenteValidator::class;
    }

    /**
     * Specify Searchable fields
     * */
    protected $fieldSearchable = [
        'nombres' => 'like', 
        'apellidos' => 'like', 
        'identificacion' => 'like', 
        'tipo_identificacion' => 'like', 
        'email' => 'like',
        'email_corporativo' => 'like', 
        'celular'   => 'like', 
        'telefono' => 'like', 
        'estado_civil' => 'like', 
        'genero' => 'like', 
        'titulo_pregrado' => 'like',
        'titulo_postgrado' => 'like', 
        'titulo_mba' => 'like', 
        'registro_senescyt' => 'like', 
        'fecha_nacimiento', 
        'nacionalidad' => 'like',
        'residencia' => 'like', 
        'direccion' => 'like',
        'tipo_contrato' => 'like'
        //'titulo' => 'like', //with condition
    ];


    /**
     * Specify Presenter function
     *
     * @return mixed
     */
    public function presenter()
    {
        return DocentePresenter::class;
    }

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
