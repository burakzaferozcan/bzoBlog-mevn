import { defineStore } from "pinia";
import axios from "../axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(userData) {
      const response = await axios.post("/auth/login", userData);
      this.token = response.data.token;
      localStorage.setItem("token", this.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
    },
    async register(userData) {
      await axios.post("/auth/register", userData);
    },
    logout() {
      this.token = "";
      this.user = null;
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    },
    async fetchUser() {
      const response = await axios.get("/auth/user");
      this.user = response.data;
    },
  },
});
