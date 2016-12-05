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

	import myMixins from './mixins';

	import {urlDocentes} from '../config';

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
				url: urlDocentes,
				toolbar: {
					iconClass: 'fa fa-plus',
					iconClassOptions: 'fa fa-cogs',
					label: 'Agregar',
					labelOptions: 'Campos visibles',
					nameEmit: 'docente-create-event',
					btnClass: 'btn btn-primary btn-flat'
				},
				datos: [],
				columnas: [
					{
						title: 'Nombres',
						field: 'nombres',
						hidden: false,
						sortable: true
					},
					{
						title: 'Apellidos',
						field: 'apellidos',
						hidden: false,
						sortable: true
					},
					{
						title: 'Identificación',
						field: 'identificacion',
						hidden: false,
						sortable: true					
					},
					{
						title: 'Correo',
						field: 'email',
						hidden: false,
						sortable: true
					},
					{
						title: 'Tipo Contrato',
						field: 'tipo_contrato',
						hidden: false,
						sortable: true
					},
					{
						title: 'Celular',
						field: 'celular',
						hidden: false,
						sortable: true
					},
					{
						title: 'Acciones',
						titleClass: 'text-center',
						hidden: false,
						fieldClass: 'text-center',
						itemActions: [
							{
								nameEmit: 'docente-update-event',
								btnClass: 'btn btn-default btn-xs',
								iconClass: 'fa fa-edit',
								label: 'Editar',
							},
							{
								nameEmit: 'docente-view-event',
								btnClass: 'btn btn-default btn-xs',
								iconClass: 'fa fa-eye',
								label: 'Visualizar',
							},
							{
								nameEmit: 'docente-delete-event',
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
			'docente-create-event' : function(model){
				this.$router.go('/docentes/create');
			},
			'docente-update-event' : function(model){
				this.$router.go('/docentes/edit/' + model.id);
			},
			'docente-view-event' : function(model){
				this.$router.go('/docentes/view/' + model.id);
			},
			'docente-delete-event' : function(model){
				this.destroy(model);
			},
		},

		
	}

</script>
