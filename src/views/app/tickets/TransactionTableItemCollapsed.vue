<template>
  <div v-if="id">
    <div class="px-4 py-0.5">
      <div class="flex justify-between items-start">
        <span class="w-full">
          <div class="flex items-center justify-between">
            <div
              class="w-1/3 flex items-center space-x-2 px-2 justify-start truncate"
            >
              <div class="font-bold text-right">
                ${{ total | decimalFormat }}
              </div>
              <div class="text-gray-500 truncate">
                <span v-if="isAdmin && tenant" class="font-bold">
                  {{ tenant.name }} -
                </span>
                <span v-if="customerBranch" class="capitalize">
                  {{ customerBranch.legalName }}
                </span>
                <span v-if="supplierBranch" class="capitalize">
                  {{ supplierBranch.legalName }}
                </span>
                <span v-else-if="workspace?.name" class="capitalize">
                  {{ workspace?.name }}
                </span>
                <span v-else-if="workspace.legalName" class="capitalize">
                  {{ workspace.legalName }}
                </span>
                <span v-else-if="workspace.taxId" class="capitalize">
                  {{ workspace.taxId }}
                </span>
              </div>
            </div>
            <div class="2/3 flex items-center truncate space-x-2 px-2 text-sm">
              <div class="truncate">
                <span v-if="cfdi && cfdi.emisorNombre">
                  {{ cfdi.emisorNombre }}
                </span>
                <span v-else-if="cfdi && cfdi.emisorRfc">
                  {{ cfdi.emisorRfc }}
                </span>
                <span v-else-if="ticket && ticket.legalName">
                  {{ ticket.legalName }}
                </span>
                <span v-else-if="ticket && ticket.taxId">
                  {{ ticket.taxId }}
                </span>
              </div>
              <div class="space-x-2">
                <badge-income
                  v-if="type === 0"
                  :with-text="false"
                  width="w-6 p-1"
                  height="h-4"
                ></badge-income>
                <badge-expense
                  v-if="type === 1"
                  :with-text="false"
                  width="w-6 p-1"
                  height="h-4"
                ></badge-expense>

                <badge-ticket
                  v-if="ticket && ticket.id"
                  size="sm"
                  :status="1"
                ></badge-ticket>
              </div>
            </div>
          </div>
          <div v-if="false" class="flex items-center justify-between">
            <div
              class="text-sm text-gray-800 truncate flex items-center space-x-2"
            >
              <!-- <img
                alt="Usuario"
                v-if="getCreatedByUser && getCreatedByUser.avatar"
                :src="getCreatedByUser.avatar"
                class="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 border border-gray-300 shadow-xl"
              />
              <span
                v-else
                class="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-800 shadow-xl"
              >
                <span class="text-xs leading-none text-white pt-0.5">{{
                  avatarText()
                }}</span>
              </span> -->
              <!-- <badge-income
                v-if="type === 0"
                :with-text="false"
                width="w-6 p-1"
                height="h-4"
              ></badge-income>
              <badge-expense
                v-if="type === 1"
                :with-text="false"
                width="w-6 p-1"
                height="h-4"
              ></badge-expense> -->

              <div
                class="text-gray-900 font-bold mr-4 text-right w-16"
                :class="type === 0 ? ' text-gray-800' : ' text-gray-800'"
              >
                ${{ total | decimalFormat }}
              </div>

              <div class="text-gray-500">
                <span v-if="cfdi && cfdi.emisorNombre">
                  {{ cfdi.emisorNombre }}
                </span>
                <span v-else-if="cfdi && cfdi.emisorRfc">
                  {{ cfdi.emisorRfc }}
                </span>
                <span v-else-if="ticket && ticket.legalName">
                  {{ ticket.legalName }}
                </span>
                <span v-else-if="ticket && ticket.taxId">
                  {{ ticket.taxId }}
                </span>
              </div>
            </div>
            <div class="ml-2 flex-shrink-0 flex space-x-2 items-center text-sm">
              <!-- <p class="uppercase px-2 inline-flex text-xs leading-5 font-semibold rounded-sm bg-yellow-50 text-yellow-800 border border-yellow-200">
                                          pendiente
                                        </p> -->
              <span v-if="workspace.name" class="capitalize">
                {{ workspace.name }}
              </span>
              <span v-else-if="workspace.legalName" class="capitalize">
                {{ workspace.legalName }}
              </span>
              <span v-else-if="workspace.taxId" class="capitalize">
                {{ workspace.taxId }}
              </span>

              <badge-income
                v-if="type === 0"
                :with-text="false"
                width="w-6 p-1"
                height="h-4"
              ></badge-income>
              <badge-expense
                v-if="type === 1"
                :with-text="false"
                width="w-6 p-1"
                height="h-4"
              ></badge-expense>

              <!-- <p class="w-20 space-x-0 justify-center items-center uppercase px-2 inline-flex text-xs leading-5 font-semibold rounded-sm bg-green-100 text-green-800 border border-green-300">
                                          <svg class="h-3 w-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                          </svg>
                                          <span>
                                            Ingreso
                                          </span>
                                        </p> -->
            </div>
          </div>
          <div v-if="false" class="mt-2 flex justify-between">
            <div class="sm:flex text-gray-500 truncate">
              <p class="text-sm truncate pr-3">
                <span class="lowercase">
                  <!-- {{ currency }}  -->
                  <!-- {{ $t("shared.in") }} -->
                </span>
                <!-- <span v-if="workspace.name" class="capitalize">
                  {{ workspace.name }}
                </span>
                <span v-else-if="workspace.legalName" class="capitalize">
                  {{ workspace.legalName }}
                </span> -->
              </p>
            </div>
            <div
              v-if="false"
              class="flex items-center text-xs text-gray-500 mt-0 truncate"
            >
              <p>
                <!-- <time class="" datetime="2021-01-04">hace 13 horas</time> -->
                <span v-if="ticket">
                  <!-- facturado -->
                </span>
                <span v-else-if="cfdi">
                  <!-- agregado -->
                </span>
                <span v-else>
                  <!-- agregado -->
                </span>
                <time :datetime="createdAt | dateYMD">
                  {{ createdAt | dateAgo("minute") }}
                </time>
                {{ $t("shared.by") }} {{ getCreatedByUser?.firstName }}
              </p>
            </div>
          </div>
          <div v-if="allowShowDetails" class="mt-2 flex justify-between">
            <div class="sm:flex text-gray-500">
              <button
                type="button"
                @click="showDetails = !showDetails"
                class="focus:outline-none flex items-center text-sm cursor-pointer text-indigo-500 hover:text-indigo-800"
              >
                <span v-if="!showDetails">{{
                  $t("app.shared.buttons.showDetails")
                }}</span>
                <span v-if="showDetails">{{
                  $t("app.shared.buttons.hideDetails")
                }}</span>
                <svg
                  v-if="showDetails"
                  class="h-4 w-4 ml-1.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  v-if="!showDetails"
                  class="h-4 w-4 ml-1.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div
              class="space-x-2 flex items-center text-xs text-gray-500 mt-0 truncate"
            >
              <button
                v-if="cfdi"
                :disabled="!cfdi.tieneXml"
                @click="downloadCfdi('xml')"
                class="underline"
                :class="
                  cfdi.tieneXml
                    ? 'cursor-pointer text-indigo-500 hover:text-indigo-800'
                    : 'text-gray-500'
                "
              >
                XML
              </button>
              <button
                v-if="cfdi"
                :disabled="!cfdi.tienePdf"
                @click="downloadCfdi('pdf')"
                class="underline"
                :class="
                  cfdi.tienePdf
                    ? 'cursor-pointer text-rose-500 hover:text-rose-800'
                    : 'text-gray-500'
                "
              >
                PDF
              </button>
            </div>
          </div>
          <div v-if="showDetails">
            <ticket-item-details :id="ticket.id" :key="ticket.id">
            </ticket-item-details>
          </div>
          <div
            v-show="false"
            class="max-w-lg mx-auto mt-2 w-full text-gray-600 text-sm space-y-1 p-0.5"
          >
            <div class="flex">
              <div class="w-full max-w-lg mx-auto sm:p-5">
                <div class="flex justify-between font-medium mb-2 text-xs">
                  <div class="truncate">
                    {{ $t("models.transaction.description") }}
                  </div>
                  <div>{{ $t("models.transaction.quantity") }}</div>
                </div>
                <div
                  v-for="(detail, index) in details"
                  :key="index"
                  class="flex justify-between border-b border-gray-300 border-dashed"
                >
                  <div class="truncate">
                    {{ detail.description }}
                  </div>
                  <div>
                    {{ detail.total | decimalFormat }}
                  </div>
                </div>
                <div
                  class="flex justify-between border-b border-gray-300 border-dashed"
                >
                  <div class="truncate font-medium">
                    {{ $t("models.transaction.subtotal") }}
                  </div>
                  <div>${{ subtotal | decimalFormat }}</div>
                </div>
                <div
                  class="flex justify-between border-b border-gray-300 border-dashed"
                >
                  <div class="truncate font-medium">
                    {{ $t("models.transaction.discount") }}
                  </div>
                  <div>${{ discount | decimalFormat }}</div>
                </div>
                <div
                  class="flex justify-between border-b border-gray-300 border-dashed"
                >
                  <div class="truncate font-medium">
                    {{ $t("models.transaction.taxes") }}
                  </div>
                  <div>${{ taxes | decimalFormat }}</div>
                </div>
                <div
                  class="flex justify-between border-b border-gray-300 border-dashed"
                >
                  <div class="truncate font-medium">
                    {{ $t("models.transaction.total") }}
                  </div>
                  <div>${{ total | decimalFormat }}</div>
                </div>
                <div class="flex pt-3" v-if="ticket && ticket.image">
                  <img class="h-auto w-full" :src="ticket.image" />
                </div>
              </div>
            </div>
          </div>
        </span>
      </div>
    </div>
    <new-error-modal ref="errorModal"></new-error-modal>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { UserDto } from "@/application/dtos/master/users/UserDto";
import { TicketDto } from "@/application/dtos/app/transactions/TicketDto";
import { CfdiDto } from "@/application/dtos/app/cfdis/CfdiDto";
import TicketItemDetails from "./TicketItemDetails.vue";
import services from "@/services";
import NewErrorModal from "@/components/shared/modals/NewErrorModal.vue";
import { WorkspaceDto } from "@/application/dtos/app/workspaces/WorkspaceDto";
import BadgeExpense from "@/components/app/badges/BadgeExpense.vue";
import BadgeIncome from "@/components/app/badges/BadgeIncome.vue";
import BadgeTicket from "@/components/app/badges/BadgeTicket.vue";
import { SupplierBranchDto } from "@/application/dtos/app/contacts/SupplierBranchDto";
import { CustomerBranchDto } from "@/application/dtos/app/contacts/CustomerBranchDto";
import { mapGetters } from "vuex";
import { TenantDto } from "@/application/dtos/master/tenants/TenantDto";
import { TransactionDetailDto } from "@/application/dtos/app/transactions/TransactionDetailDto";
import { TransactionType } from "@/application/enums/app/transactions/TransactionType";

@Component({
  components: {
    TicketItemDetails,
    NewErrorModal,
    BadgeExpense,
    BadgeIncome,
    BadgeTicket
  },
  computed: {
    ...mapGetters("account", {
      isAdmin: "isAdmin"
    })
  }
})
export default class TransactionTableItemCollapsed extends Vue {
  $refs!: {
    errorModal: NewErrorModal;
  };
  @Prop() id!: string;
  @Prop() createdAt!: Date;
  @Prop() createdByUser!: UserDto;
  @Prop() ticketId!: string;
  @Prop() ticket!: TicketDto;
  @Prop() type!: TransactionType;
  @Prop() currency!: string;
  @Prop() date!: Date;
  @Prop() category!: string;
  @Prop() subtotal!: number;
  @Prop() discount!: number;
  @Prop() taxes!: number;
  @Prop() total!: number;
  @Prop() cfdi!: CfdiDto;
  @Prop() details!: TransactionDetailDto[];
  @Prop({ default: false }) allowShowDetails!: boolean;
  @Prop() workspace!: WorkspaceDto;
  @Prop() customerBranch!: CustomerBranchDto;
  @Prop() supplierBranch!: SupplierBranchDto;
  @Prop() tenant!: TenantDto;
  private showDetails: boolean = false;
  private isAdmin!: boolean;
  avatarText() {
    if (this.getCreatedByUser) {
      if (this.getCreatedByUser.firstName && this.getCreatedByUser.lastName) {
        return (
          this.getCreatedByUser.firstName[0] + this.getCreatedByUser.lastName[0]
        );
      } else if (this.getCreatedByUser.firstName) {
        this.getCreatedByUser.firstName.substring(0, 1);
      } else if (this.getCreatedByUser.firstName) {
        this.getCreatedByUser.email.substring(0, 1);
      }
    }
    return "?";
  }
  typeDeTransaction() {
    return TransactionType[this.type];
  }
  downloadCfdi(type: string) {
    if (!this.cfdi || !this.cfdi.id) {
      this.$refs.errorModal.show("No tiene CFDi");
    } else {
      services.cfdis.download(this.cfdi.id, type).then((response: any) => {
        const contentType: string = response.headers["content-type"];

        const fileUrl = window.URL.createObjectURL(
          new Blob([response.data], { type: contentType })
        );
        const fileLink = document.createElement("a");
        fileLink.href = fileUrl;
        fileLink.setAttribute("download", this.cfdi.id);
        document.body.appendChild(fileLink);
        fileLink.click();
      });
    }
  }
  get getCreatedByUser() {
    if (this.ticket) {
      return this.ticket.createdByUser;
    } else {
      return this.createdByUser;
    }
  }
}
</script>
