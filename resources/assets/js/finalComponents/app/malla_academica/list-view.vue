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
				url: 'api/malla_academica',
				toolbar: {
					iconClass: 'fa fa-plus',
					iconClassOptions: 'fa fa-cogs',
					label: 'Agregar',
					labelOptions: 'Campos visibles',
					nameEmit: 'malla-create-event',
					btnClass: 'btn btn-primary btn-flat'
				},
				datos: [],
				columnas: [
					{
						title: 'Código',
						field: 'codigo_materia',
						hidden: false,
						sortable: true
					},
					{
						title: 'Nombre Materia',
						field: 'nombre_materia',
						hidden: false,
						sortable: true
					},
					{
						title: 'Semestre',
						field: 'semestre',
						hidden: false,
						sortable: true
					},
					{
						title: 'Horas',
						field: 'horas',
						hidden: false,
						sortable: true
					},
					{
						title: 'Estado',
						field: 'estado',
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
								nameEmit: 'catalogo-item-update-event',
								btnClass: 'btn btn-default btn-xs',
								iconClass: 'fa fa-edit',
								label: 'Editar',
							},
							{
								nameEmit: 'catalogo-item-delete-event',
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
			'malla-create-event' : function(model){
				this.$router.go('/malla_academica/'+ this.$route.params.catalogo_id +'/create');
			},
			'malla-update-event' : function(model){
				this.$router.go('/malla_academica/' + model.catalogo + '/edit/' + model.id);
			},
			'malla-delete-event' : function(model){
				this.destroy(model);
			},
		},

		
	}

</script>
