<template>
  <div class="relative">
    <Header></Header>
    <div class="absolute inset-x-0 bottom-0 dark:text-gray-800 text-gray-50">
      <svg
        viewBox="0 0 224 12"
        fill="currentColor"
        class="w-full -mb-2"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z"
        ></path>
      </svg>
    </div>
    <div
      class="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full"
      aria-hidden="true"
    >
      <div class="relative h-full max-w-7xl mx-auto">
        <svg
          class="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
          width="404"
          height="784"
          fill="none"
          viewBox="0 0 404 784"
        >
          <defs>
            <pattern
              id="f210dbf6-a58d-4871-961e-36d5016a0f49"
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
            height="784"
            fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
          />
        </svg>
        <svg
          class="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2 text-gray-200 dark:text-black"
          width="404"
          height="784"
          fill="none"
          viewBox="0 0 404 784"
        >
          <defs>
            <pattern
              id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" fill="currentColor" />
            </pattern>
          </defs>
          <rect
            width="404"
            height="784"
            fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
          />
        </svg>
      </div>
    </div>
    <div
      class="pt-20 pb-8 px-4 mx-auto max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 flex flex-col text-center mb-0"
    >
      <div class="relative mx-auto max-w-none text-center">
        <img
          v-if="isDarkMode"
          alt="Icon"
          class="h-12 w-12 mx-auto mb-2 hidden lg:block"
          src="@/assets/img/icon-dark.png"
        />
        <img
          v-else
          alt="Icon"
          class="h-12 w-12 mx-auto mb-2 hidden lg:block"
          src="@/assets/img/icon-light.png"
        />
        <h2
          class="mb-6 font-sans text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-secondary leading-none"
        >
          {{ $t("marketing.hero.headline1") }}
          <br class="hidden md:block" />
          <div class="text-4xl md:text-5xl lg:text-6xl">
            {{ $t("marketing.hero.headline2") }}
            <span class="relative inline-block px-2">
              <div
                class="absolute inset-0 transform -skew-x-12 bg-theme-200"
              ></div>
              <span class="relative text-theme-500">{{
                $t("marketing.hero.headline3")
              }}</span>
            </span>
            {{ $t("marketing.hero.headline4") }}
          </div>
        </h2>
        <div
          class="mb-6 text-base text-primary md:text-lg flex space-y-2 space-y-0 items-center space-x-1"
        >
          <div class="mx-auto flex items-center space-x-1">
            <div class="relative inline-block px-2">
              <div
                class="absolute inset-0 transform -skew-x-12 bg-purple-300"
              ></div>
              <span class="relative text-purple-900 font-extrabold">{{
                $t("marketing.hero.feature1")
              }}</span>
            </div>
            <div class="relative inline-block px-2">
              <div
                class="absolute inset-0 transform -skew-x-12 bg-green-300"
              ></div>
              <span class="relative text-green-900 font-extrabold">{{
                $t("marketing.hero.feature2")
              }}</span>
            </div>
            <div class="relative inline-block px-2">
              <div
                class="absolute inset-0 transform -skew-x-12 bg-teal-300"
              ></div>
              <span class="relative text-teal-900 font-extrabold">{{
                $t("marketing.hero.feature3")
              }}</span>
            </div>
          </div>
        </div>
        <div
          class="flex w-full space-x-2 max-w-3xl mx-auto mb-4 justify-center"
        >
          <router-link
            :to="{ name: 'contact' }"
            class="bg-white hover:bg-gray-50 inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-theme-600 transition duration-200 rounded-sm shadow-md focus:shadow-outline focus:outline-none"
          >
            {{ $t("marketing.contact.title") }}
          </router-link>

          <router-link
            :to="{ name: 'prices' }"
            class="bg-gray-800 hover:bg-gray-700 focus:bg-gray-900 inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded-sm shadow-md focus:shadow-outline focus:outline-none"
          >
            {{ $t("marketing.hero.start") }}
          </router-link>
        </div>
        <p
          v-if="true"
          class="max-w-md mb-10 text-xs tracking-wide text-gray-400 sm:text-sm sm:mx-auto md:mb-16"
        >
          {{ $t("marketing.hero.startHint") }}
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
// import { VueTyper } from "vue-typer";
import Component from "vue-class-component";
import { mapGetters } from "vuex";
import Header from "@/components/marketing/Header.vue";

@Component({
  components: {
    Header
  },
  computed: {
    ...mapGetters("theme", {
      marketingTheme: "marketingTheme",
      marketingColor: "marketingColor"
    })
  }
})
export default class Hero extends Vue {
  private email: string = "";
  get isDarkMode() {
    return this.$store.state.theme.marketingTheme === "theme-bg-dark";
  }
}
</script>
<style lan scoped>
.vue-typer .custom.char.typed {
  color: #009688;
}
</style>
