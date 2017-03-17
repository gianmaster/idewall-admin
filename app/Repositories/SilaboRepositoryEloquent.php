<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\SilaboRepository;
use App\Entities\Silabo;
use App\Validators\SilaboValidator;

/**
 * Class SilaboRepositoryEloquent
 * @package namespace App\Repositories;
 */
class SilaboRepositoryEloquent extends BaseRepository implements SilaboRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Silabo::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
