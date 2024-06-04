<template>
  <div class="blog-list">
    <h2 class="page-title">Blog Listesi</h2>
    <div class="blogs-grid">
      <div v-for="blog in blogs" :key="blog._id" class="blog-card">
        <div class="blog-image">
          <img
            v-if="blog.titleImage"
            :src="getImageUrl(blog.titleImage)"
            :alt="getImageUrl(blog.titleImage)"
          />
        </div>
        <div class="blog-details">
          <h3 class="blog-title">{{ blog.title }}</h3>
          <p
            v-html="`${blog.content.substring(0, 20)}...`"
            class="blog-content"
          ></p>
          <div v-if="isAdmin">
            <button @click="editBlog(blog._id)">Edit</button>
            <button @click="deleteBlog(blog._id)">Delete</button>
          </div>
          <button @click="viewBlog(blog._id)">View</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useBlogStore } from "../stores/blogStore";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

export default {
  setup() {
    const blogStore = useBlogStore();
    const authStore = useAuthStore();
    const router = useRouter();
    const blogs = ref([]);
    const isAdmin = computed(() => {
      return authStore.isAuthenticated;
    });
    const fetchBlogs = async () => {
      await blogStore.fetchBlogs();
      blogs.value = blogStore.blogs;
    };

    const viewBlog = (id) => {
      router.push(`/blog/${id}`);
    };

    const editBlog = (id) => {
      router.push(`/blog/edit/${id}`);
    };

    const deleteBlog = async (id) => {
      try {
        await blogStore.deleteBlog(id);
        fetchBlogs(); // Yeniden blogları yükleyin
      } catch (error) {
        console.error("Blog silinirken hata oluştu:", error);
      }
    };

    const getImageUrl = (filename) => {
      if (!filename) return "";

      return `${import.meta.env.VITE_API_URL}/uploads/${filename}`;
    };

    return {
      blogs,
      fetchBlogs,
      isAdmin,
      editBlog,
      deleteBlog,
      viewBlog,
      getImageUrl,
    };
  },
  mounted() {
    this.fetchBlogs();
  },
};
</script>
<style scoped>
.blog-list {
  margin: 0;
  max-width: 1200px;
  padding: 30px;
}

.page-title {
  font-size: 24px;
}

.blogs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
}

.blog-card {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 1%;
  overflow: hidden;
}

.blog-image img {
  width: 100%;
  object-fit: cover;
  object-position: center;
  height: auto;
  border-radius: 1%;
}

.blog-details .blog-title {
  font-size: 18px;
  margin: 0;
  font-weight: bold;
}

.blog-details .blog-content {
  margin-top: 10px;
}

button {
  cursor: pointer;
  background-color: #390054;

  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
}

button:hover {
  background-color: #510077;
}
</style>
