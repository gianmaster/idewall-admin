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
				url: 'api/docentes',
				toolbar: null,
				datos: [],
				columnas: [
					{
						title: 'Docente',
						field: 'nombres',
						hidden: false,
						sortable: true,
						template: '${col.abreviatura}. ${col.nombres} ${col.apellidos}'
					},
					{
						title: 'Materias',
						field: 'materias',
						hidden: false,
						sortable: false,
						template: '${col.materias.map(function(ele){return ele.materia_detail.nombre_materia;}).join(", ")}'					
					},
					{
						title: 'Acciones',
						titleClass: 'text-center',
						hidden: false,
						fieldClass: 'text-center',
						itemActions: [
							{
								nameEmit: 'materias-docente-update-event',
								btnClass: 'btn btn-warning btn-xs',
								iconClass: 'fa fa-edit',
								label: 'Editar',
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
