<?php

namespace App\Validators;

use \Prettus\Validator\Contracts\ValidatorInterface;
use \Prettus\Validator\LaravelValidator;

class CicloValidator extends LaravelValidator
{

    protected $rules = [
        ValidatorInterface::RULE_CREATE => [
        	'nombre'	=> 'required|max:100',
        	'periodo'	=> 'required|max:200|unique:ciclos',
        ],
        ValidatorInterface::RULE_UPDATE => [
        	'nombre'	=> 'required|max:100',
        	'periodo'	=> 'required|max:200|unique:ciclos',
        ],
   ];
}
