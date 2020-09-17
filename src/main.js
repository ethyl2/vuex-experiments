import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    reset(state) {
      state.count = 0;
    },
  },
});

//import { mapState } from 'vuex';

Vue.config.productionTip = false;

// store.commit('increment');
// console.log(store.state.count);

new Vue({
  render: (h) => h(App),
  store,
  data() {
    return {
      localCount: 4,
    };
  },
  //computed: mapState(['count']),
}).$mount('#app');

/*
computed: mapState({
    count: (state) => state.count,
    countAlias: 'count',
    countPlusLocalState(state) {
      return state.count + this.localCount;
    },
  }),
*/
