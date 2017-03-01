<template>

    <div class="col-xs-12">
        <div>
            <label>Docente: <span class="__user">{{docente}}</span></label>
            <multiselect
                    :options="listaOpciones"
                    :selected="toSend"
                    :multiple="true"
                    :searchable="true"
                    :clear-on-select="false"
                    placeholder="Seleccione las materias a enviar"
                    :hide-selected="true"
                    label="desc"
                    :close-on-select="true"
                    :max="4"
                    @update="updateMultiSelect"
                    :taggable="true"
                    select-label="Presione enter para seleccionar"
                    deselect-label="Presione enter para remover"
                    :limit-text="templateLimit"
                    key="materia"></multiselect>
            <hr>
            <p class="text-info text-center" style="font-weight: bold;">Esto puedo tardar un poco <i class="fa fa-smile-o"></i></p>

        </div>
    </div>

</template>

<style>

    .__user{
        color: #656464;
    }

</style>

<script type="text/babel">

    import Multiselect from 'vue-multiselect';
    import Mixins from './mixins';

    export default {
        name: 'frm-envio-silabo',
        mixins: [Mixins],
        computed: {
            docente(){
                const {nombres, abreviatura, apellidos} = this.dataModel;
                return `${abreviatura}. ${nombres} ${apellidos}`;
            }
        },
        methods: {
            updateMultiSelect(values){
                this.toSend = values;
            }
        },
        components: {
            'multiselect': Multiselect
        },

        props: {
            toSend: {
                type: Array,
                default: function(){
                    return [];
                }
            },
            listaOpciones: {
                type: Array,
                default: function(){
                    return [];
                }
            },
            dataModel: {
                type: Object,
                required: false,
                default: function(){
                    return {
                        id: null,
                        nombres: null,
                        apellidos: null,
                        abrevatura: null,
                        docente_detail: {}
                    }
                }
            }
        },
        ready(){
            //para la lista de materias en el formulario Modal
        },
        data(){
            return {
                templateLimit: (count) => `y ${count} más`

            }
        }
    }

</script>
