<template>
  <div>
    <!-- Sidebar Toggle Button (Visible on small screens) -->
    <button
      @click="toggleSidebar"
      class="lg:hidden z-40 fixed top-4 left-4 text-white p-2 bg-gray-900 rounded-md"
    >
      <!-- Hero Icon: Menu Alt 3 -->
      <Bars2Icon class="h-6 w-6"/>
    </button>

    <!-- Sidebar -->
    <aside
      :class="[ 
        'fixed inset-0 h-screen w-64 bg-blue-600 text-white flex flex-col shadow-lg', 
        isSidebarOpen ? 'hidden' : 'block', 
        'lg:block' 
      ]"
    >

    <div class="bg-blue-700 text-center p-2">Menu</div>
      <!-- Navigation Section -->
      <nav class="flex-1 px-4 py-6 space-y-4 mt-10">
        <router-link
          v-if="isAdmin"
          to="/dashboard/admin"
          class="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-500 transition"
          exact-active-class="bg-blue-800"
        >
          <HomeIcon class="h-6 w-6" /> <!-- Admin Home Icon -->
          <span>Admin</span>
        </router-link>

        <router-link
          v-else
          to="/dashboard"
          class="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-500 transition"
          exact-active-class="bg-blue-800"
        >
          <HomeIcon class="h-6 w-6" /> <!-- Home Icon -->
          <span>Home</span>
        </router-link>

        <router-link
          to="/dashboard/profile"
          class="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-500 transition"
          exact-active-class="bg-blue-800"
        >
          <UserIcon class="h-6 w-6" /> <!-- Profile Icon -->
          <span>Profile</span>
        </router-link>

        <router-link
          to="/dashboard/reset-password"
          class="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-500 transition"
          exact-active-class="bg-blue-800"
        >
          <LockClosedIcon class="h-6 w-6" /> <!-- Password Change Icon -->
          <span>Password</span>
        </router-link>

        <button
          v-if="auth.isAuthenticated"
          @click="handleLogout"
          class="w-full flex items-center space-x-2 text-left px-4 py-2 rounded-lg hover:bg-blue-500 transition"
        >
          <ArrowRightCircleIcon class="h-6 w-6" />
          <span>Logout</span>
        </button>
      </nav>

      <!-- Footer Section -->
      <footer class="px-4 fixed bottom-0 w-64 py-4 bg-gray-900 text-center border-t border-blue-500">
        <div class="text-sm flex flex-col">
          <span>© {{ currentYear }} Easy Manage</span>
          <div class="flex items-center space-x-2 justify-center p-2">
            <span class="italic">Developed by</span> <CodeBracketIcon class="w-5 h-5"/> <span class="font-semibold">Himanshu</span>
          </div>
        </div>
      </footer>
    </aside>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { HomeIcon, UserIcon, LockClosedIcon, ArrowRightCircleIcon, Bars2Icon, CodeBracketIcon, CodeBracketSquareIcon } from "@heroicons/vue/24/outline";

export default {
  name: "Sidebar",
  components: {
    HomeIcon,
    UserIcon,
    LockClosedIcon,
    ArrowRightCircleIcon,
    Bars2Icon,
    CodeBracketIcon,
  },

  setup() {
    const auth = useAuthStore();
    const router = useRouter();
    const currentUser = auth.user; // get the current user
    const isAdmin = currentUser?.role === "ADMIN"; // check if the user is an admin

    const isSidebarOpen = ref(false); // To toggle sidebar visibility

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    const handleLogout = () => {
      auth.logout().then(() => {
        router.push("/login");
      });
    };

    const currentYear = new Date().getFullYear();
    return {
      auth,
      isSidebarOpen,
      toggleSidebar,
      handleLogout,
      isAdmin,
      currentYear,
    };
  },
};
</script>
