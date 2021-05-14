<template>
  <div class="bg-marketing pb-6">
    <div class="relative pt-6 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <nav
          class="relative flex items-center justify-between sm:h-10 md:justify-center"
          aria-label="Global"
        >
          <div
            class="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0"
          >
            <div class="flex items-center justify-between w-full md:w-auto">
              <router-link :to="{ name: 'product' }" class="hidden lg:block">
                <img
                  v-if="isDarkMode"
                  alt="Icon"
                  class="h-9 w-auto"
                  src="@/assets/img/logo-dark.png"
                />
                <img
                  v-else
                  alt="Icon"
                  class="h-9 w-auto"
                  src="@/assets/img/logo-light.png"
                />
              </router-link>
              <router-link :to="{ name: 'product' }" class="lg:hidden">
                <img
                  v-if="isDarkMode"
                  alt="Icon"
                  class="h-9 w-auto"
                  src="@/assets/img/icon-dark.png"
                />
                <img
                  v-else
                  alt="Icon"
                  class="h-9 w-auto"
                  src="@/assets/img/icon-light.png"
                />
              </router-link>
              <div class="-mr-2 flex items-center md:hidden">
                <div class="flex">
                  <div class="inline-flex rounded-md space-x-4">
                    <FlagSelector
                      class="flex items-center justify-center w-10"
                      :showFlagInsteadOfLocale="true"
                    />
                    <DarkModeToggle />

                    <router-link
                      :to="{ name: 'account.login' }"
                      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-sm text-primary"
                    >
                      <div>{{ $t("marketing.navbar.signIn") }}</div>
                    </router-link>
                  </div>
                </div>
                <button
                  @click="droppedDown = !droppedDown"
                  type="button"
                  class="bg-marketing rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
                  id="main-menu"
                  aria-haspopup="true"
                >
                  <span class="sr-only">{{ $t("shared.close") }}</span>
                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
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
          <color-switcher></color-switcher>
          <div class="hidden md:flex space-x-2 sm:space-x-4 md:space-x-6">
            <router-link
              v-for="(link, idx) in links"
              :key="idx"
              :to="{ name: link.name }"
              class="text-base leading-6 font-medium text-primary hover:text-focus focus:outline-none focus:text-focus transition ease-in-out duration-150 px-3 py-1 rounded-sm hover:bg-primary"
              :class="isCurrent(link.name) ? 'bg-primary' : ''"
              >{{ link.title }}</router-link
            >
            <FlagSelector
              class="flex items-center justify-center w-1 lg:w-10"
            />
            <DarkModeToggle />
          </div>
          <div
            class="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0 z-40"
          >
            <span class="inline-flex rounded-md shadow">
              <router-link
                :to="{ name: 'account.login' }"
                class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-sm text-theme-600 bg-white hover:bg-gray-50"
              >
                <div>{{ $t("marketing.navbar.signIn") }}</div>
              </router-link>
            </span>
          </div>
        </nav>
      </div>

      <!-- Mobile menu -->
      <transition
        enter-active-class="duration-150 ease-out"
        enter-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="duration-100 ease-in"
        leave-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-show="droppedDown"
          class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-40"
        >
          <div
            class="rounded-lg bg-secondary border border-gray-200 dark:border-gray-700 shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden"
          >
            <div class="px-5 pt-4 flex items-center justify-between">
              <div>
                <img
                  v-if="isDarkMode"
                  alt="Icon"
                  class="h-8 w-auto sm:h-10"
                  src="@/assets/img/icon-dark.png"
                />
                <img
                  v-else
                  alt="Icon"
                  class="h-8 w-auto sm:h-10"
                  src="@/assets/img/icon-light.png"
                />
              </div>
              <div class="-mr-2">
                <button
                  @click="droppedDown = !droppedDown"
                  type="button"
                  class="rounded-md p-2 inline-flex items-center justify-center text-gray-400  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
                >
                  <span class="sr-only">{{ $t("shared.close") }}</span>
                  <!-- Heroicon name: x -->
                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="main-menu"
            >
              <div class="px-2 pt-2 pb-3" role="none">
                <router-link
                  v-for="(link, idx) in links"
                  :key="idx"
                  :to="{ name: link.name }"
                  class="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-gray-900 hover:bg-gray-50"
                  role="menuitem"
                  :class="isCurrent(link.name) ? 'bg-primary' : ''"
                  >{{ link.title }}</router-link
                >
              </div>
              <div role="none">
                <router-link
                  :to="{ name: 'account.login' }"
                  class="block w-full px-5 py-3 text-center font-medium text-primary bg-secondary"
                  role="menuitem"
                >
                  <div>{{ $t("marketing.navbar.signIn") }}</div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Selector from "@/components/shared/forms/Selector.vue";
import { mapGetters } from "vuex";
import ColorSwitcher from "./selectors/ColorSwitcher.vue";
import DarkModeToggle from "./toggles/DarkModeToggle.vue";
import FlagSelector from "./selectors/FlagSelector.vue";

@Component({
  components: {
    Selector,
    DarkModeToggle,
    ColorSwitcher,
    FlagSelector
  },
  computed: {
    ...mapGetters("theme", {
      marketingTheme: "marketingTheme",
      marketingColor: "marketingColor"
    })
  }
})
export default class HeaderComponent extends Vue {
  droppedDown: boolean = false;
  currentMarketingTheme: string = "";
  currentMarketingColor: string = "";
  links: any[] = [
    { name: "product", title: this.$t("marketing.navbar.product") },
    { name: "prices", title: this.$t("marketing.navbar.pricing") },
    { name: "contact", title: this.$t("marketing.navbar.contact") },
    { name: "blog", title: this.$t("marketing.navbar.blog") }
  ];
  mounted() {
    this.currentMarketingTheme = this.$store.state.theme.marketingTheme;
    this.currentMarketingColor = this.$store.state.theme.marketingColor;
  }
  isCurrent(pathName: string): boolean {
    return (
      this.$route.name?.includes(pathName) ||
      this.$route.path.includes(pathName)
    );
  }
  get headerColor(): string {
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
  get isDarkMode() {
    return this.$store.state.theme.marketingTheme === "theme-bg-dark";
  }
}
</script>

<style></style>
