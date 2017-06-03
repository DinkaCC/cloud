<template>
  <div class="setting">
    <!---------------------------------------------------左侧 设置功能入口-------------------------------------------->
    <el-col :span="24" class="menu-pannel-body f-left">
      <el-col :span="6" class="sub-menu-pannel">
        <ul>
          <li v-for="(sideList,index) in sideList" @click="jump(sideList.src,index)">
            {{sideList.text}}
            <i :class='isCur==index?"el-icon-arrow-right f-right":""'></i>
          </li>
        </ul>
      </el-col>
      <!-----------------------------------------------右侧 相应路由------------------------------------------------>
      <el-col :span="18">
        <router-view></router-view>
      </el-col>
    </el-col>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        sideList: [
          {
            text: "企业信息设置",
            src: "/hsingyan/setting/information"
          }, {
            text: "修改登录密码",
            src: "/hsingyan/setting/changePassword"
          }, {
            text: "最新通告",
            src: "/hsingyan/setting/recentNew"
          }
        ],
        isCur:0,
      }
    },
    methods: {
        jump(src,index){
          this.isCur = index;
          this.$router.push({path:src})
        }
    }
  }
</script>

<style lang="less">
  @import "../style/mixin";
  .setting {
    h2 {
      .line-h(60px);
    }
  }
</style>


