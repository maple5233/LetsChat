<template>
    <div>
        <!-- 聊天室列表 -->
        <el-card class="box-card chat-room-list-card">
            <div slot="header" class="clearfix card-header">
                <span>聊天室列表</span>
            </div>
            <div v-for="o in 4" :class="{ 'selected' : roomSelected === o }"
            class="text item has-transition" @click="chooseRoom(o)">
                {{'聊天室' + o }}
            </div>
            <el-button class="add-room" icon="plus" type="primary"  @click="roomDialogVisible = true">
                创建新的
            </el-button>
        </el-card>

        <!-- 聊天内容框 -->
        <el-card class="box-card chat-card">
            <!-- 标题 -->
            <div slot="header" class="clearfix card-header">
                <span>聊天内容</span>
            </div>
            <!-- 已有内容 -->
            <div class="messages-box">
                <message-item v-for="(message,index) of messages" :key="message._id"
                :message="message"></message-item>
            </div>
            <!-- 输入框 -->
            <el-form ref="newMessageFrom" :rules="rules" :model="newMessage"
            label-width="0px" class="newMessageFrom">
                <el-form-item  prop="text">
                    <el-input type="textarea" spellcheck="false" v-model="newMessage.text" ></el-input>
                </el-form-item>
            </el-form>

            <el-button class="send-message" icon="caret-right" type="primary">发送</el-button>
        </el-card>

        <!-- 创建聊天室对话框 -->
        <el-dialog title="创建聊天室" v-model="roomDialogVisible">
            <el-form :model="newChatRoom">
                <el-form-item label="聊天室名称" :label-width="formLabelWidth">
                    <el-input v-model="newChatRoom.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="roomDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addChatRoom()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import messageItem from './messageItem.vue'

    export default {
        data () {
            return {
                formLabelWidth: '120px',
                roomSelected: 1,
                roomDialogVisible: false,
                newChatRoom: {
                    name: null
                },
                newMessage: {
                    text: null,
                    createTime: null
                },
                rules: {
                    text: [{
                        required: true,
                        message: '说点什么呗QAQ...',
                        trigger: 'blur'
                    },{
                        min: 1,
                        max: 100,
                        message: '长度在 1 到 100 个字符',
                        trigger: 'blur'
                    }]
                },
                messages: [{
                    _id: 1,
                    author: '黄河',
                    headImgSrc: 'https://vuefe.cn/images/logo.png',
                    isSelf: false,
                    createTime: new Date(),
                    text: '233333333333333333333333333333333333333333333333333333333333333333333'
                },{
                    _id: 2,
                    author: '洪继耀',
                    headImgSrc: 'https://vuefe.cn/images/logo.png',
                    isSelf: true,
                    createTime: new Date(),
                    text: '666666666666666666666666666666666666666666666666666666666666666666666'
                }]
            }
        },
        methods: {
            chooseRoom(o) {
                this.roomSelected = o;
            },
            addChatRoom() {
                this.roomDialogVisible = false;
            }
        },
        components: {
            messageItem
        }
    }
</script>

<style lang="less">
    @import '../assets/styles/global.less';

    @1px-border: 1px solid @md-blue-grey-100;

    .chat-room-list-card {
        width: 20%;
        float: left;
        margin-right: 3%;

        .card-header, .item , .add-room{
            font-size: 18px;
            line-height: 16px;
            text-align: center;
        }

        .item, .add-room {
            font-size: 16px;
            line-height: 32px;
            width: 90%;
            margin: 10px auto;
            border-bottom: @1px-border;
            transition: all .5s ease;
        }

        .item:first-child {
            margin: 0px auto;
        }

        .item:hover {
            background-color: @main-color;
            color: #fff;
        }

        .selected {
            background-color: @main-color-dark;
            color: #fff;
        }

        .add-room {
            display: block;
            padding-top: 5px;
            padding-bottom: 5px;
        }
    }

    .chat-card {
        width: 77%;
        float: left;
        // height: 80vh;
        padding-bottom: 16px;

        .card-header {
            font-size: 18px;
            line-height: 16px;
            text-align: center;
        }

        .messages-box {
            width: 100%;
            border: @1px-border;
            min-height: 40vh;
        }

        .newMessageFrom {
            margin: 16px 0 16px 0;
        }

        .send-message {
            float: right;
            width: 120px;
        }

    }

</style>