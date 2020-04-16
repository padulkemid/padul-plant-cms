import Vue from 'vue';
import Vuex from 'vuex';

import { login } from '@/functions/login.js';
import { products } from '@/functions/items.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    items: [],
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
    SET_ITEMS(state, payload) {
      state.items = payload;
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
    getItems({ commit }) {
      products()
        .then((res) => {
          commit('SET_ITEMS', res.products);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
});

export default store;
