<template>
    <div id="app">
        <header-menu></header-menu>
        <div class="all-center-flex container">
            <router-view></router-view>
        </div>
        <!-- <footer-info></footer-info> -->
    </div>
</template>

<script>
    import headerMenu from './components/headerMenu.vue';
    import footerInfo from './components/footerInfo.vue';

    export default {
        data () {
            return {}
        },
        methods: {
        },
        components: {
            headerMenu,
            footerInfo
        }
    }
</script>

<style>
    @import './assets/styles/global.less';
    @import './assets/styles/normalize.less';

    .container {
        padding: 2rem;
        min-height: 85vh;
    }
</style>
