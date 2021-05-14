<template>
  <div v-if="id">
    <div class="px-1 sm:px-4 py-1 text-xs sm:text-sm">
      <div class="flex justify-between items-start">
        <span class="w-full space-y-1">
          <div class="flex items-center justify-between">
            <div
              class="w-3/4 flex items-center space-x-2 px-2 justify-start truncate"
            >
              <div
                class="text-gray-700 truncate capitalize flex items-center space-x-1"
              >
                <div v-if="admin && tenant" class="font-bold">
                  {{ tenant.name }} -
                </div>
                <div>
                  {{ legalName }}
                </div>
              </div>
            </div>
            <div class="1/4 flex items-center space-x-2 px-2 text-sm">
              <div class="font-bold text-right ml-2 text-xs truncate">
                #{{ number }}
              </div>
              <div class="">
                <badge-check
                  v-if="isExpense"
                  size="xs"
                  :withText="false"
                  width="w-6 p-1"
                  height="h-4"
                ></badge-check>
                <badge-ticket v-else size="xs" :status="status"></badge-ticket>
              </div>
            </div>
          </div>
          <div class="flex justify-between px-2">
            <div class="sm:flex text-gray-500 truncate pr-3">
              <div
                class="text-gray-700 text-xs truncate flex space-x-1 items-center"
              >
                <span>
                  <div class="flex items-center space-x-1 text-xs font-light">
                    <div
                      v-if="project && project.name"
                      class="h-2 w-2 rounded-full"
                      :class="projectColor()"
                    ></div>
                    <div v-if="project && project.name">
                      {{ project.name }}
                    </div>
                    <div v-else class="text-gray-300">
                      --
                      {{
                        $t("app.projects.notDefined")
                          .toString()
                          .toLowerCase()
                      }}
                      --
                    </div>
                  </div>
                </span>
              </div>
            </div>
            <div
              v-if="true"
              class="flex items-center text-xs text-gray-500 mt-0 truncate"
            >
              <p>
                <span v-if="!scanned" class="text-gray-300"
                  >{{ $t("app.tickets.hasNotBeenScanned") }}...</span
                >
                <span v-else> ${{ possibleTotal | decimalFormat }} </span>
              </p>
            </div>
          </div>
          <div class="flex justify-between px-2 text-gray-500 space-x-1">
            <div>
              <div class="truncate text-gray-500 text-xs">
                <span v-if="status === 0" class="text-gray-400">
                  {{ $t("app.tickets.status.PENDING") }} -
                  <span class="text-xs font-bold"> {{ cfdiUse }}</span></span
                >
                <span v-else-if="status === 3" class="text-red-600">
                  {{ $t("app.tickets.status.DUPLICATED") }}
                  {{ errorDescription }}
                </span>
                <span
                  v-else-if="errorDescription && status !== 2"
                  class="text-xs text-red-600"
                >
                  {{ errorDescription }}</span
                >
                <span v-else-if="status === 1" class="text-blue-600">
                  {{ $t("app.tickets.status.REQUESTED") }}</span
                >
                <span v-else-if="status === 2" class="text-teal-600">
                  {{ $t("app.tickets.status.INVOICED") }}</span
                >

                <span v-else-if="status === 4" class="text-red-600">
                  {{ $t("app.tickets.status.UNREADABLE") }}</span
                >
                <span v-else-if="status === 5" class="text-red-600">
                  {{ $t("app.tickets.status.EXPIRED") }}</span
                >
                <span v-else-if="status === 6" class="text-red-600">
                  {{ $t("app.tickets.status.INVALID") }}</span
                >
              </div>
            </div>
            <div class="text-xs truncate">
              <time :datetime="createdAt | dateYMD">
                {{ createdAt | dateAgo }}
              </time>
              <span v-if="createdByUser">
                {{ $t("shared.by") }}
                <span v-if="createdByUser.firstName">
                  {{ createdByUser.firstName }}
                </span>
                <span v-else>
                  {{ createdByUser.email.split("@")[0] }}
                </span>
              </span>
            </div>
          </div>
          <div class="flex justify-between px-2 text-gray-500 space-x-1">
            <div>
              <span v-if="comments && comments !== ''">
                <div class="flex items-center space-x-1 text-xs">
                  <div>{{ comments }}</div>
                </div>
              </span>
            </div>
          </div>
          <div class="flex justify-between px-2 text-xs space-x-1">
            <div class="text-violet-600">
              <span v-if="possibleWebsite"></span>
              {{ possibleWebsite }}
            </div>
            <div>
              <span
                v-if="admin"
                :class="{
                  'text-gray-600': whoInvoices === 0,
                  'text-organe-600': whoInvoices === 1,
                  'text-blue-600': whoInvoices === 2
                }"
              >
                {{ whoInvoicesDescription }}
              </span>
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
          </div>
          <div v-if="showDetails">
            <ticket-item-details :id="id" :key="id"> </ticket-item-details>
          </div>
        </span>
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
import BadgeExpense from "@/components/app/badges/BadgeExpense.vue";
import BadgeCheck from "@/components/app/badges/BadgeCheck.vue";
import { ProjectDto } from "../../../application/dtos/app/projects/ProjectDto";
import * as projectHelpers from "@/application/modules/projects/ProjectHelpers";
import { WhoInvoices } from "@/application/enums/app/cfdis/WhoInvoices";

@Component({
  components: {
    TicketItemDetails,
    BadgeTicket,
    BadgeExpense,
    BadgeCheck
  }
})
export default class TicketTableItem extends Vue {
  @Prop({ default: false }) admin!: boolean;
  @Prop() id!: string;
  @Prop() createdSince!: string;
  @Prop() createdAt!: Date;
  @Prop() createdByUser!: UserDto;
  @Prop() description!: string;
  @Prop() error!: string;
  @Prop() number!: number;
  @Prop() status!: TicketStatus;
  @Prop() scannedLines!: string[];
  @Prop() taxId!: string;
  @Prop() legalName!: string;
  @Prop() cfdiUse!: string;
  @Prop() tenant!: TenantDto;
  @Prop() transactions!: TransactionDto[];
  @Prop() imagen!: string;
  @Prop({ default: false }) allowShowDetails!: boolean;
  @Prop() possibleTotal!: number;
  @Prop() possibleWebsite!: string;
  @Prop() possibleDate!: number;
  @Prop() possibleFolio!: number;
  @Prop() errorDescription!: string;
  @Prop() project!: ProjectDto;
  @Prop() comments!: string;
  @Prop() whoInvoices!: WhoInvoices;
  @Prop() scanned!: boolean;
  private showDetails: boolean = false;
  avatarText() {
    if (this.createdByUser?.firstName && this.createdByUser?.lastName) {
      return this.createdByUser?.firstName[0] + this.createdByUser?.lastName[0];
    } else if (this.createdByUser?.firstName) {
      return this.createdByUser?.firstName[0];
    } else {
      return "?";
    }
  }
  projectColor() {
    return projectHelpers.getProjectColor(this.project?.color);
  }
  get whoInvoicesDescription() {
    return this.$t("app.tickets.whoInvoices." + this.whoInvoices);
  }
  get isExpense() {
    return this.status === 2;
  }
}
</script>
