<template>
  <div>
    <dl class="grid grid-cols-1 gap-1 md:grid-cols-2">
      <div class="bg-white overflow-hidden border border-gray-200 rounded-sm">
        <div class="px-4 py-5">
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
                class="h-6 w-6 text-red-700"
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
              <dt class="text-sm font-medium text-gray-500 truncate">
                {{ $t("app.transactions.expensePlural") }}
              </dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900">
                  <span>
                    ${{ summary.expenseTotal | intFormat }}
                    <span class="text-sm font-normal">
                      ({{ summary.expenseCount }})
                    </span>
                  </span>
                </div>
              </dd>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white overflow-hidden border border-gray-200 rounded-sm">
        <div class="px-4 py-5">
          <div class="flex items-center">
            <div
              class="flex-shrink-0 bg-teal-50 border border-teal-200 rounded-sm p-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                class="h-6 w-6 text-teal-700"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="text-sm font-medium text-gray-500 truncate">
                {{ $t("app.transactions.incomePlural") }}
              </dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900">
                  <span>
                    ${{ summary.incomeTotal | intFormat }}
                    <span class="text-sm font-normal">
                      ({{ summary.incomeCount }})
                    </span>
                  </span>
                </div>
              </dd>
            </div>
          </div>
        </div>
      </div>
    </dl>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { SummaryResponse } from "@/application/contracts/app/summaries/SummaryResponse";

@Component({
  components: {}
})
export default class UploadCfdisPreview extends Vue {
  @Prop() summary!: SummaryResponse;
}
</script>
