<?php

namespace App\Http\Controllers;

use App\Entities\HorariosCursos;
use App\Entities\JornadasSemestre;
use Barryvdh\DomPDF\Facade as PDF;
use Illuminate\Http\Request;

use DB;
use Carbon\Carbon;


use App\Http\Requests;

class ReportesPdfController extends Controller
{
    public function downloadHorarioCurso($idCicloJornadaSemestre){
    	$flag = true;

        $data_horario = $this->dataHorarios($idCicloJornadaSemestre);

        if($flag){
        	$data = $data_horario['data'];
        	$fileName = 'Horario de Clases - C:' . $data['ciclo'] . ' P:' . $data['descripcion_ciclo']['anio'] .'/' .($data['descripcion_ciclo']['anio']+1) . '-' . $data['catalogo_semestre'] .'-'. $data['catalogo_jornada'] .'- Aula:' . $data['aula']['codigo'] . '.pdf';
        	$pdf = PDF::loadView('reportes.horario_curso', $data_horario);
        	$pdf->setPaper('a4', 'landscape');
        	return $pdf->stream($fileName);
        	//return $pdf->download('archivo_prueba.pdf');	
        }else{
        	return view('reportes.horario_curso', $fileName);	
        }

        
    }
    
    
    public function donwloadDistributivoDocente(){
        return 'hora';
    }



    /**
     * Description
     * @return type
     */
    public function dataHorarios($id){
    	$data = JornadasSemestre::with('descripcionCiclo')
            ->with('aula')
            ->with('jornada')
            ->with('semestre')
            ->with('materiasNormalesSemestre')
            ->with('materiasEspecialesSemestre')
            ->with('horario')
            ->find($id)->toArray();

        // $horario = HorariosCursos::where('ciclo_jornada_semestre', $id)
        //     ->orderBy('id')
        //     ->orderBy('dia')
        //     ->orderBy('hora_inicio')
        //     ->with('materiaDocente')
        //     ->get()->toArray();

		$listaHoras = $this->listaHorahorario($id);
		$dataHorario = $data['horario'];

		$horario = array();
		$dias = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO'];

		for($i=1; $i<count($listaHoras); $i++){
			//set de la hora
			$prev = (array)$listaHoras[$i-1];
			$pos = (array)$listaHoras[$i];
			$horario[$i-1]['hora'] = "{$prev['hora']} - {$pos['hora']}";

			foreach ($dias as $dia) {
				//$horario[$i-1][$dia] = null;
				foreach ($dataHorario as $itemHorario) {
					if($dia == $itemHorario['dia']){
						$fhorarioInicio = Carbon::createFromFormat('Y-m-d H:i', '2020-01-01 ' . $prev['hora']);
						$fhorarioFin = Carbon::createFromFormat('Y-m-d H:i', '2020-01-01 ' . $pos['hora']);
						$fhoraMatIni = Carbon::createFromFormat('Y-m-d H:i', '2020-01-01 ' . $itemHorario['hora_inicio']);
						$fhoraMatFin = Carbon::createFromFormat('Y-m-d H:i', '2020-01-01 ' . $itemHorario['hora_fin']);
						//if($fhoraMatIni->between($fhorarioInicio, $fhorarioFin) || $fhoraMatFin->between($fhorarioInicio, $fhorarioFin)){
						if($fhorarioInicio->between($fhoraMatIni, $fhoraMatFin) || $fhorarioFin->between($fhoraMatIni, $fhoraMatFin)){
							$docente = $itemHorario['materia_docente']['docente_detail']['docente_detail'];
							$materia = $itemHorario['materia_docente']['materia_detail'];
							$horario[$i-1][$dia] = array(
								'materia' => $materia['nombre_materia'],
								'codigo' => $materia['codigo_materia'],
								'docente' => $docente['nombres'] . ' ' . $docente['apellidos'],
								);
						}
					}
				}
			}
		}

		return array('data' => $data, 'horario' => $horario);            
    }

	/**
	 * Description
	 * @param type $idJornadaSemestre 
	 * @return type
	 */
    public function listaHorahorario($idJornadaSemestre){
        $data = DB::select("select distinct x.hora from (
    SELECT DISTINCT hora_inicio as hora FROM horarios_cursos WHERE ciclo_jornada_semestre  = $idJornadaSemestre
           UNION
           SELECT DISTINCT hora_fin as hora FROM horarios_cursos WHERE ciclo_jornada_semestre  = $idJornadaSemestre
) x ORDER BY x.hora");
        return $data;
    }

}
