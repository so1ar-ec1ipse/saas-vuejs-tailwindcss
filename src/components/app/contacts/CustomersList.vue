<template>
  <div class="">
    <div class="">
      <div
        class="block sm:flex items-start mb-2 sm:space-x-2 space-y-2 sm:space-y-0"
      >
        <div class="flex-1">
          <h1 class="flex-1 text-lg font-medium flex items-center">
            {{ $t("models.customer.plural") }}
            <span
              class="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 border border-gray-300 ml-2"
            >
              <span class="text-xs font-medium leading-none text-gray-800">{{
                items.length
              }}</span>
            </span>
          </h1>
        </div>
        <div class="sm:flex items-end sm:space-x-1 space-y-2 sm:space-y-0">
          <span
            class="relative z-0 inline-flex shadow-sm rounded-sm w-full sm:w-auto"
          >
            <span class="relative z-0 inline-flex shadow-sm rounded-md">
              <button
                @click="
                  reload({
                    period: 0,
                    withDetails: true
                  })
                "
                type="button"
                class="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
              >
                {{ $t("app.shared.periods.ALL") }}
              </button>
              <button
                @click="
                  reload({
                    period: 2,
                    withDetails: true
                  })
                "
                type="button"
                class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
              >
                {{ $t("app.shared.periods.MONTH") }}
              </button>
              <button
                @click="
                  reload({
                    period: 3,
                    withDetails: true
                  })
                "
                type="button"
                class="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
              >
                {{ $t("app.shared.periods.WEEK") }}
              </button>
            </span>
          </span>
        </div>
      </div>

      <div v-if="loading">
        <table-row-skeleton></table-row-skeleton>
        <table-row-skeleton></table-row-skeleton>
        <table-row-skeleton></table-row-skeleton>
      </div>
      <div v-else>
        <div v-if="items.length === 0">
          <div class="">
            <div class="text-center flex flex-col justify-center">
              <div
                class="w-full flex items-center justify-center h-32 border border-gray-200 border-dashed py-12"
              >
                <span>
                  No has agregado ingresos, puedes
                  <a
                    class="cursor-pointer font-medium text-indigo-600 hover:text-indigo-900"
                  >
                    agregar tus CFDI's de ingresos
                  </a>
                  o añadir una transacción manualmente</span
                >
              </div>
              <button
                v-if="false"
                type="button"
                @click="adding = true"
                class="text-center px-4 py-2 border border-transparent text-sm leading-3 font-medium rounded-sm text-white bg-gray-800 hover:bg-gray-700 focus:outline-shadow active:bg-gray-900 transition duration-150 ease-in-out"
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
                {{ $t("models.empresa.object") }}
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="bg-white shadow overflow-hidden sm:rounded-sm">
            <ul class="divide-y divide-gray-200">
              <li v-for="(item, index) in items" :key="index">
                <div class="block">
                  <div class="px-4 py-4 sm:px-6">
                    <div class="flex items-center justify-between">
                      <p
                        class="text-sm font-medium text-gray-800 truncate flex items-center space-x-2"
                      >
                        <span>{{ item.taxId }} - {{ item.legalName }}</span>
                      </p>
                      <div class="ml-2 flex-shrink-0 flex text-teal-700">
                        <p>${{ item.transactionsTotal | decimalFormat }}</p>
                      </div>
                    </div>
                    <div class="mt-2 sm:flex sm:justify-between">
                      <p class="flex items-center text-sm text-gray-500">
                        {{ $t("shared.last") }}
                        {{ $t("models.transaction.object") }}
                        {{ item.lastTransactionDate | dateAgo("hour") }}
                      </p>
                      <p
                        class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6"
                      >
                        {{ $t("shared.viewAll") }} ({{
                          item.transactionsCount | intFormat
                        }})
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import ObjectList from "../../../components/shared/forms/ObjectList.vue";
import TableRowSkeleton from "../../../components/shared/skeletons/TableRowSkeleton.vue";
import SvgResultsEmpty from "../../../assets/img/ResultsEmpty.vue";
import SideModal from "../../../components/shared/modals/SideModal.vue";
import ErrorModal from "@/components/shared/modals/NewErrorModal.vue";
import PageTitle from "../../../components/shared/navigation/PageTitle.vue";
import Modal from "../../../components/shared/modals/Modal.vue";
import { PeriodRequest } from "@/application/contracts/app/shared/PeriodRequest";
import { CustomerBranchDto } from "@/application/dtos/app/contacts/CustomerBranchDto";
import { Period } from "@/application/enums/app/common/Period";

@Component({
  components: {
    Modal,
    SideModal,
    ObjectList,
    TableRowSkeleton,
    SvgResultsEmpty,
    ErrorModal,
    PageTitle
  }
})
export default class CustomersList extends BaseComponent {
  $refs!: {
    uploadTicketsModal: Modal;
    errorModal: ErrorModal;
  };
  private items = [] as CustomerBranchDto[];
  private adding: boolean = false;
  private periodRequest: PeriodRequest = {
    period: Period.ALL,
    withDetails: true
  };
  mounted() {
    this.reload(this.periodRequest);
  }
  async reload(periodRequest?: PeriodRequest) {
    if (periodRequest) {
      this.periodRequest = periodRequest;
    }
    this.items = [];
    this.loading = true;
    this.services.customers
      .getAllClientes(this.periodRequest)
      .then((response: CustomerBranchDto[]) => {
        // console.log(JSON.stringify(response))
        this.items = response;
      })
      .catch(error => {
        this.$refs.errorModal.show(error);
      })
      .finally(() => {
        this.loading = false;
      });
  }
  deleted(data: CustomerBranchDto) {
    this.items = this.items.filter(f => f.id !== data.id);
  }
  canceled() {
    // console.log("canceled");
  }
  added(data: CustomerBranchDto) {
    // console.log("added data:" + JSON.stringify(data));
    this.items.push(data);
  }
  saved(data: CustomerBranchDto) {
    const idx = this.items.findIndex(f => f.id === data.id);
    this.items[idx] = data;
  }
  get orderedItems(): CustomerBranchDto[] {
    if (!this.items) {
      return [];
    }
    return this.items.sort((x, y) => {
      if (x.taxId && y.taxId) {
        return (x.taxId > y.taxId ? 1 : -1) ?? 1;
      }
      return 1;
    });
  }
}
</script>
