<template>
    <div>
      <!-- Header -->
      <div class="h-[10vh] text-center bg-gray-800 space-x-1 p-2">
        <span class="text-2xl font-semibold text-indigo-600">Esay</span>
        <span class="text-xl font-medium text-gray-600">Manage</span>
      </div>
  
      <!-- Reset Password Form -->
      <div class="flex flex-col items-center justify-center h-[90vh] bg-gray-800">
        <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 class="text-xl text-center font-bold text-gray-800 mb-6">Reset Password</h2>
          <form @submit.prevent="handleResetPassword">
            <!-- New Password -->
            <div class="mb-4">
              <label for="newPassword" class="block text-gray-700">New Password</label>
              <input
                id="newPassword"
                v-model="newPassword"
                type="password"
                class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your new password"
                required
              />
            </div>
  
            <!-- Confirm Password -->
            <div class="mb-4">
              <label for="confirmPassword" class="block text-gray-700">Confirm Password</label>
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Confirm your new password"
                required
              />
            </div>
  
            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg"
              :disabled="authStore.status === 'loading'"
            >
              {{ authStore.status === 'loading' ? 'Processing...' : 'Reset Password' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from "@/stores/auth";
  import { ref, watch } from "vue";
  import { useRouter } from "vue-router";
  
  export default {
    props: {
      token: {
        type: String,
        required: true, //  the token prop is passed to ensure component (comp error)
      },
    },
    setup(props) {
      const authStore = useAuthStore();
      const router = useRouter();
      const newPassword = ref("");
      const confirmPassword = ref("");
  
      const handleResetPassword = async () => {
          await authStore.resetPassword(
            props.token,
            newPassword.value,
            confirmPassword.value
          );
      };
  
      watch(
      () => authStore.status,
      (newStatus) => {
        console.log(newStatus, 'newStatus')
        if (newStatus === "success") {
          router.push("/login");
        }
      }
    );

      return {
        newPassword,
        confirmPassword,
        handleResetPassword,
        authStore,
      };
    },
  };
  </script>
  
  <style scoped>

  </style>
  