<template>
	<div class="row">
		<form action="" @submit.prevent="update">
			
			<form-inputs :create-mode="createMode" :data-model.sync="newModel"></form-inputs>

		</form>
	</div>
</template>

<script>
	
	import fnc from '../../../util/reusable_functions';

	import inputs from './form-fields.vue';

	const URL = 'api/menu';

	export default {
		ready(){
			this.read();
		},
		data(){
			return {
				createMode: false,
				newModel: {}
			}
		},
		components: {
			'form-inputs': inputs
		},
		methods: {
			update: function(){
				this.$http.put(URL + '/' + this.newModel.id, this.newModel).then(function(resp){
					fnc.niceAlert('success', 'Se modificó correctamente el menú!');
					this.$router.go('/menu');
				}, function(err){
					console.warn(err);
					fnc.niceAlert('error', err.dev_message);
				});
			},
			read: function(){
				this.$http.get(URL + '/' + this.$route.params.model_id).then(function(resp){
					this.newModel = resp.data.data;
				}, function(err){
					console.warn(err);
					fnc.niceAlert('error', err.message);
				});
			}
		}

	}


</script>