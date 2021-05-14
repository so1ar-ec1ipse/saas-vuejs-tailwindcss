<template>
  <section>
    <div class="rounded-sm bg-white shadow">
      <div class="py-3 px-4">
        <h2
          class="flex items-center justify-between text-base font-medium text-gray-900"
        >
          <span>
            {{ $t("models.workspace.plural") }}
            <span class="text-xs" v-if="items && items.length > 0">
              ({{ items.length }})</span
            >
          </span>
          <div class="flex justify-center">
            <router-link
              :to="{ name: 'app.workspaces.new' }"
              class="flex items-center space-x-2 text-center px-2 py-1 text-xs font-medium rounded-sm text-gray-800 hover:bg-blueGray-100 focus:outline-shadow active:bg-gray-900 transition duration-150 ease-in-out"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="plus"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                class="text-gray-500 h-2.5"
                style="bottom: 1px"
              >
                <path
                  fill="currentColor"
                  d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                  class
                />
              </svg>
            </router-link>
          </div>
        </h2>
        <div v-if="loading" class="mt-3">
          <p class="italic text-xs text-gray-500">
            {{ $t("shared.loading") }}
            {{
              $t("models.workspace.plural")
                .toString()
                .toLowerCase()
            }}...
          </p>
        </div>
        <div v-else-if="items.length > 0" class="flow-root mt-3">
          <ul class="mb-1 divide-y space-y-2 divide-gray-100">
            <workspace-item
              ref="workspaceItem"
              v-for="item in items"
              :id="item.id"
              :key="item.id"
              class="col-span-1 flex shadow-sm rounded-md relative bg-gray-50"
              v-bind="item"
              :initialPeriod="period"
            >
            </workspace-item>
          </ul>
        </div>
        <div v-else class="mt-6">
          <p class="italic text-xs text-gray-500">
            {{ $t("shared.thereAreNo") }}
            {{
              $t("models.workspace.plural")
                .toString()
                .toLowerCase()
            }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../shared/BaseComponent.vue";
import PageTitle from "../../../shared/navigation/PageTitle.vue";
import Modal from "../../../shared/modals/Modal.vue";
import { WorkspaceDto } from "@/application/dtos/app/workspaces/WorkspaceDto";
import { TenantUserDto } from "@/application/dtos/master/tenants/TenantUserDto";
import WorkspaceItem from "@/views/app/workspaces/WorkspaceItem.vue";
import { Prop } from "vue-property-decorator";
import { Period } from "@/application/enums/app/common/Period";

@Component({
  components: {
    Modal,
    PageTitle,
    WorkspaceItem
  }
})
export default class WorkspacesWidget extends BaseComponent {
  @Prop({ default: false }) summary!: boolean;
  @Prop({ default: Period.ALL }) initialPeriod!: Period;
  $refs!: {
    uploadTicketsModal: Modal;
    workspaceItem: WorkspaceItem[];
  };
  private items: WorkspaceDto[] = [];
  private workspaceId: string = "";
  private users: TenantUserDto[] = [];
  private period: Period = Period.ALL;
  mounted() {
    this.period = this.initialPeriod;
    this.reload();
  }
  reloadPeriod(period: Period) {
    this.period = period;
    for (let index = 0; index < this.workspaces.length; index++) {
      this.$refs.workspaceItem[index].loadSummary(period);
    }
  }
  async reload() {
    this.loading = true;
    this.items = [];
    this.services.workspaces
      .getAllWorkspaces()
      .then((response: WorkspaceDto[]) => {
        this.items = response;
      })
      .catch(error => {
        // ignore
      })
      .finally(() => {
        this.loading = false;
      });
  }
  get workspaces() {
    if (!this.items) {
      return [];
    }
    return this.items;
  }
}
</script>
