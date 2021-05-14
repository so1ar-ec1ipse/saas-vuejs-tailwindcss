<template>
  <div
    class="rounded-sm bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-3 sm:gap-px"
  >
    <h2 class="sr-only" id="quick-links-title">Quick links</h2>

    <div
      class="rounded-tl-sm relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
    >
      <div>
        <span
          class="rounded-sm inline-flex p-3 bg-teal-50 text-teal-700 ring-4 ring-white"
        >
          <!-- Heroicon name: clock -->
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
      </div>
      <div class="mt-6">
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
      class="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
    >
      <div>
        <span
          class="rounded-sm inline-flex p-3 bg-purple-50 text-purple-700 ring-4 ring-white"
        >
          <!-- Heroicon name: badge-check -->
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
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
        </span>
      </div>
      <div class="mt-6">
        <h3 class="text-lg font-medium">
          <router-link
            :to="{ name: 'app.cfdis.upload' }"
            class="focus:outline-none"
          >
            <span class="absolute inset-0" aria-hidden="true"></span>
            {{ $t("app.cfdis.uploadCfdis") }}
          </router-link>
        </h3>
        <p class="mt-2 text-sm text-gray-500">
          {{ $t("app.cfdis.uploadDescription") }}
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
      <div>
        <span
          class="rounded-sm inline-flex p-3 bg-light-blue-50 text-light-blue-700 ring-4 ring-white"
        >
          <!-- Heroicon name: receipt-refund -->
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
              d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
            />
          </svg>
        </span>
      </div>
      <div class="mt-6">
        <h3 class="text-lg font-medium">
          <router-link
            :to="{ name: 'app.transactions.new.manual' }"
            class="focus:outline-none"
          >
            <span class="absolute inset-0" aria-hidden="true"></span>
            {{ $t("app.transactions.newManual") }}
          </router-link>
        </h3>
        <p class="mt-2 text-sm text-gray-500">
          {{ $t("app.transactions.newManualDescription") }}
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
