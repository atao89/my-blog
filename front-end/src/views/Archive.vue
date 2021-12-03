<template>
  <div class="archive">
    <div class="archive-content">
      <div class="archive-total">
        嗯..! 目前共计 {{ total }} 篇日志。 继续努力。
      </div>
      <div class="archive-item" v-for="item in archiveList" :key="item.year">
        <div class="archive-year">{{ item.year }}</div>
        <div class="archive-posts" v-for="itm in item.children" :key="itm.id">
          <span class="posts-meta">
            {{ itm.public.slice(5, itm.public.length) }}
          </span>
          <span class="posts-title" @click="goDetail(itm.id)">
            {{ itm.title }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArchive } from "@/request/api";

export default {
  name: "Archive",
  data() {
    return {
      total: 0,
      archiveList: [],
    };
  },
  created() {
    this.getArchive();
    // this.dealDateHandle(this.datas);
  },
  methods: {
    // 获取归档数据
    getArchive() {
      getArchive().then((res) => {
        if (res.code == "1") {
          this.total = res.total;
          res.data.length && this.dealDateHandle(res.data);
        }
      });
    },
    // 处理数据
    dealDateHandle(datas) {
      let obj = {};
      let arr = [];
      for (var i = 0; i < datas.length; i++) {
        let factory = datas[i];
        let year = factory.year;
        if (obj[year] == undefined) {
          arr.push({ year: year, children: [factory] });
          obj[year] = arr.length - 1;
        } else {
          arr[obj[year]].children.push(factory);
        }
      }
      // console.log(obj);
      // console.log(arr);

      for (var i = 0, len = arr.length; i < len; i++) {
        arr[i].children = arr[i].children.sort(this.publicSort);
      }

      this.archiveList = arr.sort(this.yearSort);
    },
    // 外层数据按年份year排序
    yearSort(obj1, obj2) {
      var val1 = obj1.year;
      var val2 = obj2.year;
      if (val1 > val2) {
        return -1;
      } else if (val1 < val2) {
        return 1;
      } else {
        return 0;
      }
    },

    // 内层数据按发布时间public排序
    publicSort(obj1, obj2) {
      var val1 = obj1.public;
      var val2 = obj2.public;
      if (val1 > val2) {
        return -1;
      } else if (val1 < val2) {
        return 1;
      } else {
        return 0;
      }
    },

    // 去详情页
    goDetail(id) {
      this.$router.push({ path: `/detail/${id}` });
    },
  },
};
</script>

<style lang="scss" scoped>
.archive {
  background: #fff;
  padding: 40px;
  .archive-content {
    margin-left: 25px;
    position: relative;
    &::before {
      background: #f5f5f5;
      content: " ";
      height: 100%;
      left: 0;
      margin-left: -2px;
      position: absolute;
      top: 1.25em;
      width: 4px;
    }

    .archive-total {
      font-size: 1.125em;
      position: relative;
      padding-left: 20px;
      &::before {
        background: #999;
        border: 1px solid #fff;
        border-radius: 50%;
        content: " ";
        height: 10px;
        left: 0;
        margin-left: -6px;
        margin-top: -4px;
        position: absolute;
        top: 50%;
        width: 10px;
      }
    }

    .archive-year {
      font-size: 1.5em;
      font-weight: bold;
      margin: 60px 0;
      position: relative;
      padding-left: 20px;
      &::before {
        background: #bbb;
        border-radius: 50%;
        content: " ";
        height: 8px;
        left: 0;
        margin-left: -4px;
        margin-top: -4px;
        position: absolute;
        top: 50%;
        width: 8px;
      }
    }

    .archive-posts {
      // background: var(--body-bg-color);
      // color: var(--text-color);
      font-family: "Lato", "PingFang SC", "Microsoft YaHei", sans-serif;
      font-size: 1em;
      line-height: 2;
      padding-left: 20px;

      border-bottom: 1px dashed #ccc;
      margin: 30px 0;
      padding-left: 15px;
      position: relative;
      transition-property: border;
      transition-delay: 0s;
      transition-duration: 0.2s;
      transition-timing-function: ease-in-out;
      &::before {
        background: #bbb;
        border: 1px solid #fff;
        border-radius: 50%;
        content: " ";
        height: 6px;
        left: 0;
        margin-left: -4px;
        position: absolute;
        top: 0.75em;
        // transition-property: "background";
        width: 6px;
        transition-delay: 0s;
        transition-duration: 0.2s;
        transition-timing-function: ease-in-out;
      }

      .posts-meta {
        display: inline;
        font-size: 0.75em;
        margin-right: 10px;
      }

      .posts-title {
        display: inline;
        cursor: pointer;
      }
    }
  }
}
</style>