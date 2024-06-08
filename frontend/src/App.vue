<template>
  <div id="app">
    <header>
      <div class="container">
        <router-link to="/" class="logo">bzoBlog</router-link>
        <nav>
          <router-link v-if="isAuthenticated" to="/create" class="nav-link"
            >Create Blog</router-link
          >

          <router-link
            v-if="isAuthenticated"
            to="/"
            class="nav-link"
            @click.prevent="logout"
            >Logout</router-link
          >
        </nav>
      </div>
    </header>
    <router-view />
  </div>
</template>

<script>
import { computed } from "vue";
import { useAuthStore } from "./stores/authStore";

export default {
  setup() {
    const authStore = useAuthStore();
    const isAuthenticated = computed(() => authStore.isAuthenticated);

    const logout = () => {
      authStore.logout();
    };

    return {
      isAuthenticated,
      logout,
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  background-color: rgb(255, 255, 255);
}

header {
  background-color: #390054;
  color: #fff;
  padding: 10px 0;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  color: #fff;
}

nav {
  display: flex;
  gap: 10px;
}

.nav-link {
  text-decoration: none;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
