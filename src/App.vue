<template>
  <div id="app">
    <div class="ci-demo">
      <Input placeholder="" style="width:70%" :value="inputValue" @on-change="handInput"/> 
      <Button type="primary" @click="addItem">添加事项</Button>
      <div class="ci-demo-list"> 
        <div v-for="(item,key) in infoList" :key="key" class="ci-demo-item">
          <Checkbox v-model="item.done" @on-change = "(e) =>{changeItemDone(e,item.id)}">{{item.info}}</Checkbox>
          <a class="ci-demo-remove" @click="removeItem(item.id)">删除</a>
        </div>
      </div>
      <!-- 底部 -->
      <div>
       
        <div class="ci-demo-btn">
          <span>{{unDonelength}}条剩余</span>
          <ButtonGroup>
            <Button :type="viewKwy === 'all' ? 'primary' : 'default'" @click = "changeList('all')">全部</Button>
            <Button :type="viewKwy === 'done' ? 'primary' : 'default'" @click = "changeList('done')">已完成</Button>
            <Button :type="viewKwy === 'undone' ? 'primary' : 'default'" @click = "changeList('undone')">未完成</Button>
          </ButtonGroup>
          <a style="margin-left:20px" @click="removeDoneAll">清空已完成</a>
        </div>
      </div>
    </div>
    <audio src=""></audio>
  </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      
    }
  },
  created() {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['inputValue','viewKwy']),
    ...mapGetters(['unDonelength','infoList'])

  },
  methods: {
    handInput(e) {
      this.$store.commit('setInputValue',e.target.value)
    },
    //新增item
    addItem() {
      if(this.inputValue.trim() <=0) {
        return this.$Message.warning('新增内容不能为空！')
      }
      this.$store.commit('addItemList')
    },
    //删除item
    removeItem(id) {
      this.$store.commit('semoveItemList',id);
    },
    //监听复选框选中状态
    changeItemDone(e,id) {
      const param = {
        id:id,
        status:e
      }
      this.$store.commit('selectedItem',param)
    },
    //清除已完成
    removeDoneAll() {
      this.$store.commit('clearDone')
    },
    //修改页面上展示数据
    changeList(key) {
      this.$store.commit("changeViewKey",key)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
.ci-demo{
  width: 400px;
  padding-left: 20px;
}
.ci-demo-list{
  width: 100%;
  border: 1px solid #2c171783;
  margin-top: 20px;
}
.ci-demo-item{
  height: 40px;
  line-height: 40px;
  border-top: 1px solid #2c171783;
  padding-left: 20px;
  
}
.ci-demo-item:nth-child(1) {
    border-top: none;
  }
.ci-demo-remove{
  float: right;
  margin-right: 20px;
}
.ci-demo-btn {
  height: 40px;
  padding-top: 20px;
}
</style>
