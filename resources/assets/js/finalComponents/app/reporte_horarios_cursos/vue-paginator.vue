<template>
    <div :class="classDom.container">
        <template v-if="config.data.length>0">
            <ul :class="classDom.ul">
                <li :class="classDom.li" @click="clickPaginator('first', false)">{{{templateDom.first}}}</li>
                <li :class="classDom.li" @click="clickPaginator('prev', false)">{{{templateDom.prev}}}</li>

                <li class="{{config.current_page == num+1 ? classDom.li+' '+classDom.active : classDom.li}}" @click="clickPaginator('item', false, num+1)" v-for="num in config.last_page">
                    {{{renderNum(num+1)}}}
                </li>

                <li :class="classDom.li" @click="clickPaginator('next', false)">{{{templateDom.next}}}</li>
                <li :class="classDom.li" @click="clickPaginator('first', false)">{{{templateDom.last}}}</li>
            </ul>
            <div :class="classDom.message">
                {{{renderMessage()}}}
            </div>
        </template>
        <template v-else>
            {{{templateDom.noData}}}
        </template>
    </div>
</template>


<script>
    export default{
        name: 'vue-paginator',
        ready: function(){
            this.getPagination();
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
                        per_page: 10,
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
            displayData: {
                type: Array,
                required: true,
                twoway: true
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
                pag: true
            }
        },
        methods: {
            renderNum: function(num){
                console.log(num);
                return this.templateDom.item.replace('{num}', num);
            },
            renderMessage: function(){
                const {from, to, total} = this.config;
                return this.templateDom.message.replace('{from}', from).replace('{to}', to).replace('{total}', total);
            },
            getPagination: function(){

                const {per_page, data, current_page} = this.config;
                let list = [];

                for(let idx=current_page-1; idx < (current_page * per_page)-1; idx++){
                    list.push(data[idx]);
                }

                this.displayData = list;
            },
            clickPaginator: function(op, isDisabled, num){
                num = num || null;
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

                    this.getPagination();

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
