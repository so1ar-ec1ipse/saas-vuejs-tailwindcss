<template>
  <div>
    <div class="z-50">
      <div
        class="mx-auto px-4 sm:px-6 hidden md:block shadow-lg"
        :class="headerColor"
      >
        <div
          class="flex justify-between items-center border-gray-100 py-2 md:justify-start md:space-x-10"
        >
          <div>
            <color-switcher></color-switcher>
          </div>
          <div class="lg:w-0 lg:flex-1">
            <router-link class="hidden lg:block" to="/product">
              <img
                v-if="marketingTheme === 'theme-bg-light'"
                class="h-auto h-14 sm:h-10"
                src="@/assets/img/logo-light.png"
                alt="logo"
              />
              <img
                v-else
                class="h-auto h-14 sm:h-10"
                src="@/assets/img/logo-dark.png"
                alt="logo"
              />
            </router-link>
          </div>

          <span class="inline-flex">
            <dark-mode-toggle></dark-mode-toggle>
          </span>
          <div class="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-sm text-primary-400 hover:text-primary hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-primary transition duration-150 ease-in-out"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <nav class="hidden md:flex space-x-8">
            <router-link
              to="/product"
              class="text-base leading-6 font-medium text-primary hover:text-focus focus:outline-none focus:text-focus transition ease-in-out duration-150 px-3 py-1 rounded-sm hover:bg-primary"
              :class="isCurrent('product') ? 'bg-primary' : ''"
              >{{ $t("marketing.navbar.product") }}</router-link
            >
            <router-link
              to="/pricing"
              class="text-base leading-6 font-medium text-primary hover:text-focus focus:outline-none focus:text-focus transition ease-in-out duration-150 px-3 py-1 rounded-sm hover:bg-primary"
              :class="isCurrent('pricing') ? 'bg-primary' : ''"
              >{{ $t("marketing.navbar.pricing") }}</router-link
            >
            <router-link
              to="/contact"
              class="hidden xl:block text-base leading-6 font-medium text-primary hover:text-focus focus:outline-none focus:text-focus transition ease-in-out duration-150 px-3 py-1 rounded-sm hover:bg-primary"
              :class="isCurrent('contact') ? 'bg-primary' : ''"
              >{{ $t("marketing.navbar.contact") }}</router-link
            >

            <router-link
              to="/blog"
              class="text-base leading-6 font-medium text-primary hover:text-focus focus:outline-none focus:text-focus transition ease-in-out duration-150 px-3 py-1 rounded-sm hover:bg-primary"
              :class="isCurrent('blog') ? 'bg-primary' : ''"
              >{{ $t("marketing.navbar.blog") }}</router-link
            >

            <a
              class="hidden xl:block text-base leading-6 font-medium bg-indigo-100 border border-indigo-300 text-indigo-900 hover:bg-indigo-200 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out px-3 py-1 ml-4 rounded-sm cursor-pointer"
            >
              <flag-selector :open="false"></flag-selector>
            </a>
          </nav>

          <div
            v-if="!$store.state.auth.authenticated"
            class="hidden md:flex items-center justify-end space-x-8 md:space-x-2 md:flex-1 lg:w-0"
          >
            <router-link
              to="login"
              class="space-no-wrap text-base leading-6 font-medium text-primary hover:text-focus focus:outline-none focus:text-focus hover:bg-primary rounded-sm px-4 py-2"
            >
              <div>{{ $t("marketing.navbar.signIn") }}</div>
            </router-link>
            <span class="md:inline-flex rounded-sm shadow-sm hidden">
              <router-link
                to="/pricing"
                class="space-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-sm text-white bg-theme-700 hover:bg-theme-600 focus:bg-theme-500 focus:outline-none focus:border-theme-600 focus:shadow-outline-indigo active:bg-theme-800 active:text-theme-100 transition ease-in-out duration-150"
              >
                <div>{{ $t("marketing.navbar.signUp") }}</div>
              </router-link>
              <a
                href="https://github.com/netcoresaas/frontend-vuejs-tailwindcss"
                target="_blank"
                class="ml-2 space-no-wrap px-2 inline-flex items-center justify-center py-2 border border-theme-200 text-base leading-6 font-medium rounded-sm bg-theme-100 text-theme-700 hover:bg-theme-300 focus:bg-theme-500 focus:outline-none focus:border-theme-600 focus:shadow-outline-indigo active:bg-theme-800 active:text-theme-100 transition ease-in-out duration-150"
              >
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="text-theme text-opacity-50"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
                  />
                </svg>
              </a>
            </span>
          </div>
          <div
            v-else
            class="hidden md:flex items-center justify-end space-x-8 md:flex-1 lg:w-0"
          >
            <router-link
              to="/app"
              class="inline-flex items-center bg-primary border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded-sm text-base mt-4 md:mt-0"
            >
              {{ $t("marketing.navbar.dashboard") }}
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>

      <!--
    Mobile menu, show/hide based on mobile menu state.

    Entering: "duration-200 ease-out"
      From: "opacity-0 scale-95"
      To: "opacity-100 scale-100"
    Leaving: "duration-100 ease-in"
      From: "opacity-100 scale-100"
      To: "opacity-0 scale-95"
      -->
      <div
        class="z-50 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden w-full"
        :class="headerColorMobile"
      >
        <div class="divide-y-1 divide-gray-50 rounded-sm shadow-lg">
          <div class="pt-2 pb-3 px-5 space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <router-link class="flex" to="/product">
                  <img
                    v-if="marketingTheme === 'theme-bg-light'"
                    class="h-8 w-auto"
                    src="@/assets/img/logo-light.png"
                    alt="logo"
                  />
                  <img
                    v-else
                    class="h-8 w-auto"
                    src="@/assets/img/logo-dark.png"
                    alt="logo"
                  />
                </router-link>
              </div>
              <div class="-mr-2">
                <button
                  v-on:click="droppedDown = !droppedDown"
                  type="button"
                  class="inline-flex items-center justify-center p-2 rounded-sm text-gray-400 hover:text-primary focus:outline-none focus:bg-secondary focus:text-primary transition duration-150 ease-in-out"
                >
                  <svg
                    v-if="droppedDown"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <svg
                    v-else
                    class="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="py-6 px-5 space-y-6 rounded-lg" v-if="droppedDown">
            <div
              class="grid grid-cols-2 gap-y-4 gap-x-8 transition-all ease-in"
            >
              <router-link
                @click.native="droppedDown = !droppedDown"
                to="/product"
                class="text-base leading-6 font-medium text-primary hover:text-focus focus:outline-none focus:text-focus transition ease-in-out duration-150"
              >
                <div>{{ $t("marketing.navbar.product") }}</div>
              </router-link>
              <router-link
                @click.native="droppedDown = !droppedDown"
                to="/pricing"
                class="text-base leading-6 font-medium text-primary hover:text-focus focus:outline-none focus:text-focus transition ease-in-out duration-150"
              >
                <div>{{ $t("marketing.navbar.pricing") }}</div>
              </router-link>
              <router-link
                @click.native="droppedDown = !droppedDown"
                to="/contact"
                class="text-base leading-6 font-medium text-primary hover:text-focus focus:outline-none focus:text-focus transition ease-in-out duration-150"
              >
                <div>{{ $t("marketing.navbar.contact") }}</div>
              </router-link>
              <router-link
                to="/blog"
                class="text-base leading-6 font-medium text-primary hover:text-focus focus:outline-none focus:text-focus transition ease-in-out duration-150"
              >
                <div>{{ $t("marketing.navbar.blog") }}</div>
              </router-link>
            </div>
            <div class="space-y-6">
              <span class="w-full flex rounded-sm shadow-sm">
                <a
                  href="https://github.com/netcoresaas/frontend-vuejs-tailwindcss"
                  target="_blank"
                  class="mr-2 w-full flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-sm bg-theme-200 text-theme-700 hover:bg-theme-300 focus:bg-theme-500 focus:outline-none focus:border-theme-600 focus:shadow-outline-indigo active:bg-theme-800 active:text-theme-100 transition ease-in-out duration-150"
                  >GitHub</a
                >
                <a
                  href="https://demo.netcoresaas.com/product"
                  target="_blank"
                  class="mr-2 w-full flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-sm bg-theme-200 text-theme-700 hover:bg-theme-300 focus:bg-theme-500 focus:outline-none focus:border-theme-600 focus:shadow-outline-indigo active:bg-theme-800 active:text-theme-100 transition ease-in-out duration-150"
                  >Demo</a
                >
                <router-link
                  to="pricing"
                  class="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-sm text-white bg-theme-700 hover:bg-theme-600 focus:bg-theme-500 focus:outline-none focus:border-theme-600 focus:shadow-outline-indigo active:bg-theme-800 active:text-theme-100 transition ease-in-out duration-150"
                >
                  <div>{{ $t("marketing.navbar.signUp") }}</div>
                </router-link>
              </span>
              <p
                class="text-center text-base leading-6 font-medium text-primary"
              >
                {{ $t("marketing.navbar.existingCustomer") }}
                <router-link
                  to="login"
                  class="text-theme-600 hover:text-theme-500 transition ease-in-out duration-150"
                >
                  <div>{{ $t("marketing.navbar.signIn") }}</div>
                </router-link>
              </p>
              <span class="w-full flex rounded-sm text-right">
                <flag-selector
                  :open="true"
                  class="w-full flex rounded-sm"
                ></flag-selector>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Selector from "@/components/shared/forms/Selector.vue";
import { mapGetters } from "vuex";
import DarkModeToggle from "./selectors/DarkModeToggle.vue";
import ColorSwitcher from "./selectors/ColorSwitcher.vue";
import FlagSelector from "./selectors/FlagSelector.vue";
import { Watch } from "vue-property-decorator";

@Component({
  components: {
    Selector,
    DarkModeToggle,
    ColorSwitcher,
    FlagSelector,
  },
  computed: {
    ...mapGetters("theme", {
      marketingTheme: "marketingTheme",
      marketingColor: "marketingColor",
    }),
  },
})
export default class HeaderComponent extends Vue {
  droppedDown: boolean = false;
  currentMarketingTheme: string = "";
  currentMarketingColor: string = "";
  currentPath: string = "";
  mounted() {
    this.currentMarketingTheme = this.$store.state.theme.marketingTheme;
    this.currentMarketingColor = this.$store.state.theme.marketingColor;
  }
  isCurrent(path) {
    return this.$route.path.includes(path);
  }
  get headerColor() {
    const color =
      this.$store.state.theme.marketingTheme === "theme-bg-dark"
        ? "bg-secondary"
        : "bg-secondary";
    return color;
  }
  get headerColorMobile() {
    const color =
      this.$store.state.theme.marketingTheme === "theme-bg-dark"
        ? "bg-secondary"
        : "bg-primary";
    return color;
  }
}
</script>

<style></style>
