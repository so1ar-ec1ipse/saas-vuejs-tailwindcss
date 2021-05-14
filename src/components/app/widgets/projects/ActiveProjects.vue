<template>
  <section aria-labelledby="miembros-titulo">
    <div class="rounded-sm bg-white shadow">
      <div class="py-3 px-4">
        <h2
          class="flex items-center justify-between text-base font-medium text-gray-900"
          id="miembros-titulo"
        >
          <span>
            {{ $t("app.projects.activeProjects") }}
            <span class="text-xs" v-if="activos && activos.length > 0">
              ({{ activos.length }})</span
            >
          </span>
          <div class="flex justify-center">
            <router-link
              :to="{ name: 'app.projects.new' }"
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
              $t("models.project.plural")
                .toString()
                .toLowerCase()
            }}...
          </p>
        </div>
        <div v-else-if="activos.length > 0" class="flow-root mt-3">
          <ul class="mb-1 divide-y space-y-2 divide-gray-100">
            <project-item
              ref="projectItem"
              :id="project.id"
              v-on:updatedEstatus="updatedEstatus"
              v-for="project in activos"
              :key="project.id"
              class="col-span-1 flex shadow-sm rounded-md relative"
              v-bind="project"
              :initialPeriod="period"
            >
            </project-item>
          </ul>
        </div>
        <div v-else class="mt-6">
          <p class="italic text-xs text-gray-500">
            {{ $t("shared.thereAreNo") }}
            {{
              $t("app.projects.activeProjects")
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
import { ProjectDto } from "../../../../application/dtos/app/projects/ProjectDto";
import { ProjectStatus } from "@/application/enums/app/projects/ProjectStatus";
import { TenantUserDto } from "@/application/dtos/master/tenants/TenantUserDto";
import ProjectItem from "@/views/app/projects/ProjectItem.vue";
import { Prop } from "vue-property-decorator";
import { Period } from "@/application/enums/app/common/Period";

@Component({
  components: {
    Modal,
    PageTitle,
    ProjectItem
  }
})
export default class ProyectosActivosComponent extends BaseComponent {
  @Prop({ default: false }) summary!: boolean;
  @Prop({ default: Period.ALL }) initialPeriod!: Period;
  $refs!: {
    uploadTicketsModal: Modal;
    projectItem: ProjectItem[];
  };
  private items: ProjectDto[] = [];
  private projectId: string = "";
  private users: TenantUserDto[] = [];
  private period: Period = Period.ALL;
  mounted() {
    this.period = this.initialPeriod;
    this.reload();
  }
  reloadPeriod(period: Period) {
    this.period = period;
    for (let index = 0; index < this.activos.length; index++) {
      this.$refs.projectItem[index].cargarResumen(period);
      //   this.items.forEach(project => {
    }
    //   });
  }
  async reload() {
    this.loading = true;
    this.items = [];
    this.services.projects
      .getAllProjects(true)
      .then((response: ProjectDto[]) => {
        this.items = response;
      })
      .catch(error => {
        console.error(
          "[ERROR LOADING ACTIVE PROJECTS] " + JSON.stringify(error)
        );
      })
      .finally(() => {
        this.loading = false;
      });
  }
  projectsByStatus(status: ProjectStatus) {
    return this.items.filter(f => f.status === status);
  }
  updatedEstatus(id, status) {
    const item = this.items.find(f => f.id === id);
    if (item) {
      item.status = status;
    }
  }
  get activos() {
    return this.projects.filter(f => f.status === ProjectStatus.ACTIVE);
  }
  get projects() {
    if (!this.items) {
      return [];
    }
    return this.items;
  }
}
</script>
