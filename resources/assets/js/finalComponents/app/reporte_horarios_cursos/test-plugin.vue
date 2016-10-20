<template>

    <div class="row">
        <div class="col-xs-12">
            <h2>Esperando por los plugins</h2>

            <ul class="list-group">
                <li v-for="item in displayData" class="list-group-item">
                    {{item}}
                </li>
            </ul>

            <vue-paginator :config.sync="configPaginatio" :display-data.sync="displayData"></vue-paginator>

        </div>
        <div class="col-xs-12">
            <pre>
                {{$data | json}}
            </pre>
        </div>
    </div>

</template>

<script>

    import vuePaginator from './vue-paginator.vue';

    export default{
        name: 'test-paginator',
        components:{
            vuePaginator
        },
        data: function(){
            return {
                displayData: [],
                configPaginatio:{
                    data: [12,58,5,3,5,8,1,6,554,6,24,5,5,54,5, 'hola', 'prueba', 36]
                }

            }
        }
    }

</script>

