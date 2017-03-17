<?php

namespace App\Repositories;

use App\Presenters\MateriasCicloDocentePresenter;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\MateriasCicloDocenteRepository;
use App\Entities\MateriasCicloDocente;
use App\Validators\MateriasCicloDocenteValidator;

/**
 * Class MateriasDocenteRepositoryEloquent
 * @package namespace App\Repositories;
 */
class MateriasCicloDocenteRepositoryEloquent extends BaseRepository implements MateriasCicloDocenteRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return MateriasCicloDocente::class;
    }

    /**
    * Specify Validator class name
    *
    * @return mixed
    */
    public function validator()
    {

        return MateriasCicloDocenteValidator::class;
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
        return MateriasCicloDocentePresenter::class;
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
