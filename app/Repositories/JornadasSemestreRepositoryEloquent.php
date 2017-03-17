<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\JornadasSemestreRepository;
use App\Entities\JornadasSemestre;
use App\Presenters\JornadasSemestrePresenter;
use App\Validators\JornadasSemestreValidator;

/**
 * Class JornadasSemestreRepositoryEloquent
 * @package namespace App\Repositories;
 */
class JornadasSemestreRepositoryEloquent extends BaseRepository implements JornadasSemestreRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return JornadasSemestre::class;
    }

    /**
    * Specify Validator class name
    *
    * @return mixed
    */
    public function validator()
    {

        return JornadasSemestreValidator::class;
    }


    public function presenter(){
        return JornadasSemestrePresenter::class;
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
