<template>
<loading-app v-if="loading===true"></loading-app>
	<div class="row" v-else>
		<form action="" @submit.prevent="update">
			
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
				transition.next();
			}
		},
		ready(){
			this.read();
		},
		data(){
			return {
				createMode: false,
				newModel: {},
				loading: true,
				url: 'api/malla_academica'
			}
		},
		components: {
			'form-inputs': inputs
		},

	}


</script>