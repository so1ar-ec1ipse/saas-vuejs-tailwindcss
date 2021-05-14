<template>
  <div>
    <div class="shadow sm:rounded-sm">
      <div class="px-4 py-5 bg-white sm:p-6">
        <div class="grid grid-cols-6 gap-2">
          <div class="col-span-6 text-sm text-gray-800">
            <span
              class="flex justify-between text-sm leading-5 font-medium text-gray-700 mb-1"
            >
              {{ $t("settings.tenant.invoices.title") }}
              <div
                class="text-right block text-xs leading-5 font-medium text-theme-500 mb-1"
              >
                <span
                  v-if="upcomingInvoice && upcomingInvoice.created"
                  id="listbox-label"
                >
                  {{ $t("settings.tenant.subscription.upcomingInvoice") }}:
                  {{ invoiceDescription(upcomingInvoice) }}
                </span>

                <span v-else>{{
                  $t("settings.tenant.subscription.noUpcomingInvoices")
                }}</span>
              </div>
            </span>
          </div>
          <div class="col-span-6 text-sm text-gray-800">
            <div v-if="invoices">
              <div
                class="p-0 mb-3 border-b border-indigo-100"
                v-for="(invoice, index) in invoices"
                :key="index"
              >
                <a
                  :href="invoice.invoicePdf"
                  target="_blank"
                  type="button"
                  class="mb-2 mr-2 inline-flex items-center px-2.5 py-1.5 border text-xs leading-4 font-medium rounded-sm text-blue-700 bg-blue-50 border-blue-200 p-1 hover:bg-blue-200 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:bg-indigo-200 transition ease-in-out duration-150"
                  >{{ $t("shared.download") }}</a
                >
                <span class="text-xs">
                  <span v-if="invoice.lines && invoice.lines.length > 0">
                    {{ invoice.lines[0].description }}
                    {{
                      invoice.lines[0].planName
                        ? $t(
                            "marketing.pricing." + invoice.lines[0].planInterval
                          )
                        : ""
                    }}
                  </span>
                  {{ invoiceDescription(invoice) }}
                </span>
              </div>
            </div>
            <div v-else>
              {{ $t("settings.tenant.subscription.noInvoicesYet") }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../../../components/shared/BaseComponent.vue";
import { SubscriptionInvoiceDto } from "@/application/dtos/master/subscriptions/SubscriptionInvoiceDto";
import { filters } from "../../../../../plugins/filters";

@Component({
  components: {}
})
export default class TenantSubscriptionInvoices extends BaseComponent {
  private upcomingInvoice = {} as SubscriptionInvoiceDto;
  created() {
    const self = this;
    this.eventBus.$on("updated-plan", () => self.getUpcomingInvoice());
  }
  beforeDestroy() {
    this.eventBus.$off("updatedPlan");
  }
  mounted() {
    this.getUpcomingInvoice();
  }
  getUpcomingInvoice() {
    const self = this;
    this.services.subscriptionManager
      .getUpcomingInvoice()
      .then((response: SubscriptionInvoiceDto) => {
        self.upcomingInvoice = response;
      });
  }
  invoiceDescription(invoice: SubscriptionInvoiceDto) {
    if (invoice && invoice.created) {
      const date = new Date(invoice.created);
      return filters.dateLL("LL");
    }
    return "";
  }
  get invoices(): SubscriptionInvoiceDto[] | undefined {
    return this.$store.state.tenant?.subscription?.invoices ?? [];
  }
}
</script>
