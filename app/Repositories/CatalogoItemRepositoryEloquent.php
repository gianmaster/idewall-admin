<?php

namespace App\Repositories;

use App\Presenters\CatalogoItemPresenter;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\CatalogoItemRepository;
use App\Entities\CatalogoItem;
use App\Validators\CatalogoItemValidator;

/**
 * Class CatalogoItemRepositoryEloquent
 * @package namespace App\Repositories;
 */
class CatalogoItemRepositoryEloquent extends BaseRepository implements CatalogoItemRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return CatalogoItem::class;
    }

    /**
    * Specify Validator class name
    *
    * @return mixed
    */
    public function validator()
    {

        return CatalogoItemValidator::class;
    }

    /**
     * Specify Searchable fields
     * */
    protected $fieldSearchable = [
        'codigo',
        'descripion',
        //'titulo' => 'like', //with condition
    ];

    /**
     * Specify Presenter function
     *
     * @return mixed
     */
    public function presenter()
    {
        return CatalogoItemPresenter::class;
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
