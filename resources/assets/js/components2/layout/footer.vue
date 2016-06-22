<template>
	<!-- Main Footer -->
	<footer class="main-footer">
		<!-- To the right -->
		<div class="pull-right hidden-xs">
			<b>{{ bussinesName.name | uppercase }}</b>
		</div>
		<!-- Default to the left -->
		<strong>Copyright &copy; {{siteYears}} <a :href="bussinesName.site">{{ bussinesName.name }}</a>.</strong> Creado por <a :href="author.site">{{ author.name }}</a>.
	</footer>
</template>

<script>
	module.exports = {
		props: {
			madeDate: {
				type: Number,
				required: false,
				default: new Date().getFullYear()
			},
			author: {
				type: Object,
				required: false,
				default: function (){
					return{
						name: 'Giancarlos Cercado Cedeño',
						site: 'http://giancarloscercado.com',
						email: 'giancarloscercado@gmail.com'
					}
				}
			},
			bussinesName: {
				type: Object,
				required: false,
				default: function (){
					return{
						name: 'Idewall',
						site: 'http://idewall.com'
					}
				}
			}
		},
		computed: {
			siteYears: function(){
				const currentYear = new Date().getFullYear();
				return this.madeDate == currentYear ? currentYear : `${this.madeDate} - ${currentYear}`; 
			}
		}
	}
</script>