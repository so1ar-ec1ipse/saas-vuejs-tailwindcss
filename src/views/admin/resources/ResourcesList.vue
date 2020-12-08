<template>
  <div>
    <page-title>
      <template v-slot:title>{{ $t("admin.resources.title") }}</template>
      <template v-slot:buttons>
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
        <span class="sm:ml-3 shadow-sm rounded-sm">
          <button
            @click="adding = true"
            class="h-8 inline-flex items-center px-4 py-2 border border-theme-200 text-xs leading-5 font-medium rounded-sm text-theme-700 bg-theme-100 hover:bg-theme-200 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out"
          >
            <i class="fa fa-plus -ml-1 mr-2 h-5 w-5 text-theme-700"></i>
            {{ $t("shared.new") }}
          </button>
        </span>
      </template>
    </page-title>
    <div class="mt-4 sm:mt-12">
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
          :allowEdit="true"
          v-on:edit="edit"
          v-on:downloadFile="downloadFile"
          v-on:uploadFile="uploadFile"
          :enableDownload="true"
          :enableUpload="true"
        ></entity-table-list>
      </div>
      <entity-form
        v-if="selected != null"
        v-on:added="added"
        v-on:saved="saved"
        v-on:deleted="deleted"
        v-on:canceled="canceled"
        :modelName="modelName"
        :object="selected"
        :columns="columns"
      ></entity-form>
      <entity-form
        v-if="adding"
        :modelName="modelName"
        :columns="columns"
        v-on:added="added"
        v-on:saved="saved"
        v-on:deleted="deleted"
        v-on:canceled="canceled"
      ></entity-form>
    </div>
    <error-modal ref="error-modal"></error-modal>
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
const fileDownload = require("js-file-download");

@Component({ components: { PageTitle, EntityTableList, EntityForm } })
export default class ResourcesListComponent extends BaseComponent {
  private modelName: string = "resource";
  private columns: ColumnType[] = [
    {
      name: "title",
    },
    {
      name: "description",
      valueType: ValueType.TextArea,
      optional: true,
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
  private selected = null as ResourceDto | null;
  private adding: boolean = false;
  private items: ResourceDto[] = [];
  mounted() {
    this.items = [];
    this.reload();
  }
  reload() {
    this.loading = true;
    this.services.resources
      .getAll()
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
  edit(item: ResourceDto) {
    this.selected = item;
  }
  downloadFile(item: ResourceDto, column: ColumnType) {
    this.services.resources
      .download(item.id)
      .then((response: any) => {
        const contentType: string = response.headers["content-type"];

        const fileUrl = window.URL.createObjectURL(
          new Blob([response.data], { type: contentType })
        );
        const fileLink = document.createElement("a");
        fileLink.href = fileUrl;
        fileLink.setAttribute("download", item.title);
        document.body.appendChild(fileLink);
        fileLink.click();
      })
      .catch((error) => {
        console.log("error: " + error);
        // @ts-ignore
        this.$refs["error-modal"].show(JSON.stringify(error));
      });
  }
  uploadFile(item: ResourceDto, fileList: any) {
    // console.log("uploadFile: " + fileList);
    const files: FormData = new FormData();
    files.append("file", fileList[0], fileList[0].name);
    this.services.resources
      .upload(files, item.id)
      .then((response: any) => {
        // console.log("uploaded");
        item.hasFile = true;
      })
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      });
  }
  added(data: ResourceDto) {
    // console.log("added");
    this.services.resources.create(data).then((response: ResourceDto) => {
      // @ts-ignore
      this.items.push(response);
      this.selected = null;
      this.closeForm(true);
    });
  }
  saved(data: ResourceDto) {
    // console.log("saved");
    this.services.resources.update(data.id, data).then((response) => {
      // @ts-ignore
      const idx = this.items.findIndex((f) => f.id === data.id);
      this.items[idx] = data;
      this.closeForm(true);
    });
  }
  deleted(data: ResourceDto) {
    // console.log("deleted");
    this.services.resources.delete(data.id).then((response) => {
      // @ts-ignore
      this.items = this.items.filter((f) => f.id !== data.id);
      this.closeForm(true);
    });
  }
  canceled() {
    // console.log("canceled");
    this.closeForm();
  }
}
</script>
