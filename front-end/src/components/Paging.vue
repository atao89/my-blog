<template>
  <div class="paging">
    <ul class="pagination">
      <li
        v-for="page in pages"
        :key="page"
        @click="changePage(page)"
        :class="{ actived: pageSize == page }"
      >
        {{ page }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Paging",
  data() {
    return {
      pageSize: 1,
      pageNum: 5,
    };
  },
  props: {
    total: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.total / this.pageNum);
    },
  },
  methods: {
    changePage(page) {
      this.pageSize = page;
      this.$emit("changePage", {
        page: this.pageSize,
        limit: this.pageNum,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.paging {
  background: #fff;
  padding: 20px;
  .pagination {
    display: flex;
    li {
      user-select: none;
      background: #ddd;
      color: #333;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      &:not(:last-child) {
        margin-right: 10px;
      }
      &:hover {
        opacity: 0.8;
      }
    }
    .actived {
      background: #4183c4;
      color: #fff;
    }
  }
}
</style>