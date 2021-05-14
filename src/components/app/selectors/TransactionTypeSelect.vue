<template>
  <div>
    <div v-click-outside="closeDropDown">
      <label id="listbox-label" class="block text-sm font-medium text-gray-700">
        Tipo
      </label>
      <div class="mt-1 relative">
        <button
          @click="dropDown = !dropDown"
          type="button"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          class="relative w-full bg-white border border-gray-300 rounded-sm shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
        >
          <span class="flex items-center" v-if="selected >= 0">
            <span class="w-full">
              <span v-if="selected === 0" class="block truncate">
                {{ $t("shared.all") }}
              </span>
              <span v-if="selected === 1" class="block truncate">
                {{ $t("models.ticket.plural") }}
              </span>
              <span v-if="selected === 2" class="block truncate">
                {{ $t("app.transactions.incomePlural") }}
              </span>
              <span v-if="selected === 3" class="block truncate">
                {{ $t("app.transactions.expensePlural") }}
              </span>
            </span>
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
            class="z-40 absolute mt-1 w-full rounded-sm bg-white shadow-lg"
          >
            <ul
              tabindex="-1"
              role="listbox"
              aria-labelledby="listbox-label"
              class="max-h-56 rounded-sm py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            >
              <button
                v-for="(item, idx) in items"
                :key="idx"
                :id="'listbox-item-idx' + idx"
                role="option"
                class="cursor-pointer select-none relative py-2 px-3 w-full hover:bg-gray-100 group"
                @click="select(idx)"
              >
                <div class="flex items-center justify-between">
                  <span v-if="idx === 0" class="block truncate">
                    {{ $t("shared.all") }}
                  </span>
                  <span
                    v-if="idx === 1"
                    class="block truncate group-hover:text-orange-700"
                  >
                    Tickets
                  </span>
                  <span
                    v-if="idx === 2"
                    class="block truncate group-hover:text-teal-700"
                  >
                    Ingresos
                  </span>
                  <span
                    v-if="idx === 3"
                    class="block truncate group-hover:text-red-700"
                  >
                    Egresos
                  </span>
                  <!-- <badge-ticket
                    v-else-if="idx === 1"
                    width="w-full"
                  ></badge-ticket>
                  <badge-income
                    v-if="idx === 2"
                    width="w-full"
                  ></badge-income>
                  <badge-expense v-if="idx === 3" width="w-full"></badge-expense> -->
                </div>

                <span
                  v-if="false"
                  class="absolute inset-y-0 right-0 flex items-center pr-4"
                  :class="selected === idx ? 'text-indigo-600' : 'text-white'"
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
import BadgeTicket from "../badges/BadgeTicket.vue";
import BadgeIncome from "../badges/BadgeIncome.vue";
import BadgeExpense from "../badges/BadgeExpense.vue";
import { GetTransactionOrTicketFilter } from "@/application/enums/app/transactions/GetTransactionOrTicketFilter";

@Component({
  components: {
    BadgeTicket,
    BadgeIncome,
    BadgeExpense
  }
})
export default class TransactionTypeSelect extends Vue {
  @Prop() tenantId!: string;
  @Prop({ default: true }) selectAll!: boolean;
  public selected: number = 0;
  private dropDown: boolean = false;
  private items: GetTransactionOrTicketFilter[] = [];
  mounted() {
    this.items = [
      GetTransactionOrTicketFilter.TICKETS_AND_TRANSACTIONS,
      GetTransactionOrTicketFilter.TICKETS,
      GetTransactionOrTicketFilter.INCOME,
      GetTransactionOrTicketFilter.EXPENSE
    ];
  }
  select(idx) {
    this.selected = idx;
    this.dropDown = false;
    this.$emit("selectType", this.items[this.selected]);
  }
  closeDropDown() {
    this.dropDown = false;
  }
  name(type: GetTransactionOrTicketFilter) {
    return GetTransactionOrTicketFilter[type];
  }
  get selectedType(): GetTransactionOrTicketFilter {
    return this.items[this.selected];
  }
}
</script>
