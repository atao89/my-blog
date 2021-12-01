<template>
  <ul class="list">
    <li class="content" v-for="item in articleList" :key="index">
      <div class="content_head">
        <span class="classify">{{ item.classify }}</span>
        <span class="title" @click="toDetail(item.id)">{{ item.title }}</span>
      </div>
      <div class="content_main">
        <img :src="item.img_url" />
        <div
          class="text"
          v-html="item.content.slice(0, item.content.indexOf('</') + 4)"
        ></div>
      </div>
      <div class="content_info">
        <span class="info"><i>作者：</i>{{ item.author }}</span>
        <span class="info"><i>发表于：</i>{{ item.public }}</span>
        <span class="info"><i>阅读量：</i>{{ item.reading }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "List",
  data() {
    return {};
  },
  props: {
    articleList: {
      type: Array,
      default: [],
    },
  },
  methods: {
    // 去详情页
    toDetail(id) {
      this.$router.push({ path: `/detail/${id}` });
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  .content {
    background-color: #fff;
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