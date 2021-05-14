<template>
  <div class="pt-2 pb-40 md:py-6 mx-auto px-4 sm:px-6 md:px-8 overflow-hidden">
    <div class="">
      <div
        class="justify-between flex mb-2 space-x-2 space-y-0 bg-white p-3 items-center -mx-8 -my-3 md:-my-6 px-8 shadow-inner border border-gray-200"
      >
        <div class="">
          <h1 class="flex-1 text-lg font-extrabold flex items-center">
            {{ $t("models.workspace.plural") }}
            <span
              class="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-50 border border-gray-300 ml-2"
            >
              <span class="text-xs font-medium leading-none text-gray-800">{{
                workspaces.length
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
              <!--                <svg class="ml-2.5 -mr-1.5 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">-->
              <!--                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />-->
              <!--                </svg>-->
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
              @click="$router.push({ name: 'app.workspaces.new' })"
              id="new"
              type="button"
              class="items-center w-full bg-white border border-gray-300 rounded-l-none rounded-r-sm shadow-sm px-2 py-2 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <!--                <svg class="ml-2.5 -mr-1.5 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">-->
              <!--                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />-->
              <!--                </svg>-->
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
      <div class="mt-4 sm:mt-8">
        <div v-if="loading">
          <table-row-skeleton></table-row-skeleton>
          <table-row-skeleton></table-row-skeleton>
          <table-row-skeleton></table-row-skeleton>
        </div>
        <div v-else>
          <div v-if="workspaces.length === 0">
            <div
              class="max-w-md mx-auto px-4 lg:px-10 flex justify-center py-2 md:py-8 lg:py-12 rounded-sm"
            >
              <div class="text-center flex flex-col justify-center">
                <SvgResultsEmpty></SvgResultsEmpty>
                <router-link
                  :to="{ name: 'app.workspaces.new' }"
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
                    $t("models.workspace.object")
                      .toString()
                      .toLowerCase()
                  }}
                </router-link>
              </div>
            </div>
          </div>
          <div v-else>
            <div
              class="space-y-4 mt-2 max-w-sm sm:max-w-full overflow-x-auto min-h-screen"
            >
              <ul class="mt-3 grid grid-cols-1 gap-5">
                <workspace-item
                  v-for="item in workspaces"
                  :key="item.id"
                  :id="item.id"
                  class="col-span-1 flex shadow-sm rounded-md relative"
                  v-bind="item"
                />
              </ul>
            </div>

            <div v-if="maxNumberOfWorkspacesReached && features">
              <div
                class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-8 min-w-full"
              >
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg
                      class="h-5 w-5 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm leading-5 text-yellow-700">
                      {{ $t("app.workspaces.errors.maxNumberOfWorkspaces") }}
                      ({{ features.maxNumberOfWorkspaces }})
                      <router-link
                        :to="{ name: 'settings.tenant.subscription' }"
                        class="font-medium underline text-yellow-700 hover:text-yellow-600 transition ease-in-out duration-150"
                        >{{ $t("shared.upgrade") }}</router-link
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import SideModal from "../../../components/shared/modals/SideModal.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import PageTitle from "../../../components/shared/navigation/PageTitle.vue";
import Modal from "../../../components/shared/modals/Modal.vue";
import { mapGetters } from "vuex";
import { TenantFeaturesResponse } from "@/application/contracts/master/tenants/TenantFeaturesResponse";
import WorkspaceItem from "./WorkspaceItem.vue";
import ErrorModalComponent from "@/components/shared/modals/NewErrorModal.vue";
import { TicketStatus } from "@/application/enums/app/transactions/TicketStatus";
import { WorkspaceDto } from "@/application/dtos/app/workspaces/WorkspaceDto";

@Component({
  components: {
    Modal,
    SideModal,
    ObjectList,
    TableRowSkeleton,
    SvgResultsEmpty,
    ErrorModal,
    PageTitle,
    WorkspaceItem
    // BeakerIcon,
  },
  computed: {
    ...mapGetters("tenant", {
      features: "features",
      workspaces: "workspaces"
    })
  }
})
export default class WorkspacesList extends BaseComponent {
  $refs!: {
    uploadTicketsModal: Modal;
    errorModal: ErrorModalComponent;
  };
  private features!: TenantFeaturesResponse;
  private workspaces!: WorkspaceDto[];
  created() {
    const self = this;
    this.eventBus.$on("workspace-deleted", data => self.deleted(data));
    this.eventBus.$on("workspace-added", data => self.added(data));
    this.eventBus.$on("workspace-saved", data => self.reload());
  }
  destroy() {
    this.eventBus.$off("workspace-deleted");
    this.eventBus.$off("workspace-added");
    this.eventBus.$off("workspace-saved");
  }
  mounted() {
    this.services.tenants.getFeatures();
    this.reload();
  }
  async reload(status?: TicketStatus) {
    // this.items = [];
    this.loading = true;
    this.services.workspaces
      .getAllWorkspaces(true)
      .then((response: WorkspaceDto[]) => {
        // console.log(JSON.stringify(response))
        // this.items = response;
      })
      .catch(error => {
        this.$refs.errorModal.show(error);
      })
      .finally(() => {
        this.loading = false;
      });
  }
  deleted(data: WorkspaceDto) {
    this.reload();
  }
  // canceled() {
  // }
  added(data: WorkspaceDto) {
    this.reload();
  }
  saved(data: WorkspaceDto) {
    this.reload();
  }
  get maxNumberOfWorkspacesReached() {
    if (!this.features) {
      return true;
    } else {
      if (
        this.features.maxNumberOfWorkspaces > 0 &&
        this.workspaces.length >= this.features.maxNumberOfWorkspaces
      ) {
        return true;
      }
      return false;
    }
  }
}
</script>
