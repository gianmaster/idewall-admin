<!doctype html>
<html lang="es">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<title>Distributivo - Datos del docente</title>
	<style>
		body{
			margin: 0;
			font-size: 9px;
		}
		.container{
			margin: 5px 10px;
		}
		.table{
			width: 100%;
			max-width: 100%;
			border: 0;
			border-collapse: collapse;	
		}
		.t-td{
			margin: 4px;
		}

    	.table-bordered th,
    	.table-bordered td {
    		border: 1px solid #ddd !important;
    		margin: 0;
    	}

    	.t-center{
    		text-align: center;
    		vertical-align: middle;
    	}
    	.t-l{
    		text-align: left;
    	}
    	.t-r{
    		text-align: right;
    	}

    	.myfooter{
    		position: absolute;
    		bottom: 70;
    	}
    </style>
</head>
<body>

	<div class="container">
		<table class="table">
			<tr>
				<td rowspan="4" class="t-l">
					<img src="{{ asset('/img/ug/ug-logo.png') }}" alt="logo">
				</td>
				<td colspan="5" class="t-center" style="font-size: 11px;">
					<strong>UNIVERSIDAD DE GUAYAQUIL</strong>
				</td>
				<td rowspan="4" class="t-r">
					<img src="{{ asset('/img/ug/fca-logo.png') }}" alt="logo">
				</td>
			</tr>
			<tr>
				<td colspan="5" class="t-center">
					FACULTAD DE CIENCIAS ADMINISTRATIVAS
				</td>
			</tr>
			<tr>
				<td colspan="5" class="t-center">
					CARRERA INGENIERIA EN SISTEMAS ADMINISTRATIVOS COMPUTARIZADOS
				</td>
			</tr>
			<tr>
				<td colspan="5" class="t-center">
					DISTRIBUTIVO DE CARGA HORARIA DOCENTE
				</td>
			</tr>
			<tr>
				<td></td>
				<td colspan="5" class="t-center">PERÍODO: {{ $cabecera['periodo']}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; TÉRMINO: CICLO {{ $cabecera['ciclo']}}</td>
				<td></td>
				<!--
				<td colspan="3" class="t-r">PERÍODO: {{ $cabecera['periodo']}}</td>
				<td></td>
				<td colspan="3" class="t-l">TÉRMINO: CICLO {{ $cabecera['ciclo']}}</td>
				-->
			</tr>
			<tr>
				<td>DOCENTE</td>
				<td colspan="3">{{ $cabecera['docente']}}</td>
				<td>CARGA HORARIA</td>
				<td colspan="2">{{ $cabecera['contrato']}}</td>
			</tr>
			<tr>
				<td>TIPO DOCENTE</td>
				<td colspan="3">{{ $cabecera['funcion']}}</td>
				<td>CED. ID:</td>
				<td colspan="2">{{ $cabecera['identificacion']}}</td>
			</tr>
			<tr>
				<td>CONTRATADO</td>
				<td colspan="2"></td>
				<td>F. INICIO:</td>
				<td>09/05/2016</td>
				<td>F. FINAL:</td>
				<td>30/09/2016</td>
			</tr>
			<tr>
				<td colspan="7">
					CURSO(S) Y PARALELOS ASIGNADO(S):
				</td>
			</tr>
		</table>
		<table class="table table-bordered">
			<thead>
				<tr>
					<th>
						<strong>HORA</strong>
					</th>
					<th>
						<strong>LUNES</strong>
					</th>
					<th>
						<strong>MARTES</strong>
					</th>
					<th>
						<strong>MIERCOLES</strong>
					</th>
					<th>
						<strong>JUEVES</strong>
					</th>
					<th>
						<strong>VIERNES</strong>
					</th>
					<th>
						<strong>SABADO</strong>
					</th>
				</tr>
			</thead>
			<tbody>
				@forelse ($horario as $key => $item)
					{{-- expr --}}
					<tr>
						<td class="t-center" width="10%">
							{{ $item['hora'] }}
						</td>
						<td class="t-center">
							@if(isset($item['LUNES']))
								@if($item['LUNES']['tipo'] == 'materias')
								<span class="text-materia">({{$item['LUNES']['codigo']}}) {{$item['LUNES']['etiqueta']}}</span><br>
								@else
								<span class="text-materia">{{$item['LUNES']['etiqueta']}}</span><br>
								@endif
							@endif
						</td>
						<td class="t-center">
							@if(isset($item['MARTES']))
							@if($item['MARTES']['tipo'] == 'materias')
								<span class="text-materia">({{$item['MARTES']['codigo']}}) {{$item['MARTES']['etiqueta']}}</span><br>
								@else
								<span class="text-materia">{{$item['MARTES']['etiqueta']}}</span><br>
								@endif
							@endif
						</td>
						<td class="t-center">
							@if(isset($item['MIERCOLES']))
							@if($item['MIERCOLES']['tipo'] == 'materias')
								<span class="text-materia">({{$item['MIERCOLES']['codigo']}}) {{$item['MIERCOLES']['etiqueta']}}</span><br>
								@else
								<span class="text-materia">{{$item['MIERCOLES']['etiqueta']}}</span><br>
								@endif
							@endif
						</td>
						<td class="t-center">
							@if(isset($item['JUEVES']))
							@if($item['JUEVES']['tipo'] == 'materias')
								<span class="text-materia">({{$item['JUEVES']['codigo']}}) {{$item['JUEVES']['etiqueta']}}</span><br>
								@else
								<span class="text-materia">{{$item['JUEVES']['etiqueta']}}</span><br>
								@endif
							@endif
						</td>
						<td class="t-center">
							@if(isset($item['VIERNES']))
							@if($item['VIERNES']['tipo'] == 'materias')
								<span class="text-materia">({{$item['VIERNES']['codigo']}}) {{$item['VIERNES']['etiqueta']}}</span><br>
								@else
								<span class="text-materia">{{$item['VIERNES']['etiqueta']}}</span><br>
								@endif
							@endif
						</td>
						<td class="t-center">
							@if(isset($item['SABADO']))
							@if($item['SABADO']['tipo'] == 'materias')
								<span class="text-materia">({{$item['SABADO']['codigo']}}) {{$item['SABADO']['etiqueta']}}</span><br>
								@else
								<span class="text-materia">{{$item['SABADO']['etiqueta']}}</span><br>
								@endif
							@endif
						</td>
					</tr>
				@empty
					{{-- empty expr --}}
					<tr>
						<td colspan="7" class="t-center">
							<p class="t-center">
								No hay registros
							</p>
						</td>
					</tr>
				@endforelse
				
			</tbody>
		</table>
	</div>

	<table class="table" style="position: absolute; bottom: 150">
		<tr>
			<td colspan="2"></td>
			<td colspan="2" class="t-center"><strong>__________________________________</strong></td>
			<td colspan="2" class="t-center"><strong>__________________________________</strong></td>
		</tr>
		<tr>
			<td colspan="2" class="t-center">
				<strong>Elaborado por:</strong>
				<br>
				<span>{{ strtoupper($elaboradoPor) }}</span>
			</td>
			<td colspan="2" class="t-center">
				<strong>Aprobado por:</strong>
				<br>
				<span>{{ strtoupper($aprobadoPor) }}</span>
				<br>
				DIRECTOR DE ISAC
			</td>
			<td colspan="2" class="t-center">
				<strong>Aceptado por:</strong>
				<br>
				<span>{{ strtoupper($aceptadoPor) }}</span>
			</td>
		</tr>
	</table>

	<table class="table table-bordered myfooter">
		<tr>
			<td colspan="7" class="t-center">
				<strong>EVIDENCIAS A PRESENTAR</strong>
			</td>
		</tr>
		<tr>
			<td colspan="2">
				<strong>Actividad Docente</strong>
			</td>
			<td colspan="5">
				<p>	FORMATOS PORTAFOLIO DOCENTE  (D-EYTA-01,  D-RAC-01,  D-EYTA-02, D-PD-01) , ASISTENCIA A REUNIONES DOCENTES, ENTRE OTROS PERTINENTES ACORDE AL <strong>ART. 15 DEL REGLAMENTO DE RÉGIMEN ACADÉMICO DE EDUCACIÓN SUPERIOR Y DEMÁS SOLICITADOS CONFORME EL REGLAMENTO DE LA UNIVERSIDAD Y EL PLAN DE FORTALECIMIENTO INSTITUCIONAL.</strong> </p>
			</td>
		</tr>
		<tr>
			<td colspan="2">
				<strong>Actividad Complementaria a la docencia:</strong>
			</td>
			<td colspan="5">
				<p>FORMATOS (TT-STT-01), PLANIFICACIÓN E INFORME DE ACTIVIDADES, Y DEMÁS SOLICITADOS CONFORME EL REGLAMENTO DE LA UNIVERSIDAD Y EL PLAN DE FORTALECIMIENTO INSTITUCIONAL.</p>
			</td>
		</tr>
	</table>

</body>
</html>