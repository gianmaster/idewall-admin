<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class HorariosDocentes extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'horarios_docentes';

    protected $fillable = ['id','id_item_distributivo','ciclo_docente','dia','hora_inicio','hora_fin','num_horas', 'etiqueta'];

    public function docente(){
        return $this->hasOne(CicloDocentes::class, 'id', 'ciclo_docente')
            ->with('docenteDetail');
    }
    
    public function distributivo(){
        return $this->hasOne(ItemDistributivo::class, 'id', 'id_item_distributivo')
            ->with('tipoDistributivo');
    }

}
