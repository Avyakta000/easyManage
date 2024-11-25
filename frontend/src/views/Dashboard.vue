<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col  lg:ml-64">
      <!-- Header -->
      <Header :openInviteModal="openInviteModal" />

      <!-- Content -->
      <main class="flex-1 p-6">
        <div v-if="isDashboardRoute" class="space-y-6">
          <!-- Welcome Section -->
          <div class="bg-gray-700 text-white p-8 rounded-md shadow-lg mb-6">
            <h1 class="text-4xl font-bold">Welcome to Easy Manage</h1>
            <p class="text-lg mt-2">
              Streamline your account management and explore all features with
              ease.
            </p>
          </div>

          <!-- Overview Section -->
          <div class="bg-white p-3 rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">
              What You Can Do ?
            </h2>
            <ul class="space-y-4 text-gray-700">
              <li class="flex items-start">
                <span
                  class="w-8 h-8 bg-blue-500 text-white rounded-full flex justify-center items-center mr-4"
                >
                  <i class="fas fa-user-plus"></i>
                </span>
                <div>
                  <h3 class="text-lg font-semibold">Register Yourself</h3>
                  <p>
                    Create your account quickly and securely, backed by JWT and
                    bcrypt for authentication.
                  </p>
                </div>
              </li>

              <li class="flex items-start">
                <span
                  class="w-8 h-8 bg-green-500 text-white rounded-full flex justify-center items-center mr-4"
                >
                  <i class="fas fa-key"></i>
                </span>
                <div>
                  <h3 class="text-lg font-semibold">Reset Your Password</h3>
                  <p>
                    Reset forgotten passwords securely using tokenized email
                    verification.
                  </p>
                </div>
              </li>

              <li class="flex items-start">
                <span
                  class="w-8 h-8 bg-yellow-500 text-white rounded-full flex justify-center items-center mr-4"
                >
                  <i class="fas fa-envelope"></i>
                </span>
                <div>
                  <h3 class="text-lg font-semibold">Invite Users</h3>
                  <p>
                    Send user invitations easily via email, powered by secure
                    backend APIs.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <!-- Technology Stack Section -->
          <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Frontend Stack -->
            <div
              class="p-6 rounded-lg bg-white shadow-lg border-l-4 border-blue-600"
            >
              <h2
                class="text-2xl font-bold text-blue-700 mb-4 flex items-center"
              >
                <i class="fas fa-laptop-code mr-2"></i> Frontend
              </h2>
              <img
                src="/vuejs.png"
                alt="Vue.js Logo"
                class="w-16 h-16 mb-4"
              />
              <p class="text-gray-700 leading-relaxed">
                Our platform leverages the power of
                <span class="text-blue-600 font-semibold">Vue.js</span> to
                deliver a modern, responsive, and seamless user experience.
              </p>
            </div>

            <!-- Backend Stack -->
            <div
              class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-600"
            >
              <h2
                class="text-2xl font-bold text-green-700 mb-4 flex items-center"
              >
                <i class="fas fa-server mr-2"></i> Backend
              </h2>
              <img
                src="/express.png"
                alt="Express Logo"
                class="w-32 h-16 mb-4"
              />
              <p class="text-gray-700 leading-relaxed">
                Built with Node.js and
                <span class="text-green-600 font-semibold">Express</span>, our
                backend ensures reliable performance with secure data handling
                using PostgreSQL.
              </p>
            </div>

            <!-- Database Stack -->
            <div
              class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-yellow-600"
            >
              <h2
                class="text-2xl font-bold text-yellow-700 mb-4 flex items-center"
              >
                <i class="fas fa-database mr-2"></i> Database
              </h2>
              <img
                src="/postgres.png"
                alt="PostgreSQL Logo"
                class="w-32 h-16 mb-4"
              />
              <p class="text-gray-700 leading-relaxed">
                Data is securely managed with
                <span class="text-yellow-600 font-semibold">Prisma ORM</span>
                and stored in
                <span class="text-yellow-600 font-semibold">PostgreSQL</span>,
                providing a robust foundation for all operations.
              </p>
            </div>

            <!-- Authentication -->
            <div
              class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-600"
            >
              <h2
                class="text-2xl font-bold text-purple-700 mb-4 flex items-center"
              >
                <i class="fas fa-shield-alt mr-2"></i> Authentication
              </h2>
              <img
                src="/jwt.png"
                alt="JWT Logo"
                class="w-32 h-16 mb-4"
              />
              <p class="text-gray-700 leading-relaxed">
                We use
                <span class="text-purple-600 font-semibold">JWT</span> for
                secure token-based authentication and
                <span class="text-purple-600 font-semibold">bcrypt</span> for
                strong password hashing.
              </p>
            </div>
          </div>
        </div>
        <router-view />
      </main>
    </div>

    <!-- Invite User Modal -->
    <UserInviteModal
      :isInviteModalOpen="isInviteModalOpen"
      :closeInviteModal="closeInviteModal"
    />
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useAuthStore } from "@/stores/auth";
import { useRoute } from "vue-router";
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import UserInviteModal from "@/components/UserInviteModal.vue";
import UserInfo from "@/components/UserInfo.vue";

export default {
  name: "Dashboard",

  components: {
    Sidebar,
    Header,
    UserInviteModal,
    UserInfo,
  },

  setup() {
    const userStore = useUserStore();
    const authStore = useAuthStore();
    const route = useRoute();
    const users = userStore.users;
    const isLoading = userStore.isLoading;
    const isInviteModalOpen = ref(false);
    const currentUser = authStore?.user;
    const isAdmin = currentUser?.role === "ADMIN";

    const isDashboardRoute = computed(() => {
      return route.path === "/dashboard";
    });

    // onMounted(async () => {
    //   await userStore.fetchUsers();
    //   console.log(users, "dash");
    // });

    // Open Invite User Modal
    const openInviteModal = () => {
      isInviteModalOpen.value = true;
    };

    // Close Invite User Modal
    const closeInviteModal = () => {
      isInviteModalOpen.value = false;
    };

    // Delete user
    const deleteUser = async (userId) => {
      await userStore.deleteUser(userId);
    };

    // Update user (for regular users)
    const updateUser = async (user) => {
      await userStore.updateUser(user.id, user); // Call Pinia store action
      console.log("Updated user", user);
    };

    return {
      users: userStore.users,
      isLoading,
      isInviteModalOpen,
      openInviteModal,
      closeInviteModal,
      deleteUser,
      updateUser,
      currentUser,
      isAdmin,
      isDashboardRoute,
    };
  },
};
</script>
