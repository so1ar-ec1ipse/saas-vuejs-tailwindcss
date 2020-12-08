<template>
  <div>
    <div>
      <div
        class="flex items-center justify-between bg-white -m-4 sm:-m-8 p-8 pb-4 shadow-lg mb-4"
      >
        <div class="flex-1 min-w-0">
          <h2
            class="flex text-2xl font-bold text-gray-800 sm:text-3xl leading-9 sm:truncate"
          >
            {{ $t("models.tenant.plural") }}
          </h2>
        </div>
        <div class="mt-0 flex lg:mt-0 lg:ml-4">
          <span class="hidden sm:block ml-3 shadow-sm rounded-sm">
            <button
              @click="reload"
              type="button"
              class="h-8 inline-flex items-center px-4 py-2 border border-gray-300 text-xs leading-5 font-medium rounded-sm text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-theme-900 active:bg-gray-50 active:text-theme-900 transition duration-150 ease-in-out"
            >
              <i class="fa fa-redo -ml-1 mr-2 h-5 w-5 text-gray-500"></i>
              {{ $t("shared.reload") }}
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="flex flex-col mt-4 sm:mt-12 -mx-8">
      <div
        class="shadow overflow-scroll border-b border-gray-200 sm:rounded-sm"
      >
        <div v-if="loading">
          <table-row-skeleton></table-row-skeleton>
          <table-row-skeleton></table-row-skeleton>
          <table-row-skeleton></table-row-skeleton>
        </div>
        <table v-else class="min-w-full divide-y divide-gray-200 ">
          <thead>
            <tr>
              <th
                class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ $t("models.tenant.name") }}
              </th>
              <!-- <th
                class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
              >{{ $t("models.tenant.domain") }}</th>
              <th
                class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
              >{{ $t("models.tenant.subdomain") }}</th>-->
              <th
                class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ $t("models.tenant.icon") }}
              </th>
              <th
                class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ $t("models.tenant.logo") }}
              </th>
              <th
                class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ $t("models.tenant.logoDarkmode") }}
              </th>
              <th
                class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ $t("models.tenant.appTheme") }}
              </th>
              <th
                class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ $t("models.tenant.appColor") }}
              </th>

              <th
                class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ $t("models.user.plural") }}
              </th>

              <th
                class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ $t("models.tenant.subscription") }}
              </th>

              <!-- <th
                class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
              </th> -->
              <!-- <th
                class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
              >{{ $t("shared.status") }}</th>-->
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(item, index) in orderedItems" :key="index">
              <!-- <td
                @click.prevent="changeTenant(item)"
                class="truncate px-6 py-4 text-sm leading-3 font-medium text-theme-800 hover:text-theme-700 cursor-pointer"
              >{{ item.name }}</td>-->

              <td
                class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
              >
                {{ item.name }}
              </td>
              <!-- <td
                class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
              >{{ item.domain }}</td>
              <td
                class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
              >{{ item.subdomain }}</td>-->
              <td
                class="truncate px-6 py-4  text-center text-sm leading-3 font-medium text-gray-900"
              >
                <img
                  v-if="item.icon"
                  class="h-8 w-8 rounded-sm max-h-8"
                  :src="item.icon"
                  @click="selectImage(item.icon, false)"
                />
                <span
                  v-else
                  class="inline-flex items-center justify-center h-8 w-8 rounded-sm bg-gray-500 shadow-xl"
                >
                  <span class="text-sm font-medium leading-none text-white">{{
                    "?"
                  }}</span>
                </span>
              </td>
              <td
                class="truncate px-6 py-4  text-center text-sm leading-3 font-medium text-gray-900"
              >
                <img
                  v-if="item.logo"
                  class="h-auto rounded-sm max-h-8"
                  :src="item.logo"
                  @click="selectImage(item.logo, false)"
                />
                <span
                  v-else
                  class="inline-flex items-center justify-center h-8 w-20"
                >
                  <span
                    class="text-sm font-medium leading-none text-gray-800"
                  ></span>
                </span>
              </td>
              <td
                class="truncate px-6 py-4 text-center text-sm leading-3 font-medium text-gray-900 bg-gray-800"
              >
                <img
                  v-if="item.logoDarkmode"
                  class="h-auto rounded-sm max-h-8"
                  :src="item.logoDarkmode"
                  @click="selectImage(item.logoDarkmode, true)"
                />
                <span
                  v-else
                  class="inline-flex items-center justify-centerh-8 w-20"
                >
                  <span
                    class="text-sm font-medium leading-none text-white"
                  ></span>
                </span>
              </td>
              <td
                class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
              >
                <span
                  class="inline-flex items-center justify-center h-8 w-8 rounded-sm shadow-xl"
                  :class="appTheme(item)"
                >
                  <span
                    class="text-sm font-medium leading-none text-white"
                  ></span>
                </span>
              </td>
              <td
                class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
              >
                <span
                  class="inline-flex items-center justify-center h-8 w-8 rounded-sm shadow-xl"
                  :class="appColor(item)"
                >
                  <span
                    class="text-sm font-medium leading-none text-white"
                  ></span>
                </span>
              </td>

              <td
                class="pr-5 py-4 whitespace-no-wrap text-right text-sm leading-3 font-medium"
              >
                <span v-if="item && item.users">
                  {{ item.users.length }}
                </span>
                <span v-else>
                  0
                </span>
                <!-- <router-link
                  :to="{
                    path: '/admin/users/' + item.id,
                  }"
                  class="text-theme-600 hover:text-theme-900"
                  >{{ $t("models.user.plural") }}</router-link
                > -->
              </td>
              <td
                class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
              >
                <div v-if="item.products && item.products.length">
                  {{
                    item.products
                      .map((f) => f.subscriptionProduct.title)
                      .join(", ")
                  }}
                </div>
              </td>
              <!-- <td
                class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
              >
                {{ item.id }}
              </td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <modal ref="image-modal" class="bg-primary">
      <div
        class="rounded-lg pb-4 pt-4"
        :class="selectedImageIsDarkMode ? 'bg-gray-800' : 'bg-gray-100'"
      >
        <img :src="selectedImage" class="w-64 h-auto mx-auto" />
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import BaseComponent from "../../components/shared/BaseComponent.vue";
import TenantMembers from "@/components/app/settings/tenant/TenantMembers.vue";
import Modal from "@/components/shared/modals/Modal.vue";
import TableRowSkeleton from "@/components/shared/skeletons/TableRowSkeleton.vue";
import { TenantDto } from "../../application/dtos/master/tenants/TenantDto";

@Component({ components: { TenantMembers, Modal, TableRowSkeleton } })
export default class TenantsComponent extends BaseComponent {
  private tenants?: TenantDto[] = [];
  private selectedImage: string = "";
  private selectedImageIsDarkMode: boolean = false;
  mounted() {
    this.reload();
  }
  async reload() {
    this.loading = true;
    this.tenants = [];
    this.services.tenants
      .adminGetAll()
      .then((response: TenantDto[]) => {
        this.tenants = response;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.loading = false;
      });
  }
  selectTenant(tenant: TenantDto) {
    this.$router.push("/admin/users/" + tenant.id);
  }
  changeTenant(tenant: TenantDto) {
    this.services.users
      .updateDefaultTenant(tenant.id ?? "")
      .then((response: TenantDto) => {
        this.$store.commit("tenant/current", response);
        this.$router.push("/app");
      });
  }
  selectImage(image, isDarkmode) {
    this.selectedImage = image;
    this.selectedImageIsDarkMode = isDarkmode;
    // @ts-ignore
    this.$refs["image-modal"].show();
  }
  appTheme(tenant: TenantDto) {
    let theme: string = process.env.VUE_APP_THEME?.toString() || "";
    if (tenant.appTheme) {
      theme = tenant.appTheme;
    }
    return theme === "theme-bg-dark" ? "bg-gray-800" : "bg-gray-100";
  }
  appColor(tenant: TenantDto) {
    let color: string = process?.env?.VUE_APP_COLOR?.toString() || "";
    if (tenant.appColor) {
      color = tenant.appColor;
    }
    const current = color?.replace("theme", "");
    return "bg" + current + "-500";
  }
  avatarText(tenant: TenantDto) {
    if (tenant) {
      return tenant.name.substring(0, 2).toUpperCase();
    }
    return "";
  }
  stripeUrl() {
    return process.env.NODE_ENV === "production"
      ? "https://dashboard.stripe.com"
      : "https://dashboard.stripe.com/test";
  }
  customerLink(tenant: TenantDto) {
    return this.stripeUrl() + "/customers/" + tenant.subscriptionCustomerId;
  }
  subscriptionOrProductLink(tenant: TenantDto) {
    if (
      tenant.subscriptionPlanId &&
      tenant.subscriptionPlanId.includes("sub_")
    ) {
      return this.stripeUrl() + "/subscriptions/" + tenant.subscriptionPlanId;
    } else {
      return this.stripeUrl() + "/payments/" + tenant.subscriptionPlanId;
    }
  }
  get orderedItems(): TenantDto[] {
    if (!this.tenants) {
      return [];
    }
    return this.tenants.sort((x, y) => {
      return x.name > y.name ? -1 : 1;
    });
  }
}
</script>
