/**
 * Aqui se definen los metodos generales que seran usados por los componentes que implementen este mixins,
 * cada metodo declarado aquí hará referencia con "this" a su propio "scope"
 */

 import fnc from '../../../util/reusable_functions';
 import {urlMateriasDocente, urlCiclo, urlCicloDocente, urlListaMaterias, urlEnvioSilabosDocente, urlEnvioTodosSilabosDocente} from '../config';

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
			self.$http.get(urlCiclo).then(function(resp){
				const idCiclo = resp.data.data.id ? resp.data.data.id : 0;
				self.ciclo = idCiclo;
				self.url = urlCicloDocente.replace('param', idCiclo);
				self.loading = false;
 			}, fnc.tryError)
 		},

 		//for edit-view.vue
 		update: function(){ 
 			const materias = this.materiasSeleccionadas;
 			const self = this;
 			self.$http.put(urlMateriasDocente + '/' + this.currentModel.id, {materias: materias}).then(function(resp){
 					fnc.niceAlert('success', 'Esta información ha sido modificada correctamente!');
 					//setTimeout(function(){self.$router.go('/materias_docentes');}, 10);
 					self.$router.go('/materias_docentes?' + (+new Date())); //random token
 				}, fnc.tryError);

 		},
 		loadList: function(){
 			const self = this;
 			self.$http.get(urlListaMaterias).then(function(resp){
 					self.formatedList(resp.data.data);
 				}, fnc.tryError);
 		},
 		formatedList: function(data){
 			this.options = [];
 			for(let i in data){
 				this.options.push({materia: data[i].id, desc: data[i].nombre_materia + ' | ' + data[i].semestre});
 			}
 		},
		sendSilabos: function(docente, materias){
			const self = this;
			const nombre = `${docente.apellidos} ${docente.nombres}`;
			const email = docente.email;

			if(materias.length > 0){
				self.$http.post(urlEnvioSilabosDocente, {
					materias,
					docente: { nombre, email }
				}).then(function(resp){
					fnc.niceAlert('success', 'Silabos enviados correctamente!');
				}, fnc.tryError);
			}
		},
		sendAllSilabos: function(){
			const self = this;
			if(confirm('Recuerde que este proceso puede tardar varios minutos debido al tamaño de los archivos adjunto, ¿Estás seguro de continuar?')){
				self.$http.post(urlEnvioTodosSilabosDocente, {}).then(function(resp){
					if(resp.error){
						fnc.niceAlert('error', resp.message);
					}else{
						fnc.niceAlert('success', 'Se enviaron los silabos a todos los docentes');
					}
				}, fnc.tryError);
			}
		},
		addDocenteCicloActivo: function(){
			this.showModalDocente = true;
		},
		addDocenteCiclo: function(ciclo, docente){
			const url = urlCicloDocente.replace('param', ciclo) + '/' + docente;
			this.$http.post(url, {}).then(function(resp){
				if(resp.error){
					fnc.niceAlert('error', resp.message);
				}else{
					if(resp.data.error){
						fnc.niceAlert('warning', resp.data.message);
					}else{
						fnc.niceAlert('success', 'Se ha agregado correctamente el docente');
						this.load();
					}
				}
			}, fnc.tryError)
		}
 	}
 }
