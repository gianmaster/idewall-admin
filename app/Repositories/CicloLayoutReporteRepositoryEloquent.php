<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\CicloLayoutReporteRepository;
use App\Entities\CicloLayoutReporte;
use App\Validators\CicloLayoutReporteValidator;

/**
 * Class CicloLayoutReporteRepositoryEloquent
 * @package namespace App\Repositories;
 */
class CicloLayoutReporteRepositoryEloquent extends BaseRepository implements CicloLayoutReporteRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return CicloLayoutReporte::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
