<template>
  <div>
    <div v-click-outside="closeDropDown">
      <label id="listbox-label" class="block text-sm font-medium text-gray-700">
        Categoría
      </label>
      <div class="mt-1 relative">
        <button
          :disabled="loading"
          @click="dropDown = !dropDown"
          type="button"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          class="relative w-full bg-white border border-gray-300 rounded-sm shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
        >
          <span v-if="loading" class="items-center block truncate">
            Cargando categorías...
          </span>
          <span v-else-if="selected > 0" class="flex items-center">
            <span v-if="selectedItem" class="block truncate">
              {{ selectedItem.name }}
            </span>
          </span>
          <span v-else-if="selected === 0" class="flex items-center">
            {{ $t("shared.all") }}
          </span>
          <span v-else class="flex items-center">
            {{ $t("shared.select") }}...
          </span>
          <span
            class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
          >
            <!-- Heroicon name: selector -->
            <svg
              class="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </button>

        <transition
          enter-active-class=""
          enter-class=""
          enter-to-class=""
          leave-active-class="transition ease-in duration-100"
          leave-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="dropDown"
            class="z-30 absolute mt-1 w-full rounded-sm bg-white shadow-lg"
          >
            <ul
              tabindex="-1"
              role="listbox"
              aria-labelledby="listbox-label"
              class="max-h-56 rounded-sm py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            >
              <button
                id="listbox-item-0"
                role="option"
                class="cursor-pointer select-none relative py-2 pl-3 pr-9 w-full hover:bg-gray-100"
                @click="select(0)"
              >
                <div class="flex items-center">
                  <span
                    class="ml-1 block truncate"
                    :class="selected === 0 ? 'font-semibold' : 'font-normal'"
                  >
                    {{ $t("shared.all") }}
                  </span>
                </div>

                <span
                  class="absolute inset-y-0 right-0 flex items-center pr-4"
                  :class="selected === 0 ? 'text-indigo-600' : 'text-white'"
                >
                  <!-- Heroicon name: check -->
                  <svg
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </button>
              <button
                v-for="(item, idx) in items"
                :key="idx"
                :id="'listbox-item-idx' + idx + 1"
                role="option"
                class="cursor-pointer select-none relative py-2 pl-3 pr-9 w-full hover:bg-gray-100"
                @click="select(idx + 1)"
              >
                <div class="flex items-center space-x-2">
                  <div
                    class="ml-1 block truncate"
                    :class="
                      selected === idx + 1 ? 'font-semibold' : 'font-normal'
                    "
                  >
                    {{ item.name }}
                  </div>
                  <div
                    class="bg-gray-100 rounded-full border border-gray-200 px-2"
                  >
                    {{ (item.incomeCount + item.expenseCount) | intFormat }}
                  </div>
                </div>

                <span
                  class="absolute inset-y-0 right-0 flex items-center pr-4"
                  :class="
                    selected === idx + 1 ? 'text-indigo-600' : 'text-white'
                  "
                >
                  <!-- Heroicon name: check -->
                  <svg
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </button>

              <!-- More items... -->
            </ul>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { SummaryCountTotalResponse } from "@/application/contracts/app/summaries/SummaryCountTotalResponse";
import services from "@/services";
import { SummaryCountTotalType } from "@/application/enums/app/transactions/SummaryCountTotalType";

@Component({
  components: {}
})
export default class CategorySelect extends Vue {
  @Prop() tenantId!: string;
  @Prop({ default: true }) selectAll!: boolean;
  @Prop({ default: "" }) preSelect!: string;
  public selected: number = -1;
  private dropDown: boolean = false;
  private items: SummaryCountTotalResponse[] = [];
  private loading: boolean = false;
  mounted() {
    this.loading = true;
    services.dashboard
      .getSummaryCountTotal(SummaryCountTotalType.CATEGORY)
      .then((response: SummaryCountTotalResponse[]) => {
        this.items = response;
        if (this.selectAll) {
          this.selected = 0;
        }
        if (this.preSelect) {
          this.preSelectValue(this.preSelect);
        }
      })
      .catch(() => {
        // ignore
      })
      .finally(() => {
        this.loading = false;
      });
  }
  preSelectValue(value: string) {
    const idx = this.items.findIndex(f => f.name === value);
    if (idx !== -1) {
      this.selected = idx + 1;
    }
  }
  select(idx) {
    this.selected = idx;
    this.dropDown = false;
    if (this.selectedItem) {
      this.$emit("selectItem", this.selectedItem.name);
    } else {
      this.$emit("selectAllItems");
    }
  }
  closeDropDown() {
    this.dropDown = false;
  }
  get selectedItem(): SummaryCountTotalResponse | undefined {
    if (this.selected > 0) {
      return this.items[this.selected - 1];
    }
  }
}
</script>
