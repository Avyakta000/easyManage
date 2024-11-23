<template>
    <div class="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-3xl font-bold text-gray-800 text-center mb-6">
        Edit Your Profile
      </h2>
      <form @submit.prevent="updateProfile" class="space-y-6">
        <!-- fullName Input -->
        <div>
          <label for="fullName" class="block text-gray-600 font-medium mb-2">fullName</label>
          <input
            id="fullName"
            v-model="profile.fullName"
            type="text"
            class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your fullName"
          />
        </div>
        <!-- Email Input -->
        <div>
          <label for="email" class="block text-gray-600 font-medium mb-2">Email</label>
          <input
            id="email"
            v-model="profile.email"
            type="email"
            class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your email"
          />
        </div>
        <!-- Save Button -->
        <div class="flex justify-center">
          <button
            type="submit"
            class="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { useAuthStore } from "@/stores/auth";
  import { useUserStore } from "@/stores/userStore";
  import { useToast } from "vue-toastification";
  
  export default {
    name: "Profile",
    setup() {
      const auth = useAuthStore();
      const userStore = useUserStore();
      const toast = useToast();
      const profile = ref({
        fullName: "",
        email: "",
      });
  
      // Fetch user details from auth store
      onMounted(() => {
        if (auth.user) {
          profile.value.fullName = auth.user.fullName || "";
          profile.value.email = auth.user.email || "";
        }
      });
  
      // Update profile handler
      const updateProfile = async () => {
       
          const updatedData = { ...profile.value };
          // Placeholder for API call
          await userStore.updateUser(auth.user.id, updatedData);
      };
  
      return {
        profile,
        updateProfile,
      };
    },
  };
  </script>
  