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
	import {urlCatalogos} from '../config';
	import fnc from '../../../util/reusable_functions';

	export default {
		name: 'content-catalogo-item',
		components:{
			'content-header' : ContentHeader
		},
		route: {
			data: function(transition){
				this.url = urlCatalogos + '/' + this.$route.params.catalogo_id;
				this.loadCatalogo();
				transition.next();
			}
		},
		data: function(){
			return {
				path: ['Sistema', 'Catálogo', 'Items'],
				loading: true,
				titulo: 'Catálogo Items',
				url: ''
			}
		},
		methods: {
			loadCatalogo: function(){
				this.$http.get(this.url).then(function(resp){
					this.titulo = 'Catálogo - ' + resp.data.data.nombre;
					this.path = ['Sistema', 'Catálogos', resp.data.data.nombre];
				}, fnc.tryError);
			}
		}

	}
	
</script>