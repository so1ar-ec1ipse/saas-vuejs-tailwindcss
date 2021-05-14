<template>
  <div>
    <div>
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6"></div>
      </header>
      <div v-if="loading" class="p-10">
        <table-row-skeleton></table-row-skeleton>
        <table-row-skeleton></table-row-skeleton>
        <table-row-skeleton></table-row-skeleton>
      </div>
      <main v-else-if="ticket && ticket.id" class="py-10">
        <!-- Page header -->
        <div
          class="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8"
        >
          <div class="flex items-center space-x-5">
            <div class="flex-shrink-0">
              <div class="relative">
                <img
                  v-if="ticket.createdByUser && ticket.createdByUser.avatar"
                  alt="Usuario"
                  :src="ticket.createdByUser.avatar"
                  class="h-16 w-16 rounded-full"
                />
                <span
                  v-else
                  class="hidden sm:inline-flex items-center justify-center h-16 w-16 rounded-full bg-blueGray-800 shadow-xl"
                >
                  <span class="text-lg leading-none text-white pt-0.5">{{
                    avatarText(ticket)
                  }}</span>
                </span>
                <span
                  class="absolute inset-0 shadow-inner rounded-full"
                  aria-hidden="true"
                ></span>
              </div>
            </div>
            <div>
              <h1
                v-if="ticket.createdByUser"
                class="text-2xl font-bold text-gray-900"
              >
                {{ ticket.createdByUser.firstName }}
                {{ ticket.createdByUser.lastName }}
              </h1>
              <p class="text-sm font-medium text-gray-500" v-if="ticket.tenant">
                Subió ticket para {{ ticket.tenant.name }}
                <time :datetime="ticket.createdAt | dateYMD">
                  {{ ticket.createdAt | dateAgo }}
                </time>
              </p>
            </div>
          </div>
          <div
            class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3"
          >
            <button
              type="button"
              v-if="admin"
              @click="scan"
              class="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
              {{ $t("app.tickets.scan") }}
            </button>
          </div>
        </div>

        <div
          class="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3"
        >
          <div class="space-y-6 lg:col-start-1 lg:col-span-2">
            <!-- Información -->
            <section aria-labelledby="applicant-information-title">
              <div class="bg-white shadow sm:rounded-sm">
                <div class="px-4 py-5 sm:px-6">
                  <h2
                    id="applicant-information-title"
                    class="text-lg leading-6 font-medium text-gray-900"
                  >
                    Información del Ticket
                  </h2>
                  <p class="mt-1 max-w-2xl text-sm text-gray-500">
                    Detalles para facturación
                  </p>
                </div>
                <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">
                        {{ $t("models.ticket.taxId") }}
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900">
                        {{ ticket.taxId }}
                      </dd>
                    </div>
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">
                        {{ $t("models.ticket.legalName") }}
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900">
                        {{ ticket.legalName }}
                      </dd>
                    </div>
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">
                        {{ $t("models.ticket.cfdiUse") }}
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900">
                        {{ ticket.cfdiUse }}
                      </dd>
                    </div>
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">
                        {{ $t("settings.profile.phone") }}
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900">
                        <span
                          v-if="
                            ticket.createdByUser && ticket.createdByUser.phone
                          "
                        >
                          {{ ticket.createdByUser.phone }}
                        </span>
                        <span v-else>
                          {{ $t("shared.undefined") }}
                        </span>
                      </dd>
                    </div>
                    <div v-if="ticket.comments" class="sm:col-span-2">
                      <dt class="text-sm font-medium text-gray-500">
                        {{ $t("shared.comments") }}
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900">
                        {{ ticket.comments }}
                      </dd>
                    </div>
                    <div class="sm:col-span-2">
                      <div
                        v-if="
                          ticket.transactions && ticket.transactions.length > 0
                        "
                      >
                        <div
                          v-for="(transaction, index) in ticket.transactions"
                          :key="index"
                        >
                          <dd class="mt-1 text-sm text-gray-900">
                            <ul
                              class="border border-gray-200 rounded-sm divide-y divide-gray-200"
                            >
                              <li
                                class="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                              >
                                <div class="w-0 flex-1 flex items-center">
                                  <!-- Heroicon name: paper-clip -->
                                  <svg
                                    class="flex-shrink-0 h-5 w-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                  <span class="ml-2 flex-1 w-0 truncate">
                                    {{ $t("models.invoice.object") }}.pdf
                                  </span>
                                </div>
                                <div class="ml-4 flex-shrink-0">
                                  <a
                                    href="#"
                                    class="font-medium text-blue-600 hover:text-blue-500"
                                  >
                                    {{ $t("shared.download") }}
                                  </a>
                                </div>
                              </li>
                              <li
                                class="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                              >
                                <div class="w-0 flex-1 flex items-center">
                                  <!-- Heroicon name: paper-clip -->
                                  <svg
                                    class="flex-shrink-0 h-5 w-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                  <span class="ml-2 flex-1 w-0 truncate">
                                    {{ $t("models.invoice.object") }}.xml
                                  </span>
                                </div>
                                <div class="ml-4 flex-shrink-0">
                                  <a
                                    href="#"
                                    class="font-medium text-blue-600 hover:text-blue-500"
                                  >
                                    {{ $t("shared.download") }}
                                  </a>
                                </div>
                              </li>
                            </ul>
                          </dd>
                        </div>
                      </div>
                      <div>
                        <drop-images
                          v-on:droppedFiles="droppedFiles"
                          accept=".pdf,.xml"
                          :title="$t('app.cfdis.dragXmlAndPdf')"
                        ></drop-images>
                      </div>
                    </div>
                  </dl>
                </div>
              </div>
            </section>
          </div>

          <section class="lg:col-start-3 lg:col-span-1 space-y-5">
            <div class="bg-white shadow sm:rounded-sm">
              <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
                <img alt="Ticket" :src="ticket.image" class="h-auto w-full" />
              </div>
            </div>
          </section>
        </div>
      </main>
      <div v-else class="flex justify-center p-10 w-full text-md font-bold">
        {{ $t("shared.invalid") }}
      </div>
    </div>
    <new-error-modal ref="errorModal"></new-error-modal>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { TicketDto } from "@/application/dtos/app/transactions/TicketDto";
import NewErrorModal from "@/components/shared/modals/NewErrorModal.vue";
import TableRowSkeleton from "@/components/shared/skeletons/TableRowSkeleton.vue";
import DropImage from "@/components/app/uploads/DropImage.vue";
import DropImages from "@/components/app/uploads/DropImages.vue";
import { FileBase64 } from "@/application/shared/files/FileBase64";
import BaseComponent from "@/components/shared/BaseComponent.vue";
import { Prop } from "vue-property-decorator";

@Component({
  components: {
    DropImages,
    DropImage,
    TableRowSkeleton,
    NewErrorModal,
    BaseComponent
  }
})
export default class TicketFullDetails extends BaseComponent {
  @Prop({ default: false }) admin!: boolean;
  $refs!: {
    errorModal: NewErrorModal;
  };
  private ticket = {} as TicketDto;
  mounted() {
    if (!this.$route.params.id) {
      if (this.admin) {
        this.$router.push({ name: "admin.tickets" });
      } else {
        this.$router.push({ name: "app.tickets" });
      }
    }
    this.reload();
  }
  reload() {
    this.loading = true;
    if (this.admin) {
      this.services.tickets
        .adminGet(this.$route.params.id)
        .then((response: TicketDto) => {
          this.ticket = response;
        })
        .catch(error => {
          this.$refs.errorModal.show(this.$t(error));
        })
        .finally(() => {
          this.loading = false;
        });
    } else {
      this.services.tickets
        .getTicket(this.$route.params.id, this.admin)
        .then((response: TicketDto) => {
          this.ticket = response;
        })
        .catch(error => {
          this.$refs.errorModal.show(this.$t(error));
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
  avatarText(item: TicketDto) {
    if (item.createdByUser?.firstName && item.createdByUser?.lastName) {
      return item.createdByUser?.firstName[0] + item.createdByUser?.lastName[0];
    } else if (item.createdByUser?.firstName) {
      return item.createdByUser?.firstName[0];
    } else {
      return "?";
    }
  }
  droppedFiles(files: FileBase64[]) {
    console.log("droppedFiles: " + files.length);
    if (files.length > 0) {
      const formData: FormData = new FormData();
      files.forEach(fileBase64 => {
        formData.append(
          fileBase64.file.name,
          fileBase64.file,
          fileBase64.file.name
        );
      });
      this.services.tickets
        .uploadXmlAndPdf(formData, this.ticket)
        .then((response: TicketDto) => {
          this.ticket = response;
        })
        .catch(error => {
          this.$refs.errorModal.show(this.$t(error));
        });
    }
  }
  scan() {
    this.loading = true;
    this.services.tickets
      .adminReadTicket(this.ticket.id)
      .then((response: TicketDto) => {
        this.ticket = response;
      })
      .catch(error => {
        this.$refs.errorModal.show(this.$t(error));
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>
