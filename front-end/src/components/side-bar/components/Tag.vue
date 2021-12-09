<template>
  <div class="tag">
    <div class="type" v-if="source == 'side'">
      <h3>分类</h3>
    </div>
    <div class="content">
      <span
        v-for="item in Tags"
        :key="item.tagName"
        @click="goClassify(item.tagName)"
        :style="[
          { color: $route.query.tag == item.tagName ? tagColor : '#333' },
          {
            backgroundColor:
              $route.query.tag == item.tagName ? tagBgColor : '#ccc',
          },
        ]"
      >
        {{ item.tagName }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getTags } from "@/request/api";

export default {
  name: "Tag",
  data() {
    return {
      Tags: [],
    };
  },
  props: {
    source: {
      type: String,
      default: "side",
    },
    tagColor: {
      type: String,
      default: "#333",
    },
    tagBgColor: {
      type: String,
      default: "#ccc",
    },
  },
  created() {
    this.getTags();
  },
  methods: {
    ...mapActions("home", ["changeKeyword"]),
    // 获取tag分类数据
    getTags() {
      getTags().then((res) => {
        if (res.code == "1") {
          this.Tags = res.data;
        }
      });
    },
    // 去分类页
    goClassify(tagName) {
      this.changeKeyword("");
      this.$router.push({ path: "/classify", query: { tag: tagName } });
    },
  },
};
</script>

<style lang="scss" scoped>
.tag {
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    & > span {
      padding: 5px 10px;
      border-radius: 3px;
      margin: 5px;
      cursor: pointer;
      // cursor: url(https://file.jiangly.com/images/34113113.png), default;
      &:hover {
        transform: scale(1.05);
        -webkit-transform: scale(1.05);
      }
    }
  }
}
</style>