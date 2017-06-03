<template>
  <div class="newsAnnouncement">
    <!-------------------------------------------历史通告-------------------------------------------->
    <div class="history">
      <h3 class="title">历史公告</h3>
      <el-row class="history_header">
        <el-col :span="5">
          <div>发布时间</div>
        </el-col>
        <el-col :span="11">
          <div>公告标题</div>
        </el-col>
        <el-col :span="3">
          <div>发布人</div>
        </el-col>
        <el-col :span="5">
          <div class="text-center">编辑</div>
        </el-col>
      </el-row>
      <div class="history-box">
        <el-row class="history_content">
          <el-col :span="5">
            <div>2017-04-06 22:35</div>
          </el-col>
          <el-col :span="11">
            <div @click="isShow.historyVisible = true">测试2</div>
          </el-col>
          <el-col :span="3">
            <div>管理员b</div>
          </el-col>
          <el-col :span="5">
            <div class="text-center history_active">
              <span @click="isShow.historyEditor=true">编辑</span>
              <span @click="del('测试2')">删除</span>
              <span class="has-up">设置置顶</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="history_content">
          <el-col :span="5">
            <div>2017-04-06 22:35</div>
          </el-col>
          <el-col :span="11">
            <div @click="isShow.historyVisible = true">测试2</div>
          </el-col>
          <el-col :span="3">
            <div>管理员b</div>
          </el-col>
          <el-col :span="5">
            <div class="text-center history_active">
              <span @click="isShow.historyEditor=true">编辑</span>
              <span @click="del('测试2')">删除</span>
              <span @click="openUp">设为置顶</span>
            </div>
          </el-col>
        </el-row>
      </div>

      <!------分页器------>
      <div class="changPage">
        <span>Page 1 of 3 </span>
        <i class="el-icon-d-arrow-left"></i>
        <i class="el-icon-arrow-left"></i>
        <i class="el-icon-arrow-right"></i>
        <i class="el-icon-d-arrow-right"></i>
      </div>
    </div>
    <!-------------------------------------------发公告-------------------------------------------->
    <div class="sendNews">
      <h3 class="title">发公告</h3>
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <!------发送范围------>
        <el-form-item label="发送范围" class="redBefore">
          <!--内容不能为空-->
          <div class="el-form-item__error people__error" v-show="error.isPeopleError">请选择发送范围</div>
          <el-input placeholder="选择发送部门、人员"
                    @focus="change"
                    id="chooser"
                    readonly="readonly"
                    v-model="ruleForm.people"
          >
          </el-input>
          <div v-show="isShow.isChoose" class="ui_choose">
            <choosePeople_big ref="tree"></choosePeople_big>
            <div class="btn">
              <el-button type="primary"  @click="save(title)">保存</el-button>
              <el-button @click="isShow.isChoose = false">取消</el-button>
            </div>
          </div>
        </el-form-item>
        <!------公告标题------>
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <!------封面------>
        <el-form-item label="封面图片">
          <el-upload class="upload-demo"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     :file-list="ruleForm.fileList"
                     :on-success="handleAvatarSuccess"
                     :before-upload="beforeAvatarUpload">
            <el-button size="small" type="primary">点击上传</el-button>
            <span slot="tip" class="el-upload__tip">支持jpg/jpeg/bmp/gif/png类型文件，2M以内</span>
          </el-upload>
        </el-form-item>
        <!------发送人------>
        <el-form-item label="发送人" prop="name" class="redBefore">
          <el-input
            v-model="ruleForm.hasPerson"
            class="formName"
            @focus="isShow.showSendPeople = true"
            readonly="readonly"
          ></el-input>
          <!--发送人不能为空-->
          <div class="el-form-item__error people__error" v-show="error.isSendPeopleError">请选择发送人</div>
          <!-------------------------------------------选择发送人-------------------------------------------->
          <div v-show="isShow.showSendPeople" class="ui_choose_only">
            <choosePeople_only></choosePeople_only>
            <el-form-item class="ui_sendPeople_btn text-center">
              <el-button type="primary" @click="saveSendPerson(sendPerson)">保存</el-button>
              <el-button @click="isShow.showSendPeople = false">取消</el-button>
            </el-form-item>
          </div>
        </el-form-item>
        <!------公告正文------>
        <el-form-item label="正文" class="redBefore">
          <!-- use with components - bidirectional data binding（双向数据绑定） -->
          <quill-editor ref="myTextEditor"
                        v-model="ruleForm.content"
                        :config="ruleForm.editorOption"
                        @blur="onEditorBlur(ruleForm.content)"
                        @focus="error.isContentError = false"
          >
          </quill-editor>
          <!--错误提示：内容不能为空-->
          <div class="el-form-item__error content__error" v-show="error.isContentError">正文不能为空</div>
        </el-form-item>
        <!------附件------>
        <el-form-item label="附件">
          <el-upload class="upload-demo"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     :file-list="ruleForm.fileList"
                     :on-success="handlefujianSuccess"
                     :before-upload="beforefujianUpload"
          >
            <el-button size="small" type="primary">添加附件</el-button>
            <span slot="tip" class="el-upload__tip">支持doc/pdf/xls/ppt/zip类型文件，5M以内</span>
          </el-upload>
        </el-form-item>
        <!------发送、预览按钮------>
        <el-form-item>
          <el-button type="primary" @click="open('ruleForm',ruleForm.title)">发布</el-button>
          <el-button @click="viewLook('ruleForm')">预览</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-------------------------------------------预览公告-------------------------------------------->
    <el-dialog
      title="消息公告发布预览"
      :visible.sync="isShow.dialogVisible"
      size="tiny"
      :before-close="handleClose">
      <p class="text-center">
        {{ruleForm.title}}</p>
      <div>
        <p>
          <span>{{ruleForm.date2}}</span>
          <span>{{ruleForm.people}}</span>
        </p>
        <div class="text-center">
          <img src="../assets/消息公告预览/u4.jpg" alt="">
        </div>
      </div>
      <div class="viewTxt" v-html="ruleForm.content">
      </div>
      <div class="text-center">
        <div class="text-center">

        </div>
      <span slot="footer" class="dialog-footer">
        <el-button  type="primary" @click="isShow.dialogVisible = false">关闭</el-button>
      </span>
      </div>
    </el-dialog>
    <!-------------------------------------------预览历史公告-------------------------------------------->
    <el-dialog
      title="消息公告预览"
      :visible.sync="isShow.historyVisible"
      size="tiny"
      :before-close="handleClose">
      <p class="text-center">
        {{history.title}}</p>
      <div>
        <p>
          <span>{{history.date2}}</span>
          <span>{{history.people}}</span>
        </p>
        <div class="text-center">
          <img src="../assets/消息公告预览/u4.jpg" alt="">
        </div>
      </div>
      <div class="viewTxt" v-html="history.content">
      </div>
      <div class="text-center">
        <div class="text-center">

        </div>
        <span slot="footer" class="dialog-footer">
        <el-button  type="primary">上一条</el-button>
        <el-button  type="primary">下一条</el-button>
      </span>
      </div>
    </el-dialog>
    <!-------------------------------------------置顶公告-------------------------------------------->
    <el-dialog
      :visible.sync="isShow.upNew"
      size="tiny"
      :before-close="handleClose"
      class="up-news">
      <span>置顶后，该消息公告会出现在手机移动办公工作页面顶部，确认置顶该条公告吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="isShow.upNew = false">取 消</el-button>
    <el-button type="primary" @click="isShow.upNew = false">确 定</el-button>
  </span>
    </el-dialog>
    <!-------------------------------------------编辑公告-------------------------------------------->
    <el-dialog
      title="消息公告编辑"
      :visible.sync="isShow.historyEditor"
      size="tiny"
      class="history-editor"
      :before-close="handleClose">
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <!------发送范围------>
        <el-form-item label="发送范围" class="redBefore">
          <!--内容不能为空-->
          <div class="el-form-item__error people__error" v-show="error.isPeopleError">请选择发送范围</div>
          <el-input placeholder="选择发送部门、人员"
                    @focus="change"
                    id="chooser"
                    readonly="readonly"
                    v-model="ruleForm.people"
          >
          </el-input>
          <div v-show="isShow.isChoose" class="ui_choose">
            <choosePeople_big ref="tree"></choosePeople_big>
            <div class="btn">
              <el-button type="primary"  @click="saveHistoryEditor(title)">保存</el-button>
              <el-button @click="isShow.isChoose = false">取消</el-button>
            </div>
          </div>
        </el-form-item>
        <!------公告标题------>
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <!------封面------>
        <el-form-item label="封面图片">
          <el-upload class="upload-demo"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     :file-list="ruleForm.fileList"
                     :on-success="handleAvatarSuccess"
                     :before-upload="beforeAvatarUpload">
            <el-button size="small" type="primary">点击上传</el-button>
            <span slot="tip" class="el-upload__tip">支持jpg/jpeg/bmp/gif/png类型文件，2M以内</span>
          </el-upload>
        </el-form-item>
        <!------发送人------>
        <el-form-item label="发送人" prop="name" class="redBefore">
          <el-input
            v-model="ruleForm.hasPerson"
            class="formName"
            @focus="isShow.showSendPeople = true"
            readonly="readonly"
          ></el-input>
          <!--发送人不能为空-->
          <div class="el-form-item__error people__error" v-show="error.isSendPeopleError">请选择发送人</div>
          <!-------------------------------------------选择发送人-------------------------------------------->
          <div v-show="isShow.showSendPeople" class="ui_choose_only">
            <choosePeople_only></choosePeople_only>
            <el-form-item class="ui_sendPeople_btn text-center">
              <el-button type="primary" @click="saveSendPerson(sendPerson)">保存</el-button>
              <el-button @click="isShow.showSendPeople = false">取消</el-button>
            </el-form-item>
          </div>
        </el-form-item>
        <!------公告正文------>
        <el-form-item label="正文" class="redBefore">
          <!-- use with components - bidirectional data binding（双向数据绑定） -->
          <quill-editor ref="myTextEditor"
                        v-model="ruleForm.content"
                        :config="ruleForm.editorOption"
                        @blur="onEditorBlur(ruleForm.content)"
                        @focus="error.isContentError = false"
          >
          </quill-editor>
          <!--错误提示：内容不能为空-->
          <div class="el-form-item__error content__error" v-show="error.isContentError">正文不能为空</div>
        </el-form-item>
        <!------附件------>
        <el-form-item label="附件">
          <el-upload class="upload-demo"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     :file-list="ruleForm.fileList"
                     :on-success="handlefujianSuccess"
                     :before-upload="beforefujianUpload"
          >
            <el-button size="small" type="primary">添加附件</el-button>
            <span slot="tip" class="el-upload__tip">支持doc/pdf/xls/ppt/zip类型文件，5M以内</span>
          </el-upload>
        </el-form-item>
        <!------发送、预览按钮------>
        <el-form-item>
          <el-button type="primary" @click="isShow.historyEditor = false">发布</el-button>
          <el-button @click="viewLook('ruleForm')">预览</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  // or use with component(ES6)
  import {quillEditor} from 'vue-quill-editor'//引入文本编辑器
  import choosePeople_big from '../components/module/ui_choosePeople_big.vue'//引入选择人员组件
  import choosePeople_only from '../components/module/ui_choose_only.vue'//引入选择人员组件
  import {mapGetters} from 'vuex'//传递数据用mapActions
  export default{
    data() {
      return {
//        公告内容
        ruleForm: {
          title:'',//公告标题
          name: '',//发送
          date2: '2016-01-01',//公告时间
          content: '',//正文内容
          hasPerson:'',//发送人
          people: '',//        审批人员
          fileList: [],//       封面附件
          //正文
          editorOption: {
            // something config
          },
        },
//        公告验证规则
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ]
        },
//       错误提示
        error: {
          isPeopleError: false,//       发送范围错误
          isContentError: false,//        正文错误提示
          isSendPeopleError: false,//        发送人错误提示
        },
//        控件显示隐藏
        isShow:{
          isView: false, //        预览窗口
          dialogVisible: false,//     预览公告
          historyVisible: false,//     预览公告
          isChoose: false, //        ui-树形控件
          showSendPeople: false,//  发送人
          upNew:false,//  置顶
          historyEditor:false//   编辑公告
        },
        tags: [],
        data2: [
          '刘鹏',
          '王荣楠',
          '吕泽鹏',
          '刘鹏',
          '王荣楠',
          '吕泽鹏',
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        filterText: '',
//        预览历史通告
        history:{
            title:'历史标题',
            date2:'历史时间',
            people:'历史人物',
            content:'历史内容'
        }
      };
    },
    watch: {
      filterText(value) {
          console.log( this.$refs.tree2)
//        this.$refs.tree2.filter(value);
      }
    },
    // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
    methods: {
//        更改控件
      change(){
          this.isShow.isChoose = true;
          this.$refs.tree.$el.querySelector(".f-left p").innerHTML = "已选择的部门和人员";
          this.$refs.tree.$el.querySelector(".f-right p").innerHTML = "选择部门和人员";
      },
//      置顶
      openUp() {
        this.$confirm('置顶后，该消息公告会出现在手机移动办公工作页面顶部，确认置顶该条公告吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '置顶成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消置顶'
          });
        });
      },
//      删除公告
      del(txt) {
        this.$confirm('确认删除标题为'+txt+'的公告', '消息公告删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      },
      saveHistoryEditor(title){
          this.ruleForm.people = '';
          if(title == undefined || title == ''){
            this.error.isPeopleError = true;
          } else{
            this.error.isPeopleError = false;
            for(var i=0 ;i<title.length;i++){
              this.ruleForm.people += title[i].name + " ";
            }
            this.isShow.isChoose = false;
          }
      },
      saveSendPerson(person){
        this.ruleForm.hasPerson = person;
        this.ruleForm.hasPerson == '' ? this.error.isSendPeopleError = true :this.error.isSendPeopleError = false;
        this.isShow.showSendPeople = false
      },
      chooseSendPerson(text){
          this.ruleForm.hasPerson = text
      },
//<!--内容不能为空-->
      onEditorBlur(editor) {
        editor == ''?this.error.isContentError = true:this.error.isContentError = false;
      },
      onEditorChange({editor, html, text}) {
        this.ruleForm.content = html
      },
//      发布公告
      open(formName,cc) {
        this.$refs[formName].validate((valid) => {
          this.commonLook();
          if (this.error.isContentError == false &&
            this.error.isPeopleError == false &&
            this.error.isSendPeopleError == false) {
            this.error.isContentError = false;
            this.error.isPeopleError = false;
            if (valid) {
              this.$confirm('确认发布标题为 '+cc+' 的公告', '消息公告发布', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: ''
              }).then(() => {
                console.log(this.ruleForm)
                this.$message({
                  type: 'success',
                  message: '发布成功!'
                });
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消发布'
                });
              })
            } else {
              return false;
            }
          }
        });
      },
//      发布预览公共方法
      commonLook(){
        this.ruleForm.content == ""?this.error.isContentError = true:'';
        this.ruleForm.people == ""?this.error.isPeopleError = true:'';
        this.ruleForm.hasPerson == ""?this.error.isSendPeopleError = true:'';
      },
//      预览窗口
      viewLook(formName){
        this.$refs[formName].validate((valid) => {
          this.commonLook();
          if (this.error.isContentError == false &&
            this.error.isPeopleError == false &&
            this.error.isSendPeopleError == false) {
            this.error.isContentError = false;
            this.isShow.dialogVisible = true;
          }
        });
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
//      上传封面
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('支持jpg/jpeg/gif/png类型文件!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
//      上传附件
      handlefujianSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforefujianUpload(file) {
        var type = file.name.split(".")[1];
        const isJPG = type === 'doc' || type ==='pdf' || type ==='xls' || type ==='ppt' || type ==='zip' || type ==='docx';
        const isLt2M = (file.size / 1024 /1024) < 5;
        if (!isJPG) {
          this.$message.error('支持doc/pdf/xls/ppt/zip类型文件!');
        }
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过 5MB!');
        }
        return isJPG && isLt2M;
      },
    },
    // if you need to get the current editor object, you can find the editor object like this, the $ref object is a ref attribute corresponding to the dom redefined
    // 如果你需要得到当前的editor对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的editor对象，实际上这里的$refs对应的是当前组件内所有关联了ref属性的组件元素对象
    computed: mapGetters(['title','sendPerson'])
//      {
//      getter(){
//          mapGetters(['title'])
//      },
//      editor() {
//        return this.$refs.myTextEditor.quillEditor
//      }
//    }
    ,
    components: {
      quillEditor,
      choosePeople_big,
      choosePeople_only
    }
  }
</script>

<style lang="less">
  @import "../style/mixin";
  @w-200: 240px;
  .newsAnnouncement {
    .up-news>div{
      width: 390px!important;
    }
    .has-up {
      color: #999;
    }
    .history-editor>div{
      top: 15%!important;
      width: 60%!important;
    }
    .title {
      padding: 10px 10px 0;
    }
    .history {
      height: 180px;
      margin-bottom: 10px;
      border-bottom: 1px dashed #d6d6d6;
      position: relative;
      .history_header {
        .line-h(40px);
        padding: 0 10px;
        border-bottom: 1px solid #d6d6d6;
      }
      .history_content {
        padding: 0 10px;
        line-height: 28px;
      }
      .history_active {
        span {
          cursor: pointer;
        }
      }
      .changPage {
        position: absolute;
        bottom: 10px;
        right: 20px;
        span {
          margin-right: 5px;
        }
      }
    }
    .sendNews {
      position: relative;
      border-bottom: 1px dashed #d6d6d6;
      border-top: 1px dashed #d6d6d6;
      .people__error {
        top:-22px;
      }
      .sendPeople {
        position: absolute;
        top:0;
        left: 10px;
        span {
          margin-right: 5px;
        }
      }
      .el-form {
        margin: 10px;
        width: 630px;
      }
      .el-select .el-input {
        width: 530px;
      }
      .formName {
        input {
          width: 50%;
        }
      }
      .el-upload__tip {
        margin-left: 10px;
      }
      /*富文本编辑器*/
      .ql-editor {
        height: 120px;
      }
      /*预览*/
      .viewLook {
        position: absolute;
        bottom: 22px;
        left: 210px;
      }
    }
    .ui_choose {
      position: absolute;
      .wh(100%,400px);
      .el-input {
        width: @w-200;
        display: block;
      }
      .btn {
        position: absolute;
        bottom: 15px;
        left: 50%;
        margin-left: -78px;
        z-index: 200;
      }
    }
    .ui_big {
      width: 100%;
      .el-tree {
        width: @w-200;
      }
    }
    .el-dialog--tiny {
      width: 80% !important;
      top: 31% !important;
      p {
        line-height: 30px;
        span {
          margin-right: 10px;
          &:nth-child(1){
            margin-right: 80px;
          }
        }
      }
      img {
        .wh(593px;143px);
      }
      .viewTxt {
        width: 593px;
        margin: 10px auto;
      }
    }
    .ui_choose_only {
      .wh(500px;320px);
      position: absolute;

      .ui_sendPeople_btn {
        width: 100%;
        bottom: 10px;
        position: absolute;
        z-index: 100;
      }
    }
  }


</style>
