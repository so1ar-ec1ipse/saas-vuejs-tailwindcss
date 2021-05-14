<template>
  <div>
    <span class>
      <button
        @click="adding = true"
        type="submit"
        class="mb-2 h-8 inline-flex items-center px-4 py-2 text-xs leading-5 font-medium rounded-sm text-white bg-gray-800 hover:bg-gray-700 focus:outline-shadow active:bg-indigo-900 transition duration-150 ease-in-out"
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
    <error-modal ref="errorModal"></error-modal>
    <success-modal ref="successModal"></success-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import EntityTableList from "@/components/shared/entities/EntityTableList.vue";
import EntityForm from "@/components/shared/entities/EntityForm.vue";
import { ColumnType } from "@/application/dtos/ColumnType";
import {
  columns,
  SubscriptionFeatureDto,
} from "@/application/dtos/master/subscriptions/SubscriptionFeatureDto";
import { SubscriptionProductDto } from "@/application/dtos/master/subscriptions/SubscriptionProductDto";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import LoadingButton from "@/components/shared/buttons/LoadingButton.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";

@Component({
  components: {
    SuccessModal,
    ErrorModal,
    EntityTableList,
    EntityForm,
  },
})
export default class FeaturesComponent extends BaseComponent {
  $refs!: {
    errorModal: ErrorModal;
    loadingButton: LoadingButton;
  };
  modelName: string = "subscriptionFeature";
  columns: ColumnType[] = columns;
  selected = null as any | null;
  adding: boolean = false;
  closeForm() {
    this.selected = null;
    this.adding = false;
  }
  edit(item: any) {
    this.selected = item;
  }
  onAdded(data: SubscriptionFeatureDto) {
    data.subscriptionProductId = this.parentProduct.id;
    this.services.subscriptionProducts
      .createFeature(data)
      .then((response: SubscriptionFeatureDto) => {
        this.parentProduct.features.push(response);
        this.selected = null;
        this.closeForm();
      })
      .catch((error) => {
        this.$refs.errorModal.show(error);
      });
  }
  onSaved(data: SubscriptionFeatureDto) {
    this.services.subscriptionProducts
      .updateFeature(data.id, data)
      .then((response: SubscriptionFeatureDto) => {
        const idx = this.items.findIndex((f) => f.id === data.id);
        this.items[idx] = response;
        this.closeForm();
      })
      .catch((error) => {
        this.$refs.errorModal.show(error);
      });
  }
  onDeleted(data: SubscriptionFeatureDto) {
    this.services.subscriptionProducts
      .deleteFeature(data.id)
      .then((response) => {
        this.parentProduct.features = this.items.filter(
          (f) => f.id !== data.id
        );
        this.closeForm();
      })
      .catch((error) => {
        this.$refs.errorModal.show(error);
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
