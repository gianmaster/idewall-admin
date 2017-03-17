<template>

    <div class="row">
        <div class="col-xs-12">
            <h2>Esperando por los plugins</h2>

            <ul class="list-group">
                <li v-for="item in displayData" track-by="$index" class="list-group-item">
                    <span>{{item.nombre}} {{item.apellidos}} | <i class="fa fa-envelop"></i> {{item.email}} | <i class="fa fa-card"></i> {{item.identificacion}}</span>
                </li>
            </ul>

            <vue-paginator :url="url" :display-data.sync="displayData"></vue-paginator>

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
                url: 'api/v2/data/normal',
                displayData: []
            }
        }
    }

</script>

