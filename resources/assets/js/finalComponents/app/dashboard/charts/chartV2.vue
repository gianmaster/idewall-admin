<template>
    <canvas
        :id="elementId"
    ></canvas>
</template>
<script>

    import Chart from 'chart.js';

    export default {
        name: 'chart-v2',
        props: ['elementId', 'type', 'data', 'options'],
        created(){

            setTimeout(()=>{
                let ctx = document.getElementById(this.elementId);
                const myChar = new Chart(ctx, {
                    type: this.type,
                    data: this.data,
                    options: this.options
                });

            }, 2000);
            
        }
    }

</script>