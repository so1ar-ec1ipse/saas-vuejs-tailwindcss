<template>
  <div
    class="z-40 cursor-pointer transition duration-500 ease-in-out transform items-center flex justify-center"
    @click="toggle()"
  >
    <svg
      v-if="currentTheme === 'theme-bg-light'"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class DarkModeToggleComponent extends Vue {
  toggle() {
    if (this.currentTheme === "theme-bg-dark") {
      this.$store.commit("theme/marketingTheme", "theme-bg-light");
    } else {
      this.$store.commit("theme/marketingTheme", "theme-bg-dark");
    }
    const htmlClasses = document.querySelector("html")?.classList;
    if (this.currentTheme === "theme-bg-light") {
      htmlClasses?.remove("dark");
    } else {
      htmlClasses?.add("dark");
    }
  }
  get currentTheme() {
    return this.$store.state.theme.marketingTheme;
  }
}
</script>