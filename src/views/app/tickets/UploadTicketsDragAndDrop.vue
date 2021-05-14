<template>
  <div>
    <div
      class="shadow-inner border border-gray-300 sm:rounded-sm sm:overflow-hidden"
    >
      <div
        class="justify-center"
        v-if="
          loadingRfcs || loadingProjects || loadingUploading || loadingSummary
        "
      >
        <div class="h-auto w-full flex justify-center py-12">
          <div
            class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"
          ></div>
        </div>
        <div
          v-if="loadingUploading && tickets && tickets.length > 0"
          class="items-center justify-center font-bold text-xs pb-6 space-x-1"
        >
          <div class="flex justify-center text-sm">
            {{ $t("shared.uploading") }}
            {{
              $t("models.ticket.plural")
                .toString()
                .toLowerCase()
            }}...
          </div>
          <div class="text-xs font-light flex justify-center">
            ({{ $t("shared.mayTakeMinutes") }})
          </div>
        </div>
      </div>
      <div v-else-if="!canUploadTickets">
        <p class="text-sm leading-5 text-yellow-700 p-5 bg-yellow-50">
          {{ $t("app.tickets.upload.limitReached", [summary.monthlyTickets]) }}
          <router-link
            :to="{ name: 'settings.tenant.subscription' }"
            class="font-medium underline text-yellow-700 hover:text-yellow-600 transition ease-in-out duration-150"
            >{{ $t("shared.upgrade") }}</router-link
          >
        </p>
      </div>
      <div v-else>
        <div
          v-if="isOwnerOrAdmin"
          class="py-2 px-4 font-light italic border border-gray-200 text-sm"
          :class="{
            'bg-gray-50': ticketsRemaining >= 20,
            'bg-yellow-50': ticketsRemaining >= 10 && ticketsRemaining < 20,
            'bg-red-50': ticketsRemaining < 10
          }"
        >
          <div>
            {{ $t("app.tickets.upload.ticketsRemaining", [ticketsRemaining]) }}.
            <span v-if="whoInvoices === 0">{{
              $t("app.tickets.whoInvoices.0")
            }}</span>
            <span v-else-if="whoInvoices === 1">{{
              $t("app.tickets.whoInvoices.1")
            }}</span>
          </div>
        </div>
        <div class="bg-white py-6 px-4 space-y-1 sm:p-6">
          <div class="">
            <drop-images
              v-show="anyWorkspaces"
              ref="dropImages"
              class="h-20"
              v-on:droppedFiles="droppedFiles"
            />
            <div v-if="!anyWorkspaces" class="flex-row justify-center">
              <p class="font-normal text-sm">{{ $t("app.workspaces.askAdminToAddYou") }}</p>
              <br />
              <p v-if="isOwnerOrAdmin">
                <router-link
                  :to="{ name: 'app.workspaces.new' }"
                  class="font-semibold text-sm underline cursor-pointer hover:text-blueGray-500"
                  >{{ $t("app.shared.buttons.clickHereToAdd") }}</router-link
                >
              </p>
            </div>
          </div>
          <div v-for="(ticket, idxTicket) in tickets" :key="idxTicket">
            <div
              class="text-gray-800 w-full border border-gray-50"
              :id="'ticket-' + (idxTicket + 1)"
            >
              <button
                type="button"
                @click="toggleTicketsOpen(idxTicket)"
                class="inline-flex items-center justify-between w-full p-1.5 hover:bg-gray-50 border border-gray-300 focus:outline-none"
              >
                <div class="flex space-x-2">
                  <span
                    class="rounded-sm p-0.5 bg-theme-50 border border-gray-300 items-center"
                  >
                    <img class="h-5 w-5" :src="ticket.image" />
                  </span>

                  <h2 class="leading-6 font-bold text-gray-800 text-sm">
                    {{ $t("models.ticket.object") }} {{ idxTicket + 1 }}
                    <span class="text-xs text-gray-700 font-medium">
                      - {{ ticket.cfdiUse }}
                      <span v-if="currentWorkspace">
                        - {{ currentWorkspace.name }}
                      </span>
                    </span>
                  </h2>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="rounded-full h-7 w-7">
                    <svg
                      v-show="!isExpanded(idxTicket)"
                      class="h-6 w-6 mx-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <svg
                      v-show="isExpanded(idxTicket)"
                      class="h-6 w-6 mx-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </button>
              <transition
                enter-active-class="duration-150 ease-out"
                enter-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100"
              >
                <div
                  v-show="isExpanded(idxTicket)"
                  class="border border-gray-300"
                >
                  <div
                    class="bg-gray-50 border border-gray-100 h-auto mx-auto w-full space-y-2 py-2"
                  >
                    <div
                      class="sm:flex justify-between w-full px-2 space-y-2 sm:space-y-0 items-start"
                    >
                      <label
                        :for="'cfdiUse-select' + idxTicket"
                        class="w-full sm:w-2/5 font-bold text-sm"
                        >{{ $t("models.workspace.cfdiUse") }}</label
                      >
                      <select
                        :id="'cfdiUse-select' + idxTicket"
                        v-model="ticket.cfdiUse"
                        class="w-full sm:w-3/5 bg-white pl-3 pr-10 py-2 text-base border border-gray-300 sm:text-sm h-full focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                      >
                        <option
                          v-for="(use, idxUse) in cfdiUses"
                          :key="idxUse"
                          :value="use.key"
                        >
                          {{ use.name }}
                        </option>
                      </select>
                    </div>
                    <div
                      class="sm:flex justify-between w-full px-2 space-y-2 sm:space-y-0 items-start"
                    >
                      <label
                        :for="'comments' + idxTicket"
                        class="w-full sm:w-2/5 font-bold text-sm"
                        >{{ $t("shared.comments") }}</label
                      >
                      <input
                        :id="'comments' + idxTicket"
                        v-model="ticket.comments"
                        class="w-full sm:w-3/5 bg-white pl-3 pr-10 py-2 text-base border border-gray-300 sm:text-sm h-full focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                      />
                    </div>
                    <div
                      class="sm:flex justify-between w-full px-2 space-y-2 sm:space-y-0 items-start"
                    >
                      <label
                        :for="'ticket' + idxTicket"
                        class="w-full sm:w-2/5 font-bold text-sm"
                        >{{ $t("app.tickets.ticketPhoto") }}</label
                      >
                      <div
                        class="w-full sm:w-3/5 bg-white border boder-gray-300 h-auto"
                      >
                        <drop-image
                          :id="'ticket' + idxTicket"
                          v-if="isExpanded(idxTicket)"
                          ref="dropImage"
                          :key="idxTicket"
                          :image="ticket.image"
                          :index="idxTicket"
                          v-on:dropped="dropped"
                        ></drop-image>
                      </div>
                    </div>
                    <div
                      class="sm:flex justify-end w-full px-2 space-y-2 sm:space-y-0"
                    >
                      <div class="text-right">
                        <button type="button" @click="removeTickets(idxTicket)">
                          <svg
                            class="text-gray-400 hover:text-red-600 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
        <div
          v-if="anyWorkspaces"
          class="grid grid-cols-5 gap-2 py-4 px-6 items-center"
        >
          <label for="cfdi-use" class="col-span-2 w-full font-bold text-xs">{{
            $t("app.tickets.selectCfdiUse")
          }}</label>
          <select
            id="cfdi-use"
            v-model="selectedCfdiUse"
            class="col-span-3 w-full bg-white pl-3 pr-10 py-2 text-base border border-gray-300 sm:text-xs h-full focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
            @change="changedAllCfdiUse($event)"
          >
            <option
              v-for="(use, idxUse) in cfdiUses"
              :key="idxUse"
              :value="use.key"
            >
              {{ `${use.name}` }}
            </option>
          </select>

          <label for="project" class="col-span-2 w-full font-bold text-xs">{{
            $t("models.project.object")
          }}</label>
          <select
            id="project"
            v-if="anyProjects"
            :disabled="!anyProjects"
            v-model="selectedProjectId"
            class="col-span-3 w-full pl-3 pr-10 py-2 text-base border border-gray-300 sm:text-xs h-full focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
            :class="{
              'bg-gray-200 cursor-not-allowed': !anyProjects,
              'bg-white': anyProjects
            }"
          >
            <option value="">{{
              $t("app.shared.selectors.notSelected")
            }}</option>
            <option
              v-for="(project, idxProject) in projects"
              :key="idxProject"
              :value="project.id"
            >
              {{ `${project.name}` }}
            </option>
          </select>
          <div class="col-span-2" v-if="anyProjects && addProject"></div>

          <input
            v-if="!anyProjects || addProject"
            class="col-span-3 w-full pl-3 pr-10 py-2 text-base border border-gray-300 sm:text-xs h-full focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
            v-model="newProjectName"
            :placeholder="$t('app.projects.new')"
          />
        </div>

        <div class="px-4 py-3 bg-gray-50 sm:px-6 justify-between flex">
          <div>
            <button
              :disabled="!anyTickets"
              :class="{
                'cursor-not-allowed bg-gray-200': !anyTickets,
                'hover:bg-gray-50': anyTickets
              }"
              @click="clear()"
              type="button"
              class="mr-2 bg-white border border-gray-300 rounded-sm shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {{ $t("shared.clear") }}
            </button>
          </div>

          <div>
            <span class="relative z-0 inline-flex shadow-sm rounded-sm">
              <loading-button
                ref="loadingButton"
                :disabled="
                  !tickets || tickets.length === 0 || !canUploadTickets
                "
                @click="upload"
                type="button"
                class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium focus:z-10 focus:outline-shadow"
                :class="
                  !tickets || tickets.length === 0 || !canUploadTickets
                    ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                "
              >
                <span>{{ uploadText }}</span>
              </loading-button>
            </span>
          </div>
        </div>
      </div>
    </div>
    <confirm-modal ref="modalConfirm" v-on:yes="confirm"></confirm-modal>
    <new-errorModal
      ref="errorModal"
      v-on:closed="errorModalClosed"
    ></new-errorModal>
    <success-modal
      ref="modalSuccess"
      v-on:closed="$emit('uploaded')"
    ></success-modal>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { TicketDto } from "../../../application/dtos/app/transactions/TicketDto";
import DropImages from "../../../components/app/uploads/DropImages.vue";
import { WorkspaceDto } from "../../../application/dtos/app/workspaces/WorkspaceDto";
import { ProjectDto } from "../../../application/dtos/app/projects/ProjectDto";
import DropImage from "../../../components/app/uploads/DropImage.vue";
import services from "../../../services/index";
import { UploadTicketsRequest } from "../../../application/contracts/app/tickets/UploadTicketsRequest";
import NewErrorModal from "../../../components/shared/modals/NewErrorModal.vue";
import ErrorModalComponent from "../../../components/shared/modals/NewErrorModal.vue";
import { FileBase64 } from "@/application/shared/files/FileBase64";
import LoadingButton from "@/components/shared/buttons/LoadingButton.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import SuccessModalComponent from "@/components/shared/modals/SuccessModal.vue";
import ConfirmModal from "@/components/shared/modals/ConfirmModal.vue";
import ConfirmModalComponent from "@/components/shared/modals/ConfirmModal.vue";
import { Period } from "@/application/enums/app/common/Period";
import { mapGetters } from "vuex";
import CfdiUses from "@/application/shared/CfdiUses";
import { SummaryResponse } from "@/application/contracts/app/summaries/SummaryResponse";
import { WhoInvoices } from "@/application/enums/app/cfdis/WhoInvoices";
import { TicketStatus } from "@/application/enums/app/transactions/TicketStatus";
import store from "@/store";

@Component({
  components: {
    NewErrorModal,
    DropImage,
    DropImages,
    LoadingButton,
    SuccessModal,
    ConfirmModal
  },
  computed: {
    ...mapGetters("tenant", {
      isOwnerOrAdmin: "isOwnerOrAdmin",
      workspaces: "workspaces"
    }),
    ...mapGetters("account", {
      isAdmin: "isAdmin"
    })
  }
})
export default class UploadTicketsDragAndDrop extends Vue {
  $refs!: {
    modalSuccess: SuccessModalComponent;
    errorModal: ErrorModalComponent;
    loadingButton: LoadingButton;
    modalConfirm: ConfirmModalComponent;
    dropImages: DropImages;
  };
  public openGalleryWhenReady: boolean = false;
  private isOwnerOrAdmin!: boolean;
  private tickets: TicketDto[] = [];
  private expanded: any[] = [];
  private projects: ProjectDto[] = [];
  private selectedProjectId: string = "";
  private workspaces!: WorkspaceDto[];
  private isAdmin!: boolean;
  private selectedCfdiUse: string = "";
  private loadingRfcs: boolean = false;
  private loadingProjects: boolean = false;
  private loadingUploading: boolean = false;
  private cfdiUses = CfdiUses;
  private addProject: boolean = false;
  private summary: SummaryResponse = {
    monthlyTickets: 0,
    ticketsRemaining: 0,
    ticketsByStatus: [],
    incomeCount: 0,
    expenseCount: 0,
    incomeTotal: 0,
    expenseTotal: 0,
    whoInvoices: WhoInvoices.ADMIN
  };
  private loadingSummary: boolean = false;
  private newProjectName: string = "";
  mounted() {
    this.selectedProjectId = "";
    this.selectedCfdiUse = this.currentWorkspace?.cfdiUse ?? "P01";
    this.loadProjects();
    this.loadSummary();
  }
  loadSummary() {
    this.loadingSummary = true;
    services.dashboard
      .getSummary({
        period: Period.MONTH,
        withDetails: false
      })
      .then((response: SummaryResponse) => {
        this.summary = response;
      })
      .catch(error => {
        console.error("[ERROR]: " + error);
      })
      .finally(() => {
        this.loadingSummary = false;
      });
  }
  tryOpenGallery() {
    if (!this.openGalleryWhenReady) {
      return;
    }
    if (
      !this.loadingRfcs &&
      !this.loadingProjects &&
      !this.loadingSummary &&
      this.openGalleryWhenReady
    ) {
      if (this.$refs.dropImages && this.anyWorkspaces) {
        this.openGalleryWhenReady = false;
        this.$refs.dropImages.openGallery();
      }
    }
  }
  loadProjects() {
    this.projects = [];
    this.loadingProjects = true;
    services.projects
      .getAllProjects(true)
      .then((response: ProjectDto[]) => {
        response.forEach(element => {
          this.projects.push(element);
        });
      })
      .catch(error => {
        // ignore
      })
      .finally(() => {
        this.loadingProjects = false;
        if (this.projects.length > 0) {
          this.projects.forEach(project => {
            if (project.default) {
              this.selectedProjectId = project.id;
            }
          });
        }
      });
  }
  errorModalClosed() {
    if (this.workspaces.length === 0) {
      this.$router.push({ name: "app.workspaces" });
    }
  }
  droppedFiles(files: FileBase64[]) {
    if (!this.currentWorkspace) {
      return;
    }
    files.forEach(file => {
      const image = file.base64;
      let foundWithoutImage = -1;
      let i = 0;
      this.tickets.forEach(element => {
        if (!element.image || element.image === "") {
          foundWithoutImage = i;
        }
        i++;
      });
      if (foundWithoutImage >= 0) {
        this.tickets[foundWithoutImage].image = image;
      } else {
        this.tickets.push({
          number: 0,
          id: undefined,
          status: TicketStatus.PENDING,
          taxId: this.currentWorkspace?.taxId ?? "",
          legalName: this.currentWorkspace?.legalName ?? "",
          cfdiUse: this.selectedCfdiUse ?? this.currentWorkspace?.cfdiUse,
          image: image ?? "",
          whoInvoices: WhoInvoices.ADMIN
        });
      }
    });
  }
  toggleTicketsOpen(idx: number) {
    if (this.expanded.includes(idx)) {
      this.expanded = [];
    } else {
      this.expanded = [idx];
    }
  }
  removeTickets(index: number) {
    this.tickets.splice(index, 1);
    if (index - 1 >= 0) {
      this.expanded = [index - 1];
    } else {
      this.expanded = [index + 1];
    }
  }

  isExpanded(idx): boolean {
    return this.expanded.includes(idx);
  }
  changedAllCfdiUse(event) {
    const usos = this.cfdiUses.filter(f => f.key === event.target.value);
    this.tickets.forEach(item => {
      if (usos && usos.length > 0) {
        item.cfdiUse = usos[0].key;
      }
    });
  }
  dropped(file: FileBase64, index: number) {
    let foundWithoutImage = -1;
    let i = 0;
    this.tickets.forEach(element => {
      if (!element.image || element.image === "") {
        foundWithoutImage = i;
      }
      i++;
    });
    if (foundWithoutImage >= 0) {
      this.tickets[foundWithoutImage].image = file.base64;
    } else {
      this.addTicket(file.base64);
    }
  }
  addTicket(image: string = "") {
    this.tickets.push({
      number: 0,
      id: undefined,
      status: TicketStatus.PENDING,
      taxId: this.currentWorkspace?.taxId ?? "",
      legalName: this.currentWorkspace?.legalName ?? "",
      cfdiUse: this.currentWorkspace?.cfdiUse ?? "",
      image: image ?? "",
      whoInvoices: WhoInvoices.ADMIN
    });
    return this.tickets.length - 1;
  }
  getDefaultProject(): ProjectDto | undefined {
    const projects = this.projects.filter(f => f.default);
    if (projects && projects.length > 0) {
      return projects[0];
    }
  }
  successClosed() {
    this.$emit("uploaded");
  }
  upload() {
    this.$refs.modalConfirm.show(
      `¿${this.uploadText}?`,
      this.$t("shared.upload").toString(),
      this.$t("shared.cancel").toString(),
      this.$t("app.tickets.upload.hint").toString()
    );
  }
  async confirm() {
    const errors: string[] = [];

    const self = this;
    this.loadingUploading = true;
    const promises: any[] = [];
    const uploadTicketRequest: UploadTicketsRequest = {
      tickets: this.tickets,
      scan: false,
      waitUntilAdded: true,
      rejectDuplicated: true,
      selectedProjectId: this.selectedProjectId,
      newProjectName: this.newProjectName
    };
    services.tickets
      .uploadTickets(uploadTicketRequest)
      .then(response => {
        this.$refs.modalSuccess.show(
          this.$t("app.tickets.upload.success").toString(),
          this.summary.whoInvoices === WhoInvoices.ADMIN
            ? this.$t("app.tickets.upload.successDescription1").toString()
            : this.$t("app.tickets.upload.successDescription2").toString()
        );
      })
      .catch((error: any) => {
        this.$refs.errorModal.show(this.$t(error).toString());
      })
      .finally(() => {
        self.loadingUploading = false;
      });
  }
  clear() {
    this.tickets = [];
  }
  get currentWorkspace(): WorkspaceDto | null {
    return store.state.tenant.currentWorkspace;
  }
  get canUploadTickets() {
    return this.isAdmin || this.ticketsRemaining - this.tickets.length >= 0;
  }
  get uploadText() {
    if (!this.canUploadTickets) {
      return this.$t("app.tickets.upload.ticketsRemaining", [
        this.ticketsRemaining
      ]);
    }
    if (this.tickets.length === 1) {
      return (
        this.$t("shared.upload") +
        " 1 " +
        this.$t("models.ticket.object")
          .toString()
          .toLowerCase()
      );
    } else if (this.tickets.length > 1) {
      return (
        this.$t("shared.upload") +
        " " +
        this.tickets.length +
        " " +
        this.$t("models.ticket.plural")
          .toString()
          .toLowerCase()
      );
    } else {
      return (
        this.$t("shared.upload") +
        " " +
        this.$t("models.ticket.plural")
          .toString()
          .toLowerCase()
      );
    }
  }
  get whoInvoices(): WhoInvoices | undefined {
    if (this.summary) {
      return this.summary.whoInvoices;
    }
  }
  get ticketsRemaining(): number {
    if (this.summary) {
      return this.summary.ticketsRemaining;
    }
    return 0;
  }
  get anyTickets() {
    return this.tickets && this.tickets.length > 0;
  }
  get anyWorkspaces() {
    this.tryOpenGallery();
    return this.workspaces && this.workspaces.length > 0;
  }
  get anyProjects() {
    return this.projects && this.projects.length > 0;
  }
}
</script>

<style scoped>
.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
