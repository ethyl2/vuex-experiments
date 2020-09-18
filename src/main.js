import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
    todos: [
      { id: 1, text: 'Learn more about Vue', done: true },
      { id: 2, text: 'Learn more about Vuex', done: false },
      { id: 3, text: 'Learn more about Vuetify', done: true },
    ],
  },
  getters: {
    doneTodos: (state) => {
      return state.todos.filter((todo) => todo.done);
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length;
    },
    getTodoById: (state) => (id) => {
      const result = state.todos.filter((todo) => todo.id == id);
      if (result.length < 1) {
        return [{ id: 0, text: 'Invalid todo ID' }];
      }
      return result;
    },
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

Vue.config.productionTip = false;

// store.commit('increment');
// console.log(store.state.count);

new Vue({
  render: (h) => h(App),
  store,
  computed: {
    doneTodosCount() {
      return this.$store.getters.doneTodosCount;
    },
  },
}).$mount('#app');

console.log(store.getters.doneTodos);
console.log(store.getters.doneTodosCount);
console.log(store.getters.getTodoById(1));
