<template>
  <div>
    <div
      class="flex-shrink-0 flex items-center justify-center w-16 text-sm font-medium rounded-l-md"
      :class="getProjectColor"
    >
      {{ projectInitials() }}
    </div>
    <div
      class="flex-1 flex items-baseline justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate pr-2"
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
            <color-select
              v-on:selected="selectedColor"
              :initial="color"
              :disabled="isProyectOwnerOrAdmin"
              v-if="isProyectOwnerOrAdmin"
            ></color-select>
            <user-multiselect
              v-if="isProyectOwnerOrAdmin"
              :initialSelected="idsUsuarios"
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
                    :to="'/app/proyectos/editar/' + id"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    >{{ $t("shared.edit") }}</router-link
                  >
                </div>
                <div class="py-1">
                  <div
                    class="text-left w-full block px-4 py-2 text-xs text-gray-400 font-medium"
                  >
                    {{ $t("shared.change") }} {{ $t("models.project.status") }}
                  </div>
                  <div
                    v-for="(status, idxStatus) in arrStatus"
                    :key="idxStatus"
                  >
                    <button
                      class="text-left w-full block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                      :class="{
                        'cursor-not-allowed text-gray-400':
                          projectStatus === status.value,
                        'hover:bg-gray-100 hover:text-gray-900 text-gray-700':
                          projectStatus !== status.value
                      }"
                      v-if="projectStatus !== status.value"
                      role="menuitem"
                      :disabled="projectStatus === status.value"
                      @click="cambiarEstatus(status.value)"
                    >
                      {{ status.action }}
                    </button>
                  </div>
                </div>
              </template>
            </dropdown-options>
          </div>
        </div>
        <div class="text-gray-500 -mt-1 flex items-center justify-between pr-3">
          <div v-if="members.length === 1">
            1
            {{
              $t("models.tenant.member")
                .toString()
                .toLowerCase()
            }}
          </div>
          <div v-else-if="members.length > 1">
            {{ members.length }}
            {{
              $t("models.tenant.members")
                .toString()
                .toLowerCase()
            }}
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
            <div class="flex space-x-1 items-center">
              <router-link
                class="hover:text-yellow-600 hover:underline"
                :to="{ name: 'app.tickets', query: { proyecto: id } }"
                v-if="summary.ticketsCount > 0"
              >
                {{ summary.ticketsCount }}
                {{
                  $t("models.ticket.plural")
                    .toString()
                    .toLowerCase()
                }}
              </router-link>
              <router-link
                class="hover:text-rose-600 hover:underline"
                :to="'/app/facturas?proyecto=' + id"
                v-if="summary.expenseCount > 0"
              >
                {{ summary.expenseCount }}
                {{
                  $t("app.transactions.expensePlural")
                    .toString()
                    .toLowerCase()
                }}
              </router-link>
              <div
                v-if="summary.ticketsCount === 0 && summary.expenseCount === 0"
                class="text-gray-500"
              >
                {{ $t("app.tickets.noTicketsNorInvoices") }}
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
          <div>{{ $t("models.project.budget") }}:</div>
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
import { ProjectDto } from "../../../application/dtos/app/projects/ProjectDto";
import { Prop } from "vue-property-decorator";
import * as projectHelpers from "@/application/modules/projects/ProjectHelpers";
import { ProjectStatus } from "@/application/enums/app/projects/ProjectStatus";
import { Colors } from "@/application/enums/app/common/Colors";
import { ProjectMemberDto } from "@/application/dtos/app/projects/ProjectMemberDto";
import { Period } from "@/application/enums/app/common/Period";
import { SummaryCountTotalResponse } from "@/application/contracts/app/summaries/SummaryCountTotalResponse";
import { mapGetters } from "vuex";
import { UserDto } from "@/application/dtos/master/users/UserDto";
import { Role } from "@/application/enums/app/common/Role";
import DropdownOptions from "@/components/shared/dropdowns/DropdownOptions.vue";
import ColorSelect from "@/components/shared/selectors/ColorSelect.vue";
import UserMultiselect from "@/components/shared/selectors/UserMultiselect.vue";
import BadgeCheck from "@/components/app/badges/BadgeCheck.vue";
import ConfirmModalComponent from "@/components/shared/modals/ConfirmModal.vue";
import { SummaryCountTotalType } from "@/application/enums/app/transactions/SummaryCountTotalType";

@Component({
  components: {
    DropdownOptions,
    ColorSelect,
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
export default class ProjectItem extends BaseComponent {
  $refs!: {
    options: DropdownOptions;
    addModal: ConfirmModalComponent;
    removeModal: ConfirmModalComponent;
  };
  @Prop({ default: "" }) id!: string;
  @Prop({ default: Colors.UNDEFINED }) color!: Colors;
  @Prop({ default: "" }) name!: string;
  @Prop() status!: ProjectStatus;
  @Prop({ default: [] }) members!: ProjectMemberDto[];
  @Prop({ default: "" }) createdByUserId!: string;
  @Prop({ default: false }) default!: boolean;
  @Prop({ default: 0 }) budget!: number;
  @Prop({ default: Period.ALL }) initialPeriod!: Period;
  private period: Period = Period.ALL;
  private projectStatus: ProjectStatus = ProjectStatus.ACTIVE;
  private currentProjectColor: Colors = Colors.UNDEFINED;
  private user!: UserDto;
  private loadingSummary: boolean = false;
  private userId: string = "";
  private isOwnerOrAdmin!: boolean;
  private summary: SummaryCountTotalResponse = {
    type: SummaryCountTotalType.PROJECT,
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
  private arrStatus = [
    {
      name: this.$t("app.projects.status.ACTIVE"),
      value: 0,
      description: this.$t("app.projects.statusPlural.ACTIVE"),
      class: "bg-teal-300 border border-teal-500",
      action: this.$t("app.projects.actions.activate")
    },
    {
      name: this.$t("app.projects.status.PENDING"),
      value: 1,
      description: this.$t("app.projects.statusPlural.PENDING"),
      class: "bg-yellow-300 border border-yellow-500",
      action: this.$t("app.projects.actions.pending")
    },
    {
      name: this.$t("app.projects.status.ARCHIVED"),
      value: 2,
      description: this.$t("app.projects.statusPlural.ARCHIVED"),
      class: "bg-gray-300 border border-gray-500",
      action: this.$t("app.projects.actions.activate")
    }
  ];
  mounted() {
    this.members = this.members;
    this.projectStatus = this.status;
    this.currentProjectColor = this.color;
    this.cargarResumen(this.initialPeriod);
  }
  cargarResumen(period: Period) {
    this.period = period;
    this.loadingSummary = true;
    this.services.dashboard
      .getSummaryCountTotal(
        SummaryCountTotalType.PROJECT,
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
  selectedColor(value) {
    this.changeColor(value);
  }
  changeColor(color: Colors) {
    this.currentProjectColor = color;
    this.services.projects.updateStatusAndColor(
      this.id,
      this.projectStatus,
      color
    );
  }
  closeOptions() {
    this.$refs.options.close();
  }
  cambiarEstatus(status: ProjectStatus) {
    this.projectStatus = status;
    this.$emit("updatedEstatus", this.id, status);
    this.services.projects.updateStatusAndColor(
      this.id,
      status,
      this.currentProjectColor
    );
  }
  projectInitials(): string {
    if (!this.name) {
      return "";
    }
    const words = this.name.split(" ");
    const initials: string[] = [];
    words.forEach(word => {
      const cleanWord = word.replace(/\W/g, " ").trim();
      if (cleanWord !== "" && initials.length < 2) {
        initials.push(cleanWord[0].toUpperCase());
      }
    });
    if (initials.length >= 2) {
      return initials.join("");
    } else if (this.name.length > 1) {
      return this.name.substring(0, 2).toUpperCase();
    } else {
      return this.name.substring(0, 1).toUpperCase();
    }
  }
  yesAdd() {
    this.services.projects
      .addMember(this.id, {
        userId: this.userId,
        proyectoId: this.id,
        rol: Role.MEMBER
      })
      .then((response: ProjectMemberDto) => {
        this.members.push(response);
      });
  }
  yesRemove() {
    const removeUserId = this.userId;
    const usuario = this.members.find(f => f.userId === removeUserId);
    if (usuario) {
      this.services.projects.removeMember(usuario.id).then(() => {
        this.members = this.members.filter(f => f.userId !== removeUserId);
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
      `¿Agregar a ${userAdded} a ${this.name}?`,
      "Agregar",
      "No",
      "Como miembro, no podrá editar el proyecto, solamente subir tickets y facturas."
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
      `¿Remover de ${userRemoved} de ${this.name}?`,
      "Agregar",
      "No",
      "Ya no podrá subir tickets ni facturas al proyecto."
    );
  }
  //   updatedMembers(selected: string[]){
  //       this.members.forEach(usuario => {
  //           if(usuario.rol !== Rol.Administrador){
  //               if(selected.includes(f=>f.))
  //           }
  //       });
  //   }

  get isProyectOwnerOrAdmin() {
    if (this.isOwnerOrAdmin) {
      return true;
    }
    if (this.createdByUserId === this.user.id) {
      return true;
    }
    const usuario = this.members.find(f => f.userId === this.user.id);
    return usuario && usuario.role === Role.ADMINISTRATOR;
  }
  get isProyectOwnerOrAdmins() {
    const ids: string[] = [];
    ids.push(this.createdByUserId);
    const admins = this.members.filter(f => f.role === Role.ADMINISTRATOR);
    admins.forEach(element => {
      ids.push(element.userId);
    });
    return ids;
  }
  get idsUsuarios(): string[] {
    return this.members.map(f => f.userId);
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
  get getProjectColor() {
    return projectHelpers.getProjectColor(
      this.currentProjectColor,
      600,
      100,
      300
    );
  }
}
</script>

