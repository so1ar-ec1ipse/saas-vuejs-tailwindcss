<template>
  <div v-if="id">
    <div class="px-4 py-0.5">
      <div class="flex justify-between items-start">
        <span class="w-full">
          <div class="flex items-center justify-between">
            <div
              class="w-2/3 flex items-center space-x-2 px-2 justify-start truncate"
            >
              <div class="w-14 font-bold text-right">#{{ number }}</div>
              <div class="text-gray-500 truncate">{{ uso }}</div>
            </div>
            <div class="1/3 flex items-center truncate space-x-2 px-2 text-sm">
              <div>
                <span class="capitalize">
                  {{ legalName }}
                </span>
              </div>
              <div>
                <badge-ticket
                  :with-text="false"
                  size="sm"
                  :status="status"
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
                v-if="tipo === 0"
                :with-text="false"
                width="w-6 p-1"
                height="h-4"
              ></badge-income>
              <badge-expense
                v-if="tipo === 1"
                :with-text="false"
                width="w-6 p-1"
                height="h-4"
              ></badge-expense> -->

              <div
                class="text-gray-900 font-bold mr-4 text-right w-16"
                :class="tipo === 0 ? ' text-gray-800' : ' text-gray-800'"
              >
                ${{ total | decimalFormat }}
              </div>

              <div class="text-gray-500">
                asfasfasd
                <!-- <span v-if="cfdi && cfdi.emisorNombre">
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
                </span> -->
              </div>
            </div>
            <div class="ml-2 flex-shrink-0 flex space-x-2 items-center text-sm">
              <!-- <p class="uppercase px-2 inline-flex text-xs leading-5 font-semibold rounded-sm bg-yellow-50 text-yellow-800 border border-yellow-200">
                                          pendiente
                                        </p> -->
              <span v-if="empresa.name" class="capitalize">
                {{ empresa.name }}
              </span>
              <span v-else-if="empresa.legalName" class="capitalize">
                {{ empresa.legalName }}
              </span>
              <span v-else-if="empresa.taxId" class="capitalize">
                {{ empresa.taxId }}
              </span>

              <badge-income
                v-if="tipo === 0"
                :with-text="false"
                width="w-6 p-1"
                height="h-4"
              ></badge-income>
              <badge-expense
                v-if="tipo === 1"
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
                  <!-- {{ moneda }}  -->
                  <!-- {{ $t("shared.in") }} -->
                </span>
                <!-- <span v-if="empresa.name" class="capitalize">
                  {{ empresa.name }}
                </span>
                <span v-else-if="empresa.legalName" class="capitalize">
                  {{ empresa.legalName }}
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
                por {{ getCreatedByUser.firstName }}
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
              </p>
              <!-- <span class="inline-flex items-center justify-center h-6 w-6 rounded-full truncate bg-gray-300 shadow-xl px-3"><span class="text-xs leading-none text-gray-600">AM</span></span> -->
              <!-- <svg class="h-4 w-4 ml-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                                        </svg> -->
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
export default class TicketTableItemCollapsed extends Vue {
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
