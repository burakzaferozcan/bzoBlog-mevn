<template>
  <div>
    <h2>Edit Blog</h2>
    <form @submit.prevent="updateBlog">
      <input v-model="title" placeholder="Title" required />
      <vue-quill-editor v-model="content" />
      <input type="file" @change="onFileChange" />
      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useBlogStore } from "../stores/blogStore";
import { useRoute } from "vue-router";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  components: {
    "vue-quill-editor": QuillEditor,
  },
  setup() {
    const blogStore = useBlogStore();
    const route = useRoute();
    const title = ref("");
    const content = ref("");
    const image = ref(null);
    const blog = ref(null);

    onMounted(async () => {
      blog.value = await blogStore.fetchBlog(route.params.id);
      title.value = blog.value.title;
      content.value = blog.value.content;
    });

    const updateBlog = async () => {
      const formData = new FormData();
      formData.append("title", title.value);
      formData.append("content", content.value);
      if (image.value) {
        formData.append("titleImage", image.value);
      }
      await blogStore.updateBlog(route.params.id, formData);
    };

    const onFileChange = (e) => {
      image.value = e.target.files[0];
    };

    return {
      title,
      content,
      image,
      blog,
      updateBlog,
      onFileChange,
    };
  },
};
</script>
