<template>
  <div>
    <new-modal v-on:closed="$emit('closed')" ref="modal">
      <div class="bg-white divide-gray-100 space-y-2">
        <div>
          <div v-if="users">
            <h3>Usuarios</h3>
            <div v-for="(item, idx) in users" :key="idx">
              {{ item }}
            </div>
          </div>
          <div v-else>Usuarios...</div>
        </div>
        <div>
          <h3>Miembros</h3>
          <div v-if="proyecto">
            <div v-for="(item, idx) in proyecto.members" :key="idx">
              {{ item }}
            </div>
          </div>
          <div v-else>Proyecto...</div>
        </div>
      </div>
    </new-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "@/components/shared/BaseComponent.vue";
import NewModal from "@/components/shared/modals/NewModal.vue";
import { Prop } from "vue-property-decorator";
import { TenantUserDto } from "@/application/dtos/master/tenants/TenantUserDto";
import { ProjectDto } from "../../../application/dtos/app/projects/ProjectDto";

@Component({
  components: {
    NewModal
  }
})
export default class ProjectMembers extends BaseComponent {
  @Prop({ default: "", type: String }) proyectoId;
  private users: TenantUserDto[] = [];
  private proyecto = {} as ProjectDto;
  mounted() {
    this.services.projects.get(this.proyectoId).then((response: ProjectDto) => {
      this.proyecto = response;
    });
    this.services.tenantUsers.getAll().then((response: TenantUserDto[]) => {
      this.users = response;
    });
  }
}
</script>
