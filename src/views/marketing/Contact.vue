<template>
  <div>
    <Header></Header>
    <div class="bg-marketing">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:flex-col sm:align-center">
          <div class="relative max-w-xl mx-auto py-12 sm:py-6">
            <svg
              class="absolute left-full transform translate-x-1/2"
              width="404"
              height="404"
              fill="none"
              viewBox="0 0 404 404"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="85737c0e-0916-41d7-917f-596dc7edfa27"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    class="text-gray-200 dark:text-black"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="404"
                height="404"
                fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
              />
            </svg>
            <svg
              class="absolute right-full bottom-0 transform -translate-x-1/2"
              width="404"
              height="404"
              fill="none"
              viewBox="0 0 404 404"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="85737c0e-0916-41d7-917f-596dc7edfa27"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    class="text-gray-200 dark:text-black"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="404"
                height="404"
                fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
              />
            </svg>
            <div class="text-center">
              <h2
                class="text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl"
              >
                {{ $t("marketing.contact.title") }}
              </h2>
              <p class="mt-4 text-lg leading-6 text-gray-500">
                {{ $t("marketing.contact.headline") }}
              </p>
            </div>
            <Warning
              v-if="debug"
              :title="$t('shared.toSetup')"
              :text="$t('marketing.contact.setup')"
            />
            <div class="mt-12">
              <form
                :action="actionURL"
                method="POST"
                class="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
              >
                <div>
                  <label
                    for="first_name"
                    class="block text-sm font-medium text-primary"
                    >{{ $t("marketing.contact.firstName") }}</label
                  >
                  <div class="mt-1">
                    <input
                      required
                      v-bind="form.firstName"
                      type="text"
                      name="first_name"
                      id="first_name"
                      autocomplete="given-name"
                      class="bg-gray-50 dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 dark:border-gray-600 placeholder-gray-500 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    for="last_name"
                    class="block text-sm font-medium text-primary"
                    >{{ $t("marketing.contact.lastName") }}</label
                  >
                  <div class="mt-1">
                    <input
                      v-bind="form.lastName"
                      type="text"
                      name="last_name"
                      id="last_name"
                      autocomplete="family-name"
                      class="bg-gray-50 dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 dark:border-gray-600 placeholder-gray-500 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                    />
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <label
                    for="email"
                    class="block text-sm font-medium text-primary"
                    >{{ $t("marketing.contact.email") }}</label
                  >
                  <div class="mt-1">
                    <input
                      required
                      v-bind="form.email"
                      id="email"
                      name="email"
                      type="email"
                      autocomplete="email"
                      class="bg-gray-50 dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 dark:border-gray-600 placeholder-gray-500 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                    />
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <div class="flex justify-between">
                    <label
                      for="company"
                      class="block text-sm font-medium text-primary"
                      >{{ $t("marketing.contact.organization") }}</label
                    >
                    <span
                      id="company_description"
                      class="text-sm text-gray-500"
                      >{{ $t("shared.optional") }}</span
                    >
                  </div>
                  <div class="mt-1">
                    <input
                      v-bind="form.organization"
                      type="text"
                      name="company"
                      id="company"
                      autocomplete="organization"
                      class="bg-gray-50 dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 dark:border-gray-600 placeholder-gray-500 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                    />
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <div class="flex justify-between">
                    <label
                      for="phone"
                      class="block text-sm font-medium text-primary"
                      >{{ $t("marketing.contact.phone") }}</label
                    >
                    <span
                      id="phone_description"
                      class="text-sm text-gray-500"
                      >{{ $t("shared.optional") }}</span
                    >
                  </div>
                  <div class="mt-1">
                    <input
                      v-bind="form.phone"
                      type="text"
                      name="phone"
                      id="phone"
                      autocomplete="tel"
                      aria-describedby="phone_description"
                      class="bg-gray-50 dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 dark:border-gray-600 placeholder-gray-500 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                    />
                  </div>
                </div>

                <fieldset class="sm:col-span-2">
                  <legend class="block text-sm font-medium text-primary">
                    {{ $t("marketing.contact.taxIds") }}
                  </legend>
                  <div class="mt-4 grid grid-cols-1 gap-y-4">
                    <select
                      name="taxIds"
                      required
                      v-model="form.taxIds"
                      class="bg-gray-50 dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 dark:border-gray-600 placeholder-gray-500 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3 - 5">3 - 5</option>
                      <option value="6 - 10">6 - 10</option>
                      <option value="11 - 20">11 - 20</option>
                      <option value="21 - 50">21 - 50</option>
                      <option value="+50">+50</option>
                    </select>
                  </div>
                </fieldset>

                <fieldset class="sm:col-span-2">
                  <legend class="block text-sm font-medium text-primary">
                    {{ $t("marketing.contact.tickets") }}
                  </legend>
                  <div class="mt-4 grid grid-cols-1 gap-y-4">
                    <select
                      name="tickets"
                      required
                      v-model="form.tickets"
                      class="bg-gray-50 dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 dark:border-gray-600 placeholder-gray-500 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                    >
                      <option value="30">30</option>
                      <option value="31 - 100">31 - 100</option>
                      <option value="101 - 300">101 - 300</option>
                      <option value="301 - 500">301 - 500</option>
                      <option value="501 - 1,000">501 - 1,000</option>
                      <option value="1,001 - 2,000">1,001 - 2,000</option>
                      <option value="2,001 - 5,000">2,001 - 5,000</option>
                      <option value="+5,000">+5,000</option>
                    </select>
                  </div>
                </fieldset>

                <fieldset class="sm:col-span-2">
                  <legend class="block text-sm font-medium text-primary">
                    {{ $t("marketing.contact.users") }}
                  </legend>
                  <div class="mt-4 grid grid-cols-1 gap-y-4">
                    <select
                      name="users"
                      required
                      v-model="form.users"
                      class="bg-gray-50 dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 dark:border-gray-600 placeholder-gray-500 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                    >
                      <option value="1">1</option>
                      <option value="2 - 3">2 - 3</option>
                      <option value="4 - 10">4 - 10</option>
                      <option value="11 - 25">11 - 25</option>
                      <option value="26 - 50">26 - 50</option>
                      <option value="+50">50</option>
                    </select>
                  </div>
                </fieldset>

                <fieldset v-if="false" class="sm:col-span-2">
                  <legend class="block text-sm font-medium text-primary">
                    {{ $t("marketing.contact.interested") }}
                  </legend>
                  <div class="mt-4 grid grid-cols-1 gap-y-4">
                    <select v-model="form.taxIds">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3 - 5">3 - 5</option>
                      <option value="6 - 10">6 - 10</option>
                      <option value="11 - 20">11 - 20</option>
                      <option value="21 - 50">21 - 50</option>
                      <option value="+50">+50</option>
                    </select>
                    <div class="flex items-center">
                      <input
                        required
                        v-bind="form.plan"
                        id="plan_1"
                        name="plan"
                        value="1_basico"
                        type="radio"
                        class="focus:ring-gray-500 h-4 w-4 text-theme-600 border-gray-300"
                      />
                      <label for="plan_1" class="ml-3">
                        <span class="block text-sm text-primary">{{
                          $t("marketing.pricing.products.1")
                        }}</span>
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input
                        required
                        v-bind="form.plan"
                        id="plan_2"
                        name="plan"
                        value="1_esencial"
                        type="radio"
                        class="focus:ring-gray-500 h-4 w-4 text-theme-600 border-gray-300"
                      />
                      <label for="plan_2" class="ml-3">
                        <span class="block text-sm text-primary">{{
                          $t("marketing.pricing.products.2")
                        }}</span>
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input
                        required
                        v-bind="form.plan"
                        id="plan_3"
                        name="plan"
                        value="3_profesional"
                        type="radio"
                        class="focus:ring-gray-500 h-4 w-4 text-theme-600 border-gray-300"
                      />
                      <label for="plan_3" class="ml-3">
                        <span class="block text-sm text-primary">{{
                          $t("marketing.pricing.products.3")
                        }}</span>
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input
                        required
                        v-bind="form.plan"
                        id="plan_4"
                        name="plan"
                        value="4_corporativo"
                        type="radio"
                        class="focus:ring-gray-500 h-4 w-4 text-theme-600 border-gray-300"
                      />
                      <label for="plan_3" class="ml-3">
                        <span class="block text-sm text-primary">{{
                          $t("marketing.pricing.products.4")
                        }}</span>
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input
                        required
                        v-bind="form.plan"
                        id="plan_customized"
                        name="plan"
                        value="plan_customized"
                        type="radio"
                        class="focus:ring-gray-500 h-4 w-4 text-theme-600 border-gray-300"
                      />
                      <label for="plan_customized" class="ml-3">
                        <span class="block text-sm text-primary">{{
                          $t("marketing.pricing.products.custom")
                        }}</span>
                      </label>
                    </div>
                  </div>
                </fieldset>

                <fieldset class="sm:col-span-2">
                  <legend class="block text-sm font-medium text-primary">
                    {{ $t("marketing.contact.whoInvoices?") }}
                  </legend>
                  <div class="mt-4 grid grid-cols-1 gap-y-4">
                    <div class="flex items-center">
                      <input
                        required
                        v-bind="form.facturar"
                        id="facturar_1"
                        name="facturar"
                        value="0"
                        type="radio"
                        class="focus:ring-gray-500 h-4 w-4 text-theme-600 border-gray-300"
                      />
                      <label for="facturar_1" class="ml-3">
                        <span class="block text-sm text-primary">
                          {{ $t("app.tickets.whoInvoices.0") }}
                        </span>
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input
                        required
                        v-bind="form.facturar"
                        id="facturar_2"
                        name="facturar"
                        value="1"
                        type="radio"
                        class="focus:ring-gray-500 h-4 w-4 text-theme-600 border-gray-300"
                      />
                      <label for="plan_2" class="ml-3">
                        <span class="block text-sm text-primary">{{
                          $t("app.tickets.whoInvoices.1")
                        }}</span>
                      </label>
                    </div>
                  </div>
                </fieldset>

                <div class="sm:col-span-2">
                  <div class="flex justify-between">
                    <label
                      for="how_can_we_help"
                      class="block text-sm font-medium text-primary"
                      >{{ $t("marketing.contact.comments") }}</label
                    >
                    <span
                      id="how_can_we_help_description"
                      class="text-sm text-gray-500"
                    ></span>
                  </div>
                  <div class="mt-1">
                    <textarea
                      required
                      v-bind="form.description"
                      id="how_can_we_help"
                      name="how_can_we_help"
                      aria-describedby="how_can_we_help_description"
                      rows="4"
                      class="bg-gray-50 dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 dark:border-gray-600 placeholder-gray-500 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                    ></textarea>
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <div class="flex justify-between">
                    <label
                      for="how_did_you_hear_about_us"
                      class="block text-sm font-medium text-primary"
                      >{{
                        $t("marketing.contact.howDidYouHearAboutUs?")
                      }}</label
                    >
                    <span
                      id="how_did_you_hear_about_us_description"
                      class="text-sm text-gray-500"
                      >{{ $t("shared.optional") }}</span
                    >
                  </div>
                  <div class="mt-1">
                    <input
                      v-bind="form.heardAboutUs"
                      type="text"
                      name="how_did_you_hear_about_us"
                      id="how_did_you_hear_about_us"
                      class="bg-gray-50 dark:bg-gray-700 text-secondary appearance-none rounded-none relative block w-full px-3 py-2 border-gray-300 dark:border-gray-600 placeholder-gray-500 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                    />
                  </div>
                </div>
                <div class="text-right sm:col-span-2">
                  <button
                    type="submit"
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-sm text-white bg-theme-500 hover:bg-theme-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-500"
                  >
                    {{ $t("marketing.contact.send") }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/marketing/Header.vue";
import Footer from "@/components/marketing/Footer.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import Warning from "@/components/shared/banners/Warning.vue";

export default {
  components: {
    Header,
    SuccessModal,
    ErrorModal,
    Footer,
    Warning
  },
  data() {
    return {
      sent: false,
      form: {},
      emailSupport: "",
      facebook: "",
      instagram: "",
      twitter: "",
      actionURL: ""
    };
  },
  mounted() {
    this.facebook = process.env.VUE_APP_SOCIAL_FACEBOOK;
    this.instagram = process.env.VUE_APP_SOCIAL_INSTAGRAM;
    this.twitter = process.env.VUE_APP_SOCIAL_TWITTER;
    this.actionURL = process.env.VUE_APP_INTEGRATIONS_CONTACT_FORMSPREE;
  },
  computed: {
    debug() {
      return process.env.NODE_ENV !== "production";
    }
  }
};
</script>
