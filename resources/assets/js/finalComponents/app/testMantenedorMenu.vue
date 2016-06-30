<template>
	
	<div v-if="loading">
		<app-loading></app-loading>
	</div>

	<div v-else class="row">
		
		<div class="col-xs-12">
			
			<app-menu-management :caption="title"></app-menu-management>

		</div>

	</div>
	
</template>


<script>

	import Loading from '../reusable/loading.vue';
	import manegement from '../reusable/menuManagement.vue';
	
	export default {
		data(){
			return {
				datos: [],
				loading: false,
				mode: 'listar'
			}
		},
		ready: function(){
			this.loadData();
		},
		methods: {
			loadData(){
				var self = this;
				self.loading=true;
				setTimeout(function(){
					self.loading=false;
					console.log('data cargada xD');
				}, 1200);
			},
			toggleMode: function (mode) {
				 this.mode = this.$parent.description = mode;
			},
		},
		components: {
			'app-loading' : Loading,
			'app-menu-management' : manegement,
		},
		route: {
			data: function(transition){
				this.$parent.$parent.$data.title = 'Menu';
				this.toggleMode(this.mode);
				transition.next();	
			}
		},
	}

</script>
