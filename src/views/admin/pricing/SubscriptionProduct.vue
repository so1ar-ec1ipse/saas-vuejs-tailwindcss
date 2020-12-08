<template>
  <div>
    <div v-if="loading">{{ $t("shared.loading") }}</div>
    <div v-else>
      <div v-if="item && item.id">
        <page-title>
          <template v-slot:title>{{ item.title }}</template>
          <template v-slot:buttons>
            <span class="sm:ml-3 shadow-sm rounded-sm">
              <router-link
                :to="'/admin/products/' + item.id + '/edit'"
                class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-sm text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
                >{{ $t("shared.edit") }}</router-link
              >
              <button
                v-if="hasChanges"
                @click="reload"
                class="ml-2 inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-sm text-gray-700 bg-yellow-100 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
              >
                {{ $t("shared.cancel") }}
              </button>
              <button
                v-if="hasChanges"
                @click="saveChanges"
                class="ml-2 inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-sm text-gray-700 bg-yellow-100 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
              >
                {{ $t("shared.saveChanges") }}
              </button>
            </span>
          </template>
        </page-title>

        <div class="hidden sm:block mb-3 mt-4 sm:mt-12">
          <nav class="flex">
            <!-- <router-link
              :to="{name: 'admin.product.overview', params: item.id}"
              class="px-3 py-2 font-medium text-sm leading-5 rounded-sm hover:text-gray-700"
              :class="
              $route.name === 'admin.product.overview'
                ? 'outline-none text-theme-700 bg-theme-100 border border-theme-200'
                : 'text-gray-500 hover:text-gray-700'
            "
            >{{$t("models.subscriptionProduct.object")}}</router-link>-->
            <router-link
              :to="{ name: 'admin.product.prices', params: item.id }"
              class="px-3 py-2 font-medium text-sm leading-5 rounded-sm hover:text-gray-700"
              :class="
                $route.name === 'admin.product.prices'
                  ? 'outline-none text-theme-700 bg-theme-100 border border-theme-200'
                  : 'text-gray-500 hover:text-gray-700'
              "
              >{{ $t("models.subscriptionPrice.plural") }}</router-link
            >
            <router-link
              :to="{ name: 'admin.product.features', params: item.id }"
              name="admin.product.features"
              class="px-3 py-2 font-medium text-sm leading-5 rounded-sm hover:text-gray-700"
              :class="
                $route.name === 'admin.product.features'
                  ? 'outline-none text-theme-700 bg-theme-100 border border-theme-200'
                  : 'text-gray-500 hover:text-gray-700'
              "
              >{{ $t("models.subscriptionFeature.plural") }}</router-link
            >
          </nav>
        </div>
      </div>
      <div v-else>{{ $t("shared.notFound") }}</div>
    </div>

    <div
      v-if="product"
      class="mt-6 bg-white shadow px-4 py-5 sm:rounded-sm sm:p-6 mb-4"
    >
      <div class="md:grid md:grid-cols-3 md:gap-2">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            {{ $t("models.subscriptionProduct.object") }}
          </h3>
          <p class="mt-1 text-sm leading-5 text-gray-500">
            {{ $t("models.subscriptionProduct.description") }}
          </p>
          <p>
            <img v-if="hasImage()" :src="getImage()" class="h-32 mt-4" />
          </p>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form action="#" method="POST">
            <div class="grid grid-cols-6 gap-2">
              <div
                class="col-span-6 md:col-span-6 lg:col-span-2"
                v-for="(column, idx) in columns"
                :key="idx"
              >
                <div v-if="column.name === 'image'">
                  <!-- <img :src="product[column.name]" class="h-16" /> -->
                </div>
                <div v-else>
                  <label
                    :for="column.name"
                    class="block text-sm font-medium leading-5 text-gray-700"
                    >{{
                      $t("models.subscriptionProduct." + column.name)
                    }}</label
                  >
                  <input
                    :type="isBool(column) ? 'checkbox' : ''"
                    v-model="product[column.name]"
                    :disabled="true"
                    :id="column.name"
                    class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <router-view></router-view>

    <success-modal ref="success-modal"></success-modal>
    <error-modal ref="error-modal"></error-modal>
    <!-- <confirm-modal ref="confirm-modal" v-on:yes="yes"></confirm-modal> -->
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import ConfirmModal from "@/components/shared/modals/ConfirmModal.vue";
import PageTitle from "../../../components/shared/navigation/PageTitle.vue";
import { adminRoutes } from "../../../router/adminRoutes";
import { Watch } from "vue-property-decorator";
import { SubscriptionProductDto } from "../../../application/dtos/master/subscriptions/SubscriptionProductDto";
import { ColumnType, ValueType } from "../../../application/dtos/ColumnType";

@Component({
  components: {
    SuccessModal,
    ErrorModal,
    ConfirmModal,
    PageTitle,
  },
})
export default class SubscriptionProductComponent extends BaseComponent {
  public product = {} as SubscriptionProductDto;
  public hasChanges: boolean = false;

  columns: ColumnType[] = [
    { name: "serviceId" },
    { name: "title" },
    { name: "description" },
    { name: "tier", valueType: ValueType.Number },
    { name: "badge", valueType: ValueType.String },
    { name: "active", valueType: ValueType.Bool },
    { name: "maxUsers", valueType: ValueType.Number },
    { name: "image", valueType: ValueType.Image },
  ];
  created() {
    const self = this;
    this.services.subscriptionProducts.getProducts(true, false);
  }
  added(data: SubscriptionProductDto) {
    this.reload();
  }
  saved(data: SubscriptionProductDto) {
    this.reload();
  }
  deleted(data: SubscriptionProductDto) {
    this.pushToParent();
  }
  @Watch("$route.params.id")
  productChanged(val: string, oldVal: string) {
    this.reload();
  }
  mounted() {
    this.reload();
    // this.$router.push({ name: "admin.product.overview" });
  }
  async reload() {
    this.loading = true;
    this.hasChanges = false;
    this.services.subscriptionProducts
      .getProduct(this.$route.params.id)
      .then((response: SubscriptionProductDto) => {
        this.product = response;
      })
      .finally(() => {
        this.loading = false;
      });
  }
  saveChanges() {
    if (!this.product.id) {
      this.services.subscriptionProducts
        .createProduct(this.product)
        .then((response) => {
          this.reload();
        })
        .catch((error) => {
          // @ts-ignore
          this.$refs["error-modal"].show(error);
        });
    } else {
      this.services.subscriptionProducts
        .updateProduct(this.product.id, {
          id: this.product.id,
          tier: this.product.tier,
          title: this.product.title,
          description: this.product.description,
          badge: this.product.badge,
          active: this.product.active,
          image: this.product.image,
          maxUsers: this.product.maxUsers,
        })
        .then((response) => {
          this.reload();
        })
        .catch((error) => {
          // @ts-ignore
          this.$refs["error-modal"].show(error);
        });
    }
  }
  isBool(column: ColumnType) {
    return column.valueType === ValueType.Bool;
  }
  hasImage() {
    return this.columns.includes(
      (element: ColumnType) => element.valueType === ValueType.Image
    );
  }
  getImage() {
    return this.product.image;
  }
  get item() {
    return this.product;
  }
  //   get columns() {
  //     let modelColumns: ColumnType[] = [];
  //     Object.keys(this.product).forEach((key) => {
  //       modelColumns.push({
  //         name: key,
  //       });
  //     });
  //     return modelColumns;
  //   }
}
</script>
