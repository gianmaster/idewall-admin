<?php

namespace App\Http\Controllers;

use App\Entities\HorariosCursos;
use Barryvdh\DomPDF\Facade as PDF;
use Illuminate\Http\Request;

use App\Http\Requests;

class ReportesPdfController extends Controller
{
    public function downloadHorarioCurso($idCicloJornadaSemestre){
        $data = HorariosCursos::where('ciclo_jornada_semestre', $idCicloJornadaSemestre)->get();
        $pdf = PDF::loadView('reportes.distributivo_docente', $data);
        return $pdf->download('archivo_prueba.pdf');
    }
    
    
    public function donwloadDistributivoDocente(){
        return 'hora';
    }
}
