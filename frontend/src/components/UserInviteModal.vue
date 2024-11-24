<template>
  <div v-if="isInviteModalOpen" class="p-4 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96 md:w-1/2 lg:w-1/3 xl:w-1/4">
      <h3 class="text-lg font-semibold mb-4">Invite a User</h3>
      <form @submit.prevent="sendInvite">
        <input
          v-model="inviteEmail"
          type="email"
          placeholder="Enter email"
          class="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div class="flex justify-end">
          <button
            type="submit"
            class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            :disabled="loading"
          >
            {{ loading ? "Sending..." : "Send Invite" }}
          </button>
          <button
            type="button"
            @click="closeInviteModal"
            class="ml-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/userStore";
import { ref } from "vue";

export default {
  name: "UserInviteModal",
  props: {
    isInviteModalOpen: Boolean,
    closeInviteModal: Function,
  },
  setup() {
    const userStore = useUserStore();
    const inviteEmail = ref("");
    const loading = ref(false)
    // directly calling inviteUser from the store
    const sendInvite = async () => {
      loading.value = true;
      if (!inviteEmail.value) return;

      try {
        await userStore.inviteUser(inviteEmail.value); 
        inviteEmail.value = ""; 
      } catch (err) {
        console.error("Failed to send:", err);
        loading.value=false
      }finally{
        loading.value=false;
      }
    };

    return {
      inviteEmail,
      sendInvite,
      loading,
    };
  },
};
</script>

<style scoped>
</style>
