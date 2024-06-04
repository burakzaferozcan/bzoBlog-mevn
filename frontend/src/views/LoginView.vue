<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" required />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";

export default {
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const username = ref("");
    const password = ref("");

    const login = async () => {
      await authStore.login({
        username: username.value,
        password: password.value,
      });
      router.push("/");
    };

    return {
      username,
      password,
      login,
    };
  },
};
</script>
