<template>
  <div class="link">
    <div class="link-item" v-for="item in dataList" :key="item.id">
      <div class="type">
        <h3>{{ item.type }}</h3>
      </div>
      <ul class="link-content">
        <li class="content-item" v-for="i in item.resource_list" :key="i.id">
          <div class="content-title">
            <i class="icon">{{ i.inco }}</i>
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
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      .content-item {
        border: 1px solid #efefef;
        box-shadow: 1px 1px 10px #333;
        padding: 10px;
        margin-right: 20px;
        margin-bottom: 20px;
        width: 20%;
        cursor: pointer;
        transition: all 0.5s;

        &:hover {
          transform: scale(0.98);
          -webkit-transform: scale(0.98);
        }

        .content-title {
          height: 40px;
          font-size: 16px;
          display: flex;
          align-items: center;
          .icon {
            width: 40px;
            height: 40px;
            text-align: center;
            background: #f60;
          }
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
  @media screen and (max-width: 1250px) {
    .link-item .link-content .content-item {
      width: 50%;
    }
  }

  // 媒体查询，宽度小于1000时的样式
  @media screen and (max-width: 1000px) {
    .link-item .link-content .content-item {
      width: 80%;
    }
  }

  // 媒体查询，宽度小于800时的样式
  @media screen and (max-width: 800px) {
    .link-item .link-content .content-item {
      width: 90%;
    }
  }
}
</style>