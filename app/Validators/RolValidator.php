<?php

namespace App\Validators;

use \Prettus\Validator\Contracts\ValidatorInterface;
use \Prettus\Validator\LaravelValidator;

class RolValidator extends LaravelValidator
{

    protected $rules = [
        ValidatorInterface::RULE_CREATE => [
            'nombre'        => 'required|max:255',
            'descripcion'   => 'required|max:255',
        ],
        ValidatorInterface::RULE_UPDATE => [
            'nombre'        => 'required|max:255',
            'descripcion'   => 'required|max:255',
        ],
   ];
}
