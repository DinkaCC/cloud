<template>
  <div class="ui_choose">
    <el-input
      placeholder="输入关键字进行过滤"
      icon="search"
      v-model="filterText">
    </el-input>
    <el-tree
      :data="data2"
      default-expand-all
      :filter-node-method="filterNode"
      show-checkbox
      node-key="id"
      :props="defaultProps"
      @check-change="handleClick"
      ref="tree2">
    </el-tree>
  </div>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'//接收数据用mapGetters
  export default {
    data(){
      return {
        tags: [],
        data2: [
            {
          id: 1,
          label: '北京星焱信息智能科技有限公司（3人）',
          children: [{
            id: 2.1,
            label: '市场部（2人）',
            children: [{
              id: 3.1,
              label: '123'
            }, {
              id: 3.2,
              label: '456'
            }]
          }, {
            id: 2.2,
            label: '研发部（2人）',
            children: [{
              id: 3.3,
              label: '123'
            }]
          }]
        }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        filterText: ''
      }
    },
    created(){
      this.setTitle();
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val)
      }
    },
    methods: {
      ...mapActions(['setTitle']),
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      handleClick(data,isChecked) {
        this.setTitle(this.tags);
        if (data.label.indexOf("市场部") == -1 &&
          data.label.indexOf("研发部") == -1 &&
          data.label.indexOf("北京星焱信息智能科技有限公司") == -1) {
          if (isChecked) {
            var jsObj = {};
            jsObj.name = data.label;
            jsObj.id = data.id;
            this.tags.push(jsObj);
          } else {
            var arr = this.tags;
            this.tags.forEach(function (val, idx) {
              if (data.id == val.id) {
                arr.splice(idx, 1)
              }
            })
          }
          data.isChoose = isChecked;
        }
      },
    },
  }
</script>

<style lang="less">
  .ui_choose {
    .f-right {
      padding: 0 10px ;
    }
    p {
      border-bottom: 1px dashed #ccc;
      height: 36px;
      line-height: 36px;
    }
    .el-tree {
      width: 100%;
      overflow: auto;
      height: 240px;
    }
    .el-input {
      display: none;
    }
  }
</style>
