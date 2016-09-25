<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\DistributivosRepository;
use App\Entities\Distributivo;
use App\Validators\DistributivosValidator;

/**
 * Class DistributivosRepositoryEloquent
 * @package namespace App\Repositories;
 */
class DistributivosRepositoryEloquent extends BaseRepository implements DistributivosRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Distributivo::class;
    }

    protected $fieldSearchable = [
        'nombre' => 'like',
        'orden',
    ];
    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
