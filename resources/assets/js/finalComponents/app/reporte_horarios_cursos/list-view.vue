<template>

	<div class="row">

		<div class="col-xs-12">
			<div class="input-group input-group-sm col-xs-3 space-toolbar">
				<span class="input-group-addon" id="sizing-addon3">Período</span>
				<select name="ciclo" id="ciclo" class="form-control" v-model="ciclo" aria-describedby="sizing-addon3" @change="chageCiclo(ciclo)">
					<template v-for="item in listaCiclos">
						<option :value="item">{{item.anio}}-{{item.anio+1}} (C{{item.ciclo}})</option>
					</template>
				</select>
			</div>
		</div>

		<div v-if="loading">
			<app-loading></app-loading>
		</div>

		<div v-else class="col-xs-12">

			<cool-table 
				:option-toolbar="toolbar"
				:url.sync="url"
				:data.sync="datos"
				:columns="columnas"
				filter-key-word="search">
			</cool-table>

		<!-- Modal logic -->

		</div>
	</div>

</template>

<style scoped>
	.show-div{
		z-index: 999;
	}
	.btn-spacing{
		margin: .5em;
	}
	.space-toolbar{
		margin-bottom: 10px;
		margin-left: 5px;
	}
</style>


<script>

	import Loading from '../../reusable/loading.vue';

	import coolTable from '../../reusable/cool-table.vue';

	import myMixins from './mixins';

	export default {
		name: 'reporte-horarios-cursos',
		mixins: [myMixins],
		route: {
			data: function(transition){
				this.load();
				transition.next();
			}
		},
		data(){
			return {
				url: 'api/jornadasemestre',
				urlCiclos: 'api/ciclos',
				listaCiclos: [],
				ciclo: {},
				toolbar: null,
				currentModel: {},
				materiasSeleccionadas: [],
				datos: [],
				columnas: [
				{
					title: 'Semestre',
					field: 'semestre',
					hidden: false,
					sortable: false,
					fieldClass: 'text-center',
					titleClass: 'text-center',
					style: 'width:10%;',
					template: '${col.semestre.descripcion}'
				},
				{
					title: 'Jornada',
					field: 'jornada',
					hidden: false,
					sortable: false,
					fieldClass: 'text-center',
					titleClass: 'text-center',
					style: 'width:10%;',
					template: '<span class="color-palette label ${col.catalogo_jornada=="MAT"?"bg-primary":col.catalogo_jornada=="VES"?"bg-orange":col.catalogo_jornada=="NOC"?"bg-navy":"bg-purple"}"> <i class="fa fa-clock-o"></i> ${col.jornada.descripcion} </span>'

				},
				{
					title: 'Curso / Aula / Paralelo',
					field: 'aula',
					hidden: false,
					fieldClass: 'text-center',
					titleClass: 'text-center',
					sortable: false,
					template: '${col.aula.codigo} - ${col.aula.descripcion}'
				},
				{
					title: 'Horas Asignadas',
					field: 'horario',
					hidden: false,
					fieldClass: 'text-center',
					titleClass: 'text-center',
					style: 'width:15%;',
					sortable: false,
					template: '<span class="text-green"><i class="fa fa-clock-o"></i> ${col.horario.length > 0 ? _.sumBy(col.horario, function(o) { return parseFloat(o.num_horas); }) : 0}H</span>'
				},
				{
					title: 'Opciones',
					titleClass: 'text-center',
					hidden: false,
					fieldClass: 'text-center',
					style: 'width:10%;',
					itemActions: [
						{
							//link: 'reportes/cursos/${id}/jornadasemestre',
							nameEmit: 'download-horario-event',
							btnClass: 'btn btn-primary btn-xs',
							iconClass: 'fa fa-file-pdf-o',
							label: 'Descargar',
							text: 'Descargar'
						},
						]
					}
					],
					loading: false
				}
			},
			components: {
				'cool-table' : coolTable,
				'app-loading' : Loading
			},
			events: {
				'download-horario-event' : function(model){
					//this.$router.go('/jornadasemestres/edit/' + model.id);
					console.log('Se descarga el archivo');
					window.open('reportes/cursos/' + model.id +'/jornadasemestre', '_blank');
				}
			}
		}

	</script>
