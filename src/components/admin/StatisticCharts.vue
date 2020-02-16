<template>
  <div class="statisticCharts">
    <h1>This is an StatisticCharts page</h1>
    <div class="charts">
      <div class="chart" id="mycharts"></div>
    </div>
  </div>
</template>

<script>
import api from '../../common/fetch'
export default {
  name: 'statisticCharts',
  data () {
    return {
      source: [],
      chart: {}
    }
  },
  computed: {
    options () {
      return {
        title: {
          text: '教学点维修统计'
        },
        tooltip: {},
        xAxis: {
          data: this.source.map(it => it.schoolName)
        },
        yAxis: {},
        series: [{
          name: '次数',
          type: 'bar',
          data: this.source.map(it => it.count)
        }]
      }
    }
  },
  mounted () {
    this.chart = this.$echarts.init(document.getElementById('mycharts'))
    Promise.all([
      api.getCharts(),
      api.getAllSchool()
    ])
      .then(([records, schools]) => {
        this.source = records.reduce((data, item) => {
          const index = data.findIndex(it => it.schoolId === item.school)
          if (index !== -1) data[index].count++
          else data.push({ schoolName: schools.find(it => it.ID === item.school).name, schoolId: item.school, count: 1 })
          return data
        }, [])
      })
      .then(_ => this.chart.setOption(this.options))
  }
}
</script>

<style lang="less" scope>
.statisticCharts {
  .charts {
    width: 100%;
    .chart {
      width: 100%;
      height: 500px;
    }
  }
}
</style>
