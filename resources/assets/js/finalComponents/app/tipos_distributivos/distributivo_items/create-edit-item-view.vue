<template>
    <div class="col-xs-12" v-if="currentDistributivo.items.length > 0">
        <table class="table table-striped" v-if="mode == 'list'">
            <thead>
                <tr>
                    <td class="text-center"><strong>ID</strong></td>
                    <td class="text-center"><strong>Nombre</strong></td>
                    <td class="text-center"><strong>Orden</strong></td>
                    <td class="text-center"><strong>Modificable</strong></td>
                    <td class="text-center"><strong>Activo</strong></td>
                    <td colspan="2" class="text-center"><strong>Opciones</strong></td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in currentDistributivo.items">
                    <td class="text-center">{{row.id}}</td>
                    <td class="text-center">{{row.nombre}}</td>
                    <td class="text-center">{{row.orden}}</td>
                    <td class="text-center">{{row.modificable==1?'SI':'NO'}}</td>
                    <td class="text-center">{{row.activo==1?'SI':'NO'}}</td>
                    <td colspan="2" class="text-center">
                        <button class="btn btn-warning btn-xs" @click.prevent="updateMode(row)"><i class="fa fa-pencil"></i> Editar</button>

                        <button class="btn btn-danger btn-xs" @click.prevent="deleteItem(row)"><i class="fa fa-trash"></i> Eliminar</button>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="7">
                        <button class="btn btn-primary" @click.prevent="createMode(currentDistributivo)"><i class="fa fa-plus"></i> Añadir</button>
                    </td>
                </tr>
            </tfoot>
        </table>

        <div v-if="mode != 'list'">

            <div class="col-xs-12">
                <h3 class="text-blue">{{mode=='create'?'Agregar Item':'Modificación de Item'}}</h3>
                <hr>
            </div>

            <formulario :data-model.sync="model" :mode.sync="mode"></formulario>

        </div>

    </div>

    <div class="col-xs-12" v-else>
        <div v-if="mode == 'list'">
            <div class="alert alert-info">
                <p>
                    No hay registros para el tipo distributivo <strong>{{currentDistributivo.nombre}}</strong>
                </p>
            </div>
            <button class="btn btn-primary" @click.prevent="createMode(currentDistributivo)"><i class="fa fa-plus"></i> Añadir</button>
        </div>
        <div v-else>
            <formulario :data-model.sync="model" :mode.sync="mode"></formulario>
        </div>

    </div>
</template>
<style>

</style>
<script>

    import formulario from './form-fields.vue';

    export default{
        components: {
            formulario: formulario
        },
        props: {
            currentDistributivo: {
                type: Object,
                required: true
            }
            /*
             currentDistributivo: {
             id: null,
             nombre: '',
             },
             */
        },
        data(){
            return{
                model: {
                    activo: 1,
                    id: null,
                    id_distributivo: null,
                    modificable: 0,
                    nombre: '',
                    orden: 0
                },
                mode: 'list' //edit, create, 'list'
            }
        },
        methods: {
            clearModel: function(distributivo){
                this.model = {
                    activo: 1,
                    id: null,
                    id_distributivo: distributivo.id,
                    modificable: 0,
                    nombre: '',
                    orden: 0
                }
            },
            updateMode: function(model){
                this.model = model;
                this.mode = 'edit';
            },
            createMode: function(distributivo){
                this.clearModel(distributivo);
                this.mode = 'create';
            },
            deleteItem: function(model){
                console.log(model);
                alert('Se borra este item ' + model.nombre);
            }
        }

    }
</script>