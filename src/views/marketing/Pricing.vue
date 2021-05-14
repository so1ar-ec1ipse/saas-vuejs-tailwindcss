<template>
  <div class="bg-marketing">
    <Header></Header>
    <div class="pt-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:flex-col sm:align-center">
          <h1
            class="text-3xl md:text-4xl lg:text-4xl font-extrabold text-marketing text-center"
          >
            {{ $t("marketing.pricing.title") }}
          </h1>
        </div>
        <Products></Products>

        <!-- FAQs -->
        <Faq></Faq>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template> 

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../components/shared/BaseComponent.vue";
import Header from "@/components/marketing/Header.vue";
import Products from "../../components/marketing/pricing/Products.vue";
import TableRowSkeleton from "../../components/shared/skeletons/TableRowSkeleton.vue";
import Faq from "../../components/marketing/Faq.vue";
import Footer from "../../components/marketing/Footer.vue";
import { SubscriptionBillingPeriod } from "../../application/enums/master/subscriptions/SubscriptionBillingPeriod";
import { WhoInvoices } from "../../application/enums/app/cfdis/WhoInvoices";

@Component({
  components: {
    Header,
    Products,
    TableRowSkeleton,
    Faq,
    Footer
  }
})
export default class PricingComponent extends BaseComponent {
  mounted() {
    this.$store.commit(
      "pricing/billingPeriod",
      SubscriptionBillingPeriod.MONTHLY
    );
    this.$store.commit("pricing/mode", WhoInvoices.ADMIN);
  }
}
</script>
