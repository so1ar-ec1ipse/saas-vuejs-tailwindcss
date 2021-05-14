<template>
  <div>
    <side-modal
      v-on:close="cancel"
      :title="!editing ? 'New transaction' : 'Edit transaction'"
    >
      <template v-slot:content>
        <form @submit="save">
          <vue-form-generator
            :disabled="disabled"
            ref="vfg"
            :schema="schema"
            :model="model"
            :options="formOptions"
          ></vue-form-generator>
        </form>
        <!-- {{ JSON.stringify(model) }} -->
      </template>
      <template v-slot:footer>
        <span class="inline-flex rounded-sm shadow-sm">
          <button
            v-if="editing"
            @click="remove"
            type="button"
            class="h-8 inline-flex items-center px-4 py-2 text-xs leading-5 font-medium rounded-sm text-red-800 bg-rose-50 hover:text-red-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-theme-900 active:bg-gray-50 active:text-theme-900 transition duration-150 ease-in-out"
          >
            {{ $t("shared.delete") }}
          </button>
          <button
            @click="cancel"
            type="button"
            class="ml-1 h-8 inline-flex items-center px-4 py-2 border border-gray-300 text-xs leading-5 font-medium rounded-sm text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-theme-900 active:bg-gray-50 active:text-theme-900 transition duration-150 ease-in-out"
          >
            {{ $t("shared.cancel") }}
          </button>
          <button
            :disabled="disabled"
            @click="save"
            type="submit"
            class="ml-1 h-8 inline-flex items-center px-4 py-2 text-xs leading-5 font-medium rounded-sm text-white bg-gray-800 hover:bg-gray-700 focus:outline-shadow active:bg-indigo-900 transition duration-150 ease-in-out"
          >
            {{ $t("shared.save") }}
          </button>
        </span>
      </template>
    </side-modal>
    <error-modal ref="errorModal"></error-modal>
    <confirm-modal ref="confirmSave" v-on:yes="yesSave"></confirm-modal>
    <confirm-modal ref="confirmRemove" v-on:yes="yesRemove"></confirm-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import ConfirmModal from "@/components/shared/modals/ConfirmModal.vue";
import SideModal from "@/components/shared/modals/SideModal.vue";
import VueFormGenerator, { validators } from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
import { Prop } from "vue-property-decorator";
import dateInput from "@/components/shared/forms/DateInput.vue";
import { TransactionDto } from "@/application/dtos/app/transactions/TransactionDto";
import ErrorModalComponent from "@/components/shared/modals/NewErrorModal.vue";
import ConfirmModalComponent from "@/components/shared/modals/ConfirmModal.vue";
Vue.component("fieldDateInput", dateInput);

@Component({
  components: {
    SuccessModal,
    ErrorModal,
    ConfirmModal,
    SideModal,
    "vue-form-generator": VueFormGenerator.component
  }
})
export default class TransactionForm extends BaseComponent {
  $refs!: {
    errorModal: ErrorModalComponent;
    confirmRemove: ConfirmModalComponent;
    confirmSave: ConfirmModalComponent;
    vfg: VueFormGenerator;
  };
  private editing: boolean = false;
  private isValid: boolean = false;
  private id: any = false;
  private model = {} as TransactionDto;
  private disabled: boolean = true;
  private categories: any = [];
  private schema: any = {
    fields: [
      {
        id: "description",
        type: "input",
        inputType: "text",
        label: "Description",
        model: "description",
        placeholder: "Product description",
        required: true,
        attributes: {
          autofocus: true
        },
        validator: validators.string
      },
      {
        id: "quantity",
        inputType: "number",
        type: "input",
        model: "quantity",
        label: "Quantity",
        placeholder: "Quantity",
        required: true,
        validator: validators.integer
      },
      {
        id: "price",
        inputType: "number",
        type: "input",
        model: "price",
        label: "Price",
        placeholder: "Price",
        required: true,
        validator: validators.double
      },
      {
        id: "category",
        type: "select",
        label: "Category",
        model: "category",
        placeholder: "Category",
        values: [],
        selectOptions: {
          noneSelectedText: "No seleccionado"
        }
      },
      {
        id: "date",
        type: "dateInput",
        label: "Date",
        model: "date",
        required: true,
        validator: validators.date
      },
      {
        id: "image",
        type: "image",
        label: "Image",
        model: "image",
        hideInput: true
      }
    ]
  };
  private formOptions: any = {
    validateAfterLoad: false,
    validateAfterChanged: true,
    validateAsync: true
  };
  mounted() {
    this.loadCategories();
    if (this.$route.params.id) {
      this.disabled = true;
      this.id = this.$route.params.id;
      this.editing = true;
      this.services.transactions
        .get(this.id)
        .then((response: TransactionDto) => {
          this.model = response;
          this.disabled = false;
        })
        .catch(() => {
          this.$router.push({ name: "app.transactions" });
        });
    } else {
      this.disabled = false;
    }
  }
  cancel() {
    this.eventBus.$emit("transaction-canceled");
    this.$router.push({ name: "app.transactions" });
  }
  save() {
    this.$refs.vfg.validate().then(errors => {
      if (errors && errors.length > 0) {
        this.$refs.errorModal.show(this.$t("shared.invalidForm"));
      } else {
        this.$refs.confirmSave.show(
          this.editing ? this.$t("shared.save?") : this.$t("shared.add?")
        );
      }
    });
  }
  yesSave() {
    if (this.editing) {
      this.services.transactions
        .update(this.model.id ?? "", this.model)
        .then(response => {
          this.eventBus.$emit("transaction-saved", this.model);
          this.$router.push({ name: "app.transactions" });
        })
        .catch(error => {
          this.$refs.errorModal.show(error);
        });
    } else {
      this.services.transactions
        .create(this.model)
        .then((response: TransactionDto) => {
          this.eventBus.$emit("transaction-added", response);
          this.$router.push({ name: "app.transactions" });
        })
        .catch(error => {
          this.$refs.errorModal.show(error);
        });
    }
  }
  remove() {
    this.$refs.confirmRemove.show(this.$t("shared.remove?"));
  }
  yesRemove() {
    if (this.editing) {
      this.services.transactions.delete(this.model.id ?? "").then(response => {
        this.eventBus.$emit("transaction-deleted", this.model);
        this.$router.push({ name: "app.transactions" });
      });
    }
  }
  get getCategories() {
    return this.categories;
  }
  loadCategories() {
    this.categories = [];
    // this.services.transactionCategories.get().then((response: any) => {
    //   response.data.forEach((element) => {
    //     this.categories.push({
    //       id: element.id,
    //       name: element.name,
    //     });
    //     this.schema.fields[3].values = this.categories;
    //     if (this.categories.length === 0) {
    //       this.schema.fields[3].type = "input";
    //       this.schema.fields[3].inputType = "text";
    //     }
    //   });
    // });

    // return [
    //   { id: "en-GB", name: "English (GB)" },
    //   { id: "en-US", name: "English (US)" },
    //   { id: "de", name: "German" },
    //   { id: "it", name: "Italic" },
    //   { id: "fr", name: "French" },
    // ];
  }
}
</script>
<style>
.form-control {
  @apply w-full;
  @apply border;
  @apply border-gray-400;
  @apply shadow-sm;
  @apply rounded;
  @apply leading-5;
  @apply text-sm;
  @apply h-8;
  @apply p-3;
}
.wrapper .file {
  @apply h-10;
}
.vdp-datepicker div input {
  @apply w-full;
  @apply border;
  @apply border-gray-400;
  @apply shadow-sm;
  @apply rounded;
  @apply leading-5;
  @apply text-sm;
  @apply h-8;
  @apply p-3;
}
</style>
