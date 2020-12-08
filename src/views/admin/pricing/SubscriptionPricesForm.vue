<template>
  <div></div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import EntityForm from "@/components/shared/entities/EntityForm.vue";
import { ColumnType } from "../../../application/dtos/ColumnType";
import { columns, SubscriptionPriceDto } from "../../../application/dtos/master/subscriptions/SubscriptionPriceDto";

@Component({
  components: { EntityForm },
})
export default class PricesComponent extends BaseComponent {
  id!: string;
  columns: ColumnType[] = columns;
  mounted() {
    this.id = this.$route.params.id;
  }
  get() {
    return this.services.subscriptionProducts.getPrice(this.id);
  }
  post(model: SubscriptionPriceDto) {
    return model;
  }
  put(model: SubscriptionPriceDto) {
    return model;
  }
  delete() {
    return true;
  }
}
</script>
