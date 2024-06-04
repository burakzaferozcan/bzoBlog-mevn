<template>
  <div id="app">
    <header>
      <div class="container">
        <router-link to="/" class="logo">bzoBlogs</router-link>
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
/* Reset default margin and padding */
* {
  margin: 0;
  padding: 0;
}

/* Apply some basic styles to the body */
body {
  font-family: Arial, sans-serif;
  background-color: rgb(255, 255, 255);
}

/* Style the header */
header {
  background-color: #390054;
  color: #fff;
  padding: 10px 0;
}

/* Container for header content */
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Logo style */
.logo {
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  color: #fff;
}

/* Navigation style */
nav {
  display: flex;
  gap: 10px;
}

/* Navigation link style */
.nav-link {
  text-decoration: none;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

/* Navigation link hover style */
.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
