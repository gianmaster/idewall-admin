<template>
	<!-- Main content -->
		
		<content-header title="Menú" :list-path="path"></content-header>

		<section class="content">
			<!--<router-view class="animated" transition="fade" transition-mode="out-in" keep-alive></router-view>-->
			<router-view></router-view>

		</section>
</template>

<script>

	import ContentHeader from '../../new-layout/content-header.vue';
	//import Loading from '../../reusable/loading.vue';

	export default {
		name: 'content-materias',
		components:{
			'content-header' : ContentHeader
		},
		data: function(){
			return {
				path: ['Sistema', 'Menú'],
				loading: true,
			}
		},

	}
	
</script>