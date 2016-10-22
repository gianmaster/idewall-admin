<template>

	<!-- Head Confi toolbar -->
	<div class="box box-primary">
		<div class="box-header with-border" v-if="optionToolbar">
			<div class="col-sm-2 col-xs-12" v-if="optionToolbar">
				<button :class="optionToolbar.btnClass" @click.prevent="dispacher(optionToolbar.nameEmit)"><i :class="optionToolbar.iconClass"></i> {{optionToolbar.label}}</button>
			</div>
			<div class="col-xs-6 col-sm-6">
				<form action="#" method="get" @submit.prevent="search">
					<div class="input-group">
						<input type="text" name="filter" v-model="search_filter" class="form-control" placeholder="Buscar...">
						<span class="input-group-btn">
							<button type="submit" name="search_table" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i></button>
						</span>
					</div>
				</form>
			</div>
			<div class="col-xs-4 col-sm-3">
				<div class="form-group">
					<select class="form-control" v-model="pagination.per_page" @change="changePerPage">
						<option value="" disabled>Rigistros por página</option>
						<option v-for="item in pagination.per_page_list | orderBy item"  track-by="$index" :value="item">{{item}}</option>
					</select>
				</div>
			</div>
			<div class="col-xs-2 col-sm-1">
				<button class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="true" :title="optionToolbar.labelOptions">
					<i :class="optionToolbar.iconClassOptions"></i>
				</button>
				<ul class="dropdown-menu pull-right">
					<li v-for="(idx, col) in columns">
						<span class="checkbox">
							<label @click="toggleColumns(idx)">
								<strong>{{ col.title }} <i class="fa fa-check font-success" v-if="!col.hidden"></i><i class="fa fa-close font-error" v-else></i></strong>

							</label>
						</span>
					</li>
				</ul>
			</div>
		</div>
		<!-- Body table -->
		<div class="box-body table-responsive">
			<div class="loading-mask l-close">
				<i :class="pagination.loadingIconClass"></i>
				<span class="sr-only">Loading...</span>
			</div>
			<table :class="tableClass">
				
				<thead v-if="requireHeader">
					<tr>
						<th v-for="col in columns | filterBy false in 'hidden'" :class="col.titleClass" :style="col.style">
							<template v-if="sortable && col.sortable && !col.itemActions">
								<div class="cool-table-sortable" @click.prevent="orderColumn(col.field)">
									<span>{{col.title}}</span>
									<template v-if="sortable.column == col.field">
										<template v-if="sortable.order == 'desc'">
											<span class="pull-right"><i :class="sortable.descendingIcon"></i></span>
										</template>
										<template v-else>
											<span class="pull-right"><i :class="sortable.ascendingIcon"></i></span>
										</template>
									</template>
								</div>
							</template>
							<template v-else>
								{{col.title}}
							</template>
						</th>
					</tr>
				</thead>

				<tbody>
					<tr v-for="item in data">

						<td v-for="col in columns | filterBy false in 'hidden'" :class="col.fieldClass">

							<template v-if="col.template">
								{{{renderTemplate(item, col.template)}}}
							</template>

							<template v-else>

								<div v-if="!col.itemActions">{{ item[col.field] }}</div>

								<div v-else class="btn-group">

									<a v-for="act in col.itemActions" :class="act.btnClass" href="" @click.prevent="dispacher(act.nameEmit, item)" >
										<i :class="act.iconClass" data-toggle="tooltip" :title="act.label"></i> {{act.text}}
									</a>

								</div>

							</template>

							

						</td>

					</tr>
				</tbody>

			</table>
		</div>

		<!-- Footer pagination -->
		<div class="box-footer" v-if="pagination">
			<div class="row" v-if="pagination.data.length>0">
				<div class="col-xs-12 col-sm-8">
					<nav>
						<ul class="pagination pagination-sm">
							<li class="{{firstActive}}" @click.prevent="paginate(1)">
								<a href="#" aria-label="Previous">
									<span aria-hidden="true">{{pagination.first}}</span>
								</a><!-- begin -->
							</li>

							<li class="{{firstActive}}" @click.prevent="paginatePrev">
								<a href="#" aria-label="Previous">
									<span aria-hidden="true">{{pagination.back}}</span>
								</a>
							</li>

							<li v-if="pagination.current_page>pagination.limitPaginate" @click.prevent="pagScroll('prev')">
								<a href="#" aria-label="Prev">
									<span aria-hidden="true">...</span>
								</a><!-- more back -->
							</li>

							<template v-for="pag in 5, pagination.last_page">
								<li  class="{{isActive(pag+1)}}" @click.prevent="paginate(pag+1)" v-if="numToShow(pag+1)"><a href="#">{{pag + 1}}</a></li>
							</template>

							<li v-if="pagination.moreTemp < (pagination.last_page/pagination.limitPaginate)" @click.prevent="pagScroll('next')">
								<a href="#" aria-label="Next">
									<span aria-hidden="true">...</span>
								</a>
							</li><!-- more next -->

							<li class="{{lastActive}}" @click.prevent="paginateNext">
								<a href="#" aria-label="Next">
									<span aria-hidden="true">{{pagination.next}}</span>
								</a>
							</li>

							<li class="{{lastActive}}" @click.prevent="paginate(pagination.last_page)">
								<a href="#" aria-label="Next">
									<span aria-hidden="true">{{pagination.last}}</span>
								</a><!-- end -->
							</li>
						</ul>
					</nav>
				</div>

				<div class="col-xs-12 col-sm-4 text-right" v-if="pagination">
					<span>{{pagination.showText}}: {{pagination.from}} - {{pagination.to}} {{pagination.of}} {{pagination.total}} {{pagination.register}}</span>
				</div>
			</div>
			<div class="row" v-else>
				<div class="col-xs-12 text-center">
					<span>{{pagination.noData}}</span>
				</div>
			</div>
		</div>

	</div>


</template>

<style>
	.font-success{
		 color: #00a65a;
	 }

	.font-error{
		color: #dd4b39;
	}

	.pagination{
		margin: 0 !important;
	}

	.cool-table-loading-icon{
		position: absolute;
		margin-left: 45%;
		margin-top: 50%;
	}

	.cool-table-sortable{
		cursor: pointer;
	}
	.cool-table-sortable:hover{
		color: #2185d0;
	}

	.loading-mask{	
		z-index: 99;	
		position: absolute;
		width: 100%;
		background: rgba(236, 240, 245, 0.31);
	}
	.l-open{
		display: inherit;
	}

	.l-close{
		display: none;	
	}
</style>

<script>

	function schemaModel(toModel){
		if(toModel.field){
			Object.assign(toModel, {
				hidden: toModel.hidden ? toModel.hidden :false,
				field: toModel.field ? toModel.field : '',
				fieldClass: toModel.fieldClass ? toModel.fieldClass : '',
				title: toModel.title ? toModel.title : toModel.field.toUpperCase(),
				titleClass: toModel.titleClass ? toModel.titleClass : '',
				filterable: toModel.filterable ? toModel.filterable : false,
				applyFilter: toModel.applyFilter ? toModel.applyFilter : null, 
				template: toModel.template ? toModel.template : null, 
				itemActions: toModel.itemActions ? toModel.itemActions : null 
			});	
		}else{
			if(toModel.itemActions){
				if(toModel.itemActions.length<=0){
					throw ('ModelError: itemActions proptype is required in columns object if is not a field');
				}
				else{
					Object.assign(toModel, {
						hidden: toModel.hidden ? toModel.hidden :false,
						field: toModel.field ? toModel.field : '',
						fieldClass: toModel.fieldClass ? toModel.fieldClass : '',
						title: toModel.title ? toModel.title : toModel.field.toUpperCase(),
						titleClass: toModel.titleClass ? toModel.titleClass : '',
						filterable: toModel.filterable ? toModel.filterable : false,
						applyFilter: toModel.applyFilter ? toModel.applyFilter : null, 
						template: toModel.template ? toModel.template : null, 
						itemActions: toModel.itemActions ? toModel.itemActions : null 
					});
				}
			}else
			throw ('ModelError: field proptype is required in columns object');
		}

	}


	function arrayToScema(listModels){
		listModels.forEach( function(element, index) {
			schemaModel(element);
		});
	}
	
	export default {
		computed:{
			lastActive: function(){
				return this.pagination.current_page==this.pagination.last_page ? 'disabled':'';
			},
			firstActive: function(){
				return this.pagination.current_page==1 ? 'disabled':'';
			},
			
		},
		props: {
			optionToolbar: { 
				type: Object, 
				default: function(){
					return {
						iconClass: 'fa fa-plus',
						iconClassOptions: 'fa fa-cogs',
						label: 'Nuevo',
						labelOptions: 'Campos visibles',
						nameEmit: 'create-event',
						btnClass: 'btn btn-primary btn-flat'
					}
				}
			},
			tableClass: { type: String, default: 'table table-bordered table-striped table-hover'},
			requireHeader: {type: Boolean, default: true},
			divSeparatorClass: {type: String, default: 'col-xs-12'},
			url: {type: String, default: 'api/users'},
			search_filter: {type: String, default: ''},
			filterKeyWord: {type: String, default: 'filter'},
			endpoint: {type: String, default: ''},
			sortable: {
				type: Object,
				default: function(){
					return {
						ascendingIcon:'glyphicon glyphicon-chevron-up',
						descendingIcon:'glyphicon glyphicon-chevron-down',
						column: 'id',
						order: 'asc'
					}	
				}
			},
			columns: {
				type: Array, default: function(){
					return [
					{
						field: 'name',
						hidden: false,
						style: ''
					},
					{
						field: 'email',
						hidden: false
					},
					{
						field: 'created_at',
						title: 'Fecha Creación',
						hidden: false
					},
					{
						title: 'Fecha Modificación',
						field: 'updated_at',
						hidden: false
					},
					{
						title: 'Acciones',
						titleClass: 'text-center',
						hidden: false,
						style: 'width:10%',
						fieldClass: 'text-center',
						itemActions: [
						{
							nameEmit: 'view-event',
							btnClass: 'btn btn-default btn-xs',
							iconClass: 'fa fa-eye',
							label: 'Visualizar',
						},
						{
							nameEmit: 'view-event',
							btnClass: 'btn btn-default btn-xs',
							iconClass: 'fa fa-edit',
							label: 'Editar',
						},
						{
							nameEmit: 'view-event',
							btnClass: 'btn btn-danger btn-xs',
							iconClass: 'fa fa-trash',
							label: 'Eliminar',
						}
						]
					}
					]
				}
			}, 
			callbackError: {
				type: String, 
				required: false,
				default: 'ev-callblack-error'
			},
			pagination: {
				type: Object, 
				default : function(){
					return {
						loadingIconClass: 'fa fa-spinner fa-spin fa-3x fa-fw cool-table-loading-icon',
						showText: 'Mostrando',
						of: 'de',
						refresh: 'Actualizar',
						noData: 'No hay registros',
						register: 'Registros',
						next:'>',
						back:'<',
						last:'>>',
						first:'<<',
						searchable: false,
						per_page_list: [5,10, 15, 20, 30, 50],
						total:150,
						per_page:10,
						current_page:1,
						last_page:10,
						next_page_url:"http:\/\/vuetable.ratiw.net\/api\/users?page=2",
						prev_page_url:null,
						from:1,
						to:15,
						data:[],
						moreTemp: 1,
						limitPaginate: 5
					}
				}
			}, 
			data: {
				type: Array,
				deafult: function(){
					return []
				}
			}      
		},
		methods: {
			refresh: function(){
				this.pagination.current_page = 1;
				this.loadData();
			},
			renderTemplate: function(col, template){
				return eval('`'+template+'`');
			},
			updateEndpoint: function(){
				let {per_page, current_page} = this.pagination;
				let {search_filter, filterKeyWord, url} = this;
				let {column, order} = this.sortable;
				this.endpoint = `${url}?per_page=${per_page}&page=${current_page}&sort=${column}|${order}&${filterKeyWord}=${search_filter}`;
			},
			orderColumn: function(column){
				if (this.sortable.column == column) {
					this.sortable.order = this.sortable.order == 'asc' ? 'desc' : 'asc';	
				}else{
					this.sortable.order = 'asc';
					this.sortable.column = column;
				}
				this.loadData();
			},
			isActive: function(index){
				return this.pagination.current_page==index ? 'active':'';
			},
			paginate: function(numPage){
				if (this.pagination.current_page != numPage) {
					if (numPage == this.pagination.last_page) {
						this.pagination.moreTemp = parseInt(numPage / this.pagination.limitPaginate) +1;
					}
					if (numPage == 1) {
						this.pagination.moreTemp = 1;
					}
					this.pagination.current_page = numPage;
					this.loadData();
				}
			},
			paginateNext: function(){
				if (this.pagination.next_page_url != null) {
					this.pagination.current_page % this.pagination.limitPaginate === 0 ? this.pagination.moreTemp++ : null;
					this.pagination.current_page++;
					this.loadData();
				}
			},
			paginatePrev: function(){
				if (this.pagination.prev_page_url != null) {
					this.pagination.current_page % this.pagination.limitPaginate === 1 ? this.pagination.moreTemp-- : null;
					this.pagination.current_page--;
					this.loadData();
				}
			},
			pagScroll: function(type){
				if (type == 'next') {
					this.pagination.moreTemp++;
					this.pagination.current_page = ((this.pagination.moreTemp-1) * this.pagination.limitPaginate) + 1;
				}else{
					this.pagination.moreTemp--;
					this.pagination.current_page = ((this.pagination.moreTemp-1) * this.pagination.limitPaginate) + this.pagination.limitPaginate;
				}
				this.loadData();
			},
			changePerPage: function(){
				this.pagination.moreTemp=1;
				this.pagination.current_page=1;
				this.loadData();	
			},
			loadingAnimation: function(type){
				var query = '.' + this.tableClass.split(' ').join('.');
				var elem = document.querySelector(query);
				var loadElem = document.querySelector('.loading-mask');
				var loadIcon = document.querySelector('.cool-table-loading-icon');
				if (type == 'open') {
					var axisY = parseInt(elem.scrollHeight/2);
					loadElem.style.height = (axisY*2)+'px';
					loadIcon.style.marginTop = axisY+'px';
					loadElem.className = 'loading-mask l-open';
				}else{
					loadElem ? loadElem.className = 'loading-mask l-close' : null;
				}
			},
			numToShow: function(num){
				return ((this.pagination.moreTemp - 1) * this.pagination.limitPaginate) < num && num < ((this.pagination.moreTemp * this.pagination.limitPaginate) + 1);
			},
			toggleColumns: function(idx){
				this.columns[idx].hidden = !this.columns[idx].hidden;
			},
			loadData: function() {
				this.loadingAnimation('open');
				this.updateEndpoint();
				var self = this;
				self.$http.get(this.endpoint).then(function(resp){
					self.data = resp.data.data;
					Object.assign(self.pagination, resp.data);
					self.loadingAnimation('close');
				}, function(err) {
					console.warn(err, 'error while try to load the endpoit <cool-table>', self.endpoint);
					self.loadingAnimation('close');
					this.dispacher(this.callbackError, err);
				});
			},
			search: function(){
				this.loadData();
			},
			dispacher: function(event, model){
				this.$dispatch(event, model);
			}

		},
		
		ready(){
			this.loadData();
		},
		created(){
			arrayToScema(this.columns);
		},
		data(){
			return {
				otro: 'hola',
			}
		}
	}

</script>