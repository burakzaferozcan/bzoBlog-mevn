<template>
  <div class="wrapper">
    <div class="container">
      <h2 v-if="blog">{{ blog.title }}</h2>
      <p v-else>Loading...</p>
      <img
        class="blog-image"
        v-if="blog && blog.titleImage"
        :src="getImageUrl(blog.titleImage)"
        :alt="blog.title"
      />
    </div>
    <div v-html="blog.content" class="blog-content" v-if="blog"></div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useBlogStore } from "../stores/blogStore";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const blogStore = useBlogStore();
    const router = useRouter();
    const route = useRoute();
    const blog = ref(null);

    const fetchBlog = async () => {
      const blogId = route.params.id;
      try {
        blog.value = await blogStore.fetchBlog(blogId);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      }
    };

    const getImageUrl = (filename) => {
      if (!filename) return "";
      return `${import.meta.env.VITE_API_URL}/uploads/${filename}`;
    };

    onMounted(() => {
      fetchBlog();
    });

    return {
      blog,
      getImageUrl,
    };
  },
};
</script>
<style scoped>
.wrapper {
  margin: 0 auto;
  border-left: 1px solid #390054;
  border-right: 1px solid #390054;
  border-bottom: 1px solid #390054;
  border-radius: 25px;
  max-width: 1200px;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.blog-image {
  margin-bottom: 20px;
  max-width: 1000px;
}

.blog-content {
  margin: 0 auto;

  max-width: 1200px;
}
</style>
