<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\ItemDistributivoRepository;
use App\Entities\ItemDistributivo;
use App\Validators\ItemDistributivoValidator;

/**
 * Class ItemDistributivoRepositoryEloquent
 * @package namespace App\Repositories;
 */
class ItemDistributivoRepositoryEloquent extends BaseRepository implements ItemDistributivoRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return ItemDistributivo::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
