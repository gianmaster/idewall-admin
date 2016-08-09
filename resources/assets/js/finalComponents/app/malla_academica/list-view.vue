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

		<app-modal title="Actualización de Sílabos" :show.sync="showModal" @ok="toggleModal" @cancel="toggleModal" emit-when-ok="event-end-edit-silabos" :large="true">
			
		<div class="row">
			<form id="frm-silabos" @submit.prevent="uploadFiles">
				<div class="col-xs-12 col-sm-7">
					<div class="form-group">
						<label for="documentos">Seleccione los Sílabos para: <span class="__materia">{{currentModel.nombre_materia}} - {{currentModel.semestre}}</span> </label>
						<input type="file" id="documentos" name="documentos[]" accept="application/pdf" class="form-control" multiple required>				
					</div>
				</div>
				<div class="col-xs-12 col-sm-5 text-center">
					<p class="text-light-blue"><i class="fa fa-info-circle"></i> Solo se admiten archivos PDF</p>
					<p class="text-red"><i class="fa fa-warning"></i> <strong>Nota:</strong> Sí ya existe algún archivo subido, éste o estos serán elmininados para subir los nuevos!</p>
					<button type="submit" class="btn btn-primary btn-flat"><i class="fa fa-upload"></i> SUBIR ARCHIVOS</button>
				</div>
			</form>
				
			<div class="col-xs-12" v-if="currentModel.silabos.lenght<=0">
				<hr>
				<div class="text-center">
					<p>No hay archivos subidos</p>
				</div>
			</div>

			<div class="col-xs-12" v-else>
				<div class="col-xs-12" v-for="item in currentModel.silabos">
					<iframe :src="item.ruta" frameborder="0" height="300px" width="100%"></iframe>	
				</div>
			</div>
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
						sortable: true,
						template: '<span>${col.descripcion_semestre.descripcion}</span>'
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
								nameEmit: 'malla-silabos-event',
								btnClass: 'btn bg-gray btn-xs',
								iconClass: 'fa fa-file-pdf-o',
								label: 'Sílabos',
							},
							{
								nameEmit: 'malla-update-event',
								btnClass: 'btn btn-default btn-xs',
								iconClass: 'fa fa-edit',
								label: 'Editar',
							},
							{
								nameEmit: 'malla-delete-event',
								btnClass: 'btn btn-danger btn-xs',
								iconClass: 'fa fa-trash',
								label: 'Eliminar',
							}
						]
					}
				],
				loading: false,
				currentModel: {silabos:[]},
				showModal: false,
			}
		},
		components: {
			'cool-table' : coolTable,
			'app-loading' : Loading,
			'app-modal' : Modal
		},
		events: {
			'malla-create-event' : function(model){
				this.$router.go('/malla_academica/create');
			},
			'malla-update-event' : function(model){
				this.$router.go('/malla_academica/edit/' + model.id);
			},
			'malla-delete-event' : function(model){
				this.destroy(model);
			},
			'malla-silabos-event': function(model){
				this.toggleDataModel(model);
				this.toggleModal();
			}
		},

		
	}

</script>
