<template>
  <div class="pt-2 pb-40 md:py-6 mx-auto px-4 sm:px-6 md:px-8 overflow-hidden">
    <div>
      <div
        class="justify-between flex mb-2 space-x-2 space-y-0 bg-white p-3 items-center -mx-8 -my-3 md:-my-6 px-8 shadow-inner border border-gray-200"
      >
        <div class="">
          <h1 class="flex-1 text-lg font-extrabold flex items-center">
            Miembros
            <span
              class="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-50 border border-gray-300 ml-2"
            >
              <span class="text-xs font-medium leading-none text-gray-800">{{
                orderedItems.length
              }}</span>
            </span>
          </h1>
          <!--          <p class="text-base">-->
          <!--            {{items.length}}-->
          <!--          </p>-->
        </div>
        <div class="flex items-end space-x-1 space-y-0">
          <span
            class="relative z-0 inline-flex shadow-sm rounded-sm w-full sm:w-auto"
          >
            <button
              @click="reload()"
              id="reload"
              type="button"
              class="items-center w-full bg-white border border-gray-300 rounded-l-none rounded-r-sm shadow-sm px-2 py-2 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <!--                <svg class="ml-2.5 -mr-1.5 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">-->
              <!--                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />-->
              <!--                </svg>-->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </span>
          <span
            class="relative z-0 inline-flex shadow-sm rounded-sm w-full sm:w-auto"
          >
            <router-link
              :to="{ name: 'settings.tenant.members.new' }"
              class="w-full relative inline-flex items-center px-4 py-2 rounded-l-sm border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none"
            >
              {{ $t("shared.new") }}
            </router-link>
          </span>
        </div>
      </div>

      <div class="mt-4 sm:mt-8">
        <div v-if="loading">
          <table-row-skeleton></table-row-skeleton>
          <table-row-skeleton></table-row-skeleton>
          <table-row-skeleton></table-row-skeleton>
        </div>
        <div v-else>
          <div v-if="items.length === 0">
            <div
              class="max-w-md mx-auto border-2 border-gray-100 px-4 lg:px-10 flex justify-center py-4 md:py-8 lg:py-12 rounded-sm"
            >
              <div class="text-center flex flex-col justify-center">
                <!-- Empty SVG Starts -->
                <svg
                  id="f20e0c25-d928-42cc-98d1-13cc230663ea"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 820.16 780.81"
                >
                  <defs>
                    <linearGradient
                      id="07332201-7176-49c2-9908-6dc4a39c4716"
                      x1="539.63"
                      y1="734.6"
                      x2="539.63"
                      y2="151.19"
                      gradientTransform="translate(-3.62 1.57)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stop-color="gray" stop-opacity="0.25" />
                      <stop
                        offset="0.54"
                        stop-color="gray"
                        stop-opacity="0.12"
                      />
                      <stop offset="1" stop-color="gray" stop-opacity="0.1" />
                    </linearGradient>
                    <linearGradient
                      id="0ee1ab3f-7ba2-4205-9d4a-9606ad702253"
                      x1="540.17"
                      y1="180.2"
                      x2="540.17"
                      y2="130.75"
                      gradientTransform="translate(-63.92 7.85)"
                      xlink:href="#07332201-7176-49c2-9908-6dc4a39c4716"
                    />
                    <linearGradient
                      id="abca9755-bed1-4a97-b027-7f02ee3ffa09"
                      x1="540.17"
                      y1="140.86"
                      x2="540.17"
                      y2="82.43"
                      gradientTransform="translate(-84.51 124.6) rotate(-12.11)"
                      xlink:href="#07332201-7176-49c2-9908-6dc4a39c4716"
                    />
                    <linearGradient
                      id="2632d424-e666-4ee4-9508-a494957e14ab"
                      x1="476.4"
                      y1="710.53"
                      x2="476.4"
                      y2="127.12"
                      gradientTransform="matrix(1, 0, 0, 1, 0, 0)"
                      xlink:href="#07332201-7176-49c2-9908-6dc4a39c4716"
                    />
                    <linearGradient
                      id="97571ef7-1c83-4e06-b701-c2e47e77dca3"
                      x1="476.94"
                      y1="156.13"
                      x2="476.94"
                      y2="106.68"
                      gradientTransform="matrix(1, 0, 0, 1, 0, 0)"
                      xlink:href="#07332201-7176-49c2-9908-6dc4a39c4716"
                    />
                    <linearGradient
                      id="7d32e13e-a0c7-49c4-af0e-066a2f8cb76e"
                      x1="666.86"
                      y1="176.39"
                      x2="666.86"
                      y2="117.95"
                      gradientTransform="matrix(1, 0, 0, 1, 0, 0)"
                      xlink:href="#07332201-7176-49c2-9908-6dc4a39c4716"
                    />
                  </defs>
                  <title>no data</title>
                  <rect
                    x="317.5"
                    y="142.55"
                    width="437.02"
                    height="603.82"
                    transform="translate(-271.22 62.72) rotate(-12.11)"
                    fill="#e0e0e0"
                  />
                  <g opacity="0.5">
                    <rect
                      x="324.89"
                      y="152.76"
                      width="422.25"
                      height="583.41"
                      transform="translate(-271.22 62.72) rotate(-12.11)"
                      fill="url(#07332201-7176-49c2-9908-6dc4a39c4716)"
                    />
                  </g>
                  <rect
                    x="329.81"
                    y="157.1"
                    width="411.5"
                    height="570.52"
                    transform="translate(-270.79 62.58) rotate(-12.11)"
                    fill="#fafafa"
                  />
                  <rect
                    x="374.18"
                    y="138.6"
                    width="204.14"
                    height="49.45"
                    transform="translate(-213.58 43.93) rotate(-12.11)"
                    fill="url(#0ee1ab3f-7ba2-4205-9d4a-9606ad702253)"
                  />
                  <path
                    d="M460.93,91.9c-15.41,3.31-25.16,18.78-21.77,34.55s18.62,25.89,34,22.58,25.16-18.78,21.77-34.55S476.34,88.59,460.93,91.9ZM470.6,137A16.86,16.86,0,1,1,483.16,117,16.66,16.66,0,0,1,470.6,137Z"
                    transform="translate(-189.92 -59.59)"
                    fill="url(#abca9755-bed1-4a97-b027-7f02ee3ffa09)"
                  />
                  <rect
                    x="375.66"
                    y="136.55"
                    width="199.84"
                    height="47.27"
                    transform="translate(-212.94 43.72) rotate(-12.11)"
                    fill="#3182ce"
                  />
                  <path
                    d="M460.93,91.9a27.93,27.93,0,1,0,33.17,21.45A27.93,27.93,0,0,0,460.93,91.9ZM470.17,135a16.12,16.12,0,1,1,12.38-19.14A16.12,16.12,0,0,1,470.17,135Z"
                    transform="translate(-189.92 -59.59)"
                    fill="#3182ce"
                  />
                  <rect
                    x="257.89"
                    y="116.91"
                    width="437.02"
                    height="603.82"
                    fill="#e0e0e0"
                  />
                  <g opacity="0.5">
                    <rect
                      x="265.28"
                      y="127.12"
                      width="422.25"
                      height="583.41"
                      fill="url(#2632d424-e666-4ee4-9508-a494957e14ab)"
                    />
                  </g>
                  <rect
                    x="270.65"
                    y="131.42"
                    width="411.5"
                    height="570.52"
                    fill="#fff"
                  />
                  <rect
                    x="374.87"
                    y="106.68"
                    width="204.14"
                    height="49.45"
                    fill="url(#97571ef7-1c83-4e06-b701-c2e47e77dca3)"
                  />
                  <path
                    d="M666.86,118c-15.76,0-28.54,13.08-28.54,29.22s12.78,29.22,28.54,29.22,28.54-13.08,28.54-29.22S682.62,118,666.86,118Zm0,46.08a16.86,16.86,0,1,1,16.46-16.86A16.66,16.66,0,0,1,666.86,164Z"
                    transform="translate(-189.92 -59.59)"
                    fill="url(#7d32e13e-a0c7-49c4-af0e-066a2f8cb76e)"
                  />
                  <rect
                    x="377.02"
                    y="104.56"
                    width="199.84"
                    height="47.27"
                    fill="#3182ce"
                  />
                  <path
                    d="M666.86,118a27.93,27.93,0,1,0,27.93,27.93A27.93,27.93,0,0,0,666.86,118Zm0,44.05A16.12,16.12,0,1,1,683,145.89,16.12,16.12,0,0,1,666.86,162Z"
                    transform="translate(-189.92 -59.59)"
                    fill="#3182ce"
                  />
                  <g opacity="0.5">
                    <rect
                      x="15.27"
                      y="737.05"
                      width="3.76"
                      height="21.33"
                      fill="#47e6b1"
                    />
                    <rect
                      x="205.19"
                      y="796.65"
                      width="3.76"
                      height="21.33"
                      transform="translate(824.47 540.65) rotate(90)"
                      fill="#47e6b1"
                    />
                  </g>
                  <g opacity="0.5">
                    <rect
                      x="451.49"
                      width="3.76"
                      height="21.33"
                      fill="#47e6b1"
                    />
                    <rect
                      x="641.4"
                      y="59.59"
                      width="3.76"
                      height="21.33"
                      transform="translate(523.63 -632.62) rotate(90)"
                      fill="#47e6b1"
                    />
                  </g>
                  <path
                    d="M961,832.15a4.61,4.61,0,0,1-2.57-5.57,2.22,2.22,0,0,0,.1-.51h0a2.31,2.31,0,0,0-4.15-1.53h0a2.22,2.22,0,0,0-.26.45,4.61,4.61,0,0,1-5.57,2.57,2.22,2.22,0,0,0-.51-.1h0a2.31,2.31,0,0,0-1.53,4.15h0a2.22,2.22,0,0,0,.45.26,4.61,4.61,0,0,1,2.57,5.57,2.22,2.22,0,0,0-.1.51h0a2.31,2.31,0,0,0,4.15,1.53h0a2.22,2.22,0,0,0,.26-.45,4.61,4.61,0,0,1,5.57-2.57,2.22,2.22,0,0,0,.51.1h0a2.31,2.31,0,0,0,1.53-4.15h0A2.22,2.22,0,0,0,961,832.15Z"
                    transform="translate(-189.92 -59.59)"
                    fill="#4d8af0"
                    opacity="0.5"
                  />
                  <path
                    d="M326.59,627.09a4.61,4.61,0,0,1-2.57-5.57,2.22,2.22,0,0,0,.1-.51h0a2.31,2.31,0,0,0-4.15-1.53h0a2.22,2.22,0,0,0-.26.45,4.61,4.61,0,0,1-5.57,2.57,2.22,2.22,0,0,0-.51-.1h0a2.31,2.31,0,0,0-1.53,4.15h0a2.22,2.22,0,0,0,.45.26,4.61,4.61,0,0,1,2.57,5.57,2.22,2.22,0,0,0-.1.51h0a2.31,2.31,0,0,0,4.15,1.53h0a2.22,2.22,0,0,0,.26-.45A4.61,4.61,0,0,1,325,631.4a2.22,2.22,0,0,0,.51.1h0a2.31,2.31,0,0,0,1.53-4.15h0A2.22,2.22,0,0,0,326.59,627.09Z"
                    transform="translate(-189.92 -59.59)"
                    fill="#fdd835"
                    opacity="0.5"
                  />
                  <path
                    d="M855,127.77a4.61,4.61,0,0,1-2.57-5.57,2.22,2.22,0,0,0,.1-.51h0a2.31,2.31,0,0,0-4.15-1.53h0a2.22,2.22,0,0,0-.26.45,4.61,4.61,0,0,1-5.57,2.57,2.22,2.22,0,0,0-.51-.1h0a2.31,2.31,0,0,0-1.53,4.15h0a2.22,2.22,0,0,0,.45.26,4.61,4.61,0,0,1,2.57,5.57,2.22,2.22,0,0,0-.1.51h0a2.31,2.31,0,0,0,4.15,1.53h0a2.22,2.22,0,0,0,.26-.45,4.61,4.61,0,0,1,5.57-2.57,2.22,2.22,0,0,0,.51.1h0a2.31,2.31,0,0,0,1.53-4.15h0A2.22,2.22,0,0,0,855,127.77Z"
                    transform="translate(-189.92 -59.59)"
                    fill="#fdd835"
                    opacity="0.5"
                  />
                  <circle
                    cx="812.64"
                    cy="314.47"
                    r="7.53"
                    fill="#f55f44"
                    opacity="0.5"
                  />
                  <circle
                    cx="230.73"
                    cy="746.65"
                    r="7.53"
                    fill="#f55f44"
                    opacity="0.5"
                  />
                  <circle
                    cx="735.31"
                    cy="477.23"
                    r="7.53"
                    fill="#f55f44"
                    opacity="0.5"
                  />
                  <circle
                    cx="87.14"
                    cy="96.35"
                    r="7.53"
                    fill="#4d8af0"
                    opacity="0.5"
                  />
                  <circle
                    cx="7.53"
                    cy="301.76"
                    r="7.53"
                    fill="#47e6b1"
                    opacity="0.5"
                  />
                </svg>
                <!-- Empty SVG Ends -->
                <h4 class="text-base font-medium mb-3">
                  {{ $t("models.shared.createTheFirst") }}
                  {{ $t("models.user.object") }}
                </h4>
                <router-link
                  :to="{ name: 'settings.tenant.members.new' }"
                  class="text-center px-4 py-1 border border-transparent text-sm leading-3 font-medium rounded-sm text-white bg-gray-800 hover:bg-gray-700 focus:outline-shadow active:bg-gray-900 transition duration-150 ease-in-out"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="plus"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    class="md:relative mr-2 svg-inline--fa fa-plus fa-w-14 fa-sm"
                    style="bottom: 1px"
                  >
                    <path
                      fill="currentColor"
                      d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                      class
                    />
                  </svg>
                  {{ $t("models.shared.createTheFirst") }}
                  {{ $t("models.user.object") }}
                </router-link>
              </div>
            </div>
          </div>
          <div
            v-else
            class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-sm border-b border-gray-200 max-w-sm sm:max-w-md lg:max-w-full overflow-x-auto"
          >
            <table class="min-w-full divide-y divide-gray-300 text-xs">
              <thead>
                <tr>
                  <th
                    class="px-0.5 py-1 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider justify-center flex"
                  >
                    {{ $t("shared.avatar") }}
                  </th>
                  <th
                    class="px-1.5 py-1 bg-gray-50 text-left text-xs leading-2 font-normal text-gray-500 uppercase tracking-wider"
                  >
                    {{ $t("settings.profile.role") }}
                  </th>
                  <th
                    class="px-1.5 py-1 bg-gray-50 text-left text-xs leading-2 font-normal text-gray-500 uppercase tracking-wider"
                  >
                    {{ $t("account.shared.email") }}
                  </th>
                  <th
                    class="px-1.5 py-1 bg-gray-50 text-left text-xs leading-2 font-normal text-gray-500 uppercase tracking-wider"
                  >
                    {{ $t("settings.profile.name") }}
                  </th>
                  <th
                    class="px-1.5 py-1 bg-gray-50 text-left text-xs leading-2 font-normal text-gray-500 uppercase tracking-wider"
                  >
                    {{ $t("settings.profile.phone") }}
                  </th>
                  <th
                    class="px-1.5 py-1 bg-gray-50 text-left text-xs leading-2 font-normal text-gray-500 uppercase tracking-wider"
                  >
                    {{ $t("shared.status") }}
                  </th>
                  <th
                    class="px-1.5 py-1 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {{ $t("settings.profile.joinedMethod") }}
                  </th>

                  <th class="pr-5 py-1 bg-gray-50 w-10"></th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="(item, index) in orderedItems"
                  :key="index"
                  :class="{
                    'bg-yellow-50': pendingAcceptance(item)
                  }"
                >
                  <td
                    class="truncate px-0.5 py-1 text-sm leading-3 font-medium text-gray-900 justify-center flex"
                  >
                    <img
                      v-if="item.user && item.user.avatar"
                      class="h-auto xl:h-8 xl:w-8 rounded-sm"
                      :src="item.user.avatar"
                      alt
                    />
                    <span
                      v-else
                      class="inline-flex items-center justify-center h-8 w-8 rounded-sm bg-gray-500"
                    >
                      <span
                        class="text-sm font-medium leading-none text-white"
                        >{{ avatarText(item) }}</span
                      >
                    </span>
                  </td>
                  <td
                    class="truncate px-1.5 py-1 text-sm leading-3 font-normal text-gray-900"
                  >
                    <span
                      class="text-xs w-28 justify-center inline-flex items-center px-1 py-1 rounded-sm font-medium"
                      :class="getUserRoleClass(item)"
                      >{{ getUserRole(item) }}</span
                    >
                  </td>
                  <td
                    class="truncate px-1.5 py-1 text-sm leading-3 font-normal text-gray-900"
                  >
                    {{ item.email }}
                    {{ item.email === email ? `(${$t("shared.me")})` : "" }}
                  </td>
                  <td
                    class="truncate px-1.5 py-1 text-sm leading-3 font-normal text-gray-900"
                  >
                    {{ item.firstName }} {{ item.lastName }}
                  </td>
                  <td
                    class="truncate px-1.5 py-1 text-sm leading-3 font-normal text-gray-900"
                  >
                    {{ item.phone }}
                  </td>
                  <td
                    class="truncate px-1.5 py-1 text-sm leading-3 font-normal text-gray-900"
                  >
                    <span
                      class="text-xs w-28 justify-center inline-flex items-center px-1 py-1 rounded-sm font-medium"
                      :class="getUserStatusClass(item)"
                      >{{ getUserStatus(item) }}</span
                    >
                  </td>
                  <td
                    class="truncate px-1.5 py-1 text-sm leading-3 font-normal text-gray-900"
                  >
                    <span
                      v-if="getUserJoined(item)"
                      class="text-xs w-28 justify-center inline-flex items-center px-1 py-1 rounded-sm font-medium"
                      :class="getUserJoinedClass(item)"
                      >{{ getUserJoined(item) }}</span
                    >
                  </td>

                  <td
                    class="pr-4 py-1 whitespace-no-wrap text-right text-sm leading-3 font-medium"
                  >
                    <div
                      v-if="pendingAcceptance(item) && isOwnerOrAdmin"
                      class="flex items-center space-x-1"
                    >
                      <button
                        @click="acceptUser(item, true)"
                        class="bg-teal-50 text-teal-800 p-2 hover:bg-teal-200 rounded-sm border boder-teal-300"
                      >
                        {{ $t("shared.accept") }}
                      </button>
                      <button
                        @click="acceptUser(item, false)"
                        class="bg-red-50 text-red-800 p-2 hover:bg-red-200 rounded-sm border boder-red-300"
                      >
                        {{ $t("shared.reject") }}
                      </button>
                    </div>
                    <router-link
                      v-else
                      :to="{
                        name: 'settings.tenant.members.edit',
                        params: { id: item.id }
                      }"
                      class="text-theme-600 hover:text-theme-900"
                      >{{ $t("shared.edit") }}</router-link
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="tenantJoinSettings && isOwnerOrAdmin" class="mt-4">
            <div>
              <div
                class="text-lg leading-6 font-medium text-gray-900 flex items-center space-x-3"
              >
                <div>
                  {{ $t("settings.tenant.members.invite") }}
                </div>
                <input
                  type="checkbox"
                  v-model="enableLink"
                  @change="changeLinkSettings($event)"
                />
              </div>

              <div class="col-span-3 sm:col-span-2 max-w-lg">
                <div v-if="enableLink" class="mt-1 flex rounded-sm shadow-sm">
                  <input
                    disabled
                    :value="urlLink"
                    id="invite_link"
                    class="border border-gray-200 bg-white px-1.5 form-input flex-1 block w-full rounded-l-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                  <button
                    @click="copyInviteLink()"
                    class="-ml-px relative inline-flex items-center px-4 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-r-md text-gray-700 bg-gray-50 hover:text-gray-500 hover:bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                  >
                    <svg
                      class="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                      />
                      <path
                        d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"
                      />
                    </svg>
                    <span class="ml-2">
                      {{
                        copiedUrlLink ? $t("shared.copied") : $t("shared.copy")
                      }}
                    </span>
                  </button>
                </div>
              </div>
              <div>
                <div
                  class="text-sm leading-5 sm:flex items-center sm:space-x-2 mt-2 sm:mt-0"
                >
                  <p v-if="enableLink" class="block">
                    <label class="text-lg">
                      {{ $t("settings.tenant.members.requireAcceptance") }}
                    </label>
                    <input
                      class="ml-3"
                      type="checkbox"
                      v-model="requireAcceptance"
                      @change="changeLinkSettings($event)"
                    />
                  </p>
                  <!-- {{
                    $t("settings.tenant.members.inviteDescription", [
                      $store.state.tenant.current.name,
                    ])
                  }} -->
                  <button
                    v-if="enableLink"
                    class="text-gray-900 font-bold underline mt-2 sm:mt-0"
                    @click="updateTenantJoinSettings(true)"
                  >
                    {{ $t("settings.tenant.members.inviteResetLink") }}
                  </button>
                </div>
              </div>
              <div class="flex items-center space-x-2 justify-start mt-2"></div>
              <!-- <label>Enable public URL</label>
            <input type="checkbox" v-model="enablePublicUrl" @change="changeLinkSettings($event)" />-->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="maxNumberOfUsersReached">
      <div
        class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-8 min-w-full"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-yellow-400"
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
            <p class="text-sm leading-5 text-yellow-700">
              {{ $t("settings.tenant.members.maxNumberOfUsers") }} ({{
                maxNumberOfUsers
              }})
              <router-link
                :to="{ name: 'settings.tenant.subscription' }"
                class="font-medium underline text-yellow-700 hover:text-yellow-600 transition ease-in-out duration-150"
                >{{ $t("shared.upgrade") }}</router-link
              >
            </p>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <error-modal ref="errorModal"></error-modal>
    <confirm-modal
      ref="confirmarAcceptUser"
      v-on:yes="yesAcceptUser"
    ></confirm-modal>
    <confirm-modal
      ref="confirmUpgrade"
      v-on:yes="yesUpdateSubscription"
    ></confirm-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../../components/shared/BaseComponent.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import ConfirmModal from "@/components/shared/modals/ConfirmModal.vue";
import ObjectList from "../../../../components/shared/forms/ObjectList.vue";
import TableRowSkeleton from "@/components/shared/skeletons/TableRowSkeleton.vue";
import { Prop } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { TenantUserDto } from "@/application/dtos/master/tenants/TenantUserDto";
import { TenantJoinSettingsDto } from "@/application/dtos/master/tenants/TenantJoinSettingsDto";
import { TenantProductDto } from "@/application/dtos/master/tenants/TenantProductDto";
import ErrorModalComponent from "@/components/shared/modals/NewErrorModal.vue";
import ConfirmModalComponent from "@/components/shared/modals/ConfirmModal.vue";
import { TenantUserRole } from "@/application/enums/master/tenants/TenantUserRole";
import { TenantUserStatus } from "@/application/enums/master/tenants/TenantUserStatus";
import { TenantUserJoined } from "@/application/enums/master/tenants/TenantUserJoined";

@Component({
  components: {
    ObjectList,
    TableRowSkeleton,
    ConfirmModal,
    ErrorModal
  },
  computed: {
    ...mapGetters("tenant", {
      activeProduct: "activeProduct",
      memberCount: "memberCount",
      isOwnerOrAdmin: "isOwnerOrAdmin"
    }),
    ...mapGetters("account", {
      isAdmin: "isAdmin",
      email: "email"
    })
  }
})
export default class TenantMembersComponent extends BaseComponent {
  $refs!: {
    confirmarAcceptUser: ConfirmModal;
    errorModal: ErrorModalComponent;
    confirmUpgrade: ConfirmModalComponent;
  };
  @Prop({ default: "Miembros" }) readonly title!: string;

  public items = [] as TenantUserDto[];
  private tenantJoinSettings: any = {};
  private enableLink: boolean = false;
  private enablePublicUrl: boolean = false;
  private requireAcceptance: boolean = false;
  private copiedUrlLink: boolean = false;
  private activeProduct!: TenantProductDto;
  private memberCount!: number;
  private isOwnerOrAdmin!: boolean;
  private role!: TenantUserRole;
  private acceptedUser!: TenantUserDto;
  private isAdmin!: boolean;
  private acceptUserEmail: string = "";
  private email!: string;
  created() {
    const self = this;
    this.eventBus.$on("user-canceled", () => self.canceled());
    this.eventBus.$on("user-added", data => self.added(data));
    this.eventBus.$on("user-saved", data => self.saved(data));
    this.eventBus.$on("user-deleted", data => self.deleted(data));

    this.acceptUserEmail = this.$route.query.au?.toString() ?? "";
  }
  destroy() {
    this.eventBus.$off("user-canceled");
    this.eventBus.$off("user-deleted");
    this.eventBus.$off("user-added");
    this.eventBus.$off("user-saved");
  }
  mounted() {
    // SignalService.on("UserAdded", (user: User) => {
    //   this.items.push(user);
    // });
    this.services.tenantUserInvitations
      .getInvitationSettings()
      .then((response: TenantJoinSettingsDto) => {
        this.tenantJoinSettings = response;
        this.enableLink = this.tenantJoinSettings.linkActive;
        this.enablePublicUrl = this.tenantJoinSettings.publicUrl;
        this.requireAcceptance = this.tenantJoinSettings.requireAcceptance;
      });
    this.reload();
  }
  avatarText(user) {
    if (user) {
      if (user.firstName && user.lastName) {
        if (user.firstName.length > 0 && user.lastName.length > 0) {
          return (user.firstName[0] + user.lastName[0]).toUpperCase();
        } else if (user.firstName.length > 1) {
          return user.firstName.substring(0, 2).toUpperCase();
        } else if (user.email.length > 1) {
          return user.email.substring(0, 2).toUpperCase();
        }
      } else {
        return user.email.substring(0, 2).toUpperCase();
      }
    }
  }
  async reload() {
    this.loading = true;
    this.services.tenantUsers
      .getAll()
      .then((response: TenantUserDto[]) => {
        this.items = [];
        response.forEach(element => {
          this.items.push(element);
        });

        if (this.acceptUserEmail) {
          const user = this.items.find(f => f.email === this.acceptUserEmail);
          if (user && user.status === TenantUserStatus.PENDING_ACCEPTANCE) {
            this.acceptUser(user, true);
          }
        }
      })
      .catch(error => {
        this.$refs.errorModal.show(error);
      })
      .finally(() => {
        this.loading = false;
      });
  }
  canceled() {
    console.log("canceled");
  }
  added(data: TenantUserDto) {
    this.reload();
    // console.log("added data:" + JSON.stringify(data));
    // this.items.push(data);
    // // SignalService.invoke(
    //   "AddUser",
    //   this.$store.state.tenant.current.id,
    //   data
    // );
  }
  saved(data) {
    const idx = this.items.findIndex(f => f.id === data.id);
    // console.log("found: " + JSON.stringify(idx));
    this.items[idx] = data;
  }
  deleted(data) {
    this.items = this.items.filter(f => f.id !== data.id);
  }
  updateTenantJoinSettings(reset = false) {
    this.services.tenantUserInvitations
      .updateInvitationSettings({
        enableLink: this.enableLink,
        resetLink: reset,
        enablePublicUrl: this.enablePublicUrl,
        requireAcceptance: this.requireAcceptance
      })
      .then((response: TenantJoinSettingsDto) => {
        this.tenantJoinSettings = response;
        this.enableLink = this.tenantJoinSettings.linkActive;
        this.enablePublicUrl = this.tenantJoinSettings.publicUrl;
        this.requireAcceptance = this.tenantJoinSettings.requireAcceptance;
      });
  }

  changeLinkSettings(e) {
    this.updateTenantJoinSettings();
  }
  copyInviteLink() {
    if (this.maxNumberOfUsersReached) {
      this.$refs.confirmUpgrade.show(
        this.$t("settings.tenant.members.maxNumberOfUsers") +
          " (" +
          this.maxNumberOfUsers +
          "). " +
          this.$t("shared.upgrade?")
      );
    } else {
      // @ts-ignore
      this.$clipboard(this.urlLink);
      this.copiedUrlLink = true;
    }
  }
  yesUpdateSubscription() {
    this.$router.push({ name: "settings.tenant.subscription" });
  }
  getUserRole(item: TenantUserDto) {
    return this.$t("settings.profile.roles." + TenantUserRole[item.role]);
  }
  getUserJoined(item: TenantUserDto) {
    if (
      item.status === TenantUserStatus.ACTIVE &&
      item.joined !== TenantUserJoined.CREATOR
    ) {
      return this.$t(
        "settings.profile.joined." + TenantUserJoined[item.joined]
      );
    }
  }
  getUserStatus(item: TenantUserDto) {
    return this.$t("settings.profile.status." + TenantUserStatus[item.status]);
  }
  getUserRoleClass(item: TenantUserDto) {
    switch (item.role as TenantUserRole) {
      case TenantUserRole.OWNER:
        return "bg-blueGray-50 text-gray-800 border border-blueGray-300";
      case TenantUserRole.ADMIN:
        return "bg-rose-50 border border-rose-200";
      case TenantUserRole.MEMBER:
        return "bg-blue-50 border border-blue-200";
      case TenantUserRole.GUEST:
        return "bg-gray-50 border border-gray-200";
    }
  }
  getUserJoinedClass(item: TenantUserDto) {
    if (item.status === TenantUserStatus.ACTIVE) {
      switch (item.joined as TenantUserJoined) {
        case TenantUserJoined.CREATOR:
          return "bg-gray-800 text-gray-100";
        case TenantUserJoined.JOINED_BY_INVITATION:
          return "bg-blue-50 border border-blue-200";
        case TenantUserJoined.JOINED_BY_LINK:
          return "bg-teal-50 border border-teal-200";
        case TenantUserJoined.JOINED_BY_PUBLIC_URL:
          return "bg-orange-50 border border-orange-200";
      }
    }
  }
  getUserStatusClass(item: TenantUserDto) {
    switch (item.status as TenantUserStatus) {
      case TenantUserStatus.PENDING_INVITATION:
        return "bg-yellow-50 border border-yellow-300";
      case TenantUserStatus.PENDING_ACCEPTANCE:
        return "bg-yellow-50 border border-yellow-300";
      case TenantUserStatus.ACTIVE:
        return "bg-teal-50 border border-teal-200";
      case TenantUserStatus.INACTIVE:
        return "bg-red-50 border border-red-300";
    }
  }
  pendingAcceptance(item: TenantUserDto) {
    return item.status === TenantUserStatus.PENDING_ACCEPTANCE;
  }
  yesAcceptUser() {
    if (this.isOwnerOrAdmin && this.acceptedUser) {
      this.services.tenantUserInvitations
        .acceptUser(this.acceptedUser)
        .then(() => {
          this.reload();
        })
        .catch(error => {
          this.$refs.errorModal.show(error);
        });
    }
  }
  acceptUser(item: TenantUserDto, accept: boolean) {
    item.accepted = accept;
    this.acceptedUser = item;
    this.$refs.confirmarAcceptUser.show(
      this.$t("shared.accept?", [item.email]).toString(),
      this.$t("shared.accept").toString(),
      this.$t("shared.cancel").toString()
    );
  }
  get maxNumberOfUsers(): number {
    if (this.isAdmin) {
      return 0;
    }
    return this.activeProduct &&
      this.activeProduct.subscriptionProduct &&
      this.activeProduct.subscriptionProduct.maxUsers
      ? this.activeProduct.subscriptionProduct.maxUsers
      : 1;
  }
  get maxNumberOfUsersReached() {
    if (
      this.maxNumberOfUsers > 0 &&
      this.memberCount >= this.maxNumberOfUsers
    ) {
      return true;
    }
    return false;
  }

  get urlLink() {
    if (this.tenantJoinSettings) {
      return location.origin + "/join/" + this.tenantJoinSettings.link;
    }
  }
  get orderedItems() {
    if (!this.items) {
      return [];
    }
    const items = this.items.sort((x, y) => {
      return x.role > y.role ? -1 : 1;
    });
    return items.sort((x, y) => {
      return x.status > y.status ? -1 : 1;
    });
  }
}
</script>
