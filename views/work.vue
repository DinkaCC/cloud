<template>
  <div class="work">
    <!---------------------------------------------------左侧 工作功能入口-------------------------------------------->
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
        //        用v-for 方便路由跳转
        sideList: [
          {
            text: "消息公告",
            src: "/hsingyan/work/newsAnnouncement",
          }, {
            text: "审批应用",
            src: "/hsingyan/work/approval"
          }, {
            text: "工作计划",
            src: "/hsingyan/work/plan"
          }, {
            text: "处理日志",
            src: "/hsingyan/work/log"
          },
        ],
        isCur:0,
      }
    },
    methods: {
      //       路由跳转
      jump(src,index){
        this.isCur = index;
        this.$router.push({path:src})
      }
    },
  }
</script>

