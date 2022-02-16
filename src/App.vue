<template>
  <div id="app" class="container">
    <Scheduler :events="events" />
  </div>
</template>

<script>
import Scheduler from './components/Scheduler.vue';

export default {
  name: 'App',
  components: {
    Scheduler,
  },
  data() {
    return {
      events: [
        {
          id: 0,
          type: 'red',
          name: 'Коммуникационный дизайн Коммуникационный дизайн',
          date: '2022-02-03 08:33',
        },
        {
          id: 1,
          type: 'green',
          name: 'Дизайн',
          date: '2022-02-10 08:24',
        },
        {
          id: 2,
          type: 'yellow',
          name: 'Коммуникационный дизайн',
          date: '2022-02-16 18:24',
        },
          {
          id: 3,
          type: 'yellow',
          name: 'Я люблю майнкрафт сколько раз сказать',
          date: '2022-02-10 18:24',
        },
      ],
    };
  },
  methods: {},
  computed: {},
};
</script>

<style lang="postcss">
* {
  box-sizing: border-box;
}
body {
  background-color: #f5f5f5;
}
#app {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  color: black;
  padding: 30px;
  /* margin-top: 30px; */
}

.container {
  /* max-width: 600px;
  margin: 0 auto; */
}
</style>
