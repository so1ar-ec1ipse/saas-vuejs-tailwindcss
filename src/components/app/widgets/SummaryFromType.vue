<template>
  <section aria-labelledby="title">
    <div class="rounded-sm bg-white overflow-hidden shadow">
      <div class="p-5">
        <h2
          class="flex items-center justify-between text-base font-medium text-gray-900"
          id="title"
        >
          <span>
            {{ title }}
            <span class="text-xs" v-if="items && items.length > 0">
              ({{ items.length }})</span
            >
          </span>
          <div class="flex justify-center">
            <router-link
              v-if="urlNew"
              :to="urlNew"
              class="flex items-center space-x-2 text-center px-2 py-1 text-xs font-medium rounded-sm text-gray-800 hover:bg-blueGray-100 focus:outline-shadow active:bg-gray-900 transition duration-150 ease-in-out"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="plus"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                class="text-gray-500 h-2.5"
                style="bottom: 1px"
              >
                <path
                  fill="currentColor"
                  d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                  class
                />
              </svg>
            </router-link>
          </div>
        </h2>
        <div v-if="loading" class="mt-6">
          <p class="italic text-xs text-gray-500">
            {{ $t("shared.loading") }}...
          </p>
        </div>
        <div v-else-if="items && items.length > 0" class="flow-root mt-6">
          <ul class="-my-5 divide-y divide-gray-100">
            <li v-for="(item, idx) in orderedItems" :key="idx" class="py-1">
              <button
                @click="goTo(item.id)"
                class="w-full space-x-3 text-xs justify-between flex items-center border-0 py-2 rounded-md focus:outline-none"
                :class="{
                  'hover:bg-gray-50 hover:border hover:border-gray-200 cursor-pointer hover:shadow-sm':
                    item.id,
                  'cursor-default': !item.id
                }"
              >
                <div class="font-medium text-gray-900 truncate">
                  <div
                    v-if="!texto(item.name) && !texto(item.description)"
                    class="font-light truncate text-gray-500 text-left"
                  >
                    Indefinido
                  </div>
                  <div class="flex items-center font-normal">
                    <div
                      v-if="item.color"
                      class="h-2 w-2 rounded-full mr-2"
                      :class="projectColor(item.color)"
                    ></div>
                    <div class="truncate mr-2">{{ item.name }}</div>
                  </div>
                  <div class="font-light truncate text-gray-500 text-left">
                    {{ item.description }}
                  </div>
                </div>
                <div class="flex items-center">
                  <div class="text-gray-700 text-xs">
                    <p v-if="loading">...</p>
                    <div
                      v-if="
                        !loading &&
                          item.ticketsTotal > 0 &&
                          (withTickets ||
                            (item.expenseCount === 0 && item.incomeCount === 0))
                      "
                      class="flex items-center space-x-1 text-gray-600 truncate text-right"
                    >
                      <div class="font-extrabold text-gray-400">?</div>
                      <div>
                        ${{ item.ticketsTotal | numberFormat }}
                        <span class="font-light"
                          >({{ item.ticketsCount | intFormat }})</span
                        >
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="!loading && item.expenseTotal > 0 && withExpenses"
                    class="flex items-center text-gray-600 truncate text-right"
                  >
                    <svg
                      class="h-3 text-rose-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div>
                      ${{ item.expenseTotal | numberFormat }}
                      <span class="font-light"
                        >({{ item.expenseCount | intFormat }})</span
                      >
                    </div>
                  </div>
                  <div
                    v-if="!loading && item.incomeTotal > 0 && withIncome"
                    class="flex items-center space-x-1 text-gray-600 truncate text-right"
                  >
                    <svg
                      class="h-3 text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div>
                      ${{ item.incomeTotal | numberFormat }}
                      <span class="font-light"
                        >({{ item.incomeCount | intFormat }})</span
                      >
                    </div>
                  </div>
                </div>
              </button>
            </li>
          </ul>
        </div>
        <div v-else class="mt-6">
          <p class="italic text-xs text-gray-500">
            {{ $t("shared.thereAreNoRecords") }}
            {{ currentPeriod }}
          </p>
        </div>
        <div class="mt-6" v-if="items && items.length > 5">
          <router-link
            :to="reportsUrl"
            class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-xs font-medium rounded-sm text-gray-700 bg-white hover:bg-gray-50"
          >
            {{ $t("shared.view") }}
            {{
              $t("shared.all")
                .toString()
                .toLowerCase()
            }}
            ({{ items.length }})
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { TenantUserDto } from "@/application/dtos/master/tenants/TenantUserDto";
import services from "@/services";
import { mapGetters } from "vuex";
import { PeriodRequest } from "@/application/contracts/app/shared/PeriodRequest";
import { Period } from "@/application/enums/app/common/Period";
import { SummaryCountTotalResponse } from "@/application/contracts/app/summaries/SummaryCountTotalResponse";
import * as projectHelpers from "@/application/modules/projects/ProjectHelpers";
import { SummaryCountTotalType } from "@/application/enums/app/transactions/SummaryCountTotalType";

@Component({
  components: {}
})
export default class SummaryFromType extends Vue {
  @Prop({ default: -1 }) type!: SummaryCountTotalType;
  @Prop({ default: false }) details!: boolean;
  @Prop({ default: true }) withExpenses!: boolean;
  @Prop({ default: true }) withIncome!: boolean;
  @Prop({ default: true }) withTickets!: boolean;
  @Prop({ default: "" }) urlDetails!: string;
  @Prop({ default: "" }) urlNew!: string;
  @Prop({ default: false }) onlyInvoices!: boolean;
  private title: string = "";
  private dropDown: boolean = false;
  private items?: SummaryCountTotalResponse[] = [];
  private loading: boolean = false;
  private selected: number = -1;
  private period: PeriodRequest = {
    period: Period.LAST_30_DAYS,
    withDetails: false
  };
  private periodList: any[] = [];
  created() {
    this.periodList = [];
    const keys = Object.keys(Period).filter(
      k => typeof Period[k as any] === "number"
    ); // ["A", "B"]
    const periods = keys.map(k => Period[k as any]); // [0, 1]
    periods.forEach(key => {
      if (this.periodList.includes(f => f.value === Number(key))) {
        return;
      }
      const periodName: string = Period[key];
      this.periodList.push({
        value: Number(key),
        name: this.$t("app.shared.periods." + periodName),
        description: this.$t(
          "app.shared.periods." + periodName + "_Description"
        )
          .toString()
          .toLowerCase()
      });
    });
  }
  mounted() {
    this.title = this.$t(
      "app.dashboard.summaryTypes." + SummaryCountTotalType[this.type]
    ).toString();
  }
  reload(period?: PeriodRequest) {
    // console.log(`[${this.title}] current: ${this.period.period}`);
    // console.log(`[${this.title}] reloading: ${period?.period}`);
    if (this.period.period === period?.period) {
      return;
    }
    if (period) {
      this.period = period;
    }
    this.loading = true;
    this.items = [];
    services.dashboard
      .getSummaryCountTotal(this.type, this.period)
      .then((response: SummaryCountTotalResponse[]) => {
        this.items = response;
      })
      .catch(error => {
        // console.error(
        //   `[ERROR TIPO ${ResumenCuentaTotalTipo[this.tipo]}]: ` +
        //     JSON.stringify(error)
        // );
      })
      .finally(() => {
        this.loading = false;
      });
  }
  projectColor(color) {
    return projectHelpers.getProjectColor(color);
  }
  goTo(id) {
    if (this.urlDetails && id) {
      this.$router.push(this.urlDetails + id);
    }
  }
  texto(value: string): string | undefined {
    if (!value || value.trim() === "") {
      return undefined;
    }
    return value.trim();
  }
  get currentPeriod() {
    const period = this.periodList.find(f => f.value === this.period.period);
    if (period) {
      return period.description;
    }
  }
  get reportsUrl() {
    try {
      return {
        name: "app.reports",
        query: {
          type: SummaryCountTotalType[this.type].toLowerCase(),
          period: Period[this.period.period].toLowerCase()
        }
      };
    } catch {
      return {};
    }
  }
  get orderedItems() {
    if (!this.items) {
      return [];
    }
    return this.items
      .sort((x, y) => {
        return x.expenseTotal > y.expenseTotal ? -1 : 1;
      })
      .slice(0, 5);
  }
}
</script>
