<?php

namespace App\Repositories;

use App\Entities\Catalogo;
use App\Validators\CatalogoValidator;
use App\Presenters\CatalogoPresenter;
use App\Repositories\CatalogoRepository;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;


/**
 * Class CatalogoRepositoryEloquent
 * @package namespace App\Repositories;
 */
class CatalogoRepositoryEloquent extends BaseRepository implements CatalogoRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Catalogo::class;
    }

    /**
    * Specify Validator class name
    *
    * @return mixed
    */
    public function validator()
    {

        return CatalogoValidator::class;
    }

    /**
     * Specify Searchable fields
     * */
    protected $fieldSearchable = [
        'nombre' => 'like',
        'descripcion' => 'like',
        'id',
        //'titulo' => 'like', //with condition
    ];


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    /**
    * Specify Presenter function
    *
    * @return mixed
    */
    public function presenter()
    {
        return CatalogoPresenter::class;
    }
}
