<template>
	
	<div v-if="loading">
		<app-loading></app-loading>
	</div>

	<div v-else>
		<cool-table 
		:option-toolbar="toolbar"
		:url="url" 
		:data.sync="datos" 
		:columns="columnas" 
		filter-key-word="search">
	</cool-table>
</div>

</template>


<script>

	import Loading from '../../reusable/loading.vue';
	
	import coolTable from '../../reusable/cool-table.vue';

	import fnc from '../../../util/reusable_functions';

	import myMixins from './mixins';

	export default {
		route: {
			data: function(transition){
				this.load();
				transition.next();
			}
		},
		mixins: [myMixins],
		data(){
			return {
				url: 'api/catalogos',
				toolbar: {
					iconClass: 'fa fa-plus',
					iconClassOptions: 'fa fa-cogs',
					label: 'Agregar',
					labelOptions: 'Campos visibles',
					nameEmit: 'catalogo-create-event',
					btnClass: 'btn btn-primary btn-flat'
				},
				datos: [],
				columnas: [
				{
					title: 'Cod.',
					field: 'id',
					hidden: false
				},
				{
					title: 'Nombre',
					field: 'nombre',
					hidden: false
				},
				{
					title: 'Descripción',
					field: 'descripcion',
					hidden: false
				},
				{
					title: 'Acciones',
					titleClass: 'text-center',
					hidden: false,
					fieldClass: 'text-center',
					itemActions: [
					{
						nameEmit: 'catalogo-read-event',
						btnClass: 'btn btn-default btn-xs',
						iconClass: 'fa fa-eye',
						label: 'Visualizar',
					},
					{
						nameEmit: 'catalogo-update-event',
						btnClass: 'btn btn-default btn-xs',
						iconClass: 'fa fa-edit',
						label: 'Editar',
					},
					{
						nameEmit: 'catalogo-delete-event',
						btnClass: 'btn btn-danger btn-xs',
						iconClass: 'fa fa-trash',
						label: 'Eliminar',
					}
					]
				}
				],
				loading: false,
			}
		},
		components: {
			'cool-table' : coolTable,
			'app-loading' : Loading,
		},
		events: {
			'catalogo-create-event' : function(model){
				this.$router.go('/catalogos/create');
			},
			'catalogo-read-event' : function(model){
				this.$router.go('/catalogos/view/' + model.id);
			},
			'catalogo-update-event' : function(model){
				this.$router.go('/catalogos/edit/' + model.id);
			},
			'catalogo-delete-event' : function(model){
				this.destroy(model);
			},
		}
		
	}

</script>
