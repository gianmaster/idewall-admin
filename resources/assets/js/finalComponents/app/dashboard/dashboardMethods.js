import fnc from '../../../util/reusable_functions';

const URL = 'api/ciclo';
const URL_DASHBORAD = 'api/dashborad/{ciclo}';

export default {
    load: function(){
        let _this = this;
        _this.loading = true;
        _this.$http.get(URL).then(function(resp){
            _this.ciclo = resp.data.data;

            if(_this.ciclo.id){
                _this.$http.get(URL_DASHBORAD.replace('{ciclo}', _this.ciclo.id)).then(function(res){
                    _this.data = res.data;
                    _this.loading = false;
                    _this.loadDataChart();
                }, fnc.tryError)
            }
            
        }, fnc.tryError);
    },
    loadDataChart: function(){
        const data1 = [this.data.docentes_ciclo, this.data.horarios_distributivos_asignados];
        const data2 = [this.data.cursos_ciclo, this.data.cursos_ciclo_asignado];
        this.graphs.primero.data.datasets[0].data = data1;
        this.graphs.segundo.data.datasets[0].data = data2;
    }
}
