<template>
  <div class="classify">
    <tag source="classify" tagColor="#fff" tagBgColor="#4183c4" />
    <list :articleList="articleList" />
    <no-data v-if="total == 0" />
    <paging :total="total" @changePage="changePage" />
  </div>
</template>

<script>
import Tag from "@components/side-bar/components/Tag.vue";
import List from "@components/List";
import Paging from "@components/Paging";
import NoData from "@components/NoData";
import { getArticle } from "@/request/api";

import _ from "lodash";
import { getSearchData } from "@/request/api";

export default {
  name: "Classify",
  components: { Tag, List, Paging, NoData },
  data() {
    return {
      articleList: [],
      total: 0,
    };
  },
  created() {
    if (this.$route.query.keyword) {
      this.searchArticle();
    } else {
      this.getArticle();
    }
  },
  watch: {
    // 方式一：
    // 监听,当路由发生变化的时候执行
    $route: {
      handler: function (val) {
        if (this.$route.query.keyword) {
          this.searchArticle();
        } else {
          this.getArticle();
        }
      },
      // 深度观察监听
      deep: true,
    },
  },
  methods: {
    // 获取文章数据
    getArticle(
      params = { page: 1, limit: 5, classify: this.$route.query.tag }
    ) {
      this.articleList = [];
      this.total = 0;
      getArticle(params).then((res) => {
        if (res.code == "1") {
          this.articleList = res.data;
          this.total = res.total;
        }
      });
    },
    // 去详情页
    toDetail(id) {
      this.$router.push({ path: `/detail/${id}` });
    },
    // 改变页码重新请求数据
    changePage(options) {
      this.getArticle(options);
    },

    // 获取模糊搜索数据
    searchArticle: _.debounce(function () {
      this.articleList = [];
      this.total = 0;
      getSearchData({
        page: 1,
        limit: 5,
        keyword: this.$route.query.keyword,
      }).then((res) => {
        if (res.code == "1") {
          this.articleList = res.data;
          this.total = res.total;
        }
      });
    }, 1000),
  },
};
</script>

<style lang="scss" scoped>
.classify {
  width: 100%;
  padding-top: 10px;
  background-color: #fff;
  .content {
    margin-bottom: 10px;
    border-bottom: solid 1px rgba(117, 125, 130, 0.35);
    padding: 10px 20px;
    flex-direction: column;
    display: flex;
    .content_head {
      height: 34px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      & > span {
        display: inline-block;
        &.classify {
          padding: 5px 10px;
          color: #fff;
          background: #4183c4;
          border-radius: 3px;
        }
        &.title {
          font-size: 18px;
          color: #58bc58;
          margin-left: 20px;
          cursor: pointer;
        }
      }
    }
    .content_main {
      height: 150px;
      overflow: hidden;
      display: flex;
      img {
        width: 260px;
        height: auto;
      }
      .text {
        margin-left: 20px;
        line-height: 26px;
        font-size: 14px;
      }
    }
    .content_info {
      height: 20px;
      line-height: 20px;
      margin-top: 10px;
      padding-left: 280px;
      .info {
        color: #58bc58;
        &:not(last-child) {
          margin-right: 20px;
        }
        & > i {
          color: #999;
        }
      }
    }
  }

  // 媒体查询，宽度小于1250时的样式
  @media screen and (max-width: 1250px) {
    .content .content_info {
      padding-left: 100px;
    }
  }

  // 媒体查询，宽度小于1000时的样式
  @media screen and (max-width: 1000px) {
    .content .content_info {
      padding-left: 50px;
    }
  }

  // 媒体查询，宽度小于800时的样式
  @media screen and (max-width: 800px) {
    .content .content_main {
      height: 150px;
      img {
        width: 200px;
        height: auto;
      }
    }

    .content .content_info {
      padding-left: 0;
      .info:not(last-child) {
        margin-right: 5px;
      }
    }
  }
}
</style>