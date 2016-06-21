<template>
	
	<content-header title-page="Bienvenido" :page-description="mode | capitalize"></content-header>
	<section class="content">
		<toggle-panel>
			<div slot="title">Mensaje del Sistema</div>
			<div slot="body">
				<p>{{msg}}</p>
				<blockquote>{{text}}</blockquote>
			</div>
		</toggle-panel>
	</section>

</template>


<script>
	
	import ContentHeader from '../layouts/partials/HeaderContent.vue';
	import TogglePanel from '../reusables/TogglePanel.vue';

	module.exports = {
		components: {
			togglePanel: TogglePanel,
			contentHeader: ContentHeader
		},

		data(){
			return{
				msg: "Bienvenido al dashboard",
				text: 'Esta es una prueba de la funcionalidad y ventajas que nos puede ofrecer VUE',
				mode: ''
			}
		}
	}

</script>