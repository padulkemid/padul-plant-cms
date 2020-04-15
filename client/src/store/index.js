import Vue from 'vue';
import Vuex from 'vuex';

import { login } from '@/functions/login.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLoggedIn: false,
    form: {
      username: '',
      password: '',
    },
  },
  mutations: {
    SET_LOGIN(state, payload) {
      state.isLoggedIn = payload;
    },
    SET_FORM(state, payload) {
      const { username, password } = payload;
      state.form.username = username;
      state.form.password = password;
    },
  },
  actions: {
    postLogin({ commit }, payload) {
      return login(payload).then((res) => {
        if (!res.token) {
          commit('SET_LOGIN', false);
        } else {
          localStorage.setItem('token', res.token);
          commit('SET_LOGIN', true);
        }
        return res;
      });
    },
  },
});

export default store;
