<template>
  <div class="theme-bg-light">
    <div
      class="bg-secondary min-h-screen flex flex-col justify-center py-12 px-6 lg:px-8"
    >
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div v-if="tenant && (tenant.logo || tenant.logoDarkmode)">
          <router-link :to="{ name: 'product' }">
            <img alt="Logo" :src="tenant.logo" class="mx-auto h-16 w-auto" />
            <!-- <img
              v-else
              :src="tenant.logoDarkmode"
              class="mx-auto h-16 w-auto"
            /> -->
          </router-link>
        </div>
        <marketing-logo v-else></marketing-logo>
      </div>

      <div v-if="requested">
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div
            class="max-w-md w-full mx-auto rounded-sm px-8 pt-6 pb-8 mb-4 mt-8"
          >
            <h2
              class="mt-6 text-center text-3xl leading-9 font-bold text-gray-800"
            >
              {{ $t("account.invitation.successTitle") }}
            </h2>
            <div class="my-4 leading-tight">
              <p class="mt-2 text-center text-sm leading-5 text-gray-800 max-w">
                {{ $t("account.invitation.successText") }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-if="loading">
          <!-- {{ $t("shared.loading") }} -->
        </div>
        <div v-else-if="!tenant" class="text-red-500 text-center">
          {{ $t("shared.invalidInvitation") }}
        </div>
        <div v-if="tenant && tenant.name">
          <div v-if="emailDisabled && email">
            <p class="mt-2 text-center text-sm leading-5 text-gray-800 max-w">
              <button
                @click="logout"
                class="font-medium text-theme-500 hover:text-theme-400 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                {{ $t("account.invitation.anotherEmail") }}
              </button>
            </p>
          </div>
          <div
            class="mt-6 text-center text-lg leading-9 font-bold text-gray-800"
          >
            <div v-if="accepted">
              {{ $t("account.invitation.acceptedUser", [tenant.name]) }}
              <p class="font-normal text-base">
                Ingresa tu contraseña para entrar
              </p>
            </div>
            <div v-else>
              {{ $t("account.invitation.requestAccess") }}
              {{ tenant.name }}
            </div>
          </div>

          <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="py-8 px-4 sm:rounded-sm sm:px-10">
              <form @submit.prevent="accept">
                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium leading-5 text-gray-800"
                    >{{ $t("account.shared.email") }}</label
                  >
                  <div class="mt-1 rounded-sm shadow-sm">
                    <input
                      :disabled="emailDisabled"
                      v-model="user.email"
                      id="email"
                      type="email"
                      required
                      class="bg-white dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 dark:border-gray-600 placeholder-gray-500 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                      :class="{
                        'cursor-not-allowed bg-gray-100': emailDisabled
                      }"
                    />
                  </div>
                </div>
                <div>
                  <div class="mt-6">
                    <label
                      for="password"
                      class="block text-sm font-medium leading-5 text-gray-800"
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
                  <div class="mt-6" v-if="!emailDisabled">
                    <label
                      for="confirmPassword"
                      class="block text-sm font-medium leading-5 text-gray-800"
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
                </div>

                <div class="mt-6">
                  <span class="block w-full rounded-sm shadow-sm">
                    <loading-button
                      class="w-full block"
                      type="submit"
                      ref="loadingButton"
                    >
                      <span v-if="accepted">
                        {{ $t("shared.enter") }}
                      </span>
                      <span v-else>{{
                        $t("shared.request")
                      }}</span></loading-button
                    >
                  </span>
                </div>
              </form>
            </div>
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
import LoadingButton from "@/components/shared/buttons/LoadingButton.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import MarketingLogo from "@/components/marketing/MarketingLogo.vue";
import { mapGetters } from "vuex";
import { defaultState } from "../../store/modules/theme";
import { UserVerifyRequest } from "../../application/contracts/master/users/UserVerifyRequest";
import { TenantDto } from "../../application/dtos/master/tenants/TenantDto";
import { TenantUserDto } from "../../application/dtos/master/tenants/TenantUserDto";
import LoadingButtonComponent from "@/components/shared/buttons/LoadingButton.vue";
import ErrorModalComponent from "@/components/shared/modals/NewErrorModal.vue";

@Component({
  components: { ErrorModal, MarketingLogo, LoadingButton },
  computed: {
    ...mapGetters("theme", {
      marketingTheme: "marketingTheme",
      marketingColor: "marketingColor"
    }),
    ...mapGetters("account", {
      email: "email"
    })
  }
})
export default class InviteURLComponent extends BaseComponent {
  $refs!: {
    loadingButton: LoadingButtonComponent;
    errorModal: ErrorModalComponent;
  };
  public requirePhone: boolean = true;
  public user = {} as UserVerifyRequest;
  public emailDisabled: boolean = false;
  public tenant = {} as TenantDto;
  public email!: string;
  private requested: boolean = false;
  private accepted: boolean = false;
  private created() {
    this.user.token = this.$route.params.linkUrl ?? "";
    this.user.email = this.email;
    if (!this.email) {
      this.user.email = this.$route.query.e?.toString() ?? "";
      this.accepted = this.$route.query.a === "true";
      if (this.user.email && this.user.email !== "") {
        this.emailDisabled = true;
      }
    } else {
      this.emailDisabled = true;
    }
  }
  private mounted() {
    if (this.$route.params.linkUrl) {
      this.loading = true;
      this.$store.commit("theme/marketingTheme", "theme-bg-light");
      this.$store.commit("theme/marketingColor", defaultState.marketingColor);
      this.services.tenantUserInvitations
        .getInviteURL(this.$route.params.linkUrl)
        .then((response: TenantDto) => {
          this.tenant = response;
        })
        .catch(error => {
          if (error.status === 404) {
            this.$refs.errorModal.show(this.$t("shared.invalidInvitation"));
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
  private accept() {
    if (
      !this.emailDisabled &&
      this.user.password !== this.user.passwordConfirm
    ) {
      this.$refs.errorModal.show(
        this.$t("account.login.errors.passwordMissmatch")
      );
      return;
    }

    this.$refs.loadingButton.start();
    this.services.tenantUserInvitations
      .requestAccess(this.$route.params.linkUrl, this.user)
      .then((response: TenantUserDto) => {
        this.requested = true;
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
  private logout() {
    this.$store.commit("auth/logout");
    this.emailDisabled = false;
    this.email = "";
    this.user.email = "";
  }
  // get tenantTheme() {
  //   if (this.tenant) {
  //     return this.tenant.appTheme + " " + this.tenant.appColor;
  //   }
  // }
}
</script>

<style></style>
