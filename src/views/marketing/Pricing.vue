<template>
  <div>
    <Header></Header>
    <section class="text-primary body-font overflow-hidden min-h-screen">
      <div class="container px-5 py-5 mx-auto">
        <div v-if="loading">
          <table-row-skeleton></table-row-skeleton>
          <table-row-skeleton></table-row-skeleton>
          <table-row-skeleton></table-row-skeleton>
        </div>
        <div v-else>
          <products></products>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../components/shared/BaseComponent.vue";
import Header from "@/components/marketing/Header.vue";
import Products from "../../components/marketing/pricing/Products.vue";
import TableRowSkeleton from "@/components/shared/skeletons/TableRowSkeleton.vue";
import Footer from "@/components/marketing/Footer.vue";

@Component({
  components: {
    Header,
    Products,
    TableRowSkeleton,
    Footer,
  },
})
export default class PricingComponent extends BaseComponent {
  mounted() {
    // @ts-ignore
    // if (this.$intercom) {
    //   // @ts-ignore
    //   // this.$intercom.show();
    // }
  }
}
</script>
