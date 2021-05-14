<template>
  <div class>
    <div
      class="bg-secondary min-h-screen flex flex-col justify-center py-12 px-6 lg:px-8"
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

      <div v-if="!emailSent" class="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-md font-extrabold text-secondary">
          {{ $t("account.reset.title") }}
        </h2>
        <p class="mt-5 text-sm leading-5 text-center text-gray-500">
          {{ $t("account.reset.headline") }}
        </p>
        <div class="mt-8 sm:rounded-sm sm:px-10">
          <form @submit.prevent="reset()">
            <div>
              <label
                for="email"
                class="block text-sm font-medium leading-5 text-primary"
                >{{ $t("account.shared.email") }}</label
              >
              <div class="mt-1 rounded-sm shadow-sm">
                <input
                  v-model="email"
                  id="email"
                  type="email"
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
                >
                  <span class="absolute left-0 inset-y pl-3"> </span>
                  {{ $t("account.reset.button") }}
                </loading-button>
              </span>
            </div>
          </form>
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div
                  class="w-full border-t border-gray-300 dark:border-gray-700"
                ></div>
              </div>
              <div class="relative flex justify-center text-sm leading-5">
                <span class="px-2 bg-secondary text-gray-500">{{
                  $t("account.forgot.rememberedPassword")
                }}</span>
              </div>
            </div>

            <div class="mt-6">
              <div>
                <span class="w-full inline-flex rounded-sm shadow-sm">
                  <router-link
                    aria-label="Gmail"
                    class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-sm bg-secondary text-sm leading-5 font-medium text-primary hover:text-theme-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out"
                    tag="button"
                    :to="{ name: 'account.login' }"
                    >{{ $t("account.forgot.backToLogin") }}</router-link
                  >
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div
          class="max-w-md w-full mx-auto rounded-sm px-8 pt-6 pb-8 mb-4 mt-8"
        >
          <h2 class="text-xl font-black">
            <h2 class="mt-6 text-center text-md font-extrabold text-secondary">
              {{ $t("account.reset.resetSuccess") }}
            </h2>
          </h2>
          <div class="my-4 leading-tight">
            <p class="mt-2 text-center text-sm leading-5 text-primary max-w">
              {{ $t("account.reset.emailSent") }}
            </p>
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
import LoadingButton from "../../components/shared/buttons/LoadingButton.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import MarketingLogo from "@/components/marketing/MarketingLogo.vue";
import LoadingButtonComponent from "../../components/shared/buttons/LoadingButton.vue";
import ErrorModalComponent from "@/components/shared/modals/NewErrorModal.vue";

@Component({
  components: {
    SuccessModal,
    ErrorModal,
    MarketingLogo,
    LoadingButton
  }
})
export default class ForgotComponent extends BaseComponent {
  $refs!: {
    loadingButton: LoadingButtonComponent;
    errorModal: ErrorModalComponent;
  };
  private emailSent: boolean = false;
  private email: string = "";
  private verifyToken: string = "";
  created() {
    this.email = this.$route.query.e ? this.$route.query.e.toString() : "";
  }
  reset() {
    this.$refs.loadingButton.start();
    this.services.authentication
      .reset(this.email)
      .then((response: any) => {
        this.emailSent = true;
        this.verifyToken = response.verifyToken;
      })
      .catch(error => {
        this.$refs.errorModal.show(error);
      })
      .finally(() => {
        if (this.$refs.loadingButton) {
          this.$refs.loadingButton.stop();
        }
      });
  }
  get isDarkMode() {
    return this.$store.state.theme.marketingTheme === "theme-bg-dark";
  }
}
</script>

<style></style>
