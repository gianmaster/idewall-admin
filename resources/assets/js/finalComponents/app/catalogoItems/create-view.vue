<template>
	<div class="row">
		<form action="" @submit.prevent="create">
			
			<form-inputs :create-mode="createMode" :data-model.sync="newModel"></form-inputs>

		</form>
	</div>
</template>

<script>
	
	import inputs from './form-fields.vue';

	import myMixins from './mixins';

	export default {
		mixins: [myMixins],
		route: {
			data: function(transition){
				this.generateUrl();
				transition.next();
			}
		},
		data(){
			return {
				createMode: true,
				newModel: {},
				url: 'api/catalogos' //no hace nada por que se autogenera para este caso
			}
		},
		components: {
			'form-inputs': inputs
		},

	}
</script>
