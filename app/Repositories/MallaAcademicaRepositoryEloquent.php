<?php

namespace App\Repositories;

use App\Presenters\MallaAcademicaPresenter;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\MallaAcademicaRepository;
use App\Entities\MallaAcademica;
use App\Validators\MallaAcademicaValidator;

/**
 * Class MallaAcademicaRepositoryEloquent
 * @package namespace App\Repositories;
 */
class MallaAcademicaRepositoryEloquent extends BaseRepository implements MallaAcademicaRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return MallaAcademica::class;
    }

    /**
    * Specify Validator class name
    *
    * @return mixed
    */
    public function validator()
    {

        return MallaAcademicaValidator::class;
    }

    /**
     * Specify Searchable fields
     * */
    protected $fieldSearchable = [
        'codigo_materia' => 'like',
        'nombre_materia' => 'like',
        'tipo_materia' => 'like',
        'tipo_asignacion' => 'like',
        'horas',
        'estado' => 'like'
        //'titulo' => 'like', //with condition
    ];


    /**
     * Specify Presenter function
     *
     * @return mixed
     */
    public function presenter()
    {
        return MallaAcademicaPresenter::class;
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
