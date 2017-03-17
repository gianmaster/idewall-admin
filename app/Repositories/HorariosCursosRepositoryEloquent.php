<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\HorariosCursosRepository;
use App\Entities\HorariosCursos;
use App\Validators\HorariosCursosValidator;

/**
 * Class HorariosCursosRepositoryEloquent
 * @package namespace App\Repositories;
 */
class HorariosCursosRepositoryEloquent extends BaseRepository implements HorariosCursosRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return HorariosCursos::class;
    }

    /**
    * Specify Validator class name
    *
    * @return mixed
    */
    public function validator()
    {

        return HorariosCursosValidator::class;
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
