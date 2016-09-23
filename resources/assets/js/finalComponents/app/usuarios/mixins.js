/**
 * Aqui se definen los metodos generales que seran usados por los componentes que implementen este mixins,
 * cada metodo declarado aquí hará referencia con "this" a su propio "scope"
 */

import fnc from '../../../util/reusable_functions';

export default {
	methods: {
		create: function(){
			this.$http.post(this.url, this.newModel).then(function(resp){
				fnc.niceAlert('success', 'Se creó el usuario correctamente!');
				this.$router.go('/usuarios');
			}, fnc.tryError);
		},
		update: function(){
			this.$http.put(this.url + '/' + this.newModel.id, this.newModel).then(function(resp){
				fnc.niceAlert('success', 'Se modificó el usuario correctamente!');
				this.$router.go('/usuarios');
			}, fnc.tryError);
		},
		read: function(){
			this.loading = true;
			this.$http.get(this.url + '/' + this.$route.params.model_id).then(function(resp){
				this.newModel = resp.data;
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