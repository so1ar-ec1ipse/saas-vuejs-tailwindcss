<template>
  <div
    id="app"
    :class="marketingTheme + ' ' + marketingColor"
    class="min-h-screen text-secondary bg-primary"
  >
    <div v-if="!closed" class="bg-theme-600 hidden md:block">
      <div class="max-w-screen-xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between flex-wrap">
          <div class="w-0 flex-1 flex items-center">
            <span class="flex p-2 rounded-lg bg-theme-800">
              <svg
                class="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
            </span>

            <p class="ml-3 font-medium text-white truncate block">
              <span class>{{ $t("netcoresaas.free") }}</span>
            </p>
          </div>
          <div
            class="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto mx-1"
          >
            <div class="rounded-sm shadow-sm">
              <a
                href="https://netcoresaas.com/pricing"
                target="_blank"
                class="flex items-center justify-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-sm text-theme-600 bg-white hover:text-theme-500 focus:outline-none focus:shadow-outline transition ease-in-out duration-150"
                >{{ $t("netcoresaas.getBackend") }}</a
              >
            </div>
          </div>
          <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              @click="closed = true"
              type="button"
              class="-mr-1 flex p-2 rounded-sm hover:bg-theme-500 focus:outline-none focus:bg-theme-500 sm:-mr-2 transition ease-in-out duration-150"
              aria-label="Dismiss"
            >
              <svg
                class="h-6 w-6 text-white"
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
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- <img alt="Vue logo" src="./assets/logo-light.png" /> -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  components: {},
  computed: {
    ...mapGetters("theme", {
      marketingTheme: "marketingTheme",
      marketingColor: "marketingColor",
    }),
  },
})
export default class App extends Vue {
  closed = false;
}
</script>
