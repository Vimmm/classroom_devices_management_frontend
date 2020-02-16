<template>
  <div class="statisticCharts">
    <h1>This is an StatisticCharts page</h1>
    <div class="charts">
      <div class="data">
        <div class="chart" id="mycharts"></div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../common/fetch'
export default {
  name: 'statisticCharts',
  computed: {
    options () {
      return {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
    }
  },
  created () {
    api.getCharts().then(res => {
      console.log(res)
      const myChart = this.$echarts.init(document.getElementById('mycharts'))
      myChart.setOption(this.options)
    }).catch(err => this.$message.error(err.toString()))
  },
  methods: {
    // init () {
    //   let _this = this
    //   this.chart = this.$echarts.init(document.getElementById('mycharts'))
    // },
    // setOption (option) {
    //   this.chart.setOption(option)
    // }
  }
}
</script>

<style lang="less" scope>
.statisticCharts {
  .charts {
    width: 100%;
    height: 100px;
    .chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
