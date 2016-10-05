<template>
    <div v-if="loading">
        <app-loading></app-loading>
    </div>
    <div v-else>
        <div class="col-xs-12 col-sm-4">
            <!-- Cuadro de asignacion de distributivos -->
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title"><i class="fa fa-clock-o"></i> Distributivos</h3>
                    <div class="box-tools pull-right">
                        <a v-link="{path:'/horariosdocentes'}" class="btn btn-default btn-xs"><i class="fa fa-reply"></i> Volver</a>
                        <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                    </div><!-- /.box-tools -->
                </div><!-- /.box-header -->
                <div class="box-body">
                    <table class="table table-bordered" id="tabla_distributivos">
                        <tr v-for="dist in distributivos">
                            <td class="td-valign text-center">{{dist.nombre}}</td>
                            <td colspan="2">
                                <table v-if="dist.items.length > 0" width="100%">
                                    <tr v-for="item in dist.items">
                                        <td colspan="2">
                                            <span class="__is_draggable" draggable="true" @drag="onDragDistributivo($event, item)">{{item.nombre}}</span>
                                        </td>
                                        <td width="5%">
                                            <span class="text-green"> 0</span>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center" colspan="3">
                                <strong>TOTAL HORAS</strong> <span class="text-green pull-right"> 40</span>
                            </td>
                        </tr>
                    </table>
                </div><!-- /.box-body -->
                <div class="box-footer">
                    <p class="text-green">Arrastre <code><i class="fa fa-arrows"></i></code> el tipo de distributivo</p>
                    <hr>
                    <div class="form-group">
                        <label for="otro"><span class="text-primary">Descripción </span><span class="text-red">"OTRO"</span></label>
                        <input class="form-control" type="text" name="otro" id="otro" placeholder="Ingrese la definición de el item modificable" v-model="descripcionOtro">
                    </div>
                </div>
            </div><!-- /.box -->
        </div>

        <div class="col-xs-12 col-sm-8">
            <!-- Cuadro de asignacion del horarion -->
            <div class="box box-primary">
                <div class="box-header with-border" v-if="docente.docente_detail">
                    <h3 class="box-title"><i class="fa fa-user"></i> {{docente.docente_detail.abreviatura}} {{docente.docente_detail.nombres}} {{docente.docente_detail.apellidos}} <span class="label labe-success">{{docente.docente_detail.identificacion}}</span></h3>

                    <div class="box-tools pull-right">
                        <!-- Buttons, labels, and many other things can be placed here! -->
                        <!-- Here is a label for example -->
                        <span class="text-primary"><i class="fa fa-hourglass-start" style="font-size: .8em"></i> {{docente.ciclo_detail.anio}}-{{docente.ciclo_detail.anio +1}} C{{docente.ciclo_detail.ciclo}}</span>
                        <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                    </div><!-- /.box-tools -->
                </div><!-- /.box-header -->
                <div class="box-body table-container">

                    <table class="table table-bordered" id="tabla_horario">
                        <tbody>
                        <template v-for="elem in horario">
                            <tr v-if="elem.tipo=='jornada'">
                                <td colspan="7" class="td-formato">
                                    <strong>{{elem.filas}}</strong>
                                </td>
                            </tr>
                            <tr v-if="elem.tipo=='head'">
                                <td v-for="cabecera in elem.filas" class="td-formato {{$index==0?'__hora':''}}">
                                    <strong>{{cabecera}}</strong><!-- para la cabecera hora se agrega porcentaje -->
                                </td>
                            </tr>
                            <tr v-if="elem.tipo=='hora'">
                                <td class="td-formato"><strong>{{elem.hora}}</strong></td>
                                <template v-for="item in elem.filas">
                                    <td v-if="!item.bloq" class="td-formato" draggable="true" @drag="onDragCellDistributivo($event, item)" @dragover.prevent @drop="onDropDistributivo($event, item)" @dragleave="onDistributivoLeave" @dragenter="onDistributivoEnter">
                                        <template v-if="item.label == 'OTRO' && descripcionOtro != ''">
                                            {{descripcionOtro | uppercase}}
                                        </template>
                                        <template v-else>
                                            {{item.label}}
                                        </template>
                                    </td>
                                    <template v-else>
                                        <td v-if="item.cod < 0" class="my_disabled td-formato grupo__materias">
                                            {{item.label}}
                                        </td>
                                        <td v-else class="my_disabled td-formato">
                                            {{item.label}}
                                        </td>
                                    </template>
                                </template>
                            </tr>
                        </template>
                        </tbody>

                    </table>

                </div><!-- /.box-body -->

            </div><!-- /.box -->
        </div>
    </div>
</template>
<style>

    .__hora{
        width: 15%;
    }

    .td-valign{
        vertical-align: middle !important;
    }

    .__is_draggable{
        cursor: move;
    }
    .__is_draggable:hover{
        background: #f4f8f6;
        padding: 0 1%;
        border: dashed 1px #74ce74;
    }

    #tabla_horario tbody tr td{
        font-size: 80% !important;
    }
    #tabla_distributivos{
        font-size: 85%;
    }

    .td-formato{
        text-align: center;
        vertical-align: middle !important;
    }

    .table-container{
        height: 520px;
        overflow: auto;
    }

    .my_disabled{
        cursor: no-drop;
        background-color: #d6d6d6;
    }

    .td-hora{
        background-color: #add8e6;
    }
    .td-hora-title{
        font-weight: bold;
    }

    .dropzone{
        border: 1px dashed #a7cdbc;
        height: 2.15em;
        color: #7797aa;
    }
    .enter-item-h{
        background-color: #9df1cb !important;
    }

    .grupo__materias{
        background-color: rgba(73, 108, 254, 0.66) !important;
    }

    .grupo__1{
        background-color: rgba(142, 118, 254, 0.66);
    }

    .grupo__2{
        background-color: rgba(254, 203, 78, 0.66);
    }

    .grupo__3{
        background-color: rgba(254, 139, 72, 0.66);
    }

    .grupo__4{
        background-color: rgba(254, 51, 54, 0.66);
    }

    .grupo__5{
        background-color: rgba(182, 93, 254, 0.66);
    }

    .grupo__6{
        background-color: rgba(180, 254, 76, 0.66);
    }

</style>
<script>

    import store from './data_horario';
    import Loading from '../../../reusable/loading.vue';
    import fnc from '../../../../util/reusable_functions';
    import _ from 'lodash';

    export default{
        name: 'horarioDocente',
        data(){
            return{
                descripcionOtro:'',
                loadingDocente: true,
                loadingDistributivos: true,
                urlDistributivos: 'api/tipodistributivo/all',
                urlCicloDocente: 'api/ciclodocente',
                distributivos: [],
                docente: {},
                horario_materias: [],
                horario: store.formatoHorario,
                tmpDistributivo: {}
            }
        },
        components: {
            appLoading: Loading
        },
        computed: {
            loading: function(){
                return this.loadingDistributivos || this.loadingDocente;
            }
        },
        route: {
            data: function(transition){
                transition.next();
            }
        },
        ready: function(){
            this.load();
        },
        methods: {
            onDragDistributivo: function(e, item){
                this.tmpDistributivo = item;
            },
            onDragCellDistributivo: function(e, item){
                this.tmpDistributivo.id = item.cod;
                this.tmpDistributivo.nombre = item.label;
                this.tmpDistributivo.id_distributivo = item.cod_padre;
            },
            onDropDistributivo: function(e, item){
                if(!item.bloq){
                    item.cod = this.tmpDistributivo.id;
                    item.label = this.tmpDistributivo.nombre;
                    item.cod_padre = this.tmpDistributivo.id_distributivo;
                    e.target.classList.remove('enter-item-h');
                    for(let i=0; i<=6; i++){
                        e.target.classList.remove('grupo__' + i);
                    }
                    e.target.classList.add('grupo__' + this.tmpDistributivo.id_distributivo);
                    this.tmpDistributivo = {id: 0, id_distributivo: 0, nombre: ''};
                }
            },
            onDistributivoLeave: function(e){
                e.target.classList.remove('enter-item-h');
            },
            onDistributivoEnter: function (e) {
                e.target.classList.add('enter-item-h');
            },
            loadDistributivos: function(){
                this.loadingDistributivos = true;
                let _this = this;
                this.$http.get(this.urlDistributivos).then(function(resp){
                    _this.distributivos = resp.data.data;
                    _this.loadingDistributivos = false;
                }, fnc.tryError);
            },
            loadDocente: function(){
                this.loadingDocente = false;
                let _this = this;
                this.$http.get(`${this.urlCicloDocente}/${this.$route.params.model_id}`).then(function(resp){
                    _this.docente = resp.data.data;
                    _this.loadMaterias();
                    _this.horarioMaterias();
                    _this.loadingDocente = false;
                }, fnc.tryError);
            },
            loadHorarioDocente: function(){
                console.log('load data');
            },
            load: function(){
                this.loadDistributivos();
                this.loadDocente();
            },
            materiasHorarioDocente: function () {
                let hr = this.horario;
                for(let hItem of hr){
                    if(hItem.tipo == 'hora'){
                        const umbral = hItem.split(' - ');
                        const hIni = fnc.horaCharToNum(umbral[0]);
                        const hFin = fnc.horaCharToNum(umbral[1]);
                    }
                }
            },
            loadMaterias: function(){
                let matList = [];
                for(let item of this.docente.materias_docente_ciclo){
                    const materia = item.materia_detail.nombre_materia;
                    const sem = item.materia_detail.semestre;
                    for(let subItem of item.horarios_materia_docente){
                        matList.push({
                            id: subItem.id,
                            dia: subItem.dia,
                            hora_inicio: subItem.hora_inicio,
                            hora_fin: subItem.hora_fin,
                            num_horas: subItem.num_horas,
                            nombre_materia: materia,
                            semestre: sem
                        });
                    }
                }
                this.horario_materias = matList;
            },
            horarioMaterias: function(){
                for(let materia of this.horario_materias){
                    const ini = fnc.horaCharToNum(materia.hora_inicio);
                    const fin = fnc.horaCharToNum(materia.hora_fin);
                    for(let item of this.horario){
                        if (item.tipo == 'hora') {
                            const hIni = fnc.horaCharToNum(item.hora.split(' - ')[0]);
                            const hFin = fnc.horaCharToNum(item.hora.split(' - ')[1]);
                            for(let fila of item.filas){
                                if(fila.dia == materia.dia) {
                                    if ((hIni >= ini && ini <= hFin) || (hIni >= fin && fin <= hFin)) {
                                        fila.bloq = true;
                                        fila.cod = -1;
                                        fila.cod_padre = -1;
                                        fila.label = materia.nombre_materia + ' - ' + materia.semestre;
                                        //console.log('entra', materia.nombre_materia);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    }
</script>


