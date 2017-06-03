<template>
  <div class="ui_big">
    <div class="f-left">
      <p>以下部门和人员可看到审批模板</p>
      <el-tag
        v-for="tag in title"
        :key="tag.name"
        :closable="true"
        :id="tag.id"
        @close="handleClose(tag.id,title)"
      >
        {{tag.name}}
      </el-tag>
    </div>
    <div class="f-right">
      <p>人员选择</p>
      <choosePeople ref="tree2"></choosePeople>
    </div>
  </div>
</template>

<script>
  import choosePeople from './ui_choosePeople.vue'
  import {mapActions, mapGetters} from 'vuex'//接收数据用mapGetters
  export default {
    data() {
      return {
        isShow: true
      }
    },
    created(){
        console.log(75.)
      this.setTitle();
    },
    methods: {
      ...mapActions(['setTitle']),
      handleClose(id,title){
        var arr=[];
        if(title != undefined || title != ''){
            for(var i = 0;i<title.length;i++){
                if(id != title[i].id) {
                  arr.push(title[i].id);
                }
            }
        }
        this.$refs.tree2.$children[1].setCheckedKeys(arr);
      }
    },
    computed: mapGetters(['title']),
    components: {
      choosePeople
    }
  }
</script>

<style lang="less">
  .ui_big {
    width: 645px;
    height: 400px;
    background: #fff;
    border: 1px solid #dcdcdc;
    position: absolute;
    z-index: 100;
    padding: 10px;
    & > div {
      width: 50%;
    }
    p {
      margin-bottom: 10px;
    }
    .el-tag {
      margin-right: 5px;
    }
  }
</style>
