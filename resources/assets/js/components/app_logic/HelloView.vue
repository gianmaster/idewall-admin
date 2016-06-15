<template>
	
	<toggle-panel>
		<div slot="title">Mensaje del Sistema</div>
		<div slot="body">
			<p>{{msg}}</p>
			<blockquote>{{text}}</blockquote>
		</div>
	</toggle-panel>

</template>


<script>
	
	import TogglePanel from '../reusables/TogglePanel.vue';

	module.exports = {
		components: {
			togglePanel: TogglePanel
		},

		data(){
			return{
				msg: "Bienvenido al dashboard",
				text: 'lorem inkjas dflaksdjflakshdfahsd fñalskdjfalskjdf laskdjfpqiwencv apsdvlnadpofwejf añd'
			}
		}
	}

</script>