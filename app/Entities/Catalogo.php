<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Catalogo extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'catalogos';

    protected $fillable = ['nombre', 'descripcion', 'activo', 'id'];

    public function items(){
    	return $this->hasMany(CatalogoItem::class, 'catalogo', 'id');
    }

}
