<template>
  <div v-if="!closed" class="bg-theme-600">
    <div class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between flex-wrap sm:space-x-1">
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
          <div class="ml-3 font-medium text-white truncate">
            <div class="md:hidden">
              {{ $t("marketing.banner.smallText") }}
            </div>
            <div class="hidden md:flex md:items-center md:space-x-1">
              <div>{{ $t("marketing.banner.largeText") }}</div>
              <a
                href="https://demo.netcoresaas.com"
                target="_blank"
                class="text-theme-50 underline"
                >{{ $t("marketing.banner.thisWebsite") }}</a
              >
            </div>
          </div>
        </div>
        <div
          class="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto"
        >
          <a
            href="https://netcoresaas.com/pricing"
            target="_blank"
            class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-theme-600 bg-white hover:bg-theme-50"
          >
            {{ $t("marketing.pricing.buy") }}
            {{
              $t("shared.backend")
                .toString()
                .toLowerCase()
            }}
          </a>
        </div>
        <div
          class="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto"
        >
          <a
            href="https://github.com/netcoresaas/saas-vuejs-tailwindcss"
            target="_blank"
            class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-theme-600 bg-white hover:bg-theme-50"
          >
            {{ $t("shared.download") }}
            {{
              $t("shared.frontend")
                .toString()
                .toLowerCase()
            }}
          </a>
        </div>
        <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
          <button
            @click="closed = true"
            class="-mr-1 flex p-2 rounded-md hover:bg-theme-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
          >
            <span class="sr-only">{{ $t("shared.close") }}</span>
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
</template>

<script>
export default {
  components: {},
  data() {
    return {
      closed: false
    };
  }
};
</script>