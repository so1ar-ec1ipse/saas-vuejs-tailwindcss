<template>
  <div
    class="min-h-screen flex items-center justify-center bg-secondary py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
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
        <h2 class="mt-6 text-center text-lg font-extrabold text-secondary">
          {{ $t("account.login.title") }}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-500">
          {{ $t("shared.or") }}
          <router-link
            :to="{ name: 'prices' }"
            class="font-medium text-theme-500 hover:text-theme-400"
          >
            {{ $t("account.login.orStartTrial", [7]) }}
          </router-link>
        </p>
      </div>
      <Warning title="Demo" :text="$t('app.demo.login')" />
      <form class="mt-8 space-y-6" @submit.prevent="login()" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-sm shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">{{
              $t("account.shared.email")
            }}</label>
            <input
              v-model="user.email"
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="bg-white dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">{{
              $t("account.shared.password")
            }}</label>
            <input
              v-model="user.password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="bg-white dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <loading-button
            class="w-full block"
            type="submit"
            ref="loadingButton"
          >
            <span class="absolute left-0 inset-y pl-3">
              <svg
                class="h-5 w-5 text-gray-200"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            {{ $t("account.login.button") }}
          </loading-button>
        </div>

        <div class="flex items-center justify-end">
          <div class="text-sm">
            <router-link
              :to="{ name: 'account.forgot' }"
              class="font-medium text-theme-500 hover:text-theme-400"
            >
              {{ $t("account.login.forgot") }}
            </router-link>
          </div>
        </div>
      </form>
      <error-modal
        ref="errorModal"
        :title="$t('shared.error')"
        :text="$t('account.login.errorText')"
        :closeText="$t('shared.close')"
      ></error-modal>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../components/shared/BaseComponent.vue";
import LoadingButton from "../../components/shared/buttons/LoadingButton.vue";
import GoogleSignInButton from "vue-google-signin-button-directive";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import axios from "axios";
import MarketingLogo from "@/components/marketing/MarketingLogo.vue";
import Warning from "@/components/shared/banners/Warning.vue";
import { UserLoginRequest } from "../../application/contracts/master/users/UserLoginRequest";
import { UserLoginType } from "../../application/enums/master/users/UserLoginType";

@Component({
  components: {
    ErrorModal,
    MarketingLogo,
    LoadingButton,
    Warning
  },
  directives: {
    GoogleSignInButton
  }
})
export default class LoginComponent extends BaseComponent {
  $refs!: {
    errorModal: ErrorModal;
    loadingButton: LoadingButton;
  };
  public googleClientId: any = "";
  public user = {} as UserLoginRequest;
  created() {
    this.googleClientId = process.env.VUE_APP_GOOGLE_CLIENT_ID_OAUTH2 ?? "";
  }
  OnGoogleAuthSuccess(idToken) {
    axios
      .get("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + idToken)
      .then((response: any) => {
        this.user.email = response.data.email;
        this.login(UserLoginType.GMAIL);
      });
  }
  OnGoogleAuthFail(error) {
    console.error("Error: " + error);
  }
  login(type: UserLoginType = UserLoginType.PASSWORD) {
    this.$refs.loadingButton.start();
    this.loading = true;
    this.user.loginType = type;
    this.services.authentication
      .login(this.user)
      .then(response => {
        // ignore
      })
      .catch(error => {
        this.$refs.loadingButton.stop();
        this.$refs.errorModal.show(error);
      })
      .finally(() => {
        this.loading = false;
      });
  }
  get isDarkMode() {
    return this.$store.state.theme.marketingTheme === "theme-bg-dark";
  }
}
</script>

<style></style>
