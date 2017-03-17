<template>
    <div class="row">
        <form action="" @submit.prevent="update">

            <form-inputs :data-model.sync="newModel" :url="urlAvatar"></form-inputs>

        </form>
    </div>
</template>

<script>
    import inputs from './form-fields.vue';
    import {urlUsuarios, urlAvatar} from '../config';
    import fnc from '../../../util/reusable_functions';

    export default {
        data(){
            return {
                createMode: true,
                newModel: {},
                url: urlUsuarios,
                urlAvatar: urlAvatar
            }
        },
        components: {
            'form-inputs': inputs
        },
        methods: {
            update: function(){
                this.$http.put(this.url + '/' + this.newModel.id, this.newModel).then(function(resp){
                    fnc.niceAlert('success', 'Se modificó tu perfil correctamente!');
                    this.$router.go('/');
                }, fnc.tryError);
            }
        }
    }
</script>