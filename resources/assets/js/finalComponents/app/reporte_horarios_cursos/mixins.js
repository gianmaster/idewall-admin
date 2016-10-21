/**
 * Aqui se definen los metodos generales que seran usados por los componentes que implementen este mixins,
 * cada metodo declarado aquí hará referencia con "this" a su propio "scope"
 */

import fnc from '../../../util/reusable_functions';

export default {
	methods: {
		
		download: function(model){
			console.log(model);
		},
		load: function(){
			this.loading = true;
			this.$http.get(this.url).then(function(resp){
				this.loading = false;
			}, fnc.tryError)
		}
	}
}
