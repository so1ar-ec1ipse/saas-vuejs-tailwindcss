<template>
  <div>
    <dl class="grid grid-cols-2 sm:grid-cols-3">
      <button
        class="hover:bg-yellow-50 hover:border hover:border-yellow-300 bg-white overflow-hidden border border-gray-200 focus:z-10 focus:outline-none focus:shadow-outline-blue focus:border-blue-700"
        :class="
          selected === 0
            ? 'z-10 outline-none shadow-outline-blue border-blue-700'
            : ''
        "
        @click="show(0)"
      >
        <div class="py-1 px-1 sm:px-3">
          <div class="flex items-center">
            <div
              class="flex-shrink-0 bg-yellow-50 border border-yellow-200 rounded-sm p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 512 512"
                aria-hidden="true"
                class="h-4 w-4 text-yellow-700"
              >
                <path
                  d="M401.095 38.851L348.683 8.648 296.27 38.851 243.858 8.648 191.445 38.85 124.021 0v402.609h-80.54v54.11C43.481 487.202 68.28 512 98.763 512h314.475c30.482 0 55.282-24.798 55.282-55.281V0l-67.425 38.851zM98.763 481.978c-13.928 0-25.26-11.33-25.26-25.259v-24.088h284.453v24.088a54.966 54.966 0 006.115 25.259H98.763zm314.474 0c-13.927 0-25.259-11.33-25.259-25.259v-54.11H154.043V51.948l37.401 21.551 52.413-30.2 52.413 30.2 52.413-30.201 52.413 30.201 37.402-21.551v404.771c-.001 13.929-11.332 25.259-25.261 25.259z"
                />
                <path
                  d="M184.066 135.49h224.405v30.022H184.066zM184.066 192.742h224.405v30.022H184.066zM184.066 249.994h112.203v30.022H184.066z"
                />
              </svg>
            </div>
            <div class="ml-3 w-0 flex-1">
              <dd class="flex items-baseline space-x-1">
                <div class="hidden md:block text-xs md:text-sm font-normal">
                  ({{ ticketsRemaining }})
                </div>
              </dd>
            </div>
          </div>
        </div>
      </button>
      <button
        class="hover:bg-rose-50 hover:border hover:border-rose-300 bg-white overflow-hidden border border-gray-200 focus:z-10 focus:outline-none focus:shadow-outline-blue focus:border-blue-700"
        :class="
          selected === 1
            ? 'z-10 outline-none shadow-outline-blue border-blue-700'
            : ''
        "
        @click="show(1)"
      >
        <div class="py-1 px-1 sm:px-3">
          <div class="flex items-center">
            <div
              class="flex-shrink-0 bg-rose-50 border border-red-200 rounded-sm p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                class="h-4 w-4 text-red-700"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
            <div class="ml-3 w-0 flex-1">
              <dd class="flex items-baseline space-x-1">
                <div
                  class="text-xs sm:text-sm md:text-lg font-semibold text-gray-900"
                >
                  <span> ${{ expenseTotal | intFormat }} </span>
                </div>
                <div class="hidden md:block text-xs md:text-sm font-normal">
                  ({{ expenseCount }})
                </div>
              </dd>
            </div>
          </div>
        </div>
      </button>
      <button
        class="hover:bg-teal-50 hover:border hover:border-teal-300 hidden sm:block bg-white overflow-hidden border border-gray-200 focus:z-10 focus:outline-none focus:shadow-outline-blue focus:border-blue-700"
        :class="
          selected === 2
            ? 'z-10 outline-none shadow-outline-blue border-blue-700'
            : ''
        "
        @click="show(2)"
      >
        <div class="py-1 px-1 sm:px-3">
          <div class="flex items-center">
            <div
              class="flex-shrink-0 bg-teal-50 border border-teal-200 rounded-sm p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                class="h-4 w-4 text-teal-700"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </div>
            <div class="ml-3 w-0 flex-1">
              <dd class="flex items-baseline space-x-1">
                <div
                  class="text-xs sm:text-sm md:text-lg font-semibold text-gray-900"
                >
                  <span> ${{ incomeTotal | intFormat }} </span>
                </div>
                <div class="hidden md:block text-xs md:text-sm font-normal">
                  ({{ incomeCount }})
                </div>
              </dd>
            </div>
          </div>
        </div>
      </button>
    </dl>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import services from "@/services";
import { SummaryResponse } from "@/application/contracts/app/summaries/SummaryResponse";
import { Period } from "@/application/enums/app/common/Period";
import { SummaryCountTotal } from "@/application/contracts/app/summaries/SummaryCountTotal";

@Component({
  components: {}
})
export default class UploadCfdisPreview extends Vue {
  monthlyTickets: number = 0;
  ticketsRemaining: number = 0;
  ticketsByStatus: SummaryCountTotal[] = [];
  incomeTotal: number = 0;
  expenseTotal: number = 0;
  incomeCount: number = 0;
  expenseCount: number = 0;
  private selected: number = -1;
  mounted() {
    this.reload();
  }
  reload() {
    services.dashboard
      .getSummary({ period: Period.ALL, withDetails: false })
      .then((response: SummaryResponse) => {
        this.monthlyTickets = response.monthlyTickets;
        this.ticketsRemaining = response.ticketsRemaining;
        this.ticketsByStatus = response.ticketsByStatus;
        this.incomeTotal = response.incomeTotal;
        this.expenseTotal = response.expenseTotal;
        this.incomeCount = response.incomeCount;
        this.expenseCount = response.expenseCount;
      })
      .catch(() => {
        // ignore
      })
      .finally(() => {
        // ignore
      });
  }

  show(opcion) {
    if (this.selected === opcion) {
      this.selected = -1;
    } else {
      this.selected = opcion;
    }
    this.$emit("show", opcion);
  }
}
</script>
