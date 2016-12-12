import fnc from '../../../util/reusable_functions';

import {urlCicloCierre, urlCiclo, urlDashboard} from '../config';

export default {
    load: function(){
        let vm = this;
        vm.loading = true;
        vm.$http.get(urlCiclo).then(function(resp){
            vm.ciclo = resp.data.data;
            if(vm.ciclo != null){
                vm.$http.get(urlDashboard.replace('{ciclo}', vm.ciclo.id)).then(function(res){
                    vm.data = res.data;
                    vm.loading = false;
                    vm.loadDataChart();
                }, fnc.tryError)
            }
            vm.loading = false;
            
        }, function(err){
            console.log(err, 'no cargo a la primera');
            vm.$http.get(urlCiclo).then(function(resp){
                vm.ciclo = resp.data.data;

                if(vm.ciclo != null){
                    vm.$http.get(urlDashboard.replace('{ciclo}', vm.ciclo.id)).then(function(res){
                        vm.data = res.data;
                        vm.loading = false;
                        vm.loadDataChart();
                    }, fnc.tryError)
                }
                vm.loading = false;

            }, fnc.tryError);
        });
    },
    loadDataChart: function(){
        const data1 = [this.data.docentes_ciclo, this.data.horarios_distributivos_asignados];
        const data2 = [this.data.cursos_ciclo, this.data.cursos_ciclo_asignado];
        this.graphs.primero.data.datasets[0].data = data1;
        this.graphs.segundo.data.datasets[0].data = data2;
    },
    cerrarCiclo(){
        if(confirm('Advertencia! Al cerrar el ciclo se bloquean todos los modulos operativo "Proceso Distributivo". Estas seguro?')){
            const {id} = this.ciclo;
            const vm = this;
            vm.$http.post(`${urlCicloCierre}/${id}`).then(function(resp){
                vm.ciclo = resp.data.data;
                fnc.niceAlert('success', 'Se cerroel ciclo correctamente');
            }, fnc.tryError);
        }

    }
}
