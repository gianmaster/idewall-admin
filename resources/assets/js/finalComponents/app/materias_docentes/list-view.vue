<template>
	
	<div v-if="loading">
		<app-loading></app-loading>
	</div>

	<div v-else>

		<div style="margin-bottom: .4em;">
			<button type="button" @click.prevent="addDocenteCicloActivo" class="btn btn-primary btn-flat"> <i class="fa fa-plus"></i> Agregar Docente</button>
			<button type="button" @click.prevent="sendAllSilabos" class="btn btn-success btn-flat"> Enviar todos los sílabos <i class="fa fa-envelope-o"></i></button>
		</div>

		<cool-table 
		:option-toolbar="toolbar"
		:url="url" 
		:data.sync="datos" 
		:columns="columnas" 
		filter-key-word="search">
	</cool-table>

	<!-- Modal logic -->

	<app-modal title="Asignación de Materias" :show.sync="showModal" @ok="toggleModal" @cancel="toggleModal" emit-when-ok="event-end-edit">
		<div class="row">
			<form action="" @submit.prevent="update">

				<formulario :data-model.sync="currentModel" :selected.sync="materiasSeleccionadas"></formulario>

			</form>
		</div>
	</app-modal>

	<app-modal title="Enviar Sílabos" :show.sync="showModalSilabos" @ok="showModalSilabos=!showModalSilabos" @cancel="showModalSilabos=!showModalSilabos" emit-when-ok="event-end-envia-silabos" emit-when-close="event-close-silabos">
		<div class="row">

			<form-silabos :to-send.sync="materiasToSend" :data-model.sync="dataDocenteSilabo" :lista-opciones.sync="materiasSeleccionadas"></form-silabos>

		</div>
	</app-modal>


	<app-modal title="Agregar Docente al Ciclo" :show.sync="showModalDocente" @ok="showModalDocente=!showModalDocente" @cancel="showModalDocente=!showModalDocente" emit-when-ok="event-end-add-docente" emit-when-close="event-close-add-docente">
		<div class="row">

			<form-docente :docente-seleccionado.sync="docenteSeleccionadoAgregar"></form-docente>

		</div>
	</app-modal>


</div>

</template>

<script type="text/babel">

	import Loading from '../../reusable/loading.vue';

	import Modal from '../../reusable/modal.vue';

	import coolTable from '../../reusable/cool-table.vue';

	import formulario from './form-fields.vue';

	import formularioSilabos from './form-envia-silabo-docente.vue';

	import FormularioAgregarDocente from './agregar-docente.vue';

	import myMixins from './mixins';

	const tagL = "<span class='color-palette label bg-primary'>";
	const tagR = "</span>";

	export default {
		name: 'listar-ciclo-materias-docentes',
		mixins: [myMixins],
		route: {
			data: function(transition){
				this.load();
				transition.next();
			}
		},
		data(){
			return {
				ciclo: null,
				showModal: false,
				showModalSilabos: false,
				showModalDocente: false,
                materiasToSend: [],
				docenteSeleccionadoAgregar: '',
				dataDocenteSilabo: {},
				url: 'api/ciclo/param/docentes',
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
					template: '${col.ciclo_detail.anio} - ${col.ciclo_detail.anio+1} (${col.ciclo_detail.ciclo})'
				},
				{
					title: 'Docente',
					field: 'nombres',
					hidden: false,
					sortable: true,
					template: '${col.docente_detail.abreviatura}. ${col.docente_detail.nombres} ${col.docente_detail.apellidos}'
				},
				{
					title: 'Materias',
					field: 'materias',
					hidden: false,
					sortable: false,
					template: '${col.materias_docente_ciclo.map(function(ele){return "'+tagL+'"+ele.materia_detail.nombre_materia+"'+tagR+'";}).join(" ")}'
				},//color-palette label bg-navy
				{
					title: 'Gestionar Materias',
					titleClass: 'text-center',
					hidden: false,
					fieldClass: 'text-center',
					itemActions: [
						{
							nameEmit: 'materias-docente-update-event',
							btnClass: 'btn btn-success btn-xs',
							iconClass: 'fa fa-pencil',
							label: 'Modificar'
						},
						{
							nameEmit: 'materias-docente-envia-silabos-update-event',
							btnClass: 'btn btn-info btn-xs',
							iconClass: 'fa fa-send-o',
							label: 'Enviar Silabos'
						}
					]
				}
				],
				loading: false
			}
		},
		components: {
			'cool-table' : coolTable,
			'app-loading' : Loading,
			'app-modal' : Modal,
			'formulario':formulario,
			'form-silabos': formularioSilabos,
			'form-docente': FormularioAgregarDocente
		},
		events: {
			'materias-docente-update-event' : function(model){
				this.toggleDataModel(model.docente_detail, model.materias_docente_ciclo);
				this.toggleModal();
			},
			'materias-docente-envia-silabos-update-event': function(model){
				//this.docenteSendSilabo = model;
				this.showModalSilabos = true;
				this.dataDocenteSilabo = model.docente_detail;
				this.toggleMaterias(model.materias_docente_ciclo);
			},
			//when modal emit ok
			'event-end-edit': function(){
				this.update();
			},
			'event-end-envia-silabos': function(){
                const {materiasToSend, dataDocenteSilabo} = this;
				this.sendSilabos(dataDocenteSilabo, materiasToSend);
				this.materiasToSend = [];//se agrego para limpiar las materias al cerra el modal
			},
			'event-close-silabos': function(){
				this.materiasToSend = [];
			},
			'event-end-add-docente': function() {
				if (this.docenteSeleccionadoAgregar != "") {
					this.addDocenteCiclo(this.ciclo,this.docenteSeleccionadoAgregar);
                }
			}
		}
	}

</script>

