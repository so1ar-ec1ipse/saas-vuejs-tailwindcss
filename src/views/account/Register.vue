<template>
  <div class>
    <div
      class="bg-secondary min-h-screen flex flex-col justify-center py-12 px-6 lg:px-8"
    >
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
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
      </div>

      <div v-if="!registered">
        <h2 class="mt-6 text-center text-lg leading-9 font-bold text-secondary">
          {{ $t("account.register.title") }}
        </h2>
        <p class="mt-2 text-center text-sm leading-5 text-secondary max-w">
          {{ $t("account.register.alreadyRegistered") }}
          <a
            class="font-medium text-theme-500 hover:text-theme-400 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            <router-link :to="{ name: 'account.login' }">
              {{ $t("account.register.clickHereToLogin") }}
            </router-link>
          </a>
        </p>
        <!-- <div class="w-full flex justify-center mt-4">
          <Billing-Period-Toggle
            v-if="!selectedPriceIsOneTimePrice()"
          ></Billing-Period-Toggle>
        </div> -->

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="py-0 px-0 sm:rounded-sm sm:px-10">
            <form @submit.prevent="tryRegisterWithPassword">
              <div class>
                <label
                  for="company"
                  class="block text-sm font-medium leading-5 primary"
                  >{{ $t("account.register.organization") }}</label
                >
                <div class="mt-1">
                  <input
                    v-model="user.workspaceName"
                    :placeholder="$t('shared.name')"
                    id="company"
                    type="text"
                    required
                    class="bg-white dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border-b-0 border-t border-r border-l border-gray-300 dark:border-gray-600 placeholder-gray-500  focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                  />
                </div>
                <div class="flex -space-x-px">
                  <div class="w-1/2 flex-1 min-w-0">
                    <label for="rfc" class="sr-only">{{
                      $t("models.workspace.taxId")
                    }}</label>
                    <input
                      v-model="user.workspaceTaxIdRfc"
                      type="text"
                      name="rfc"
                      id="rfc"
                      class="bg-white dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 dark:border-gray-600 placeholder-gray-500 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                      :placeholder="$t('models.workspace.taxId')"
                      @input="
                        user.workspaceTaxIdRfc = $event.target.value.toUpperCase()
                      "
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <label for="company" class="sr-only">{{
                      $t("models.workspace.legalName")
                    }}</label>
                    <input
                      v-model="user.workspaceLegalName"
                      type="text"
                      name="company"
                      id="company"
                      class="bg-white dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 dark:border-gray-600 placeholder-gray-500 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                      :placeholder="$t('models.workspace.legalName')"
                      @input="
                        user.workspaceLegalName = $event.target.value.toUpperCase()
                      "
                    />
                  </div>
                </div>
              </div>
              <fieldset class="mt-6">
                <legend class="block text-sm font-medium">
                  {{ $t("account.register.personalInfo") }}
                </legend>
                <div class="mt-1 rounded-sm shadow-sm -space-y-px">
                  <div>
                    <label for="email" class="sr-only">{{
                      $t("account.register.personalInfo")
                    }}</label>
                    <input
                      v-model="user.email"
                      type="text"
                      name="email"
                      id="email"
                      class="bg-white dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border-t border-r border-l border-gray-300 dark:border-gray-600 placeholder-gray-500  focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                      :placeholder="$t('account.shared.email')"
                    />
                  </div>
                  <div class="flex -space-x-px">
                    <div class="w-1/2 flex-1 min-w-0">
                      <label for="first_name" class="sr-only">{{
                        $t("account.register.firstName")
                      }}</label>
                      <input
                        v-model="user.firstName"
                        type="text"
                        name="first_name"
                        id="first_name"
                        class="bg-white dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 dark:border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                        :placeholder="$t('account.register.firstName')"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <label for="last_name" class="sr-only">{{
                        $t("account.register.lastName")
                      }}</label>
                      <input
                        v-model="user.lastName"
                        type="text"
                        name="last_name"
                        id="last_name"
                        class="bg-white dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 dark:border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                        :placeholder="$t('account.register.lastName')"
                      />
                    </div>
                  </div>
                  <div class="flex -space-x-px">
                    <div class="w-full flex-1 min-w-0">
                      <label for="phone" class="sr-only">{{
                        $t("settings.profile.phone")
                      }}</label>
                      <input
                        v-model="user.phone"
                        :placeholder="$t('settings.profile.whatsApp')"
                        id="phone"
                        type="text"
                        class="bg-white dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 dark:border-gray-600 placeholder-gray-500 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </fieldset>
              <div v-if="requireName && false" class="mt-6">
                <label
                  for="firstName"
                  class="block text-sm font-medium leading-5 primary"
                  >{{ $t("account.register.firstName") }}</label
                >
                <div class="mt-1 rounded-sm shadow-sm">
                  <input
                    v-model="user.firstName"
                    :placeholder="$t('account.register.firstName')"
                    id="firstName"
                    type="text"
                    required
                    class="bg-white dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 dark:border-gray-600 placeholder-gray-500 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                  />
                </div>
              </div>
              <div v-if="requireName && false" class="mt-6">
                <label
                  for="lastName"
                  class="block text-sm font-medium leading-5 primary"
                  >{{ $t("account.register.lastName") }}</label
                >
                <div class="mt-1 rounded-sm shadow-sm">
                  <input
                    v-model="user.lastName"
                    :placeholder="$t('account.register.lastName')"
                    id="lastName"
                    type="text"
                    required
                    class="bg-white dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 dark:border-gray-600 placeholder-gray-500 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                  />
                </div>
              </div>
              <div v-if="requirePhone && false" class="mt-6">
                <label
                  for="phone"
                  class="block text-sm font-medium leading-5 primary"
                  >{{ $t("settings.profile.phone") }}</label
                >
                <div class="mt-1 rounded-sm shadow-sm">
                  <input
                    v-model="user.phone"
                    :placeholder="$t('settings.profile.phone')"
                    id="phone"
                    type="text"
                    class="bg-white dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 dark:border-gray-600 placeholder-gray-500 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                  />
                </div>
              </div>
              <div v-if="requirePassword" class="mt-6">
                <label
                  for="password"
                  class="block text-sm font-medium leading-5 primary"
                  >{{ $t("account.register.password") }}</label
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
                  class="block text-sm font-medium leading-5 primary"
                  >{{ $t("account.register.confirmPassword") }}</label
                >
                <div class="mt-1 rounded-sm shadow-sm">
                  <input
                    v-model="user.confirmPassword"
                    id="confirmPassword"
                    type="password"
                    required
                    class="bg-white dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 dark:border-gray-600 placeholder-gray-500 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                  />
                </div>
              </div>

              <div class="mt-6">
                <div class="space-y-1" v-click-outside="closeDropdown">
                  <plans mainTheme="" ref="plans"></plans>
                </div>
              </div>

              <div class="mt-6">
                <a
                  @click.prevent="haveCoupon = !haveCoupon"
                  for="coupon"
                  class="block text-sm font-medium leading-5 primary cursor-pointer hover:text-theme-500 underline"
                  >{{ $t("account.register.applyCoupon") }}</a
                >
                <div v-if="haveCoupon" class="mt-1 flex rounded-sm shadow-sm">
                  <div class="relative flex-grow focus-within:z-10">
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    ></div>
                    <input
                      :disabled="coupon"
                      id="coupon"
                      v-model="couponCode"
                      :class="
                        couponDescription &&
                        couponDescription ===
                          $t('account.register.invalidCoupon')
                          ? 'bg-rose-50'
                          : couponDescription
                          ? 'bg-teal-50'
                          : ''
                      "
                      class="bg-white dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 dark:border-gray-600 placeholder-gray-500 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                      :placeholder="$t('account.register.couponCode')"
                    />
                  </div>
                  <button
                    v-if="!coupon"
                    @click.prevent="searchCoupon(true)"
                    class="bg-white dark:bg-gray-800  cursor-pointer -ml-px relative inline-flex items-center px-4 border border-gray-300 dark:border-gray-700 text-sm font-medium rounded-r-sm text-secondary  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                  >
                    <!-- <i class="fa fa-search rounded-sm" /> -->

                    <span>{{ $t("shared.apply") }}</span>
                  </button>
                  <div
                    v-else
                    class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-r-sm text-gray-700 bg-gray-50 hover:text-gray-500 hover:bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                  >
                    <i class="fa fa-check text-teal-500 rounded-sm" />
                    <span class="ml-2">{{ $t("shared.applied") }}</span>
                  </div>
                </div>
                <p
                  v-if="
                    couponDescription &&
                      couponDescription === $t('account.register.invalidCoupon')
                  "
                  class="mt-2 text-sm"
                  id="coupon-description"
                  :class="
                    couponDescription === $t('account.register.invalidCoupon')
                      ? 'text-red-500'
                      : 'text-teal-500'
                  "
                >
                  {{ couponDescription }}
                </p>
              </div>

              <p
                class="mt-3 py-2 text-sm border-t border-gray-200 dark:border-gray-700"
              >
                {{ $t("account.register.bySigningUp") }}
                <a
                  target="_blank"
                  href="/terms-and-conditions"
                  class="text-theme-500 underline"
                  >{{ $t("account.register.termsAndConditions") }}</a
                >
                {{ $t("account.register.andOur") }}
                <a
                  target="_blank"
                  href="/privacy-policy"
                  class="text-theme-500 underline"
                  >{{ $t("account.register.privacyPolicy") }}</a
                >.
              </p>
              <div class="mt-3">
                <span class="block w-full rounded-sm shadow-sm">
                  <loading-button
                    class="w-full block"
                    type="submit"
                    ref="loadingButton"
                  >
                    <span v-if="selectedPrice && selectedPrice.trialDays > 0">
                      {{
                        $t("account.register.startTrial", [
                          selectedPrice.trialDays
                        ])
                      }}
                    </span>
                    <span v-else-if="!getButtonText">Selecciona un plan</span>
                    <span v-else>{{ getButtonText }}</span>
                  </loading-button>
                  <!-- <button
                    type="submit"
                    class="block w-full py-2 px-3 border border-transparent rounded-sm text-white font-semibold bg-gray-800 hover:bg-gray-700 focus:bg-gray-900 focus:outline-shadow sm:text-sm sm:leading-5"
                  >
                    <span v-if="selectedPrice.trialDays > 0">
                      {{
                      $t("account.register.startTrial", [
                      selectedPrice.trialDays,
                      ])
                      }}
                    </span>
                    <span v-else>{{ getButtonText }}</span>
                  </button>-->
                </span>
              </div>

              <!-- Other Authentication Providers -->
              <div v-if="false" class="z-0 mt-6">
                <div class="relative">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-300"></div>
                  </div>
                  <div class="relative flex justify-center text-sm leading-5">
                    <span class="px-2 bg-secondary text-gray-500">
                      {{ $t("account.register.orSignUpUsing") }}
                    </span>
                  </div>
                </div>

                <div class="mt-6">
                  <div>
                    <span class="w-full inline-flex rounded-sm shadow-sm">
                      <button
                        v-google-signin-button="googleClientId"
                        type="submit"
                        class="hover:border-gray-400 w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-sm bg-secondary text-sm leading-5 font-medium text-secondary hover:text-gray-400 focus:outline-none focus:border-theme-300 focus:shadow-outline-theme transition duration-150 ease-in-out"
                        aria-label="Gmail"
                      >
                        <!-- Google Icon -->
                        <svg viewBox="0 0 48 48" width="24px" height="24px">
                          <path
                            fill="#FFC107"
                            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                          />
                          <path
                            fill="#FF3D00"
                            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                          />
                          <path
                            fill="#4CAF50"
                            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                          />
                          <path
                            fill="#1976D2"
                            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                          />
                        </svg>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div v-else class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div
          class="bg-secondary max-w-sm w-full mx-auto rounded-sm px-8 pt-6 pb-8 mb-4 mt-8"
        >
          <h2
            class="mt-6 text-center text-3xl leading-9 font-bold text-secondary"
          >
            {{ $t("account.register.successTitle") }}
          </h2>
          <div class="my-4 leading-tight">
            <p class="mt-2 text-center text-sm leading-5 text-secondary max-w">
              {{ $t("account.register.successText") }}
            </p>
            <!-- <p
              v-if="verifyToken"
              class="mt-2 text-center text-sm leading-5 text-secondary max-w"
            >
              <a
                :href="verifyURL"
                class="font-medium text-red-600 hover:text-red-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                >{{ $t("account.register.clickHereToVerify") }}</a
              >
            </p> -->
          </div>
        </div>
      </div>
    </div>
    <new-modal ref="cardModal" class="">
      <div class="">
        <card
          ref="card"
          class="stripe-card w-full mt-5 mb-5"
          :class="cardCompleted ? 'border-1 border-green-100' : ''"
          :stripe="stripeKey"
          :options="stripeOptions"
          @change="cardCompleted = $event.complete"
        />

        <button
          class="block w-full py-2 px-3 border border-transparent rounded-sm text-white font-semibold bg-gray-800 hover:bg-gray-700 focus:bg-gray-900 focus:outline-shadow sm:text-sm sm:leading-5"
          @click="pay"
          :disabled="!cardCompleted"
        >
          {{ getButtonText }}
        </button>
      </div>
    </new-modal>
    <error-modal
      ref="errorModal"
      :title="$t('shared.error')"
      :text="$t('account.register.errorText')"
      :closeText="$t('shared.close')"
    ></error-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../components/shared/BaseComponent.vue";
import GoogleSignInButton from "vue-google-signin-button-directive";
import { Card, createToken } from "vue-stripe-elements-plus";
import LoadingButton from "@/components/shared/buttons/LoadingButton.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import NewModal from "@/components/shared/modals/NewModal.vue";
import BillingPeriodToggle from "../../components/marketing/toggles/BillingPeriodToggle.vue";
import Plans from "@/components/marketing/Plans.vue";
import MarketingLogo from "@/components/marketing/MarketingLogo.vue";
import Stripe from "stripe";
import { SubscriptionCouponDto } from "../../application/dtos/master/subscriptions/SubscriptionCouponDto";
import { UserLoginType } from "../../application/enums/master/users/UserLoginType";
import { UserLoggedResponse } from "../../application/contracts/master/users/UserLoggedResponse";
import { SubscriptionBillingPeriod } from "../../application/enums/master/subscriptions/SubscriptionBillingPeriod";
import { SubscriptionProductDto } from "../../application/dtos/master/subscriptions/SubscriptionProductDto";
import { SubscriptionPriceDto } from "../../application/dtos/master/subscriptions/SubscriptionPriceDto";
import { UserRegisterRequest } from "../../application/contracts/master/users/UserRegisterRequest";
import LoadingButtonComponent from "@/components/shared/buttons/LoadingButton.vue";
import ErrorModalComponent from "@/components/shared/modals/NewErrorModal.vue";
import ModalComponent from "@/components/shared/modals/Modal.vue";
import Warning from "@/components/shared/banners/Warning.vue";

@Component({
  components: {
    BillingPeriodToggle,
    ErrorModal,
    NewModal,
    Card,
    Plans,
    MarketingLogo,
    LoadingButton,
    Warning
  },
  directives: {
    GoogleSignInButton
  }
})
export default class RegisterComponent extends BaseComponent {
  $refs!: {
    loadingButton: LoadingButtonComponent;
    errorModal: ErrorModalComponent;
    cardModal: ModalComponent;
  };
  public requireName: boolean = true;
  public requirePhone: boolean = true;
  public requirePassword: boolean = false;
  public droppedDown: boolean = false;
  public googleClientId: any = "";
  public user = {} as UserRegisterRequest;
  private email: string = "";
  // private verifyToken: string = "";
  private stripeKey: string = "";
  private stripeOptions: any = {};
  private cardCompleted: boolean = false;
  private registered: boolean = false;
  private haveCoupon: boolean = false;
  private couponCode: string = "";
  private couponDescription: string = "";
  private coupon: SubscriptionCouponDto | null = null;

  created() {
    if (this.$route.query.e) {
      this.user.email = this.$route.query.e.toString();
    }
    if (this.products.length === 0) {
      this.services.subscriptionProducts.getProducts(false, true);
    }
    if (!this.selectedProduct) {
      this.$store.commit("pricing/select", {
        product: this.products[0],
        billingPeriod: this.$store.state.pricing.billingPeriod
      });
    }
    this.googleClientId =
      process.env.VUE_APP_GOOGLE_CLIENT_ID_OAUTH2?.toString() ?? "";
    this.stripeKey =
      process.env.VUE_APP_SUBSCRIPTION_PUBLIC_KEY?.toString() ?? "";
    this.stripeOptions = {
      showCardHolderName: true,
      hidePostalCode: false,
      iconStyle: "solid",
      elements: {
        locale: this.$i18n.locale
      }
    };
  }
  private mounted() {
    if (this.$route.params.coupon) {
      this.haveCoupon = true;
      this.couponCode = this.$route.params.coupon;
      this.searchCoupon(false);
    } else if (this.$route.query.coupon) {
      this.haveCoupon = true;
      this.couponCode = this.$route.query.coupon.toString();
      this.searchCoupon(false);
    }
  }
  private searchCoupon(showError) {
    if (!this.couponCode) {
      return;
    }
    this.services.subscriptionManager
      .getCoupon(this.couponCode, this.selectedPrice.currency)
      .then((response: SubscriptionCouponDto) => {
        this.coupon = response;
        if (this.coupon && this.coupon.name) {
          this.couponDescription = this.coupon.name.toString();
        }
      })
      .catch(error => {
        this.couponDescription = this.$t(
          "account.register.invalidCoupon"
        ).toString();
        if (showError) {
          this.$refs.errorModal.show(this.$t(error));
        }
      });
  }
  // private OnGoogleAuthSuccess(idToken) {
  //   axios
  //     .get("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + idToken)
  //     .then((response) => {
  //       this.user.firstName = response.data.given_name;
  //       this.user.lastName = response.data.family_name;
  //       this.user.email = response.data.email;
  //       if (!this.user.organization || this.user.organization.trim() === "") {
  //         this.$refs.errorModal.show(this.$t("account.register.setTenantName"));
  //       } else {
  //         this.tryRegister(UserLoginType.Gmail);
  //       }
  //     })
  //     .catch((error) => {
  //       this.$refs.errorModal.show(error);
  //     });
  // }
  private OnGoogleAuthFail(error) {
    this.$refs.errorModal.show(error);
  }
  private tryRegisterWithPassword() {
    this.tryRegister(UserLoginType.PASSWORD);
  }
  private tryRegister(loginType: UserLoginType = UserLoginType.PASSWORD) {
    this.email = this.user.email;
    this.user.loginType = loginType;
    if (!this.selectedPrice) {
      this.$refs.errorModal.show("Selecciona un plan");
      return;
    }
    if (this.selectedPrice.trialDays === 0 && this.selectedPrice.price > 0) {
      this.$refs.cardModal.show(
        this.$t("account.register.providePaymentDetails"),
        this.$t("shared.cancel")
      );
    } else {
      this.register();
    }
  }
  private pay() {
    createToken()
      .then(data => {
        if (data.error) {
          this.$refs.errorModal.show(data.error.message);
        } else {
          this.register(data.token.id);
        }
      })
      .catch(error => {
        this.$refs.errorModal.show(error);
      })
      .finally(() => {
        this.$refs.cardModal.close();
      });
  }
  private register(cardToken: string = "") {
    if (!this.selectedPrice) {
      this.$refs.errorModal.show(
        this.$t("account.register.errors.priceNotSelected")
      );
      return;
    } else if (this.selectedPrice && !this.selectedPrice.id) {
      this.$refs.errorModal.show(
        this.$t("account.register.errors.priceNotInDatabase")
      );
      return;
    }
    this.user.selectedSubscription = {
      subscriptionPriceId: this.selectedPrice.id ?? "",
      subscriptionCardToken: cardToken,
      subscriptionCoupon: this.couponCode
    };
    this.$refs.loadingButton.start();
    this.services.authentication
      .register(this.user)
      .then((response: UserLoggedResponse) => {
        this.registered = true;
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
  // private changeProduct(product) : void {
  //   this.closeDropdown();
  //   this.$store.commit("pricing/select", product);
  // }
  private closeDropdown() {
    this.droppedDown = false;
  }
  private selectedPriceIsOneTimePrice(): boolean {
    return (
      !this.selectedPrice ||
      this.selectedPrice.billingPeriod === SubscriptionBillingPeriod.ONCE
    );
  }
  get planSupportsPhone() {
    return this.selectedProduct && this.selectedProduct.tier >= 3;
  }
  get products(): SubscriptionProductDto[] {
    return this.$store.state.pricing.products;
  }
  // get verifyURL(): string {
  //   if (this.verifyToken && this.verifyToken !== "") {
  //     return "/cuenta/verificar?e=" + this.email + "&t=" + this.verifyToken;
  //   }
  //   return "";
  // }
  get getButtonText(): string {
    if (!this.selectedPrice) {
      return "";
    }
    return (
      (this.selectedPrice.billingPeriod === SubscriptionBillingPeriod.ONCE
        ? this.$t("marketing.pricing.pay")
        : this.$t("marketing.pricing.subscribe")) +
      " " +
      this.priceDescription
    );
  }
  get selectedPrice(): SubscriptionPriceDto {
    return (
      this.selectedProduct.prices.find(
        f =>
          f.billingPeriod === this.$store.state.pricing.billingPeriod &&
          f.currency === this.$store.state.pricing.currency &&
          f.mode === this.$store.state.pricing.mode
      ) ??
      this.selectedProduct?.prices.filter(
        f =>
          f.currency === this.$store.state.pricing.currency &&
          f.mode === this.$store.state.pricing.mode
      )[0]
    );
  }
  get billingPeriod(): string {
    if (this.selectedPrice.billingPeriod === SubscriptionBillingPeriod.ONCE) {
      return this.$t("marketing.pricing.once").toString();
    } else {
      return (
        "/ " +
        this.$t(
          "marketing.pricing." +
            SubscriptionBillingPeriod[this.selectedPrice.billingPeriod] +
            "Short"
        )
      );
    }
  }
  get discountedPrice(): number {
    let price = this.selectedPrice.price;
    let couponApplied = "";
    if (this.coupon) {
      if (
        this.coupon.amountOff &&
        this.selectedPrice.currency === this.coupon.currency &&
        this.selectedPrice.mode === this.$store.state.pricing.mode
      ) {
        couponApplied =
          " -$" +
          this.coupon.amountOff / 100 +
          " " +
          this.coupon.currency.toUpperCase();
        price = price - this.coupon.amountOff / 100;
      } else if (this.coupon.percentOff) {
        couponApplied = " -" + this.coupon.percentOff + "%";
        price = Number(
          (price * ((100 - this.coupon.percentOff) / 100)).toFixed(2)
        );
      }
    }
    return price;
  }

  get priceDescription(): string {
    return (
      "$" +
      this.discountedPrice +
      " " +
      this.selectedPrice.currency +
      " " +
      this.billingPeriod
    );
  }
  get selectedProduct(): SubscriptionProductDto {
    return this.$store.state.pricing.selectedProduct;
  }
  get isDarkMode() {
    return this.$store.state.theme.marketingTheme === "theme-bg-dark";
  }
}
</script>

<style></style>
