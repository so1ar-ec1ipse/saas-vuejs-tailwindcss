<template>
  <div class>
    <div
      class="min-h-screen bg-secondary flex flex-col justify-center py-12 px-6 lg:px-8"
    >
      <router-link :to="{ name: 'product' }">
        <img
          v-if="isDarkMode"
          alt="Icon"
          class="mx-auto h-12 w-auto"
          src="@/assets/img/logo-dark.png"
        />
        <img
          v-else
          alt="Icon"
          class="mx-auto h-12 w-auto"
          src="@/assets/img/logo-light.png"
        />
      </router-link>

      <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-md font-extrabold text-secondary">
          {{ $t("account.verify.title") }}
        </h2>
        <p class="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
          {{ $t("account.register.alreadyRegistered") }}
          <a
            class="font-medium text-theme-500 hover:text-theme-400 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            <router-link :to="{ name: 'account.login' }">
              {{ $t("account.register.clickHereToLogin") }}
            </router-link>
          </a>
        </p>
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="sm:rounded-sm sm:px-10">
            <form @submit.prevent="verify">
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium leading-5 text-primary"
                  >{{ $t("account.shared.email") }}</label
                >
                <div class="mt-1 rounded-sm shadow-sm">
                  <input
                    :disabled="true"
                    v-model="user.email"
                    id="email"
                    type="email"
                    required
                    class="bg-white dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 dark:border-gray-600 placeholder-gray-500 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                  />
                </div>
              </div>
              <div v-if="requireName" class="mt-6">
                <label
                  for="firstName"
                  class="block text-sm font-medium leading-5 text-primary"
                  >{{ $t("account.register.firstName") }}</label
                >
                <div class="mt-1 rounded-sm shadow-sm">
                  <input
                    v-model="user.firstName"
                    id="firstName"
                    type="text"
                    required
                    class="bg-white dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 dark:border-gray-600 placeholder-gray-500 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                  />
                </div>
              </div>
              <div v-if="requireName" class="mt-6">
                <label
                  for="lastName"
                  class="block text-sm font-medium leading-5 text-primary"
                  >{{ $t("account.register.lastName") }}</label
                >
                <div class="mt-1 rounded-sm shadow-sm">
                  <input
                    v-model="user.lastName"
                    id="lastName"
                    type="text"
                    required
                    class="bg-white dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 dark:border-gray-600 placeholder-gray-500 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                  />
                </div>
              </div>
              <div v-if="requirePassword" class="mt-6">
                <label
                  for="password"
                  class="block text-sm font-medium leading-5 text-primary"
                  >{{ $t("account.shared.password") }}</label
                >
                <div class="mt-1 rounded-sm shadow-sm">
                  <input
                    v-model="user.password"
                    id="password"
                    type="password"
                    required
                    class="bg-white dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 dark:border-gray-600 placeholder-gray-500 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                  />
                </div>
              </div>
              <div v-if="requirePassword" class="mt-6">
                <label
                  for="confirmPassword"
                  class="block text-sm font-medium leading-5 text-primary"
                  >{{ $t("account.register.confirmPassword") }}</label
                >
                <div class="mt-1 rounded-sm shadow-sm">
                  <input
                    v-model="user.passwordConfirm"
                    id="confirmPassword"
                    type="password"
                    required
                    class="bg-white dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 dark:border-gray-600 placeholder-gray-500 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                  />
                </div>
              </div>

              <div class="mt-6">
                <span class="block w-full rounded-sm shadow-sm">
                  <loading-button
                    class="w-full block"
                    type="submit"
                    ref="loadingButton"
                    >{{ $t("account.verify.button") }}</loading-button
                  >
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <error-modal ref="errorModal"></error-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../components/shared/BaseComponent.vue";
import GoogleSignInButton from "vue-google-signin-button-directive";
import MarketingLogo from "@/components/marketing/MarketingLogo.vue";
import { UserVerifyRequest } from "../../application/contracts/master/users/UserVerifyRequest";
import LoadingButtonComponent from "@/components/shared/buttons/LoadingButton.vue";
import ErrorModalComponent from "@/components/shared/modals/NewErrorModal.vue";

@Component({
  components: { MarketingLogo },
  directives: {
    GoogleSignInButton
  }
})
export default class VerifyComponent extends BaseComponent {
  $refs!: {
    loadingButton: LoadingButtonComponent;
    errorModal: ErrorModalComponent;
  };
  public requireName: boolean = false;
  public requirePassword: boolean = true;
  public droppedDown: boolean = false;
  public user = {} as UserVerifyRequest;
  private created() {
    this.user.email = this.$route.query.e ? this.$route.query.e.toString() : "";
    this.user.token = this.$route.query.t ? this.$route.query.t.toString() : "";
    // console.log(this.user);
  }
  private verify() {
    if (this.user.password !== this.user.passwordConfirm) {
      this.$refs.errorModal.show(
        this.$t("account.login.errors.passwordMissmatch")
      );
      return;
    }

    this.$refs.loadingButton.start();
    this.services.authentication
      .verify(this.user)
      .catch(error => {
        this.$refs.errorModal.show(error);
      })
      .finally(() => {
        if (this.$refs.loadingButton) {
          this.$refs.loadingButton.stop();
        }
      });
  }
  private closeDropdown() {
    this.droppedDown = false;
  }
  get isDarkMode() {
    return this.$store.state.theme.marketingTheme === "theme-bg-dark";
  }
}
</script>

<style></style>
