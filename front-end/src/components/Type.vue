<template>
  <div class="type">
    <div class="classify">
      <h3>{{ content.classify }}</h3>
    </div>
    <div class="content">
      <h3>{{ content.title }}</h3>
      <div class="content_info">
        <span class="info"><i>作者：</i>{{ content.author }}</span>
        <span class="info"><i>发表于：</i>{{ content.public }}</span>
        <span class="info"><i>阅读量：</i>{{ content.reading }}</span>
      </div>
      <div class="text">www</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Type",
  props: {
    content: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style lang="scss" scoped>
.type {
  
}
</style>