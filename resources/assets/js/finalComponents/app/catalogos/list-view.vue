<template>
	
	<div v-if="loading">
		<app-loading></app-loading>
	</div>

	<div v-else>
		<cool-table url="api/menu" :data.sync="datos" :columns="columnas"></cool-table>
	</div>

</template>


<script>

	import Loading from '../../reusable/loading.vue';
	
	import coolTable from '../../reusable/cool-table.vue';

	export default {
		data(){
			return {
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
							nameEmit: 'view-event',
							btnClass: 'btn btn-default btn-xs',
							iconClass: 'fa fa-eye',
							label: 'Visualizar',
						},
						{
							nameEmit: 'view-event',
							btnClass: 'btn btn-default btn-xs',
							iconClass: 'fa fa-edit',
							label: 'Editar',
						},
						{
							nameEmit: 'view-event',
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
		}
	}

</script>
