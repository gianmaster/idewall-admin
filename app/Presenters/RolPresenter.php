<?php

namespace App\Presenters;

use App\Transformers\RolTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class MenuPresenter
 *
 * @package namespace App\Presenters;
 */
class RolPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new RolTransformer();
    }
}