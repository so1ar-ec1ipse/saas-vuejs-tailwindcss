<template>
  <div
    class="rounded-sm bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 grid grid-cols-1 sm:gap-px"
  >
    <h2 class="sr-only" id="quick-links-title">Quick links</h2>

    <div
      class="rounded-tl-sm relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
    >
      <div class="mt-2">
        <h3 class="text-lg font-medium">
          <router-link
            :to="{ name: 'app.tickets.upload' }"
            class="focus:outline-none"
          >
            <span class="absolute inset-0" aria-hidden="true"></span>
            {{ $t("app.tickets.uploadTickets") }}
          </router-link>
        </h3>
        <p class="mt-2 text-sm text-gray-500">
          {{ $t("app.tickets.uploadDescription") }}
        </p>
      </div>
      <span
        class="absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
        aria-hidden="true"
      >
        <svg
          class="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
          />
        </svg>
      </span>
    </div>

    <div
      v-if="whatsAppLink"
      class="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
    >
      <div class="mt-2">
        <h3 class="text-lg font-medium">
          <a
            target="_blank"
            :disabled="!whatsAppLink"
            :href="getWhatsAppLink"
            class="focus:outline-none"
            :class="{
              'hover:no-underline cursor-not-allowed':
                !whatsAppLink || whatsAppLink === ''
            }"
          >
            <span class="absolute inset-0" aria-hidden="true"></span>
            {{ $t("app.tickets.uploadTicketsWithPhone") }}
          </a>
        </h3>
        <p class="mt-2 text-sm text-gray-500">
          {{ $t("app.tickets.uploadTicketsWithPhoneDescription") }}
        </p>
      </div>
      <span
        class="absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
        aria-hidden="true"
      >
        <svg
          class="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
          />
        </svg>
      </span>
    </div>

    <div
      class="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
    >
      <div v-if="false">
        <span
          class="rounded-sm inline-flex p-3 bg-yellow-50 text-yellow-700 ring-4 ring-white"
        >
          <!-- Heroicon name: cash -->
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
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </span>
      </div>
      <div class="mt-2">
        <h3 class="text-lg font-medium">
          <router-link :to="{ name: 'app.reports' }" class="focus:outline-none">
            <span class="absolute inset-0" aria-hidden="true"></span>
            {{ $t("app.reports.title") }}
          </router-link>
        </h3>
        <p class="mt-2 text-sm text-gray-500">
          {{ $t("app.reports.description") }}
        </p>
      </div>
      <span
        class="absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
        aria-hidden="true"
      >
        <svg
          class="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
          />
        </svg>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  components: {},
  computed: {
    ...mapGetters("theme", {
      marketingTheme: "marketingTheme",
      marketingColor: "marketingColor"
    })
  }
})
export default class DashboardQuicklinks extends Vue {
  private phone: string = "";
  private token: string = "";
  private whatsAppLink: string = "";
  mounted() {
    this.phone = process.env.VUE_APP_PHONE?.toString() ?? "";
    this.token = store.state.tenant.current?.currentUser?.chatbotToken ?? "";
    this.whatsAppLink = "";
    if (this.phone && this.token) {
      this.whatsAppLink += `https://wa.me/${this.phone}?text=${this.token}`;
    }
  }
  get getWhatsAppLink() {
    return this.whatsAppLink ?? "#";
  }
}
</script>
