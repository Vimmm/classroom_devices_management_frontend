<template>
    <el-row type="flex" class="row-bg head" justify="space-around">
        <el-col :span="5">
            <div class="grid-content bg-purple">
                <img :src="logoText" class="logoText">
            </div>
        </el-col>
        <el-col :span="8">
            <div class="grid-content bg-purple-light">
                <h1 class="title">同步课堂设备维修系统</h1>
            </div>
        </el-col>
        <el-col :span="5">
            <div class="grid-content bg-purple">
                <div class="loginout">
                    <i class="el-icon-s-custom"></i>
                    <el-button type="text" style="color:#fff;">退出</el-button>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
  name: 'headers',
  data () {
    return {
      logoText: require('../../assets/images/hd_logo.png')
    }
  }
}
</script>

<style lang="less" scoped>
    .head {
        box-sizing: border-box;
        position: fixed;
        top: 0;
        z-index: 10000;
        width:1000px;
        height: 80px;
        padding-top:10px;
        border-bottom: 1px solid #fff;
        background-color: #1295d9;
        .logoText {
            display: inline-block;
            height: 60px;
            line-height:60px;
        }
        .title {
            color: #fff;
            font-size: 30px;
            font-family: '楷体';
            line-height: 60px;
        }
        .loginout {
            font-size: 16px;
            line-height:60px;
            color: #fff;
            text-align: right;
            i {
                font-size: 20px;
                margin-right: 5px;
            }
        }
    }
</style>
