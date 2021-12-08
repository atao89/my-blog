<template>
  <div class="link">
    <div class="link-item" v-for="item in dataList" :key="item.id">
      <div class="type">
        <h3>{{ item.type }}</h3>
      </div>
      <ul class="link-content">
        <li
          class="content-item"
          v-for="i in item.resource_list"
          :key="i.id"
          @click="goWeb(i.link)"
        >
          <div class="content-title">
            <img :src="i.icon" class="icon-link" v-if="i.icon" />
            <div class="icon-link no-link" v-else>H</div>
            <h4 class="title">{{ i.title }}</h4>
          </div>
          <div class="content-text">{{ i.text }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getLinks } from "@/request/api";

export default {
  name: "Link",
  data() {
    return {
      dataList: [],
    };
  },
  methods: {
    getLinks() {
      getLinks({ id: this.$route.params.id }).then((res) => {
        if (res.code == "1") {
          this.dataList = res.data;
        }
      });
    },
    // 跳转到官方文档
    goWeb(link) {
      window.open(link);
    },
  },
  mounted() {
    this.getLinks();
  },
};
</script>

<style lang="scss" scoped>
.link {
  padding: 10px 20px;
  background: #fff;
  .link-item {
    margin-bottom: 20px;
    .type {
      padding: 15px 0px;
      border-bottom: 1px solid #ebebeb;
      color: #414240;
      margin-bottom: 20px;
      h3 {
        font-size: 20px;
        font-weight: bold;
        border-left: 4px solid #6bc30d;
        padding-left: 10px;
      }
    }

    .link-content {
      display: flex;
      flex-wrap: wrap;
      .content-item {
        box-sizing: border-box;
        box-shadow: 1px 1px 10px #ddd;
        padding: 10px;
        cursor: pointer;
        width: 19%;
        margin-right: 1%;
        margin-bottom: 10px;
        transition: all 0.5s;

        &:hover {
          transform: scale(0.98);
          -webkit-transform: scale(0.98);
        }
        .icon-link {
          width: 40px;
          height: 40px;
        }
        .no-link {
          width: 40px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          background-color: #c3c4ce;
          border-radius: 50%;
          font-size: 22px;
          font-weight: 700;
          color: #fff;
        }
        .content-title {
          height: 40px;
          font-size: 16px;
          display: flex;
          align-items: center;
          .title {
            margin-left: 10px;
            line-height: 30px;
          }
        }
        .content-text {
          margin-top: 10px;
          height: 4.5em;
          width: 100%;
          overflow: hidden;
          font-size: 12px;
          line-height: 1.5;
          color: #808695;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
      }
    }
  }

  // 媒体查询，宽度小于1250时的样式
  @media screen and (max-width: 1500px) {
    .link-item .link-content .content-item {
      width: 24%;
      margin-right: 1%;
      margin-bottom: 10px;
    }
  }
  @media screen and (max-width: 1320px) {
    .link-item .link-content .content-item {
      width: 32%;
      margin-right: 1%;
      margin-bottom: 10px;
    }
  }

  // 媒体查询，宽度小于1000时的样式
  @media screen and (max-width: 960px) {
    .link-item .link-content .content-item {
      width: 49%;
      margin-right: 1%;
      margin-bottom: 10px;
    }
  }

  // 媒体查询，宽度小于800时的样式
  @media screen and (max-width: 400px) {
    .link-item .link-content .content-item {
      width: 100%;
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
}
</style>