<template>
  <div class="homePage">
    <!---------------------------------------------------左侧 公司信息 登录信息-------------------------------------------->
    <el-col :span="24" class="menu-pannel-body f-left">
      <el-col :span="6" class="sub-menu-pannel">
        <ul class="text-center">
          <li>
            <img src="../assets/logo2.png" alt="公司logo">
          </li>
          <li>XX公司</li>
        </ul>
        <ul>
          <li><span>企业人数：50</span></li>
          <li><span>部门数：6</span></li>
          <li><span>昨日登录用户数：32</span></li>
        </ul>
        <ul>
          <li><a href="javascript:void(0);"><i class="el-icon-document"></i><span>操作指导书下载</span></a></li>
        </ul>
      </el-col>
      <!-----------------------------------------------右侧 轮播 快捷入口------------------------------------------------>

      <el-col :span="18">
        <!--轮播-->
        <div class="carousel" @mouseenter="showArrow" @mouseleave="showArrow" @click="showNews">
          <swiper :options="swiperOption">
            <!--静态数据 之后从后台获取数据-->
            <swiper-slide>
              <a href="javascript:void(0)">
                <img src="../assets/首页/u34.jpg">
              </a>
            </swiper-slide>
            <swiper-slide>
              <a href="javascript:void(0)">
                <img src="../assets/首页/u36.jpg">
              </a>
            </swiper-slide>
            <swiper-slide>
              <a href="javascript:void(0)">
                <img src="../assets/首页/u38.jpg">
              </a>
            </swiper-slide>
            <swiper-slide>
              <a href="javascript:void(0)">
                <img src="../assets/首页/u40.jpg">
              </a>
            </swiper-slide>
            <swiper-slide>
              <a href="javascript:void(0)">
                <img src="../assets/首页/u42.jpg">
              </a>
            </swiper-slide>
            <swiper-slide>
              <a href="javascript:void(0)">
                <img src="../assets/首页/u44.jpg">
              </a>
            </swiper-slide>
            <!--轮播原点-->
            <div class="swiper-pagination" slot="pagination">
            </div>
          </swiper>
          <!-- Add Arrows -->
          <div class="swiper-button-next swiper-button-white" v-show="isShow"></div>
          <div class="swiper-button-prev swiper-button-white" v-show="isShow"></div>
        </div>
        <!--快捷入口-->
        <div class="fastEnter">
          <h2>快捷入口</h2>
          <ul class="main-menus">
            <li v-for="list in fastEnter"  @click="jump(list.src)"><i :class="list.icon"></i>{{list.text}}</li>
          </ul>
        </div>
      </el-col>
    </el-col>
    <!--弹窗 公告展示-->
    <el-dialog
      title="通告预览"
      :visible.sync="dialogVisible"
      size="tiny">
      <p class="text-center">
        {{ruleForm.title}}</p>
      <div>
        <p>
          <span>{{ruleForm.date2}}</span>
          <span v-for="list in ruleForm.people">{{list}}</span>
        </p>
        <div class="text-center">
          <img src="../assets/消息公告预览/u4.jpg" alt="">
        </div>
      </div>
      <div class="viewTxt" v-html="ruleForm.content">
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    swiper,
    swiperSlide
  } from 'vue-awesome-swiper'
  export default {
    data(){
      return {
//              轮播设置
        swiperOption: {
          autoplay: 3000,//轮播循环时间
          autoplayDisableOnInteraction: false,
          pagination: '.swiper-pagination',//轮播原点
          paginationClickable: true,//点击原点切换图片
          prevButton: '.swiper-button-prev',//上一张
          nextButton: '.swiper-button-next'//下一张
        },
        isShow: false,//隐藏箭头
        dialogVisible: false,//消息公告弹窗
//        用v-for 方便路由跳转
        fastEnter: [
          {
            text: '通讯录',
            icon: 'el-icon-message',
            src:'/hsingyan/addressList'
          }, {
            text: '审批',
            icon: 'el-icon-edit',
            src:'/hsingyan/work/approval'
          },{
            text: '工作计划',
            icon: 'el-icon-edit',
            src:'/hsingyan/work/plan'
          },{
            text: '公告',
            icon: 'el-icon-edit',
            src:'/hsingyan/work/newsAnnouncement'
          },{
            text: '处理日志',
            icon: 'el-icon-edit',
            src:'/hsingyan/work/log'
          },

        ],
//        模拟mock数据  后期可删
        ruleForm: {
          title: '标题',
          people: [
              'name1',
              'name2',
          ],
          content:'content',
          date2:'22222=2222'
        }
      }
    },
    methods: {
      showArrow: function () {
        return this.isShow = !this.isShow
      },
      jump(src){
          this.$router.push({path:src})
      },
      showNews(){
          this.dialogVisible = true
      }
    },
    components: {
      swiper,
      swiperSlide
    },
  }
</script>

<style lang="less">
  @import "../style/mixin";
  .homePage {
    /*菜单主要内容*/
    .menu-pannel-body {
      ul {
        line-height: 38px;
        border-top: 1px solid #e6e5e6;
        &:nth-child(1) {
          padding: 0;
          border: none;
          img {
            .circle(auto);
            vertical-align: middle;
          }
          li {
            &:nth-child(1) {
              .line-h(106px)
            }
          }
        }
        &:nth-child(2) {
          height: 65%;
          padding: 0 20px;
        }
        &:nth-child(3) {
          padding: 0 20px;
          i {
            margin-right: 10px;
          }
        }
      }
      /*轮播*/
      .carousel {
        .wh(520px, 280px);
        margin: 25px auto;
        position: relative;
        img {
          .wh(100%, 100%);
        }
        /*轮播圆点*/
        .swiper-pagination-bullet {
          .wh(10px, 10px);
        }
        /*图片切换*/
        .swiper-button-next,
        .swiper-button-prev {
          .wh(32px, 58px);
          margin-top: -26px;
          background-color: rgba(0, 0, 0, .3);
        }
        .swiper-pagination {
          width: 28%;
          border-radius: 10px;
          left: 50%;
          margin-left: -14%;
          background-color: rgba(0, 0, 0, .3);
          bottom: 25px;
        }
      }
      /*圆点选中*/
      .carousel .swiper-pagination-bullet-active {
        opacity: 1;
        background-color: #ff6600;
      }
      /*圆点没有选中*/
      .swiper-pagination-bullet {
        background: #fff;
        opacity: 0.8;
      }
      /*快捷入口*/
      .fastEnter {
        h2 {
          margin-bottom: 10px;
          margin-left: 10px;
        }
        ul {
          padding: 20px;
        }
        li {
          .line-h(40px);
          width: 30%;
          overflow: hidden;
          display: inline-block;
          font-size: 20px;
          margin-right: 10px;
          margin-bottom: 10px;
          cursor: pointer;
          i {
            margin: 0 20px;
            color: #707275;
          }
        }

      }
    }
    .el-dialog__footer {
      text-align: center;
    }
    .el-dialog {
      width: 800px;
      img {
        .wh(100%,200px);
        margin: 20px 0;
      }
      p {
        span {
          margin-right: 10px;
          &:nth-child(1) {
            margin-right: 20px;
          }
        }
      }
    }
  }
</style>


