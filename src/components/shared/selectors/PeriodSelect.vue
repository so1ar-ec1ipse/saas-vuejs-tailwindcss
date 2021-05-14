

<template>
  <div>
    <div class="relative">
      <div>
        <div class="h-9">
          <label id="listbox-label" class="sr-only">
            {{ currentPeriod }}
          </label>
          <div class="relative" v-click-outside="closeShowPeriods">
            <div
              class="h-9 inline-flex shadow-none rounded-sm divide-x divide-gray-300"
            >
              <div
                class="text-sm relative z-0 inline-flex shadow-nonerounded-sm divide-x divide-gray-300 border border-gray-300 rounded-sm"
              >
                <div
                  class="w-full relative inline-flex items-center bg-white text-gray-900 py-1 pl-2 pr-3 border border-transparent rounded-l-sm shadow-none"
                >
                  <svg
                    class="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>

                  <p class="ml-1.5 font-medium truncate">{{ currentPeriod }}</p>
                </div>
                <button
                  @click="showPeriods = !showPeriods"
                  type="button"
                  class="relative inline-flex items-center bg-white text-gray-900 p-2 rounded-l-none rounded-r-sm font-medium hover:bg-gray-200 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
                  aria-haspopup="listbox"
                  aria-expanded="true"
                  aria-labelledby="listbox-label"
                >
                  <span class="sr-only">{{ currentPeriod }}</span>
                  <!-- Heroicon name: solid/chevron-down -->
                  <svg
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <transition
              enter-active-class=""
              enter-class=""
              enter-to-class=""
              leave-active-class="transition ease-in duration-100"
              leave-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ul
                v-show="showPeriods"
                class="overflow-y-scroll h-64 z-40 origin-top-right absolute right-0 mt-2 w-48 rounded-sm shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none"
                tabindex="-1"
                role="listbox"
                aria-labelledby="listbox-label"
                aria-activedescendant="listbox-option-0"
              >
                <li
                  v-for="(per, idx) in periodList"
                  :key="idx"
                  class="w-full text-gray-900 cursor-default select-none relative text-sm"
                  id="listbox-option-0"
                  role="option"
                >
                  <button
                    @click="selectPeriod(per.value)"
                    class="w-full flex flex-col px-4 py-3 hover:bg-gray-50"
                  >
                    <div class="flex justify-between">
                      <p class="font-normal">{{ per.name }}</p>
                    </div>
                    <p v-if="per.description" class="text-gray-500 mt-2">
                      {{ per.description }}
                    </p>
                  </button>
                </li>
              </ul>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import BaseComponent from "@/components/shared/BaseComponent.vue";
import { Period } from "@/application/enums/app/common/Period";
import { Prop } from "vue-property-decorator";

@Component({
  components: {}
})
export default class PeriodSelect extends Vue {
  @Prop({ default: Period.ALL }) initialPeriod!: Period;
  public period: Period = Period.ALL;
  private periodList: any[] = [];
  private showPeriods: boolean = false;
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
      this.periodList.push({
        value: Number(key),
        name: this.$t("app.shared.periods." + Period[key]),
        description: this.$t(
          "app.shared.periods." + Period[key] + "_Description"
        )
          .toString()
          .toLowerCase()
      });
    });
  }
  mounted() {
    this.period = this.initialPeriod;
  }
  closeShowPeriods() {
    this.showPeriods = false;
  }
  selectPeriod(period: Period) {
    this.closeShowPeriods();
    this.period = period;
    this.$emit("selected", period);
  }
  get currentPeriod() {
    const period = this.periodList.find(f => f.value === this.period);
    return period?.name ?? "";
  }
}
</script>
