<template>
  <div class="headers">
    <h1 @click="goHome">阿涛</h1>
    <search />
    <navs />
  </div>
</template>

<script>
import Search from "@components/Search";
import Navs from "@components/Navs";

export default {
  name: "Headers",
  components: { Search, Navs },
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.headers {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    color: #fff;
    font: 28px "KaiTi";
    // a {
    //   text-decoration: none;
    //   color: inherit;
    // }
    // /*包含以下四种的链接，正常的未被访问过的链接*/
    // a:link {
    // }
    // /*已经访问过的链接*/
    // a:visited {
    //   // color: inherit;
    // }
    // /*鼠标划过(停留)的链接*/
    // a:hover {
    // }
    // /* 正在点击的链接*/
    // a:active {
    // }
  }
}
</style>