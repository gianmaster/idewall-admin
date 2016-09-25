<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class ItemDistributivo extends Model implements Transformable
{
    use TransformableTrait;

    protected $fillable = ['id','id_distributivo','nombre','activo','orden', 'modificable'];

    protected $table = 'item_distributivos';



}
