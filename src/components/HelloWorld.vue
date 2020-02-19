<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="school in schools" :key="school.ID">
        {{school.name}} -- {{school.location}} -- {{school.tel}}
      </li>
    </ul>
    <el-button>廖莎</el-button>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
  </div>
</template>

<script>
import api from '../common/fetch'
import { NAME_SPACE_ADMIN } from '../common/constants/namespace'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      schools: []
    }
  },
  async mounted () {
    api[NAME_SPACE_ADMIN].getAllSchool().then(res => {
      this.schools = res
    }).catch(err => this.$message.error(err.toString()))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
