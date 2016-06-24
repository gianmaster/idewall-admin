<template>
	
	<div v-if="loading">
		<app-loading></app-loading>
	</div>

	<div v-else>
		<cool-table :data="datos"></cool-table>
	</div>

</template>


<script>

	import Loading from '../reusable/loading.vue';
	
	import coolTable from '../reusable/cool-table.vue';

	export default {
		data(){
			return {
				datos: [],
				loading: false,
			}
		},
		components: {
			'cool-table' : coolTable,
			'app-loading' : Loading,
		}
	}

</script>
