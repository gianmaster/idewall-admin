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
                    <table class="table table-bordered">
                        <tr v-for="dist in distributivos">
                            <td class="td-valign text-center">{{dist.nombre}}</td>
                            <td colspan="2">
                                <table v-if="dist.items.length > 0">
                                    <tr v-for="item in dist.items">
                                        <td colspan="2">
                                            <span class="__is_draggable" draggable="true">{{item.nombre}}</span>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div><!-- /.box-body -->
                <div class="box-footer" @dragover.prevent @drop="onDropDistributivo">
                    <p class="text-green">Arrastre <code><i class="fa fa-arrows"></i></code> el tipo de distributivo</p>
                    <hr>
                    <div class="form-group">
                        <label for="otro"><span class="text-primary">Descripción </span><span class="text-red">"OTRO"</span></label>
                        <input class="form-control" type="text" name="otro" id="otro" placeholder="Ingrese la definición de el item modificable" v-model="otros">
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

                    <table class="table table-bordered">
                        <tbody>
                        <template v-for="elem in horario">
                            <tr v-if="elem.tipo=='jornada'">
                                <td colspan="7" class="td-formato">
                                    <strong>{{elem.filas}}</strong>
                                </td>
                            </tr>
                            <tr v-if="elem.tipo=='head'">
                                <td v-for="cab in elem.filas" class="td-formato">
                                    <strong>{{cab}}</strong>
                                </td>
                            </tr>
                            <tr v-if="elem.tipo=='hora'">
                                <td class="td-formato"><strong>{{elem.hora}}</strong></td>
                                <td class="td-formato" v-for="item in elem.filas">{{item.texto}}</td>
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

    .td-formato{
        text-align: center;
        vertical-align: middle !important;
    }

    .table-container{
        height: 600px;
        overflow: auto;
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
    .enter-item{
        border: 2px dashed #279664;
    }

</style>
<script>

    const CABECERA = ['HORA', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO'];

    import Loading from '../../../reusable/loading.vue';
    import fnc from '../../../../util/reusable_functions';

    export default{
        name: 'horarioDocente',
        data(){
            return{
                otros:'',
                loadingDocente: true,
                loadingDistributivos: true,
                tipoDistributivos: [
                    'item 1',
                    'item 2',
                    'item 3',
                    'item 4',
                    'item 5'
                ],
                urlDistributivos: 'api/tipodistributivo/all',
                urlCicloDocente: 'api/ciclodocente',
                distributivos: [],
                docente: {},
                horario: [
                    {tipo: 'jornada', filas: 'MATUTINA'},
                    {tipo: 'head', filas: CABECERA},
                    {tipo: 'hora', hora: '07:30 - 08:00', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},
                    {tipo: 'hora', hora: '08:00 - 08:30', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},
                    {tipo: 'hora', hora: '08:30 - 09:00', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},
                    {tipo: 'hora', hora: '09:00 - 09:30', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},
                    {tipo: 'hora', hora: '09:30 - 10:00', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},
                    {tipo: 'hora', hora: '10:00 - 10:30', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},
                    {tipo: 'hora', hora: '10:30 - 11:00', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},
                    {tipo: 'hora', hora: '11:00 - 11:30', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},
                    {tipo: 'hora', hora: '11:30 - 11:30', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},
                    {tipo: 'hora', hora: '12:00 - 12:30', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},

                    {tipo: 'jornada', filas: 'VESPERTINA'},
                    {tipo: 'head', filas: CABECERA},
                    {tipo: 'hora', hora: '12:30 - 13:00', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},
                    {tipo: 'hora', hora: '13:00 - 13:30', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},
                    {tipo: 'hora', hora: '13:30 - 14:00', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},
                    {tipo: 'hora', hora: '14:00 - 14:30', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},
                    {tipo: 'hora', hora: '14:30 - 15:00', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},
                    {tipo: 'hora', hora: '15:00 - 15:30', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},
                    {tipo: 'hora', hora: '15:30 - 16:00', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},
                    {tipo: 'hora', hora: '16:00 - 16:30', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},
                    {tipo: 'hora', hora: '16:30 - 17:00', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},
                    {tipo: 'hora', hora: '17:00 - 17:30', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},
                    {tipo: 'hora', hora: '17:30 - 18:00', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},
                    {tipo: 'hora', hora: '18:00 - 18:40', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},
                    {tipo: 'hora', hora: '17:30 - 18:00', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},

                    {tipo: 'jornada', filas: 'NOCTURNA'},
                    {tipo: 'head', filas: CABECERA},
                    {tipo: 'hora', hora: '18:00 - 18:40', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},
                    {tipo: 'hora', hora: '18:40 - 19:10', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},
                    {tipo: 'hora', hora: '19:10 - 19:40', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},
                    {tipo: 'hora', hora: '19:40 - 20:10', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},
                    {tipo: 'hora', hora: '20:10 - 20:40', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},
                    {tipo: 'hora', hora: '20:40 - 21:10', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},
                    {tipo: 'hora', hora: '21:10 - 21:40', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},
                    {tipo: 'hora', hora: '21:40 - 22:10', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]},
                    {tipo: 'hora', hora: '22:10 - 22:40', filas: [
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                        {dia: 'LUNES', cod: 1, texto: 'Algo'},
                    ]}
                ]
            }
        },
        /*
         ['07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','18:40','19:10','19:40','20:10','20:40','21:10','21:40','22:10','22:40']
        * */
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
            onDropDistributivo: function(e){
                console.log(e);
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
                    _this.loadingDocente = false;
                }, fnc.tryError);
            },
            loadHorarioDocente: function(){
                console.log('load data');
            },
            load: function(){
                this.loadDistributivos();
                this.loadDocente();
            }
        }

    }
</script>


