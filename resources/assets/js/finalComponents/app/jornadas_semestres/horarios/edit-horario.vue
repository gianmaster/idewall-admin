<template>

    <div class="row">
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
                        <small>Cod: {{item.codigo_materia}} - <i>{{item.horas}}Horas</i></small>
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
                                            <span style="font-size: 1.26em;">
                                                {{dia.materiaTmp.desde.HH}}:{{dia.materiaTmp.desde.mm}}
                                            </span>
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

                            <div v-for="(key, row) in grupo_materias_docentes">
                                <h5 class="text-green">{{key}}</h5>
                                <button-group :value.sync="docentes_seleccionados[$index]" type="info" buttons="false">
                                    <radio v-for="item in row" :value="item.ciclo_materia_docente">{{item.nombres}} {{item.apellidos}}</radio>
                                </button-group>

                            </div>

                            <hr>
                            <button class="btn btn-success">GUARDAR</button>
                            
                        </tab>
                    </tabs>

                </div><!-- /.box-body -->

            </div><!-- /.box -->
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
                        materias: [/*
                            {
                                materia: 1,
                                desde: {HH: '18', mm: '40'},
                                hasta: {HH: '20', mm: '00'}
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
                        materias: [],
                        materiaTmp:{},
                        modoAgregar: false,
                        materiasDisponible: []
                    },
                    {
                        title: 'Miércole',
                        materias: [],
                        materiaTmp:{},
                        modoAgregar: false,
                        materiasDisponible: []
                    },
                    {
                        title: 'Jueves',
                        materias: [],
                        materiaTmp:{},
                        modoAgregar: false,
                        materiasDisponible: []
                    },{
                        title: 'Viernes',
                        materias: [],
                        materiaTmp:{},
                        modoAgregar: false,
                        materiasDisponible: []
                    },
                    {
                        title: 'Sábado',
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
                docentes_seleccionados:[]
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
            buttonGroup : VueStrap.buttonGroup
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
                this.loading = true;
                this.$http.get('api/jornadasemestre/' + this.$route.params.model_id + '/horario').then(function(resp){
                    const materias = resp.data.data.catalogo_jornada == 'ESP' ? resp.data.data.materias_especiales_semestre : resp.data.data.materias_normales_semestre;
                    this.materias = materias;
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
                                hasta: tmp.hasta
                            });
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
                    const {abreviatura, nombres, apellidos, semestre, ciclo_materia_docente, nombre_materia, codigo_materia} = data[idx];
                    this.lista_docentes_materias.push({
                        value: {ciclo_materia_docente, codigo_materia},
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
            }
        }
    }

</script>



