<template>

    <div class="col-xs-12 col-sm-4 col-md-3">
        <image-upload
            :class="['pure-button','pure-button-primary','js-btn-crop']"
            :crop="false" :url="url + '/' + dataModel.id"
            extensions="png,gif,jpeg,jpg">
        </image-upload>
    </div>

    <div class="col-sm-6 col-xs-12">
        <label>Nombre Completo</label>
        <input type="text" class="form-control" v-model="dataModel.name" minlength="3" required>
        <input type="hidden" class="form-control" :value="dataModel.id">
    </div>

    <div class="col-sm-6 col-xs-12">
        <label>Correo Electrónico</label>
        <input type="email" class="form-control" v-model="dataModel.email" required>
    </div>

    <div class="col-sm-6 col-xs-12">
        <label>Avatar</label>
        <input type="url" class="form-control" placeholder="http://igmbur.com/user/profile.png" v-model="dataModel.avatar">
    </div>

    <div class="col-xs-12">
        <div class="content">
            <button class="btn btn-warning btn-flat" type="submit"><i class="fa fa-save"></i> GUARDAR CAMBIOS</button>
            <a v-link="{path: '/'}" class="btn btn-default btn-flat"><i class="fa fa-reply"></i> Ir al Dashboard</a>
        </div>
    </div>
</template>

<style>
    .profile-ima-edit{
        width: 200px;
        height: 200px;
        border-radius: 50%;
        margin-right: 10px;
        margin-top: -2px;
    }
</style>

<script>

    import selectList from '../../reusable/select-list.vue';
    import ImageUpload from 'vue-core-image-upload';

    export default {
        components: {
            'select-list': selectList,
            'image-upload': ImageUpload
        },
        created(){
            const { profile } = this.$parent.$parent.$parent.$parent;
            this.dataModel = profile;
        },
        data(){
            return {
                msg: 'todo ok'
            }
        },
        methods: {
            initModel: function(){
                return {
                    name: null,
                    email: null,
                    password: null,
                    id: null,
                    state: null,
                    rol: null,
                    avatar: null
                }
            }
        },
        props: {
            url: {
                type: String,
                required: true
            },
            dataModel: {
                type: Object,
                required: false,
                default: function(){
                    return {
                        name: null,
                        email: null,
                        password: null,
                        id: null,
                        state: null,
                        rol: null,
                        avatar: null
                    }
                }
            }
        }
    }
</script>
