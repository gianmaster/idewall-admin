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
					:url="url"
					:data.sync="datos"
					:columns="columnas"
					filter-key-word="search">
			</cool-table>
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

	function formateaHora(hora){
		const time = hora.split('.');
		if(time[1] == 50){
			return `${time[0]}:30H`;
		}else{
			return `${time[0]}:00H`;
		}
	}

	export default {
		name: 'reporte-distributivos-docente-content',
		mixins: [myMixins],
		route: {
			data: function(transition){
				this.load();
				transition.next();
			}
		},
		data(){
			return {
				urlCiclos: 'api/ciclos',
				ciclo: {},
				listaCiclos: [],
				url: 'api/ciclohorariodocente/1/ciclo',
				toolbar: null,
				currentModel: {},
				materiasSeleccionadas: [],
				datos: [],
				columnas: [
				{
					title: 'Período',
					field: 'anio',
					hidden: false,
					titleClass: 'text-center',
					fieldClass: 'text-center',
					sortable: true,
					template: '${col.anio} - ${col.anio+1} (${col.ciclo})'
				},
				{
					title: 'Docente',
					field: 'nombres',
					hidden: false,
					sortable: true,
					template: '${col.abreviatura}. ${col.nombres} ${col.apellidos}'
				},
				{
					title: 'Identificación',
					field: 'identificacion',
					titleClass: 'text-center',
					fieldClass: 'text-center',
					hidden: false,
					sortable: true
				},
				{
					title: 'Horas Clases',
					field: 'horas_academicas_asignadas',
					titleClass: 'text-center',
					fieldClass: 'text-center',
					hidden: false,
					sortable: false,
					template: '<span class="text-green"><i class="fa fa-clock-o"></i> ${col.horas_academicas_asignadas.replace(".",":").replace("5","3")}H</span>'
				},
				{
					title: 'Horas Complementarias',
					field: 'horas_complementarias',
					titleClass: 'text-center',
					fieldClass: 'text-center',
					hidden: false,
					sortable: false,
					template: '<span class="text-green"><i class="fa fa-clock-o"></i> ${col.horas_complementarias.replace(".",":").replace("5","3")}H</span>'
				},
				{
					title: 'Total Horas',
					field: 'total',
					titleClass: 'text-center',
					fieldClass: 'text-center',
					hidden: false,
					sortable: false,
					template: '<span class="text-green"><i class="fa fa-clock-o"></i> ${col.total.replace(".",":").replace("5","3")}H</span>'
				},
				{
					title: 'Opciones',
					titleClass: 'text-center',
					hidden: false,
					fieldClass: 'text-center',
					style: 'width:10%;',
					itemActions: [
						{
							nameEmit: 'download-horario-distributivo-event',
							btnClass: 'btn btn-primary btn-xs',
							iconClass: 'fa fa-file-pdf-o',
							label: 'Descargar',
							text: 'Descargar'
						}
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
			'download-horario-distributivo-event': function(model){
				console.log('Se descarga el archivo distributivo');
				window.open('reportes/cursos/' + model.id +'/distributivo', '_blank');
			}
		}
	}

</script>

