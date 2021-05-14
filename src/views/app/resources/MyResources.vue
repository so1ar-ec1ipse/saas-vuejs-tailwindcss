<template>
  <div>
    <page-title>
      <template v-slot:title>{{ $t("admin.resources.title") }}</template>
      <template v-slot:buttons>
        <span class="hidden sm:block ml-3 rounded-sm">
          <button
            @click="reload"
            type="button"
            class="h-8 inline-flex items-center px-4 py-2 border border-gray-300 text-xs leading-5 font-medium rounded-sm text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-theme-900 active:bg-gray-50 active:text-theme-900 transition duration-150 ease-in-out"
          >
            <i class="fa fa-redo -ml-1 mr-2 h-5 w-5 text-gray-500"></i>
            {{ $t("shared.reload") }}
          </button>
        </span>
      </template>
    </page-title>

    <div class="mt-4 sm:mt-9">
      <div v-if="loading">
        <table-row-skeleton></table-row-skeleton>
        <table-row-skeleton></table-row-skeleton>
        <table-row-skeleton></table-row-skeleton>
      </div>
      <div v-else>
        <entity-table-list
          :modelName="modelName"
          :parentRoute="$route.path"
          routeName="resources"
          :columns="columns"
          :items="items"
          :allowEdit="false"
          v-on:edit="edit"
          v-on:downloadFile="downloadFile"
          :enableDownload="true"
          :enableUpload="false"
        ></entity-table-list>
      </div>
    </div>
    <error-modal ref="errorModal"></error-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import PageTitle from "@/components/shared/navigation/PageTitle.vue";
import EntityTableList from "@/components/shared/entities/EntityTableList.vue";
import EntityForm from "@/components/shared/entities/EntityForm.vue";
import { ColumnType, ValueType } from "../../../application/dtos/ColumnType";
import { ResourceDto } from "../../../application/dtos/master/common/ResourceDto";
import { SubscriptionProductDto } from "../../../application/dtos/master/subscriptions/SubscriptionProductDto";
import ErrorModalComponent from "@/components/shared/modals/NewErrorModal.vue";
const fileDownload = require("js-file-download");

@Component({ components: { PageTitle, EntityTableList, EntityForm } })
export default class ResourcesListComponent extends BaseComponent {
  $refs!: {
    errorModal: ErrorModalComponent;
  };
  private modelName: string = "resource";
  private columns: ColumnType[] = [
    {
      name: "title",
    },
    {
      name: "description",
    },
    {
      name: "tiers",
      valueType: ValueType.SubscriptionProducts,
    },
    {
      name: "roles",
      valueType: ValueType.TenantUserRoles,
    },
  ];
  private selected = null as any | null;
  private adding: boolean = false;
  private items: any = [];
  mounted() {
    this.items = [];
    this.reload();
  }
  reload() {
    this.loading = true;
    this.services.resources
      .getMyResources()
      .then((response: ResourceDto[]) => {
        this.items = response;
      })
      .finally(() => {
        this.loading = false;
      });
  }
  closeForm(hasChanges = false) {
    this.selected = null;
    this.adding = false;
    if (hasChanges) {
      // @ts-ignore
      this.$parent.hasChanges = true;
    }
  }
  edit(item: any) {
    this.selected = item;
  }
  downloadFile(item: any, column: ColumnType) {
    if (item.needsUpgrade) {
      try {
        const minimumTier = this.products.find((f) => f.tier === item.tiers[0]);

        this.$refs.errorModal.show(
          this.$t("shared.needsUpgrade") +
            ", " +
            this.$t("shared.atLeast") +
            " " +
            minimumTier?.title
        );
      } catch (e) {
        this.$refs.errorModal.show(this.$t("shared.needsUpgrade"));
      }
      return;
    } else if (item.needsPermission) {
      this.$refs.errorModal.show(this.$t("shared.needsPermission"));
      return;
    }

    this.services.resources
      .download(item.id)
      .then((response: any) => {
        const disposition = response.headers["content-disposition"];
        let fileName = "";

        if (disposition && disposition.indexOf("attachment") !== -1) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1]) {
            fileName = matches[1].replace(/['"]/g, "");
          }
        }
        const type: string = "application/zip";
        if (item.type.toString().toLowerCase() !== ".zip") {
          fileDownload(response.data, item.title + item.type);
          return;
        } else {
          const fileUrl = window.URL.createObjectURL(
            new Blob([response.data], { type })
          );
          const fileLink = document.createElement("a");
          fileLink.href = fileUrl;
          fileLink.setAttribute("download", item.title);
          document.body.appendChild(fileLink);
          fileLink.click();
        }
      })
      .catch((error) => {
        this.$refs.errorModal.show(error);
      });
  }
  uploadFile(item: any, fileList: any) {
    // console.log("uploadFile: " + fileList);
    const files: FormData = new FormData();
    files.append("file", fileList[0], fileList[0].name);
    this.services.resources
      .upload(files, item.id)
      .then((response: any) => {
        // console.log("uploaded");
      })
      .catch((error) => {
        this.$refs.errorModal.show(error);
      });
  }
  added(data: any) {
    this.services.resources.create(data).then((response: any) => {
      this.items.push(response.data);
      this.selected = null;
      this.closeForm(true);
    });
  }
  saved(data: any) {
    // console.log("saved");
    this.services.resources.update(data.id, data).then((response) => {
      const idx = this.items.findIndex((f) => f.id === data.id);
      this.items[idx] = data;
      this.closeForm(true);
    });
  }
  deleted(data: any) {
    // console.log("deleted");
    this.services.resources.delete(data.id).then((response) => {
      this.items = this.items.filter((f) => f.id !== data.id);
      this.closeForm(true);
    });
  }
  canceled() {
    // console.log("canceled");
    this.closeForm();
  }
  get products(): SubscriptionProductDto[] {
    return this.$store.state.pricing.products as SubscriptionProductDto[];
  }
}
</script>
