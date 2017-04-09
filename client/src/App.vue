<template>
    <div id="app">
        <header-menu></header-menu>
    </div>
</template>

<script>
    import headerMenu from './compoments/headerMenu.vue'

    export default {
        data () {
            return {}
        },
        methods: {
        },
        components: {
            headerMenu
            // footerInfo
        }
    }
</script>

<style>
    @import './assets/styles/global.less';
    @import './assets/styles/normalize.less';
</style>
