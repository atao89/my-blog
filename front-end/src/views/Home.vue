<template>
  <ul class="home">
    <li v-for="item in rticleList" :key="index">{{ item.content }}</li>
  </ul>
</template>

<script>
import { getArticle } from "@/request/api";

export default {
  name: "Home",
  data() {
    return {
      rticleList: [],
    };
  },
  created() {
    this.getArticle();
  },
  methods: {
    getArticle() {
      getArticle({ page: 1, limit: 5 }).then((res) => {
        console.log("res", res);
        if (res.code == "1") {
          this.rticleList = res.data;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  li {
    height: 200px;
    background-color: #fff;
    margin-bottom: 10px;
    border-bottom: solid 1px rgba(117, 125, 130, 0.35);
    overflow: hidden;
    padding: 20px;
  }
}
</style>
