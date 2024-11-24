<template>
  <div v-if="user" class="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
    <div v-if="!isEditing" class="mt-4">
      <p><strong>Name:</strong> {{ user.fullName }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Role:</strong> {{ user.role }}</p>
    </div>

    <div v-else class="mt-4">
      <label class="block">Name</label>
      <input
        v-model="editableUser.fullName"
        class="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label class="block mt-4">Email</label>
      <input
        v-model="editableUser.email"
        class="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label class="block mt-4">Role</label>
      <select
        v-model="editableUser.role"
        class="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>Select Role</option>
        <option value="ADMIN">Admin</option>
        <option value="USER">User</option>
      </select>
    </div>

    <div class="mt-6 flex space-x-4">
      <button v-if="!isEditing" @click="startEditing">
        <PencilSquareIcon class="h-6 w-6 text-indigo-500" />
      </button>
      <button v-if="isEditing" @click="saveChanges" class="px-4 py-2 bg-green-600 text-white rounded">
        Save Changes
      </button>
      <button v-if="isEditing" @click="cancelEditing" class="px-4 py-2 bg-gray-600 text-white rounded">
        Cancel
      </button>
      <button @click="handleDelete">
        <TrashIcon class="h-6 w-6 text-red-500" /></button>
    </div>
  </div>
  <div v-else class="p-4 text-gray-700">Loading your information...</div>
</template>

<script>
import { PencilSquareIcon } from '@heroicons/vue/24/solid';
import { TrashIcon } from '@heroicons/vue/24/outline';

export default {
  components: {
    TrashIcon, 
    PencilSquareIcon,
  },
  props: {
    user: Object,
    updateUser: Function,
    deleteUser: Function,
  },
  data() {
    return {
      isEditing: false, // to toggle edit mode
      editableUser: { ...this.user }, // to hold editable user data
    };
  },
  watch: {
    // update editableUser when the user prop changes
    user: {
      handler(newValue) {
        this.editableUser = { ...newValue };
      },
      immediate: true,
    },
  },
  methods: {
    startEditing() {
      this.isEditing = true;
    },
    saveChanges() {
      this.isEditing = false;
      this.updateUser(this.editableUser.id, this.editableUser);
    },
    cancelEditing() {
      this.isEditing = false;
      this.editableUser = { ...this.user }; // to revert changes
    },
    handleDelete() {
      this.deleteUser(this.user.id);
    },
  },
};
</script>
