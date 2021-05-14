<template>
  <div>
    <div
      class="flex-1 flex items-baseline justify-between border border-gray-200 bg-white rounded-r-md truncate pr-2"
    >
      <div class="flex-1 pl-4 pr-2 py-2 text-sm truncate">
        <div class="flex justify-between items-center">
          <div class="text-gray-900 font-medium hover:text-gray-600 truncate">
            {{ name }}
            <span
              v-if="this.default"
              class="text-xs font-light truncate text-teal-600"
            >
              ({{
                $t("shared.default")
                  .toString()
                  .toLowerCase()
              }})</span
            >
          </div>
          <div class="flex items-center justify-end">
            <user-multiselect
              v-if="isProyectOwnerOrAdmin"
              :initialSelected="idsUsers"
              :exclude="isProyectOwnerOrAdmins"
              v-on:added="addedUser"
              v-on:removed="removedUser"
            ></user-multiselect>
            <dropdown-options
              v-if="isProyectOwnerOrAdmin"
              ref="options"
              :disabled="isProyectOwnerOrAdmin"
            >
              <template v-slot:options>
                <div class="py-1" role="none">
                  <router-link
                    :disabled="isProyectOwnerOrAdmin"
                    @click.native="closeOptions"
                    :to="{ name: 'app.workspaces.edit', params: { id } }"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    >{{ $t("shared.edit") }}</router-link
                  >
                </div>
              </template>
            </dropdown-options>
          </div>
        </div>
        <div class="text-gray-500 -mt-1 flex items-center justify-between pr-3">
          <div v-if="users.length > 0" class="truncate">
            {{ userEmails }}
          </div>
          <div v-else>{{ $t("app.tenants.members.hasNoMembers") }}</div>
        </div>
        <div class="flex justify-between pr-3">
          <div
            v-if="loadingSummary"
            class="flex items-center space-x-1 text-gray-500 text-xs"
          >
            ...
          </div>
          <div
            v-else-if="summary"
            class="flex items-center justify-between space-x-1 text-gray-500 text-xs w-full"
          >
            <div class="flex space-x-2 items-center divide-x">
              <div class="flex items-center">
                <router-link
                  class="hover:text-yellow-600 hover:underline border-r border-gray-300 pr-2"
                  :to="'/app/tickets?empresa=' + id"
                >
                  ${{ summary.ticketsTotal | intFormat }} ({{
                    summary.ticketsCount
                  }}
                  {{
                    $t("models.ticket.plural")
                      .toString()
                      .toLowerCase()
                  }})
                </router-link>
                <router-link
                  class="hover:text-rose-600 hover:underline border-r border-gray-300 px-2"
                  :to="'/app/facturas?empresa=' + id"
                >
                  ${{ summary.expenseTotal | intFormat }} ({{
                    summary.expenseCount
                  }}
                  {{
                    $t("app.transactions.expensePlural")
                      .toString()
                      .toLowerCase()
                  }})
                </router-link>
                <router-link
                  class="hover:text-teal-600 hover:underline px-2"
                  :to="'/app/facturas?empresa=' + id"
                >
                  ${{ summary.incomeTotal | intFormat }} ({{
                    summary.incomeCount
                  }}
                  {{
                    $t("app.transactions.incomePlural")
                      .toString()
                      .toLowerCase()
                  }})
                </router-link>
              </div>
            </div>
            <div v-if="total > 0" class="text-right font-bold">
              ${{ total | numberFormat }}
            </div>
          </div>
        </div>
        <div
          v-if="total > 0 && budget > 0"
          class="flex justify-between pr-3 text-xs text-gray-500"
        >
          <div>{{ $t("models.workspace.budget") }}:</div>
          <div class="text-xs">${{ budget | numberFormat }}</div>
        </div>
        <div
          v-if="total > 0 && budget > 0"
          class="flex justify-between pr-3 text-xs text-gray-500"
        >
          <div>{{ $t("shared.remaining") }}:</div>
          <div class="text-xs">${{ remaining | numberFormat }}</div>
        </div>
      </div>

      <div class=""></div>
    </div>
    <confirm-modal ref="addModal" v-on:yes="yesAdd"></confirm-modal>
    <confirm-modal ref="removeModal" v-on:yes="yesRemove"></confirm-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "@/components/shared/BaseComponent.vue";
import ConfirmModal from "@/components/shared/modals/ConfirmModal.vue";
import { Prop } from "vue-property-decorator";
import { Period } from "@/application/enums/app/common/Period";
import { SummaryCountTotalResponse } from "@/application/contracts/app/summaries/SummaryCountTotalResponse";
import { mapGetters } from "vuex";
import { UserDto } from "@/application/dtos/master/users/UserDto";
import DropdownOptions from "@/components/shared/dropdowns/DropdownOptions.vue";
import UserMultiselect from "@/components/shared/selectors/UserMultiselect.vue";
import BadgeCheck from "@/components/app/badges/BadgeCheck.vue";
import ConfirmModalComponent from "@/components/shared/modals/ConfirmModal.vue";
import { WorkspaceUserDto } from "@/application/dtos/app/workspaces/WorkspaceUserDto";
import { Colors } from "@/application/enums/app/common/Colors";
import { Role } from "@/application/enums/app/common/Role";
import * as ProjectHelpers from "@/application/modules/projects/ProjectHelpers";
import { SummaryCountTotalType } from "@/application/enums/app/transactions/SummaryCountTotalType";

@Component({
  components: {
    DropdownOptions,
    // ColorSelect,
    UserMultiselect,
    BadgeCheck,
    ConfirmModal
  },
  computed: {
    ...mapGetters("account", {
      user: "user"
    }),
    ...mapGetters("tenant", {
      isOwnerOrAdmin: "isOwnerOrAdmin"
    })
  }
})
export default class WorkspaceItem extends BaseComponent {
  $refs!: {
    options: DropdownOptions;
    addModal: ConfirmModalComponent;
    removeModal: ConfirmModalComponent;
  };
  @Prop({ default: "" }) id!: string;
  @Prop({ default: Colors.UNDEFINED }) color!: Colors;
  @Prop({ default: "" }) name!: string;
  @Prop({ default: "" }) taxId!: string;
  @Prop({ default: "" }) legalName!: string;
  @Prop({ default: "" }) cfdiUse!: string;
  @Prop({ default: "" }) addressStreet!: string;
  @Prop({ default: "" }) addressExterior!: string;
  @Prop({ default: "" }) addressInterior!: string;
  @Prop({ default: "" }) addressNeighborhood!: string;
  @Prop({ default: "" }) addressCity!: string;
  @Prop({ default: "" }) addressZip!: string;
  @Prop({ default: "" }) addressState!: string;
  @Prop({ default: "" }) addressCountry!: string;
  @Prop({ default: false }) default!: boolean;
  @Prop({ default: [] }) users!: WorkspaceUserDto[];
  @Prop({ default: "" }) createdByUserId!: string;
  @Prop({ default: 0 }) budget!: number;
  @Prop({ default: Period.ALL }) initialPeriod!: Period;
  private period: Period = Period.ALL;
  private user!: UserDto;
  private loadingSummary: boolean = false;
  private userId: string = "";
  private isOwnerOrAdmin!: boolean;
  private summary: SummaryCountTotalResponse = {
    type: SummaryCountTotalType.WORKSPACE,
    name: "",
    description: "",
    ticketsTotal: 0,
    ticketsCount: 0,
    expenseTotal: 0,
    expenseCount: 0,
    incomeTotal: 0,
    incomeCount: 0,
    incomePercentageTotal: 0,
    incomePercentageCount: 0,
    expensePercentageTotal: 0,
    expensePercentageCount: 0
  };
  mounted() {
    this.loadSummary(this.initialPeriod);
  }
  loadSummary(period: Period) {
    this.period = period;
    this.loadingSummary = true;
    this.services.dashboard
      .getSummaryCountTotal(
        SummaryCountTotalType.WORKSPACE,
        { period, withDetails: false },
        this.id
      )
      .then((summary: SummaryCountTotalResponse[]) => {
        if (summary && summary.length > 0) {
          this.summary = summary[0];
        }
      })
      .finally(() => {
        this.loadingSummary = false;
      });
  }
  closeOptions() {
    this.$refs.options.close();
  }
  yesAdd() {
    this.services.workspaces
      .addUser(this.id, {
        id: undefined,
        userId: this.userId,
        workspaceId: this.id,
        role: Role.MEMBER
      })
      .then((response: WorkspaceUserDto) => {
        this.users.push(response);
      });
  }
  yesRemove() {
    const removeUserId = this.userId;
    const user = this.users.find(f => f.userId === removeUserId);
    if (user) {
      this.services.workspaces.removeUser(user.id).then(() => {
        this.users = this.users.filter(f => f.userId !== removeUserId);
      });
    }
  }
  addedUser(
    userId: string,
    email: string,
    firstName: string,
    lastName: string
  ) {
    this.userId = userId;
    let userAdded = firstName;
    if (!userAdded || userAdded.toString().trim() === "") {
      userAdded = email;
    }
    this.$refs.addModal.show(
      this.$t("shared.addTo?", [userAdded, this.taxId]).toString(),
      this.$t("shared.add").toString(),
      this.$t("shared.no").toString()
    );
  }
  removedUser(
    userId: string,
    email: string,
    firstName: string,
    lastName: string
  ) {
    this.userId = userId;
    let userRemoved = firstName;
    if (!userRemoved || userRemoved.toString().trim() === "") {
      userRemoved = email;
    }
    this.$refs.removeModal.show(
      this.$t("shared.removeFrom?", [userRemoved, this.taxId]).toString(),
      this.$t("shared.add").toString(),
      this.$t("shared.no").toString(),
      this.$t("app.tickets.warnings.removingUser").toString()
    );
  }
  get userEmails() {
    return this.users.map(f => f.user?.email).join(", ");
  }
  get isProyectOwnerOrAdmin() {
    if (this.isOwnerOrAdmin) {
      return true;
    }
    if (this.createdByUserId === this.user.id) {
      return true;
    }
    const usuario = this.users.find(f => f.userId === this.user.id);
    return usuario && usuario.role === Role.ADMINISTRATOR;
  }
  get isProyectOwnerOrAdmins() {
    const ids: string[] = [];
    ids.push(this.createdByUserId);
    const admins = this.users.filter(f => f.role === Role.ADMINISTRATOR);
    admins.forEach(element => {
      ids.push(element.userId);
    });
    return ids;
  }
  get idsUsers(): string[] {
    return this.users.map(f => f.userId);
  }
  get remaining() {
    return this.budget - this.total;
  }
  get total() {
    if (this.summary) {
      return this.summary.ticketsTotal + this.summary.expenseTotal;
    }
    return 0;
  }
  get companyColor() {
    return ProjectHelpers.getProjectColor(Colors.COOL_GRAY, 600, 100, 300);
  }
}
</script>

