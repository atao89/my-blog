<template>
  <div class="side-bar">
    <Notice />
    <Tag source="side" />
    <Message />
  </div>
</template>

<script>
import Notice from "./components/Notice.vue";
import Tag from "./components/Tag.vue";
import Message from "./components/Message.vue";

export default {
  name: "SideBar",
  components: { Notice, Tag, Message },
};
</script>

<style lang="scss">
.side-bar {
  & > div {
    background: #fff;
    padding: 0 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    .type {
      line-height: 30px;
      border-bottom: 1px solid #ccc;
      h2 {
        display: inline-block;
        line-height: 28px;
        border-bottom: 2px solid #4183c4;
      }
    }
    .content {
      padding: 10px 0;
      text-align: center;
    }
  }
}
</style>