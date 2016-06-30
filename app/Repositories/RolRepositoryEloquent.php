<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\RolRepository;
use App\Entities\Rol;
use App\Validators\RolValidator;

/**
 * Class RolRepositoryEloquent
 * @package namespace App\Repositories;
 */
class RolRepositoryEloquent extends BaseRepository implements RolRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Rol::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
