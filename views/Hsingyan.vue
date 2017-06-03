<template>
    <div class="container index">
      <headerBar></headerBar>
      <el-row class="box">
      <el-col :span="2">
      <sideNav></sideNav>
      </el-col>
      <el-col :span="22" class="menu-pannel-body f-left">
      <router-view></router-view>
      </el-col>
      </el-row>
    </div>
</template>

<script>
  import headerBar from '../components/headerNav.vue'
  import sideNav from '../components/sideNav.vue'
  import choosePeople_big from '../components/module/ui_choosePeople_big.vue'
  export default {
    name: 'app',
    data () {
      return {}
    },
    components: {
      headerBar,
      sideNav,
      choosePeople_big
    }
  }
</script>
