<template>
  <div class="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-gray-700 mb-4">Change Password</h2>
    <form @submit.prevent="changePassword">
      <div class="grid grid-cols-1 gap-6">
        <!-- Current Password -->
        <div>
          <label class="block text-gray-600 font-medium">Current Password</label>
          <input
            v-model="password.currentPassword"
            type="password"
            class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter current password"
          />
        </div>
        
        <!-- New Password -->
        <div>
          <label class="block text-gray-600 font-medium">New Password</label>
          <input
            v-model="password.newPassword"
            type="password"
            class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter new password"
          />
        </div>
        
        <!-- Confirm New Password -->
        <div>
          <label class="block text-gray-600 font-medium">Confirm New Password</label>
          <input
            v-model="password.confirmPassword"
            type="password"
            class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm new password"
          />
        </div>
      </div>

      <!-- Error Message -->
      <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>

      <!-- Submit Button -->
      <button
        type="submit"
        class="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Change Password
      </button>
    </form>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import { ref } from "vue";
import axios from "axios"; 
import { useRouter } from 'vue-router'; 

export default {
  name: "ChangePassword",
  setup() {
    const toast = useToast();
    const router = useRouter(); // Use the Vue Router instance


    const password = ref({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    const error = ref("");

    const changePassword = async () => {
      // Clear any previous errors
      error.value = "";

      // Validate the form
      if (password.value.newPassword !== password.value.confirmPassword) {
        error.value = "New passwords do not match!";
        return;
      }

      try {
        // Make API call to backend to change the password
        const response = await axios.put("/api/auth/change-password", {
          currentPassword: password.value.currentPassword,
          newPassword: password.value.newPassword,
        });
        if(response.status===200){
          password.value.currentPassword = '';
          password.value.newPassword = '';
          password.value.confirmPassword = '';
          toast.success("Password changed successfully!");
        }
        router.push('/dashboard')
        // Show success toast after successful password change
      } catch (err) {
        // Handle error (e.g., wrong current password)
          toast.error("Error changing password!");
      }
    };

    return { password, changePassword, error };
  },
};
</script>
