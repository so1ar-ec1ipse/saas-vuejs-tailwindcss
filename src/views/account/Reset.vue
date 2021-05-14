<template>
  <div class>
    <div
      class="bg-secondary min-h-screen flex flex-col justify-center py-12 px-6 lg:px-8"
    >
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <marketing-logo></marketing-logo>
      </div>

      <div>
        <h2 class="mt-6 text-center text-md leading-9 font-bold text-primary">
          {{ $t("account.newPassword.title") }}
        </h2>
        <p class="mt-2 text-center text-sm leading-5 text-primary max-w">
          {{ $t("account.forgot.rememberedPassword") }}
          <a
            class="font-medium text-theme-500 hover:text-theme-400 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            <router-link :to="{ name: 'account.login' }">{{
              $t("account.register.clickHereToLogin")
            }}</router-link>
          </a>
        </p>
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div
            class="max-w-md w-full mx-auto rounded-sm px-8 pt-6 pb-8 mb-4 mt-8"
          >
            <form @submit.prevent="reset">
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
              <div class="mt-6">
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
              <div class="mt-6">
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
                  <button
                    type="submit"
                    class="relative block w-full py-2 px-3 border border-transparent rounded-sm text-white font-semibold bg-gray-800 hover:bg-gray-700 focus:bg-gray-900 focus:outline-shadow sm:text-sm sm:leading-5"
                  >
                    {{ $t("account.newPassword.button") }}
                  </button>
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
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import MarketingLogo from "@/components/marketing/MarketingLogo.vue";
import { UserVerifyRequest } from "../../application/contracts/master/users/UserVerifyRequest";
import ErrorModalComponent from "@/components/shared/modals/NewErrorModal.vue";

@Component({
  components: { ErrorModal, MarketingLogo },
  directives: {
    GoogleSignInButton
  }
})
export default class VerifyComponent extends BaseComponent {
  $refs!: {
    errorModal: ErrorModalComponent;
  };
  public droppedDown: boolean = false;
  public user = {} as UserVerifyRequest;
  private created() {
    this.user.email = this.$route.query.e ? this.$route.query.e.toString() : "";
    this.user.token = this.$route.query.t ? this.$route.query.t.toString() : "";
    // console.log(this.user);
  }
  private reset() {
    this.loading = true;
    if (this.user.password !== this.user.passwordConfirm) {
      return;
    }
    this.services.authentication.verify(this.user).catch(error => {
      this.$refs.errorModal.show(error);
    });
  }
  private closeDropdown() {
    this.droppedDown = false;
  }
}
</script>

<style></style>
