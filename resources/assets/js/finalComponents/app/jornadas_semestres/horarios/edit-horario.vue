<template>

    <div v-if="loading">
        <app-loading></app-loading>
    </div>

    <div v-else class="row">
        <div class="col-xs-12 col-sm-4">
            <!-- Cuadro de asignacion de docentes -->
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title"><i class="fa fa-book"></i> Horas Materias <small>Semanales</small></h3>
                    <div class="box-tools pull-right">
                        <a v-link="{path:'/jornadasemestres'}" class="btn btn-default btn-xs"><i class="fa fa-reply"></i> Volver</a>
                        <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                    </div><!-- /.box-tools -->
                </div><!-- /.box-header -->
                <div class="box-body">
                    <p v-dragable-for="item in materias" options='{"group":"people"}' @drag="onDragMateria($event, item)" class="__is_draggable">
                        <span class="text-blue">{{item.nombre_materia}}</span><br>
                        <small>Cod: {{item.codigo_materia}} - <i>{{item.horas}}Horas</i></small><span class="btn-success badge pull-right">{{item.total}}</span>
                    </p>
                </div><!-- /.box-body -->
                <div class="box-footer" @dragover.prevent @drop="onDropMateria">
                    <p class="text-green">Arrastre las materias para agregar el horario</p>
                </div>
            </div><!-- /.box -->
        </div>

        <div class="col-xs-12 col-sm-8">
            <!-- Cuadro de asignacion del horarion -->
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">{{semestre.descripcion}} - {{aula.descripcion}} <small>({{jornada.aux1}} – {{jornada.aux2}})</small></h3>
                    <div class="box-tools pull-right">
                        <!-- Buttons, labels, and many other things can be placed here! -->
                        <!-- Here is a label for example -->
                        <span :class="classJornada"><i class="fa fa-clock-o"></i> {{jornada.descripcion}}</span>
                        <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                    </div><!-- /.box-tools -->
                </div><!-- /.box-header -->
                <div class="box-body">

                    <tabs>
                        <tab v-for="dia in horario" :header="dia.title" :disabled="tabsEnable($index)">
                            <table class="table">
                                <thead>
                                <tr>
                                    <td class="td-formato"><strong>Materia</strong></td>
                                    <td class="td-formato"><strong>Desde</strong></td>
                                    <td class="td-formato"><strong>Hasta</strong></td>
                                    <td class="td-formato" width="10%"><a href="javascript:;" class="text-green" title="Agregar registro" data-toggle="tooltip" data-placement="left" @click="addMateria($index)" v-show="!dia.modoAgregar"><i class="fa fa-plus-circle"></i> </a></td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="row in dia.materias">
                                    <td class="td-formato">
                                        {{getNombreMateria(row.materia)}}
                                    </td>
                                    <td class="td-formato">
                                        {{row.desde.HH}}H{{row.desde.mm}}
                                    </td>
                                    <td class="td-formato">
                                        {{row.hasta.HH}}H{{row.hasta.mm}}
                                    </td>
                                    <td class="td-formato">
                                        <a href="javascript:;" class="text-red" data-toggle="tooltip" title="Eliminar este registro" data-placement="left"><i class="fa fa-minus-circle" @click="deleteMateria($parent.$index, $index)"></i></a>
                                    </td>
                                </tr>

                                <tr v-if="dia.materias.length <= 0">
                                    <td colspan="4">
                                        <div class="text-center">
                                            <p>No se há asiginado aún horario para este día</p>
                                        </div>
                                    </td>
                                </tr>

                                </tbody>
                                <tfoot v-if="dia.modoAgregar">
                                <tr>
                                    <td colspan="4">
                                        <div class="col-xs-4 text-center dropzone" @dragover.prevent @drop="onDropMateria($event, dia)" @dragleave="onMateriaLeave" @dragenter="onMateriaEnter">
                                            <!--
                                            <v-select
                                                    :value.sync="dia.materiaTmp.materia"
                                                    :options.sync="lista_materias"
                                                    name="materia[]"
                                                    justified required close-on-select>

                                            </v-select>
                                            -->

                                            <template v-if="dia.materiaTmp.materia">
                                                {{getNombreMateria(dia.materiaTmp.materia)}} <i @click="onRemoveMateriaDropped(dia)" class="fa fa-close"></i>
                                            </template>

                                        </div>
                                        <div class="col-xs-3 text-center">
                                            <template v-if="jornada.codigo == 'ESP'">
                                                <vue-timepicker format="HH:mm"
                                                                :minute-interval="10"
                                                                :time-value.sync="dia.materiaTmp.desde">
                                                </vue-timepicker>
                                            </template>
                                            <template v-else>
                                                <span style="font-size: 1.26em;">
                                                    {{dia.materiaTmp.desde.HH}}:{{dia.materiaTmp.desde.mm}}
                                                </span>
                                            </template>
                                        </div>
                                        <div class="col-xs-3 text-center">
                                            <vue-timepicker format="HH:mm"
                                                            :minute-interval="10"
                                                            :time-value.sync="dia.materiaTmp.hasta">
                                            </vue-timepicker>
                                        </div>
                                        <div class="col-xs-2 text-center">
                                            <div class="btn-group">
                                                <a href="javascript:;" class="btn btn-success btn-xs" @click="saveMateria($index)">
                                                    <i data-toggle="tooltip" class="fa fa-check" title="Guardar"></i>
                                                </a>
                                                <a href="javascript:;" class="btn btn-default btn-xs" @click="dia.modoAgregar=false">
                                                    <i data-toggle="tooltip" class="fa fa-close" title="Cancelar"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                </tfoot>

                            </table>

                        </tab>

                        <!-- tab de asignacion de maestros -->
                        <tab header="<span>Docentes Asignados <i class='fa fa-bookmark'></i></span>">

                            <form action="" @submit.prevent="guardarHorario">

                                <div v-for="(key, row) in grupo_materias_docentes">
                                    <h5 class="text-green">{{key}}</h5>
                                    <button-group :value.sync="docentes_seleccionados[$index]" type="info" buttons="false">
                                        <radio v-for="item in row" :value="{id_cmd: item.ciclo_materia_docente, id_mat: item.id_materia}">{{item.nombres}} {{item.apellidos}}</radio>
                                    </button-group>

                                </div>

                                <hr>

                                <p class="text-info">Debe seleccionar los docentes por materia para poder guardar los cambios.</p>
                                <template v-if="guardarDisponible">
                                    <button class="btn btn-success" type="submit">GUARDAR</button>
                                </template>
                                <template v-else>
                                    <button class="btn btn-success" type="submit" disabled>GUARDAR</button>
                                </template>

                            </form>

                        </tab>
                    </tabs>

                </div><!-- /.box-body -->

            </div><!-- /.box -->
        </div>

        <!-- Alerta que indica si es posible asignar el horario -->
        <div class="col-xs-12">
            <div v-show="!creacionHorario" class="alert alert-warning alert-dismissible" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <strong>Precaución!</strong> Existen materias en este semestre que aún no han sido asignadas a un docente. Por favor asigne las materias a los docentes respectivamente para no tener fallos en el sistema.
                <a v-link="{path: '/materias_docentes'}">Link - Materias Docentes </a>
            </div>
        </div>

        <!-- Table que muestra la asignacion del horario en formato legible -->
        <div class="col-xs-12">
            <div class="box box-success collapsed-box">
                <div class="box-header with-border">
                    <h3 class="box-title"><i class="fa fa-calendar-check-o" aria-hidden="true"></i> Horario - Vista Previa</h3>
                    <div class="box-tools pull-right">
                        <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i></button>
                    </div><!-- /.box-tools -->
                </div><!-- /.box-header -->
                <div class="box-body">
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <td class="td-formato td-hora td-hora-title">HORA</td>
                                <td class="td-formato">LUNES</td>
                                <td class="td-formato">MARTES</td>
                                <td class="td-formato">MIERCOLES</td>
                                <td class="td-formato">JUEVES</td>
                                <td class="td-formato">VIERNES</td>
                                <td class="td-formato">SABADO</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="td-formato td-hora">07:00</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td class="td-formato td-hora">08:30</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div><!-- /.box-body -->
            </div><!-- /.box -->
        </div>

    </div>

</template>
<style>

    .__is_draggable{
        cursor: move;
    }
    .__is_draggable:hover{
        background: #f4f8f6;
        padding: 0 1%;
        border: dashed 1px #74ce74;
    }

    .dropzone{
        border: 1px dashed #a7cdbc;
        height: 2.15em;
        color: #7797aa;
    }
    .enter-item{
        border: 2px dashed #279664;
    }

    .td-formato{
        text-align: center;
    }
    .td-hora{
        background-color: #add8e6;
    }
    .td-hora-title{
        font-weight: bold;
    }
    /*Para solucionar bug visual en el select*/
    button.form-control{
        height: auto;
    }

</style>
<script>

    import VueStrap from 'vue-strap';

    import Multiselect from 'vue-multiselect';

    import VueTimepicker from 'vue-time-picker';

    import _ from 'lodash';

    import fnc from './../../../../util/reusable_functions';

    import util from '../jornadas_semestre_util';

    import Loading from '../../../reusable/loading.vue';

    export default{
        name: 'jornadaSemestreHorario',
        data(){
            return{
                templateLimit: function(count){
                    return `y ${count} más`;
                },
                aula:{},
                jornada:{},
                ciclo:{},
                semestre:{},
                materias: [],
                horas_limite:{
                    min: '18:40',
                    max: '22:40'
                },
                horario:[
                    {
                        title: 'Lunes',
                        name: 'LUNES',
                        materias: [/*
                            {
                                materia: 1,
                                desde: {HH: '18', mm: '40'},
                                hasta: {HH: '20', mm: '00'},
                                total: '01:20'
                            }
                        */],
                        materiaTmp:{
                            materia: null,
                            desde: {HH: '18', mm: '40'},
                            hasta: {HH: '20', mm: '00'}
                        },
                        modoAgregar: false,
                        materiasDisponible: []
                    },
                    {
                        title: 'Martes',
                        name: 'MARTES',
                        materias: [],
                        materiaTmp:{},
                        modoAgregar: false,
                        materiasDisponible: []
                    },
                    {
                        title: 'Miércole',
                        name: 'MIERCOLES',
                        materias: [],
                        materiaTmp:{},
                        modoAgregar: false,
                        materiasDisponible: []
                    },
                    {
                        title: 'Jueves',
                        name: 'JUEVES',
                        materias: [],
                        materiaTmp:{},
                        modoAgregar: false,
                        materiasDisponible: []
                    },{
                        title: 'Viernes',
                        name: 'VIERNES',
                        materias: [],
                        materiaTmp:{},
                        modoAgregar: false,
                        materiasDisponible: []
                    },
                    {
                        title: 'Sábado',
                        name: 'SABADO',
                        materias: [],
                        materiaTmp:{},
                        modoAgregar: false,
                        materiasDisponible: []
                    }
                ],
                lista_materias: [],
                lista_docentes_materias: [],
                ciclo_docentes:[],
                maxMaterias: 4,
                current_materia_to_drop: [],
                grupo_materias_docentes:[],
                docentes_seleccionados:[],
                loading: true,
            }
        },
        computed: {
            classJornada: function(){
                //bg-navy color-palette
                const val = this.jornada.codigo;
                return (val == 'MAT' ?
                                'bg-primary' :
                                    val == 'NOC' ? 'bg-navy' :
                                            val == 'VES' ? 'bg-orange' :
                                                    'bg-purple') + ' color-palette label';
            },
            esHorarioNormal: function(){
                return this.jornada.codigo != 'ESP';
            },
            guardarDisponible: function(){
                return this.maxMaterias == _.filter(this.docentes_seleccionados, function(item){return item != null;}).length;
            },
            creacionHorario: function(){
                return this.maxMaterias == _.toArray(this.grupo_materias_docentes).length;
            }
        },
        components: {
            tabs: VueStrap.tabset,
            tabGroup: VueStrap.tabGroup,
            tab: VueStrap.tab,
            tooltip : VueStrap.tooltip,
            vSelect : VueStrap.select,
            vueTimepicker : VueTimepicker,
            radio : VueStrap.radio,
            buttonGroup : VueStrap.buttonGroup,
            appLoading : Loading,
        },
        route: {
            data: function(transition){
                this.loadData();
                transition.next();
            }
        },
        methods:{
            tabsEnable(idx){
                return (this.jornada.codigo != 'ESP' && idx == 5); //index 5 del dia sabado
            },
            onDropMateria(ev, dia){
                dia.materiaTmp.materia = this.current_materia_to_drop.id;
                //alert('has soltado la materia ' + this.current_materia_to_drop.nombre_materia);
                this.current_materia_to_drop = null;
            },
            onRemoveMateriaDropped(dia){
                dia.materiaTmp.materia = null;
            },
            onDragMateria(ev, item){
                this.current_materia_to_drop = item;
            },
            onMateriaLeave(ev){
                ev.target.classList.remove('enter-item');
                console.log('salio del campo');
            },
            onMateriaEnter(ev){
                ev.target.classList.add('enter-item');
            },
            loadData(){
                this.id_jornada_semestre = this.$route.params.model_id;
                this.loading = true;
                this.$http.get('api/jornadasemestre/' + this.$route.params.model_id + '/horario').then(function(resp){
                    const materias = resp.data.data.catalogo_jornada == 'ESP' ? resp.data.data.materias_especiales_semestre : resp.data.data.materias_normales_semestre;
                    this.materias = [];
                    for(let ma of materias){
                        let materia = ma;
                        materia.total = "00:00";
                        this.materias.push(materia);
                    }
                    this.maxMaterias = materias.length;
                    this.initDocentesSeleccionados(materias);
                    this.semestre = resp.data.data.semestre;
                    this.aula = resp.data.data.aula;
                    this.ciclo = resp.data.data.descripcion_ciclo;
                    this.jornada = resp.data.data.jornada;
                    this.grupo_materias_docentes = _.groupBy(resp.data.materias_docentes_disponibles, 'nombre_materia');
                    this.horas_limite = {min: this.jornada.aux1, max: this.jornada.aux2};
                    this.formateaListaMaterias(materias);
                    this.formateaDocenteMaterias(resp.data.materias_docentes_disponibles); //formate la data de docentes y materias anidados
                    this.loading = false;
                }, fnc.tryError);
            },
            initDocentesSeleccionados(data){
                for(let i in data){
                    this.docentes_seleccionados.push(null);
                }
            },
            addMateria(idxDia){

                const materias = this.horario[idxDia].materias;

                if(materias.length > 0){

                    const hMax = parseInt(this.horas_limite.max.replace(':', ''));
                    const {HH, mm} = this.horario[idxDia].materias[materias.length-1].hasta;
                    const hCurrent = parseInt(HH + mm);

                    if(hMax == hCurrent){
                        alert('No se puede agregar más registros, ya se completaron las horas para este día!');
                    }else {
                        //se lo hace de esta manera para evitar el bindeo y solo hacer la asignacion de valores y no referencial
                        this.horario[idxDia].materiaTmp.desde.HH = this.horario[idxDia].materias[materias.length - 1].hasta.HH;
                        this.horario[idxDia].materiaTmp.desde.mm = this.horario[idxDia].materias[materias.length - 1].hasta.mm;
                        this.horario[idxDia].materiaTmp.materia = null;
                        this.horario[idxDia].modoAgregar = true;
                    }
                }else{
                    this.clearMateria(idxDia);
                    this.horario[idxDia].modoAgregar = true;
                }

            },
            saveMateria(idxDia){
                const tmp = this.horario[idxDia].materiaTmp;
                const ini = parseInt(tmp.desde.HH + tmp.desde.mm);
                const fin = parseInt(tmp.hasta.HH + tmp.hasta.mm);
                const hMax = parseInt(this.horas_limite.max.replace(':', ''));

                if(fin > ini && fin <= hMax){
                    if(tmp.materia != null){
                        const noExist = _.findIndex(this.horario[idxDia].materias, {materia : tmp.materia});
                        if(noExist < 0){
                            this.horario[idxDia].materias.push({
                                materia: tmp.materia,
                                desde: tmp.desde,
                                hasta: tmp.hasta,
                                total: fnc.restarHoras(`${tmp.desde.HH}:${tmp.desde.mm}`, `${tmp.hasta.HH}:${tmp.hasta.mm}`)
                            });
                            //agregar el calculo de horas
                            this.actualizaCalculoMaterias(tmp.materia);
                            //fin de agregar el calculo al total
                            this.horario[idxDia].modoAgregar = false;
                            this.clearMateria(idxDia);
                        }else{
                            alert('Materia ya registrada, por favor seleccione otra!');
                        }

                    }else{
                        alert('Debe seleccionar una materia!');
                    }
                }else{
                    alert('Debe ingresar una hora mayor a la de inicio y que no pase de ' + this.horas_limite.max);
                }
            },
            clearMateria(idxDia){
                const ini = this.horas_limite.min.split(':');
                this.horario[idxDia].materiaTmp = {
                    materia:null,
                    desde:{HH: ini[0], mm:ini[1]},
                    hasta:{HH:'', mm:''}
                };
            },
            deleteMateria(idxDia, idxRow){
                if(confirm('Atención, sí existen registros despúes de este, serán eliminados. ¿Estás seguro? ')){
                    this.horario[idxDia].materias.splice(idxRow, 99);//elimida desde el indice hasta el 99 si existe
                }
            },
            formateaDocenteMaterias(data){
                this.lista_docentes_materias = [];
                for(let idx in data){
                    const {abreviatura, nombres, apellidos, semestre, id_materia, ciclo_materia_docente, nombre_materia, codigo_materia} = data[idx];
                    this.lista_docentes_materias.push({
                        value: {ciclo_materia_docente, codigo_materia, id_materia},
                        label: `${codigo_materia} - ${nombres} ${apellidos}`
                    });
                }
            },
            formateaListaMaterias(data){
                this.lista_materias = [];
                for(let idx in data){
                    const {nombre_materia, id, codigo_materia} = data[idx];
                    this.lista_materias.push({
                        value: id,
                        label: `${codigo_materia} - ${nombre_materia}`
                    });
                }
            },
            getNombreMateria(idMateria){
                if(this.lista_materias.length > 0){
                    return _.filter(this.lista_materias, {value: idMateria})[0].label;
                }
                return idMateria;
            },
            onChangeDocentesSelect(action){
                console.log(action);
            },
            actualizaCalculoMaterias: function(idMateria){
                const idxMat = _.findIndex(this.materias, {id: idMateria});
                let hora = '00:00';
                for(let dia of this.horario){
                    for(let mat of dia.materias){
                        if(typeof mat.materia !== 'undefined'){
                            if(mat.materia == idMateria){
                                hora = fnc.sumarHoras(hora, mat.total);
                            }
                        }
                    }
                }
                this.materias[idxMat].total = hora;
            },
            guardarHorario(){

                let dataToSend = [];
                for(let dia of this.horario){
                    for(let materia of dia.materias){
                        dataToSend.push({
                            ciclo_materia_docente: _.filter(this.docentes_seleccionados, {id_mat:materia.materia})[0].id_cmd,
                            ciclo_jornada_semestre: this.id_jornada_semestre,
                            dia: dia.name,
                            hora_inicio: `${materia.desde.HH}:${materia.desde.mm}`,
                            hora_fin: `${materia.hasta.HH}:${materia.hasta.mm}`
                        });
                        console.log(dataToSend, 'data a enviar');
                    }
                }

                this.$http.post('api/jornadasemestre/' + this.$route.params.model_id + '/horario', {horario: dataToSend}).then(function(resp){
                    console.log(resp);
                    fnc.niceAlert('info', 'Se envia a guardar los datos');
                }, fnc.tryError);

                /*
                 ciclo_materia_docente
                 ciclo_jornada_semestre
                 dia
                 hora_inicio
                 hora_fin
                 */
            }

        }
    }

</script>

