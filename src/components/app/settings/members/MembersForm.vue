<template>
  <div>
    <side-modal
      v-on:close="cancel"
      :title="
        !editing
          ? $t('app.tenants.members.create')
          : $t('app.tenants.members.edit')
      "
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
import BaseComponent from "../../../../components/shared/BaseComponent.vue";
import SideModal from "@/components/shared/modals/SideModal.vue";
import VueFormGenerator, { validators } from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
import { Prop } from "vue-property-decorator";
import dateInput from "@/components/shared/forms/DateInput.vue";
import { mapGetters } from "vuex";
import ErrorModalComponent from "@/components/shared/modals/NewErrorModal.vue";
import ConfirmModalComponent from "@/components/shared/modals/ConfirmModal.vue";
import { TenantUserDto } from "@/application/dtos/master/tenants/TenantUserDto";
import { TenantUserRole } from "@/application/enums/master/tenants/TenantUserRole";
import { TenantProductDto } from "@/application/dtos/master/tenants/TenantProductDto";

Vue.component("fieldDateInput", dateInput);

@Component({
  components: {
    SideModal,
    "vue-form-generator": VueFormGenerator.component
  },
  computed: {
    ...mapGetters("tenant", {
      activeProduct: "activeProduct",
      memberCount: "memberCount",
      role: "role",
      isOwnerOrAdmin: "isOwnerOrAdmin"
    }),
    ...mapGetters("account", {
      isAdmin: "isAdmin"
    })
  }
})
export default class MembersForm extends BaseComponent {
  $refs!: {
    errorModal: ErrorModalComponent;
    vfg: VueFormGenerator;
    confirmUpgrade: ConfirmModalComponent;
    confirmSave: ConfirmModalComponent;
    confirmRemove: ConfirmModalComponent;
  };
  private editing: boolean = false;
  private isValid: boolean = false;
  private id: any = false;
  private model = {} as TenantUserDto;
  private disabled: boolean = true;
  private schema: any = {
    fields: [
      {
        id: "email",
        type: "input",
        inputType: "text",
        label: this.$t("account.shared.email"),
        model: "email",
        required: true,
        placeholder: this.$t("account.shared.email"),
        disabled: this.$route.params.id,
        validator: [
          validators.email.locale({
            fieldIsRequired: "Correo requerido"
          })
        ]
      },
      {
        id: "firstName",
        type: "input",
        inputType: "text",
        label: this.$t("settings.profile.firstName"),
        model: "firstName",
        required: true,
        placeholder: this.$t("settings.profile.firstName"),
        validator: validators.string.locale({
          fieldIsRequired: "Nombre requerido"
        })
      },
      {
        id: "lastName",
        type: "input",
        inputType: "text",
        label: this.$t("settings.profile.lastName"),
        model: "lastName",
        required: false,
        placeholder: this.$t("settings.profile.lastName"),
        validator: validators.string
      },
      {
        id: "phone",
        type: "input",
        inputType: "phone",
        label: this.$t("settings.profile.phone"),
        model: "phone",
        placeholder: this.$t("settings.profile.phone")
      },
      {
        id: "role",
        type: "radios",
        label: this.$t("settings.profile.role"),
        model: "role",
        placeholder: this.$t("settings.profile.role"),
        required: true,
        validator: [
          validators.number.locale({
            fieldIsRequired: "Rol requerido"
          })
        ],
        values: [
          {
            name: this.$t("settings.profile.roles." + TenantUserRole[0]),
            value: 0
          },
          {
            name: this.$t("settings.profile.roles." + TenantUserRole[1]),
            value: 1
          },
          {
            name: this.$t("settings.profile.roles." + TenantUserRole[2]),
            value: 2
          }
          // {
          //   name: this.$t("settings.profile.roles." + TenantUserRole[3]),
          //   value: 3,
          // },
        ]
      }
    ]
  };
  private role!: TenantUserRole;
  private activeProduct!: TenantProductDto;
  private memberCount!: number;
  private isOwnerOrAdmin!: boolean;
  private formOptions: any = {
    validateAfterLoad: false,
    validateAfterChanged: true,
    validateAsync: true
  };
  private isAdmin!: boolean;
  created() {
    this.configureSchema();
  }
  mounted() {
    if (this.$route.params.id) {
      this.disabled = true;
      this.id = this.$route.params.id;
      this.editing = true;
      this.services.tenantUsers
        .get(this.id)
        .then((response: TenantUserDto) => {
          this.model = response;
          this.disabled = false;
        })
        .catch(error => {
          // this.$refs.errorModal.show(this.$t("shared.notFound"));
          this.$router.push({ name: "settings.tenant.members" });
        });
    } else {
      this.disabled = false;
      let maxNumberOfUsers: number =
        this.activeProduct &&
        this.activeProduct.subscriptionProduct &&
        this.activeProduct.subscriptionProduct.maxUsers
          ? this.activeProduct.subscriptionProduct.maxUsers
          : 1;
      if (this.isAdmin) {
        maxNumberOfUsers = 0;
      }

      if (maxNumberOfUsers > 0 && this.memberCount >= maxNumberOfUsers) {
        this.$refs.confirmUpgrade.show(
          this.$t("settings.tenant.members.maxNumberOfUsers") +
            " (" +
            maxNumberOfUsers +
            "). " +
            this.$t("shared.upgrade?")
        );
      }
    }
  }
  // getFeatureValue(featureKey: string): number {
  //   if (this.activeProduct && this.activeProduct.features) {
  //     const feature = this.activeProduct.features.find(
  //       (f) => f.key === featureKey
  //     );
  //     if (!feature || !feature.value) {
  //       return 0;
  //     } else {
  //       return Number(feature.value);
  //     }
  //   }
  //   return 0;
  // }
  configureSchema() {
    // this.schema.fields[3].values = this.categories;
  }
  cancel() {
    this.eventBus.$emit("user-canceled");
    this.$router.push({ name: "settings.tenant.members" });
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
      this.services.tenantUsers
        .update(this.model.id, {
          role: this.model.role,
          firstName: this.model.firstName,
          lastName: this.model.lastName,
          phone: this.model.phone
        })
        .then(response => {
          this.eventBus.$emit("user-saved", this.model);
          this.$router.push({ name: "settings.tenant.members" });
        })
        .catch(error => {
          this.$refs.errorModal.show(error);
        });
    } else {
      this.services.tenantUserInvitations
        .inviteUser({
          email: this.model.email,
          firstName: this.model.firstName,
          lastName: this.model.lastName,
          phone: this.model.phone,
          role: this.model.role
        })
        .then((response: TenantUserDto) => {
          this.eventBus.$emit("user-added", response);
          this.$router.push({ name: "settings.tenant.members" });
        })
        .catch(error => {
          this.$refs.errorModal.show(error);
        });
    }
  }
  yesUpdateSubscription() {
    this.$router.push({ name: "settings.tenant.subscription" });
  }
  noUpdateSubscription() {
    this.$router.push({ name: "settings.tenant.members" });
  }
  remove() {
    this.$refs.confirmRemove.show(this.$t("shared.remove?"));
  }
  yesRemove() {
    if (this.editing) {
      if (this.role === TenantUserRole.MEMBER) {
        this.$refs.errorModal.show(this.$t("account.tenant.onlyAdmin"));
      } else {
        this.services.tenantUsers
          .delete(this.model.id)
          .then(response => {
            this.eventBus.$emit("user-deleted", this.model);
            this.$router.push({ name: "settings.tenant.members" });
          })
          .catch(error => {
            this.$refs.errorModal.show(error);
          });
      }
    }
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
