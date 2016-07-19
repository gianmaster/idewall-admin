<template>

	<!--
	<div class="col-sm-6 col-xs-12">
		<label>Catálogo</label>
		<select-list class-name="form-control col-xs-6" :select-value.sync="dataModel.catalogo" value-key="id" label-key="descripcion" url="api/catalogos-list"></select-list>
	</div>
	-->

	<div class="col-sm-6 col-xs-12">
		<label>Nombres</label>
		<input type="text" class="form-control" v-model="dataModel.nombres" placeholder="Giancarlos Steven" minlength="2" required>
		<input type="hidden" class="form-control" :value="dataModel.id">
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Apellidos</label>
		<input type="text" class="form-control" v-model="dataModel.apellidos" placeholder="Cercado Cedeño" minlength="3" required>
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Identificación</label>
		<input type="text" class="form-control" v-model="dataModel.identificacion" minlength="9" required>
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Tipo de Identificación</label>
		<select-list class-name="form-control col-xs-6" :select-value.sync="dataModel.tipo_identificacion" :data="['CEDULA', 'RUC', 'PASAPORTE']" :is-required="true"></select-list>
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Email Personal</label>
		<input type="email" class="form-control" v-model="dataModel.email" required>
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Email Corporativo</label>
		<input type="email" class="form-control" v-model="dataModel.email_corporativo" required>
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Celular</label>
		<input type="text" class="form-control" v-model="dataModel.celular" required>
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Teléfono</label>
		<input type="text" class="form-control" v-model="dataModel.telefono" required>
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Género</label>
		<select-list class-name="form-control col-xs-6" :select-value.sync="dataModel.genero" :data="['MASCULINO', 'FEMENINO']" :is-required="true"></select-list>
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Estado Civil</label>
		<select-list class-name="form-control col-xs-6" :select-value.sync="dataModel.estado_civil" :data="['SOLTERO', 'CASADO', 'DIVORCIADO', 'VIUDO']" :is-required="true"></select-list>
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Fecha Nacimiento</label>
		<input type="date" class="form-control" v-model="dataModel.fecha_nacimiento" required>
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Nacionalidad</label>
		<input type="text" class="form-control" v-model="dataModel.nacionalidad" required>
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Residencia</label>
		<input type="text" class="form-control" v-model="dataModel.residencia" required>
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Dirección</label>
		<input type="text" class="form-control" v-model="dataModel.direccion" required>
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Título Pregrado</label>
		<input type="text" class="form-control" v-model="dataModel.titulo_pregrado">
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Título Postgrado</label>
		<input type="text" class="form-control" v-model="dataModel.titulo_postgrado">
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Título MBA</label>
		<input type="text" class="form-control" v-model="dataModel.titulo_mba">
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Código de Registro Senescyt</label>
		<input type="text" class="form-control" v-model="dataModel.registro_senescyt">
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Tipo Contrato</label>
		<select-list class-name="form-control col-xs-6" :select-value.sync="dataModel.tipo_contrato" :data="['MEDIO_TIEMPO', 'TIEMPO_COMPLETO']" :is-required="true"></select-list>
	</div>


	<div class="col-xs-12">
		<div class="content">
			<button v-if="createMode" class="btn btn-success btn-flat" type="submit"><i class="fa fa-save"></i> GUARDAR</button>
			<button v-else class="btn btn-warning btn-flat" type="submit"><i class="fa fa-save"></i> GUARDAR CAMBIOS</button>
			<a v-link="{path: '/docentes'}" class="btn btn-default btn-flat"><i class="fa fa-reply"></i> VOLVER</a>
		</div>

	</div>
</template>

<script>

	import selectList from '../../reusable/select-list.vue';

	export default {
		beforeCompile(){
			if (this.createMode){
				this.dataModel = this.initModel();
			}
		},
		components: {
			'select-list': selectList
		},
		methods: {
			initModel: function(){
				return {
					id: null,
					nombres: null,
					apellidos: null,
					identificacion: null,
					tipo_identificacion: null,
					email: null,
					email_corporativo: null,
					celular: null,
					telefono: null,
					estado_civil: null,
					genero: null,
					titulo_pregrado: null,
					titulo_postgrado: null,
					titulo_mba: null,
					registro_senescyt: null,
					fecha_nacimiento: null,
					nacionalidad: null,
					residencia: null,
					direccion: null,
					tipo_contrato: null,
				}
			},
		},
		props: {
			createMode: {
				type: Boolean,
				required: false,
				default: true
			},
			dataModel: {
				type: Object,
				required: false,
				default: function(){
					return {
						id: null,
						nombres: null,
						apellidos: null,
						identificacion: null,
						tipo_identificacion: null,
						email: null,
						email_corporativo: null,
						celular: null,
						telefono: null,
						estado_civil: null,
						genero: null,
						titulo_pregrado: null,
						titulo_postgrado: null,
						titulo_mba: null,
						registro_senescyt: null,
						fecha_nacimiento: null,
						nacionalidad: null,
						residencia: null,
						direccion: null,
						tipo_contrato: null,
					}
				}
			}
		}
	}
	
</script>
