<template>
  <div v-if="id">
    <div class="px-4 py-3">
      <div class="flex justify-between items-start">
        <span class="w-full">
          <div class="flex items-center justify-between">
            <div
              class="text-sm text-gray-800 truncate flex items-center space-x-2"
            >
              <div
                v-if="cfdi && cfdi.emisorNombre"
                class="font-normal text-gray-500"
              >
                {{ cfdi.emisorNombre }}
              </div>
              <div
                v-else-if="cfdi && cfdi.emisorRfc"
                class="font-normal text-gray-500"
              >
                {{ cfdi.emisorRfc }}
              </div>
              <div
                v-else-if="ticket && ticket.legalName"
                class="font-normal text-gray-500"
              >
                {{ ticket.legalName }}
              </div>
              <div
                v-else-if="ticket && ticket.taxId"
                class="font-normal text-gray-500"
              >
                {{ ticket.taxId }}
              </div>
            </div>
            <div class="ml-2 flex-shrink-0 flex space-x-2 items-center text-sm">
              <div v-if="customerBranch" class="capitalize">
                {{ customerBranch.legalName }}
              </div>
              <div v-if="supplierBranch" class="capitalize">
                {{ supplierBranch.legalName }}
              </div>
              <div v-else-if="workspace.name" class="capitalize">
                {{ workspace.name }}
              </div>
              <div v-else-if="workspace.legalName" class="capitalize">
                {{ workspace.legalName }}
              </div>
              <div v-else-if="workspace.taxId" class="capitalize">
                {{ workspace.taxId }}
              </div>
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
                :status="ticket ? ticket.status : 0"
              ></badge-ticket>
            </div>
          </div>
          <div class="mt-2 flex justify-between">
            <div class="sm:flex text-gray-500 truncate">
              <p class="text-sm truncate pr-3">
                <span class="lowercase">
                  <span
                    class="text-gray-900 font-bold"
                    :class="type === 0 ? ' text-gray-800' : ' text-gray-800'"
                  >
                    ${{ total | decimalFormat }}
                  </span>
                </span>
              </p>
            </div>
            <div class="flex items-center text-xs text-gray-500 mt-0 truncate">
              <p>
                <span v-if="ticket"> </span>
                <span v-else-if="cfdi"> </span>
                <span v-else> </span>
                <time :datetime="createdAt | dateYMD">
                  {{ createdAt | dateAgo("minute") }}
                </time>
                <span v-if="getCreatedByUser">
                  {{ $t("shared.by") }} {{ getCreatedByUser.firstName }}
                </span>
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
          <div
            v-show="showDetails"
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
                  <div class="truncate flex items-center justify-between">
                    <div>
                      <span v-if="detail.category">
                        [{{ detail.category }}] </span
                      >{{ detail.description }}
                    </div>
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
import { TransactionDetailDto } from "@/application/dtos/app/transactions/TransactionDetailDto";
import { TransactionType } from "@/application/enums/app/transactions/TransactionType";
import { TicketDto } from "@/application/dtos/app/transactions/TicketDto";
import { CfdiDto } from "@/application/dtos/app/cfdis/CfdiDto";
import TicketItemDetails from "./TicketItemDetails.vue";
import services from "@/services";
import NewErrorModal from "@/components/shared/modals/NewErrorModal.vue";
import { WorkspaceDto } from "@/application/dtos/app/workspaces/WorkspaceDto";
import BadgeExpense from "@/components/app/badges/BadgeExpense.vue";
import BadgeIncome from "@/components/app/badges/BadgeIncome.vue";
import BadgeTicket from "@/components/app/badges/BadgeTicket.vue";
import { CustomerBranchDto } from "@/application/dtos/app/contacts/CustomerBranchDto";
import { SupplierBranchDto } from "@/application/dtos/app/contacts/SupplierBranchDto";

@Component({
  components: {
    TicketItemDetails,
    NewErrorModal,
    BadgeExpense,
    BadgeIncome,
    BadgeTicket
  }
})
export default class TransactionItem extends Vue {
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
  private showDetails: boolean = false;
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
  transactionType() {
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
