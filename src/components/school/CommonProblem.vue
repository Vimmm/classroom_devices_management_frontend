<template>
  <div class="commonProblem">
    <el-tabs :tab-position="tabPosition">
      <el-tab-pane v-for="(pane, i) in paneList" :key="i" :label="pane.label">
        <div v-for="(link,i) in pane.linkList" :key="i">
          <content-item :title="link.text" :content="link.content" />
        </div>
        <router-view />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ContentItem from './ContentItem'
export default {
  name: 'commonProblem',
  components: {
    ContentItem
  },
  data () {
    return {
      tabPosition: 'top',
      paneList: [{
        label: '屏幕',
        linkList: [{
          text: '多媒体投影仪不受遥控器控制',
          content: '<p>解决方法：</p>'+
          '<p>1、首先检查遥控器电池是否用完，按键是否接触不良，选择更换电池或者打开遥控器用酒精清洗按键上的导电橡胶。</p>'+
          '<img src="https://i.ibb.co/dkCSSqm/1.png">'+
          '<p>2、若是遥控器无问题，检查投影仪的遥控接收窗是否被其他物体遮挡。</p>'+
          '<p>3、另外，投影仪所处环境光线过亮时也会影响遥控器发射的红外线信号，所以需要尽可能关掉室内不需要的灯光。</p>'
        }, {
          text: '这里有一个关于屏幕的问题',
          content: '<p>这是关于屏幕的问题的解决方式</p>'+'<p>这里有一段很长很长的文本。。。。</p>'
        }]
      }, {
        label: '摄像头',
        linkList: [{
          text: '这里有一个关于摄像头的问题',
          content: '<p>这是关于摄像头的问题的解决方式</p>'+'<p>这里有一段很长很长的文本。。。。</p>'
        }]
      }, {
        label: '话筒',
        linkList: [{
          text: '这里有一个关于话筒的问题',
          content: '<p>这是关于话筒的问题的解决方式</p>'+'<p>这里有一段很长很长的文本。。。。</p>'
        }]
      }, {
        label: '多媒体计算机',
        linkList: [{
          text: '这里有一个关于多媒体计算机的问题',
          content: '<p>这是关于多媒体计算机的问题的解决方式</p>'+'<p>这里有一段很长很长的文本。。。。</p>'
        }]
      }]
    }
  }
}
</script>

<style lang="less">
.commonProblem {
  box-sizing: border-box;
  -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-negative: 1;
    flex-shrink: 1;
    -webkit-box-sizing: border-box;
  border: 1px solid #eee;
 padding: 10px 10px 20px 15px;
 box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  margin: 10px 10px 30px;
}

</style>
