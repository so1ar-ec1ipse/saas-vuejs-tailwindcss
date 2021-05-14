<template>
  <div>
    <side-modal
      v-on:close="cancel"
      :title="
        !editing ? $t('app.workspaces.create') : $t('app.workspaces.edit')
      "
    >
      <template v-slot:content v-if="!disabled">
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
      <template v-slot:footer v-if="!disabled">
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
    <confirm-modal
      ref="confirmUpgrade"
      v-on:yes="yesUpdateSubscription"
      v-on:no="noUpdateSubscription"
    ></confirm-modal>
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
import { WorkspaceDto } from "../../../application/dtos/app/workspaces/WorkspaceDto";
import { mapGetters } from "vuex";
import { TenantFeaturesResponse } from "@/application/contracts/master/tenants/TenantFeaturesResponse";
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
  },
  computed: {
    ...mapGetters("tenant", {
      features: "features",
      workspacesCount: "workspacesCount"
    })
  }
})
export default class WorkspacesForm extends BaseComponent {
  $refs!: {
    errorModal: ErrorModalComponent;
    confirmSave: ConfirmModalComponent;
    confirmRemove: ConfirmModalComponent;
    confirmUpgrade: ConfirmModalComponent;
    vfg: VueFormGenerator;
  };
  private editing: boolean = false;
  private isValid: boolean = false;
  private id: any = false;
  private model = {} as WorkspaceDto;
  private disabled: boolean = true;
  private categories: any = [];
  private features!: TenantFeaturesResponse;
  private workspacesCount!: number;

  private schema: any = {
    fields: [
      {
        id: "workspace-name",
        model: "name",
        label: this.$t("models.workspace.name"),
        placeholder: this.$t("models.workspace.name"),
        type: "input",
        inputType: "text",
        required: true,
        min: 1,
        max: 30,
        validator: validators.string.locale({
          fieldIsRequired: this.$t("app.shared.validation.fieldIsRequired"),
          textTooSmall: this.$t("app.shared.validation.textTooSmall", [1]),
          textTooBig: this.$t("app.shared.validation.textTooBig", [30])
        })
      },
      {
        id: this.$t("models.workspace.taxId")
          .toString()
          .toLowerCase(),
        model: "taxId",
        label: this.$t("models.workspace.taxId"),
        placeholder: this.$t("models.workspace.taxId"),
        type: "input",
        inputType: "text",
        required: true,
        min: 12,
        max: 13,
        validator: validators.string.locale({
          fieldIsRequired: this.$t("app.shared.validation.fieldIsRequired"),
          textTooSmall: this.$t("app.shared.validation.textTooSmall", [12]),
          textTooBig: this.$t("app.shared.validation.textTooBig", [13])
        })
      },
      {
        id: "legalName",
        model: "legalName",
        label: this.$t("models.workspace.legalName"),
        placeholder: this.$t("models.workspace.legalName"),
        type: "input",
        inputType: "text",
        required: true,
        validator: validators.string.locale({
          fieldIsRequired: this.$t("app.shared.validation.fieldIsRequired")
        })
      },
      {
        id: "addressZip",
        model: "addressZip",
        label: this.$t("models.workspace.addressZip"),
        type: "input",
        inputType: "text",
        required: true
      },
      {
        id: "cfdiUse",
        model: "cfdiUse",
        label: this.$t("models.workspace.cfdiUse"),
        type: "select",
        values() {
          return [
            { id: "P01", name: "P01 - Por definir" },
            { id: "G01", name: "G01 - Adquisición de mercancias" },
            {
              id: "G02",
              name: "G02 - Devoluciones, descuentos o bonificaciones"
            },
            { id: "G03", name: "G03 - Gastos en general" },
            { id: "I01", name: "I01 - Construcciones" },
            {
              id: "I02",
              name: "I02 - Mobilario y equipo de oficina por inversiones"
            },
            { id: "I03", name: "I03 - Equipo de transporte" },
            { id: "I04", name: "I04 - Equipo de computo y accesorios" },
            {
              id: "I05",
              name: "I05 - Dados, troqueles, moldes, matrices..."
            },
            { id: "I06", name: "I06 - Comunicaciones telefónicas" },
            { id: "I07", name: "I07 - Comunicaciones satelitales" },
            { id: "I08", name: "I08 - Otra maquinaria y equipo" },
            {
              id: "D01",
              name: "D01 - Honorarios médicos, dentales y gastos hosp..."
            },
            {
              id: "D02",
              name: "D02 - Gastos médicos por incapacidad o dis..."
            },
            { id: "D03", name: "D03 - Gastos funerales" },
            { id: "D04", name: "D04 - Donativos" },
            {
              id: "D05",
              name: "D05 - Intereses reales efectivamente pagados..."
            },
            { id: "D06", name: "D06 - Aportaciones voluntarias al SAR" },
            { id: "D07", name: "D07 - Primas por seguros de gastos médicos" },
            {
              id: "D08",
              name: "D08 - Gastos de transportación escolar obligatoria"
            },
            {
              id: "D09",
              name: "D09 - Depósitos en cuentas para el ahorro..."
            },
            {
              id: "D10",
              name: "D10 - Pagos por servicios educativos (colegiaturas)"
            }
          ];
        },
        default: "P01",
        selectOptions: {
          noneSelectedText: this.$t("app.shared.selectors.notSelected")
        }
      },
      {
        id: "default",
        model: "default",
        label: this.$t("models.workspace.default"),
        type: "checkbox"
      },
      {
        id: "addressStreet",
        model: "addressStreet",
        label: this.$t("models.workspace.addressStreet"),
        type: "input",
        inputType: "text",
        required: false
      },
      {
        id: "addressExterior",
        model: "addressExterior",
        label: this.$t("models.workspace.addressExterior"),
        type: "input",
        inputType: "text",
        required: false
      },
      {
        id: "addressInterior",
        model: "addressInterior",
        label: this.$t("models.workspace.addressInterior"),
        type: "input",
        inputType: "text",
        required: false
      },
      {
        id: "addressNeighborhood",
        model: "addressNeighborhood",
        label: this.$t("models.workspace.addressNeighborhood"),
        type: "input",
        inputType: "text",
        required: false
      },
      {
        id: "addressCity",
        model: "addressCity",
        label: this.$t("models.workspace.addressCity"),
        type: "input",
        inputType: "text",
        required: false
      },
      {
        id: "addressState",
        model: "addressState",
        label: this.$t("models.workspace.addressState"),
        type: "input",
        inputType: "text",
        required: false
      },
      {
        id: "addressCountry",
        model: "addressCountry",
        label: this.$t("models.workspace.addressCountry"),
        type: "input",
        inputType: "text",
        required: false
      }
    ]
  };
  private formOptions: any = {
    validateAfterLoad: false,
    validateAfterChanged: true,
    validateAsync: true
  };
  mounted() {
    if (this.$route.params.id) {
      this.disabled = true;
      this.id = this.$route.params.id;
      this.editing = true;
      this.services.workspaces
        .get(this.id)
        .then((response: WorkspaceDto) => {
          this.model = response;
          this.disabled = false;
        })
        .catch(error => {
          this.$router.push({ name: "app.workspaces" });
        });
    } else {
      this.disabled = false;

      if (this.maxNumberOfWorkspaces > 0 && this.maxNumberOfWorkspacesReached) {
        this.$refs.confirmUpgrade.show(
          this.$t("app.workspaces.errors.maxNumberOfWorkspaces") +
            " (" +
            this.maxNumberOfWorkspaces +
            ")",
          this.$t("shared.upgrade").toString(),
          this.$t("shared.cancel").toString()
        );
      }
    }
  }
  cancel() {
    this.eventBus.$emit("workspace-canceled");
    this.$router.push({ name: "app.workspaces" });
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
      this.services.workspaces
        .update(this.model.id ?? "", this.model)
        .then(response => {
          this.eventBus.$emit("workspace-saved", this.model);
          this.$router.push({ name: "app.workspaces" });
        })
        .catch(error => {
          this.$refs.errorModal.show(error);
        });
    } else {
      this.services.workspaces
        .create(this.model)
        .then((response: WorkspaceDto) => {
          this.eventBus.$emit("workspace-added", response);
          this.$router.push({ name: "app.workspaces" });
        })
        .catch(error => {
          this.$refs.errorModal.show(error);
        });
    }
  }
  remove() {
    this.$refs.confirmRemove.show(
      this.$t("shared.youWillDelete").toString() + " " + this.model.name,
      this.$t("shared.delete").toString(),
      this.$t("shared.cancel").toString(),
      this.$t("app.workspaces.deleteWarning").toString()
    );
  }
  yesRemove() {
    if (this.editing) {
      this.services.workspaces.delete(this.model.id ?? "").then(response => {
        this.eventBus.$emit("workspace-deleted", this.model);
        this.$router.push({ name: "app.workspaces" });
      });
    }
  }
  yesUpdateSubscription() {
    this.$router.push({ name: "settings.tenant.subscription" });
  }
  noUpdateSubscription() {
    this.$router.push({ name: "app.workspaces" });
  }
  get maxNumberOfWorkspacesReached() {
    if (!this.features) {
      return true;
    } else {
      if (
        this.maxNumberOfWorkspaces > 0 &&
        this.workspacesCount >= this.maxNumberOfWorkspaces
      ) {
        return true;
      }
      return false;
    }
  }
  get maxNumberOfWorkspaces() {
    return this.features?.maxNumberOfWorkspaces ?? 0;
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
