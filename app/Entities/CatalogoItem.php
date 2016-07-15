<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class CatalogoItem extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'catalogo_items';

    protected $fillable = ['catalogo', 'codigo', 'descripcion', 'orden', 'activo'];

    public function padre(){
        return $this->belongsTo(Catalogo::class, 'id', 'catalogo');
    }

}
