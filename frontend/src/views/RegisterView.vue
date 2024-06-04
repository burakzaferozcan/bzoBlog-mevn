<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input v-model="username" placeholder="Username" required />
      <input v-model="email" placeholder="Email" required />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
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
    const email = ref("");
    const password = ref("");

    const register = async () => {
      await authStore.register({
        username: username.value,
        email: email.value,
        password: password.value,
      });
      router.push("/login");
    };

    return {
      username,
      email,
      password,
      register,
    };
  },
};
</script>
