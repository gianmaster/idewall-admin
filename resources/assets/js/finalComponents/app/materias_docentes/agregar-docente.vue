<template>
    <div class="col-xs-12">
        <label>Docente Disponible</label>
        <select-list class-name="form-control col-xs-6" :select-value.sync="docenteSeleccionado" value-key="codigo" label-key="descripcion" :url="urlDocentesDisponibles" :is-required="true"></select-list>
    </div>
</template>
<script>
    import {urlDocentesDisponibles} from '../config'
    import selectList from '../../reusable/select-list.vue';

    export default {
        name: 'agregar-docente-form',
        props: ['docenteSeleccionado'],
        components: {
            'select-list': selectList
        },
        data () {
            return {
                urlDocentesDisponibles: urlDocentesDisponibles
            }
        }
    }
</script>