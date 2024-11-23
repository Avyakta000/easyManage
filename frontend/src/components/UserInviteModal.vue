<template>
    <div v-if="isInviteModalOpen" class="p-4 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <h3 class="text-lg font-semibold mb-4">Invite a User</h3>
        <input
          v-model="inviteEmail"
          type="email"
          placeholder="Enter email"
          class="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div class="flex justify-end">
          <button
            @click="sendInvite"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Send Invite
          </button>
          <button
            @click="closeInviteModal"
            class="ml-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "UserInviteModal",
    props: {
      isInviteModalOpen: Boolean,
      closeInviteModal: Function,
      inviteUser: Function, // Passed from parent
    },
    data() {
      return {
        inviteEmail: "",
      };
    },
    methods: {
      sendInvite() {
        // Emit the inviteEmail to the parent component
        this.inviteUser(this.inviteEmail);
        this.inviteEmail = ""; // Reset email field after sending
      },
    },
  };
  </script>
  