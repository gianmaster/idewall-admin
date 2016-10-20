<template>
    <div :class="classDom.container">
        <template v-if="config.data.length>0">
            <ul :class="classDom.ul">
                <li :class.sync="firtPrevClass" @click="clickPaginator('first', config.current_page==1)">{{{templateDom.first}}}</li>
                <li :class.sync="firtPrevClass" @click="clickPaginator('prev', config.current_page==1)">{{{templateDom.prev}}}</li>

                <li class="{{config.current_page == num+1 ? classDom.li+' '+classDom.active : classDom.li}}" @click="clickPaginator('item', false, num+1)" v-for="num in config.last_page">
                    {{{renderNum(num+1)}}}
                </li>

                <li :class="nextLastClass" @click="clickPaginator('next', config.current_page==config.last_page)">{{{templateDom.next}}}</li>
                <li :class="nextLastClass" @click="clickPaginator('last', config.current_page==config.last_page)">{{{templateDom.last}}}</li>
            </ul>
            <div :class="classDom.message">
                {{{renderMessage}}}
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
            this.initPaginator();
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
            pages: {
                type: Number,
                required: false,
                default: 5
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
            dataPath: {
                type: String,
                required: false,
                default: null
            }
        },
        computed: {
            firtPrevClass: function(){
                const {current_page} = this.config;
                const { li, disabled} = this.classDom;

                return current_page == 1 ? `${li} ${disabled}` : li;
            },
            nextLastClass: function(){
                const {current_page, last_page} = this.config;
                const { li, disabled} = this.classDom;

                return current_page == last_page ? `${li} ${disabled}` : li;
            },
            moreBack: function(){

            },
            moreNext: function(){

            },
            /**
             * Genera el mensaje de los registros
             * @return {[type]} [description]
             */
            renderMessage: function(){
                const {from, to, total} = this.config;
                return this.templateDom.message.replace('{from}', from).replace('{to}', to).replace('{total}', total);
            },
        },
        data: function(){
            return {
                segmentData: []
            }
        },
        methods: {
            initPaginator: function(){
                this.loadingState = true;
                this.$http.get(this.url).then(function(resp){
                    if(this.serverSide){
                        Object.assign(this.config, resp.data);
                    }else{
                        this.config.data = resp.data;
                        this.getSegmentData();
                        this.loadingState = false;
                    }
                }, function(err){
                    console.log(err);
                });
            },
            getSegmentData: function(){
                const {per_page, current_page} = this.config;
                let tmpData = Object.assign([], this.config.data);
                let list = [];
                while (tmpData.length>0) {
                    list.push(tmpData.splice(0, per_page));
                }
                this.segmentData = list;
                this.displayData = list[current_page - 1];
                this.config.last_page = list.length;
            },
            renderNum: function(num){
                return this.templateDom.item.replace('{num}', num);
            },
            /**
             * Genera el array de registros correspondientes a la paginacion
             * @return {[type]} [description]
             */
            getPagination: function(){
                this.displayData = this.segmentData[this.config.current_page -1];
            },
            clickPaginator: function(op, isDisabled, num){
                num = num || null;
                let {last_page} = this.config;
                if(!isDisabled){

                    switch(op){
                        case 'next':
                            if(this.config.current_page < this.config.last_page)
                                this.config.current_page = this.config.current_page + 1;
                            break;
                        case 'prev':
                            if(this.config.current_page > 1)
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
