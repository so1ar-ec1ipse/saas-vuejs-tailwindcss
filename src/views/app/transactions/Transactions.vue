<template>
  <div class="pt-2 pb-40 md:py-6 mx-auto px-4 sm:px-6 md:px-8">
    <object-list
      title="Transactions"
      routeNew="/app/transactions/new"
      v-on:reload="reload"
    >
      <template v-slot:table>
        <div v-if="loading">
          <table-row-skeleton></table-row-skeleton>
          <table-row-skeleton></table-row-skeleton>
          <table-row-skeleton></table-row-skeleton>
        </div>
        <div v-else>
          <div v-if="items.length === 0">
            <div
              class="max-w-md mx-auto border-2 border-gray-100 px-4 lg:px-10 flex justify-center py-4 md:py-8 lg:py-12 rounded-sm"
            >
              <div class="text-center flex flex-col justify-center">
                <SvgResultsEmpty></SvgResultsEmpty>
                <router-link
                  :to="{ name: 'app.transactions.new' }"
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
                  {{
                    $t("models.transaction.object")
                      .toString()
                      .toLowerCase()
                  }}
                </router-link>
              </div>
            </div>
          </div>
          <div
            v-else
            class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-sm border-b border-gray-200"
          >
            <!-- Billing history -->
            <section aria-labelledby="billing_history_heading">
              <div
                class="bg-white pt-6 shadow sm:rounded-sm sm:overflow-hidden"
              >
                <div class="px-4 sm:px-6">
                  <h2
                    id="billing_history_heading"
                    class="text-lg leading-6 font-medium text-gray-900"
                  >
                    Billing history
                  </h2>
                </div>
                <div class="mt-6 flex flex-col">
                  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div
                      class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
                    >
                      <div class="overflow-hidden border-t border-gray-200">
                        <table class="min-w-full divide-y divide-gray-300">
                          <thead>
                            <tr>
                              <!-- <th
                  class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                  </th>-->
                              <th
                                class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                              >
                                {{ $t("models.transaction.description") }}
                              </th>
                              <th
                                class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                              >
                                {{ $t("models.transaction.quantity") }}
                              </th>
                              <th
                                class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                              >
                                {{ $t("models.transaction.price") }}
                              </th>
                              <th
                                class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                              >
                                {{ $t("models.transaction.amount") }}
                              </th>
                              <th
                                class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                              >
                                {{ $t("models.transaction.category") }}
                              </th>
                              <th
                                class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                              >
                                {{ $t("models.transaction.date") }}
                              </th>
                              <th class="pr-5 py-2 bg-gray-50 w-10"></th>
                            </tr>
                          </thead>
                          <tbody class="bg-white divide-y divide-gray-200">
                            <span
                              v-for="(transaction, index) in orderedItems"
                              :key="index"
                            >
                              <tr
                                v-for="(item, idxDetail) in transaction.details"
                                :key="idxDetail"
                              >
                                <td
                                  class="truncate px-3 py-2 text-sm leading-3 font-medium text-gray-900"
                                >
                                  {{ item.description }}
                                </td>
                                <td
                                  class="px-6 py-4 whitespace-no-wrap text-sm leading-3 text-gray-500"
                                >
                                  {{ item.quantity }}
                                </td>
                                <td
                                  class="px-6 py-4 whitespace-no-wrap text-sm leading-3 text-gray-500"
                                >
                                  ${{ item.price | decimalFormat }}
                                </td>
                                <td
                                  class="px-6 py-4 whitespace-no-wrap text-sm leading-3 text-gray-500"
                                >
                                  ${{ calculateAmount(item) | decimalFormat }}
                                </td>
                                <td
                                  class="px-6 py-4 whitespace-no-wrap text-sm leading-3 text-gray-500"
                                >
                                  <span
                                    class="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium leading-4 bg-teal-50 text-teal-800"
                                    >{{ item.category }}</span
                                  >
                                </td>
                                <td
                                  class="px-6 py-4 whitespace-no-wrap text-sm leading-3 text-gray-500"
                                >
                                  {{ item.createdAt | dateLL }}
                                </td>

                                <td
                                  class="pr-5 py-4 whitespace-no-wrap text-right text-sm leading-3 font-medium"
                                >
                                  <router-link
                                    :to="{
                                      name: 'app.transactions.edit',
                                      params: { id: item.id }
                                    }"
                                    class="text-theme-600 hover:text-theme-900"
                                    >{{ $t("shared.edit") }}</router-link
                                  >
                                </td>
                              </tr>
                            </span>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </template>
    </object-list>

    <error-modal ref="errorModal"></error-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import ObjectList from "../../../components/shared/forms/ObjectList.vue";
import { report } from "process";
import TableRowSkeleton from "@/components/shared/skeletons/TableRowSkeleton.vue";
import { SignalService } from "../../../plugins/SignalR";
import { TransactionDto } from "../../../application/dtos/app/transactions/TransactionDto";
import SvgResultsEmpty from "../../../assets/img/ResultsEmpty.vue";
import ErrorModalComponent from "@/components/shared/modals/NewErrorModal.vue";
import { TransactionDetailDto } from "@/application/dtos/app/transactions/TransactionDetailDto";

@Component({
  components: { ObjectList, TableRowSkeleton, SvgResultsEmpty }
})
export default class Transactions extends BaseComponent {
  $refs!: {
    errorModal: ErrorModalComponent;
  };
  private items = [] as TransactionDto[];
  created() {
    const self = this;
    this.eventBus.$on("transaction-canceled", () => self.canceled());
    this.eventBus.$on("transaction-deleted", data => self.deleted(data));
    this.eventBus.$on("transaction-added", data => self.added(data));
    this.eventBus.$on("transaction-saved", data => self.saved(data));
  }
  destroy() {
    this.eventBus.$off("transaction-canceled");
    this.eventBus.$off("transaction-deleted");
    this.eventBus.$off("transaction-added");
    this.eventBus.$off("transaction-saved");
  }
  mounted() {
    this.reload();
  }
  async reload() {
    this.items = [];
    this.loading = true;
    this.services.transactions
      .getAll()
      .then((response: TransactionDto[]) => {
        this.items = response;
      })
      .catch(error => {
        this.$refs.errorModal.show(error);
      })
      .finally(() => {
        this.loading = false;
      });
  }
  deleted(data: TransactionDto) {
    this.items = this.items.filter(f => f.id !== data.id);
  }
  canceled() {
    // console.log("canceled");
  }
  added(data: TransactionDto) {
    // console.log("added data:" + JSON.stringify(data));
    this.items.push(data);
    // SignalService.invoke(
    //   "AddTransaction",
    //   this.$store.state.tenant.current.id,
    //   data
    // );
  }
  saved(data: TransactionDto) {
    const idx = this.items.findIndex(f => f.id === data.id);
    this.items[idx] = data;
  }
  calculateAmount(item: TransactionDetailDto) {
    return item.price * item.quantity;
  }
  get orderedItems(): TransactionDto[] {
    if (!this.items) {
      return [];
    }
    return this.items.sort((x, y) => {
      if (x.createdAt && y.createdAt) {
        return (x.createdAt > y.createdAt ? -1 : 1) ?? 1;
      }
      return 1;
    });
  }
}
</script>
