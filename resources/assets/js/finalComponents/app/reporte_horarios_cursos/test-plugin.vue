<template>

    <div class="row">
        <div class="col-xs-12">
            <h2>Esperando por los plugins</h2>
            <div class="">
                <table>
                    <thead>
                    <tr>
                        <th>Campo 1</th>
                        <th>Campo 1</th>
                        <th>Campo 1</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Item 1</td>
                        <td>Item 2</td>
                        <td>Item 3</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div :class="classDom.container">
                <template v-if="data.length>0">
                    <ul :class="classDom.ul">
                        <li :class="classDom.li" v-on:click="clickPaginator('first', false)">{{{templateDom.first}}}</li>
                        <li :class="classDom.li" v-on:click="clickPaginator('prev', false)">{{{templateDom.prev}}}</li>
                        
                        <li :class="classDom.li" v-on:click="clickPaginator('item', false, num)" v-for="num in config.data">
                            {{{renderNum(num)}}}
                        </li>

                        <li :class="classDom.li" v-on:click="clickPaginator('next', false)">{{{templateDom.next}}}</li>
                        <li :class="classDom.li" v-on:click="clickPaginator('first', false)">{{{templateDom.last}}}</li>
                    </ul>
                    <div :class="classDom.message">
                        {{{renderMessage()}}}
                    </div>
                </template>
                <template v-else>
                    {{{templateDom.noData}}}
                </template>
            </div>
        </div>
        <div class="col-xs-12">
            <pre>
                {{config | json}}
            </pre>
            <pre>
                {{templateDom | json}}
            </pre>
            <pre>
                {{classDom | json}}
            </pre>
        </div>
    </div>

</template>

<script>

    export default{
        name: 'vue-paginator',
        ready: function(){
            if(this.serverSide){
                null;
            }else{
                this.config.data = this.data;
            }

        },
        props: {
            classDom:{
                type: Object,
                required: false,
                coerce: function(prop){
                    return Object.assign({
                        container: 'Page navigation',
                        ul: 'pagination',
                        li: 'paginate_button',
                        disabled: 'disabled',
                        active: 'active',
                        message: 'pagination-message'
                    }, prop);
                }
            },
            templateDom:{
                type: Object,
                required: false,
                coerce: function(prop){
                    return Object.assign({
                        first:'<a href="javascript:;"><span>First</span></a>',
                        last: '<a href="javascript:;"><span>Last</span></a>', 
                        next: '<a href="javascript:;"><span>Next</span></a>',
                        prev: '<a href="javascript:;"><span>Prev</span></a>',
                        item: '<a href="javascript:;"><span>{num}</span></a>',
                        message: 'Displaying {from} - {to} of {total} registers',
                        noData: 'No Data'
                    }, prop);
                }
            },
            config:{ //for serverSide
                type: Object,
                required: false,
                coerce: function(prop){
                    return Object.assign({
                        data: [],
                        total: 50,
                        per_page: 15,
                        current_page: 1,
                        last_page: 4,
                        from: 1,
                        to: 15
                    }, prop);
                }
            },
            serverSide: {
                type: Boolean,
                required: false,
                default: false
            },
            url: {
                type: String,
                required: false,
                default: 'api/users'
            },
            data: {
                type: Array,
                required: false,
                default: function(){
                    return [1,2,3,4,5,6,7,8,9,11,22,33,44,55,66,77];
                }
            },
            loadingState: {
                type:Boolean,
                required: false,
                default: false
            },
            numbersToShow: {
                type: Number,
                required: false,
                default: 10
            }
        },

        data: function(){
            return {
                originalData: []
            }
        },
        methods: {
            renderNum: function(num){
                return this.templateDom.item.replace('{num}', num);
            },
            renderMessage: function(){
                const {from, to, total} = this.config;
                return this.templateDom.message.replace('{from}', from).replace('{to}', to).replace('{total}', total);
            },
            getPagination: function(num){
                const {per_page, data, current_page} = this.config;
                if(num == current_page){
                    null;
                }else{
                    this.$set('originalData', []);
                    for(let idx=num-1; idx < (num * per_page)-1; idx++){
                        this.originalData.push(data[idx]);
                    }
                }
            },
            clickPaginator: function(op, isDisabled, num=null){
                console.log('entra pero no se que pasa', op, isDisabled, num);
                if(!isDisabled){
                    switch(op){
                        case 'next':
                            this.config.current_page = this.config.current_page + 1;
                            break;
                        case 'prev':
                            this.config.current_page = this.config.current_page - 1;
                            break;
                        case 'last':
                            this.config.current_page = this.config.last_page;
                            break;
                        case 'first':
                            this.config.current_page = 1;
                            break;
                        case 'item':
                            this.config.current_page = num;
                            break;
                        default: console.error('This option do not exists, method:clickPaginator');
                    }
                }
                
            }
        },
        events: {
            'vuetable:action': function(action, data) {
                console.log('vuetable:action', action, data)
                if (action == 'view-item') {
                    this.viewProfile(data.id)
                }
            },
            'vuetable:load-error': function(response) {
                console.log('Load Error: ', response)
            }
        }
    }

</script>

