<template>
	
	<div v-if="loading">
		<app-loading></app-loading>
	</div>

	<div v-else>
		<div class="col-xs-12 show-div">
			<a v-link="{path: '/jornadasemestres/create'}" class="btn btn-primary btn-flat btn-spacing"> <i class="fa fa-plus-o"></i> AGREGAR JORNADA</a>
		</div>
		<cool-table 
		:option-toolbar="toolbar"
		:url="url" 
		:data.sync="datos" 
		:columns="columnas" 
		filter-key-word="search">
	</cool-table>

	<!-- Modal logic -->


</div>

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

	import Loading from '../../reusable/loading.vue';

	import coolTable from '../../reusable/cool-table.vue';

	import myMixins from './mixins';

	export default {
		mixins: [myMixins],
		route: {
			data: function(transition){
				this.load();
				transition.next();
			}
		},
		data(){
			return {
				showModal: false,
				url: 'api/jornadasemestre',
				toolbar: null,
				currentModel: {},
				materiasSeleccionadas: [],
				datos: [],
				columnas: [
				{
					title: 'Ciclo',
					field: 'ciclo',
					hidden: false,
					sortable: true,
					template: '${col.descripcion_ciclo.anio} - ${col.descripcion_ciclo.anio+1} (${col.descripcion_ciclo.ciclo})'
				},
				{
					title: 'Jornada',
					field: 'jornada',
					hidden: false,
					sortable: false,
					template: '<span class="text-${col.catalogo_jornada=="MAT"?"aqua":col.catalogo_jornada=="VES"?"yellow":"light-blue"}">${col.jornada.descripcion} </span>'

				},
				{
					title: 'Semestre',
					field: 'semestre',
					hidden: false,
					sortable: false,
					template: '${col.semestre.descripcion}'
				},
				{
					title: 'Curso / Aula / Paralelo',
					field: 'aula',
					hidden: false,
					sortable: false,
					template: '${col.aula.codigo} - ${col.aula.descripcion}'
				},
				{
					title: 'Opciones',
					titleClass: 'text-center',
					hidden: false,
					fieldClass: 'text-center',
					itemActions: [
							/*
						{
							nameEmit: 'jornadasemestre-update-event',
							btnClass: 'btn btn-primary btn-xs',
							iconClass: 'fa fa-pencil',
							label: 'Modificar'
						},
						*/
						{
							nameEmit: 'jornadasemestre-delete-event',
							btnClass: 'btn btn-danger btn-xs',
							iconClass: 'fa fa-close',
							label: 'Eliminar'
						}
					]
				}
				],
				loading: false
			}
		},
		components: {
			'cool-table' : coolTable,
			'app-loading' : Loading
		},
		events: {
			'jornadasemestre-update-event' : function(model){
				this.$router.go('/jornadasemestres/edit/' + model.id);
			},
			'jornadasemestre-delete-event' : function(model){
				this.destroy(model);
			}
		}
	}

</script>
