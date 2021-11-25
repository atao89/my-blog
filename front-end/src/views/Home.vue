<template>
  <ul class="home">
    <li v-for="(item, index) in 100" :key="index">{{ item }}</li>
  </ul>
</template>

<script>
export default {
  name: "Home",
  methods: {},
};
</script>

<style lang="scss" scoped>
.home {
  li {
    height: 200px;
    background-color: #fff;
    margin-bottom: 30px;
    border-bottom: solid 1px rgba(117, 125, 130, 0.35);
    overflow: hidden;
    padding: 20px;
  }
}
</style>
