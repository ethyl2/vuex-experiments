<template>
  <div id="app">
    <h1 @click="increment">Click Me: {{ count }}</h1>
    <button @click="reset">Reset Counter</button>
    <h3>Boosted counter: {{ countPlusBoost }}</h3>
    <br />
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

import { mapState, mapMutations } from "vuex";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  data() {
    return {
      boost: 100,
    };
  },
  computed: {
    ...mapState(["count"]),
    countPlusBoost(state) {
      return state.count * this.boost;
    },
  },
  methods: {
    ...mapMutations(["increment", "reset"]),
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
</style>
