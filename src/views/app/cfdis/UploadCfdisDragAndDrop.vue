<template>
  <div>
    <div
      class="shadow-inner border border-gray-300 sm:rounded-sm sm:overflow-hidden"
    >
      <div class="justify-center" v-if="loadingWorkspaces || loading">
        <div class="h-auto w-full flex justify-center py-12">
          <div
            class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"
          ></div>
        </div>
        <div
          v-if="loading && cfdis && cfdis.length > 0"
          class="items-center justify-center font-bold text-xs pb-6 space-x-1"
        >
          <div class="flex justify-center text-sm">
            {{ $t("shared.uploading") }}
            {{
              $t("models.cfdi.plural")
                .toString()
                .toLowerCase()
            }}...
          </div>
          <div class="text-xs font-light flex justify-center">
            ({{ $t("shared.mayTakeMinutes") }})
          </div>
        </div>
      </div>
      <div v-else class="bg-white py-6 px-4 space-y-1 sm:p-6 overflow-y-auto">
        <div v-if="!cfdis || cfdis.length === 0" class="">
          <drop-cfdis
            v-if="workspaces && workspaces.length > 0"
            ref="dropCfdis"
            class=""
            v-on:droppedFiles="droppedFiles"
          />
          <div v-else>
            <p>{{ $t("app.workspace.none") }}</p>
            <router-link
              :to="{ name: 'app.workspaces' }"
              class="text-theme-600 hover:text-theme-700 hover:underline"
              >{{ $t("app.shared.buttons.clickHereToAdd") }}</router-link
            >
          </div>
        </div>
        <div v-else-if="cfdis.length > 0">
          <upload-cfdis-preview
            class="my-2"
            :summary="summary"
          ></upload-cfdis-preview>
        </div>
        <div v-for="(item, idxCfdi) in cfdis" :key="idxCfdi">
          <div
            class="text-gray-800 w-full p-3 border border-gray-200 focus:outline-none"
            :class="item.error ? 'bg-red-50' : ''"
            :id="'item-' + (idxCfdi + 1)"
          >
            <div
              class="lg:inline-flex items-center justify-between w-full space-x-3"
            >
              <div
                class="flex space-x-2 w-full items-center justify-between text-sm truncate"
              >
                <div
                  class="block lg:flex items-center space-x-2 truncate w-1/2"
                >
                  <div
                    class="text-gray-500 block lg:flex lg:space-x-2 items-baseline truncate"
                  >
                    <span
                      class="font-bold text-gray-800"
                      v-if="item.transaction && item.transaction.workspace"
                    >
                      {{ item.transaction.workspace.legalName }}</span
                    >
                    <div class="text-xs flex items-center space-x-2">
                      <svg
                        v-if="item.error"
                        class="h-5 text-red-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div class="select-all flex text-gray-700">
                        <div v-if="!item.xml">{{ item.nombreArchivo }}.pdf</div>
                        <div v-if="!item.pdf">{{ item.nombreArchivo }}.xml</div>
                        <div v-else>{{ item.nombreArchivo }}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="item.transaction && !item.error"
                  class="text-gray-500 flex items-baseline font-bold leading-6 text-right truncate w-1/2 justify-end"
                >
                  <div
                    v-if="item.transaction.customerBranch"
                    class="font-normal text-xs mr-2 truncate select-all"
                  >
                    {{ item.transaction.customerBranch.legalName }}
                  </div>
                  <div
                    v-if="item.transaction.supplierBranch"
                    class="font-normal text-xs lg:mr-2 truncate select-all"
                  >
                    {{ item.transaction.supplierBranch.legalName }}
                  </div>
                  <div
                    class="text-gray-800 font-bold flex items-center space-x-2"
                    :class="
                      item.transaction && item.transaction.type === 1
                        ? 'text-gray-800'
                        : 'text-gray-800'
                    "
                  >
                    <div>${{ item.transaction.total | decimalFormat }}</div>
                    <badge-income
                      v-if="item.transaction.type === 0"
                      :with-text="false"
                      width="w-5 p-1"
                      height="h-3"
                    ></badge-income>
                    <badge-expense
                      v-if="item.transaction.type === 1"
                      :with-text="false"
                      width="w-5 p-1"
                      height="h-3"
                    ></badge-expense>
                  </div>
                </div>
                <div
                  v-else
                  class="text-red-600 flex items-center font-bold leading-6 justify-end truncate space-x-2 w-1/2"
                >
                  <span class="select-all">
                    {{ item.error }}
                  </span>
                </div>
              </div>
              <div class="flex items-center justify-end space-x-3">
                <button type="button" @click="remove(idxCfdi)">
                  <svg
                    class="hidden lg:block text-gray-500 hover:text-red-600 h-5 w-5"
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
                  <span
                    class="block lg:hidden bg-yellow-50 border border-yellow-200 px-2 py-1 rounded-sm text-yellow-800"
                  >
                    Eliminar
                  </span>
                </button>
                <button
                  type="button"
                  @click="toggleOpen(idxCfdi)"
                  :disabled="item.error"
                  class=" "
                  :class="
                    item.error
                      ? ' cursor-not-allowed text-gray-300'
                      : 'text-gray-500'
                  "
                >
                  <svg
                    v-show="!isExpanded(idxCfdi)"
                    class="rounded-full h-7 w-7 hidden lg:block mx-auto"
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
                    v-show="isExpanded(idxCfdi)"
                    class="hidden lg:block h-6 w-6 mx-auto"
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
                  <span
                    class="block lg:hidden bg-gray-50 border border-gray-200 px-2 py-1 rounded-sm text-gray-800"
                  >
                    {{ $t("app.shared.buttons.showDetails") }}
                  </span>
                </button>
              </div>
            </div>
            <div
              v-if="item.transaction && item.transaction.details"
              class="w-full text-xs text-gray-400 flex space-x-2 truncate"
            >
              <!-- {{
                item.transaction.details.map((f) => f.description).join(", ")
              }} -->
              <!-- <div
                v-for="(detail, idxDetail) in item.transaction.details"
                :key="idxDetail"
                class=""
              >
                <div class="">
                  {{ detail.description }}
                </div>
              </div> -->
            </div>
            <transition
              enter-active-class="duration-150 ease-out"
              enter-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
            >
              <div v-show="isExpanded(idxCfdi)" class="border border-gray-300">
                <div
                  class="bg-gray-50 border border-gray-100 h-auto mx-auto w-full space-y-2 py-2"
                >
                  <simple-transaction-item-details
                    v-bind="item.transaction"
                  ></simple-transaction-item-details>
                  <div
                    class="lg:flex justify-end w-full px-2 space-y-2 lg:space-y-0"
                  >
                    <div class="text-right">
                      <button type="button" @click="remove(idxCfdi)">
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
    </div>
    <div
      v-if="!loading && !loadingWorkspaces"
      class="px-4 py-3 bg-gray-50 sm:px-6 justify-between flex border border-gray-300 sticky bottom-0"
    >
      <div>
        <button
          @click="clear()"
          type="button"
          class="mr-2 bg-white border border-gray-300 rounded-sm shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          {{ $t("shared.clear") }}
        </button>
      </div>

      <div>
        <span class="relative z-0 inline-flex shadow-sm rounded-sm">
          <loading-button
            ref="loadingButton"
            :disabled="!validCfdis || validCfdis.length === 0 || loading"
            @click="upload"
            type="button"
            class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium focus:z-10 focus:outline-shadow"
            :variant="
              !validCfdis || validCfdis.length === 0 || loading
                ? 'normal'
                : 'primary'
            "
            :class="
              !validCfdis || validCfdis.length === 0 || loading
                ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            "
          >
            {{ $t("shared.upload") }} {{ uploadText }}
          </loading-button>
        </span>
      </div>
    </div>
    <new-errorModal
      ref="errorModal"
      v-on:closed="errorModalClosed"
    ></new-errorModal>
    <confirm-modal ref="confirmModal" v-on:yes="confirm"></confirm-modal>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import DropCfdis from "../../../components/app/uploads/DropCfdis.vue";
import { WorkspaceDto } from "../../../application/dtos/app/workspaces/WorkspaceDto";
import DropImage from "../../../components/app/uploads/DropImage.vue";
import store from "../../../store";
import services from "../../../services/index";
import NewErrorModal from "../../../components/shared/modals/NewErrorModal.vue";
import ConfirmModal from "../../../components/shared/modals/ConfirmModal.vue";
import ErrorModalComponent from "../../../components/shared/modals/NewErrorModal.vue";
import { FileBase64 } from "@/application/shared/files/FileBase64";
import { CfdiXmlPdfDto } from "@/application/dtos/app/cfdis/CfdiXmlPdfDto";
import SimpleTransactionItemDetails from "@/views/app/tickets/SimpleTransactionItemDetails.vue";
import BadgeExpense from "../../../components/app/badges/BadgeExpense.vue";
import BadgeIncome from "../../../components/app/badges/BadgeIncome.vue";
import LoadingButton from "../../../components/shared/buttons/LoadingButton.vue";
import UploadCfdisPreview from "./UploadCfdisPreview.vue";
import { UploadCfdisRequest } from "@/application/contracts/app/cfdis/UploadCfdisRequest";
import { UserType } from "@/application/enums/master/users/UserType";

@Component({
  components: {
    NewErrorModal,
    ConfirmModal,
    DropImage,
    DropCfdis,
    SimpleTransactionItemDetails,
    BadgeExpense,
    BadgeIncome,
    LoadingButton,
    UploadCfdisPreview
  }
})
export default class UploadCfdisDragAndDrop extends Vue {
  $refs!: {
    errorModal: ErrorModalComponent;
    confirmModal: ConfirmModal;
    loadingButton: LoadingButton;
    dropCfdis: DropCfdis;
  };
  private cfdis: CfdiXmlPdfDto[] = [];
  private expanded: any[] = [];
  private loading: boolean = false;
  private workspaces: WorkspaceDto[] = [];
  private summary: any = {};
  private loadingWorkspaces: boolean = false;
  mounted() {
    this.loadWorkspaces();
  }
  loadWorkspaces() {
    this.workspaces = [];
    this.loadingWorkspaces = true;
    services.workspaces
      .getAllWorkspaces()
      .then((response: WorkspaceDto[]) => {
        response.forEach(element => {
          this.workspaces.push(element);
        });
        if (
          this.workspaces.length === 0 &&
          store.state.account.user?.type !== UserType.ADMIN
        ) {
          this.$router.push({ name: "app.workspaces.new" });
        }
      })
      .catch(error => {
        // ignore
      })
      .finally(() => {
        this.loadingWorkspaces = false;
      });
  }
  errorModalClosed() {
    if (this.workspaces.length === 0) {
      this.$router.push({ name: "app.workspace" });
    }
  }
  droppedFiles(files: FileBase64[]) {
    const cfdis: any = [];
    this.loading = true;
    files.forEach(file => {
      const name = file.file.name
        .toUpperCase()
        .replace(".XML", "")
        .replace(".PDF", "");
      const xml = file.file.name.toUpperCase().includes(".XML")
        ? file.base64
        : "";
      const pdf = file.file.name.toUpperCase().includes(".PDF")
        ? file.base64
        : "";
      let cfdi = cfdis.find(f => f.nombreArchivo === name);
      if (!cfdi) {
        cfdi = {
          nombreArchivo: name,
          xml,
          pdf
        };
        cfdis.push(cfdi);
      } else {
        if (xml) {
          cfdi.xml = xml;
        }
        if (pdf) {
          cfdi.pdf = pdf;
        }
      }
    });
    const uploadCfdisRequest: UploadCfdisRequest = {
      cfdis
    };
    this.loading = true;
    const self = this;
    self.$refs.dropCfdis.loading = true;
    services.cfdis
      .readCfdis(uploadCfdisRequest)
      .then((response: CfdiXmlPdfDto[]) => {
        this.summary = this.calcularResumen(response);
        response.forEach(element => {
          this.cfdis.push(element);
        });
        this.cfdis = this.cfdis.sort((x, y) => {
          if (x.error) {
            return -1;
          }
          return 1;
        });
      })
      .catch((error: any) => {
        this.$refs.errorModal.show(this.$t(error).toString());
      })
      .finally(() => {
        this.loading = false;
        self.$refs.dropCfdis.loading = false;
      });
  }

  calcularResumen(items: CfdiXmlPdfDto[]) {
    const income = items
      .filter(f => !f.error && f.transaction?.type === 0)
      .map(f => f.transaction);
    const expense = items
      .filter(f => !f.error && f.transaction?.type === 1)
      .map(f => f.transaction);
    const incomeCount = income.length;
    const expenseCount = expense.length;
    const incomeTotal = income.reduce(
      (sum, current) => sum + (current?.total ?? 0),
      0
    );
    const expenseTotal = expense.reduce(
      (sum, current) => sum + (current?.total ?? 0),
      0
    );
    return {
      incomeCount,
      expenseCount,
      incomeTotal,
      expenseTotal
    };
  }
  toggleOpen(idx: number) {
    if (this.expanded.includes(idx)) {
      this.expanded = [];
    } else {
      this.expanded = [idx];
    }
  }
  remove(index: number) {
    this.cfdis.splice(index, 1);
  }
  isExpanded(idx): boolean {
    return this.expanded.includes(idx);
  }
  dropped(file: FileBase64, index: number) {
    // let foundWithoutImage = -1;
    // let i = 0;
    // this.addCfdi(file.base64);
  }
  upload() {
    this.$refs.confirmModal.show(
      `Subirás ${this.uploadText}, no hay límite para subir CFDis`
    );
  }
  confirm() {
    if (this.validCfdis.length === 0) {
      this.$refs.errorModal.show(this.$t("app.cfdis.noValidCfdis").toString());
      return;
    }
    this.$refs.loadingButton.start();
    this.loading = true;
    services.cfdis
      .uploadCfdis({
        cfdis: this.validCfdis
      })
      .then(() => {
        this.$router.push({ name: "app.invoices" });
      })
      .catch((error: any) => {
        this.$refs.errorModal.show(this.$t(error).toString());
      })
      .finally(() => {
        this.loading = false;
        if (this.$refs.loadingButton) {
          this.$refs.loadingButton.stop();
        }
      });
  }
  clear() {
    this.cfdis = [];
  }
  get validCfdis() {
    return this.cfdis.filter(f => !f.error && f.transaction);
  }
  get validCfdisIngresos() {
    return this.cfdis.filter(f => !f.error && f.transaction?.type === 0);
  }
  get validCfdisEgresos() {
    return this.cfdis.filter(f => !f.error && f.transaction?.type === 1);
  }
  get uploadText() {
    const ingresos = this.validCfdisIngresos.length;
    const egresos = this.validCfdisEgresos.length;

    if (ingresos > 0 && egresos > 0) {
      return `${ingresos} ingreso${
        ingresos > 1 ? "s" : ""
      } y ${egresos} egreso${egresos > 1 ? "s" : ""}`;
    } else if (ingresos > 0) {
      return `${ingresos} ingreso${ingresos > 1 ? "s" : ""}`;
    } else if (egresos > 0) {
      return `${egresos} egreso${egresos > 1 ? "s" : ""}`;
    } else {
      return "CFDis";
    }

    // if(this.validCfdis.length === 1) {
    //   return this.$t("shared.upload") + " 1 " + this.$t("models.cfdi.object").toString();
    // } else if(this.validCfdis.length > 1) {
    //   return this.$t("shared.upload") + " " + this.validCfdis.length +" " + this.$t("models.cfdi.object").toString();
    // }else  {
    //   return this.$t("shared.upload") + " " + this.$t("models.cfdi.plural").toString();
    // }
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
