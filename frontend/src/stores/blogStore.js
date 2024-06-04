import { defineStore } from "pinia";
import axios from "../axios";

export const useBlogStore = defineStore("blog", {
  state: () => ({
    blogs: [],
    blog: null,
  }),
  actions: {
    async fetchBlogs() {
      const response = await axios.get("/blogs");
      this.blogs = response.data;
    },
    async fetchBlog(id) {
      const response = await axios.get(`/blogs/${id}`);
      console.log("blogStore.js ", response.data);
      return response.data; // Return the fetched blog
    },
    async createBlog(blogData) {
      const response = await axios.post("/blogs", blogData);
      this.blogs.push(response.data);
    },
    async updateBlog(id, blogData) {
      const response = await axios.put(`/blogs/${id}`, blogData);
      const index = this.blogs.findIndex((blog) => blog._id === id);
      if (index !== -1) {
        this.blogs[index] = response.data;
      }
    },
    async deleteBlog(id) {
      await axios.delete(`/blogs/${id}`);
      this.blogs = this.blogs.filter((blog) => blog._id !== id);
    },
  },
});
