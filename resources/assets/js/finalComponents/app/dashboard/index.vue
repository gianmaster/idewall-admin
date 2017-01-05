<template>
	<!-- Main content -->

	<content-header title="Dashboard" :list-path="path"></content-header>

	<section class="content">
		<!--<router-view class="animated" transition="fade" transition-mode="out-in" keep-alive></router-view>-->

		<div class="row">
			<div class="col-xs-12 col-sm-6 col-md-4">
				<!-- Apply any bg-* class to to the info-box to color it -->
				<div class="info-box bg-green">
					<!-- Apply any bg-* class to to the icon to color it -->
					<span class="info-box-icon"><i class="fa fa-bell-o"></i></span>
					<div class="info-box-content">
						<template v-if="ciclo != null">
							<span class="info-box-text">Ciclo {{ciclo.ciclo}} Período {{ciclo.anio}}-{{ciclo.anio+1}}</span>
							<div style="margin-top:10px;">
								<button class="btn bg-red-active" @click.prevent="cerrarCiclo"><i class="fa fa-bell-slash"></i> CERRAR CICLO</button>
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
			<div class="col-xs-12 col-sm-6" style="max-height: 300px;">
				<template v-if="loading == true">
					<p class="text-center"><i class="fa fa-refresh fa-spin"></i> Cargando Gráfico...</p>
				</template>
				<template v-else>
					<template v-if="ciclo != null">

						<grafico
								:data="graphs.primero.data"
								:options="graphs.primero.options"
								type="doughnut"
								id="myChart1"
						></grafico>

						<!--<vue-chart :data="testdata" type="doughnut"></vue-chart>-->
					</template>
					<template v-else>
						<p class="text-center text-red">No hay registros de un ciclo activo <i class="fa fa-pie-chart" aria-hidden="true"></i></p>
					</template>
				</template>

			</div>

			<div class="col-xs-12 col-sm-6" style="max-height: 300px;">
				<template v-if="loading == true">
					<p class="text-center"><i class="fa fa-refresh fa-spin"></i> Cargando Gráfico...</p>
				</template>
				<template v-else>
					<template v-if="ciclo != null">
						<grafico
								:data="graphs.segundo.data"
								:options="graphs.segundo.options"
								type="doughnut"
								id="myChart2"
						></grafico>
						<!--<vue-chart :data="testdata" type="doughnut"></vue-chart>-->
					</template>
					<template v-else>
						<p class="text-center text-red">No hay registros de un ciclo activo <i class="fa fa-pie-chart" aria-hidden="true"></i></p>
					</template>
				</template>
			</div>

			<div class="col-xs-12 col-sm-4" style="margin-top: 20px">
				<button class="btn btn-primary btn-block">ENVIAR SÍLABOS <i class="fa fa-envelope-o"></i></button>
				<p class="text-center text-red">Use la opción de envío de sílabos solo cuando terminte la asignación de las horas distributivas de los docentes.</p>

				<p class="text-center text-blue">Recuerde que usted puede agregar y/o actualizar los sílabos en la opción
					<a v-link="{path:'malla_academica'}">Malla Académica</a>.</p>
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
			Grafico: Grafico
		},
		ready(){
			this.load();
		},
		data: function(){
			return {
				loading: false,
				testdata: {
          			labels: ["REMAIN", "LEAVE"],
					datasets: [{
					backgroundColor: ["#36A2EB", "#FF6384"],
					data: [1, 1]
				  }]},
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
							labels: ["Docentes Contrato Vigente", "Docentes Con Horario Distributivo"],
							datasets: [{
								//label: 'Datos del Ciclo Vigente',
								label: 'Resultados',
								data: [0, 0],
								backgroundColor: [
									"#2ea3a3",
									"#00a65a"
									//'rgba(153, 102, 255, 0.2)',
									//'rgba(255, 159, 64, 0.2)'
								],
								borderColor: [
									'#fff',
									'#fff',
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
						type: 'bar',
						data: {
							labels: ["Cursos Abiertos", "Horarios Asignados Cursos"],
							datasets: [{
								//label: 'Datos del Ciclo Vigente',
								label: 'Resultados',
								data: [0, 0],
								backgroundColor: [
									"#e84848",
									"#00a65a",
									//'rgba(153, 102, 255, 0.2)',
									//'rgba(255, 159, 64, 0.2)'
								],
								borderColor: [
									'#fff',
									'#fff',
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
				}
			}
		},
		methods: Methods
	}

</script>

