<template>
  <div>
    <span class>
      <button
        @click="adding = true"
        type="submit"
        class="mb-2 h-8 inline-flex items-center px-4 py-2 text-xs leading-5 font-medium rounded-sm text-white bg-gray-800 hover:bg-gray-700 focus:outline-shadow active:bg-indigo-900 transition duration-150 ease-in-out"
      >
        {{ $t("shared.new") + " " + $t("models.subscriptionPrice.object") }}
      </button>
    </span>
    <entity-table-list
      :modelName="modelName"
      :parentRoute="$route.path"
      routeName="prices"
      :columns="columns"
      :items="items"
      :allowEdit="true"
      v-on:edit="edit"
    ></entity-table-list>
    <entity-form
      v-if="selected != null"
      :modelName="modelName"
      :object="selected"
      :columns="columns"
      v-on:saved="onSaved"
      v-on:deleted="onDeleted"
      v-on:canceled="onCanceled"
    ></entity-form>
    <entity-form
      v-if="adding"
      :modelName="modelName"
      :columns="columns"
      v-on:added="onAdded"
      v-on:canceled="onCanceled"
    ></entity-form>
    <error-modal ref="errorModal"></error-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import EntityTableList from "@/components/shared/entities/EntityTableList.vue";
import EntityForm from "@/components/shared/entities/EntityForm.vue";
import { ColumnType } from "../../../application/dtos/ColumnType";
import {
  columns,
  SubscriptionPriceDto,
} from "../../../application/dtos/master/subscriptions/SubscriptionPriceDto";
import { SubscriptionProductDto } from "../../../application/dtos/master/subscriptions/SubscriptionProductDto";
import ErrorModalComponent from "@/components/shared/modals/NewErrorModal.vue";

@Component({
  components: {
    EntityTableList,
    EntityForm,
  },
})
export default class PricesComponent extends BaseComponent {
  $refs!: {
    errorModal: ErrorModalComponent;
  };
  modelName: string = "subscriptionPrice";
  columns: ColumnType[] = columns;
  selected = null as any | null;
  adding: boolean = false;
  closeForm(hasChanges = false) {
    this.selected = null;
    this.adding = false;
    // if (hasChanges) {
    //
    //   this.$parent.hasChanges = true;
    // }
  }
  edit(item: any) {
    this.selected = item;
  }

  onAdded(data: SubscriptionPriceDto) {
    data.subscriptionProductId = this.parentProduct.id;
    this.services.subscriptionProducts
      .createPrice(data)
      .then((response: SubscriptionPriceDto) => {
        this.parentProduct.prices.push(response);
        this.selected = null;
        this.closeForm(true);
      })
      .catch((error) => {
        this.$refs.errorModal.show(error);
      });
  }
  onSaved(data: SubscriptionPriceDto) {
    this.services.subscriptionProducts
      .updatePrice(data.id, data)
      .then((response: SubscriptionPriceDto) => {
        const idx = this.items.findIndex((f) => f.id === data.id);
        this.items[idx] = response;
        this.closeForm(true);
      })
      .catch((error) => {
        this.$refs.errorModal.show(error);
      });
  }
  onDeleted(data: SubscriptionPriceDto) {
    this.services.subscriptionProducts
      .deletePrice(data.id)
      .then((response: SubscriptionPriceDto) => {
        this.parentProduct.prices = this.items.filter((f) => f.id !== data.id);
        this.closeForm(true);
      })
      .catch((error) => {
        this.$refs.errorModal.show(error);
      });
  }
  onCanceled() {
    console.log("canceled");
    this.closeForm();
  }
  get items(): SubscriptionPriceDto[] {
    return this.parentProduct.prices;
  }
  get parentProduct(): SubscriptionProductDto {
    // @ts-ignore
    return this.$parent.item as SubscriptionProductDto;
  }
}
</script>
