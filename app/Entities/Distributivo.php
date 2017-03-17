<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Distributivo extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'distributivos';

    protected $fillable = ['nombre', 'activo', 'orden', 'id'];

    public function items(){
        return $this->hasMany(ItemDistributivo::class, 'id_distributivo', 'id')->orderBy('orden', 'asc');
    }

}
