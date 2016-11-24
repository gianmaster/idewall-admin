<template>
	
	<div class="content">
		<div class="row">
			<view-data-table
					title="Malla Academica"
					:url="url"
					:columns="columnsConf"
			></view-data-table>
		</div>
	</div>

</template>


<script>

	import viewDataTable from '../reusable/viewDataTable.vue';
	import {endpoint} from './config';
	const url = `${endpoint}/malla_academica/all`;

	export default {
		data(){
			return {
				url: url,
				columnsConf: [
					{
						name: 'id',
						type: 'string',
						title: 'ID',
						hidden: false,
						template: '',
						width: '',
						searchable: true
					},
					{
						name: 'codigo_materia',
						type: 'string',
						title: 'Cod. Materia',
						hidden: false,
						template: '',
						width: '',
						searchable: true
					},
					{
						name: 'nombre_materia',
						type: 'string',
						title: 'Nombre Materia'
					},
					{
						name: 'semestre',
						type: 'string',
						title: 'Semestre',
						hidden: false,
						template: '',
						width: '',
						searchable: true
					},
					{
						name: 'horas',
						type: 'string',
						title: 'Horas',
						hidden: false,
						template: '',
						width: '',
						searchable: true
					},
					{
						name: 'estado',
						type: 'string',
						title: 'Estado',
						hidden: false,
						template: '',
						width: '',
						searchable: true
					},
					{
						name: 'docentes',
						type: 'string',
						title: 'Docentes',
						hidden: false,
						template: '',
						width: '',
						searchable: true
					}
				]
			}
		},
		components: {
			viewDataTable
		}
	}

</script>
