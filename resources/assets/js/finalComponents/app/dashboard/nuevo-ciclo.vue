<template>

    <div class="col-xs-12">

        <form @submit.prevent="crearNuevoCiclo">

            <div class="col-sm-3 col-xs-12">
                <label>Año</label>
                <input type="number" min="2016" class="form-control" v-model="dataModel.anio" required>
            </div>

            <div class="col-sm-9 col-xs-12">
                <label>Período <small>(Desde - Hasta)</small></label>
                <div class="input-group">
                    <input type="date" class="form-control" placeholder="Fecha Iniccio" aria-describedby="basic-addon1">
                    <span class="input-group-addon">A</span>
                    <input type="date" class="form-control" placeholder="Fecha Fin" aria-describedby="basic-addon2">
                </div>
            </div>

            <div class="col-xs-12">
                <hr>
                <button type="submit" class="btn btn-flat btn-success"><i class="fa fa-save"></i> GUARDAR</button>
            </div>

        </form>

    </div>

</template>
<script>

    export default {
        name: 'form-crear-ciclo',
        methods: {
            crearNuevoCiclo(){
                console.log('se crear el ciclo');
            }
        }
    }

</script>
<style>

</style>
