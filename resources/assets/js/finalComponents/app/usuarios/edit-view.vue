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
	import {urlUsuarios} from '../config';

	import myMixins from './mixins';

	export default {
		mixins: [myMixins],
		ready(){
			this.read();
		},
		data(){
			return {
				createMode: false,
				newModel: {},
				loading: true,
				url: urlUsuarios
			}
		},
		components: {
			'form-inputs': inputs
		},

	}


</script>