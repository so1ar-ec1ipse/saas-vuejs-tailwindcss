<template>
  <div class="">
    <div class="">
      <div
        class="block sm:flex items-center mb-2 sm:space-x-2 space-y-2 sm:space-y-0"
      >
        <div class="flex-1">
          <div class="text-lg font-bold flex items-center space-x-1 truncate">
            <div>${{ total | decimalFormat }}</div>
            <div
              class="text-sm font-normal"
              v-if="incomeCount > 0 && expenseCount > 0"
            >
              ({{ (incomeCount + expenseCount) | intFormat }} facturas)
            </div>
            <div class="text-sm font-normal" v-else-if="expenseCount > 0">
              ({{ expenseCount | intFormat }} gastos)
            </div>
            <div class="text-sm font-normal" v-else-if="incomeCount > 0">
              ({{ incomeCount | intFormat }} ingresos)
            </div>
            <div class="text-sm font-normal" v-else>(0 gastos)</div>
          </div>
        </div>
        <div class="sm:flex items-end sm:space-x-1 space-y-2 sm:space-y-0">
          <span
            class="relative inline-flex rounded-sm w-full justify-between space-x-0"
          >
            <div class="w-full">
              <label for="search" class="sr-only">Buscar</label>
              <div class="relative rounded-sm shadow-sm">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  aria-hidden="true"
                >
                  <!-- Heroicon name: search -->
                  <svg
                    class="mr-3 h-4 w-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  :disabled="loading"
                  type="text"
                  name="search"
                  id="search"
                  class="h-9 focus:ring-gray-500 focus:border-gray-500 focus:z-30 block w-full pl-9 sm:text-sm border-gray-300 rounded-sm"
                  :class="loading ? 'bg-gray-50 cursor-not-allowed' : ''"
                  :placeholder="$t('shared.search')"
                  v-model="searchText"
                />
              </div>
            </div>

            <period-select
              ref="periodSelect"
              :initialPeriod="period.period"
              v-on:selected="selectPeriodo"
            ></period-select>

            <span
              v-if="false"
              class="relative inline-flex shadow-sm rounded-sm"
            >
              <button
                @click="reload()"
                id="reload"
                type="button"
                class="items-center w-full bg-white border border-gray-300 px-3 py-2 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <!--                <svg class="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">-->
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
          </span>
        </div>
      </div>

      <div v-if="loading">
        <table-row-skeleton></table-row-skeleton>
        <table-row-skeleton></table-row-skeleton>
        <table-row-skeleton></table-row-skeleton>
      </div>
      <div v-else>
        <div v-if="filteredItems.length === 0">
          <div class="">
            <div class="text-center flex flex-col justify-center">
              <div
                class="w-full items-center justify-center h-32 border-2 border-gray-400 border-dashed py-12 inline-flex"
              >
                <span>
                  <p class="italic text-xs text-gray-500">
                    {{ $t("shared.thereAreNoRecords") }}
                  </p></span
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
                  class="xl:relative mr-2 svg-inline--fa fa-plus fa-w-14 fa-sm"
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
        <div v-else class="space-y-2">
          <div class="bg-white shadow sm:rounded-sm overflow-auto">
            <ul class="divide-y divide-gray-200">
              <li v-for="(item, index) in filteredItems" :key="index">
                <div class="block hover:bg-gray-50">
                  <div class="px-3 pt-2 py-1 sm:px-4">
                    <div class="xl:flex justify-between items-baseline">
                      <div
                        class="text-sm text-gray-800 items-center text-left flex space-x-2 truncate"
                      >
                        <div
                          v-if="item.name !== ''"
                          class="text-gray-800 font-bold truncate"
                          :class="item.description ? '' : ''"
                        >
                          {{ item.name }}
                        </div>
                        <div
                          v-if="item.description !== ''"
                          class="text-gray-600 truncate"
                        >
                          <span v-if="item.description">
                            {{ item.description }}
                          </span>
                          <span v-else class="invisible">
                            <!-- Undefined -->
                          </span>
                        </div>
                      </div>
                      <div
                        class="xl:flex xl:space-x-3 text-sm justify-end ml-2 text-right items-baseline space-y-2"
                      >
                        <div v-if="item.ticketsCount > 0">
                          <div
                            class="text-gray-800 font-medium justify-end flex items-baseline space-x-2 xl:w-56 hover:font-bold"
                          >
                            <div class="text-right font-medium">
                              ${{ item.ticketsTotal | decimalFormat }}
                            </div>

                            <badge-ticket
                              :with-text="false"
                              width="w-16 xl:w-1/4 p-1 px-1"
                              height="h-3"
                              size="sm"
                              :text="item.ticketsCount | intFormat"
                            ></badge-ticket>
                          </div>
                        </div>
                        <div v-if="item.expenseCount > 0">
                          <div
                            class="text-gray-800 font-medium justify-end flex items-baseline space-x-2 xl:w-56 hover:font-bold"
                          >
                            <div class="text-right text-xs text-gray-700">
                              ({{
                                item.expensePercentageTotal | decimalFormat
                              }}%)
                            </div>
                            <div class="text-right font-medium">
                              ${{ item.expenseTotal | decimalFormat }}
                            </div>
                            <badge-expense
                              :with-text="false"
                              width="w-16 xl:w-1/4 p-1 px-1"
                              height="h-3"
                              :text="item.expenseCount | intFormat"
                            ></badge-expense>
                          </div>
                        </div>
                        <div v-if="item.incomeCount > 0">
                          <div
                            class="text-gray-800 font-medium justify-end flex items-baseline space-x-2 xl:w-56 group"
                          >
                            <div
                              class="text-right text-xs text-gray-700 group-hover:font-bold"
                            >
                              ({{
                                item.incomePercentageTotal | decimalFormat
                              }}%)
                            </div>
                            <div
                              class="text-right font-medium group-hover:font-bold"
                            >
                              ${{ item.incomeTotal | decimalFormat }}
                            </div>
                            <badge-income
                              :with-text="false"
                              width="w-16 xl:w-1/4 p-1 px-1"
                              height="h-3"
                              :text="item.incomeCount | intFormat"
                            ></badge-income>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div
            v-if="false"
            class="w-full items-center justify-center h-auto border-2 border-gray-400 border-dashed py-12 inline-flex"
          >
            <bar-chart
              v-if="chartType === 'bar'"
              :chart-data="barChartInfo"
              :options="chartOptions"
            ></bar-chart>
            <line-chart
              v-if="chartType === 'line'"
              :chart-data="barChartInfo"
              :options="chartOptions"
            ></line-chart>
            <doughnut-chart
              v-if="chartType === 'doughnut'"
              :chart-data="barChartInfo"
              :options="chartOptions"
            ></doughnut-chart>
            <pie-chart
              v-if="chartType === 'pie'"
              :chart-data="barChartInfo"
              :options="chartOptions"
            ></pie-chart>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>

    <error-modal ref="errorModal"></error-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import ObjectList from "../../../components/shared/forms/ObjectList.vue";
import TableRowSkeleton from "../../../components/shared/skeletons/TableRowSkeleton.vue";
import SvgResultsEmpty from "../../../assets/img/ResultsEmpty.vue";
import SideModal from "../../../components/shared/modals/SideModal.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import PageTitle from "../../../components/shared/navigation/PageTitle.vue";
import Modal from "../../../components/shared/modals/Modal.vue";
import { PeriodRequest } from "@/application/contracts/app/shared/PeriodRequest";
import { Period } from "@/application/enums/app/common/Period";
import { SummaryCountTotalResponse } from "@/application/contracts/app/summaries/SummaryCountTotalResponse";
import { Prop } from "vue-property-decorator";
import BadgeExpense from "../../../components/app/badges/BadgeExpense.vue";
import BadgeIncome from "../../../components/app/badges/BadgeIncome.vue";
import BadgeTicket from "../../../components/app/badges/BadgeTicket.vue";
import { TransactionType } from "@/application/enums/app/transactions/TransactionType";
import BarChart from "@/plugins/charts/BarChart";
import LineChart from "@/plugins/charts/LineChart";
import DoughnutChart from "@/plugins/charts/DoughnutChart";
import PieChart from "@/plugins/charts/PieChart";
import PeriodSelect from "@/components/shared/selectors/PeriodSelect.vue";
import ErrorModalComponent from "@/components/shared/modals/NewErrorModal.vue";
import { SummaryCountTotalType } from "@/application/enums/app/transactions/SummaryCountTotalType";

const numeral = require("numeral");

@Component({
  components: {
    Modal,
    SideModal,
    ObjectList,
    TableRowSkeleton,
    SvgResultsEmpty,
    ErrorModal,
    PageTitle,
    BadgeExpense,
    BadgeIncome,
    BadgeTicket,
    BarChart,
    LineChart,
    DoughnutChart,
    PieChart,
    PeriodSelect
  }
})
export default class SummaryCountTotalComponent extends BaseComponent {
  @Prop({ default: "" }) title!: string;
  @Prop({ default: -1 }) tipo!: SummaryCountTotalType;
  @Prop({ default: true }) allowFilter!: boolean;
  @Prop({ default: true }) allowSearch!: boolean;
  @Prop({ default: "bar" }) chartType!: string;
  @Prop({ default: 0 }) chartValueType!: number;
  @Prop({ default: 0 }) initialPeriod!: Period;
  $refs!: {
    uploadTicketsModal: Modal;
    periodSelect: PeriodSelect;
    errorModal: ErrorModalComponent;
  };
  private items = [] as SummaryCountTotalResponse[];
  private adding: boolean = false;
  private period: PeriodRequest = {
    period: Period.ALL,
    withDetails: true
  };
  private searchText: string = "";
  created() {
    const self = this;
    // this.eventBus.$on("empresa-canceled", () => self.canceled());
    // this.eventBus.$on("empresa-deleted", (data) => self.deleted(data));
    // this.eventBus.$on("empresa-added", (data) => self.added(data));
    // this.eventBus.$on("empresa-saved", (data) => self.reload());
  }
  destroy() {
    // this.eventBus.$off("empresa-canceled");
    // this.eventBus.$off("empresa-deleted");
    // this.eventBus.$off("empresa-added");
    // this.eventBus.$off("empresa-saved");
  }
  mounted() {
    // console.log("period inicial: " + Periodo[this.initialPeriod]);
    this.period.period = this.initialPeriod;
    this.reload(this.period);
  }
  async reload(period?: PeriodRequest) {
    if (period) {
      this.period = period;
    }
    this.items = [];
    this.$emit("updated", 0);
    this.$emit("reloaded", this.tipo, this.period.period);
    this.$refs.periodSelect.period = this.period.period;
    this.loading = true;
    this.services.dashboard
      .getSummaryCountTotal(this.tipo, this.period)
      .then((response: SummaryCountTotalResponse[]) => {
        // console.log(JSON.stringify(response))
        this.items = response;
        this.$emit("updated", response.length);
      })
      .catch(error => {
        this.$refs.errorModal.show(error);
      })
      .finally(() => {
        this.loading = false;
      });
  }
  verTransactions(
    item: SummaryCountTotalResponse,
    transactionType: TransactionType
  ) {
    let tipoTransaction = "";
    if (transactionType === TransactionType.INCOME) {
      tipoTransaction = "ingresos";
    } else if (transactionType === TransactionType.EXPENSE) {
      tipoTransaction = "egresos";
    }
    if (this.tipo === SummaryCountTotalType.WORKSPACE) {
      this.$router.push(
        `/app/facturas?empresa=${item.name}&tipo=${tipoTransaction}`
      );
    } else if (this.tipo === SummaryCountTotalType.CUSTOMER) {
      this.$router.push(
        `/app/facturas?cliente=${item.name}&tipo=${tipoTransaction}`
      );
    } else if (this.tipo === SummaryCountTotalType.SUPPLIER) {
      this.$router.push(
        `/app/facturas?proveedor=${item.name}&tipo=${tipoTransaction}`
      );
    } else if (this.tipo === SummaryCountTotalType.CATEGORY) {
      this.$router.push(
        `/app/facturas?categoria=${item.name}&tipo=${tipoTransaction}`
      );
    } else if (this.tipo === SummaryCountTotalType.PROJECT) {
      this.$router.push(`/app/facturas?proyecto=${item.name}`);
    }
  }
  selectPeriodo(period: Period) {
    this.reload({
      period,
      withDetails: false
    });
  }
  get itemCount(): number {
    return this.items?.length ?? 0;
  }
  get expenseCount(): number {
    const expenses = this.filteredItems.reduce(
      (n, { expenseCount }) => n + expenseCount,
      0
    );
    return expenses;
  }
  get incomeCount(): number {
    return this.filteredItems.reduce(
      (n, { incomeCount }) => n + incomeCount,
      0
    );
  }
  get total(): number {
    const ingresos = this.filteredItems.reduce(
      (n, { incomeTotal }) => n + incomeTotal,
      0
    );
    const egresos = this.filteredItems.reduce(
      (n, { expenseTotal }) => n + expenseTotal,
      0
    );
    return Math.abs(ingresos - egresos);
  }
  get filteredItems(): SummaryCountTotalResponse[] {
    if (!this.items) {
      return [];
    } else if (!this.searchText) {
      return this.items;
    } else {
      return this.items.filter(
        f =>
          (f.name &&
            f.name.toLowerCase().includes(this.searchText.toLowerCase())) ||
          (f.description &&
            f.description.toLowerCase().includes(this.searchText.toLowerCase()))
      );
    }
  }
  get chartOptions() {
    return {
      // tooltips: {
      //   callbacks: {
      //     label: (tooltipItem, data) => {
      //       return tooltipItem.yLabel
      //         .toFixed(2)
      //         .replace(/\d(?=(\d{3})+\.)/g, "$&,");
      //     },
      //   },
      // },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              callback: value => {
                if (this.chartType !== "pie") {
                  return "$" + numeral(value).format("0,0");
                }
                return "";
              }
            }
          }
        ]
      },
      legend: {
        display: this.filteredItems.length <= 10,
        labels: {
          // fontColor: 'rgb(255, 99, 132)'
        }
      }
    };
  }
  get barChartInfo() {
    const dataSets: any[] = [];
    if (this.chartValueType === 1) {
      this.filteredItems.forEach(element => {
        dataSets.push({
          label: element.name,
          backgroundColor: ["#3B82F6", "#F87171"],
          data: [element.incomeTotal, element.expenseTotal]
        });
        // dataSets.push({
        //   label: "Egresos",
        //   backgroundColor: "#F87171",
        //   data: [element.expenseTotal],
        // });
        // dataSets.push({
        //   label: "Egresos",
        //   backgroundColor: "#F87171",
        //   data: [element.expenseTotal],
        // });
      });
      return {
        labels: ["Ingresos", "Egresos"],
        datasets: dataSets
      };
    } else {
      this.filteredItems.forEach(element => {
        if (dataSets.length <= 10) {
          dataSets.push({
            label: "Ingresos",
            backgroundColor: "#3B82F6",
            data: [element.incomeTotal]
          });
          dataSets.push({
            label: "Egresos",
            backgroundColor: "#F87171",
            data: [element.expenseTotal]
          });
        }
      });
      return {
        labels: this.filteredItems.map(f => f.name),
        datasets: dataSets
      };
    }
  }
  // deleted(data: SupplierBranchDto) {
  //   this.items = this.items.filter((f) => f.id !== data.id);
  // }
  // canceled() {
  //   // console.log("canceled");
  // }
  // added(data: SupplierBranchDto) {
  //   console.log("added data:" + JSON.stringify(data));
  //   this.items.push(data);
  // }
  // saved(data: SupplierBranchDto) {
  //   const idx = this.items.findIndex((f) => f.id === data.id);
  //   this.items[idx] = data;
  // }
  // get orderedItems(): SupplierBranchDto[] {
  //   if (!this.items) {
  //     return [];
  //   }
  //   return this.items.sort((x, y) => {
  //     if (x.taxId && y.taxId) {
  //       return (x.taxId > y.taxId ? 1 : -1) ?? 1;
  //     }
  //     return 1;
  //   });
  // }
}
</script>
