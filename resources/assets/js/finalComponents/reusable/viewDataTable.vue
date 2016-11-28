<template>

    <div class="col-xs-12">
        <div class="dv-container">
            <!-- head widget -->
            <div class="l-container heading">
                <button type="button" id="add" class="heading-item dv-btn"><i class="fa fa-plus"></i></button>
                <span class="heading-item title">{{title}}</span>
                <select class="heading-item column" name="column" id="column" v-model="query.column">
                    <template v-if="receiveCols">
                        <template v-for="col in columns">
                            <template v-if="col.searchable">
                                <option :value="col.name">{{col.title}}</option>
                            </template>
                        </template>
                    </template>
                    <template v-else>
                        <option :value="col" v-for="col in columns">{{col}}</option>
                    </template>
                </select>
                <select class="heading-item operator" name="operator" id="operator" v-model="query.search_operator">
                    <option :value="opt.value" v-for="opt in filterOperators">{{opt.label}}</option>
                </select>
                <input type="text" id="search" class="heading-item search" v-model="query.search_input" />
                <button type="button" id="search_btn" class="heading-item dv-btn"><i class="fa fa-search"></i></button>
            </div>
            <!-- body widget -->
            <div class="l-container table-responsive">
                <table class="table table-striped table-hover table-bordered">
                    <thead>
                    <tr>
                        <template v-if="receiveCols">
                            <template v-for="col in columns">
                                <template v-if="col.searchable">
                                    <th :width="col.width" @click="sortbyColumn(col.name)">
                                        <span v-if="query.sort_by === col.name">
                                            <template v-if="query.direction === 'desc' ">
                                                {{col.title}} &darr;
                                            </template>
                                            <template v-else>
                                                {{col.title}} &uarr;
                                            </template>
                                        </span>
                                        <span v-else>
                                            {{col.title}}
                                        </span>
                                    </th>
                                </template>
                            </template>
                        </template>
                        <template v-else>
                            <th v-for="col in columns" @click="sortbyColumn(col)">
                                <span v-if="query.sort_by === col">
                                    <template v-if="query.direction === 'desc' ">
                                        {{col}} &darr;
                                    </template>
                                    <template v-else>
                                        {{col}} &uarr;
                                    </template>
                                </span>
                            </th>
                        </template>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-if="segments.length > 0">
                        <tr v-for="item in segments[query.page - 1]">
                            <template v-if="receiveCols">
                                <template v-for="col in columns">
                                    <template v-if="col.searchable">
                                        <template v-if="col.template !== null">
                                            <td>{{{ col.template(item[col.name]) }}}</td>
                                        </template>
                                        <template v-else>
                                            <td>{{item[col.name]}}</td>
                                        </template>
                                    </template>
                                </template>
                            </template>
                            <template v-else>
                                <template v-for="col in columns">
                                    <td>{{item[col]}}</td>
                                </template>
                            </template>
                        </tr>
                    </template>
                    </tbody>
                </table>
            </div>
            <!-- footer widget -->
            <div class="l-container footer">
                <span class="footer-item dv-registers">{{refreshInfo}}</span>
                <div class="footer-item dv-per-page">
                    <span>{{message.per_page}}: </span>
                    <select name="per-page" id="per-page" v-model="query.per_page" @change="changePerPage">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </div>
                <div class="footer-item dv-pagination">
                    <div class="input-group">
                        <span class="input-group-btn">
                            <button class="btn btn-default btn-sm" type="button" @click="prev">&laquo;</button>
                        </span>
                        <input type="text" pattern="[0-9]{0,3}" @keypress="keypressInputPage" class="form-control input-sm" v-model="query.page">
                        <span class="input-group-addon" id="sizing-addon1">/</span>
                        <span class="input-group-addon" id="sizing-addon2">{{query.last_page}}</span>
                        <span class="input-group-btn">
                            <button class="btn btn-default btn-sm" type="button" @click="next">&raquo;</button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    import _ from 'lodash';
    export default {
        name: 'view-data-table',
        props: {
            title: {
                required: true,
                type: String
            },
            url: {
                required: true,
                type: String
            },
            columns: {
                type: Array,
                required: false,
                default: function(){
                    return [];
                }
            },
            message: {
                type: Object,
                required: false,
                default: function(){
                    return {
                        info: 'Displaying $1 - $2 of $3 rows',
                        per_page: 'Per Page'
                    }
                }
            },
            operators: {
                type: Array,
                required: false,
                default: function(){
                    return [
                        {label: 'like', value: 'LIKE', types: ['*']},
                        {label: 'equal', value: '=', types: ['*']},
                        {label: 'not_equal', value: '<>', types: ['*']},
                        {label: 'less_than', value: '<', types: ['number', 'date']},
                        {label: 'greater_than', value: '>', types: ['number', 'date']},
                        {label: 'less_than_or_equal_to', value: '<=', types: ['number', 'date']},
                        {label: 'greater_than_or_equal_to', value: '>=', types: ['number', 'date']},
                        {label: 'between', value: 'BETWEEN', types: ['number', 'date']},
                        {label: 'in', value: 'IN', types: ['*']}
                    ]
                }
            }
        },
        computed: {
            refreshInfo(){
                const {page, total, last_page, per_page} = this.query;
                const from = ((page - 1) *  per_page) + 1;
                const to = page == last_page ? total : (page * per_page);
                return this.message.info.replace('$1', from).replace('$2', to).replace('$3', total);
            },
            filterOperators(){
                let vm = this;
                let typeCol = _.filter(vm.columns, {name: vm.query.column})[0];
                let operators = _.filter(vm.operators, function(d){
                    if(_.includes(d.types, '*') || _.includes(d.types, typeCol.type)){
                        return d;
                    }
                });
                return operators;
            }
        },
        data() {
            return {
                data: [],
                segments: [],
                model: {},
                receiveCols: false,
                disabled: {
                    columns: [],
                    search: []
                },
                query: {
                    page: 1,
                    column: 'id',
                    sort_by: 'id',
                    direction: 'desc',
                    per_page: 5,
                    total: 1,
                    last_page: 1,
                    search_column: 'id',
                    search_operator: '=',
                    search_input: ''//some text
                }
            }
        },
        ready(){
            this.load();
        },
        methods: {
            load(){
                if(this.data.length === 0){
                    this.$http.get(this.url).then(function(resp){
                        this.data = resp.data.data;
                        this.columnsOfData();//call method that get columns
                        this.filterData();//calculate props
                    }, function(err){
                        console.error('Error while load data ajax');
                        console.error(err);
                    });
                }
            },
            columnsOfData(){
                if (this.columns.length === 0) {
                    this.columns = _.keys(this.data[0]);
                }else{
                    this.$set('receiveCols', true);
                    const copy = this.$get('columns').map(function(item) {
                        const title = item.name.toUpperCase();
                        const data = Object.assign({
                            type: 'string',
                            title: title,
                            hidden: false,
                            template: null,
                            width: '',
                            searchable: true
                        }, item);

                        return data;
                    });

                    this.$set('columns', copy);

                }
            },
            filterData(){
                this.query.total = this.data.length;
                this.query.last_page = Math.ceil(this.query.total / this.query.per_page);
                let ini = ((this.query.page - 1) * this.query.per_page) + 1;
                let end = ((this.query.page) * this.query.per_page) + 1;
                this.segments = _.chunk(this.data, this.query.per_page);
            },
            sortbyColumn(column){
                if(column == this.query.sort_by){
                    this.query.direction = this.query.direction == 'asc' ? 'desc' : 'asc';
                }else{
                    this.query.direction = this.query.direction == 'asc' ? 'desc' : 'asc';
                    this.query.sort_by = column;
                }
                const sorterData = _.sortBy(this.data, this.query.sort_by);
                this.data = this.query.direction == 'desc' ? sorterData : sorterData.reverse();
                this.filterData();
            },
            next(){
                if(this.query.page < this.query.last_page){
                    this.query.page++;
                    this.filterData();
                }
            },
            prev(){
                if(this.query.page > 1){
                    this.query.page--;
                    this.filterData();
                }
            },
            changePerPage(){
                this.query.page = 1;
                this.filterData();
            },
            keypressInputPage(e){
                if(/[0-9]{1,4}/.exec(e.key) === null){
                    e.preventDefault();
                }
            }
        }
    }
    /*
     "id": 1,
     "codigo_materia": "101",
     "nombre_materia": "Contabilidad Básica",
     "semestre": "SEM1",
     "horas": 8,
     "estado": "ACTIVO",
     "docentes"
    */
</script>

<style>

    .dv-container{
        margin: 1em .2em;
        width: 100%;
        height: 100%;
        background-color: #fff;
        display: flex;
        flex-direction:column;
        padding: 1em;
    }

    .l-container{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .heading{
        margin: .2em .5em;
        align-items: center;
        border-bottom: 1px solid #eee;
    }

    .heading-item, .footer-item{
        display: flex;
        height: 1.8em;
        justify-content: center;
        align-items: center;
    }

    .title{
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        text-align: center;
        width: 30%;
        font-size: 1.3em;
        color: #356685;
    }
    .column{
        width: 20%;
    }
    .operator{
        width: 20%;
    }
    .search{
        width: 20%;
    }
    .dv-btn{
        width: 5%;
        background-color: #3c8dbc;
        color: #e9eef1;
        border-style: none;
    }

    .l-container.footer{
        height: 3em;
        align-items: flex-end;
        border-top: 1px solid #eee;
    }

    .dv-pagination{
        width: 11em;
    }

    .dv-pagination .input-sm, .dv-pagination .btn-sm, .dv-pagination .input-group-addon{
        height: 23px;
        padding: 2px 10px;
    }
    
    .l-container > table > thead  > tr > th{
        cursor: pointer;
    }

</style>
