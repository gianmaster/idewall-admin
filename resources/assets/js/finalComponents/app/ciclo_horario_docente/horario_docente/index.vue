<template>
    <div v-if="loading">
        <app-loading></app-loading>
    </div>
    <div v-else>
        <div class="col-xs-12 col-sm-4">
            <!-- Cuadro de asignacion de distributivos -->
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title"><i class="fa fa-book"></i> Horas Docente <small>Semanales</small></h3>
                    <div class="box-tools pull-right">
                        <a v-link="{path:'/horariosdocentes'}" class="btn btn-default btn-xs"><i class="fa fa-reply"></i> Volver</a>
                        <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i></button>
                    </div><!-- /.box-tools -->
                </div><!-- /.box-header -->
                <div class="box-body">
                    <p v-for="item in tipoDistributivos" class="__is_draggable" draggable="true">
                        {{item}}
                    </p>
                </div><!-- /.box-body -->
                <div class="box-footer" @dragover.prevent @drop="onDropDistributivo">
                    <p class="text-green">Arrastre el tipo de distributivo</p>
                </div>
            </div><!-- /.box -->
        </div>

        <div class="col-xs-12 col-sm-8">
            <!-- Cuadro de asignacion del horarion -->
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">Docente Fulanito de tal, con cedula 66585522566, periodo 2016-2017 cilco 2</h3>
                    <div class="box-tools pull-right">
                        <!-- Buttons, labels, and many other things can be placed here! -->
                        <!-- Here is a label for example -->
                        <span><i class="fa fa-clock-o"></i> Otro dato</span>
                        <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i></button>
                    </div><!-- /.box-tools -->
                </div><!-- /.box-header -->
                <div class="box-body">

                    <table>
                        <th>
                        <td>LUNES</td>
                        <td>MARTES</td>
                        <td>MIERCOLES</td>
                        <td>JUEVES</td>
                        <td>VIERNES</td>
                        <td>SABADO</td>
                        </th>
                        <tr>
                            <td>Asignacion</td>
                            <td>Asignacion</td>
                            <td>Asignacion</td>
                            <td>Asignacion</td>
                            <td>Asignacion</td>
                            <td>Asignacion</td>
                        </tr>
                        <tr>
                            <td>Asignacion</td>
                            <td>Asignacion</td>
                            <td>Asignacion</td>
                            <td>Asignacion</td>
                            <td>Asignacion</td>
                            <td>Asignacion</td>
                        </tr>
                    </table>

                </div><!-- /.box-body -->

            </div><!-- /.box -->
        </div>
    </div>
</template>
<style>



</style>
<script>

    import Loading from '../../../reusable/loading.vue';
    import fnc from '../../../../util/reusable_functions';

    export default{
        data(){
            return{
                msg:'hello vue',
                loading: true,
                tipoDistributivos: [
                    'item 1',
                    'item 2',
                    'item 3',
                    'item 4',
                    'item 5'
                ],
                urlDistributivos: 'api/tipodistributivo/all'
            }
        },
        components: {
            appLoading: Loading
        },
        ready: function(){
            this.loading = false;
        },
        methods: {
            onDropDistributivo: function(e){
                console.log(e);
            },
            loadDistributivos: function(){
                let _this = this;
                this.$http.get(this.urlDistributivos).then(function(resp){
                    _this.distributivos = resp.data.data;
                }, fnc.tryError);
            }
        }

    }
</script>