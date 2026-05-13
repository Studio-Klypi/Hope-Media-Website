import { defaults, type UserState } from "~/types/states/user";
import type { UserEntity } from "#shared/types/entities/user";

export const useUserStore = defineStore("user", {
  state: (): UserState => ({ ...defaults }),
  getters: {
    loggedIn: state => !!state.user,
  },
  actions: {
    async recover() {
      try {
        const { data: response } = await useFetch<UserEntity>("/api/users/me");
        if (!response.value) return;
        this.user = response.value;
      }
      catch {
        console.error("error while recovering active user");
      }
    },

    async requestCode(email: string) {
      this.loading.code = true;
      let state = true;

      try {
        await $fetch("/api/auth/request-otp", {
          method: "POST",
          body: {
            email,
          },
        });
      }
      catch (e) {
        console.error(e);
        state = false;
      }
      finally {
        this.loading.code = false;
      }

      return state;
    },
    async login(email: string, code: string) {
      this.loading.login = true;
      let state = true;

      try {
        this.user = await $fetch<UserEntity>("/api/auth/login", {
          method: "POST",
          body: {
            email,
            code,
          },
        });
      }
      catch (e) {
        console.error(e);
        state = false;
      }
      finally {
        this.loading.login = false;
      }

      return state;
    },
    logout() {},
  },
});
