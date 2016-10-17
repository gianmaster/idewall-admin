<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class ReportesController extends Controller
{
    
    use UtilTrait;
    
    public function listarHorariosCursos($ciclo){
        $data = DB::select("select js.id, js.ciclo, c.anio, c.ciclo num_ciclo, c.estado estado_ciclo,
          (select descripcion from catalogo_items where catalogo = 2 and codigo = js.catalogo_semestre) semestre,
          (select descripcion from catalogo_items where catalogo = 4 and codigo = js.catalogo_aula) aula,
          (select descripcion from catalogo_items where catalogo = 5 and codigo = js.catalogo_jornada) jornada,
          (select count(DISTINCT ciclo_materia_docente) from horarios_cursos where ciclo_jornada_semestre = js.id) total_materias,
          (select ifnull(sum(num_horas), 0) from horarios_cursos where ciclo_jornada_semestre = js.id) horas_clases
        from jornadas_semestres js, ciclos c
        where js.ciclo = $ciclo
        and c.id = js.ciclo;");
        
        return response()->json($this->paginateArray($data));
    }
}
