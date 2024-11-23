<template>
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-600">
      <div class="w-full max-w-sm p-8 bg-white rounded-lg shadow-xl">
        <h2 class="text-3xl font-semibold text-center text-gray-800 mb-6">Sign In</h2>
  
        <!-- Form -->
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="email" class="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
  
          <button
            type="submit"
            class="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :disabled="auth.status==='loading'"
          >
            {{ auth.status==='loading' ? 'Signing in...' : 'Sign In' }}
          </button>
          <p v-if="auth.error" class="mt-2 text-center text-red-600">{{ auth.error }}</p>
        </form>
  
        <p class="mt-4 text-center text-gray-600">
          Don't have an account?
          <router-link to="/signup" class="text-blue-500 hover:text-blue-600">Sign Up</router-link>
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
  
        if (auth.isAuthenticated && auth.user.role==="USER") {
          router.push("/dashboard");
        }else if(auth.isAuthenticated && auth.user.role==="ADMIN"){
          router.push("/dashboard/admin");

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
  /* Add additional styles here if necessary */
  </style>
  