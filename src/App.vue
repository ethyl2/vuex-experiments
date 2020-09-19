<template>
  <div id="app">
    <h1 @click="increment">Click Me</h1>
    <img @click="increment" src="./assets/mascot.jpg" alt="vue mascot" class="mascot" />
    <h2>Clicks: {{ count }}</h2>
    <button @click="increment">
      <span role="img" aria-label="plus">➕</span>
    </button>
    <button @click="decrement">
      <span role="img" aria-label="minus">➖</span>
    </button>
    <button @click="reset">
      <span role="img" aria-label="soap">🧼</span>
    </button>

    <h3>Points: {{ countPlusBoost }}</h3>
    <ol>
      <li v-for="todo in todos" v-bind:key="todo.id">{{ todo.text}}</li>
    </ol>
    <p>Done Todos: {{ doneTodosCount }}</p>
    <label for="todo-id">Get Todo By Id</label>
    <input v-model="todoId" type="number" />

    <p>{{ getTodoById(todoId)[0].text }}</p>
    <br />
    <button @click="toggleShowMore">{{ showMore? 'Hide' : 'Show More About Vue'}}</button>

    <br />
    <img alt="Vue logo" src="./assets/logo.png" />

    <div v-if="showMore">
      <HelloWorld msg="More About Vue.js Apps" />
    </div>

    <p>
      Top image is from
      <a href="https://twitter.com/vuejsfrankfurt" target="_blank">Vue.js Frankfurt</a>
    </p>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  data() {
    return {
      boost: 100,
      showMore: false,
      todoId: 1,
    };
  },
  computed: {
    ...mapState(["count", "todos"]),
    ...mapGetters(["doneTodosCount", "getTodoById"]),
    ...mapActions(["incrementAsync"]),
    countPlusBoost(state) {
      return state.count * this.boost;
    },
  },
  methods: {
    ...mapMutations(["increment", "reset", "decrement"]),
    toggleShowMore() {
      this.showMore = !this.showMore;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

ol {
  width: 30%;
  margin: 1em auto;
  line-height: 1.5em;
  text-align: left;
  border: 2px solid #41b883;
  padding: 0.5em;
  list-style-position: inside;
}

label {
  padding-right: 0.25em;
}

input {
  width: 3em;
}

.mascot {
  max-width: 10em;
  transition: all 0.2s ease-in-out;
}

.mascot:active {
  transform: scale(1.2);
}
</style>
