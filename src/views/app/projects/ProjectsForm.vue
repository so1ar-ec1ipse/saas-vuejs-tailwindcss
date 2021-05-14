<template>
  <div>
    <side-modal
      v-on:close="cancel"
      :title="!editing ? $t('app.projects.create') : $t('app.projects.edit')"
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

          <user-multiselect></user-multiselect>
        </form>
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
    <error-modal
      ref="confirmClose"
      v-on:closed="returnToProjects"
    ></error-modal>
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
import UserMultiselect from "@/components/shared/selectors/UserMultiselect.vue";
import VueFormGenerator, { validators } from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
import { Prop } from "vue-property-decorator";
import dateInput from "@/components/shared/forms/DateInput.vue";
import { ProjectDto } from "../../../application/dtos/app/projects/ProjectDto";
import { mapGetters } from "vuex";
import { TenantFeaturesResponse } from "@/application/contracts/master/tenants/TenantFeaturesResponse";
Vue.component("fieldDateInput", dateInput);
import ErrorModalComponent from "@/components/shared/modals/NewErrorModal.vue";
import ConfirmModalComponent from "@/components/shared/modals/ConfirmModal.vue";
import * as projectHelpers from "@/application/modules/projects/ProjectHelpers";

@Component({
  components: {
    SuccessModal,
    ErrorModal,
    ConfirmModal,
    SideModal,
    UserMultiselect,
    "vue-form-generator": VueFormGenerator.component
  },
  computed: {
    ...mapGetters("tenant", {
      features: "features"
      // projectsCount: "projectsCount",
    })
  }
})
export default class ProjectsForm extends BaseComponent {
  $refs!: {
    errorModal: ErrorModalComponent;
    confirmSave: ConfirmModalComponent;
    confirmRemove: ConfirmModalComponent;
    confirmUpgrade: ConfirmModalComponent;
    confirmClose: ErrorModalComponent;
    vfg: VueFormGenerator;
  };
  private editing: boolean = false;
  private isValid: boolean = false;
  private id: any = false;
  private model = {} as ProjectDto;
  private disabled: boolean = true;
  private features!: TenantFeaturesResponse;
  // private projectsCount!: number;

  private schema: any = {
    fields: [
      {
        id: "name",
        model: "name",
        label: this.$t("models.project.name"),
        placeholder: this.$t("models.project.name"),
        type: "input",
        inputType: "text",
        required: true,
        min: 2,
        max: 50,
        validator: validators.string.locale({
          fieldIsRequired: this.$t("app.shared.validation.fieldIsRequired"),
          textTooSmall: this.$t("app.shared.validation.textTooSmall", [2]),
          textTooBig: this.$t("app.shared.validation.textTooBig", [50])
        })
      },
      {
        id: "status",
        model: "status",
        label: this.$t("models.project.status"),
        type: "select",
        required: true,
        default: 0,
        selectOptions: {
          noneSelectedText: this.$t("app.shared.selectors.notSelected")
        },
        values: [
          {
            name: this.$t("app.projects.status.ACTIVE"),
            id: 0
          },
          {
            name: this.$t("app.projects.status.PENDING"),
            id: 1
          },
          {
            name: this.$t("app.projects.status.ARCHIVED"),
            id: 2
          }
        ]
      },
      {
        id: "color",
        model: "color",
        label: this.$t("models.project.color"),
        placeholder: this.$t("models.project.color"),
        type: "select",
        required: false,
        selectOptions: {
          noneSelectedText: this.$t("app.shared.selectors.notSelected")
        },
        values: projectHelpers.colors
      },
      // {
      //   id: "startDate",
      //   type: "dateInput",
      //   label: "startDate",
      //   model: "startDate",
      //   required: false,
      //   validator: validators.date,
      //   default: null,
      //   min: moment("1900-01-01").toDate(),
      //   max: moment("2050-12-31").toDate(),
      //   dateTimePickerOptions: {
      //     format: "YYYY-MM-DD",
      //   },
      // },
      {
        id: "budget",
        model: "budget",
        label: this.$t("models.project.budget"),
        placeholder: this.$t("models.project.budget"),
        inputType: "number",
        type: "input",
        required: false,
        validator: validators.integer
      },
      {
        id: "default",
        model: "default",
        label: this.$t("models.project.default"),
        type: "checkbox"
      }
    ]
  };
  private formOptions: any = {
    validateAfterLoad: false,
    validateAfterChanged: true,
    validateAsync: true
  };
  mounted() {
    if (
      !this.$store.state.tenant.workspaces ||
      this.$store.state.tenant.workspaces.length === 0
    ) {
      this.$refs.confirmClose.show(this.$t("app.workspaces.askAdminToAddYou"));
      return;
    }
    if (this.$route.params.id) {
      this.disabled = true;
      this.id = this.$route.params.id;
      this.editing = true;
      this.services.projects
        .get(this.id)
        .then((response: ProjectDto) => {
          this.model = response;
          this.disabled = false;
        })
        .catch(error => {
          this.$router.push({ name: "app.projects" });
        });
    } else {
      this.disabled = false;
    }
  }
  cancel() {
    this.eventBus.$emit("project-canceled");
    this.$router.push({ name: "app.projects" });
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
  returnToProjects() {
    this.$router.push({ name: "app.projects" });
  }
  yesSave() {
    if (this.editing) {
      this.services.projects
        .update(this.model.id ?? "", this.model)
        .then(response => {
          this.eventBus.$emit("project-saved", this.model);
          this.$router.push({ name: "app.projects" });
        })
        .catch(error => {
          this.$refs.errorModal.show(error);
        });
    } else {
      this.services.projects
        .create(this.model)
        .then((response: ProjectDto) => {
          this.eventBus.$emit("project-added", response);
          this.$router.push({ name: "app.projects" });
        })
        .catch(error => {
          this.$refs.errorModal.show(error);
        });
    }
  }
  remove() {
    this.$refs.confirmRemove.show(
      this.$t("shared.delete?").toString(),
      this.$t("shared.delete").toString(),
      this.$t("shared.cancel").toString(),
      this.$t("shared.unrecoverable").toString()
    );
  }
  yesRemove() {
    if (this.editing) {
      this.services.projects.delete(this.model.id ?? "").then(response => {
        this.eventBus.$emit("project-deleted", this.model);
        this.$router.push({ name: "app.projects" });
      });
    }
  }
  yesUpdateSubscription() {
    this.$router.push({ name: "settings.tenant.subscription" });
  }
  noUpdateSubscription() {
    this.$router.push({ name: "app.projects" });
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
.field-checkbox {
  @apply flex;
  @apply items-center;
  @apply space-x-2;
}
</style>
