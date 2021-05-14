<template>
  <div class="pt-2 pb-40 md:py-6 mx-auto px-4 sm:px-6 md:px-8 overflow-hidden">
    <div class="">
      <div
        class="justify-between flex mb-2 space-x-2 space-y-0 bg-white p-3 items-center -mx-8 -my-3 md:-my-6 px-8 shadow-inner border border-gray-200"
      >
        <div class="">
          <h1 class="flex-1 text-lg font-extrabold flex items-center">
            {{ $t("models.project.plural") }}
            <span
              class="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-50 border border-gray-300 ml-2"
            >
              <span class="text-xs font-medium leading-none text-gray-800">{{
                items.length
              }}</span>
            </span>
          </h1>
        </div>
        <div class="flex items-end space-x-1 space-y-0">
          <span
            class="relative z-0 inline-flex shadow-sm rounded-sm w-full sm:w-auto"
          >
            <button
              @click="reload()"
              id="reload"
              type="button"
              class="items-center w-full bg-white border border-gray-300 rounded-l-none rounded-r-sm shadow-sm px-2 py-2 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </span>
          <span
            class="relative z-0 inline-flex shadow-sm rounded-sm w-full sm:w-auto"
          >
            <button
              @click="$router.push({ name: 'app.projects.new' })"
              id="nuevo"
              type="button"
              class="items-center w-full bg-white border border-gray-300 rounded-l-none rounded-r-sm shadow-sm px-2 py-2 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <svg
                class="h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </span>
        </div>
      </div>
      <div class="mt-8 sm:mt-10">
        <div v-if="loading">
          <table-row-skeleton></table-row-skeleton>
          <table-row-skeleton></table-row-skeleton>
          <table-row-skeleton></table-row-skeleton>
        </div>
        <div v-else>
          <div v-if="items.length === 0">
            <div
              class="max-w-md mx-auto px-4 lg:px-10 flex justify-center py-2 md:py-8 lg:py-12 rounded-sm"
            >
              <div class="text-center flex flex-col justify-center">
                <SvgResultsEmpty></SvgResultsEmpty>
                <router-link
                  :to="{ name: 'app.projects.new' }"
                  class="text-center px-2 py-2 border-transparent text-sm leading-3 font-medium rounded-sm text-gray-800 bg-blueGray-50 border border-blueGray-300 hover:bg-blueGray-100 focus:outline-shadow active:bg-gray-900 transition duration-150 ease-in-out"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="plus"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    class="text-gray-500 md:relative mr-2 svg-inline--fa fa-plus fa-w-14 fa-sm"
                    style="bottom: 1px"
                  >
                    <path
                      fill="currentColor"
                      d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                      class
                    />
                  </svg>
                  {{ $t("models.shared.createTheFirst") }}
                  {{
                    $t("models.project.object")
                      .toString()
                      .toLowerCase()
                  }}
                </router-link>
              </div>
            </div>
          </div>
          <div v-else>
            <div
              class="space-y-4 mt-2 max-w-sm sm:max-w-md lg:max-w-full overflow-x-auto min-h-screen"
            >
              <div class="pb-4">
                <h2
                  class="text-gray-500 text-xs font-medium uppercase tracking-wide"
                >
                  {{ $t("app.projects.active") }} ({{ activeProjects.length }})
                </h2>
                <ul
                  class="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-2"
                >
                  <project-item
                    :id="project.id"
                    v-on:updatedEstatus="updatedEstatus"
                    v-for="project in activeProjects"
                    :key="project.id"
                    class="col-span-1 flex shadow-sm rounded-md relative"
                    v-bind="project"
                  >
                  </project-item>
                </ul>
              </div>
              <div class="pb-4">
                <h2
                  class="text-gray-500 text-xs font-medium uppercase tracking-wide"
                >
                  {{ $t("app.projects.statusPlural.PENDING") }} ({{
                    pending.length
                  }})
                </h2>
                <div v-if="!showPending">
                  <button
                    v-if="pending.length > 0"
                    @click="showPending = true"
                    class="text-xs sm:text-sm text-gray-400 hover:text-blue-600 underline"
                  >
                    {{ $t("shared.viewAll") }}
                  </button>
                </div>
                <ul
                  v-else
                  class="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-2"
                >
                  <project-item
                    :id="project.id"
                    v-on:updatedEstatus="updatedEstatus"
                    v-for="project in pending"
                    :key="project.id"
                    class="col-span-1 flex shadow-sm rounded-md relative"
                    v-bind="project"
                  >
                  </project-item>
                </ul>
              </div>
              <div class="pb-4">
                <h2
                  class="text-gray-500 text-xs font-medium uppercase tracking-wide"
                >
                  {{ $t("app.projects.statusPlural.ARCHIVED") }} ({{
                    archived.length
                  }})
                </h2>
                <div v-if="!showArchived">
                  <button
                    v-if="archived.length > 0"
                    @click="showArchived = true"
                    class="text-xs sm:text-sm text-gray-400 hover:text-blue-600 underline"
                  >
                    {{ $t("shared.viewAll") }}
                  </button>
                </div>
                <ul
                  v-else
                  class="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-2"
                >
                  <project-item
                    :id="project.id"
                    v-on:updatedEstatus="updatedEstatus"
                    v-for="project in archived"
                    :key="project.id"
                    class="col-span-1 flex shadow-sm rounded-md relative"
                    v-bind="project"
                  >
                  </project-item>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <project-members
      v-if="projectId"
      v-on:closed="projectId = ''"
    ></project-members>
    <router-view></router-view>

    <error-modal ref="errorModal"></error-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import ObjectList from "../../../components/shared/forms/ObjectList.vue";
import TableRowSkeleton from "../../../components/shared/skeletons/TableRowSkeleton.vue";
import SvgResultsEmpty from "../../../assets/img/ResultsEmpty.vue";
import { TicketStatus } from "../../../application/enums/app/transactions/TicketStatus";
import SideModal from "../../../components/shared/modals/SideModal.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import PageTitle from "../../../components/shared/navigation/PageTitle.vue";
import Modal from "../../../components/shared/modals/Modal.vue";
import { ProjectDto } from "../../../application/dtos/app/projects/ProjectDto";
import { mapGetters } from "vuex";
import { TenantFeaturesResponse } from "@/application/contracts/master/tenants/TenantFeaturesResponse";
import ProyectoMembers from "./ProjectMembers.vue";
import { ProjectStatus } from "@/application/enums/app/projects/ProjectStatus";
import { TenantUserDto } from "@/application/dtos/master/tenants/TenantUserDto";
import { ProjectMemberDto } from "@/application/dtos/app/projects/ProjectMemberDto";
import ProjectItem from "./ProjectItem.vue";
import ErrorModalComponent from "@/components/shared/modals/NewErrorModal.vue";
import { Watch } from "vue-property-decorator";

@Component({
  components: {
    Modal,
    SideModal,
    ObjectList,
    TableRowSkeleton,
    SvgResultsEmpty,
    ErrorModal,
    PageTitle,
    ProyectoMembers,
    ProjectItem
  },
  computed: {
    ...mapGetters("tenant", {
      features: "features"
    })
  }
})
export default class ProjectsList extends BaseComponent {
  $refs!: {
    uploadTicketsModal: Modal;
    errorModal: ErrorModalComponent;
  };
  // private items = [] as ProyectoDto[];
  private adding: boolean = false;
  private showArchived: boolean = false;
  private showPending: boolean = false;
  private features!: TenantFeaturesResponse;
  private items: ProjectDto[] = [];
  private projectId: string = "";
  private users: TenantUserDto[] = [];
  created() {
    const self = this;
    this.eventBus.$on("project-canceled", () => self.canceled());
    this.eventBus.$on("project-deleted", data => self.deleted(data));
    this.eventBus.$on("project-added", data => self.added(data));
    this.eventBus.$on("project-saved", data => self.reload());
  }
  destroy() {
    this.eventBus.$off("project-canceled");
    this.eventBus.$off("project-deleted");
    this.eventBus.$off("project-added");
    this.eventBus.$off("project-saved");
  }
  mounted() {
    // this.services.tenantUsers.getAll().then((response: TenantUserDto[]) => {
    //   this.users = response;
    // });
    this.reload();
  }
  async reload(status?: TicketStatus) {
    // this.items = [];
    this.loading = true;
    this.items = [];
    this.services.projects
      .getAllProjects(false)
      .then((response: ProjectDto[]) => {
        // console.log(JSON.stringify(response))
        this.items = response;
      })
      .catch(error => {
        this.$refs.errorModal.show(error);
      })
      .finally(() => {
        this.loading = false;
      });
  }
  deleted(data: ProjectDto) {
    // this.reload();
    this.items = this.items.filter(f => f.id !== data.id);
  }
  canceled() {
    // console.log("canceled");
  }
  added(data: ProjectDto) {
    // this.reload();
    // console.log("added data:" + JSON.stringify(data));
    // this.items.push(data);
    this.reload();
  }
  saved(data: ProjectDto) {
    // this.reload();
    // const idx = this.items.findIndex((f) => f.id === data.id);
    // this.items[idx] = data;
    this.reload();
  }
  projectsByStatus(status: ProjectStatus) {
    return this.items.filter(f => f.status === status);
  }
  avatarText(item: ProjectMemberDto) {
    if (item.user.firstName && item.user.lastName) {
      return item.user.firstName[0] + item.user.lastName[0];
    } else if (item.user.firstName) {
      return item.user.firstName[0];
    } else {
      return item.user.email.substring(0, 2).toUpperCase();
    }
  }
  userAvatar(user: ProjectMemberDto) {
    if (this.users) {
      const tenantUser = this.users.find(f => f.userId === user.id);
      if (tenantUser) {
        return tenantUser.avatar;
      }
    }
    return "";
  }
  updatedEstatus(id, status) {
    const item = this.items.find(f => f.id === id);
    if (item) {
      item.status = status;
    }
  }
  get activeProjects() {
    return this.projects.filter(f => f.status === ProjectStatus.ACTIVE);
  }
  get pending() {
    return this.projects.filter(f => f.status === ProjectStatus.PENDING);
  }
  get archived() {
    return this.projects.filter(f => f.status === ProjectStatus.ARCHIVED);
  }
  get projects() {
    if (!this.items) {
      return [];
    }
    return this.items;
  }
  @Watch("$store.state.tenant.currentWorkspace")
  changedWorkspace() {
    console.log("changed workspace");
    // this.reload();
  }
  // get maxNumberOfWorkspacesReached() {
  //   if (!this.features) {
  //     return true;
  //   } else {
  //     if (
  //       this.features.maxNumberOfWorkspaces > 0 &&
  //       this.projects.length >= this.features.maxNumberOfWorkspaces
  //     ) {
  //       return true;
  //     }
  //     return false;
  //   }
  // }
}
</script>
