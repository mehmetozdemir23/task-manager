import axios from "axios";
import { defineStore } from "pinia";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

export const useAuthStore = defineStore({
  id: "authStore",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    errors: {},
  }),
  getters: {
    isAuthenticated: (state) => state.user != null,
  },
  actions: {
    async login(credentials) {
      try {
        await axios.get("sanctum/csrf-cookie");
        await axios.post("login", credentials);
        const { data } = await axios.get("api/user");
        this.user = data;
        localStorage.setItem("user", JSON.stringify(data));
      } catch (error) {
        this.errors = error.response.data;
      }
    },
    async logout() {
      await axios.post("logout");
      this.user = null;
      localStorage.removeItem("user");
    },
    async updateUser(userData) {
      try {
        await axios.get("sanctum/csrf-cookie");
        const { data } = await axios.patch("api/user", userData);
        this.user = data.data;
        localStorage.setItem("user", JSON.stringify(data));
      } catch (error) {
        this.errors = error.response.data.errors;
        for (const field in this.errors)
          this.errors[field] = this.errors[field][0];
      }
    },
    resetError(field) {
      delete this.errors[field];
    },
    resetErrors() {
      this.errors = {};
    },
  },
});
