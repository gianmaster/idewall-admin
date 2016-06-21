<template>
        <div v-show="show" class="animated alert alert-{{ type }}" :transition="transitionName">
            <button @click="show = !show" type="button" class="close">&times;</span></button>
            <slot>Alerta a la vista</slot>
        </div>
</template>
<style>

</style>
<script>

    export default{
        props:{
            type: {default: 'info'},
            transitionName: { default: 'fade'}
        },
        data(){
            return{
                show: false
            }
        }

    }
</script>