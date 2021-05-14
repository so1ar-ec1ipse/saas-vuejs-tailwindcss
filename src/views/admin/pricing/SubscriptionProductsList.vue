<template>
  <div class="pt-2 pb-40 md:py-6 mx-auto px-4 sm:px-6 md:px-8">
    <object-list
      :title="$t('admin.pricing.title')"
      routeNew="products/new"
      v-on:reload="reload(true)"
      :allowDownload="false"
    >
      <template v-slot:extraButtons>
        <span class="hidden sm:block rounded-sm mr-0">
          <router-link
            :to="{ name: 'prices' }"
            target="_blank"
            class="h-8 inline-flex items-center px-4 py-2 border border-yellow-200 text-xs leading-5 font-medium rounded-sm text-gray-700 bg-yellow-50 hover:text-yellow-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-theme-900 active:bg-gray-50 active:text-theme-900 transition duration-150 ease-in-out"
          >
            <i class="fa fa-eye -ml-1 mr-2 h-5 w-5 text-yellow-900"></i>
            {{ $t("admin.pricing.goToPricingPage") }}
          </router-link>
        </span>
      </template>
      <template v-slot:table>
        <div v-if="loading">
          <table-row-skeleton></table-row-skeleton>
          <table-row-skeleton></table-row-skeleton>
          <table-row-skeleton></table-row-skeleton>
        </div>
        <div v-else>
          <div v-if="!items || items.length === 0">
            <div>{{ $t("") }}</div>
          </div>
          <div v-else>
            <div>
              <div
                class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-sm border-b border-gray-200"
              >
                <div
                  v-if="!fromServer"
                  class="bg-yellow-50 mb-2 rounded-sm border border-yellow-300 min-w-full"
                >
                  <div class="rounded-sm bg-yellow-50 p-4">
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <svg
                          class="h-5 w-5 text-yellow-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>

                      <div class="ml-3">
                        <h3
                          class="text-sm leading-5 font-medium text-yellow-800"
                        >
                          {{ $t("shared.warning") }}
                        </h3>
                        <div class="mt-2 text-sm leading-5 text-yellow-700">
                          <p>
                            {{ $t("admin.pricing.thesePricesAreFromFiles") }}
                            {{ pricingFile }}
                          </p>
                        </div>
                        <div class="text-sm leading-5 right-0 -ml-3 mt-2">
                          <span class="inline-flex rounded-sm ml-2">
                            <button
                              @click="generateFromFiles"
                              class="ml-1 h-8 inline-flex items-center px-4 py-2 border border-orange-200 text-xs leading-5 font-medium rounded-sm text-orange-700 bg-orange-100 hover:bg-orange-200 focus:outline-none focus:shadow-outline-indigo focus:border-theme-700 active:bg-theme-700 transition duration-150 ease-in-out"
                            >
                              {{ $t("admin.pricing.generateFromFiles") }}
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <table class="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {{ $t("models.subscriptionProduct.serviceId") }}
                      </th>
                      <th
                        class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {{ $t("models.subscriptionProduct.tier") }}
                      </th>
                      <th
                        class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {{ $t("models.subscriptionProduct.title") }}
                      </th>

                      <th
                        class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {{ $t("models.subscriptionProduct.badge") }}
                      </th>
                      <th
                        class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {{ $t("models.subscriptionProduct.active") }}
                      </th>
                      <th
                        class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {{ $t("models.subscriptionProduct.maxUsers") }}
                      </th>
                      <th
                        class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {{ $t("models.subscriptionPrice.plural") }}
                      </th>
                      <th
                        class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {{ $t("models.subscriptionFeature.plural") }}
                      </th>

                      <th class="pr-5 py-2 bg-gray-50 w-10"></th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(item, index) in orderedItems" :key="index">
                      <td
                        class="truncate px-3 py-2 text-sm leading-3 font-medium text-theme-700 hover:text-theme-600"
                      >
                        <router-link
                          v-if="item.id"
                          :to="'products/' + item.id"
                          >{{ item.serviceId }}</router-link
                        >
                      </td>
                      <td
                        class="truncate px-3 py-2 text-sm leading-3 font-medium text-gray-900"
                      >
                        {{ item.tier }}
                      </td>
                      <td
                        class="truncate px-3 py-2 text-sm leading-3 font-medium text-gray-900"
                      >
                        {{ item.title }}
                      </td>
                      <td
                        class="truncate px-3 py-2 text-sm leading-3 font-medium text-gray-900"
                      >
                        {{ item.badge }}
                      </td>
                      <td
                        class="truncate px-3 py-2 text-sm leading-3 font-medium text-gray-900"
                      >
                        <span
                          class="inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium leading-1"
                          :class="
                            item.active
                              ? 'bg-teal-50 text-teal-800 border border-teal-200'
                              : 'bg-rose-50 text-red-800 border border-red-200'
                          "
                          >{{ item.active ? "Active" : "Inactive" }}</span
                        >
                      </td>
                      <td
                        class="truncate px-3 py-2 text-sm leading-3 font-medium text-gray-900"
                      >
                        {{
                          !item.maxUsers || item.maxUsers === 0
                            ? $t("shared.unlimited")
                            : item.maxUsers
                        }}
                      </td>
                      <td
                        class="truncate px-3 py-2 text-sm leading-3 font-medium text-gray-900"
                      >
                        <router-link
                          v-if="fromServer"
                          :to="'products/' + item.id + '/prices'"
                          class="text-theme-500 hover:text-theme-300"
                          >{{ item.prices.length }}</router-link
                        >
                        <div v-else>{{ item.prices.length }}</div>
                      </td>
                      <td
                        class="truncate px-3 py-2 text-sm leading-3 font-medium text-gray-900"
                      >
                        <router-link
                          v-if="fromServer"
                          :to="'products/' + item.id + '/features'"
                          class="text-theme-500 hover:text-theme-300"
                          >{{ item.features.length }}</router-link
                        >
                        <div v-else>{{ item.features.length }}</div>
                      </td>
                      <td
                        class="pr-5 py-4 whitespace-no-wrap text-right text-sm leading-3 font-medium"
                      >
                        <router-link
                          v-if="fromServer"
                          :to="{
                            name: 'admin.product.edit',
                            params: { id: item.id }
                          }"
                          class="text-theme-600 hover:text-theme-900"
                          >{{ $t("shared.edit") }}</router-link
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
import Modal from "../../../components/shared/modals/Modal.vue";
import Products from "../../../components/marketing/pricing/Products.vue";
import { SubscriptionProductDto } from "../../../application/dtos/master/subscriptions/SubscriptionProductDto";
import ErrorModalComponent from "@/components/shared/modals/NewErrorModal.vue";

@Component({
  components: { Products, ObjectList, TableRowSkeleton, Modal }
})
export default class SubscriptionProductComponent extends BaseComponent {
  $refs!: {
    errorModal: ErrorModalComponent;
  };
  private items = [] as SubscriptionProductDto[];
  private fromServer: boolean = true;
  mounted() {
    this.reload(true);
  }
  async reload(fromServer: boolean) {
    this.fromServer = fromServer;
    this.items = [];
    this.loading = true;
    this.services.subscriptionProducts
      .getProducts(fromServer, false)
      .then((response: SubscriptionProductDto[]) => {
        this.items = [];
        response.forEach(product => {
          this.items.push(product);
        });
        if (response.length === 0 && this.fromServer) {
          this.reload(false);
        }
      })
      .catch(error => {
        this.$refs.errorModal.show(error);
      })
      .finally(() => {
        this.loading = false;
      });
  }
  added(data: SubscriptionProductDto) {
    this.items.push(data);
  }
  saved(data: SubscriptionProductDto) {
    const idx = this.items.findIndex(f => f.id === data.id);
    this.items[idx] = data;
  }
  deleted(data: SubscriptionProductDto) {
    this.items = this.items.filter(f => f.id !== data.id);
  }
  async generateFromFiles() {
    await this.items.forEach(product => {
      this.services.subscriptionProducts
        .createProduct(product)
        .then(response => {
          this.reload(true);
        })
        .catch(error => {
          this.$refs.errorModal.show(error);
        });
    });
  }
  get pricingFile() {
    return "ClientApp/src/store/modules/pricing/default-pricing.ts";
  }
  get orderedItems() {
    if (!this.items) {
      return [];
    }
    return this.items.sort((x, y) => {
      return x?.tier > y?.tier ? 1 : -1;
    });
  }
}
</script>
