/**
 * Aqui se definen los metodos generales que seran usados por los componentes que implementen este mixins,
 * cada metodo declarado aquí hará referencia con "this" a su propio "scope"
 */

 import fnc from '../../../util/reusable_functions';
import {urlCicloHorarioDocenteRpt} from '../config';

 export default {
 	methods: {
		download: function(model){
			console.log(model);
		},
		load: function(){
			let _this = this;
			_this.loading = true;
			_this.$http.get(_this.urlCiclos).then(function(resp){
				_this.listaCiclos = resp.data.data;
				_this.loading = false;
				_this.ciclo = resp.data.data[0];
				_this.url = urlCicloHorarioDocenteRpt.replace('{ciclo}', _this.ciclo.id);
			}, fnc.tryError);

		},
		chageCiclo: function(ciclo){
			let _this = this;
			this.url = urlCicloHorarioDocenteRpt.replace('{ciclo}', ciclo.id);
			setTimeout(function(){
				_this.$children[0].refresh();
			}, 100);
		}

 	}
 }
