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

		<app-modal title="Creación Distributivos" :show.sync="showModal" @ok="toggleModal" @cancel="toggleModal" emit-when-ok="dispatch-ok-modal" :large="true">

			<div class="row">
				<form action="" @submit.prevent="update">

					<form-fields :data-model.sync="currentModel" :create-mode="false"></form-fields>

				</form>
			</div>

		</app-modal>
	</div>

</template>


<style>

	.__materia{
		color: #656464;
	}

</style>

<script>

	import Loading from '../../reusable/loading.vue';

	import Modal from '../../reusable/modal.vue';
	
	import coolTable from '../../reusable/cool-table.vue';

	import myMixins from './mixins';

	import formFields from './form-fields.vue';

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
				url: 'api/tiposdistributivo',
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
						title: 'ID',
						field: 'id',
						hidden: false,
						sortable: true
					},
					{
						title: 'Tipo Distributivo',
						field: 'nombre',
						hidden: false,
						sortable: true
					},
					{
						title: 'Orden',
						field: 'orden',
						hidden: false,
						sortable: true
					},
					{
						title: 'Activo',
						field: 'activo',
						hidden: false,
						sortable: true,
						template: '${col.activo == 1 ? "<input type=checkbox checked disabled/>" : "<input type=checkbox disabled/>"}'
					},
					{
						title: 'Acciones',
						titleClass: 'text-center',
						hidden: false,
						fieldClass: 'text-center',
						itemActions: [
							{
								nameEmit: 'distributivo-view-event',
								btnClass: 'btn bg-gray btn-xs',
								iconClass: 'fa fa-list-ol',
								label: 'Visualizar Items'
							},
							{
								nameEmit: 'distributivo-update-event',
								btnClass: 'btn btn-default btn-xs',
								iconClass: 'fa fa-edit',
								label: 'Editar'
							},
							{
								nameEmit: 'distributivo-delete-event',
								btnClass: 'btn btn-danger btn-xs',
								iconClass: 'fa fa-trash',
								label: 'Eliminar'
							}
						]
					}
				],
				loading: false,
				loading_button: false,
				currentModel: {},
				showModal: false,
			}
		},
		components: {
			'cool-table' : coolTable,
			'app-loading' : Loading,
			'app-modal' : Modal,
			'formFields' : formFields
		},
		events: {
			'distributivo-view-event' : function(model){
				this.$router.go('/malla_academica/create');
			},
			'distributivo-update-event' : function(model){
				this.toggleDataModel(model);
				this.toggleModal();
			},
			'distributivo-delete-event' : function(model){
				this.destroy(model);
			},
			'distributivo-silabos-event': function(model){
				this.toggleDataModel(model);
				this.toggleModal();
			},
			'dispatch-ok-modal' : function(){
				alert('Ok pero no hace nada');
			}
		},

		
	}

</script>

