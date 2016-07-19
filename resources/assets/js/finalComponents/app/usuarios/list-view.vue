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

<style>
	.profile-ima{
		float: left;
		width: 25px;
		height: 25px;
		border-radius: 50%;
		margin-right: 10px;
		margin-top: -2px;
		border: 1px solid #222d32;
	}

</style>

<script>

	import Loading from '../../reusable/loading.vue';
	
	import coolTable from '../../reusable/cool-table.vue';

	import fnc from '../../../util/reusable_functions';

	import myMixins from './mixins';

	export default {
		mixins: [myMixins],
		data(){
			return {
				url: 'api/users',
				toolbar: {
					iconClass: 'fa fa-plus',
					iconClassOptions: 'fa fa-cogs',
					label: 'Agregar',
					labelOptions: 'Campos visibles',
					nameEmit: 'usuario-create-event',
					btnClass: 'btn btn-primary btn-flat'
				},
				datos: [],
				columnas: [
				{
					title: 'Avatar',
					field: 'avatar',
					hidden: false,
					template: '<img class="profile-ima" src="${col.avatar}" alt="${col.name}" />'
				},
				{
					title: 'Cod.',
					field: 'id',
					hidden: false,
					sortable: true
				},
				{
					title: 'Nombre Completo',
					field: 'name',
					hidden: false,
					sortable: true
				},
				{
					title: 'Correo electrónico',
					field: 'email',
					hidden: false,
					sortable: true
				},
				{
					title: 'Rol',
					field: 'rol',
					hidden: false,
					sortable: true,
					template: '<span>${col.descripcion_rol.nombre}</span>'
				},
				{
					title: 'Acciones',
					titleClass: 'text-center',
					hidden: false,
					fieldClass: 'text-center',
					itemActions: [
					{
						nameEmit: 'usuario-read-event',
						btnClass: 'btn btn-default btn-xs',
						iconClass: 'fa fa-eye',
						label: 'Visualizar',
					},
					{
						nameEmit: 'usuario-update-event',
						btnClass: 'btn btn-default btn-xs',
						iconClass: 'fa fa-edit',
						label: 'Editar',
					},
					{
						nameEmit: 'usuario-delete-event',
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
			'usuario-create-event' : function(model){
				this.$router.go('/usuarios/create');
			},
			'usuario-read-event' : function(model){
				this.$router.go('/usuarios/view/' + model.id);
			},
			'usuario-update-event' : function(model){
				this.$router.go('/usuarios/edit/' + model.id);
			},
			'usuario-delete-event' : function(model){
				this.destroy(model);
			},
		}
		
	}

</script>
