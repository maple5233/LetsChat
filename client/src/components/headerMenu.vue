<template>
    <div>
        <el-menu theme="dark" default-active="1" mode="horizontal" class="menu">
            <div id="logo"><span><i class="el-icon-star-on"></i>在线聊天室</span></div>
            <!-- <div class="sel-menu" v-if="$store.getters.hasLogin"> -->
            <div class="sel-menu">
                <el-submenu index="1">
                    <el-menu-item index="1-1">{{ userName }}</el-menu-item>
                    <a @click="logout()"><el-menu-item index="1-2">退出系统</el-menu-item></a>
                </el-submenu>
            </div>
        </el-menu>
    </div>
</template>

<script>
    // import handleAuth from '../store/handleAuth'
    // import store from '../store'

    export default {
        data () {
            return {
                userName: '未登录'
            }
        },
        computed: {

        },
        methods: {
            logout: function () {
                // handleAuth.signout();
                this.$router.push('/login');
            }
        }
    }
</script>

<style lang="less">
    @import '../assets/styles/global.less';

    .sel-menu {
        float: right;
        margin-right: 9%;
    }

    #logo {
        float: left;
        margin-left: 9%;
        height: 60px;

        span {
            text-align: center;
            line-height: 60px;
            font-size: 1.8rem;
            color: @md-light-blue-600;
            font-weight: 800;
        }
    }
</style>
