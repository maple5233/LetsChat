<template>
    <div>
        <div class="row">
            <div class="message-box" :class="{ 'go-right' : message.isSelf === true }">
                <img :src="message.headImgSrc" height="40" width="40">
                <div class="content">
                    <p class="title">
                        <span class="author">{{ message.author }}</span>
                        <span class="time">{{ message.createTime | time }}</span>
                    </p>
                    <p class="text">{{ message.text }}</p>
                </div>
<!--                 <img :src="message.headImgSrc" height="40" width="40" v-show="message.isSelf"> -->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        props: {
            message: Object
        },
    }
</script>

<style lang="less">
    @import '../assets/styles/global.less';

    .go-right {
        float: right!important;

        img {
            float: right!important;
        }

        .content {
            float: right!important;
        }
    }

    .row {
        width: 100%;
        overflow: hidden;
        padding: 15px 5px 15px 5px;

        .message-box {
            float: left;
            width: 50%;
            overflow: hidden;

            img {
                float: left;
                height: 40px;
                width: 40px;
                margin: 10px;
            }

            .content {
                float: left;
                margin-top: 10px;
                width: 80%;

                .text {
                    width: 100%;
                    word-wrap: break-word;
                    word-break: normal;
                }
            }
        }
    }
</style>