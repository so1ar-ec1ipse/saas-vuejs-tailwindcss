<template>
  <div>
    <main class="max-w-7xl mx-auto pb-10 lg:py-12 lg:px-8 min-h-screen">
      <div class="lg:grid lg:grid-cols-12 lg:gap-x-5">
        <aside class="py-3 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
          <nav class="hidden lg:block lg:space-y-1 sm:items-center w-full">
            <!-- WORKSPACES -->
            <button
              type="button"
              @click="nextStep(1)"
              class="w-full justify-between lg:justify-between focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              :class="
                step === 1
                  ? 'bg-white border border-gray-200 text-theme-600 hover:bg-gray-50 group rounded-sm px-3 py-2 flex items-center text-sm font-medium'
                  : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50 group rounded-sm px-3 py-2 flex items-center text-sm font-medium'
              "
            >
              <!-- Heroicon name: cog -->
              <div class="truncate flex items-center space-x-2">
                <svg
                  class="text-gray-400 group-hover:text-gray-500 flex-shrink-0 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <div>{{ $t("app.dashboard.summaryTypes.WORKSPACE") }}</div>
              </div>

              <div
                v-if="companiesSummaryCount > 0 && false"
                class="inline-flex items-center justify-center h-6 px-1 rounded-full bg-gray-200 border border-gray-300 ml-2"
              >
                <span class="text-xs font-medium leading-none text-gray-800">
                  {{ companiesSummaryCount }}
                </span>
              </div>
            </button>

            <!-- PROJECTS -->
            <button
              type="button"
              @click="nextStep(9)"
              class="w-full justify-between lg:justify-between focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              :class="
                step === 9
                  ? 'bg-white border border-gray-200 text-theme-600 hover:bg-gray-50 group rounded-sm px-3 py-2 flex items-center text-sm font-medium'
                  : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50 group rounded-sm px-3 py-2 flex items-center text-sm font-medium'
              "
            >
              <!-- Heroicon name: cog -->
              <div class="truncate flex items-center space-x-2">
                <svg
                  class="text-gray-400 group-hover:text-gray-500 flex-shrink-0 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <div>{{ $t("app.dashboard.summaryTypes.PROJECT") }}</div>
              </div>

              <div
                v-if="projectsSummaryCount > 0 && false"
                class="inline-flex items-center justify-center h-6 px-1 rounded-full bg-gray-200 border border-gray-300 ml-2"
              >
                <span class="text-xs font-medium leading-none text-gray-800">
                  {{ projectsSummaryCount }}
                </span>
              </div>
            </button>

            <!-- SUPPLIERS -->
            <button
              type="button"
              @click="nextStep(2)"
              class="w-full justify-between lg:justify-between focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              :class="
                step === 2
                  ? 'bg-white border border-gray-200 text-theme-600 hover:bg-gray-50 group rounded-sm px-3 py-2 flex items-center text-sm font-medium'
                  : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50 group rounded-sm px-3 py-2 flex items-center text-sm font-medium'
              "
            >
              <!-- Heroicon name: user-circle -->

              <div class="truncate flex items-center space-x-2">
                <svg
                  class="text-gray-400 group-hover:text-gray-500 flex-shrink-0 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    fill="#fff"
                    d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>
                <div>{{ $t("app.dashboard.summaryTypes.SUPPLIER") }}</div>
              </div>
              <div
                v-if="suppliersSummaryCount > 0 && false"
                class="inline-flex items-center justify-center h-6 px-1 rounded-full bg-gray-200 border border-gray-300 ml-2"
              >
                <span class="text-xs font-medium leading-none text-gray-800">{{
                  suppliersSummaryCount
                }}</span>
              </div>
            </button>

            <!-- CUSTOMERS -->
            <button
              type="button"
              @click="nextStep(3)"
              class="w-full justify-between lg:justify-between focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              :class="
                step === 3
                  ? 'bg-white border border-gray-200 text-theme-600 hover:bg-gray-50 group rounded-sm px-3 py-2 flex items-center text-sm font-medium'
                  : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50 group rounded-sm px-3 py-2 flex items-center text-sm font-medium'
              "
            >
              <!-- Heroicon name: key -->

              <div class="truncate flex items-center space-x-2">
                <svg
                  class="text-gray-400 group-hover:text-gray-500 flex-shrink-0 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    fill="#fff"
                    d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                  />

                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <div>{{ $t("app.dashboard.summaryTypes.CUSTOMER") }}</div>
              </div>
              <div
                v-if="customersSummaryCount > 0 && false"
                class="inline-flex items-center justify-center h-6 px-1 rounded-full bg-gray-200 border border-gray-300 ml-2"
              >
                <span class="text-xs font-medium leading-none text-gray-800">{{
                  customersSummaryCount
                }}</span>
              </div>
            </button>

            <!-- CATEGORIES -->
            <button
              type="button"
              @click="nextStep(4)"
              class="w-full justify-between lg:justify-between focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              :class="
                step === 4
                  ? 'bg-white border border-gray-200 text-theme-600 hover:bg-gray-50 group rounded-sm px-3 py-2 flex items-center text-sm font-medium'
                  : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50 group rounded-sm px-3 py-2 flex items-center text-sm font-medium'
              "
            >
              <!-- Heroicon name: key -->

              <div class="truncate flex items-center space-x-2">
                <svg
                  class="text-gray-400 group-hover:text-gray-500 flex-shrink-0 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                <div>{{ $t("app.dashboard.summaryTypes.CATEGORY") }}</div>
              </div>
              <div
                v-if="categoriesSummaryCount > 0 && false"
                class="inline-flex items-center justify-center h-6 px-1 rounded-full bg-gray-200 border border-gray-300 ml-2"
              >
                <span class="text-xs font-medium leading-none text-gray-800">{{
                  categoriesSummaryCount
                }}</span>
              </div>
            </button>

            <!-- USERS -->
            <button
              type="button"
              @click="nextStep(8)"
              class="w-full justify-between lg:justify-between focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              :class="
                step === 8
                  ? 'bg-white border border-gray-200 text-theme-600 hover:bg-gray-50 group rounded-sm px-3 py-2 flex items-center text-sm font-medium'
                  : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50 group rounded-sm px-3 py-2 flex items-center text-sm font-medium'
              "
            >
              <!-- Heroicon name: key -->

              <div class="truncate flex items-center space-x-2">
                <svg
                  class="text-gray-400 group-hover:text-gray-500 flex-shrink-0 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <div>{{ $t("app.dashboard.summaryTypes.USER") }}</div>
              </div>
              <div
                v-if="usersSummaryCount > 0 && false"
                class="inline-flex items-center justify-center h-6 px-1 rounded-full bg-gray-200 border border-gray-300 ml-2"
              >
                <span class="text-xs font-medium leading-none text-gray-800">{{
                  usersSummaryCount
                }}</span>
              </div>
            </button>
          </nav>
          <select
            class="lg:hidden w-full bg-white pl-3 pr-10 py-2 border border-gray-300 text-sm h-full focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
            @change="nextStep($event.target.value)"
            v-model="step"
          >
            <option :value="1">{{
              $t("app.dashboard.summaryTypes.WORKSPACE")
            }}</option>
            <option :value="9">{{
              $t("app.dashboard.summaryTypes.PROJECT")
            }}</option>
            <option :value="2">{{
              $t("app.dashboard.summaryTypes.SUPPLIER")
            }}</option>
            <option :value="3">{{
              $t("app.dashboard.summaryTypes.CUSTOMER")
            }}</option>
            <option :value="4">{{
              $t("app.dashboard.summaryTypes.CATEGORY")
            }}</option>
            <option :value="8">{{
              $t("app.dashboard.summaryTypes.USER")
            }}</option>
          </select>
        </aside>

        <div class="px-2 sm:px-3 lg:px-0 lg:col-span-9" v-if="!loading">
          <!-- WORKSPACES -->
          <div
            enter-active-class="duration-150 ease-out"
            enter-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="duration-100 ease-in"
            leave-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <section v-if="step === 1">
              <div>
                <div>
                  <div>
                    <div class="space-y-1">
                      <summary-count-total
                        :initialPeriod="period.period"
                        :title="$t('app.dashboard.summaryTypes.WORKSPACE')"
                        ref="companiesSummary"
                        :tipo="0"
                        class="col-span-2 sm:col-span-1 w-full"
                        v-on:updated="workspacesCount"
                        v-on:reloaded="reloaded"
                      ></summary-count-total>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- PROJECTS -->
          <div
            enter-active-class="duration-150 ease-out"
            enter-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="duration-100 ease-in"
            leave-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <section v-if="step === 9">
              <div>
                <div>
                  <div>
                    <div class="space-y-1">
                      <summary-count-total
                        :initialPeriod="period.period"
                        :title="$t('app.dashboard.summaryTypes.PROJECT')"
                        ref="projectsSummary"
                        :tipo="8"
                        class="col-span-2 sm:col-span-1 w-full"
                        v-on:reloaded="reloaded"
                        v-on:updated="projectsCount"
                      ></summary-count-total>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- SUPPLIERS -->
          <div
            enter-active-class="duration-150 ease-out"
            enter-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="duration-100 ease-in opacity-0"
            leave-class="opacity-0 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <section v-if="step === 2" aria-labelledby="tickets">
              <div>
                <div>
                  <div>
                    <summary-count-total
                      :initialPeriod="period.period"
                      :title="$t('app.dashboard.summaryTypes.SUPPLIER')"
                      ref="suppliersSummary"
                      :tipo="1"
                      class="col-span-2 sm:col-span-1 w-full"
                      v-on:reloaded="reloaded"
                      v-on:updated="suppliersCount"
                    ></summary-count-total>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- CUSTOMERS -->
          <div
            enter-active-class="duration-150 ease-out"
            enter-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="duration-100 ease-in"
            leave-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <section v-if="step === 3">
              <div>
                <div>
                  <div>
                    <div class="space-y-3">
                      <summary-count-total
                        :initialPeriod="period.period"
                        :title="$t('app.dashboard.summaryTypes.CUSTOMER')"
                        ref="customersSummary"
                        :tipo="2"
                        class="col-span-2 sm:col-span-1 w-full"
                        v-on:reloaded="reloaded"
                        v-on:updated="customersCount"
                      ></summary-count-total>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- CATEGORIES -->
          <div
            enter-active-class="duration-150 ease-out"
            enter-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="duration-100 ease-in"
            leave-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <section v-if="step === 4">
              <div>
                <div>
                  <div>
                    <div class="space-y-3">
                      <summary-count-total
                        :initialPeriod="period.period"
                        :title="$t('app.dashboard.summaryTypes.CATEGORY')"
                        ref="categoriesSummary"
                        :tipo="3"
                        class="col-span-2 sm:col-span-1 w-full"
                        v-on:reloaded="reloaded"
                        v-on:updated="categoriesCount"
                      ></summary-count-total>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- USERS -->
          <div
            enter-active-class="duration-150 ease-out"
            enter-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="duration-100 ease-in"
            leave-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <section v-if="step === 8">
              <div>
                <div class="space-y-3">
                  <summary-count-total
                    :initialPeriod="period.period"
                    :title="$t('app.dashboard.summaryTypes.USER')"
                    ref="usersSummary"
                    :allowFilter="false"
                    :allowSearch="false"
                    :tipo="7"
                    class="col-span-2 sm:col-span-1 w-full"
                    v-on:reloaded="reloaded"
                    v-on:updated="usersCount"
                  ></summary-count-total>
                </div>
              </div>
            </section>
          </div>

          <!-- YEARS -->
          <section v-if="step === 5">
            <div>
              <div class="space-y-3">
                <summary-count-total
                  :initialPeriod="period.period"
                  :title="$t('app.dashboard.summaryTypes.YEAR')"
                  ref="yearsSummary"
                  :tipo="4"
                  :allowFilter="false"
                  :allowSearch="false"
                  class="col-span-2 sm:col-span-1 w-full"
                  v-on:reloaded="reloaded"
                  v-on:updated="yearsCount"
                ></summary-count-total>
              </div>
            </div>
          </section>

          <!-- MONTHS -->
          <section v-if="step === 6">
            <div>
              <div class="space-y-3">
                <summary-count-total
                  :initialPeriod="period.period"
                  :title="$t('app.dashboard.summaryTypes.MONTH')"
                  ref="monthsSummary"
                  :allowFilter="false"
                  :allowSearch="false"
                  :tipo="5"
                  class="col-span-2 sm:col-span-1 w-full"
                  v-on:reloaded="reloaded"
                  v-on:updated="monthsCount"
                ></summary-count-total>
              </div>
            </div>
          </section>

          <!-- WEEKS -->
          <section v-if="step === 7">
            <div>
              <div class="space-y-3">
                <summary-count-total
                  :initialPeriod="period.period"
                  :title="$t('app.dashboard.summaryTypes.WEEK')"
                  ref="weeksSummary"
                  :allowFilter="false"
                  :allowSearch="false"
                  :tipo="6"
                  class="col-span-2 sm:col-span-1 w-full"
                  v-on:reloaded="reloaded"
                  v-on:updated="weeksCount"
                ></summary-count-total>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import SummaryCountTotal from "@/components/app/summaries/SummaryCountTotal.vue";
import { PeriodRequest } from "@/application/contracts/app/shared/PeriodRequest";
import { Period } from "@/application/enums/app/common/Period";
import { SummaryCountTotalType } from "@/application/enums/app/transactions/SummaryCountTotalType";

@Component({
  components: {
    SummaryCountTotal
  }
})
export default class ReportesComponent extends Vue {
  $refs!: {
    companiesSummary: SummaryCountTotal;
    projectsSummary: SummaryCountTotal;
    suppliersSummary: SummaryCountTotal;
    customersSummary: SummaryCountTotal;
    categoriesSummary: SummaryCountTotal;
    yearsSummary: SummaryCountTotal;
    monthsSummary: SummaryCountTotal;
    weeksSummary: SummaryCountTotal;
    usersSummary: SummaryCountTotal;
  };
  private period: PeriodRequest = {
    period: Period.ALL,
    withDetails: true
  };
  private step: number = 1;
  private loading: boolean = false;
  private companiesSummaryCount: number = 0;
  private projectsSummaryCount: number = 0;
  private suppliersSummaryCount: number = 0;
  private customersSummaryCount: number = 0;
  private categoriesSummaryCount: number = 0;
  private yearsSummaryCount: number = 0;
  private monthsSummaryCount: number = 0;
  private weeksSummaryCount: number = 0;
  private usersSummaryCount: number = 0;
  created() {
    this.loading = true;
    if (this.$route.query.type) {
      switch (this.$route.query.type.toString().toUpperCase()) {
        case SummaryCountTotalType[SummaryCountTotalType.WORKSPACE]:
          this.step = 1;
          break;
        case SummaryCountTotalType[SummaryCountTotalType.SUPPLIER]:
          this.step = 2;
          break;
        case SummaryCountTotalType[SummaryCountTotalType.CUSTOMER]:
          this.step = 3;
          break;
        case SummaryCountTotalType[SummaryCountTotalType.CATEGORY]:
          this.step = 4;
          break;
        case SummaryCountTotalType[SummaryCountTotalType.YEAR]:
          this.step = 5;
          break;
        case SummaryCountTotalType[SummaryCountTotalType.MONTH]:
          this.step = 6;
          break;
        case SummaryCountTotalType[SummaryCountTotalType.WEEK]:
          this.step = 7;
          break;
        case SummaryCountTotalType[SummaryCountTotalType.USER]:
          this.step = 8;
          break;
        case SummaryCountTotalType[SummaryCountTotalType.PROJECT]:
          this.step = 9;
          break;
      }
    }
    if (this.$route.query.period) {
      switch (this.$route.query.period.toString().toUpperCase()) {
        case SummaryCountTotalType[Period.ALL]:
          this.period.period = 0;
          break;
        case SummaryCountTotalType[Period.YEAR]:
          this.period.period = 1;
          break;
        case SummaryCountTotalType[Period.MONTH]:
          this.period.period = 2;
          break;
        case SummaryCountTotalType[Period.WEEK]:
          this.period.period = 3;
          break;
        case SummaryCountTotalType[Period.DAY]:
          this.period.period = 4;
          break;
        case SummaryCountTotalType[Period.LAST_YEAR]:
          this.period.period = 5;
          break;
        case SummaryCountTotalType[Period.LAST_MONTH]:
          this.period.period = 6;
          break;
        case SummaryCountTotalType[Period.LAST_WEEK]:
          this.period.period = 7;
          break;
        case SummaryCountTotalType[Period.LAST_DAY]:
          this.period.period = 8;
          break;
        case SummaryCountTotalType[Period.LAST_30_DAYS]:
          this.period.period = 9;
          break;
        case SummaryCountTotalType[Period.LAST_7_DAYS]:
          this.period.period = 10;
          break;
      }
    }
    this.loading = false;
  }
  reload(period?: PeriodRequest, step?: number) {
    if (period) {
      this.period = period;
    }
    if (!step || step === 1) {
      this.$refs.companiesSummary?.reload(this.period);
    }
    if (!step || step === 2) {
      this.$refs.suppliersSummary?.reload(this.period);
    }
    if (!step || step === 3) {
      this.$refs.customersSummary?.reload(this.period);
    }
    if (!step || step === 4) {
      this.$refs.categoriesSummary?.reload(this.period);
    }
    if (!step || step === 5) {
      this.$refs.yearsSummary?.reload(this.period);
    }
    if (!step || step === 6) {
      this.$refs.monthsSummary?.reload(this.period);
    }
    if (!step || step === 7) {
      this.$refs.weeksSummary?.reload(this.period);
    }
    if (!step || step === 8) {
      this.$refs.usersSummary?.reload(this.period);
    }
    if (!step || step === 9) {
      this.$refs.projectsSummary?.reload(this.period);
    }
  }
  nextStep(step: number) {
    console.log("step: " + Number(step));
    this.step = Number(step);
    this.reload(this.period, Number(step));
  }
  reloaded(type: SummaryCountTotalType, period: Period) {
    const newRoute = {
      name: "app.reports",
      query: { type: SummaryCountTotalType[type].toLowerCase() },
      period: Period[period].toLowerCase()
    };
    if (this.$route.name !== newRoute.name) {
      this.$router.push(newRoute);
    }
  }
  workspacesCount(count: number) {
    this.companiesSummaryCount = count;
  }
  suppliersCount(count: number) {
    this.suppliersSummaryCount = count;
  }
  customersCount(count: number) {
    this.customersSummaryCount = count;
  }
  categoriesCount(count: number) {
    this.categoriesSummaryCount = count;
  }
  yearsCount(count: number) {
    this.yearsSummaryCount = count;
  }
  monthsCount(count: number) {
    this.monthsSummaryCount = count;
  }
  weeksCount(count: number) {
    this.weeksSummaryCount = count;
  }
  usersCount(count: number) {
    this.usersSummaryCount = count;
  }
  projectsCount(count: number) {
    this.projectsSummaryCount = count;
  }
}
</script>
