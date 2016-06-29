<template>
	
	

	<div class="row">
		<div v-if="loading===true" style="min-height: 200px;">
			<app-loading></app-loading>
		</div>
		<div v-else class="col-xs-12">
			<ul class="list-group">
				<li class="list-group-item" v-for="item in datos">{{item.name}} | <a href="javascript:;">{{item.email}}</a></li>
			</ul>
		</div>
	</div>
	<div class="row">
		<cool-pagination :data.sync="datos" params="&per_page=5" :is-loading.sync="loading" :full-paginate="fullPaginate" :url="url"></cool-pagination>	
	</div>

</template>


<script>

	import Loading from '../reusable/loading.vue';
	
	import coolPagination from '../reusable/cool-pagination.vue';

	export default {
		data(){
			return {
				datos: [],
				loading: false,
				url: '/admin_lte/public/api/users',
				fullPaginate: true
			}
		},
		components: {
			'cool-pagination' : coolPagination,
			'app-loading' : Loading,
		}
	}

</script>
