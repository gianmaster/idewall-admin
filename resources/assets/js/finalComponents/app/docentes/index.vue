<template>
	<!-- Main content -->
		
		<content-header :title.sync="titulo" :list-path="path"></content-header>

		<section class="content">
			<!--<router-view class="animated" transition="fade" transition-mode="out-in" keep-alive></router-view>-->
			<router-view></router-view>

		</section>
</template>

<script>
	import ContentHeader from '../../new-layout/content-header.vue';

	import fnc from '../../../util/reusable_functions';

	export default {
		name: 'content-docentes',
		components:{
			'content-header' : ContentHeader
		},
		route: {
			data: function(transition){
				transition.next();
			}
		},
		data: function(){
			return {
				path: ['Administración', 'Docentes'],
				loading: true,
				titulo: 'Administración de Docentes',
				url: ''
			}
		}

	}
	
</script>