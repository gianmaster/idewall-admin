<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\CicloRepository;
use App\Presenters\CicloPresenter;
use App\Entities\Ciclo;
use App\Validators\CicloValidator;

/**
 * Class CicloRepositoryEloquent
 * @package namespace App\Repositories;
 */
class CicloRepositoryEloquent extends BaseRepository implements CicloRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Ciclo::class;
    }

    /**
    * Specify Validator class name
    *
    * @return mixed
    */
    public function validator()
    {

        return CicloValidator::class;
    }

    /**
     * Specify Searchable fields
     * */
    protected $fieldSearchable = [
        'nombre' => 'like',
        'periodo' => 'like',
        'id',
        //'titulo' => 'like', //with condition
    ];


    /**
    * Specify Presenter function
    *
    * @return mixed
    */
    public function presenter()
    {
        return CicloPresenter::class;
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
