<?php

namespace App\Validators;

use \Prettus\Validator\Contracts\ValidatorInterface;
use \Prettus\Validator\LaravelValidator;

class CatalogoValidator extends LaravelValidator
{

    protected $rules = [
        ValidatorInterface::RULE_CREATE => [
        	'nombre'		=> 'required|max:255',
        	'descripcion'	=> 'max:255',
        ],
        ValidatorInterface::RULE_UPDATE => [
        	'nombre'		=> 'required|max:255',
        	'descripcion'	=> 'max:255',
        ],
   ];
}
