<template>
  <side-modal
    class="z-50"
    size="lg"
    paddingContent=""
    paddingY=""
    v-on:close="close"
  >
    <template v-slot:content>
      <div v-if="loading">
        <div class="bg-white rounded-sm border-t border-gray-300 pb-16">
          <div>
            <div class="bg-gray-100">
              <div class="h-auto w-full flex justify-center py-16">
                <div
                  class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"
                ></div>
              </div>
            </div>
            <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                <div class="flex">
                  <div
                    class="bg-gray-100 border border-gray-200 flex-shrink-0 rounded-sm p-3 h-16 w-16 ring-4 ring-white sm:h-16 sm:w-16"
                  ></div>
                </div>
                <div
                  class="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1"
                >
                  <div
                    class="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-2"
                  >
                    <div
                      class="inline-flex justify-center px-4 py-2 text-sm font-medium rounded-sm text-gray-800"
                    >
                      <span class="invisible">.</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-between 2xl:hidden mt-4 min-w-0 flex-1">
                <h1 class="text-lg font-bold text-gray-900 truncate">
                  {{ $t("shared.loading") }}...
                </h1>
              </div>
              <div class="mt-2">
                <p class="text-sm font-medium text-gray-500"></p>
                <div class="w-full mx-auto">
                  <div class="animate-pulse flex space-x-0">
                    <div class="flex-1 space-y-4 py-1">
                      <div class="h-3 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tabs -->
          <div class="mt-6 sm:mt-2 2xl:mt-5">
            <div class="border-gray-200"></div>
          </div>

          <!-- Description list -->
          <div class="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <dl class="grid grid-cols-4 gap-x-4 gap-y-6">
              <div class="col-span-2 md:col-span-2">
                <dt class="text-xs font-medium text-gray-500">
                  {{ $t("models.ticket.taxId") }}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 md:truncate">
                  <div class="animate-pulse flex space-x-0">
                    <div class="flex-1 space-y-4 py-1">
                      <div class="h-3 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                </dd>
              </div>
              <div class="col-span-2 md:col-span-2">
                <dt class="text-xs font-medium text-gray-500">
                  {{ $t("models.ticket.legalName") }}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 md:truncate">
                  <div class="animate-pulse flex space-x-0">
                    <div class="flex-1 space-y-4 py-1">
                      <div class="h-3 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                </dd>
              </div>
              <div class="col-span-2 md:col-span-2">
                <dt class="text-xs font-medium text-gray-500">
                  {{ $t("models.ticket.cfdiUse") }}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 md:truncate">
                  <div class="animate-pulse flex space-x-0">
                    <div class="flex-1 space-y-4 py-1">
                      <div class="h-3 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                </dd>
              </div>

              <div class="col-span-2 md:col-span-2">
                <dt class="text-xs font-medium text-gray-500">
                  {{ $t("models.cfdi.receiverName") }}
                </dt>
                <dd class="mt-1 text-sm text-gray-600 truncate">
                  <div class="animate-pulse flex space-x-0">
                    <div class="flex-1 space-y-4 py-1">
                      <div class="h-3 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <div
        v-else-if="!ticket || !ticket.id"
        class="flex justify-center pt-32 font-bold text-md"
      >
        {{ $t("shared.invalid") }}
      </div>
      <div v-else>
        <div class="bg-white rounded-sm pb-4">
          <div class="pb-3">
            <button
              type="button"
              @click="imageFullSize = !imageFullSize"
              class="bg-gray-100 focus:outline-none w-full"
            >
              <transition
                enter-active-class="transition ease-in-out duration-300 transform"
                enter-class="-translate-y-full"
                enter-to-class="translate-y-0"
                leave-active-class="transition ease-in-out duration-300 transform"
                leave-class="translate-y-0"
                leave-to-class="-translate-y-full"
              >
                <img
                  class="w-full object-cover"
                  :class="{
                    'h-32 lg:h-48': !imageFullSize,
                    'h-auto': imageFullSize
                  }"
                  :src="ticket.image"
                  alt="Ticket"
                />
              </transition>
            </button>
            <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                <div class="flex">
                  <div
                    class="flex-shrink-0 rounded-sm p-3 h-16 w-16 ring-4 ring-white sm:h-16 sm:w-16"
                    :class="{
                      'bg-yellow-50 border border-yellow-200':
                        transactionType === -1,
                      'bg-teal-50 border border-teal-200':
                        transactionType === 0,
                      'bg-rose-100 border border-rose-200':
                        transactionType === 1
                    }"
                  >
                    <svg
                      v-if="transactionType === -1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                      aria-hidden="true"
                      class="h-9 w-9 text-yellow-700"
                      :class="{
                        'text-teal-700': ticket.status === 2
                      }"
                    >
                      <path
                        d="M401.095 38.851L348.683 8.648 296.27 38.851 243.858 8.648 191.445 38.85 124.021 0v402.609h-80.54v54.11C43.481 487.202 68.28 512 98.763 512h314.475c30.482 0 55.282-24.798 55.282-55.281V0l-67.425 38.851zM98.763 481.978c-13.928 0-25.26-11.33-25.26-25.259v-24.088h284.453v24.088a54.966 54.966 0 006.115 25.259H98.763zm314.474 0c-13.927 0-25.259-11.33-25.259-25.259v-54.11H154.043V51.948l37.401 21.551 52.413-30.2 52.413 30.2 52.413-30.201 52.413 30.201 37.402-21.551v404.771c-.001 13.929-11.332 25.259-25.261 25.259z"
                      />
                      <path
                        d="M184.066 135.49h224.405v30.022H184.066zM184.066 192.742h224.405v30.022H184.066zM184.066 249.994h112.203v30.022H184.066z"
                      />
                    </svg>
                    <svg
                      v-if="transactionType === 1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                      class="h-9 w-9 text-red-700"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>

                    <svg
                      v-if="transactionType === 0"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                      class="h-9 w-9 text-teal-700"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                  </div>
                </div>
                <div
                  class="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1"
                >
                  <div
                    class="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-2"
                  >
                    <button
                      v-if="cfdi && hasFile('xml')"
                      @click="downloadCfdi('xml')"
                      type="button"
                      class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <svg
                        class="-ml-1 mr-2 h-5 w-5 text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span>XML</span>
                    </button>
                    <button
                      v-if="cfdi && hasFile('pdf')"
                      @click="downloadCfdi('pdf')"
                      type="button"
                      class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <svg
                        class="-ml-1 mr-2 h-5 w-5 text-red-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span>PDF</span>
                    </button>

                    <dropdown-simple ref="dropdownOptions" size="sm">
                      <template v-slot:icon>
                        <svg
                          class="h-5 w-5 hidden sm:block"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                          />
                        </svg>
                        <span class="block sm:hidden">{{
                          $t("shared.actions")
                        }}</span>
                      </template>
                      <template v-slot:items>
                        <div class="py-1">
                          <button
                            type="button"
                            @click="reload"
                            class="text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                            role="menuitem"
                          >
                            {{ $t("shared.reload") }}
                          </button>
                        </div>
                        <div class="py-1">
                          <a
                            :download="getTicketFileName()"
                            :href="ticket.image"
                            class="text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                            role="menuitem"
                          >
                            {{ $t("shared.download") }}
                            {{
                              $t("shared.image")
                                .toString()
                                .toLowerCase()
                            }}
                          </a>
                        </div>
                        <div class="py-1 border-gray-100">
                          <button
                            :disabled="!canDelete"
                            type="button"
                            @click="showEdit"
                            class="text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                            role="edit"
                            :class="{
                              'text-gray-300 cursor-not-allowed': !canDelete
                            }"
                          >
                            {{ $t("shared.edit") }}
                          </button>
                        </div>
                        <div
                          v-if="
                            isAdmin &&
                              ticket.transactions &&
                              ticket.transactions.length > 0
                          "
                          class="py-1 border-gray-100"
                        >
                          <button
                            :disabled="!canEdit"
                            type="button"
                            @click="updatePdf"
                            class="text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                            role="menuitem"
                            :class="{
                              'text-gray-300 cursor-not-allowed': !canEdit
                            }"
                          >
                            {{ $t("shared.change") }} PDF
                          </button>
                        </div>
                        <div
                          v-if="transactions && transactions.length > 0"
                          class="py-1 border-t border-gray-100"
                        >
                          <button
                            :disabled="!canDelete"
                            type="button"
                            @click="deleteTransaction"
                            class="text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                            role="menuitem"
                            :class="{
                              'text-gray-300 cursor-not-allowed': !canDelete
                            }"
                          >
                            <span v-if="transactions.length > 1">
                              {{ $t("shared.delete") }} ({{
                                transactions.length
                              }}) {{ $t("models.transaction.plural") }}
                            </span>
                            <span v-else>
                              {{ $t("shared.delete") }}
                              {{ $t("models.transaction.object") }}
                            </span>
                          </button>
                        </div>
                        <div class="py-1 border-gray-100">
                          <button
                            :disabled="!canDelete"
                            type="button"
                            @click="deleteTicket"
                            class="text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                            role="menuitem"
                            :class="{
                              'text-gray-300 cursor-not-allowed': !canDelete
                            }"
                          >
                            {{ $t("shared.delete") }}
                          </button>
                        </div>

                        <div
                          v-if="isAdmin && ticket.status <= 1"
                          class="py-1 border-gray-100"
                        >
                          <button
                            type="button"
                            @click="reportError"
                            class="text-left block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                            role="menuitem"
                          >
                            [Admin] {{ $t("shared.error") }}
                          </button>
                        </div>
                        <div
                          v-if="isAdmin && !ticket.possibleValues"
                          class="py-1 border-gray-100"
                        >
                          <button
                            type="button"
                            @click="scan"
                            class="text-left block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                            role="menuitem"
                          >
                            [Admin] {{ $t("app.tickets.scan") }}
                          </button>
                        </div>
                      </template>
                    </dropdown-simple>
                  </div>
                </div>
              </div>
              <div class="flex justify-between mt-4 min-w-0 flex-1">
                <h1 class="text-lg font-bold text-gray-900 truncate">
                  <span class="flex items-center space-x-2">
                    <span class="">Ticket #{{ ticket.number }}</span>
                    <span
                      v-if="ticket.status === 0"
                      class="font-normal text-gray-600"
                      >{{
                        $t("app.tickets.status.PENDING")
                          .toString()
                          .toLowerCase()
                      }}</span
                    >
                    <span
                      v-if="ticket.status === 1"
                      class="font-normal text-gray-600"
                      >{{
                        $t("app.tickets.status.REQUESTED")
                          .toString()
                          .toLowerCase()
                      }}</span
                    >
                    <span
                      v-if="ticket.status === 2"
                      class="font-normal text-gray-600"
                      >{{
                        $t("app.tickets.status.INVOICED")
                          .toString()
                          .toLowerCase()
                      }}</span
                    >
                    <span
                      v-if="ticket.status === 3"
                      class="font-normal text-gray-600"
                      >{{
                        $t("app.tickets.status.DUPLICATED")
                          .toString()
                          .toLowerCase()
                      }}</span
                    >
                    <span
                      v-if="ticket.status === 4"
                      class="font-normal text-gray-600"
                      >{{
                        $t("app.tickets.status.UNREADABLE")
                          .toString()
                          .toLowerCase()
                      }}</span
                    >
                    <span
                      v-if="ticket.status === 5"
                      class="font-normal text-gray-600"
                      >{{
                        $t("app.tickets.status.EXPIRED")
                          .toString()
                          .toLowerCase()
                      }}</span
                    >
                    <span
                      v-if="ticket.status === 6"
                      class="font-normal text-gray-600"
                      >{{
                        $t("app.tickets.status.INVALID")
                          .toString()
                          .toLowerCase()
                      }}</span
                    >

                    <svg
                      v-if="ticket.status <= 1"
                      class="h-5 text-yellow-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <svg
                      v-if="ticket.status === 2"
                      class="h-5 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                    <svg
                      v-if="ticket.status >= 3"
                      class="h-5 text-yellow-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                </h1>
              </div>
              <div class="mt-2">
                <p class="text-sm font-medium text-gray-500">
                  <span class="text-gray-900 font-bold">{{
                    createdByUserName()
                  }}</span>
                  {{
                    $t("shared.uploaded")
                      .toString()
                      .toLowerCase()
                  }}
                  {{
                    $t("models.ticket.object")
                      .toString()
                      .toLowerCase()
                  }}
                  <span v-if="ticket.workspace">
                    <span
                      v-if="ticket.workspace.name || ticket.workspace.legalName"
                      >{{ $t("shared.for") }}</span
                    >
                    <span
                      class="text-gray-900 font-bold"
                      v-if="ticket.workspace.name"
                    >
                      {{ ticket.workspace.name }}</span
                    >
                    <span
                      class="text-gray-900 font-bold"
                      v-else-if="ticket.workspace.legalName"
                    >
                      {{ ticket.workspace.legalName }}</span
                    >
                  </span>
                  <time :datetime="ticket.createdAt | dateYMD">
                    {{ ticket.createdAt | dateAgo("minute") }}
                  </time>
                </p>
                <p
                  v-if="transactionType != -1 && false"
                  class="text-sm font-medium text-gray-500 pt-2"
                >
                  {{ $t("app.tickets.status.INVOICED") }} {{ $t("shared.as") }}
                  <span
                    v-if="transactionType === 0"
                    class="bg-teal-50 border border-teal-200 px-2 py-1 text-teal-900"
                    >{{
                      $t("app.transactions.incomeSingular")
                        .toString()
                        .toLowerCase()
                    }}</span
                  >
                  <span
                    v-else-if="transactionType === 1"
                    class="bg-rose-50 border border-rose-200 px-2 py-1 text-rose-900"
                    >{{
                      $t("app.transactions.expenseSingular")
                        .toString()
                        .toLowerCase()
                    }}</span
                  >
                </p>
              </div>
            </div>
          </div>

          <div class="mt-6 sm:mt-2 2xl:mt-5">
            <div class="border-gray-200"></div>
          </div>

          <div class="relative">
            <div class="relative flex justify-start">
              <span
                v-if="ticket.status > 2"
                class="px-3 bg-white font-bold text-gray-800 text-xs flex items-center space-x-2"
              >
                <div>{{ $t("shared.error") }}:</div>
                <div class="font-normal">{{ ticket.errorDescription }}</div>
              </span>
              <span
                v-else-if="
                  ticket.transactions && ticket.transactions.length > 0
                "
                class="px-3 bg-white font-bold text-gray-800 text-xs"
              >
                {{ $t("models.transaction.object") }}
              </span>
              <span
                v-else-if="isAdmin"
                class="px-3 bg-white font-bold text-gray-800 text-xs"
              >
                {{ $t("shared.upload") }} {{ $t("models.cfdi.object") }}
              </span>
            </div>
          </div>

          <div class="mt-4 max-w-5xl mx-auto px-4 pb-4 sm:px-6 lg:px-8">
            <div class="border-gray-200"></div>
            <div
              v-if="ticket.transactions && ticket.transactions.length > 0"
              class=" "
            >
              <div
                v-for="(transaction, index) in ticket.transactions"
                :key="index"
                class="mt-1 text-sm text-gray-900"
              >
                <div
                  v-if="ticket.transactions && ticket.transactions.length > 1"
                >
                  {{ $t("models.transaction.object") }} {{ index + 1 }}
                </div>
                <div
                  v-for="(detail, idxDetail) in transaction.details"
                  :key="idxDetail"
                >
                  <div
                    v-if="
                      idxDetail <= showTransactions - 1 || seeMoreTransactions
                    "
                  >
                    <span
                      v-if="detail.category"
                      class="select-all truncate border rounded-sm px-0.5 text-gray-800 text-xs items-center"
                      :class="
                        transactionType === 0
                          ? 'bg-gray-50 border-gray-200'
                          : 'bg-gray-50 border-gray-200'
                      "
                    >
                      {{ detail.category }}
                    </span>
                    <div
                      class="flex items-center justify-between mt-1 border-gray-300 pb-0.5 text-gray-500"
                    >
                      <div v-if="detail.description" class="select-all">
                        {{ detail.description }}
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="
                      idxDetail <= showTransactions - 1 || seeMoreTransactions
                    "
                    class="flex items-center justify-between border-b border-dotted border-gray-300 pb-0.5"
                  >
                    <div class="truncate">
                      <span class="font-medium"
                        >${{ detail.price | decimalFormat }}</span
                      >
                      x
                      <span class="font-medium italic">{{
                        detail.quantity
                      }}</span>
                    </div>
                    <div>${{ detail.subtotal | decimalFormat }}</div>
                  </div>
                  <div
                    v-if="
                      idxDetail === showTransactions - 1 &&
                        !seeMoreTransactions &&
                        transaction.details.length > showTransactions
                    "
                    class="flex justify-end pt-4"
                  >
                    <button
                      type="button"
                      class="focus:outline-none text-indigo-600 hover:text-indigo-800"
                      @click="seeMoreTransactions = true"
                    >
                      {{ $t("shared.view") }} ({{
                        transaction.details.length - showTransactions
                      }}) {{ $t("shared.more") }}...
                    </button>
                  </div>
                </div>
                <div
                  class="flex items-center justify-between mt-4 border-b border-dotted border-gray-300 pb-0.5 font-bold text-xs"
                >
                  <div class="truncate">
                    {{ $t("models.transaction.subtotal") }}
                  </div>
                  <div>${{ transaction.subtotal | decimalFormat }}</div>
                </div>
                <div
                  class="flex items-center justify-between mt-1 border-b border-dotted border-gray-300 pb-0.5 font-bold text-xs"
                >
                  <div class="truncate">
                    {{ $t("models.transaction.discount") }}
                  </div>
                  <div>${{ transaction.discount | decimalFormat }}</div>
                </div>
                <div
                  class="flex items-center justify-between mt-1 border-b border-dotted border-gray-300 pb-0.5 font-bold text-xs"
                >
                  <div class="truncate">
                    {{ $t("models.transaction.taxes") }}
                  </div>
                  <div>${{ transaction.taxes | decimalFormat }}</div>
                </div>
                <div
                  class="flex items-center justify-between mt-1 border-b border-dotted border-gray-300 pb-0.5 font-bold text-xs"
                >
                  <div class="truncate">
                    {{ $t("models.transaction.total") }}
                  </div>
                  <div>${{ transaction.total | decimalFormat }}</div>
                </div>
              </div>
            </div>
            <div v-else class="space-y-2">
              <drop-images
                v-if="ticket.status <= 1"
                ref="dropCfdi"
                v-on:droppedFiles="droppedFiles"
                accept=".pdf,.xml"
                :title="$t('app.cfdis.dragXmlAndPdf')"
              ></drop-images>

              <div v-if="ticket.status === 4" class="space-y-1">
                <drop-images
                  ref="dropNewImage"
                  class="bg-rose-50"
                  v-on:droppedFiles="droppedNewImage"
                  accept="image/*"
                  title="Cambia la foto del ticket"
                ></drop-images>
              </div>
            </div>
          </div>

          <div v-if="ticket.status <= 2">
            <div class="relative">
              <div
                class="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div class="w-full border-t border-blueGray-200"></div>
              </div>
              <div class="relative flex justify-start">
                <span class="px-3 bg-white font-bold text-gray-800 text-xs">
                  {{ $t("shared.details") }}
                </span>
              </div>
            </div>

            <div class="py-4 pb-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <dl
                v-if="ticket.workspace"
                class="col-span-2 grid grid-cols-2 gap-x-4 gap-y-3"
              >
                <div class="col-span-2 md:col-span-1">
                  <dt class="text-xs font-medium text-gray-400">
                    {{ $t("models.project.object") }}
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 md:truncate select-all">
                    <span v-if="!ticket.project" class="text-gray-400">{{
                      $t("shared.undefined")
                    }}</span>
                    <span v-else class="flex items-center space-x-1">
                      <div
                        class="h-2 w-2 rounded-full"
                        :class="projectColor()"
                      ></div>
                      <div>
                        {{ ticket.project.name }}
                      </div></span
                    >
                  </dd>
                </div>
                <div class="col-span-1 md:col-span-1">
                  <dt class="text-xs font-medium text-gray-400">
                    {{ $t("models.ticket.taxId") }}
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 md:truncate select-all">
                    {{ ticket.taxId }}
                  </dd>
                </div>
                <div class="col-span-1 md:col-span-1">
                  <dt class="text-xs font-medium text-gray-400">
                    {{ $t("models.ticket.cfdiUse") }}
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 md:truncate select-all">
                    {{ ticket.cfdiUse }}
                  </dd>
                </div>
                <div class="col-span-1 md:col-span-2">
                  <dt class="text-xs font-medium text-gray-400">
                    {{ $t("models.ticket.legalName") }}
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 md:truncate select-all">
                    {{ ticket.legalName }}
                  </dd>
                </div>
                <div class="col-span-1 md:col-span-1">
                  <dt class="text-xs font-medium text-gray-400">
                    {{ $t("shared.address") }}
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 md:truncate select-all">
                    {{ address }}
                  </dd>
                </div>
                <div class="col-span-1 md:col-span-1">
                  <dt class="text-xs font-medium text-gray-400">
                    {{ $t("models.workspace.addressNeighborhood") }}
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 md:truncate select-all">
                    {{ `${ticket.workspace.addressNeighborhood}` }}
                  </dd>
                </div>
                <div class="col-span-1 md:col-span-1">
                  <dt class="text-xs font-medium text-gray-400">
                    {{ $t("models.workspace.addressZip") }}
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 md:truncate select-all">
                    {{ `${ticket.workspace.addressZip}` }}
                  </dd>
                </div>
                <div class="col-span-1 md:col-span-1">
                  <dt class="text-xs font-medium text-gray-400">
                    {{ $t("models.workspace.addressCity") }}
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 md:truncate select-all">
                    {{ `${ticket.workspace.addressCity}` }}
                  </dd>
                </div>
                <div class="col-span-1 md:col-span-1">
                  <dt class="text-xs font-medium text-gray-400">
                    {{ $t("models.workspace.addressState") }}
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 md:truncate select-all">
                    {{
                      `${ticket.workspace.addressState} ${ticket.workspace.addressCountry}`
                    }}
                  </dd>
                </div>
                <div class="col-span-1 md:col-span-1">
                  <dt class="text-xs font-medium text-gray-400">
                    {{ $t("shared.comments") }}
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 md:truncate select-all">
                    <span v-if="!ticket.comments" class="text-gray-400"
                      >--</span
                    >
                    <span v-else>{{ ticket.comments }}</span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div v-if="cfdi" class="relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-blueGray-200"></div>
            </div>
            <div class="relative flex justify-start">
              <span class="px-3 bg-white font-bold text-gray-800 text-xs">
                {{ $t("models.cfdi.issuerName") }}
              </span>
            </div>
          </div>

          <div class="bg-white">
            <div class="border-gray-200"></div>
            <div
              v-if="cfdi"
              class="py-4 pb-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
            >
              <div class="grid grid-cols-4">
                <dl class="col-span-4 grid grid-cols-1 gap-x-4 gap-y-3">
                  <div class="col-span-1">
                    <dt class="text-xs font-medium text-gray-400">
                      {{ $t("models.cfdi.taxId") }}
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 md:truncate">
                      <span v-if="!cfdi || !cfdi.emisorRfc"> ... </span>
                      <span v-else>
                        {{ cfdi.emisorRfc }}
                      </span>
                    </dd>
                  </div>
                  <div class="col-span-1">
                    <dt class="text-xs font-medium text-gray-400">
                      {{ $t("models.cfdi.legalName") }}
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 md:truncate">
                      <span v-if="!cfdi || !cfdi.emisorNombre"> ... </span>
                      <span v-else>
                        {{ cfdi.emisorNombre }}
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <div>
            <div v-if="ticket.possibleValues">
              <div class="relative">
                <div
                  class="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div class="w-full border-t border-blueGray-200"></div>
                </div>
                <div class="relative flex justify-start">
                  <span class="px-3 bg-white font-bold text-gray-800 text-xs">
                    {{ $t("app.tickets.ticketScanned") }}
                  </span>
                </div>
              </div>

              <div
                v-if="ticket.possibleValues"
                class="mt-4 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
              >
                <div class="border-gray-200"></div>
                <div class="space-y-2">
                  <div v-for="(field, idx) in fields" :key="idx">
                    <div class="grid grid-cols-3 py-1 text-sm items-center">
                      <div class="font-normal">
                        {{ $t("app.tickets.possibleValues." + field) }}
                      </div>
                      <div
                        v-if="ticket.possibleValues"
                        class="space-y-1 col-span-2"
                      >
                        <div
                          class="w-full"
                          v-for="(possibleValue, idx) in ticket.possibleValues[
                            field
                          ]"
                          :key="idx"
                        >
                          <a
                            v-if="isWebsite(possibleValue)"
                            :href="possibleValue"
                            target="_blank"
                            class="underline text-blue-600 hover:text-blue-800"
                            >{{ possibleValue }}</a
                          >
                          <input
                            v-else
                            readonly
                            :value="possibleValue"
                            @focus="$event.target.select()"
                            class="w-full h-7 bg-blueGray-50 p-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="relative">
                <div
                  class="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div class="w-full border-t border-blueGray-200"></div>
                </div>
                <div class="relative flex justify-start">
                  <span class="px-3 bg-white font-bold text-gray-800 text-xs">
                    {{ $t("shared.lines") }}
                  </span>
                </div>
              </div>
              <div
                v-if="ticket.scannedLines"
                class="mt-0 max-w-5xl mx-auto px-4 pb-12 sm:px-6 lg:px-8 pt-4"
              >
                <textarea
                  class="w-full h-96"
                  v-text="ticket.scannedLines.join('\n')"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <new-modal maxSize="sm:max-w-lg" ref="reportErrorModal">
        <div class="bg-white">
          <div class="space-y-1">
            <drop-images
              ref="dropError"
              class="bg-rose-50"
              v-on:droppedFiles="droppedErrors"
              title="Arrastra la evidencia del error"
            ></drop-images>
            <div class="grid grid-cols-5 gap-1">
              <div class="col-span-5 mb-2">
                <label
                  for="error-type"
                  class="block text-sm font-medium leading-5 text-gray-700"
                  >{{ $t("app.tickets.uploadErrors.type") }}</label
                >
                <div class="rounded-sm mt-1">
                  <select
                    v-model="errorType"
                    required
                    id="error-type"
                    class="text-xs h-10 appearance-none rounded-none relative block w-full px-2 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 text-sm"
                  >
                    <option
                      v-for="(type, idx) in errorTypes"
                      :key="idx"
                      :value="type"
                      :selected="type === errorType"
                    >
                      {{ type }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-span-3">
                <input
                  v-if="errorType === 'Otro'"
                  class="text-xs h-10 appearance-none rounded-none relative block w-full px-2 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                  v-model="errorDescription"
                  placeholder="Descripción del error"
                />
              </div>
              <div class="col-span-2">
                <button
                  @click="uploadError"
                  class="justify-center truncate w-full h-10 inline-flex items-center px-4 py-2 text-xs leading-5 font-medium rounded-sm text-red-800 bg-rose-50 border border-rose-200 hover:text-red-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-theme-900 active:bg-gray-50 active:text-theme-900 transition duration-150 ease-in-out"
                >
                  {{ $t("shared.report") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </new-modal>

      <new-modal maxSize="sm:max-w-md" ref="uploadPdfModal">
        <div class="bg-white">
          <div>
            <drop-images
              v-if="showDropImagesPdf"
              :title="$t('app.cfdis.dragNewPdf')"
              ref="dropImagesPdf"
              v-on:droppedFiles="droppedPdf"
              :accept="'.pdf'"
            ></drop-images>
          </div>
        </div>
      </new-modal>

      <new-modal maxSize="sm:max-w-md" ref="uploadXmlAndPdfModal">
        <div class="bg-white">
          <div>
            <div class="grid grid-cols-3 gap-2">
              <div class="col-span-3">
                <input
                  class="text-xs h-8 appearance-none rounded-none relative block w-full px-2 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                  v-model="invoicedWithWebsite"
                  :placeholder="$t('shared.website')"
                />
              </div>
              <div class="col-span-3">
                <input
                  class="text-xs h-8 appearance-none rounded-none relative block w-full px-2 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                  v-model="invoicedWithEmail"
                  :placeholder="$t('account.shared.email')"
                />
              </div>
              <div class="col-span-3">
                <input
                  class="text-xs h-8 appearance-none rounded-none relative block w-full px-2 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                  v-model="invoicedWithPhone"
                  :placeholder="$t('shared.phone')"
                />
              </div>
              <div class="col-span-3">
                <input
                  class="text-xs h-8 appearance-none rounded-none relative block w-full px-2 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                  v-model="invoicedComments"
                  :placeholder="$t('shared.comments')"
                />
              </div>
              <div class="col-span-2"></div>
              <div class="col-span-1">
                <button
                  @click="confirmUploadXmlAndPdf"
                  class="justify-center truncate w-full h-8 inline-flex items-center px-4 py-2 text-xs leading-5 font-medium rounded-sm text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-theme-900 active:bg-gray-50 active:text-theme-900 transition duration-150 ease-in-out"
                >
                  {{ $t("shared.confirm") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </new-modal>

      <new-modal maxSize="sm:max-w-lg z-50" ref="editModal">
        <div class="bg-white">
          <div v-if="loadingRfcs || loadingEdit || loadingProjects">
            <div class="h-auto w-full flex justify-center py-16">
              <div
                class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"
              ></div>
            </div>
          </div>
          <div v-else>
            <div class="grid sm:grid-cols-5 gap-2 py-4 px-6 items-center">
              <label
                class="col-span-5 w-full font-extrabold text-sm flex justify-between"
                >{{ $t("shared.edit") }}
                {{
                  $t("models.ticket.object")
                    .toString()
                    .toLowerCase()
                }}
                #{{ ticket.number }}</label
              >

              <label
                for="project"
                class="col-span-2 w-full font-bold text-xs"
                >{{ $t("models.project.object") }}</label
              >
              <select
                :disabled="!anyProjects"
                id="project"
                v-model="ticket.projectId"
                class="col-span-3 w-full bg-white pl-3 pr-10 py-2 text-base border border-gray-300 sm:text-xs h-full focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                :class="{
                  'bg-gray-200 cursor-not-allowed': !anyProjects,
                  'bg-white': anyProjects
                }"
                @change="edit"
              >
                <option value=""
                  >-- {{ $t("app.shared.selectors.notSelected") }} --</option
                >
                <option
                  v-for="(project, idxProject) in projects"
                  :key="idxProject"
                  :value="project.id"
                >
                  {{ `${project.name}` }}
                </option>
              </select>
              <label
                for="workspace"
                class="col-span-2 w-full font-bold text-xs"
                >{{ $t("app.tickets.selectTaxId") }}</label
              >
              <select
                id="workspace"
                v-model="ticket.taxId"
                class="col-span-3 w-full bg-white pl-3 pr-10 py-2 text-base border border-gray-300 sm:text-xs h-full focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                @change="edit"
              >
                <option
                  v-for="(workspace, idxWorkspace) in workspaces"
                  :key="idxWorkspace"
                  :value="workspace.taxId"
                >
                  {{ `${workspace.taxId} - ${workspace.legalName}` }}
                </option>
              </select>

              <label
                for="cfdi-use"
                class="col-span-2 w-full font-bold text-xs"
                >{{ $t("app.tickets.selectCfdiUse") }}</label
              >
              <select
                id="cfdi-use"
                v-model="ticket.cfdiUse"
                class="col-span-3 w-full bg-white pl-3 pr-10 py-2 text-base border border-gray-300 sm:text-xs h-full focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                @change="edit"
              >
                <option
                  v-for="(uso, idxUse) in cfdiUses"
                  :key="idxUse"
                  :value="uso.key"
                >
                  {{ `${uso.name}` }}
                </option>
              </select>

              <label
                v-if="isAdmin"
                for="status"
                class="col-span-2 w-full font-bold text-xs"
                >{{ $t("models.ticket.status") }}</label
              >
              <select
                id="status"
                v-model="ticket.status"
                class="col-span-3 w-full bg-white pl-3 pr-10 py-2 text-base border border-gray-300 sm:text-xs h-full focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                @change="edit"
              >
                <option
                  v-for="(status, idxStatus) in arrStatus"
                  :key="idxStatus"
                  :value="status.key"
                >
                  {{ `${status.name}` }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </new-modal>

      <new-error-modal ref="errorModal"></new-error-modal>

      <success-modal
        ref="successUploadCfdiModal"
        v-on:closed="reload"
      ></success-modal>

      <confirm-modal
        ref="confirmDelete"
        v-on:yes="confirmDelete"
      ></confirm-modal>
      <confirm-modal
        ref="confirmDeleteTransaction"
        v-on:yes="confirmDeleteTransaction"
      ></confirm-modal>
      <confirm-modal
        ref="confirmReportErrorModal"
        v-on:yes="confirmReportError"
      ></confirm-modal>
    </template>
  </side-modal>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "@/components/shared/BaseComponent.vue";
import TableRowSkeleton from "@/components/shared/skeletons/TableRowSkeleton.vue";
import { mapGetters } from "vuex";
import { CfdiDto } from "@/application/dtos/app/cfdis/CfdiDto";
import NewErrorModal from "@/components/shared/modals/NewErrorModal.vue";
import DropdownSimple from "@/components/shared/dropdowns/DropdownSimple.vue";
import ConfirmModal from "@/components/shared/modals/ConfirmModal.vue";
import ConfirmModalComponent from "@/components/shared/modals/ConfirmModal.vue";
import DropImages from "@/components/app/uploads/DropImages.vue";
import { FileBase64 } from "@/application/shared/files/FileBase64";
import NewModal from "../../../components/shared/modals/NewModal.vue";
import SuccessModalComponent from "@/components/shared/modals/SuccessModal.vue";
import SideModal from "../../../components/shared/modals/SideModal.vue";
import { TicketStatus } from "@/application/enums/app/transactions/TicketStatus";
import { TicketDto } from "@/application/dtos/app/transactions/TicketDto";
import { WorkspaceDto } from "@/application/dtos/app/workspaces/WorkspaceDto";
import { ProjectDto } from "@/application/dtos/app/projects/ProjectDto";
import CfdiUses from "@/application/shared/CfdiUses";
import * as projectHelpers from "@/application/modules/projects/ProjectHelpers";
import { TransactionDto } from "@/application/dtos/app/transactions/TransactionDto";
import { TransactionType } from "@/application/enums/app/transactions/TransactionType";
import { filters } from "../../../plugins/filters";

@Component({
  components: {
    TableRowSkeleton,
    NewErrorModal,
    DropdownSimple,
    ConfirmModal,
    DropImages,
    NewModal,
    SideModal
  },
  computed: {
    ...mapGetters("account", {
      isAdmin: "isAdmin"
    })
  }
})
export default class TicketItemDetails extends BaseComponent {
  $refs!: {
    errorModal: NewErrorModal;
    confirmDelete: ConfirmModalComponent;
    confirmDeleteTransaction: ConfirmModalComponent;
    confirmReportErrorModal: ConfirmModalComponent;
    dropdownOptions: DropdownSimple;
    reportErrorModal: NewModal;
    uploadXmlAndPdfModal: NewModal;
    successUploadCfdiModal: SuccessModalComponent;
    uploadPdfModal: NewModal;
    editModal: NewModal;
  };
  private ticket = {} as TicketDto;
  private seeMoreTransactions: boolean = false;
  private showTransactions: number = 8;
  private imageFullSize: boolean = false;
  private isAdmin!: boolean;
  private fields: any[] = [
    "Website",
    "TaxId",
    "Date",
    "Total",
    "Folio",
    "Id",
    "Email"
  ];
  private errorType: string = "";
  private errorDescription: string = "";
  private errorFiles: FormData | undefined = undefined;
  private xmlsAndPdfs: FormData | undefined = undefined;
  private invoicedWithWebsite: string = "";
  private invoicedWithEmail: string = "";
  private invoicedWithPhone: string = "";
  private invoicedComments: string = "";
  private errorTypes: string[] = [
    this.$t("app.tickets.uploadErrors.sameDayOnly").toString(),
    this.$t("app.tickets.uploadErrors.expired").toString(),
    this.$t("app.tickets.uploadErrors.pictureIncomplete").toString(),
    this.$t("app.tickets.uploadErrors.pictureBlurred").toString(),
    this.$t("app.tickets.uploadErrors.duplicated").toString(),
    this.$t("app.tickets.uploadErrors.websiteWithoutInvoicing").toString(),
    this.$t("app.tickets.uploadErrors.websiteNotWorking").toString(),
    this.$t("app.tickets.uploadErrors.websiteAndPhoneNotFound").toString(),
    this.$t("app.tickets.uploadErrors.websiteNotFoundNotPickingUp").toString(),
    this.$t("app.tickets.uploadErrors.other").toString(),
    this.$t("app.tickets.uploadErrors.noXmlNorPdf").toString()
  ];
  private workspaces: WorkspaceDto[] = [];
  private projects: ProjectDto[] = [];
  private loadingRfcs: boolean = false;
  private loadingEdit: boolean = false;
  private showDropImagesPdf: boolean = false;
  private loadingProjects: boolean = false;
  private cfdiUses = CfdiUses;
  private arrStatus: any[] = [
    { key: 0, name: this.$t("app.tickets.status.PENDING") },
    { key: 1, name: this.$t("app.tickets.status.REQUESTED") },
    { key: 2, name: this.$t("app.tickets.status.INVOICED") },
    { key: 3, name: this.$t("app.tickets.status.DUPLICATED") },
    { key: 4, name: this.$t("app.tickets.status.UNREADABLE") },
    { key: 5, name: this.$t("app.tickets.status.EXPIRED") },
    { key: 6, name: this.$t("app.tickets.status.INVALID") }
  ];
  mounted() {
    this.reload();
  }
  reload() {
    this.loading = true;
    this.services.tickets
      .getTicket(this.$route.params.id, this.isAdmin)
      .then((response: TicketDto) => {
        this.ticket = response;
      })
      .catch(error => {
        this.$refs.errorModal.show(this.$t(error));
      })
      .finally(() => {
        this.loading = false;
      });
  }
  close(deleted: boolean = false) {
    this.$emit("closed", 0, this.$route.params.id, deleted);
    if (this.$route.fullPath.includes("/admin")) {
      this.$router.push({ name: "admin.tickets" });
    } else if (this.$route.fullPath.includes("/app")) {
      this.$router.push({ name: "app.tickets" });
    }
  }
  loadWorkspaces() {
    this.workspaces = [];
    this.loadingRfcs = true;
    this.services.workspaces
      .getAllWorkspaces()
      .then((response: WorkspaceDto[]) => {
        this.workspaces = response;
      })
      .catch(error => {
        // ignore
      })
      .finally(() => {
        this.loadingRfcs = false;
      });
  }
  loadProjects() {
    this.projects = [];
    this.loadingProjects = true;
    this.services.projects
      .getAllProjects(false)
      .then((response: ProjectDto[]) => {
        response.forEach(element => {
          this.projects.push(element);
        });
      })
      .catch(error => {
        // ignore
      })
      .finally(() => {
        this.loadingProjects = false;
      });
  }
  createdByUserName() {
    if (this.ticket.createdByUser) {
      return (
        this.ticket.createdByUser.firstName ?? this.ticket.createdByUser.email
      );
    } else {
      return "?";
    }
  }
  avatarText() {
    if (this.ticket && this.ticket.createdByUser) {
      if (
        this.ticket.createdByUser?.firstName &&
        this.ticket.createdByUser?.lastName
      ) {
        return (
          this.ticket.createdByUser?.firstName[0] +
          this.ticket.createdByUser?.lastName[0]
        );
      } else if (this.ticket.createdByUser?.firstName) {
        return this.ticket.createdByUser?.firstName[0];
      }
    } else {
      return "?";
    }
  }
  hasFile(type: any): boolean {
    if (this.ticket?.transactions && this.ticket?.transactions.length > 0) {
      if (this.ticket?.transactions[0].cfdi) {
        if (type === "xml") {
          return this.ticket?.transactions[0].cfdi.tieneXml;
        } else if (type === "pdf") {
          return this.ticket?.transactions[0].cfdi.tienePdf;
        }
      }
    }
    return false;
  }
  projectColor() {
    return projectHelpers.getProjectColor(this.ticket?.project?.color);
  }
  downloadCfdi(type: string) {
    if (!this.cfdi || !this.cfdi.id) {
      this.$refs.errorModal.show("No tiene CFDi");
    } else {
      const cfdiId = this.cfdi.id;
      if (cfdiId) {
        this.services.cfdis
          .download(this.cfdi.id, type)
          .then((response: any) => {
            const contentType: string = response.headers["content-type"];

            const fileUrl = window.URL.createObjectURL(
              new Blob([response.data], { type: contentType })
            );
            const fileLink = document.createElement("a");
            fileLink.href = fileUrl;
            fileLink.setAttribute("download", cfdiId);
            document.body.appendChild(fileLink);
            fileLink.click();
          })
          .catch(error => {
            this.$refs.errorModal.show(this.$t(error));
          });
      }
    }
  }
  deleteTicket() {
    this.$refs.dropdownOptions.close();
    if (this.ticket.status === 2) {
      this.$refs.confirmDelete.show(
        `El ticket #${this.ticket.number} ya fue facturado, ¿delete de todas formas?`
      );
    } else {
      this.$refs.confirmDelete.show(`¿Eliminar ticket #${this.ticket.number}?`);
    }
  }
  confirmDelete() {
    if (this.isAdmin) {
      this.services.tickets
        .adminDelete(this.ticket.id)
        .then(() => {
          this.$emit("deleted");
          this.close(true);
        })
        .catch(error => {
          this.$refs.errorModal.show(this.$t(error));
        });
    } else {
      this.services.tickets
        .delete(this.ticket.id)
        .then(() => {
          this.$emit("deleted");
          this.close(true);
        })
        .catch(error => {
          this.$refs.errorModal.show(this.$t(error));
        });
    }
  }
  deleteTransaction() {
    this.$refs.dropdownOptions.close();
    this.$refs.confirmDeleteTransaction.show(
      `El ticket #${this.ticket.number} ya fue facturado, ¿delete de todas formas?`
    );
  }
  confirmDeleteTransaction() {
    if (this.isAdmin) {
      this.services.transactions
        .adminDelete(this.transactions[0].id)
        .then((response: any) => {
          this.reload();
        })
        .catch(error => {
          this.$refs.errorModal.show(this.$t(error));
        });
    } else {
      this.services.transactions
        .delete(this.transactions[0].id)
        .then((response: any) => {
          this.reload();
        })
        .catch(error => {
          this.$refs.errorModal.show(this.$t(error));
        });
    }
  }
  reportError() {
    this.$refs.reportErrorModal.show();
  }
  showEdit() {
    this.loadWorkspaces();
    this.loadProjects();
    this.$refs.editModal.show();
  }
  edit() {
    this.loadingEdit = true;
    this.services.tickets
      .update(this.ticket.id, this.ticket)
      .then(() => {
        this.$emit("ticket-saved", this.ticket.id);
        this.reload();
      })
      .catch((error: any) => {
        this.$refs.errorModal.show(this.$t(error).toString());
      })
      .finally(() => {
        this.$refs.editModal.close();
        this.loadingEdit = false;
      });
  }
  downloadImage() {
    window.location.href = this.ticket.image;
  }
  updatePdf() {
    this.showDropImagesPdf = true;
    this.$refs.uploadPdfModal.show();
  }
  droppedPdf(files: FileBase64[]) {
    this.showDropImagesPdf = false;
    this.$refs.uploadPdfModal.close();
    this.loading = true;
    if (files.length > 0) {
      const formData: FormData = new FormData();
      files.forEach(fileBase64 => {
        // const blob = this.blobCreationFromURL(fileBase64.base64);
        formData.append(
          fileBase64.file.name,
          fileBase64.file,
          fileBase64.file.name
        );
      });

      this.services.tickets
        .uploadNewPdf(formData, this.ticket)
        .then((response: any) => {
          this.reload();
          this.$refs.successUploadCfdiModal.show("PDF actualizado");
        })
        .catch(error => {
          this.$refs.errorModal.show(this.$t(error));
        });
    }
  }
  scan() {
    this.loading = true;
    this.services.tickets
      .adminReadTicket(this.ticket.id)
      .then(() => {
        this.reload();
      })
      .catch(error => {
        this.$refs.errorModal.show(this.$t(error));
      })
      .finally(() => {
        this.loading = false;
      });
  }
  uploadError() {
    if (
      !this.errorType ||
      (this.errorType ===
        this.$t("app.tickets.uploadErrors.other").toString() &&
        !this.errorDescription)
    ) {
      this.$refs.errorModal.show("Define la descripción del error");
      return;
    }
    this.$refs.confirmReportErrorModal.show(
      this.$t("app.tickets.errors.reportError?").toString(),
      this.$t("shared.report").toString(),
      this.$t("shared.cancel").toString(),
      "El ticket será inválido hasta que el cliente actualice la foto del ticket."
    );
  }
  confirmReportError() {
    this.$refs.reportErrorModal.close();
    if (
      this.errorType !== this.$t("app.tickets.uploadErrors.other").toString()
    ) {
      this.errorDescription = this.errorType;
    }
    this.services.tickets
      .uploadErrorImages(this.ticket, this.errorDescription, this.errorFiles)
      .then(() => {
        this.reload();
      })
      .catch(error => {
        this.$refs.errorModal.show(this.$t(error));
      });
  }
  droppedNewImage(files: FileBase64[]) {
    if (files.length > 0) {
      const formData: FormData = new FormData();
      files.forEach(fileBase64 => {
        formData.append(
          fileBase64.file.name,
          fileBase64.file,
          fileBase64.file.name
        );
      });
      this.errorFiles = formData;

      this.services.tickets
        .uploadNewImage(formData, this.ticket)
        .then(() => {
          this.reload();
        })
        .catch(error => {
          this.$refs.errorModal.show(this.$t(error));
        });
    }
  }
  droppedErrors(files: FileBase64[]) {
    if (files.length > 0) {
      const formData: FormData = new FormData();
      files.forEach(fileBase64 => {
        formData.append(
          fileBase64.file.name,
          fileBase64.file,
          fileBase64.file.name
        );
      });
      this.errorFiles = formData;
    }
  }
  confirmUploadXmlAndPdf() {
    if (!this.xmlsAndPdfs) {
      this.$refs.errorModal.show(
        this.$t("app.tickets.uploadErrors.noXmlNorPdf").toString()
      );
      return;
    }
    this.$refs.uploadXmlAndPdfModal.close();
    this.services.tickets
      .uploadXmlAndPdf(this.xmlsAndPdfs, this.ticket)
      .then(() => {
        this.services.tickets.updateInvoiced(this.ticket.id, {
          status: TicketStatus.INVOICED,
          website: this.invoicedWithWebsite,
          email: this.invoicedWithEmail,
          phone: this.invoicedWithPhone,
          comments: this.invoicedComments
        });
        this.reload();
        this.$refs.successUploadCfdiModal.show(
          this.$t("app.cfdis.uploadSuccess").toString()
        );
      })
      .catch(error => {
        this.$refs.errorModal.show(this.$t(error));
      });
  }
  droppedFiles(files: FileBase64[]) {
    if (files.length > 0) {
      const formData: FormData = new FormData();
      files.forEach(fileBase64 => {
        formData.append(
          fileBase64.file.name,
          fileBase64.file,
          fileBase64.file.name
        );
      });
      this.xmlsAndPdfs = formData;
      if (this.isAdmin) {
        this.$refs.uploadXmlAndPdfModal.show();
      } else {
        this.confirmUploadXmlAndPdf();
      }
    }
  }
  getTicketFileName(): string {
    return `Ticket #${this.ticket.number} - ${
      this.ticket.taxId
    } - ${filters.dateYMDHMS(this.ticket.createdAt)}.png`;
  }
  isWebsite(valor: string) {
    return (
      valor &&
      (valor.includes("http") ||
        valor.includes(".ai") ||
        valor.includes(".com") ||
        valor.includes(".mx") ||
        valor.includes(".org") ||
        (valor.includes(".") && valor.includes("/")))
    );
  }
  get address() {
    if (this.ticket.workspace) {
      return `${this.ticket.workspace.addressStreet} ${this.ticket.workspace
        .addressExterior ?? ""} ${this.ticket.workspace.addressInterior ?? ""}`;
    }
  }
  get canDelete() {
    return this.isAdmin || this.ticket.status === TicketStatus.PENDING;
  }
  get canEdit() {
    return this.ticket.status === TicketStatus.PENDING || this.isAdmin;
  }
  get transactionType() {
    if (this.transactions && this.transactions.length > 0) {
      return this.transactions[0].type;
    } else {
      return -1;
    }
  }
  get type() {
    if (this.transactions && this.transactions.length > 0) {
      return TransactionType[this.transactions[0].type];
    } else {
      return "Ticket;";
    }
  }
  get transactions(): TransactionDto[] {
    if (
      this.ticket &&
      this.ticket.transactions &&
      this.ticket.transactions.length > 0
    ) {
      return this.ticket.transactions;
    }
    return [];
  }
  get cfdi(): CfdiDto | undefined {
    if (
      this.transactions &&
      this.transactions.length > 0 &&
      this.transactions[0].cfdi
    ) {
      return this.transactions[0].cfdi;
    }
    return undefined;
  }
  get anyProjects() {
    return this.projects && this.projects.length > 0;
  }
}
</script>

<style scoped>
.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
