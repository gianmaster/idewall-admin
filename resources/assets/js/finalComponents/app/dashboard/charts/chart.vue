<template>
    <canvas
            :id="id"
            :class="class"
    ></canvas>
</template>
<style>

</style>
<script>

    import Chart from 'chart.js';

    export default{
        name: 'cheart',
        created(){
            let ctx = document.getElementById(this.id);
            const myChar = new Chart(ctx, {
                type: this.type,
                data: this.data,
                options: this.options
            });
        },
        props: {
            id: {
                type: String,
                required: true
            },
            class: {
                type: String,
                required: false,
                default: ''
            },
            data: {
                type: Object,
                required: false
            },
            options: {
                type: Object,
                required: true
            },
            type: {
                type: String,
                required: false,
                default: 'bar'
            }
        }
    }
</script>