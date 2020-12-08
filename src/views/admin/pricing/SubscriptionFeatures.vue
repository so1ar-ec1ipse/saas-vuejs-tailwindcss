<template>
  <div>
    <span class>
      <button
        @click="adding = true"
        type="submit"
        class="mb-2 h-8 inline-flex items-center px-4 py-2 border border-theme-200 text-xs leading-5 font-medium rounded-sm text-theme-700 bg-theme-100 hover:bg-theme-200 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out"
      >
        {{ $t("shared.new") + " " + $t("models.subscriptionFeature.object") }}
      </button>
    </span>
    <entity-table-list
      :modelName="modelName"
      :parentRoute="$route.path"
      routeName="features"
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
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import EntityTableList from "@/components/shared/entities/EntityTableList.vue";
import EntityForm from "@/components/shared/entities/EntityForm.vue";
import { ColumnType } from "../../../application/dtos/ColumnType";
import {
  columns,
  SubscriptionFeatureDto,
} from "../../../application/dtos/master/subscriptions/SubscriptionFeatureDto";
import { SubscriptionProductDto } from "../../../application/dtos/master/subscriptions/SubscriptionProductDto";

@Component({
  components: {
    EntityTableList,
    EntityForm,
  },
})
export default class FeaturesComponent extends BaseComponent {
  modelName: string = "subscriptionFeature";
  columns: ColumnType[] = columns;
  selected = null as any | null;
  adding: boolean = false;
  closeForm(hasChanges = false) {
    this.selected = null;
    this.adding = false;
    // if (hasChanges) {
    //   // @ts-ignore
    //   this.$parent.hasChanges = true;
    // }
  }
  edit(item: any) {
    this.selected = item;
  }
  onAdded(data: SubscriptionFeatureDto) {
    data.subscriptionProductId = this.parentProduct.id;
    this.services.subscriptionProducts
      .createFeature(data)
      .then((response: SubscriptionFeatureDto) => {
        // @ts-ignore
        this.parentProduct.features.push(response);
        this.selected = null;
        this.closeForm(true);
      })
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      });
  }
  onSaved(data: SubscriptionFeatureDto) {
    this.services.subscriptionProducts
      .updateFeature(data.id, data)
      .then((response: SubscriptionFeatureDto) => {
        // @ts-ignore
        const idx = this.items.findIndex((f) => f.id === data.id);
        this.items[idx] = response;
        this.closeForm(true);
      })
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      });
  }
  onDeleted(data: SubscriptionFeatureDto) {
    this.services.subscriptionProducts
      .deleteFeature(data.id)
      .then((response) => {
        // @ts-ignore
        this.parentProduct.features = this.items.filter(
          (f) => f.id !== data.id
        );
        this.closeForm(true);
      })
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      });
  }
  onCanceled() {
    this.closeForm();
  }
  get items(): SubscriptionFeatureDto[] {
    return this.parentProduct.features;
  }
  get parentProduct(): SubscriptionProductDto {
    // @ts-ignore
    return this.$parent.item as SubscriptionProductDto;
  }
}
</script>
