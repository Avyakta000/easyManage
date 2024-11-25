<template>
  <div class="h-[10vh] flex justify-center items-center space-x-1 p-4">
    <router-link
        to="/"
      >
      <span class="text-2xl font-semibold text-indigo-600">Easy</span>
      <span class="text-xl font-medium text-gray-600">Manage</span>
      </router-link>
      <router-link
        to="/login"
        class="block text-lg px-4 py-2 rounded-lg hover:text-blue-600 underline"
      >
        Login
      </router-link>
  </div>
  <div class="flex items-center justify-center h-[90vh] bg-gray-800">
    <div class="w-full max-w-sm py-4 px-8 bg-white rounded-sm shadow-xl">
      <h2 class="text-2xl font-semibold text-center text-gray-800 mx-2">
        Sign In
      </h2>

      <!-- Form -->
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          :disabled="auth.status === 'loading'"
        >
          {{ auth.status === "loading" ? "Signing in..." : "Sign In" }}
        </button>
        <p v-if="auth.error" class="mt-2 text-center text-red-600">
          {{ auth.error }}
        </p>
      </form>

      <p class="mt-4 text-center text-gray-600">
        Don't have an account?
        <router-link to="/signup" class="text-indigo-500 hover:text-indigo-600"
        >Sign Up</router-link
        >
        <router-link
        to="/reset-request"
        class="block px-4 py-2 rounded-lg hover:text-indigo-600 underline"
      >
        Forget Password ?
      </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const auth = useAuthStore();
    const router = useRouter();

    const handleSubmit = async (e) => {
      e.preventDefault();
      await auth.login(email.value, password.value);

      if (auth.isAuthenticated) {
        // If the user is authenticated, check the redirect query parameter
        const userRedirectPath = router.currentRoute.value.query.redirect || '/dashboard'; // default to '/dashboard' if no redirect
        const adminRedirectPath = router.currentRoute.value.query.redirect || '/dashboard/admin'; // default to '/dashboard/admin' if no redirect
        if (auth.user.role === "USER") {
          router.push(userRedirectPath); // redirect to the originally requested path
        } else if (auth.user.role === "ADMIN") {
          router.push(adminRedirectPath); 
        }
      }
    };

    return {
      email,
      password,
      auth,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
</style>
