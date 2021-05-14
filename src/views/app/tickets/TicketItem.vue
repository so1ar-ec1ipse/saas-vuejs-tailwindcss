<template>
  <div v-if="id">
    <div class="px-4 py-3">
      <div class="flex justify-between items-start">
        <span class="w-full">
          <div class="flex items-center justify-between">
            <p
              class="text-sm text-gray-800 truncate flex items-center space-x-2"
            >
              <span class="font-medium">Ticket #{{ number }}</span>
            </p>
            <div class="ml-2 flex-shrink-0 flex space-x-2 items-center text-sm">
              <div>
                {{ legalName }}
              </div>
              <badge-ticket
                :with-text="false"
                size="sm"
                :status="status"
              ></badge-ticket>
              <p
                v-if="false"
                class="cursor-pointer w-20 space-x-0 tracking-wide items-center justify-center uppercase px-1 py-0.5 inline-flex text-xs select-none font-semibold rounded-sm bg-yellow-50 text-yellow-800 border border-yellow-300 hover:bg-yellow-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                  aria-hidden="true"
                  class="h-3 w-auto mr-1"
                >
                  <path
                    d="M401.095 38.851L348.683 8.648 296.27 38.851 243.858 8.648 191.445 38.85 124.021 0v402.609h-80.54v54.11C43.481 487.202 68.28 512 98.763 512h314.475c30.482 0 55.282-24.798 55.282-55.281V0l-67.425 38.851zM98.763 481.978c-13.928 0-25.26-11.33-25.26-25.259v-24.088h284.453v24.088a54.966 54.966 0 006.115 25.259H98.763zm314.474 0c-13.927 0-25.259-11.33-25.259-25.259v-54.11H154.043V51.948l37.401 21.551 52.413-30.2 52.413 30.2 52.413-30.201 52.413 30.201 37.402-21.551v404.771c-.001 13.929-11.332 25.259-25.261 25.259z"
                  />
                  <path
                    d="M184.066 135.49h224.405v30.022H184.066zM184.066 192.742h224.405v30.022H184.066zM184.066 249.994h112.203v30.022H184.066z"
                  />
                </svg>
                <span> Ticket </span>
              </p>
            </div>
          </div>
          <div class="mt-2 flex justify-between">
            <div class="sm:flex">
              <p class="text-sm text-gray-600">{{ uso }}</p>
            </div>
            <div class="flex items-center text-xs text-gray-500 mt-0 truncate">
              <p>
                subido
                <time :datetime="createdAt | dateYMD">
                  {{ createdAt | dateAgo }}
                </time>
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
            <div>
              <!-- {{ ticket.number }} -->
            </div>
          </div>
          <div class="w-full bg-gray-100 shadow-inner justify-center">
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div v-if="showDetails">
                <ticket-item-details :id="id" :key="id"></ticket-item-details>
              </div>
              <!-- <div
                v-show="showDetails"
                class="max-w-lg mx-auto mt-2  w-full  text-gray-600 text-sm space-y-1 p-0.5"
              >
                <div class="flex">
                  <img class="h-auto w-full" :src="imagen" />
                </div>
              </div> -->
            </transition>
          </div>
        </span>
        <!-- <span class="w-12 h-full flex items-center justify-center">
          <a class="hover:text-gray-900 hover:bg-gray-100 h-full w-full flex items-center justify-center text-gray-400">
            <svg class="h-5 w-5 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </a>
        </span> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { UserDto } from "@/application/dtos/master/users/UserDto";
import { TicketStatus } from "../../../application/enums/app/transactions/TicketStatus";
import { TenantDto } from "@/application/dtos/master/tenants/TenantDto";
import { TransactionDto } from "@/application/dtos/app/transactions/TransactionDto";
import TicketItemDetails from "./TicketItemDetails.vue";
import BadgeTicket from "@/components/app/badges/BadgeTicket.vue";

@Component({
  components: {
    TicketItemDetails,
    BadgeTicket
  }
})
export default class TicketItem extends Vue {
  @Prop() id!: string;
  @Prop() createdSince!: string;
  @Prop() createdAt!: Date;
  @Prop() createdByUser!: UserDto;
  @Prop() description!: string;
  @Prop() error!: string;
  @Prop() number!: number;
  @Prop() status!: TicketStatus;
  @Prop() lineasEscaneadas!: string[];
  @Prop() taxId!: string;
  @Prop() legalName!: string;
  @Prop() cfdiUse!: string;
  @Prop() tenant!: TenantDto;
  @Prop() transactions!: TransactionDto[];
  @Prop() imagen!: string;
  @Prop({ default: false }) allowShowDetails!: boolean;
  private showDetails: boolean = false;
  // mounted() {
  //   console.log("item id mounted: " + this.id);
  // }
  avatarText() {
    if (this.createdByUser?.firstName && this.createdByUser?.lastName) {
      return this.createdByUser?.firstName[0] + this.createdByUser?.lastName[0];
    } else if (this.createdByUser?.firstName) {
      return this.createdByUser?.firstName[0];
    } else {
      return "?";
    }
  }
  get uso() {
    if (this.cfdiUse === "P01") {
      return "P01 - Por definir";
    } else if (this.cfdiUse === "G01") {
      return "G01 - Adquisición de mercancias";
    } else if (this.cfdiUse === "G02") {
      return "G02 - Devoluciones, descuentos o bonificaciones";
    } else if (this.cfdiUse === "G03") {
      return "G03 - Gastos en general";
    }
    return "";
  }
}
</script>
