import Vue from 'vue';
import Vuex from 'vuex';

import { login } from '@/functions/login.js';
import { users } from '@/functions/user.js';
import { products, newProduct, editProduct, deleteProduct } from '@/functions/items.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    items: [],
    users: [],
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
    SET_USERS(state, payload) {
      state.users = payload;
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
    postItems(_, payload) {
      return newProduct(payload);
    },
    editItem(_, payload) {
      const { data, id } = payload;
      return editProduct(data, id);
    },
    deleteItem(_, id) {
      return deleteProduct(id);
    },
    getUsers({ commit }) {
      users()
        .then((res) => {
          commit('SET_USERS', res.users);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
});

export default store;
