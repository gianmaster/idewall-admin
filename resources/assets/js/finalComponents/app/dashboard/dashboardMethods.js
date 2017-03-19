import fnc from '../../../util/reusable_functions';

import {
    urlCicloCierre,
    urlCiclo,
    urlDashboard
} from '../config';

let auxrenderGraph = function () {
    $(".sidebar-toggle").trigger('click');
};

export default {
    methods: {
        load: function () {
            let vm = this;
            vm.loading = true;
            vm.$http.get(urlCiclo).then(function (resp) {
                vm.ciclo = resp.data.data;
                if (vm.ciclo != null) {
                    vm.$http.get(urlDashboard.replace('{ciclo}', vm.ciclo.id)).then(function (res) {
                        vm.data = res.data;
                        vm.loadDataChart();
                        vm.loading = false;
                        auxrenderGraph();
                        setTimeout(function () {
                            auxrenderGraph();
                        }, 500);
                    }, fnc.tryError);
                }
                vm.loading = false;

            }, function (err) {
                console.log(err, 'no cargo a la primera');
                vm.$http.get(urlCiclo).then(function (resp) {
                    vm.ciclo = resp.data.data;

                    if (vm.ciclo != null) {
                        vm.$http.get(urlDashboard.replace('{ciclo}', vm.ciclo.id)).then(function (res) {
                            vm.data = res.data;
                            vm.loadDataChart();
                            vm.loading = false;
                            auxrenderGraph();
                        }, fnc.tryError)
                    }
                    vm.loading = false;

                }, fnc.tryError);
            });
        },
        loadDataChart: function () {
            const data1 = [this.data.docentes_ciclo, this.data.horarios_distributivos_asignados];
            const data2 = [this.data.cursos_ciclo, this.data.cursos_ciclo_asignado];
            this.graphs.primero.data.datasets[0].data = data1;
            this.graphs.segundo.data.datasets[0].data = data2;
        },
        cerrarCiclo() {
            if (confirm('Advertencia! Al cerrar el ciclo se bloquean todos los modulos operativo "Proceso Distributivo". Estas seguro?')) {
                const {
                    id
                } = this.ciclo;
                const vm = this;
                vm.$http.post(`${urlCicloCierre}/${id}`).then(function (resp) {
                    vm.ciclo = resp.data.data;
                    fnc.niceAlert('success', 'Se cerró el ciclo correctamente');
                    vm.load();
                }, fnc.tryError);
            }

        },
        addNewCiclo(){
            const vm = this;
            this.$http.post(urlCiclo, this.newCiclo).then((resp) => {
                vm.load();
                vm.showModalCiclo = false;
                fnc.niceAlert('success', 'Se aperturó el ciclo correctamente');
            }, fnc.tryError);
        }
    }
};
