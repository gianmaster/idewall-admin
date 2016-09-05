<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\CicloDocentesRepository;
use App\Entities\CicloDocentes;
use App\Validators\CicloDocentesValidator;

/**
 * Class CicloDocentesRepositoryEloquent
 * @package namespace App\Repositories;
 */
class CicloDocentesRepositoryEloquent extends BaseRepository implements CicloDocentesRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return CicloDocentes::class;
    }

    /**
    * Specify Validator class name
    *
    * @return mixed
    */
    public function validator()
    {

        return CicloDocentesValidator::class;
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
