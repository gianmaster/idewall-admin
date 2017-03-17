<template>

	<!--
	<div class="col-sm-6 col-xs-12">
		<label>Catálogo</label>
		<select-list class-name="form-control col-xs-6" :select-value.sync="dataModel.catalogo" value-key="id" label-key="descripcion" url="api/catalogos-list"></select-list>
	</div>
	-->

	<div class="col-sm-6 col-xs-12">
		<label>Código Materia</label>
		<input type="text" class="form-control" v-model="dataModel.codigo_materia" minlength="2" required>
		<input type="hidden" class="form-control" :value="dataModel.id">
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Nombre Materia</label>
		<input type="text" class="form-control" v-model="dataModel.nombre_materia" minlength="6" required>
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Semestre</label>
		<select-list class-name="form-control col-xs-6" :select-value.sync="dataModel.semestre" value-key="codigo" label-key="descripcion" :url="urlItemsCatalogo"></select-list>
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Tipo Materia</label>
		<select name="estado" id="tipo_materia" class="form-control" v-model="dataModel.tipo_materia" required>
			<option value="BASICA">BASICA</option>
			<option value="GENERAL">GENERAL</option>
			<option value="PROFESIONAL">PROFESIONAL</option>
			<option value="OPTATIVA">OPTATIVA</option>
		</select>
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Tipo Asignación</label>
		<select name="estado" id="tipo_asignacion" class="form-control" v-model="dataModel.tipo_asignacion" required>
			<option value="NORMAL">NORMAL</option>
			<option value="ESPECIAL">ESPECIAL</option>
		</select>
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Horas</label>
		<input type="number" class="form-control" v-model="dataModel.horas" min="0" required>
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Estado</label>
		<select name="estado" id="estado" class="form-control" v-model="dataModel.estado" required>
			<option value="ACTIVO">ACTIVO</option>
			<option value="INACTIVO">INACTIVO</option>
		</select>
	</div>

	<div class="col-xs-12">
		<div class="content">
			<button v-if="createMode" class="btn btn-success btn-flat" type="submit"><i class="fa fa-save"></i> GUARDAR</button>
			<button v-else class="btn btn-warning btn-flat" type="submit"><i class="fa fa-save"></i> GUARDAR CAMBIOS</button>
			<a v-link="{path: '/malla_academica'}" class="btn btn-default btn-flat"><i class="fa fa-reply"></i> VOLVER</a>
		</div>

	</div>
</template>

<script>

	import selectList from '../../reusable/select-list.vue';
	import {urlListaItems} from '../config';

	export default {
		beforeCompile(){
			if (this.createMode){
				this.dataModel = this.initModel();
			}
		},
		data (){
			return {
				urlItemsCatalogo: urlListaItems + '/2'
			}
		},
		components: {
			'select-list': selectList
		},
		methods: {
			initModel: function(){
				return {
					id: null,
					codigo_materia: null,
					nombre_materia: null,
					semestre: null,
					horas: null,
					estado: null,
					tipo_materia: null,
					tipo_asignacion: null
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
						codigo_materia: null,
						nombre_materia: null,
						semestre: null,
						horas: null,
						estado: null,
						tipo_materia: null,
						tipo_asignacion: null
					}
				}
			}
		}
	}
	
</script>
