<?php

namespace App\Http\Controllers;

use App\Entities\Ciclo;
use App\Entities\CicloLayoutReporte;
use App\Entities\HorariosCursos;
use App\Entities\JornadasSemestre;
use App\Entities\Docente;
use App\Entities\CicloDocentes;
use Barryvdh\DomPDF\Facade as PDF;
use Illuminate\Http\Request;

use DB;
use Carbon\Carbon;


use App\Http\Requests;
use Maatwebsite\Excel\Facades\Excel;

class ReportesPdfController extends Controller
{

	protected $ciclo_rpt = null;

    public function downloadHorarioCurso($idCicloJornadaSemestre){
    	$flag = true; //activa el modo pdf, false para modo vista html

		$cabeceraRpt = CicloLayoutReporte::find(1)->toArray();

        $data_horario = $this->dataHorarios($idCicloJornadaSemestre);

        if($flag){

        	$data = $data_horario['data'];
        	$fileName = 'Horario de Clases - C:' . $data['ciclo'] . ' P:' . $data['descripcion_ciclo']['anio'] .'/' .($data['descripcion_ciclo']['anio']+1) . '-' . $data['catalogo_semestre'] .'-'. $data['catalogo_jornada'] .'- Aula:' . $data['aula']['codigo'] . '.pdf';
        	$pdf = PDF::loadView('reportes.horario_curso', $data_horario, [ 'cabeceraRpt' => $cabeceraRpt]);
        	$pdf->setPaper('a4', 'landscape');
        	return $pdf->stream($fileName);
        	//return $pdf->download('archivo_prueba.pdf');	
        }else{
        	return view('reportes.horario_curso', $data_horario, $cabeceraRpt);
        }

    }
    
    
    public function donwloadDistributivoDocente($idCicloDocente){
    	$flag = true; //activa el modo pdf, false para modo vista html

		$cabeceraRpt = CicloLayoutReporte::find(1)->toArray();

    	$cicloDocente = CicloDocentes::find($idCicloDocente);
    	if($cicloDocente){
    		$docente = $cicloDocente->docenteDetail;
    		if($flag) {
				$fini = Carbon::createFromFormat('Y-m-d', $cicloDocente->cicloDetail->fecha_inicio);
				$ffin = Carbon::createFromFormat('Y-m-d', $cicloDocente->cicloDetail->fecha_fin);
				$cabecera = array(
					'docente' => strtoupper($docente->nombres . ' ' . $docente->apellidos),
					'ciclo' => $cicloDocente->cicloDetail->ciclo,
					'inicio' => $fini->format('d/m/Y'),
					'fin' => $ffin->format('d/m/Y'),
					'periodo' => $cicloDocente->cicloDetail->anio . '-' . ($cicloDocente->cicloDetail->anio + 1),
					'contrato' => $docente->tipo_contrato,
					'funcion' => $docente->funcion,
					'identificacion' => $docente->identificacion,
					'facultad' => $cabeceraRpt['cabecera'],
					'carrera' => $cabeceraRpt['pie']
				);

				$aceptadoPor = $docente->abreviatura . '. ' . $docente->nombres . ' ' . $docente->apellidos;
				//$elaboradoPor = $this->getDocentePorFuncion('Gestor de Comisión Académica');
				//$aprobadoPor = $this->getDocentePorFuncion('Director de la Carrera');
				$elaboradoPor = $cabeceraRpt['elaborador'];
				$aprobadoPor = $cabeceraRpt['director_carrera'];

				$horario = $this->dataHorarioDistributivo($idCicloDocente);
				$pdf = PDF::loadView('reportes.distributivo_docente', compact('horario', 'aprobadoPor', 'elaboradoPor', 'aceptadoPor', 'cicloDocente', 'cabecera'));
				return $pdf->stream('descarga_distributivo.pdf');
			}else{
    			return view('reportes.distributivo_docente');
    		}
    	}

    	return response(['No hay registros asociados']);;
    	
    }

    public function getDocentePorFuncion($qry){
    	$docente = Docente::whereIn('estado', ['CONTRATADO', 'RENOVADO'])
    				->where('funcion', $qry)
    				->first();

    	if($docente){
    		return  $docente->abreviatura . '. ' . explode(' ', $docente->nombres)[0] . ' ' . $docente->apellidos;
    	}

    	return null;
    }


	/**
	 * Description: Metodo que procesa los datos previo al envio del horario
	 * @param type $id - id ciclo docente 
	 * @return type
	 */
	public function dataHorarioDistributivo($id){

		$listaHoras = $this->listaHorasDistributivoDocente($id);

		$dataHorario = DB::select("select * from (
			select 
			ma.codigo_materia codigo,
			ma.nombre_materia etiqueta,
			hc.dia, 
			hc.hora_inicio, 
			hc.hora_fin, 
			hc.num_horas,
			'materias' tipo
			from horarios_cursos hc, ciclo_docentes cd, docentes d, ciclo_materias_docente cmd, malla_academica ma
			where hc.ciclo_materia_docente in (select id from ciclo_materias_docente where ciclo_docente = $id)
			and cmd.id = hc.ciclo_materia_docente
			and cmd.ciclo_docente = cd.id
			and cd.docente = d.id
			and ma.id = cmd.materia

			union      

			select id_item_distributivo codigo, 
			etiqueta, 
			dia, 
			hora_inicio, 
			hora_fin, 
			num_horas,
			'distributivos' tipo
			from horarios_docentes
			where ciclo_docente = $id
			) xx order by xx.hora_inicio");

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
					$itemHorario = (array)($itemHorario);
					if($dia == $itemHorario['dia']){
						//$fecha = Carbon::createFromFormat('Y-m-d H:i:s', '2010-10-10 23:59:59');
						$fhorarioInicio = Carbon::createFromFormat('Y-m-d H:i:s', '2020-01-01 ' . $prev['hora'] . ':59');
						$fhorarioFin = Carbon::createFromFormat('Y-m-d H:i:s', '2020-01-01 ' . $pos['hora'] . ':59');
						$fhoraMatIni = Carbon::createFromFormat('Y-m-d H:i:s', '2020-01-01 ' . $itemHorario['hora_inicio'] . ':00');
						$fhoraMatFin = Carbon::createFromFormat('Y-m-d H:i:s', '2020-01-01 ' . $itemHorario['hora_fin'] . ':00');

						if($fhorarioInicio->between($fhoraMatIni, $fhoraMatFin)){
							$horario[$i-1][$dia] = array(
								'etiqueta' => strtoupper($itemHorario['etiqueta']),
								'codigo' => $itemHorario['codigo'],
								'tipo' => $itemHorario['tipo'],
								'ini'	=> $itemHorario['hora_inicio'],
								'fin'	=> $itemHorario['hora_fin']
								);
						}
						/*
						if($itemHorario['tipo'] == 'distributivos' && $fhoraMatIni->between($fhorarioInicio, $fhorarioFin)){
							$horario[$i-1][$dia] = array(
								'etiqueta' => strtoupper($itemHorario['etiqueta']),
								'codigo' => $itemHorario['codigo'],
								'tipo' => $itemHorario['tipo']
							);
						}
						*/
					}
				}
			}

		}

		return $horario;

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
						if($fhorarioInicio->between($fhoraMatIni, $fhoraMatFin) || $fhorarioFin->gte($fhoraMatFin)){
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


    /**
     * Metodo que saca las horas a mostrar en el horario
     * @param type $idCicloDocente 
     * @return type
     */
    public function listaHorasDistributivoDocente($idCicloDocente){
    	$data = DB::select("select distinct x.hora from (
    		SELECT DISTINCT hora_inicio as hora FROM horarios_docentes WHERE ciclo_docente  = $idCicloDocente
    		UNION
    		SELECT DISTINCT hora_fin as hora FROM horarios_docentes WHERE ciclo_docente  = $idCicloDocente
    		UNION 
    		SELECT DISTINCT hora_inicio as hora FROM horarios_cursos where ciclo_materia_docente in (SELECT id from ciclo_materias_docente where ciclo_docente = $idCicloDocente)
    		UNION 
    		SELECT DISTINCT hora_fin as hora FROM horarios_cursos where ciclo_materia_docente in (SELECT id from ciclo_materias_docente where ciclo_docente = $idCicloDocente)
    		) x ORDER BY x.hora");
    	return $data;
//select * from horarios_cursos where ciclo_materias_docente in (SELECT id from ciclo_materias_docente where ciclo_docente = 1)
    }


	/**
	 * @param $cicloId
	 * Reporte en excel de los cursos y docentes por ciclo
	 */
	public function reporteHorariosPorCiclo($cicloId)
	{
		$ciclo = Ciclo::find($cicloId);
		$this->ciclo_rpt = $cicloId;
		if($ciclo){
			$anio = (int)$ciclo->anio;
			$fecha = 'Período ' . $anio . '-' . ($anio+1) . ' Ciclo ' . $ciclo->ciclo;
			$archivo = 'Reporte Horarios I.S.A.C - ' . $fecha;
			Excel::create($archivo, function ($excel) {
				// Set the title
				$excel->setTitle('Reporte de Cursor por ciclo');
				// Chain the setters
				$excel->setCreator('I.S.A.C')
					->setCompany('Factutald de ciencias administrativas');
				// Call them separately
				$excel->setDescription('Reporte de horarios por ciclo de la carrera I.S.A.C ');

				$excel->sheet('horarios', function ($sheet) {
					$data = (array) $this->queryReportesporCiclo(2, $this->ciclo_rpt);
					$datos = array();
					foreach ($data as $item => $val) {
						array_push($datos, (array)$val);
					}
					//dd($datos);
					$sheet->fromArray($datos, null, 'A1', true);
					//manipulacion de las filas
					$sheet->row(1, function ($row) {
						// call cell manipulation methods
						$row->setBackground('#000000');
						$row->setFontColor('#FFFFFF');
					});

					$sheet->setAutoFilter('A1:Y1');

				});

			})->download('xlsx');
		}
	}

	/**
	 * @param $cicloId
	 * Reporte en excel de los distributivos por ciclo de todos los docentes
	 */
	public function reporteDistributivosPorCiclo($cicloId)
	{
		$ciclo = Ciclo::find($cicloId);
		$this->ciclo_rpt = $cicloId;
		if($ciclo){
			$anio = (int)$ciclo->anio;
			$fecha = 'Período ' . $anio . '-' . ($anio+1) . ' Ciclo ' . $ciclo->ciclo;
			$archivo = 'Reporte Distributivos I.S.A.C - ' . $fecha;
			Excel::create($archivo, function ($excel) {
				// Set the title
				$excel->setTitle('Reporte de Distributivos de Docentes por ciclo');
				// Chain the setters
				$excel->setCreator('I.S.A.C')
					->setCompany('Factutald de ciencias administrativas');
				// Call them separately
				$excel->setDescription('Reporte de Distributivos por ciclo de la carrera I.S.A.C ');

				$excel->sheet('Distributivos', function ($sheet) {
					$data = (array) $this->queryReportesporCiclo(1, $this->ciclo_rpt);
					$datos = array();
					foreach ($data as $item => $val) {
						array_push($datos, (array)$val);
					}
					//dd($datos);
					$sheet->fromArray($datos, null, 'A1', true);
					//manipulacion de las filas
					$sheet->row(1, function ($row) {
						// call cell manipulation methods
						$row->setBackground('#000000');
						$row->setFontColor('#FFFFFF');
					});

					$sheet->setAutoFilter('A1:Y1');

				});

			})->download('xlsx');
		}
	}

	/**
	 * @param $tipo
	 * @param $cicloId
	 * @return mixed
	 */
	public function queryReportesporCiclo($tipo, $cicloId){
		if($tipo === 1){
			// distributivos
			return DB::select("select * from (
						select
						  cd.ciclo,
						  doc.nombres,
						  doc.apellidos,
						  ma.nombre_materia etiqueta,
						  hc.dia,
						  hc.hora_inicio,
						  hc.hora_fin,
						  hc.num_horas
						from malla_academica ma,
						  ciclo_docentes cd,
						  ciclo_materias_docente cmd,
						  horarios_cursos hc,
						  docentes doc
						where cmd.ciclo_docente = cd.id
							  and hc.ciclo_materia_docente = cmd.id
							  and doc.id = cd.docente
							  and cmd.materia = ma.id
						union all
						-- distributivos
						select
						  cd.ciclo,
						  doc.nombres,
						  doc.apellidos,
						  hd.etiqueta,
						  hd.dia,
						  hd.hora_inicio,
						  hd.hora_fin,
						  hd.num_horas
						from horarios_docentes hd,
						  ciclo_docentes cd,
						  docentes doc
						  where doc.id = cd.docente
						and hd.ciclo_docente = cd.id) q
						where q.ciclo = $cicloId
						order by q.nombres, q.apellidos, q.dia, q.hora_inicio");
		}
		else {
			return DB::select("select
			  doc.abreviatura,
			  doc.nombres,
			  doc.apellidos,
			  malla.codigo_materia,
			  malla.nombre_materia,
			  /*
			  (select distinct cati.descripcion from horarios_cursos hc, ciclo_materias_docente cmd, jornadas_semestres jm, catalogo_items cati
			  where hc.ciclo_materia_docente = cmd.id
					and jm.id = hc.ciclo_jornada_semestre
					and cati.codigo = jm.catalogo_aula
					and cati.catalogo = 4
					and cmd.id = cimado.id) aula,
					*/
			  (select distinct cati.descripcion from horarios_cursos hc, ciclo_materias_docente cmd, jornadas_semestres jm, catalogo_items cati
			  where hc.ciclo_materia_docente = cmd.id
					and jm.id = hc.ciclo_jornada_semestre
					and cati.codigo = jm.catalogo_semestre
					and cati.catalogo = 2
					and cmd.id = cimado.id) semestre,
			  (select distinct cati.descripcion from horarios_cursos hc, ciclo_materias_docente cmd, jornadas_semestres jm, catalogo_items cati
			  where hc.ciclo_materia_docente = cmd.id
					and jm.id = hc.ciclo_jornada_semestre
					and cati.codigo = jm.catalogo_jornada
					and cati.catalogo = 5
					and cmd.id = cimado.id) jornada
			  from
				ciclos ci,
				docentes doc,
				ciclo_docentes cidoc,
				ciclo_materias_docente cimado,
				malla_academica malla
			  where ci.id = $cicloId
				and doc.id = cidoc.docente
				and cimado.ciclo_docente = cidoc.id
				and malla.id = cimado.materia
				and cidoc.ciclo =  ci.id;");
		}
	}
}
