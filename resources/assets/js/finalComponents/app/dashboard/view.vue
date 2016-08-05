<template>
				<div class="col-xs-12 col-sm-6 col-md-4">
					<!-- Apply any bg-* class to to the info-box to color it -->
					<div class="info-box bg-black">
					  <span class="info-box-icon"><i class="fa fa-users-o"></i></span>
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

				<div class="col-xs-12 col-sm-6 col-md-4">
					<!-- Apply any bg-* class to to the info-box to color it -->
					<div class="info-box">
					  <!-- Apply any bg-* class to to the icon to color it -->
					  <span class="info-box-icon bg-green"><i class="fa fa-star-o"></i></span>
					  <div class="info-box-content">
					    <span class="info-box-text">Ciclo Actual</span>
					    <span class="info-box-number">2016 - C2</span>
					    <div class="form-group">
					    	<button class="btn btn-danger">CERRAR CICLO</button>
					    </div>
					  </div><!-- /.info-box-content -->
					</div><!-- /.info-box -->
				</div>

</template>


<style>
	
</style>	

<script>
	export default {

		name: 'dashboard',
		data(){
			return {
				msg: 'hola mundo'
			}
		}
	}
</script>



