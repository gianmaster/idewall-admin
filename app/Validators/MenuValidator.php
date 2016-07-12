<?php

namespace App\Validators;

use \Prettus\Validator\Contracts\ValidatorInterface;
use \Prettus\Validator\LaravelValidator;

class MenuValidator extends LaravelValidator
{

    protected $rules = [
        ValidatorInterface::RULE_CREATE => [
            'titulo'    => 'required|max:255',
            'url'       => 'max:255',
            'iconclass' => '',
            'orden'     => 'numeric',
            'cod_rol'   => 'required|numeric',
            'cod_padre' => 'numeric',
        ],
        ValidatorInterface::RULE_UPDATE => [
            'titulo'    => 'required|max:255',
            'url'       => 'max:255',
            'iconclass' => '',
            'orden'     => 'numeric',
            'cod_rol'   => 'required|numeric',
            'cod_padre' => 'numeric',
        ],
   ];
}
