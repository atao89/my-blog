<template>
  <div class="detail">
    <header class="detail_header">
      <div class="container">
        <headers />
      </div>
    </header>

    <main class="main">
      <div class="container">
        <type :content="datas" />
      </div>
    </main>
    <footer class="detail_footer">
      <div class="container">
        <footers />
      </div>
    </footer>
  </div>
</template>

<script>
import Headers from "@components/Headers";
import Footers from "@components/Footers";
import Type from "@components/Type";

export default {
  name: "Detail",
  components: { Headers, Footers, Type },
  data() {
    return {
      datas: {
        classify: "Vue",
        title: "Vue与其他框架的对比",
        author: "atao",
        public: "2021-11-21",
      },
    };
  },
  created() {
    this.$store.dispatch("home/getNavList");
    sessionStorage.setItem("openKeys", JSON.stringify("/detail"))
  },
};
</script>

<style lang="scss" scoped>
.detail {
  .container {
    width: 80%;
    margin: auto;
  }

  .detail_header {
    width: 100%;
    background: #4183c4;
  }

  .main .container {
  }

  .detail_footer {
    background: #4183c4;
  }

  // 媒体查询，宽度小于1250时的样式
  @media screen and (max-width: 1250px) {
    .container {
      width: 90%;
    }
  }

  // 媒体查询，宽度小于1000时的样式
  @media screen and (max-width: 1000px) {
    .container {
      width: 95%;
    }
  }

  // 媒体查询，宽度小于800时的样式
  @media screen and (max-width: 800px) {
    .container {
      width: 98%;
    }
  }
}
</style>