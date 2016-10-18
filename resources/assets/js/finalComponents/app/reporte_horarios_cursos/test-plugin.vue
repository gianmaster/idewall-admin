<template>

    <div class="row">
        <div class="col-xs-12">
            <h2>Esperando por los plugins</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo ratione rerum aliquam, nisi aut neque nam modi id iure obcaecati iste, placeat voluptatum vitae amet cum doloremque quas unde? Molestias.</p>
            <p>{{msg}}</p>
        </div>
    </div>

</template>

<script>

    import Vuetable from 'vuetable/src/components/Vuetable.vue';
    import VuetablePagination from 'vuetable/src/components/VuetablePagination.vue';
    import VuetablePaginationDropdown from 'vuetable/src/components/VuetablePaginationDropdown.vue';

    export default{
        data: function(){
            return {
                msg: 'hola mundo'
            }
        }
    }

</script>

