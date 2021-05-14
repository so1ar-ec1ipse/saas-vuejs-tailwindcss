<template>
  <div class="theme-bg-light">
    <div
      class="bg-secondary min-h-screen flex flex-col justify-center py-12 px-6 lg:px-8"
    >
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div v-if="tenant && (tenant.logo || tenant.logoDarkmode)">
          <router-link :to="{ name: 'product' }">
            <img :src="tenant.logo" class="mx-auto h-16 w-auto" />
            <!-- <img
              v-else
              :src="tenant.logoDarkmode"
              class="mx-auto h-16 w-auto"
            /> -->
          </router-link>
        </div>
        <marketing-logo v-else></marketing-logo>
      </div>
      <!-- {{invitation}} -->
      <div v-if="loading">
        <!-- {{ $t("shared.loading") }} -->
      </div>
      <div
        v-else-if="!invitation || !invitation.user"
        class="text-red-500 text-center"
      >
        {{ $t("shared.invalidInvitation") }}
      </div>
      <div v-if="invitation && invitation.user">
        <h2 class="mt-6 text-center text-lg leading-9 font-bold text-gray-800">
          {{ $t("shared.hi") }}
          {{
            invitation.user.firstName
              ? invitation.user.firstName
              : invitation.user.email
          }}, {{ $t("account.invitation.youWereInvited") }}
          {{ invitation.tenant.name }}
        </h2>

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
                    :disabled="true"
                    v-model="user.email"
                    id="email"
                    type="email"
                    required
                    class="bg-white dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 dark:border-gray-600 placeholder-gray-500 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                  />
                </div>
              </div>
              <div v-if="requirePassword" class="mt-6">
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
              <div v-if="requirePassword" class="mt-6">
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

              <div class="mt-6">
                <span class="block w-full rounded-sm shadow-sm">
                  <loading-button
                    class="w-full block"
                    type="submit"
                    ref="loadingButton"
                  >
                    {{ $t("account.invitation.button") }}
                  </loading-button>
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
import { mapGetters } from "vuex";
import { defaultState } from "../../store/modules/theme";
import { UserVerifyRequest } from "../../application/contracts/master/users/UserVerifyRequest";
import { TenantInvitationResponse } from "../../application/contracts/master/tenants/TenantInvitationResponse";
import { TenantDto } from "../../application/dtos/master/tenants/TenantDto";
import LoadingButtonComponent from "@/components/shared/buttons/LoadingButton.vue";
import ErrorModalComponent from "@/components/shared/modals/NewErrorModal.vue";

@Component({
  components: { ErrorModal, MarketingLogo },
  directives: {
    GoogleSignInButton
  },
  computed: {
    ...mapGetters("theme", {
      marketingTheme: "marketingTheme",
      marketingColor: "marketingColor"
    })
  }
})
export default class InvitationComponent extends BaseComponent {
  $refs!: {
    loadingButton: LoadingButtonComponent;
    errorModal: ErrorModalComponent;
  };
  public requirePassword: boolean = true;
  public user = {} as UserVerifyRequest;
  public invitation = {} as any;
  public tenant = {} as TenantDto;
  private created() {
    this.user.token = this.$route.query.i ? this.$route.query.i.toString() : "";
    this.user.email = this.$route.query.e ? this.$route.query.e.toString() : "";
  }
  private mounted() {
    if (this.$route.query.i) {
      this.loading = true;
      this.$store.commit("theme/marketingTheme", "theme-bg-light");
      this.$store.commit("theme/marketingColor", defaultState.marketingColor);
      this.services.tenantUserInvitations
        .getInvitation(this.$route.query.i.toString())
        .then((response: TenantInvitationResponse) => {
          this.invitation = response.invitation;
          this.tenant = response.tenant;
          this.requirePassword = response.requiresVerify;

          // if (this.tenant.appTheme) {
          //   this.$store.commit("theme/marketingTheme", this.tenant.appTheme);
          // }
          // if (this.tenant.appColor) {
          //   this.$store.commit("theme/marketingColor", this.tenant.appColor);
          // }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
  private accept() {
    if (this.user.password !== this.user.passwordConfirm) {
      return;
    }

    this.$refs.loadingButton.start();
    this.services.tenantUserInvitations
      .acceptInvitation(this.$route.query.i.toString(), this.user)
      .catch(error => {
        this.$refs.errorModal.show(error);
        if (this.$refs.loadingButton) {
          this.$refs.loadingButton.stop();
        }
      });
  }
  get tenantTheme() {
    if (this.tenant) {
      return this.tenant.appTheme + " " + this.tenant.appColor;
    }
  }
}
</script>

<style></style>
