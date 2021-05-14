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

          <div class="mt-6 sm:mt-2 2xl:mt-5">
            <div class="border-b border-gray-200"></div>
          </div>

          <div class="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <dl class="grid grid-cols-4 gap-x-4 gap-y-6">
              <div class="col-span-2 md:col-span-2">
                <dt class="text-xs font-medium text-gray-500">
                  {{ $t("models.cfdi.taxId") }}
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
                  {{ $t("models.cfdi.legalName") }}
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
                  {{ $t("models.cfdi.cfdiUse") }}
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
      <div v-else-if="!transaction || !transaction.id" class="flex justify-center pt-32 font-bold text-md">
        {{ $t("shared.invalid") }}
      </div>
      <div v-else>
        <div class="bg-white rounded-sm pb-4">
          <div class="pb-3">
            <div type="button" class="bg-gray-100 focus:outline-none w-full">
              <transition
                enter-active-class="transition ease-in-out duration-300 transform"
                enter-class="-translate-y-full"
                enter-to-class="translate-y-0"
                leave-active-class="transition ease-in-out duration-300 transform"
                leave-class="translate-y-0"
                leave-to-class="-translate-y-full"
              >
                <div
                  class="w-full flex items-center justify-center py-8 text-2xl font-medium text-gray-800"
                >
                  {{ transaction.workspace.legalName }}
                </div>
              </transition>
            </div>
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
                      class="h-9 w-9"
                      :class="{
                        'text-teal-700': transaction.type === 0,
                        'text-rose-700': transaction.type === 1
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
                        <div class="py-1 border-t border-gray-100">
                          <button
                            type="button"
                            @click="eliminar"
                            class="text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                            role="menuitem"
                          >
                            Eliminar
                          </button>
                        </div>
                      </template>
                    </dropdown-simple>
                    <button
                      v-if="false"
                      type="button"
                      class="inline-flex justify-center px-2 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <svg
                        class="h-5 w-5 text-gray-600"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      <span class="sm:hidden"> {{ $t("shared.delete") }} </span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="flex justify-between mt-4 min-w-0 flex-1">
                <h1 class="text-lg font-bold text-gray-900 truncate">
                  <span class="flex items-center space-x-2 justify-between">
                    <div class="">
                      {{ $t("models.transaction.object") }}
                    </div>
                  </span>
                </h1>

                <div>
                  {{ transaction.date | dateYMD }}
                </div>
              </div>
              <div class="mt-2">
                <p class="text-sm font-medium text-gray-500">
                  <span class="text-gray-900">{{ createdByUserName() }}</span>
                  {{
                    $t("shared.added")
                      .toString()
                      .toLowerCase()
                  }}
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
                  {{ $t("shared.for") }}
                  <span
                    v-if="transaction.workspace && transaction.workspace.name"
                    class="text-gray-900"
                    >{{ transaction.workspace.name }}</span
                  >
                  <span
                    v-else-if="transaction.workspace.legalName"
                    class="text-gray-900"
                    >{{ transaction.workspace.legalName }}</span
                  >
                  <time :datetime="transaction.createdAt | dateYMD">
                    {{ transaction.createdAt | dateAgo("minute") }}
                  </time>
                </p>
              </div>
            </div>
          </div>

          <div class="mt-6 sm:mt-2 2xl:mt-5">
            <div class="border-gray-200"></div>
          </div>

          <div class="relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-start">
              <span class="px-3 bg-white font-medium text-gray-800">
                {{ $t("models.cfdi.issuerName") }}
              </span>
            </div>
          </div>

          <div class="bg-white">
            <div class="border-gray-200"></div>

            <div class="py-4 pb-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="grid grid-cols-4">
                <dl class="col-span-4 grid grid-cols-1 gap-x-4 gap-y-3">
                  <div class="col-span-1">
                    <dt class="text-xs font-medium text-gray-400">RFC</dt>
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

          <div class="relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-start">
              <span class="px-3 bg-white font-medium text-gray-800">
                {{ $t("models.cfdi.receiverName") }}
              </span>
            </div>
          </div>

          <div class="py-4 pb-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-2">
              <div v-if="false" class="font-medium">
                {{ $t("models.cfdi.receiverName") }}
              </div>
              <dl class="col-span-2 grid grid-cols-1 gap-x-4 gap-y-3">
                <div class="col-span-1 md:col-span-1">
                  <dt class="text-xs font-medium text-gray-400">
                    {{ $t("models.cfdi.taxId") }}
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 md:truncate">
                    {{ transaction.cfdi.receptorRfc }}
                  </dd>
                </div>
                <div class="col-span-1 md:col-span-1">
                  <dt class="text-xs font-medium text-gray-400">
                    {{ $t("models.cfdi.cfdiUse") }}
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 md:truncate">
                    {{ transaction.cfdi.receptorUsoCfdi }}
                  </dd>
                </div>
                <div class="col-span-2 md:col-span-2">
                  <dt class="text-xs font-medium text-gray-400">
                    {{ $t("models.cfdi.legalName") }}
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    {{ transaction.cfdi.receptorNombre }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div class="relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-start">
              <span class="px-3 bg-white font-medium text-gray-800">
                {{ $t("models.transaction.object") }}
              </span>
            </div>
          </div>

          <div class="">
            <div class="border-gray-200"></div>

            <div
              v-if="transaction && transaction.id"
              class="mt-4 max-w-5xl mx-auto px-4 pb-12 sm:px-6 lg:px-8"
            >
              <div class="mt-1 text-sm text-gray-900">
                <div
                  v-for="(detail, idxDetail) in transaction.details"
                  :key="idxDetail"
                >
                  <div
                    v-if="
                      idxDetail <= showTransactions - 1 || showMoreTransactions
                    "
                    class="block"
                  >
                    <div
                      v-if="detail.category"
                      class="select-all truncate border rounded-sm px-0.5 text-gray-800 text-xs flex items-center"
                      :class="
                        transactionType === 0
                          ? 'bg-gray-50 border-gray-200'
                          : 'bg-gray-50 border-gray-200'
                      "
                    >
                      {{ detail.category }}
                    </div>
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
                      idxDetail <= showTransactions - 1 || showMoreTransactions
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
                        !showMoreTransactions &&
                        transaction.details.length > showTransactions
                    "
                    class="flex justify-end pt-4"
                  >
                    <button
                      type="button"
                      class="focus:outline-none text-indigo-600 hover:text-indigo-800"
                      @click="showMoreTransactions = true"
                    >
                      {{
                        $t("app.shared.buttons.viewNMore", [
                          transaction.details.length - showTransactions
                        ])
                      }}...
                    </button>
                  </div>
                </div>
                <div
                  class="flex items-center justify-between mt-4 border-b border-dotted border-gray-300 pb-0.5 font-bold"
                >
                  <div class="truncate">
                    {{ $t("models.transaction.subtotal") }}
                  </div>
                  <div>${{ transaction.subtotal | decimalFormat }}</div>
                </div>
                <div
                  class="flex items-center justify-between mt-1 border-b border-dotted border-gray-300 pb-0.5 font-bold"
                >
                  <div class="truncate">
                    {{ $t("models.transaction.discount") }}
                  </div>
                  <div>${{ transaction.discount | decimalFormat }}</div>
                </div>
                <div
                  class="flex items-center justify-between mt-1 border-b border-dotted border-gray-300 pb-0.5 font-bold"
                >
                  <div class="truncate">
                    {{ $t("models.transaction.taxes") }}
                  </div>
                  <div>${{ transaction.taxes | decimalFormat }}</div>
                </div>
                <div
                  class="flex items-center justify-between mt-1 border-b border-dotted border-gray-300 pb-0.5 font-bold"
                >
                  <div class="truncate">
                    {{ $t("models.transaction.total") }}
                  </div>
                  <div>${{ transaction.total | decimalFormat }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <new-error-modal ref="errorModal"></new-error-modal>
      <confirm-modal
        ref="confirmEliminar"
        v-on:yes="confirmarEliminar"
      ></confirm-modal>
    </template>
  </side-modal>
</template>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { UserDto } from "@/application/dtos/master/users/UserDto";
import { TenantDto } from "@/application/dtos/master/tenants/TenantDto";
import { TransactionDto } from "@/application/dtos/app/transactions/TransactionDto";
import BaseComponent from "@/components/shared/BaseComponent.vue";
import TableRowSkeleton from "@/components/shared/skeletons/TableRowSkeleton.vue";
import { mapGetters } from "vuex";
import { CfdiDto } from "@/application/dtos/app/cfdis/CfdiDto";
import NewErrorModal from "@/components/shared/modals/NewErrorModal.vue";
import DropdownSimple from "@/components/shared/dropdowns/DropdownSimple.vue";
import ConfirmModalComponent from "@/components/shared/modals/ConfirmModal.vue";
import SideModal from "../../../components/shared/modals/SideModal.vue";
import * as projectHelpers from "@/application/modules/projects/ProjectHelpers";
import { TransactionType } from "@/application/enums/app/transactions/TransactionType";

@Component({
  components: {
    TableRowSkeleton,
    NewErrorModal,
    DropdownSimple,
    SideModal
  },
  computed: {
    ...mapGetters("account", {
      isAdmin: "isAdmin"
    })
  }
})
export default class TransactionItemDetails extends BaseComponent {
  $refs!: {
    errorModal: NewErrorModal;
    confirmEliminar: ConfirmModalComponent;
    dropdownOptions: DropdownSimple;
  };
  // @Prop() id!: string;
  private transaction = {} as TransactionDto;
  private showDetails: boolean = false;
  private showMoreTransactions: boolean = false;
  private showTransactions: number = 8;
  private imageFullSize: boolean = false;
  mounted() {
    // if (!this.id && this.$route.params.id) {
    //   this.id = this.$route.params.id;
    // }
    this.reload();
  }
  reload() {
    this.loading = true;
    // console.log("loading ticket-item-detailes: " + this.id);
    this.services.transactions
      .get(this.$route.params.id)
      .then((response: TransactionDto) => {
        // console.log(JSON.stringify(response));
        this.transaction = response;
        // console.log(JSON.stringify(response))
      })
      .catch(error => {
        // ignore
        this.$refs.errorModal.show(this.$t(error));
        // this.close();
      })
      .finally(() => {
        this.loading = false;
      });
  }
  close() {
    this.$router.back();
    this.$emit("closed", 1, this.$route.params.id);
  }
  createdByUserName() {
    if (this.transaction.createdByUser) {
      return (
        this.transaction.createdByUser.firstName ??
        this.transaction.createdByUser.email
      );
    } else {
      return "?";
    }
  }
  avatarText() {
    if (this.transaction && this.transaction.createdByUser) {
      if (
        this.transaction.createdByUser?.firstName &&
        this.transaction.createdByUser?.lastName
      ) {
        return (
          this.transaction.createdByUser?.firstName[0] +
          this.transaction.createdByUser?.lastName[0]
        );
      } else if (this.transaction.createdByUser?.firstName) {
        return this.transaction.createdByUser?.firstName[0];
      }
    } else {
      return "?";
    }
  }
  hasFile(type: any): boolean {
    if (this.transaction) {
      if (this.transaction?.cfdi) {
        if (type === "xml") {
          return this.transaction?.cfdi.tieneXml;
        } else if (type === "pdf") {
          return this.transaction?.cfdi.tienePdf;
        }
      }
    }
    return false;
  }
  downloadCfdi(type: string) {
    if (!this.transaction?.cfdi || !this.transaction?.cfdi?.id) {
      this.$refs.errorModal.show("No tiene CFDi");
    } else {
      const cfdiId = this.transaction.cfdi.id;
      if (cfdiId) {
        this.services.cfdis
          .download(this.transaction.cfdi.id, type)
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
  eliminar() {
    this.$refs.dropdownOptions.close();
    if (this.transaction.ticket) {
      this.$refs.confirmEliminar.show(
        `El ticket #${this.transaction.ticket.number} ya fue facturado, ¿eliminar de todas formas?`
      );
      // this.$refs.errorModal.show("No puedes eliminar un ticket ya facturado");
    } else {
      this.$refs.confirmEliminar.show(`¿Eliminar transacción?`);
    }
  }
  confirmarEliminar() {
    this.services.transactions
      .delete(this.transaction.id)
      .then((response: any) => {
        this.$emit("deleted");
      })
      .catch(error => {
        this.$refs.errorModal.show(this.$t(error));
      });
  }
  projectColor() {
    return projectHelpers.getProjectColor(this.transaction?.project?.color);
  }
  get cfdi() {
    return this.transaction?.cfdi;
  }
  get transactionType() {
    return this.transaction.type;
  }
  get tipo() {
    return TransactionType[this.transaction.type];
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
