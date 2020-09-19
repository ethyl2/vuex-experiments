import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const moduleA = {
  namespaced: true,
  state: {
    count: 3,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
  },
  actions: {
    incrementIfOdd({ state, commit }) {
      if (state.count % 2 === 1) {
        commit('increment');
      }
    },
  },
};

const moduleB = {
  namespaced: true,
  modules: {
    subModule: {
      namespaced: true,
      state: {
        count: 100,
      },
      mutations: {
        login() {},
      },
      getters: {
        login() {},
      },
      actions: {
        login() {},
      },
    },
  },
  state: {
    count: 8,
  },
  mutations: {},
  getters: {
    someGetter(state, getters, rootState, rootGetters) {
      rootState.count;
      state.count;
    },
  },
  actions: {
    someAction({ dispatch, commit, getters, rootGetters }) {
      getters.someGetter;
      rootGetters.someGetter;

      dispatch('someOtherAction');
      dispatch('someOtherAction', null, { root: true }); // null is the payload

      commit('someMutation');
      commit('someMutation', null, { root: true }); // null is the payload
    },
  },
};

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB,
  },
  state: {
    count: 2,
  },
  mutations: {},
  getters: {},
  actions: {},
});

import { mapState, mapActions } from 'vuex';

new Vue({
  el: '#app',
  store,
  data: {},
  computed: mapState({
    a: (state) => state.a.count,
    b: (state) => state.b.count,
    subB: (state) => state.b.subModule.count,
  }),
  methods: mapActions(['some/nested/module/foo']), // Assuming 'some' is a module, 'nested' is nested within it, and 'module' is nested within that.
  // And 'foo' is the action.
  // In our app, access it using this['some/nested/module/foo']()
  // Another way:
  /*
  methods: mapActions('some/nested/module', [
      'foo'
  ]) // Access it using this.foo()
  */
});

// console.log(store.state.a.count);
// // console.log(store.state.b.count);
// store.commit('a/increment');
// console.log(store.state.a.count);

store.commit('b/subModule/login');
store.dispatch('b/subModule/login');
store.getters['b/subModule/login'];
