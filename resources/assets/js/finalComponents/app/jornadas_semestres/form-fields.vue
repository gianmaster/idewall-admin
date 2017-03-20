<template>
	<div class="col-sm-6 col-xs-12">
		<label>Jornada</label>
		<select-list class-name="form-control col-xs-6" :select-value.sync="dataModel.catalogo_jornada" value-key="codigo" label-key="descripcion" :url="urlJornadas"  :is-required="true"></select-list>
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Semestre</label>
		<select-list class-name="form-control col-xs-6" :select-value.sync="dataModel.catalogo_semestre" value-key="codigo" label-key="descripcion" :url="urlSemestre" :is-required="true"></select-list>
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Aula</label>
		<select-list class-name="form-control col-xs-6" :select-value.sync="dataModel.catalogo_aula" value-key="codigo" label-key="descripcion" :url="urlAula" :is-required="true"></select-list>
	</div>

	<div class="col-sm-6 col-xs-12">
		<label>Paralelo</label>
		<select-list class-name="form-control col-xs-6" :select-value.sync="dataModel.catalogo_paralelo" value-key="codigo" label-key="descripcion" :url="urlParalelo" :is-required="true"></select-list>
	</div>

	<div class="col-xs-12">
		<div class="content">
			<button v-if="createMode" class="btn btn-success btn-flat" type="submit"><i class="fa fa-save"></i> GUARDAR</button>
			<button v-else class="btn btn-warning btn-flat" type="submit"><i class="fa fa-save"></i> GUARDAR CAMBIOS</button>
			<a v-link="{path: '/jornadasemestres'}" class="btn btn-default btn-flat"><i class="fa fa-reply"></i> VOLVER</a>
		</div>

	</div>
</template>

<script>

	import selectList from '../../reusable/select-list.vue';
	import {urlListaItems, urlParalelosCiclo} from '../config';

	export default {
		name: 'formulario-jornada-semestre',
		beforeCompile(){
			if (this.createMode){
				this.dataModel = this.initModel();
			}
		},
		data (){
			return {
				urlJornadas: `${urlListaItems}/5`,
				urlSemestre: `${urlListaItems}/2`,
				urlAula: `${urlListaItems}/4`,
				urlParalelo: urlParalelosCiclo
			}
		},
		components: {
			'select-list': selectList
		},
		methods: {
			initModel: function(){
				return {
					catalogo_semestre: null,
					catalogo_aula: null,
					catalogo_jornada: null,
					catalogo_paralelo: null,
					id: null
				}
			}
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
						catalogo_semestre: null,
						catalogo_aula: null,
						catalogo_jornada: null,
						catalogo_paralelo: null,
						id: null
					}
				}
			}
		}
	}

</script>


