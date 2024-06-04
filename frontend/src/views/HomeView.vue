<template>
  <div class="div">
    <BlogList />
  </div>
</template>

<script>
import BlogList from "../components/BlogList.vue";

export default {
  components: {
    BlogList,
  },
};
</script>
<style>
.div {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
