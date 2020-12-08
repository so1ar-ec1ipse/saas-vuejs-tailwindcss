<template>
  <!-- TODO
    1. Rename 'CHANGE_MODEL_NAME' to yourModel (used in app.json models language configuration [src/locale])
    2. Rename 'CHANGE_MODEL_TYPE' to YourModel (a TypeScript class or interface [src/app/models])
    3. Rename 'CHANGE_SERVICE_NAME' to yourModels (your http client for this model [src/services])
    4. Configure 'private columns: ColumnType' to show on list
    5. If you get error on this.services or this.loading, fix relative paths of '/app/models/ColumnType' and 'components/shared/BaseComponent.vue'
        Example -> '../../../components...' instead of '@/components...'

    Example:
        MODEL_NAME -> transaction
        TYPE -> Transaction
        SERVICE_NAME -> transactions
  -->
  <div>
    <page-title>
      <template v-slot:title>{{ $t("models.transaction.plural") }}</template>
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
        <div v-if="items.length === 0">
          <div
            class="max-w-md mx-auto border-2 border-gray-100 px-4 lg:px-10 flex justify-center py-4 md:py-8 lg:py-12 rounded-lg"
          >
            <div class="text-center flex flex-col justify-center">
              <SvgTransactionsEmpty></SvgTransactionsEmpty>
              <button
                @click="adding = true"
                class="text-center px-4 py-2 border border-transparent text-sm leading-3 font-medium rounded-sm text-white bg-theme-600 hover:bg-theme-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-700 active:bg-theme-700 transition duration-150 ease-in-out"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="plus"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  class="md:relative mr-2 svg-inline--fa fa-plus fa-w-14 fa-sm"
                  style="bottom: 1px"
                >
                  <path
                    fill="currentColor"
                    d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                    class
                  />
                </svg>
                {{ $t("models.shared.createTheFirst") }}
                {{ $t("models.transaction.object") }}
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          <entity-table-list
            :modelName="modelName"
            :parentRoute="$route.path"
            :columns="columns"
            :items="items"
            :allowEdit="true"
            v-on:edit="edit"
          ></entity-table-list>
        </div>
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
import { TransactionDto } from "../../../application/dtos/app/transactions/TransactionDto";
import SvgTransactionsEmpty from "../../../assets/img/transactionsEmpty.vue";

@Component({
  components: { PageTitle, EntityTableList, EntityForm, SvgTransactionsEmpty },
})
export default class TransactionListComponent extends BaseComponent {
  private modelName: string = "transaction";
  private columns: ColumnType[] = [
    { name: "description" },
    { name: "quantity", valueType: ValueType.Number },
    { name: "price", valueType: ValueType.Number },
    { name: "amount", valueType: ValueType.Number, cannotEdit: true },
    { name: "date", valueType: ValueType.Date },
    { name: "category" },
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
    this.services.transactions
      .getAll()
      .then((response: TransactionDto[]) => {
        this.items = response;
      })
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
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
  added(data: TransactionDto) {
    console.log("added");
    this.services.transactions
      .create(data)
      .then((response) => {
        // @ts-ignore
        this.items.push(response);
        this.selected = null;
        this.closeForm(true);
      })
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      });
  }
  saved(data: TransactionDto) {
    console.log("saved");
    this.services.transactions
      .update(data.id, data)
      .then((response) => {
        // @ts-ignore
        const idx = this.items.findIndex((f) => f.id === data.id);
        console.log(`updating idx ${idx}: id${data.id}`);
        this.items[idx] = response;
        this.closeForm(true);
      })
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      });
  }
  deleted(data: TransactionDto) {
    console.log("deleted");
    this.services.transactions
      .delete(data.id)
      .then((response) => {
        // @ts-ignore
        this.items = this.items.filter((f) => f.id !== data.id);
        this.closeForm(true);
      })
      .catch((error) => {
        // @ts-ignore
        this.$refs["error-modal"].show(error);
      });
  }
  canceled() {
    console.log("canceled");
    this.closeForm();
  }
}
</script>
