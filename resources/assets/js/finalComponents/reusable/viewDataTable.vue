<script>
    import _ from 'lodash';
    export default {
        name: 'view-data-table',
        props: ['title', 'url'],
        data() {
            return {
                data: [],
                segments: [],
                model: {},
                columns: [],
                disabled: {
                    columns: [],
                    search: []
                },
                query: {
                    page: 1,
                    column: 'id',
                    direction: 'desc',
                    per_page: 10,
                    total: 1,
                    last_page: 1,
                    search_column: 'id',
                    search_operator: '=',
                    search_input: 'Giancarlos'
                },
                operators: [
                    {label: 'equal', value: '='},
                    {label: 'not_equal', value: '<>'},
                    {label: 'less_than', value: '<'},
                    {label: 'greater_than', value: '>'},
                    {label: 'less_than_or_equal_to', value: '<='},
                    {label: 'greater_than_or_equal_to', value: '>='},
                    {label: 'in', value: 'IN'},
                    {label: 'like', value: 'LIKE'}
                ]
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
                }
            },
            filterData(){
                this.query.total = this.data.length;
                this.query.last_page = Math.ceil(this.query.total / this.query.per_page);
                let ini = ((this.query.page - 1) * this.query.per_page) + 1;
                let end = ((this.query.page) * this.query.per_page) + 1;
                this.segments = _.chunk(this.data, this.query.per_page);
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
                this.filterData();
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
<template>

    <div class="col-xs-12">
        <div class="dv-container">
            <!-- head widget -->
            <div class="l-container heading">
                <button type="button" id="add" class="heading-item dv-btn"><i class="fa fa-plus"></i></button>
                <span class="heading-item title">{{title}}</span>
                <select class="heading-item column" name="column" id="column" v-model="query.column">
                    <option :value="col" v-for="col in columns">{{col}}</option>
                </select>
                <select class="heading-item operator" name="operator" id="operator" v-model="query.search_operator">
                    <option :value="opt.value" v-for="opt in operators">{{opt.label}}</option>
                </select>
                <input type="text" id="search" class="heading-item search" v-model="query.search_input" />
                <button type="button" id="search_btn" class="heading-item dv-btn"><i class="fa fa-search"></i></button>
            </div>
            <!-- body widget -->
            <div class="l-container table-responsive">
                <table class="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th v-for="col in columns">{{col}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-if="segments.length > 0">
                        <tr v-for="item in segments[query.page - 1]">
                            <template v-for="col in columns">
                                <td>{{item[col]}}</td>
                            </template>
                        </tr>
                    </template>
                    </tbody>
                </table>
            </div>
            <!-- footer widget -->
            <div class="l-container footer">
                <span class="footer-item dv-registers">Displaying 1 - 3 of {{query.total}} rows</span>
                <div class="footer-item dv-per-page">
                    <span>Per page:</span>
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
                        <input type="text" pattern="[0-9]{0,3}" class="form-control input-sm" v-model="query.page">
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
        border-bottom: 1px solid #afd9ee;
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
        width: 10%;
    }
    .search{
        width: 30%;
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
    }

    .dv-pagination{
        width: 11em;
    }

    .dv-pagination .input-sm, .dv-pagination .btn-sm, .dv-pagination .input-group-addon{
        height: 23px;
        padding: 2px 10px;
    }

</style>