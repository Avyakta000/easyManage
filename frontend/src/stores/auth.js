import { defineStore } from 'pinia';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const toast = useToast();

axios.defaults.withCredentials = true;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user:  null,
    error: null,
    status: 'idle', // 'idle', 'loading', 'success', 'failed'
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {

    setUser(userData) {
      this.user = userData;
    },

    async login(email, password) {
      this.status = 'loading';
      this.error = null;

      try {
        // Login API call
        const response = await axios.post('/api/auth/login', { email, password });

        if (response.status === 200) {
          this.user = response.data;
          // localStorage.setItem('user', JSON.stringify(this.user));
          this.status = 'success'; 
          toast.success("Logged in Successfully!!");
        } else {
          this.error = response.data?.error || "Login Failed, Please try again!!";
          this.status = 'failed'; 
          toast.error(this.error);
        }
      } catch (err) {
        this.user = null;
        this.error = err.response?.data?.error || "Login Failed, Please try again!!";
        this.status = 'failed'; 
        toast.error(this.error);
        // localStorage.removeItem('user');
      } finally {
        this.status = this.status !== 'failed' ? 'idle' : this.status; 
      }
    },

    async signup(fullName, email, password, confirmPassword) {
      this.status = 'loading';
      this.error = null;

      try {
        const response = await axios.post('/api/auth/signup', {
          fullName,
          email,
          password,
          confirmPassword,
        });

        if (response.status === 201) {
          this.user = response.data;
          // localStorage.setItem('user', JSON.stringify(this.user));
          this.status = 'success';
          toast.success("Account has been activated successfully!!");
        } else {
          this.error = response.data?.error || "Signup failed";
          this.status = 'failed'; 
          toast.error(this.error);
        }
      } catch (err) {
        this.error = err.response?.data?.error || 'Signup failed';
        this.status = 'failed'; 
        toast.error(this.error);
      } finally {
        this.status = this.status !== 'failed' ? 'idle' : this.status; // Reset to idle if not failed
      }
    },

    async verifyAuth() {
      this.status = 'loading';
      this.error = null;

      try {
        const response = await axios.get('/api/auth/me');
        this.user = response.data;
        // localStorage.setItem('user', JSON.stringify(this.user));
        this.status = 'success'; 
      } catch (err) {
        this.user = null;
        this.error = err.response?.data?.message || 'Authentication required !!!';
        this.status = 'failed'; 
        // localStorage.removeItem('user');
      } finally {
        this.status = this.status !== 'failed' ? 'idle' : this.status; 
      }
    },

    async logout() {
      this.status = 'loading';

      try {
        await axios.post('/api/auth/logout');
        this.user = null;
        // localStorage.removeItem('user');
        this.status = 'success'; 
        toast.success("Logged out successfully!");
      } catch (err) {
        this.status = 'failed'; 
        console.error('Logout failed:', err);
        toast.error("Logout failed, please try again.");
      } finally {
        this.status = 'idle'; 
      }
    },
  },
});
