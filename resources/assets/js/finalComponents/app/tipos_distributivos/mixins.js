/**
 * Aqui se definen los metodos generales que seran usados por los componentes que implementen este mixins,
 * cada metodo declarado aquí hará referencia con "this" a su propio "scope"
 */

 import fnc from '../../../util/reusable_functions';

 export default {
 	methods: {
 		//For list-view.vue
		toggleModal: function(){
			this.showModal = !this.showModal;
		},
		toggleDataModel: function(model){
			if(this.createMode){
				this.currentModel = {
					id: null,
					activo: 0,
					nombre: null,
					orden: null,
					items:[]
				};
			}else{
				this.currentModel = model;
			}
		},
		toggleLoadButton: function(){
			this.load_button = !this.load_button;
		},
		submitForm: function(){
			if(this.createMode){
				this.create();
			}else{
				this.update();
			}
		},
		//for crud
 		create: function(){
 			this.$http.post(this.url, this.currentModel).then(function(resp){
 				fnc.niceAlert('success', 'Se creó la materia correctamente!');
 				//this.$router.go('/tipos_distributivo');
				this.showModal = false;
				this.load();
 			}, fnc.tryError);
 		},
 		update: function(){
			this.$http.put(this.url + '/' + this.currentModel.id, this.currentModel).then(function(resp){
 				fnc.niceAlert('success', 'Se modificó correctamente la materia!');
				this.showModal = false;
				this.load();
 				//this.$router.go('/malla_academica');
 			}, fnc.tryError);
 		},
 		read: function(){
 			this.loading = true;
 			this.$http.get(this.url + '/' + this.$route.params.model_id).then(function(resp){
 				this.currentModel = resp.data.data;
 				this.loading = false;
 			}, fnc.tryError);
 		},
 		destroy: function(model){
 			if (confirm('¿Estás seguro?')) {
 				this.$http.delete(this.url + '/' + model.id).then(function(resp){
 					fnc.niceAlert('success', 'Se eliminó correctamente');
 					this.load();
 				}, fnc.tryError);
 			}
 		},
 		load: function(){
 			this.loading = true;
 			this.$http.get(this.url).then(function(resp){
 				this.loading = false;
 			}, fnc.tryError)
 		}

 	}
 }
