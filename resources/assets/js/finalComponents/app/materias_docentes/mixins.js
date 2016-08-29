/**
 * Aqui se definen los metodos generales que seran usados por los componentes que implementen este mixins,
 * cada metodo declarado aquí hará referencia con "this" a su propio "scope"
 */

 import fnc from '../../../util/reusable_functions';

 const API_URL = 'api/docentes/materias';

const URL_CICLO = 'api/ciclo';

const URL_CICLO_DOCENTES = 'api/ciclo/param/docentes';

 const API_URL_LIST_MATERIAS = 'api/malla_academica/all';

 export default {
 	methods: {
 		//For list-view.vue
		toggleModal: function(){
			this.showModal = !this.showModal;
		},
		toggleDataModel: function(model, materias){
			this.currentModel = model;
			this.toggleMaterias(materias);
		},
		toggleMaterias: function(materias){
			let data = [], materia_id, desc, self = this;

			for (let idx in materias) {
				materia_id = materias[idx].materia;
				desc = materias[idx].materia_detail.nombre_materia + ' | ' + materias[idx].materia_detail.semestre;
				data.push({materia: materia_id, desc: desc });
			}

			this.materiasSeleccionadas = data;
		},
		load: function(){
			let self = this;
			self.loading = true;
			self.$http.get(URL_CICLO).then(function(resp){
				const idCiclo = resp.data.data.id ? resp.data.data.id : 0;
				self.url = URL_CICLO_DOCENTES.replace('param', idCiclo);
				self.loading = false;
 			}, fnc.tryError)
 		},

 		//for edit-view.vue
 		update: function(){ 
 			const materias = this.materiasSeleccionadas;
 			const self = this;
 			self.$http.put(API_URL + '/' + this.currentModel.id, {materias: materias}).then(function(resp){
 					fnc.niceAlert('success', 'Esta información ha sido modificada correctamente!');
 					//setTimeout(function(){self.$router.go('/materias_docentes');}, 10);
 					self.$router.go('/materias_docentes?' + (+new Date())); //random token
 				}, fnc.tryError);

 		},
 		loadList: function(){
 			const self = this;
 			self.$http.get(API_URL_LIST_MATERIAS).then(function(resp){
 					self.formatedList(resp.data.data);
 				}, fnc.tryError);
 		},
 		formatedList: function(data){
 			this.options = [];
 			for(let i in data){
 				this.options.push({materia: data[i].id, desc: data[i].nombre_materia + ' | ' + data[i].semestre});
 			}
 		}

 	}
 }
