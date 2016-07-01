<?php

namespace App\Repositories;

use App\Entities\Menu;
use App\Validators\MenuValidator;
use App\Repositories\MenuRepository;
use App\Presenters\MenuPresenter;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

/**
 * Class MenuRepositoryEloquent
 * @package namespace App\Repositories;
 */
class MenuRepositoryEloquent extends BaseRepository implements MenuRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Menu::class;
    }

    /**
    * Specify Validator class name
    *
    * @return mixed
    */
    public function validator()
    {

        return MenuValidator::class;
    }

    /**
     * Specify Searchable fields
     * */
    protected $fieldSearchable = [
        'nombre',
        'titulo',
        //'titulo' => 'like', //with condition
    ];


    /**
    * Specify Presenter function
    *
    * @return mixed
    */
    public function presenter()
    {

        return MenuPresenter::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
