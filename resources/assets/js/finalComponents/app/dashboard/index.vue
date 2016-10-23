<template>
	<!-- Main content -->

	<content-header title="Dahsboard" :list-path="path"></content-header>


	<section class="content">
		<!--<router-view class="animated" transition="fade" transition-mode="out-in" keep-alive></router-view>-->

		<div class="row">
			<div class="col-xs-12 col-sm-6 col-md-4">
				<!-- Apply any bg-* class to to the info-box to color it -->
				<div class="info-box bg-green">
					<!-- Apply any bg-* class to to the icon to color it -->
					<span class="info-box-icon"><i class="fa fa-bell-o"></i></span>
					<div class="info-box-content">
						<template v-if="ciclo.id">
							<span class="info-box-text">Ciclo {{ciclo.ciclo}} Período {{ciclo.anio}}-{{ciclo.anio+1}}</span>
							<div style="margin-top:10px;">
								<button class="btn bg-red-active"><i class="fa fa-bell-slash"></i> CERRAR CICLO</button>
							</div>
						</template>
						<template v-else>
							<span class="info-box-text">No hay ciclo activo</span>
							<div style="margin-top:10px;">
								<button class="btn bg-green-active"><i class="fa fa-bell-o"></i> INICIAR CICLO</button>
							</div>
						</template>
					</div><!-- /.info-box-content -->
				</div><!-- /.info-box -->
			</div>

			<div class="col-xs-12 col-sm-6 col-md-4">
				<!-- Apply any bg-* class to to the info-box to color it -->
				<div class="info-box bg-teal">
					<span class="info-box-icon"><i class="fa fa-users"></i></span>
					<div class="info-box-content">
						<span class="info-box-text">Docentes Activos</span>
						<span class="info-box-number">{{data.docentes_ciclo}}</span>
						<!-- The progress section is optional -->
						<div class="progress">
							<div class="progress-bar" :style="'width:'+ (data.docentes_ciclo/data.total_docentes)*100 + '%'"></div>
						</div>
					<span class="progress-description">
					  Registrados en nuestra BD {{data.total_docentes}}.
					</span>
					</div><!-- /.info-box-content -->
				</div><!-- /.info-box -->
			</div>

			<div class="col-xs-12 col-sm-6 col-md-4">
				<!-- Apply any bg-* class to to the info-box to color it -->
				<div class="info-box bg-aqua">
					<span class="info-box-icon"><i class="fa fa-calendar-o"></i></span>
					<div class="info-box-content">
						<span class="info-box-text">Horarios Asignados Cursos</span>
						<span class="info-box-number">{{data.cursos_ciclo_asignado}}</span>
						<!-- The progress section is optional -->
						<div class="progress">
							<div class="progress-bar" :style="'width:'+ (data.cursos_ciclo_asignado/data.cursos_ciclo)*100 + '%'"></div>
						</div>
					<span class="progress-description">
					  {{data.cursos_ciclo - data.cursos_ciclo_asignado}} Asignaciones pendientes
					</span>
					</div><!-- /.info-box-content -->
				</div><!-- /.info-box -->
			</div>

		</div>

		<div class="row">
			<div class="col-xs-12">
				<template v-if="loading">
					<p class="text-center">Cargando Gráfico...</p>
				</template>
				<template v-else>
					<grafico
							:data="graphs.primero.data"
							:options="graphs.primero.options"
							type="bar"
							id="myChart"
					></grafico>
				</template>

			</div>
		</div>


	</section>
</template>

<style>
	.show-div{
		z-index: 999;
	}
	.btn-spacing{
		margin: .5em;
	}
</style>

<script>

	import ContentHeader from '../../new-layout/content-header.vue';
	import Grafico from './charts/chart.vue';
	import Methods from './dashboardMethods';

	export default {
		name: 'content-dashboard',
		components:{
			'content-header' : ContentHeader,
			Grafico
		},
		ready(){
			this.load();
		},
		data: function(){
			return {
				loading: false,
				data: {
					cursos_ciclo: 0,
					cursos_ciclo_asignado: 0,
					docentes_ciclo: 0,
					horarios_distributivos_asignados: 0,
					total_docentes: 0
				},
				ciclo: {},
				path: [],
				graphs:{
					primero: {
						type: 'bar',
						data: {
							labels: ["Docentes Contrato Vigente", "Docentes Con Horario Distributivo", "Cursos Abiertos", "Horarios Asignados Cursos"],
							datasets: [{
								//label: 'Datos del Ciclo Vigente',
								label: 'Resultados',
								data: [0, 0, 0, 0],
								backgroundColor: [
									'rgba(255, 99, 132, 0.2)',
									'rgba(54, 162, 235, 0.2)',
									'rgba(255, 206, 86, 0.2)',
									'rgba(75, 192, 192, 0.2)',
									//'rgba(153, 102, 255, 0.2)',
									//'rgba(255, 159, 64, 0.2)'
								],
								borderColor: [
									'rgba(255,99,132,1)',
									'rgba(54, 162, 235, 1)',
									'rgba(255, 206, 86, 1)',
									'rgba(75, 192, 192, 1)',
									//'rgba(153, 102, 255, 1)',
									//'rgba(255, 159, 64, 1)'
								],
								borderWidth: 1
							}]
						},
						options: {
							scales: {
								yAxes: [{
									ticks: {
										beginAtZero:true
									}
								}]
							},
							responsive: true
						}
					},
					segundo: {
						labels: [
							"Red",
							"Blue",
							"Yellow"
						],
						datasets: [
							{
								data: [300, 50, 100],
								backgroundColor: [
									"#FF6384",
									"#36A2EB",
									"#FFCE56"
								],
								hoverBackgroundColor: [
									"#FF6384",
									"#36A2EB",
									"#FFCE56"
								]
							}]
					}
				}
			}
		},
		methods: Methods
	}

</script>
