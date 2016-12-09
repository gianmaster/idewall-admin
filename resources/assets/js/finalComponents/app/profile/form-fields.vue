<template>

    <div class="col-xs-12 col-sm-4 col-md-3">
        <label for="avatar">Avatar / Imagen de perfil</label>
        <template v-if="dataModel.avatar !== ''">
            <img :src="dataModel.avatar" alt="Avatar" class="profile-ima-edit">
        </template>
        <input class="form-control" type="file" id="avatar" @change="onFileChange">
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
        <label>Nueva Contraseña</label><small>(No obligtorio)</small>
        <input type="password" class="form-control" v-model="dataModel.password">
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

    export default {
        components: {
            'select-list': selectList
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
            initModel (){
                return {
                    name: null,
                    email: null,
                    password: null,
                    id: null,
                    state: null,
                    rol: null,
                    avatar: null
                }
            },
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file) {
                var image = new Image();
                var reader = new FileReader();
                var vm = this;

                reader.onload = (e) => {
                    vm.dataModel.avatar = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            removeImage (e) {
                console.log('entra a eliminar el avatar');
                this.dataModel.avatar = '';
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