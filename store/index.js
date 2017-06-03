import Vue from 'vue'
import Vuex from 'vuex';
import ajax from 'axios'

import { loginByUser } from '../api/login';
import Cookies from 'js-cookie';
Vue.use(Vuex)
export default new Vuex.Store({
  //状态集合
  state: {
    title: '',
    sendPerson: '',
    token: Cookies.get('Admin-Token'),
    user: '',
  },
  mutations: {
    //每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
    SET_TITLE(state, title){
      state.title = title;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_SENDPERSON: (state, sendPerson) => {
      state.sendPerson = sendPerson;
    }
  },
  //方法集合
  actions: {
    setTitle({commit}, title){
      commit('SET_TITLE', title)
    },
    setSendPerson({commit}, sendPerson){
      commit('SET_SENDPERSON', sendPerson)
    },

    // 邮箱登录
    loginByUser({ commit }, userInfo) {
      const user = userInfo.user.trim();
      return new Promise((resolve, reject) => {
          loginByUser(user, userInfo.password).then(response => {
            const data = response.data;
            Cookies.set('Admin-Token', response.data.token);
            commit('SET_TOKEN', data.token);
            commit('SET_USER', user);
            resolve();
          }).catch(error => {
              reject(error);
        });
      });
    },

// setLogined: ({ commit }, logined) => {
//     commit('SET_LOGINED', logined)
// },
// getLogin: ({ commit }) => {
//     commit('GET_LOGIN')
// },
// getCart: ({ commit }) => {
//     commit('GET_CART')
// },
// getShopList:({commit})=>{
// commit('GetShopList')
// },
// getCartList:({commit})=>{
//     commit('GETCARTLIST')
// }

  },
//获取状态
  getters: {
      title: state => state.title,
      sendPerson: state => state.sendPerson,
      token: state => state.token,
      user: state => state.token,
  }
})

// export default user;
