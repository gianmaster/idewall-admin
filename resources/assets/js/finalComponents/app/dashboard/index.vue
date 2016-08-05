<template>
	<!-- Main content -->
		
		<content-header title="Dahsboard" :list-path="path"></content-header>

		<section class="content">
			<!--<router-view class="animated" transition="fade" transition-mode="out-in" keep-alive></router-view>-->

			<div class="col-xs-12 col-sm-6 col-md-4">
				<!-- Apply any bg-* class to to the info-box to color it -->
				<div class="info-box bg-green">
				  <!-- Apply any bg-* class to to the icon to color it -->
				  <span class="info-box-icon"><i class="fa fa-bell-o"></i></span>
				  <div class="info-box-content">
				    <span class="info-box-text">Ciclo 2016-2017(I)</span>
				    <div style="margin-top:10px;">
				    	<button class="btn bg-red-active"><i class="fa fa-bell-slash"></i> CERRAR CICLO</button>
				    </div>
				  </div><!-- /.info-box-content -->
				</div><!-- /.info-box -->
			</div>

			<div class="col-xs-12 col-sm-6 col-md-4">
					<!-- Apply any bg-* class to to the info-box to color it -->
					<div class="info-box bg-teal">
					  <span class="info-box-icon"><i class="fa fa-users"></i></span>
					  <div class="info-box-content">
					    <span class="info-box-text">Docentes Activos</span>
					    <span class="info-box-number">21</span>
					    <!-- The progress section is optional -->
					    <div class="progress">
					      <div class="progress-bar" style="width: 80%"></div>
					    </div>
					    <span class="progress-description">
					      Se recomienda tener el 100%
					    </span>
					  </div><!-- /.info-box-content -->
					</div><!-- /.info-box -->
				</div>

				<div class="col-xs-12 col-sm-6 col-md-4">
					<!-- Apply any bg-* class to to the info-box to color it -->
					<div class="info-box bg-aqua">
					  <span class="info-box-icon"><i class="fa fa-calendar-o"></i></span>
					  <div class="info-box-content">
					    <span class="info-box-text">Horarios Asignados</span>
					    <span class="info-box-number">16</span>
					    <!-- The progress section is optional -->
					    <div class="progress">
					      <div class="progress-bar" style="width: 75%"></div>
					    </div>
					    <span class="progress-description">
					      5 Asignaciones pendientes
					    </span>
					  </div><!-- /.info-box-content -->
					</div><!-- /.info-box -->
				</div>

		</section>
</template>

<script>

	import ContentHeader from '../../new-layout/content-header.vue';

	export default {
		name: 'content-dashboard',
		components:{
			'content-header' : ContentHeader
		},
		data: function(){
			return {
				path: ['Prueba'],
			}
		},
		

	}
	
</script>