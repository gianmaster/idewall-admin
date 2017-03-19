<template>
    <div class="col-xs-12" v-if="showModal">
        <label v-if="hayDocentesDisponibles()">Docente Disponible <small v-if="docentesDisponibles" class="text-red">(No hay docentes disponibles)</small></label>
        <select-list class-name="form-control col-xs-6" :select-value.sync="docenteSeleccionado" value-key="codigo" label-key="descripcion" :url="urlDocentesDisponibles" :is-required="true"></select-list>
    </div>
</template>
<script>
    import {urlDocentesDisponibles} from '../config'
    import selectList from '../../reusable/select-list.vue';

    export default {
        name: 'agregar-docente-form',
        props: ['docenteSeleccionado', 'showModal'],
        components: {
            'select-list': selectList
        },
        data () {
            return {
                urlDocentesDisponibles: urlDocentesDisponibles,
                docentesDisponibles: false
            }
        },
        methods: {
            hayDocentesDisponibles(){
                this.$http.get(urlDocentesDisponibles).then((resp) => {
                    if(resp.data.data.length>0){
                        this.docentesDisponibles = false;
                    }else{
                        this.docentesDisponibles = true;
                    }
                })

                return true;
            }
        }
    }
</script>
