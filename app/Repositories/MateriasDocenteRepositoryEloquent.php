<?php

namespace App\Repositories;

use App\Presenters\MateriasDocentePresenter;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\MateriasDocenteRepository;
use App\Entities\MateriasDocente;
use App\Validators\MateriasDocenteValidator;

/**
 * Class MateriasDocenteRepositoryEloquent
 * @package namespace App\Repositories;
 */
class MateriasDocenteRepositoryEloquent extends BaseRepository implements MateriasDocenteRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return MateriasDocente::class;
    }

    /**
    * Specify Validator class name
    *
    * @return mixed
    */
    public function validator()
    {

        return MateriasDocenteValidator::class;
    }

    /**
     * Specify Searchable fields
     * */
    protected $fieldSearchable = [
        'docente',
        'materia',
        //'titulo' => 'like', //with condition
    ];


    /**
     * Specify Presenter function
     *
     * @return mixed
     */
    public function presenter()
    {
        return MateriasDocentePresenter::class;
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
