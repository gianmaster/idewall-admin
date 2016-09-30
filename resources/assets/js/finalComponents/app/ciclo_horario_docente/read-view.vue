<template>
	<loading-app v-if="loading===true"></loading-app>
	<div class="row" v-else>

		<div class="col-xs-12 col-sm-6">

			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title">Infomación Personal <i class="fa fa-user" style="color:#3c8dbc;"></i></h3>
				</div>
				<!-- /.box-header -->
				<div class="box-body">
					<strong>Nombres</strong>
					<p class="text-muted">
						{{newModel.nombres}}
					</p>

					<strong>Apellidos</strong>
					<p class="text-muted">
						{{newModel.apellidos}}
					</p>

					<strong>Identificación</strong>
					<p class="text-muted">
						{{newModel.identificacion}} <sub>{{newModel.tipo_identificacion}}</sub>
					</p>

					<strong>Género</strong>
					<p class="text-muted">
						{{newModel.genero}}
					</p>

					<strong>Estado Civil</strong>
					<p class="text-muted">
						{{newModel.estado_civil}}
					</p>

					<hr>

					<strong>Fecha Nacimiento <i class="fa fa-calendar-o"></i></strong>
					<p class="text-muted">
						<span class="label label-primary">{{newModel.fecha_nacimiento}} </span>
					</p>

					<hr>

					
					<strong>Contacto <i class="fa fa-search-minus"></i></strong>

					<p class="text-muted"><a href="tel:+{{newModel.celular}}">{{newModel.celular}} <i class="fa fa-mobile-phone"></i> </a></p>

					<p class="text-muted"><a href="tel:+{{newModel.telefono}}">{{newModel.telefono}} <i class="fa fa-phone"></i></a></p>

					<p class="text-muted"><a href="mailto:{{newModel.email}}">{{newModel.email}} <i class="fa fa-envelope-o"></i></a></p>

				</div>
				<!-- /.box-body -->
			</div>
		</div>
		
		<div class="col-xs-12 col-sm-6">
			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title">Más Detalles <i class="fa fa-graduation-cap" style="color:#3c8dbc;"></i></h3>
				</div>
				<!-- /.box-header -->
				<div class="box-body">


					<strong><i class="fa fa-briefcase margin-r-5"></i> Tipo de Contrato</strong>

					<p class="text-muted">
						<span class="label label-success" v-if="newModel.tipo_contrato=='TIEMPO_COMPLETO'">
							Tiempo Completo <i class="fa fa-clock-o"></i>
						</span>
						<span class="label label-warning" v-else>
							Medio Tiempo <i class="fa fa-clock-o"></i>
						</span>
					</p>

					<hr>
					

					<strong><i class="fa fa-book margin-r-5"></i> Educación</strong>

					<p class="text-muted">
						Título PostGrado: {{newModel.titulo_postgrado ? newModel.titulo_postgrado : 'N/A'}}
					</p>

					<p class="text-muted">
						Título Pregredo: {{newModel.titulo_pregrado ? newModel.titulo_pregrado : 'N/A'}}
					</p>

					<p class="text-muted">
						Título MBA: {{newModel.titulo_mba ? newModel.titulo_mba : 'N/A'}}
					</p>

					<p class="text-muted">
						Título Pregredo: {{newModel.titulo_pregrado ? newModel.titulo_pregrado : 'N/A'}}
					</p>

					<p class="text-muted">
						Registro Senescyt: {{newModel.registro_senescyt ? newModel.registro_senescyt : 'N/A'}}
					</p>

					<p class="text-muted">
						Email Corporativo: <a href="mailto:{{newModel.email_corporativo}}">{{newModel.email_corporativo ? newModel.email_corporativo : 'N/A'}}</a>
					</p>

					<hr>

					<strong><i class="fa fa-map-marker margin-r-5"></i> Localización</strong>

					<p class="text-muted">
						Nacionalidad: {{newModel.nacionalidad}}
					</p>

					<p class="text-muted">
						Residencia: {{newModel.residencia}}
					</p>

					<p class="text-muted">
						Dirección: {{newModel.direccion}}
					</p>

				</div>
				<!-- /.box-body -->
			</div>
		</div>

		<div class="col-xs-12">
			<a v-link="{path: '/docentes'}" class="btn btn-default btn-flat"><i class="fa fa-reply"></i> VOLVER</a>
		</div>
	</div>
</template>

<script>
	
	import myMixins from './mixins';

	export default {
		mixins: [myMixins],
		ready(){
			this.read();
		},
		data(){
			return {
				newModel: {},
				loading: true,
				url: 'api/docentes'
			}
		},

	}


</script>