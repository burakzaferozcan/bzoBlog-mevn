<template>
  <div>
    <h2>Blog Oluştur</h2>
    <form @submit.prevent="createBlog">
      <input v-model="title" placeholder="Başlık" required />
      <vue-quill-editor
        v-model="content"
        class="quil-editor"
        ref="quillEditor"
        @ready="onEditorReady"
      />
      <input type="file" @change="onFileChange" />
      <button type="submit">Oluştur</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useBlogStore } from "../stores/blogStore";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import axios from "axios";

export default {
  components: {
    "vue-quill-editor": QuillEditor,
  },
  setup() {
    const blogStore = useBlogStore();
    const title = ref("");
    const content = ref("");
    const image = ref(null);
    const quillEditor = ref(null);
    const editorInstance = ref(null);

    const onEditorReady = () => {
      editorInstance.value = quillEditor.value.getQuill();
    };

    const createBlog = async () => {
      if (editorInstance.value) {
        content.value = editorInstance.value.root.innerHTML;
      }

      console.log("Content:", content.value); // Debug log
      const formData = new FormData();
      formData.append("title", title.value);
      formData.append("content", content.value);
      if (image.value) {
        formData.append("titleImage", image.value);
      }
      await blogStore.createBlog(formData);
    };

    const onFileChange = (e) => {
      image.value = e.target.files[0];
    };

    const modules = {
      toolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image"],
      ],
      handlers: {
        image: () => {
          const fileInput = document.createElement("input");
          fileInput.setAttribute("type", "file");
          fileInput.setAttribute("accept", "image/*");
          fileInput.click();
          fileInput.onchange = async () => {
            const file = fileInput.files[0];
            const formData = new FormData();
            formData.append("image", file);
            const response = await axios.post("/upload-image", formData);
            const range = editorInstance.value.getSelection();
            editorInstance.value.insertEmbed(
              range.index,
              "image",
              response.data.url
            );
          };
        },
      },
    };

    return {
      title,
      content,
      image,
      createBlog,
      onFileChange,
      modules,
      quillEditor,
      onEditorReady,
    };
  },
};
</script>

<style scoped>
.quil-editor {
  width: 500px;
  display: flex;
}
</style>
