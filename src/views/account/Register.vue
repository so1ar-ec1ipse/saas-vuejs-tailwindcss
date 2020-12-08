<template>
  <div class>
    <div
      class="min-h-screen bg-primary flex flex-col justify-center py-12 sm:px-6 lg:px-8"
    >
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <marketing-logo></marketing-logo>
      </div>

      <div v-if="!registered">
        <h2
          class="mt-6 text-center text-3xl leading-9 font-bold text-secondary"
        >
          {{ $t("account.register.title") }}
        </h2>
        <p class="mt-2 text-center text-sm leading-5 text-secondary max-w">
          {{ $t("account.register.alreadyRegistered") }}
          <a
            class="font-medium text-theme-500 hover:text-theme-400 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            <router-link :to="{ path: '/login' }">
              {{ $t("account.register.clickHereToLogin") }}
            </router-link>
          </a>
        </p>
        <div class="w-full flex justify-center mt-4">
          <Billing-Period-Toggle
            v-if="!selectedPriceIsOneTimePrice()"
          ></Billing-Period-Toggle>
        </div>
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <router-link
            to="/account/login"
            class="bg-theme-100 mb-2 rounded-sm   mt-8 "
          >
            <div class="rounded-sm bg-theme-50 p-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg
                    class="h-5 w-5 text-theme-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>

                <div class="ml-3">
                  <h3 class="text-sm leading-5 font-medium text-theme-800">
                    {{ $t("netcoresaas.backendNeeded") }}
                  </h3>
                  <div class="mt-2 text-sm leading-5 text-theme-700">
                    <p>{{ $t("netcoresaas.fakeLoginAdmin") }}</p>
                    <p>{{ $t("netcoresaas.fakeLoginTenant") }}</p>
                    <p>{{ $t("netcoresaas.fakeLoginPassword") }}</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div v-else>{{tenant.name}}</div> -->
            <!-- </div> -->
            <error-modal
              ref="errorModal"
              :title="$t('shared.error')"
              :text="$t('account.login.errorText')"
              :closeText="$t('shared.close')"
            ></error-modal>
          </router-link>
          <div
            class="bg-secondary py-8 px-4 shadow sm:rounded-sm sm:px-10 mt-4"
          >
            <form @submit.prevent="tryRegisterWithPassword">
              <div class>
                <label
                  for="company"
                  class="block text-sm font-medium leading-5 primary"
                  >{{ $t("account.register.organization") }}</label
                >
                <div class="mt-1 rounded-sm shadow-sm">
                  <input
                    v-model="user.organization"
                    :placeholder="$t('account.register.organization')"
                    id="company"
                    type="text"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:shadow-outline-theme focus:border-theme-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div class="mt-6">
                <label
                  for="email"
                  class="block text-sm font-medium leading-5 primary"
                  >{{ $t("account.shared.email") }}</label
                >
                <div class="mt-1 rounded-sm shadow-sm">
                  <input
                    v-model="user.email"
                    :placeholder="$t('account.shared.email')"
                    id="email"
                    type="email"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:shadow-outline-theme focus:border-theme-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div v-if="requireName" class="mt-6">
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
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:shadow-outline-theme focus:border-theme-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div v-if="requireName" class="mt-6">
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
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:shadow-outline-theme focus:border-theme-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div v-if="requirePhone" class="mt-6">
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
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:shadow-outline-theme focus:border-theme-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:shadow-outline-theme focus:border-theme-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:shadow-outline-theme focus:border-theme-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>

              <div class="mt-6">
                <div class="space-y-1" v-click-outside="closeDropdown">
                  <plans ref="plans"></plans>
                </div>
              </div>

              <div class="mt-6">
                <a
                  @click.prevent="haveCoupon = !haveCoupon"
                  for="coupon"
                  class="block text-sm font-medium leading-5 primary cursor-pointer hover:text-theme-500"
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
                          ? 'bg-red-100'
                          : couponDescription
                          ? 'bg-teal-100'
                          : ''
                      "
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-l-md placeholder-gray-400 focus:outline-none focus:shadow-outline-theme focus:border-theme-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      :placeholder="$t('account.register.couponCode')"
                    />
                  </div>
                  <button
                    v-if="!coupon"
                    @click.prevent="searchCoupon(true)"
                    class="cursor-pointer -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-r-md text-gray-700 bg-gray-50 hover:text-gray-500 hover:bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                  >
                    <!-- <i class="fa fa-search rounded-sm" /> -->

                    <span>{{ $t("shared.apply") }}</span>
                  </button>
                  <div
                    v-else
                    class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-r-md text-gray-700 bg-gray-50 hover:text-gray-500 hover:bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
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

              <div class="mt-6">
                <span class="block w-full rounded-sm shadow-sm">
                  <loading-button
                    class="w-full block"
                    type="submit"
                    ref="loadingButton"
                  >
                    <span v-if="selectedPrice && selectedPrice.trialDays > 0">
                      {{
                        $t("account.register.startTrial", [
                          selectedPrice.trialDays,
                        ])
                      }}
                    </span>
                    <span v-else>{{ getButtonText }}</span>
                  </loading-button>
                  <!-- <button
                    type="submit"
                    class="block w-full py-2 px-3 border border-transparent rounded-sm text-white font-semibold bg-theme-700 hover:bg-theme-600 focus:bg-theme-500 focus:outline-none focus:shadow-outline sm:text-sm sm:leading-5"
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
          class="bg-secondary max-w-md w-full mx-auto shadow-md rounded-sm px-8 pt-6 pb-8 mb-4 mt-8"
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
            <p
              v-if="verifyToken"
              class="mt-2 text-center text-sm leading-5 text-secondary max-w"
            >
              <a
                :href="verifyURL"
                class="font-medium text-red-600 hover:text-red-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                >{{ $t("account.register.clickHereToVerify") }}</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
    <modal ref="card-modal" class="">
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
          class="block w-full py-2 px-3 border border-transparent rounded-sm text-white font-semibold bg-theme-700 hover:bg-theme-600 focus:bg-theme-500 focus:outline-none focus:shadow-outline sm:text-sm sm:leading-5"
          @click="pay"
          :disabled="!cardCompleted"
        >
          {{ getButtonText }}
        </button>
      </div>
    </modal>
    <error-modal
      ref="error-modal"
      :title="$t('shared.error')"
      :text="$t('account.register.errorText')"
      :closeText="$t('shared.close')"
    ></error-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../components/shared/BaseComponent.vue";

// @ts-ignore
import GoogleSignInButton from "vue-google-signin-button-directive";
// @ts-ignore
import { Card, createToken } from "vue-stripe-elements-plus";

import LoadingButton from "@/components/shared/buttons/LoadingButton.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import Modal from "@/components/shared/modals/Modal.vue";
import axios from "axios";
import BillingPeriodToggle from "../../components/marketing/toggles/BillingPeriodToggle.vue";
import Plans from "@/components/marketing/Plans.vue";
import MarketingLogo from "@/components/marketing/MarketingLogo.vue";
import Stripe from "stripe";
import { SubscriptionCouponDto } from "../../application/dtos/master/subscriptions/SubscriptionCouponDto";
import { UserLoginType } from "../../application/enum/master/UserLoginType";
import { UserLoggedResponse } from "../../application/contracts/master/users/UserLoggedResponse";
import { SubscriptionBillingPeriod } from "../../application/enum/master/SubscriptionBillingPeriod";
import { SubscriptionProductDto } from "../../application/dtos/master/subscriptions/SubscriptionProductDto";
import { SubscriptionPriceDto } from "../../application/dtos/master/subscriptions/SubscriptionPriceDto";
import { UserRegisterRequest } from "../../application/contracts/master/users/UserRegisterRequest";

@Component({
  components: {
    BillingPeriodToggle,
    ErrorModal,
    Modal,
    Card,
    Plans,
    MarketingLogo,
    LoadingButton,
  },
  directives: {
    GoogleSignInButton,
  },
})
export default class RegisterComponent extends BaseComponent {
  public requireName: boolean = true;
  public requirePhone: boolean = false;
  public requirePassword: boolean = false;
  public droppedDown: boolean = false;
  public googleClientId: any = "";
  public user = {} as UserRegisterRequest;
  private email: string = "";
  private verifyToken: string = "";
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
        billingPeriod: this.$store.state.pricing.billingPeriod,
      });
    }
    // @ts-ignore
    this.googleClientId = process.env.VUE_APP_GOOGLE_CLIENT_ID_OAUTH2.toString();
    // @ts-ignore
    this.stripeKey = process.env.VUE_APP_SUBSCRIPTION_PUBLIC_KEY.toString();
    this.stripeOptions = {
      showCardHolderName: true,
      hidePostalCode: false,
      iconStyle: "solid",
      elements: {
        locale: this.$i18n.locale,
      },
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
      .catch((error) => {
        this.couponDescription = this.$t(
          "account.register.invalidCoupon"
        ).toString();
        if (showError) {
          // @ts-ignore
          this.$refs["error-modal"].show(this.$t(error));
        }
      });
  }

  private OnGoogleAuthSuccess(idToken) {
    axios
      .get("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + idToken)
      .then((response) => {
        this.user.firstName = response.data.given_name;
        this.user.lastName = response.data.family_name;
        this.user.email = response.data.email;
        if (!this.user.organization || this.user.organization.trim() === "") {
          // @ts-ignore
          this.$refs["error-modal"].show(
            this.$t("account.register.setTenantName")
          );
        } else {
          this.tryRegister(UserLoginType.Gmail);
        }
      })
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      });
  }
  private OnGoogleAuthFail(error) {
    // @ts-ignore
    this.$refs["error-modal"].show(error);
  }
  private tryRegisterWithPassword() {
    this.tryRegister(UserLoginType.Password);
  }
  private tryRegister(loginType: UserLoginType = UserLoginType.Password) {
    this.email = this.user.email;
    this.user.loginType = loginType;
    // @ts-ignore
    this.user.secretSignInKey = process.env.VUE_APP_SECRETSIGNINKEY?.toString();
    if (this.selectedPrice.trialDays === 0 && this.selectedPrice.price > 0) {
      // @ts-ignore
      this.$refs["card-modal"].show(
        this.$t("account.register.providePaymentDetails"),
        this.$t("shared.cancel")
      );
    } else {
      this.register();
    }
  }
  private pay() {
    createToken()
      .then((data) => {
        if (data.error) {
          // @ts-ignore
          this.$refs["error-modal"].show(data.error.message);
        } else {
          this.register(data.token.id);
        }
      })
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      })
      .finally(() => {
        // @ts-ignore
        this.$refs["card-modal"].close();
      });
  }
  private register(cardToken: string = "") {
    this.user.selectedSubscription = {
      subscriptionPriceId: this.selectedPrice.id ?? "",
      subscriptionCardToken: cardToken,
      subscriptionCoupon: this.$route.params.coupon,
    };
    // @ts-ignore
    this.$refs.loadingButton.start();
    this.services.authentication
      .register(this.user)
      .then((response: UserLoggedResponse) => {
        this.registered = true;
        this.verifyToken = response.verifyToken ?? "";
      })
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      })
      .finally(() => {
        // @ts-ignore
        this.$refs.loadingButton.stop();
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
      this.selectedPrice.billingPeriod === SubscriptionBillingPeriod.Once
    );
  }
  get products(): SubscriptionProductDto[] {
    return this.$store.state.pricing.products;
  }
  get verifyURL(): string {
    if (this.verifyToken && this.verifyToken !== "") {
      return "/account/verify?e=" + this.email + "&t=" + this.verifyToken;
    }
    return "";
  }
  get getButtonText(): string {
    return (
      (this.selectedPrice.billingPeriod === SubscriptionBillingPeriod.Once
        ? this.$t("marketing.pricing.pay")
        : this.$t("marketing.pricing.subscribe")) +
      " " +
      this.priceDescription
    );
  }
  get selectedPrice(): SubscriptionPriceDto {
    return (
      this.selectedProduct?.prices.find(
        (f) =>
          f.billingPeriod === this.$store.state.pricing.billingPeriod &&
          f.currency === this.$store.state.pricing.currency
      ) ??
      this.selectedProduct?.prices.filter(
        (f) => f.currency === this.$store.state.pricing.currency
      )[0]
    );
  }
  get billingPeriod(): string {
    if (this.selectedPrice.billingPeriod === SubscriptionBillingPeriod.Once) {
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
        this.selectedPrice.currency === this.coupon.currency
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
    return "$" + this.discountedPrice + " " + this.billingPeriod;
  }
  get selectedProduct(): SubscriptionProductDto {
    return this.$store.state.pricing.selectedProduct;
  }
}
</script>

<style></style>
