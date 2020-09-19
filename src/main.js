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
  actions: {
    increment(context) {
      context.commit('increment');
    },
    incrementWithDestructuring({ commit }) {
      commit('increment');
    },
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment');
      }, 1000);
    },
    incrementWithPromise({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('increment');
          resolve();
        }, 1000);
      });
    },
    incrementWithPromise2({ commit }) {
      return this.dispatch('increment').then(() => {
        commit('increment'); // or some other mutation
      });
    },
    /*
    async incrementWithAsyncAwait({ commit }) {
      // Pass in the payload of what is returned in the second argument
      commit('increment', await exampleIncrement()); // actually you'd use a function that returns a promise
    },
    async incrementWithAsyncAwait2({ dispatch, commit }) {
      // Wait until this dispatching the first action is done before proceeding with the 2nd line.
      await dispatch('incrementWithDestructuring');
      commit('increment', await exampleAsyncIncrement());
    },
    */
  },
});

Vue.config.productionTip = false;

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
    exampleAsyncIncrement() {
      this.$store.dispatch('incrementAsync');
    },
    exampleWithPromise() {
      this.$store
        .dispatch('incrementWithPromise')
        .then(() => {
          // do something
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
}).$mount('#app');

// To test that the getters are working:
/*
console.log(store.getters.doneTodos);
console.log(store.getters.doneTodosCount);
console.log(store.getters.getTodoById(1));
*/

// Examples of adding a property to an object
// (A rare thing. You generally want to create all of your properties upfront.)
/*
Vue.set(obj, 'newProp', 123)
state.obj= { ...state.obj, newProp: 123 }
*/

/*
// Examples of committing mutations
store.commit('increment');
console.log(store.state.count);
store.commit('incrementBy', { amount: 29 });
console.log(store.state.count);
store.commit({
  type: 'incrementBy',
  amount: 40,
});
console.log(store.state.count);
*/
