<template>
  <div class="plan">
    <div class="choose">
      <div class="title">
        <p class="f-left">工作计划详细信息</p>
        <el-button class="f-right el-button el-button--primary" @click="isShow.dialogVisible = true">新增工作计划</el-button>
      </div>
      <el-row>
        <el-col :span="11">
          <el-form
            ref="form"
            :model="form"
            label-width="70px">
            <el-form-item label="提交时间">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="text-center" :span="2">至</el-col>
              <el-col :span="11">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2"
                                style="width: 100%;"></el-time-picker>
              </el-col>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form ref="form" :model="form" label-width="70px">
            <el-form-item label="完成时间">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date3"
                                style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="text-center" :span="2">至</el-col>
              <el-col :span="11">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date4"
                                style="width: 100%;"></el-time-picker>
              </el-col>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form ref="form" :model="form" label-width="70px">
            <el-form-item label="工作内容">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form ref="form" :model="form" label-width="70px">
            <el-form-item label="责任人">
              <el-input
                v-model="content.hasBlame"
                icon="search"
                @focus="isShow.isBlame=true"
              ></el-input>
              <div v-show="isShow.isBlame" class="ui_choose_div">
                <choosePeople></choosePeople>
                <el-button class="choose_btn" @click="blameChoose(title)">选择</el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form ref="form" :model="form" label-width="70px">
            <el-form-item label="提交人">
              <el-input v-model="content.hasSubmit"
                        icon="search"
                        :on-icon-click="handleIconClick"
                        @focus="isShow.isSubmit=true"
              >
              </el-input>
              <div v-show="isShow.isSubmit" class="ui_choose_div">
                <choosePeople></choosePeople>
                <el-button class="choose_btn" @click="submitChoose(title)">选择</el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="10" :offset="3">
          <el-button type="primary">提交</el-button>
          <el-button>查询</el-button>
        </el-col>
      </el-row>


    </div>
    <div class="contain">
      <el-row class="little-help">
        <el-col :span="2" :offset="19">
          <i class="el-icon-close color-danger"></i>
          <span>删除</span>
        </el-col>
        <el-col :span="3">
          <i class="el-icon-upload2 "></i>
          <span>导出Excel</span>
        </el-col>
      </el-row>
      <div class="table">
        <el-row class="table-title">
          <el-col :span="5">
            <template>
              <!-- `checked` 为 true 或 false -->
              <el-checkbox v-model="checked">工作计划编号</el-checkbox>
            </template>
          </el-col>
          <el-col :span="5">工作内容</el-col>
          <el-col :span="3">责任人</el-col>
          <el-col :span="4">完成时间</el-col>
          <el-col :span="3">提交人</el-col>
          <el-col :span="4">提交时间</el-col>
        </el-row>
        <el-row class="table-content">
          <el-col :span="5">
            <template>
              <!-- `checked` 为 true 或 false -->
              <el-checkbox v-model="checked">1</el-checkbox>
            </template>
          </el-col>
          <el-col :span="5">2</el-col>
          <el-col :span="3">3</el-col>
          <el-col :span="4">4</el-col>
          <el-col :span="3">5</el-col>
          <el-col :span="4">6</el-col>
        </el-row>
        <p class="noTxt">暂无内容</p>
      </div>

      <div class="changPage">
        <span>Page 1 of 3</span>
        <i class="el-icon-d-arrow-left"></i>
        <i class="el-icon-arrow-left"></i>
        <i class="el-icon-arrow-right"></i>
        <i class="el-icon-d-arrow-right"></i>
      </div>
    </div>
    <!-------------------------------------------预览公告-------------------------------------------->
    <el-dialog
      :visible.sync="isShow.dialogVisible"
      size="tiny"
      :before-close="handleClose"
    >
      <div class="clear dialog_content">
        <h2>新增工作计划</h2>
        <el-row>

          <el-form
            ref="form2"
            :model="form2"
            :rules="rules"
            label-width="100px">
          <el-col :span="12">
              <el-form-item label="工作计划编号"
                            prop="number">
                <el-input
                  v-model="form2.number"
                  readonly="readonly"></el-input>
              </el-form-item>
              <el-form-item label="责任人"
                            prop="addBlame">
                <el-input
                  v-model="form2.addBlame"
                  icon="search"
                  readonly="readonly"
                  @focus="isShow.addBlame = true;isShow.addSubmit = false"
                ></el-input>
                <div v-show="isShow.addBlame" class="add_choose_div">
                  <choosePeople></choosePeople>
                  <el-button class="choose_btn" @click="AddBlameChoose(title)">选择</el-button>
                </div>
              </el-form-item>
              <el-form-item label="完成时间"
                            prop="date5">
                <el-time-picker type="fixed-time"
                                placeholder="选择时间"
                                v-model="form2.date5"
                                style="width: 100%;">
                </el-time-picker>
              </el-form-item>
              <el-form-item label="提交人"
                            prop="addSubmit">
                <el-input v-model="form2.addSubmit"
                          icon="search"
                          readonly="readonly"
                          :on-icon-click="handleIconClick"
                          @focus="isShow.addSubmit = true;isShow.addBlame = false"
                >
                </el-input>
                <div v-show="isShow.addSubmit" class="add_choose_div">
                  <choosePeople></choosePeople>
                  <el-button class="choose_btn" @click="AddSubmitChoose(title)">选择</el-button>
                </div>
              </el-form-item>

          </el-col>
          <el-col :span="12">
              <el-form-item label="工作内容" prop="content">
                <el-input type="textarea" v-model="form2.content"></el-input>
              </el-form-item>
          </el-col>

          </el-form>
        </el-row>
        <el-row>
          <el-form ref="form" :model="form2" label-width="90px">
            <el-form-item label="备注">
              <el-input v-model="form2.remarks"></el-input>
            </el-form-item>
          </el-form>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit('form2',title)">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import choosePeople from '../components/module/ui_choosePeople.vue'
  import {mapActions, mapGetters} from 'vuex'//接收数据用mapGetters
  export default{
    data(){
      return {
        form: {
          date1: '',
          date2: '',
          date3: '',
          date4: '',
        },
        form2: {
          date5: '',
          remarks: '',
          content: '',
          number: 'GZJHYYMMDD001',
          addBlame: '',
          addSubmit: '',
        },
        //公告验证规则
        rules: {
          number: [
            {required: true},
          ],
          addBlame: [{required: true, message: '请输入责任人', trigger: 'change'}],
          date5: [{type: 'date',required: true, message: '请输入完成时间', trigger: 'change'}],
          addSubmit: [{required: true, message: '请输入提交人', trigger: 'change'}],
          content: [
            {required: true, message: '请输入工作内容', trigger: 'blur'},
            {min: 3,  message: '长度大于3个字符', trigger: 'blur'}
          ],
        },
        checked: false,
        isShow: {
          isSubmit: false,
          isBlame: false,
          dialogVisible: false,
          addBlame: false,
          addSubmit: false
        },
        content: {

          hasSubmit: '',
          hasBlame: '',
        },
        tags: [],
        error: {
          isPeopleError: false,//       发送范围错误
        },
      }
    }
    ,
    methods: {
      handleIconClick: function () {

      },
      submit(formName,title){
        this.$refs[formName].validate((valid) => {
            if(valid){
              this.$confirm('', '您确认要保存该设置吗？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: ''
              }).then(() => {
                this.isShow.dialogVisible = false;
                this.$message({
                  type: 'success',
                  message: '保存成功!'
                });
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                });
              });
            }
        })
      },
      blameChoose(val){
        this.content.hasBlame = '';
        for (var i = 0; i < val.length; i++) {
          this.content.hasBlame += val[i].name + " ";
        }
        ;
        this.isShow.isBlame = false;
      },
      AddBlameChoose(val){
        this.form2.addBlame = '';
        for (var i = 0; i < val.length; i++) {
          this.form2.addBlame += val[i].name + " ";
        }
        ;
        this.isShow.addBlame = false;
      },
      AddSubmitChoose(val){
        this.form2.addSubmit = '';
        for (var i = 0; i < val.length; i++) {
          this.form2.addSubmit += val[i].name + " ";
        }
        ;
        this.isShow.addSubmit = false;
      },
      submitChoose(val){
        this.content.hasSubmit = '';
        for (var i = 0; i < val.length; i++) {
          this.content.hasSubmit += val[i].name + " ";
        }
        ;
        this.isShow.isSubmit = false;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
    },
    computed: mapGetters(['title']),
    components: {
      choosePeople
    }
  }
</script>

<style lang="less">
  @import "../style/mixin";
  .el-row {
    width: 100%;
  }

  .plan {
    label,
    button,
    span,
    div {
      font-size: 12px;
    }
    .title {
      .line-h(46px);

      padding: 0 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #d6d6d6;
    }
    .choose {
      height: 230px;
      margin: 10px 0;
      border-bottom: 1px dashed #d6d6d6;
      position: relative;
      .el-date-editor--date {
        font-size: 12px;
      }
      .el-button--primary {
        margin-left: 13px;
      }
    }

    .el-tree {
      position: absolute;
      z-index: 100;
      background: #fff;
    }
    .contain {
      position: relative;
      border-bottom: 1px dashed #d6d6d6;
      border-top: 1px dashed #d6d6d6;
      .little-help {
        span {
          .line-h(30px);

          color: #0099FF;
          margin-left: 5px;
          cursor: pointer;
        }
      }
      .table {
        height: 220px;
        div {
          .line-h(30px);
          padding-left: 5px !important;
        }
      }
      .table-title {
        background: #D3DCE6;
      }
      .changPage {
        position: absolute;
        bottom: -28px;
        left: 50%;
        margin-left: -50px;
      }
      .noTxt {
        text-align: center;
        width: 100%;
        position: absolute;
        bottom: 5px;
        color: #999;
      }
    }
    .el-tree-node__label {
      width: 172px;
    }
    .choose_btn {
      position: absolute;
      bottom: 10px;
      z-index: 100;
      right: 10px;
    }
    .ui_choose_div {
      .wh(245px;260px);
      position: absolute;
      background: #fff;
    }
    .add_choose_div {
      .wh(100%;260px);
      position: absolute;
      background: #fff;
      .el-tree-node__label {
        width: 140px;
        overflow: hidden;
      }
    }
    .el-dialog {
      width: 1000px;
    }
    .dialog_content {
      border: 1px solid #ccc;
      height: 488px;
      h2 {
        .line-h(40px);
        text-align: center;
        border-bottom: 1px dashed #ccc;
      }
      & > div {
        padding: 20px;
      }
      .el-col {
        padding: 10px;
      }
      .el-textarea {
        textarea {
          height: 210px;
          overflow: auto;
        }
      }
    }
    .el-tree {
      height: 260px;
    }
  }
</style>
