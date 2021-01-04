import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //所有任务列表
        list:[],
        //文本框value
        inputValue:"",
        //下一个id
        nextId:5,
        viewKwy:"all"
    },
    mutations: {
        initList(state,list) {
            state.list = list;
        },
        //为store中inputValue赋值
        setInputValue(state,val) {
            state.inputValue = val
        },
        addItemList(state) {
            let obj = {
                id:state.nextId,
                info:state.inputValue.trim(),
                done:false
            }
            state.list.push(obj);
            state.nextId++;
            state.inputValue = "";
        },
        //删除item
        semoveItemList(state,id) {
            //根据id查找对应的索引
            //根据索引删除对应的item
            const i = state.list.findIndex(x => x.id === id);
            if(i != -1) state.list.splice(i,1);
        },
        //选中item
        selectedItem(state,param) {
            const i = state.list.findIndex(x => x.id === param.id);
            if(i !=-1) state.list[i].done == param.status;
        },
        //清除已完成
        clearDone(state) {
            state.list = state.list.filter(x => x.done === false)
        },
        //修改页面上展示数据
        changeViewKey(state,key) {
            state.viewKwy = key;
        }
    },
    actions: {
        getList (context) {
            axios('/meun').then(data => {
                context.commit('initList',data.data.list)
            })
        }
    },
    getters: {
        //统计未完成任务条数
        unDonelength(state) {
            return state.list.filter(x =>x.done ===false ).length
        },

        infoList(state) {
            if(state.viewKwy === "all") return state.list;
            if(state.viewKwy === "undone") return state.list.filter(x =>!x.done);
            if(state.viewKwy === "done") return state.list.filter(x =>x.done);
            return state.list;
        }
    }
})