<template>
  <div>
    <div class="space-y-0 flex justify-between items-center">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        {{ $t("app.dashboard.summary").toString() }}
      </h3>
      <div class=" ">
        <span class="relative z-10 inline-flex text-xs">
          <period-select
            :initialPeriod="period.period"
            v-on:selected="selectPeriodo"
          ></period-select>
        </span>
      </div>
    </div>
    <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
      <router-link
        :to="{ name: 'app.tickets' }"
        class="hover:bg-yellow-50 hover:border-2 hover:border-yellow-300 bg-white overflow-hidden shadow rounded-sm sm:col-span-1 lg:col-span-1"
      >
        <div class="px-3 py-3">
          <div class="flex items-center">
            <div
              class="flex-shrink-0 bg-yellow-50 border border-yellow-200 rounded-sm p-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 512 512"
                aria-hidden="true"
                class="h-5 w-5 text-yellow-700"
              >
                <path
                  d="M401.095 38.851L348.683 8.648 296.27 38.851 243.858 8.648 191.445 38.85 124.021 0v402.609h-80.54v54.11C43.481 487.202 68.28 512 98.763 512h314.475c30.482 0 55.282-24.798 55.282-55.281V0l-67.425 38.851zM98.763 481.978c-13.928 0-25.26-11.33-25.26-25.259v-24.088h284.453v24.088a54.966 54.966 0 006.115 25.259H98.763zm314.474 0c-13.927 0-25.259-11.33-25.259-25.259v-54.11H154.043V51.948l37.401 21.551 52.413-30.2 52.413 30.2 52.413-30.201 52.413 30.201 37.402-21.551v404.771c-.001 13.929-11.332 25.259-25.261 25.259z"
                />
                <path
                  d="M184.066 135.49h224.405v30.022H184.066zM184.066 192.742h224.405v30.022H184.066zM184.066 249.994h112.203v30.022H184.066z"
                />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt
                class="text-sm font-medium text-gray-500 truncate flex items-center justify-between space-x-2"
              >
                <div>{{ $t("models.ticket.plural").toString() }}</div>
                <div class="text-xs font-normal truncate">
                  {{ ticketsCount }}
                </div>
              </dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900">
                  <span v-if="loadingSummary"> ... </span>
                  <span
                    v-else
                    class="flex items-baseline space-x-2 truncate break-words"
                  >
                    <span class="group-hover:underlines">
                      ${{ ticketsTotal | intFormat }}
                    </span>
                  </span>
                </div>
              </dd>
            </div>
          </div>
        </div>
      </router-link>
      <router-link
        :to="{ name: 'app.transactions', query: { tipo: 'egresos' } }"
        class="hover:bg-rose-50 hover:border-2 hover:border-rose-300 bg-white overflow-hidden shadow rounded-sm"
      >
        <div class="px-3 py-3">
          <div class="flex items-center">
            <div
              class="flex-shrink-0 bg-rose-50 border border-red-200 rounded-sm p-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                class="h-5 w-5 text-red-700"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt
                class="text-sm font-medium text-gray-500 truncate flex items-center justify-between space-x-2"
              >
                <div>{{ $t("app.transactions.expensePlural").toString() }}</div>
                <div class="text-xs font-normal truncate">
                  {{ summary.expenseCount }}
                  {{
                    $t("app.transactions.expensePlural")
                      .toString()
                      .toLowerCase()
                  }}
                </div>
              </dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900">
                  <span v-if="loadingSummary"> ... </span>
                  <div
                    v-else
                    :to="{
                      name: 'app.transactions',
                      query: { tipo: 'egresos' }
                    }"
                    class="cursor-pointer group"
                  >
                    <span class="group-hover:underlines">
                      ${{ summary.expenseTotal | intFormat }}
                    </span>
                  </div>
                </div>
              </dd>
            </div>
          </div>
        </div>
      </router-link>
    </dl>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { SummaryResponse } from "@/application/contracts/app/summaries/SummaryResponse";
import { Period } from "@/application/enums/app/common/Period";
import { PeriodRequest } from "@/application/contracts/app/shared/PeriodRequest";
import services from "@/services";
import { TicketStatus } from "../../../application/enums/app/transactions/TicketStatus";
import PeriodSelect from "@/components/shared/selectors/PeriodSelect.vue";
import { WhoInvoices } from "@/application/enums/app/cfdis/WhoInvoices";
import Tickets from "../tickets/Tickets.vue";

@Component({
  components: {
    PeriodSelect
  }
})
export default class GeneralSummary extends Vue {
  private period: PeriodRequest = {
    period: Period.LAST_30_DAYS,
    withDetails: true
  };
  private summary: SummaryResponse = {
    whoInvoices: WhoInvoices.ADMIN,
    monthlyTickets: 0,
    ticketsRemaining: 0,
    ticketsByStatus: [],
    incomeCount: 0,
    expenseCount: 0,
    incomeTotal: 0,
    expenseTotal: 0
  };
  private loadingSummary: boolean = false;
  reload(period?: PeriodRequest) {
    this.summary = {
      whoInvoices: WhoInvoices.ADMIN,
      monthlyTickets: 0,
      ticketsRemaining: 0,
      ticketsByStatus: [],
      incomeCount: 0,
      expenseCount: 0,
      incomeTotal: 0,
      expenseTotal: 0
    };
    if (period) {
      this.period = period;
    }
    this.loadingSummary = true;
    services.dashboard
      .getSummary(this.period)
      .then((response: SummaryResponse) => {
        this.summary = response;
      })
      .catch(() => {
        // ignore
      })
      .finally(() => {
        this.loadingSummary = false;
      });
    this.$emit("reloaded", this.period);
  }
  calcularPorcentaje(valor, total) {
    return (valor * 100) / total;
  }
  selectPeriodo(period: Period) {
    this.reload({
      period,
      withDetails: false
    });
  }

  get ticketsTotal() {
    if (!this.summary) {
      return 0;
    } else {
      let total: number = 0;
      this.summary.ticketsByStatus.forEach(currentStatus => {
        if (
          currentStatus.status === TicketStatus.PENDING ||
          currentStatus.status === TicketStatus.REQUESTED
        ) {
          total += currentStatus.total;
        }
      });
      return total;
    }
  }
  get ticketsCount() {
    if (!this.summary) {
      return "";
    } else {
      const statusArr: string[] = [];
      let pendingCount = 0;
      this.summary.ticketsByStatus
        .filter(f => f.status !== TicketStatus.INVOICED)
        .forEach(status => {
          if (
            status.status === TicketStatus.PENDING ||
            status.status === TicketStatus.REQUESTED
          ) {
            pendingCount += status.count;
          }
          if (status.count > 0) {
            statusArr.push(
              `${status.count} (${this.$t(
                "app.tickets.status." + TicketStatus[status.status]
              )
                .toString()
                .toLowerCase()})`
            );
          }
        });
      return (
        pendingCount +
        " " +
        this.$t(
          "app.tickets.statusPlural." + TicketStatus[TicketStatus.PENDING]
        )
          .toString()
          .toLowerCase()
      );
    }
  }
}
</script>
