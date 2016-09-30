<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\HorariosDocentesRepository;
use App\Entities\HorariosDocentes;
use App\Validators\HorariosDocentesValidator;

/**
 * Class HorariosDocentesRepositoryEloquent
 * @package namespace App\Repositories;
 */
class HorariosDocentesRepositoryEloquent extends BaseRepository implements HorariosDocentesRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return HorariosDocentes::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
