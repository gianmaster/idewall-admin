<template>
	<div class="row">
		<form action="" @submit.prevent="create">
			
			<form-inputs :create-mode="createMode" :data-model.sync="newModel"></form-inputs>

		</form>
	</div>
</template>

<script>
	
	import fnc from '../../../util/reusable_functions';

	import inputs from './form-fields.vue';

	const URL = 'api/menu';

	export default {
		data(){
			return {
				createMode: true,
				newModel: {}
			}
		},
		components: {
			'form-inputs': inputs
		},
		methods: {
			create: function(){
				this.$http.post(URL, this.newModel).then(function(resp){
					fnc.niceAlert('success', 'Se creó el menú correctamente!');
					this.$router.go('/menu');
				}, fnc.tryError);
			}
		}

	}
</script>
