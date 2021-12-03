<template>
  <div class="detail">
    <h3 class="title">{{ datas.title }}</h3>
    <div class="content_info">
      <span class="info"><i>作者：</i>{{ datas.author }}</span>
      <span class="info"><i>发表于：</i>{{ datas.public }}</span>
      <span class="info"><i>分类：</i>{{ datas.classify }}</span>
      <span class="info"><i>阅读量：</i>{{ datas.reading }}</span>
    </div>
    <div class="text" v-html="datas.content"></div>
  </div>
</template>

<script>
import { getDetail } from "@/request/api";

export default {
  name: "Detail",
  data() {
    return {
      datas: {
        title: "Vue与其他框架的对比",
        author: "atao",
        public: "2021-11-21",
        classify: "Vue",
        reading: "10000",
        content: "dqwewfrge",
      },
    };
  },
  created() {
    sessionStorage.setItem("openKeys", JSON.stringify("/detail"));
    this.getDetail();
  },
  methods: {
    getDetail() {
      getDetail({ id: this.$route.params.id }).then((res) => {
        if (res.code == "1") {
          this.datas = res.data.length ? res.data[0] : {};
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  width: 100%;
  overflow: hidden;
  background: #fff;
  padding: 20px;
  font-size: 16px;
  h3.title {
    font-size: 26px;
    line-height: 50px;
  }
  .content_info {
    line-height: 40px;
    border-bottom: 1px solid #eee;
    .info {
      color: #58bc58;
      &:not(:first-child) {
        margin-left: 20px;
      }
      & > i {
        color: #999;
      }
    }
  }
  .text {
    margin-top: 20px;
    line-height: 32px;
  }
}
</style>