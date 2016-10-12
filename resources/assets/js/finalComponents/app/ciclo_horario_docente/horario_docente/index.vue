<template>
    <div v-if="loading">
        <app-loading></app-loading>
    </div>

    <div v-else>

        <div class="col-xs-12" v-if="global_horas > horasContrato">
            <div class="alert alert-danger">
                <p>
                    <strong>Advertencia:</strong> Há excedido el total de horas según el tipo de contrato del docente. <code>{{docente.docente_detail.tipo_contrato}} - {{docente.docente_detail.tipo_contrato == 'TIEMPO_COMPLETO' ? 40 : 20}}h</code>
                </p>
            </div>
        </div>



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
                                        <td colspan="2" width="95%">
                                            <span v-if="item.id==1" class="my_disabled">{{item.nombre}}</span><!-- No dejar arrastrar materias -->
                                            <span v-else class="__is_draggable" draggable="true" @drag="onDragDistributivo($event, item)">{{item.nombre}}</span>
                                        </td>
                                        <td width="5%">
                                            <span class="text-green"> {{item.horas}}</span>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center" colspan="3">
                                <strong>TOTAL HORAS</strong> <span class="text-green pull-right"> {{global_horas}}</span>
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
                    <h4 class="box-title"><i class="fa fa-user"></i> {{docente.docente_detail.abreviatura}} {{docente.docente_detail.nombres}} {{docente.docente_detail.apellidos}}</h4>


                    <div class="box-tools pull-right">
                        <small><strong>ID:</strong>{{docente.docente_detail.identificacion}} <strong>Contrato:</strong>{{docente.docente_detail.tipo_contrato}} <strong>Período: </strong> <span class="text-green">{{docente.ciclo_detail.anio}}-{{docente.ciclo_detail.anio +1}} C{{docente.ciclo_detail.ciclo}}</span></small>
                        <!-- Buttons, labels, and many other things can be placed here! -->
                        <!-- Here is a label for example -->
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

                <div class="box-footer">
                    <div class="col-xs-12">
                        <hr>
                        <button class="btn btn-success pull-right" @click="saveHorarioDocente"><i class="fa fa-save"></i> GUARDAR CAMBIOS</button>
                    </div>
                </div>

            </div><!-- /.box -->
        </div>
    </div>
</template>
<style scoped>

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

    const CABECERA = ['HORA', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO'];

    export default{
        name: 'horarioDocente',
        data(){
            return{
                descripcionOtro:'',
                loading: true,
                url: 'api/horariomateriasdocente',
                urlSubmit: '',
                distributivos: [],
                docente: {},
                horario_materias: [],
                horario: [
                    {tipo: 'jornada', filas: 'MATUTINA'},
                    {tipo: 'head', filas: CABECERA},
                    {tipo: 'hora', hora: '07:30 - 08:00', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]},
                    {tipo: 'hora', hora: '08:00 - 08:30', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]},
                    {tipo: 'hora', hora: '08:30 - 09:00', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]},
                    {tipo: 'hora', hora: '09:00 - 09:30', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]},
                    {tipo: 'hora', hora: '09:30 - 10:00', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]},
                    {tipo: 'hora', hora: '10:00 - 10:30', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]},
                    {tipo: 'hora', hora: '10:30 - 11:00', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]},
                    {tipo: 'hora', hora: '11:00 - 11:30', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]},
                    {tipo: 'hora', hora: '11:30 - 11:30', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]},
                    {tipo: 'hora', hora: '12:00 - 12:30', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]},

                    {tipo: 'jornada', filas: 'VESPERTINA'},
                    {tipo: 'head', filas: CABECERA},
                    {tipo: 'hora', hora: '12:30 - 13:00', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]},
                    {tipo: 'hora', hora: '13:00 - 13:30', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]},
                    {tipo: 'hora', hora: '13:30 - 14:00', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]},
                    {tipo: 'hora', hora: '14:00 - 14:30', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]},
                    {tipo: 'hora', hora: '14:30 - 15:00', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]},
                    {tipo: 'hora', hora: '15:00 - 15:30', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]},
                    {tipo: 'hora', hora: '15:30 - 16:00', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]},
                    {tipo: 'hora', hora: '16:00 - 16:30', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]},
                    {tipo: 'hora', hora: '16:30 - 17:00', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]},
                    {tipo: 'hora', hora: '17:00 - 17:30', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]},
                    {tipo: 'hora', hora: '17:30 - 18:00', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]},

                    {tipo: 'jornada', filas: 'NOCTURNA'},
                    {tipo: 'head', filas: CABECERA},
                    {tipo: 'hora', hora: '18:00 - 18:40', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]},
                    {tipo: 'hora', hora: '18:40 - 19:10', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]},
                    {tipo: 'hora', hora: '19:10 - 19:40', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]},
                    {tipo: 'hora', hora: '19:40 - 20:10', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]},
                    {tipo: 'hora', hora: '20:10 - 20:40', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]},
                    {tipo: 'hora', hora: '20:40 - 21:10', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]},
                    {tipo: 'hora', hora: '21:10 - 21:40', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]},
                    {tipo: 'hora', hora: '21:40 - 22:10', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]},
                    {tipo: 'hora', hora: '22:10 - 22:40', filas: [
                        {dia: 'LUNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MARTES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'MIERCOLES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'JUEVES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'VIERNES', cod: 0, cod_padre: 0, label: 'Vacío', bloq: false},
                        {dia: 'SABADO', cod: 0, cod_padre: 0, label: 'Vacío', bloq: true},
                    ]}
                ],
                tmpDistributivo: {},
                global_horas: 0
            }
        },
        computed: {
            horasContrato: function(){
                return this.docente.docente_detail.tipo_contrato == 'TIEMPO_COMPLETO' ? 40 : 20;
            }
        },
        components: {
            appLoading: Loading
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
                    this.calculaHorasDistributivos();
                }
            },
            onDistributivoLeave: function(e){
                e.target.classList.remove('enter-item-h');
            },
            onDistributivoEnter: function (e) {
                e.target.classList.add('enter-item-h');
            },
            loadHorarioDocente: function(){
                console.log('load data');
            },
            load: function(){
                this.loading = true;
                let _this = this;
                this.$http.get(`${this.url}/${this.$route.params.model_id}`).then(function(resp){
                    _this.docente = resp.data.ciclo_docente;
                    _this.horario_materias = resp.data.horario_materias;
                    //_this.distributivos = this.formatoDistributivos(resp.data.distributivos);
                    _this.formatoDistributivos(resp.data.distributivos);
                    _this.horarioMaterias();
                    _this.inicializaTotalHoras();
                    _this.calculaTotalGlobalHoras();
                    _this.loading = false;
                }, fnc.tryError);
            },
            formatoDistributivos: function(data){
                let distributivos = [];
                for(let dist of data){
                    for(let item of dist.items){
                        item['horas'] = 0;
                    }
                    distributivos.push(dist);
                }
                this.$set('distributivos', distributivos);// distributivos;
            },
            inicializaTotalHoras: function(){
                for(let dist of this.distributivos){
                    for(let item of dist.items){
                        //console.log(item);
                        //item.$set('horas', 0);
                        if(item.id == 1){//solo entra para materias, OJO ID 1 es materias
                            for(let mat of this.horario_materias){
                                item.horas = item.horas + parseFloat(mat.num_horas);
                                //item.$set('horas', item.$get('horas') + mat.num_horas);
                            }
                        }
                    }
                }
            },
            calculaHorasDistributivos: function(){
                for(let dist of this.distributivos){
                    for(let item of dist.items){
                        if(item.id != 1){ //se omite el id 1, ya que es el de materias, y ya debe estar calculado
                            item.horas = 0;
                            for(let hor of this.horario){
                                if(hor.tipo == 'hora'){
                                    for(var row of hor.filas){ //si el id corresponde
                                        if(row.cod == item.id){
                                            item.horas += 0.5;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                
                this.calculaTotalGlobalHoras();
            },
            calculaTotalGlobalHoras: function(){
                this.global_horas = 0;
                for(let dist of this.distributivos){
                    for(let item of dist.items){
                        this.global_horas += item.horas;
                    }
                }
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
                                    //if ((hIni >= ini && ini <= hFin) || (hIni >= fin && fin <= hFin)) {
                                    if (ini <= hIni && fin >= hIni) {
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
            },
            saveHorarioDocente : function(){
                let flagSubmit = true;
                if(this.global_horas > this.horasContrato){
                    if(confirm('Las horas asignadas pasan el número de horas según el contrato del docente, ¿Quieres continuar de todos modos?')){
                        flagSubmit = true;
                    }else{
                        flagSubmit = false;
                    }
                }

                if(flagSubmit){
                    let listaHorario = this.generateDataHorario();
                    console.log(listaHorario);

                    if(listaHorario.length > 0){
                        /*
                        this.$http.post(this.urlSubmit, {
                            horario: listaHorario,
                            texto_otro: this.descripcionOtro
                        }).then(function(){
                            console.log('todo ok');
                        }, fnc.tryError);
                        */
                        console.log(listaHorario);
                    }else{
                        alert('No se han asignado cargas al horario');
                    }
                    
                }

            },
            generateDataHorario: function(){
                let dataHorario = [];
                for(let item of this.horario){
                    if(item.tipo == 'hora'){
                    let hora = item.hora.split(' - ');                        
                        for(let row of item.filas){
                            if(row.cod > 0){
                                let flagFound = false;
                                for(let horario of dataHorario){
                                    if(horario.dia == row.dia && horario.cod == row.cod && horario.hora_fin == hora[0]){//si hora incio de la lista es igual a la hora fin del dia evaluado
                                    console.log(horario.hora_fin, hora[0], 'entra');
                                        horario.hora_fin = fnc.sumarHoras(horario.hora_fin, '00:30');
                                        horario.num_horas = horario.num_horas + 0.5;
                                        flagFound = true;
                                        if(horario.hora_fin == '18:30'){
                                            horario.hora_fin = '18:40'; //se hace esto xq brinca 10 el horario en jornada nocturna
                                        }
                                    }
                                }
                                if(!flagFound){
                                    let etiqueta = row.label == 'OTRO' ? this.descripcionOtro == '' ? 'OTRO' : row.label : row.label;
                                    dataHorario.push({
                                        ciclo_docente: this.docente.id,
                                        dia: row.dia, 
                                        cod: row.cod, 
                                        hora_inicio: hora[0], 
                                        hora_fin: hora[1], 
                                        label: etiqueta,
                                        num_horas: 0.5
                                    });
                                }
                            }
                        }
                    }
                }

                return dataHorario;
            }
        }

    }
</script>


