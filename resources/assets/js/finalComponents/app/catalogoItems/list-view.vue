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

	import {urlCatalogoItem} from '../config';

	export default {
		mixins: [myMixins],
		route: {
			data: function (transition) {
				this.generateUrl();
				this.load();
				transition.next();
			}
		},
		data(){
			return {
				url: urlCatalogoItem,
				toolbar: {
					iconClass: 'fa fa-plus',
					iconClassOptions: 'fa fa-cogs',
					label: 'Agregar',
					labelOptions: 'Campos visibles',
					nameEmit: 'catalogo-item-create-event',
					btnClass: 'btn btn-primary btn-flat'
				},
				datos: [],
				columnas: [
					{
						title: 'Código',
						field: 'codigo',
						hidden: false
					},
					{
						title: 'Descripción',
						field: 'descripcion',
						hidden: false
					},
					{
						title: 'Parametro adicional',
						field: 'aux1',
						hidden: false
					},
					{
						title: 'Parametro adicional 2',
						field: 'aux2',
						hidden: false
					},
					{
						title: 'Orden',
						field: 'orden',
						hidden: false
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
			'cool-table': coolTable,
			'app-loading': Loading,
		},
		events: {
			'catalogo-item-create-event': function (model) {
				this.$router.go('/catalogos/' + this.$route.params.catalogo_id + '/create');
			},
			'catalogo-item-update-event': function (model) {
				this.$router.go('/catalogos/' + model.catalogo + '/edit/' + model.id);
			},
			'catalogo-item-delete-event': function (model) {
				this.destroy(model);
			}
		}

	}

</script>
