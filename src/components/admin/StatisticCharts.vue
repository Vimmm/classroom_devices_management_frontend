<template>
  <div class="statisticCharts">
    <div class="charts">
      <div class="chart" id="mycharts"></div>
    </div>
  </div>
</template>

<script>
import api from '../../common/fetch'
import { NAME_SPACE_ADMIN } from '../../common/constants/namespace'
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
          text: '维修次数'
        },
        tooltip: {},
        xAxis: {
          data: this.source.map(it => it.schoolName)
        },
        yAxis: {},
        series: [{
          name: '次数',
          type: 'bar',
          itemStyle: {
            color: "rgb(143,185,228)"
          },
          data: this.source.map(it => it.count)
        }]
      }
    }
  },
  mounted () {
    this.chart = this.$echarts.init(document.getElementById('mycharts'))
    Promise.all([
      api[NAME_SPACE_ADMIN].getCharts(),
      api[NAME_SPACE_ADMIN].getAllSchool()
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
