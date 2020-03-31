<template>
  <div class="contentItem">
    <el-button class="questiontitle" @click="drawer = true" type="primary" style="margin-left: 16px;">
      {{title}}
    </el-button>

    <el-drawer class="content"
      :title="title"
      :visible.sync="drawer"
      :direction="direction"
      >
      <div class="contentDiv" v-html="content"></div>
      <!-- <template v-html="content" /> -->
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'ContentItem',
  props: [
    'title',
    'content'
  ],
  data() {
    return {
      drawer: false,
      direction: 'rtl',
    };
  },


}
</script>

<style lang="less" scoped>
.questiontitle {
  display: block;
  width:785px;
  background: #fff;
  line-height: 20px;
  color: #666;
  border: 0;
  border-bottom:1px #bbb dotted;
  border-radius: 0;
  margin-left: 0;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}
.content {
  font-size: 18px;
}
</style>

<style lang="less">

.contentDiv {
  padding: 15px;
  p {
    font-size: 14px;
    line-height: 22px;
  }
  img {
    display: inline-block;
    width: 100%;
    vertical-align: middle;
    margin: 10px 0;
  }
}

</style>
