<template>
	<div :class="paginateContentClass">
		<nav>
			<ul class="pagination pagination-sm">
				<li class="{{firstActive}}" @click.prevent="paginate(1)">
					<a href="#" aria-label="Previous">
						<span aria-hidden="true">{{firstText}}</span>
					</a><!-- begin -->
				</li>

				<li class="{{firstActive}}" @click.prevent="paginatePrev">
					<a href="#" aria-label="Previous">
						<span aria-hidden="true">{{backText}}</span>
					</a>
				</li>

				<li v-if="current_page>limitPaginate" @click.prevent="pagScroll('prev')">
					<a href="#" aria-label="Prev">
						<span aria-hidden="true">...</span>
					</a><!-- more back -->
				</li>

				<li v-for="pag in last_page" class="{{isActive(pag+1)}}" @click.prevent="paginate(pag+1)" v-if="numToShow(pag+1)"><a href="#">{{pag + 1}}</a></li>

				<li v-if="moreTemp < (last_page/limitPaginate)" @click.prevent="pagScroll('next')">
					<a href="#" aria-label="Next">
						<span aria-hidden="true">...</span>
					</a>
				</li><!-- more next -->

				<li class="{{lastActive}}" @click.prevent="paginateNext">
					<a href="#" aria-label="Next">
						<span aria-hidden="true">{{nextText}}</span>
					</a>
				</li>

				<li class="{{lastActive}}" @click.prevent="paginate(last_page)">
					<a href="#" aria-label="Next">
						<span aria-hidden="true">{{lastText}}</span>
					</a><!-- end -->
				</li>
			</ul>
		</nav>
	</div>

	<div :class="infoContentClass" v-if="infoContentClass">
		<span>{{showText}}: {{from}} - {{to}} {{ofText}} {{total}} {{registerText}}</span>
	</div>

	<div :class="noDataContentClass" v-if="data.lenght<=0">
		<span>{{noDataText}}</span>
	</div>
	
</template>

<style></style>

<script>


	export default {
		ready(){
			this.loadData();
		},
		computed:{
			lastActive: function(){
				return this.current_page==this.last_page ? 'disabled':'';
			},
			firstActive: function(){
				return this.current_page==1 ? 'disabled':'';
			},
			
		},

		methods: {
			isActive: function(index){
				return this.current_page==index ? 'active':'';
			},
			paginate: function(numPage){
				if (this.current_page != numPage) {
					if (numPage == this.last_page) {
						this.moreTemp = parseInt(numPage / this.limitPaginate) +1;
					}
					if (numPage == 1) {
						this.moreTemp = 1;
					}
					this.current_page = numPage;
					this.loadData();
				}
			},
			paginateNext: function(){
				if (this.next_page_url != null) {
					this.current_page % this.limitPaginate === 0 ? this.moreTemp++ : null;
					this.current_page++;
					this.loadData();
				}
			},
			paginatePrev: function(){
				if (this.prev_page_url != null) {
					this.current_page % this.limitPaginate === 1 ? this.moreTemp-- : null;
					this.current_page--;
					this.loadData();
				}
			},
			pagScroll: function(type){
				if (type == 'next') {
					this.moreTemp++;
					this.current_page = ((this.moreTemp-1) * this.limitPaginate) + 1;
				}else{
					this.moreTemp--;
					this.current_page = ((this.moreTemp-1) * this.limitPaginate) + this.limitPaginate;
				}
				this.loadData();
			},
			numToShow: function(num){
				return ((this.moreTemp - 1) * this.limitPaginate) < num && num < ((this.moreTemp * this.limitPaginate) + 1);
			},
			//MAIN METHOD LOAD DATA
			loadData: function() {
				var self = this;
				self.isError = false;
				self.isLoading = true;
				self.$http.get(`${self.url}?page=${self.current_page}${self.params}`).then(function(resp){
					self.data = resp.data.data;
					Object.assign(self, resp.data);
					self.isError=false;
					self.isLoading=false;
				}, function(err) {
					console.warn(err, 'error while try to load the endpoit', `${self.url}${self.params}`);
					self.isError=true;
					self.isLoading=false;
				});
			},
		},

		props: {
			//endpoint
			url: {
				type: String,
				required: true
			},
			params: {
				type: String,
				required: false,
				default: ''
			},
			fullPaginate: {
				type: Boolean,
				required: false,
				default: false
			},
			isLoading: {
				type: Boolean,
				required: false,
				default: false
			},
			isError:{
				type: Boolean,
				required: false,
				default: false
			},
			//default class for bootstrap
			paginateContentClass: {
				type: String,
				required: false,
				default: "col-xs-12 col-sm-8"
			},
			infoContentClass: {
				type: String,
				required: false,
				default: "col-xs-12 col-sm-4 text-right"
			},
			noDataContentClass: {
				type: String,
				required: false,
				default: "col-xs-12 text-center",
			},
			showText: {
				type: String,
				required: false,
				default: 'Mostrando',
			}, 
			ofText: {
				type: String,
				required: false,
				default: 'de',
			},
			refreshText: {
				type: String,
				required: false,
				default: 'Actualizar',
			},
			noDataText: {
				type: String,
				required: false,
				default: 'No hay registros',
			},
			registerText: {
				type: String,
				required: false,
				default: 'Registros',
			},
			nextText:{
				type: String,
				required: false,
				default: '>',
			},
			backText:{
				type: String,
				required: false,
				default: '<',
			},
			lastText:{
				type: String,
				required: false,
				default: '>>',
			},
			firstText:{
				type: String,
				required: false,
				default: '<<',
			},
			filter_search: {
				type: String,
				required: false,
				default: '',
			},
			per_page_list: {
				type: Array,
				required: false,
				default: function(){
					return [5,10, 15, 20, 30, 50];
				}
			},
			//logic data attributes - laravel paginate struct
			
			data: {
				type: Array,
				required: false,
				default: function(){
					return [];
				}
			},
			moreTemp: {
				type: Number,
				required: false,
				default: 1
			},
			limitPaginate: {
				type: Number,
				required: false,
				default: 5
			}
		},

		data(){
			return {
				total:{
				type: Number,
				required: false,
				default: 0
			},
			per_page:{
				type: Number,
				required: false,
				default: 5
			},
			current_page:{
				type: Number,
				required: false,
				default: 1
			},
			last_page:{
				type: Number,
				required: false,
				default: 2
			},
			next_page_url:{
				type: String,
				required: false,
				default: ""
			},
			prev_page_url:{
				type: String,
				required: false,
				default: ""
			},
			from:{
				type: Number,
				required: false,
				default: 1
			},
			to:{
				type: Number,
				required: false,
				default: 15
			},
			}
		}

	}
	
</script>
