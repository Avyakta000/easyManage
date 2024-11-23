<template>
  <div class="h-[10vh] flex justify-center items-center space-x-1 p-4">
    <router-link
        to="/"
      >
      <span class="text-2xl font-semibold text-indigo-600">Esay</span>
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
    <div class="w-full max-w-md px-8 py-4 bg-white rounded-sm shadow-xl">
      <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">
        Create Account
      </h2>

      <!-- Signup Form -->
      <form @submit.prevent="handleSubmit">
        <!-- Full Name Input -->
        <div class="mb-4">
          <label for="fullName" class="block text-gray-700">Full Name</label>
          <input
            type="text"
            id="fullName"
            v-model="fullName"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your full name"
            required
          />
        </div>

        <!-- Email Input -->
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

        <!-- Password Input -->
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
        <div class="mb-4">
          <label for="confirmPassword" class="block text-gray-700"
            >Confirm Password</label
          >
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Confirm Password"
            required
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          :disabled="auth.status === 'loading'"
        >
          {{ auth.status === "loading" ? "Signing up..." : "Sign Up" }}
        </button>
        <p v-if="auth.error" class="mt-2 text-center text-red-600">
          {{ auth.error }}
        </p>
      </form>

      <!-- Already have an account? -->
      <p class="mt-4 text-center text-gray-600">
        Already have an account?
        <router-link to="/login" class="text-indigo-500 hover:text-indigo-600"
          >Log In</router-link
        >
        <router-link
        to="/reset-request"
        class="block px-4 py-2 rounded-lg hover:text-blue-600 underline"
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
    const auth = useAuthStore();
    const router = useRouter();

    const fullName = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");

    const handleSubmit = async () => {
      await auth.signup(
        fullName.value,
        email.value,
        password.value,
        confirmPassword.value
      );

      console.log(auth.isAuthenticated, "signup");
      if (auth.isAuthenticated) {
        router.push("/dashboard");
      }
    };

    return {
      fullName,
      email,
      password,
      confirmPassword,
      auth,
      handleSubmit,
    };
  },
};
</script>

<style scoped>

</style>
