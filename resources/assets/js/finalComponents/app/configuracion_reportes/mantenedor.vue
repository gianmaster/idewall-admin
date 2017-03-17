<template>
    <loading-app v-if="loading===true"></loading-app>
    <div class="row" v-else>
        <form action="" @submit.prevent="update">

            <div class="col-xs-12">
                <label>Facultad</label>
                <input type="text" class="form-control" v-model="model.cabecera" minlength="3" required>
            </div>

            <div class="col-xs-12">
                <label>Carrera</label>
                <input type="text" class="form-control" v-model="model.pie" minlength="6" required>
            </div>

            <div class="col-xs-12">
                <label>Aprobador</label>
                <input type="text" class="form-control" v-model="model.director_carrera" minlength="6" required>
            </div>

            <div class="col-xs-12">
                <label>Responsable</label>
                <input type="text" class="form-control" v-model="model.elaborador" minlength="6" required>
            </div>

            <div class="col-xs-12">
                <div class="content">
                    <button class="btn btn-warning btn-flat" type="submit"><i class="fa fa-save"></i> GUARDAR CAMBIOS</button>
                    <a v-link="{path: '/'}" class="btn btn-default btn-flat"><i class="fa fa-reply"></i> Dashboard</a>
                </div>
            </div>

        </form>
    </div>
</template>
<script type="text/babel">

    import {urlConfigReportes} from '../config';
    import fnc from '../../../util/reusable_functions';

    export default {
        name: 'config-reportes',
        ready(){
            this.load();
        },
        data (){
            return {
                loading: false,
                url: urlConfigReportes,
                model: {}
            }
        },
        methods: {
            load: function(){
                this.loading = true;
                this.$http.get(this.url).then(function(resp){
                    this.loading = false;
                    this.model = resp.data.data;
                }, fnc.tryError)
            },
            update: function(){
                console.log(this.model);
                this.$http.put(this.url + '/' + this.model.id, this.model).then(function(resp){
                    fnc.niceAlert('success', 'Se modificaron correctamente los parametros del reporte!');
                }, fnc.tryError);
            }
        }
    }
</script>