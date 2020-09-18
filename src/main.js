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
    incrementByN(state, n) {
      state.count += n;
    },
    incrementBy(state, payload) {
      state.count += payload.amount;
    },
    decrement(state) {
      state.count--;
    },
    reset(state) {
      state.count = 0;
    },
  },
});

Vue.config.productionTip = false;

store.commit('increment');
console.log(store.state.count);
store.commit('incrementBy', { amount: 29 });
console.log(store.state.count);
store.commit({
  type: 'incrementBy',
  amount: 40,
});
console.log(store.state.count);

new Vue({
  render: (h) => h(App),
  store,
  computed: {
    // We're not actually using this. It's just an example.
    doneTodosCount() {
      return this.$store.getters.doneTodosCount;
    },
  },
  methods: {
    // Another example that isn't used
    exampleIncrement() {
      this.$store.commit('increment');
    },
  },
}).$mount('#app');

console.log(store.getters.doneTodos);
console.log(store.getters.doneTodosCount);
console.log(store.getters.getTodoById(1));

// Examples of adding a property to an object
// (A rare thing. You generally want to create all of your properties upfront.)
/*
Vue.set(obj, 'newProp', 123)
state.obj= { ...state.obj, newProp: 123 }
*/
