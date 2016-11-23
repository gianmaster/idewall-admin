<template>
	
	<div class="content">
		<div class="row">
			<view-data-table title="Malla Academica" :url="url"></view-data-table>
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
				url: url
			}
		},
		components: {
			viewDataTable
		}
	}

</script>
