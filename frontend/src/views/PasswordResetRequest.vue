<template>
  <div class="h-[10vh] flex justify-center items-center space-x-1 p-4">
    <router-link to="/">
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
  <div
    class="flex flex-col items-center justify-center h-[90vh] bg-gray-800 p-6"
  >
    <!-- Header -->
    <h1 class="text-3xl font-bold text-white mb-4">Reset Your Password</h1>
    <p class="text-gray-50 text-center mb-6">
      Enter your registered email address, and we’ll send you a link to reset
      your password.
    </p>

    <!-- Form Section -->
    <form
      @submit.prevent="handlePasswordResetRequest"
      class="bg-white p-6 rounded-sm shadow-md w-full sm:w-96"
    >
      <label for="email" class="block text-gray-700 font-medium mb-2"
        >Email Address</label
      >
      <input
        v-model="email"
        type="email"
        id="email"
        placeholder="Enter your email"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />

      <button
        type="submit"
        :disabled="isLoading"
        class="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
      >
        {{ isLoading ? "Sending..." : "Send Reset Link" }}
      </button>

      <p v-if="successMessage" class="mt-4 text-green-600 text-center">
        {{ successMessage }}
      </p>
      <p v-if="errorMessage" class="mt-4 text-red-600 text-center">
        {{ errorMessage }}
      </p>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

export default {
  name: "PasswordResetRequest",
  data() {
    return {
      email: "",
      isLoading: false,
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    async handlePasswordResetRequest() {
      this.isLoading = true;
      this.successMessage = "";
      this.errorMessage = "";

      try {
        const response = await axios.post("/api/auth/request-reset", {
          email: this.email,
        });

        if (response.status === 200) {
          toast.success(response.data.message);
          this.email = ""; 
        }
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message ||
          "Failed to send the reset link. Please try again.";
        toast.error(this.errorMessage);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped></style>
