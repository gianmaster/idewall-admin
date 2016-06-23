<template>
	<div class="mask-loading">
		<div class="spinner">
			<div class="double-bounce1"></div>
			<div class="double-bounce2"></div>
		</div>
	</div>
</template>

<style>
	* {margin: 0;padding:0;}
	.mask-loading {
		widows: 100%;
		background-color: #ecf0f5;
	}
	.spinner {
		width: 50px;
		height: 50px;
		position: relative;
		margin: 0 auto;
	}

	.double-bounce1, .double-bounce2 {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background-color: #3c8dbc;
		opacity: 0.6;
		position: absolute;
		top: 0;
		left: 0;

		-webkit-animation: sk-bounce 2.0s infinite ease-in-out;
		animation: sk-bounce 2.0s infinite ease-in-out;
	}

	.double-bounce2 {
		-webkit-animation-delay: -1.0s;
		animation-delay: -1.0s;
	}

	@-webkit-keyframes sk-bounce {
		0%, 100% { -webkit-transform: scale(0.0) }
		50% { -webkit-transform: scale(1.0) }
	}

	@keyframes sk-bounce {
		0%, 100% { 
			transform: scale(0.0);
			-webkit-transform: scale(0.0);
		} 50% { 
			transform: scale(1.0);
			-webkit-transform: scale(1.0);
		}
	}
</style>

<script>
	var o = $('.content-wrapper');
	$(".mask-loading").css("height", o.height());
	$(".spinner").css("top", (o.height() / 2) - 25);
</script>
