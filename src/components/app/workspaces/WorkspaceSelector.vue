<template>
  <div>
    <div class="relative text-left w-auto" v-click-outside="closeDropdown">
      <span class="inline-block w-full rounded-sm shadow-sm">
        <button
          class="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 truncate text-gray-800 cursor-pointer w-full pl-3 py-2 text-left focus:outline-none transition ease-in-out duration-150 sm:text-sm sm:leading-5 hover:text-gray-800 rounded-sm shadow-sm border border-gray-200"
          @click="toggleDropDown"
        >
          <div class="font-bold truncate w-full pr-5">
            <span v-if="currentWorkspace" class="mt-4 text-xs truncate">{{
              currentWorkspace.name
            }}</span>
            <span v-else class="mt-4 text-xs text-gray-600"
              >- {{ $t("app.workspaces.select") }} -</span
            >
          </div>
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
          >
            <svg
              class="h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </button>
      </span>

      <!-- Select popover, show/hide based on select state. -->
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          class="z-40 absolute object-top mt-1 w-full rounded-sm bg-white shadow-lg"
          v-if="dropDown"
        >
          <div
            class="max-h-60 rounded-sm py-1 text-sm leading-5 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
          >
            <button
              v-for="(workspace, index) in workspaces"
              :key="index"
              role="option"
              class="text-left text-xs w-full text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 border-b border-gray-100 font-medium truncate"
              @click="change(workspace)"
            >
              {{ workspace.name }}
            </button>
            <button
              @click="add"
              role="option"
              class="text-theme-600 w-full text-xs text-left font-bold cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 hover:text-theme-700"
            >
              {{ $t("shared.add") }}
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "@/components/shared/BaseComponent.vue";
import { WorkspaceDto } from "@/application/dtos/app/workspaces/WorkspaceDto";
import { mapGetters } from "vuex";

@Component({
  components: {},
  computed: {
    ...mapGetters("tenant", {
      workspaces: "workspaces",
      currentWorkspace: "currentWorkspace"
    })
  }
})
export default class WorskpaceSelector extends BaseComponent {
  $refs!: {};
  private workspaces!: WorkspaceDto[];
  private currentWorkspace!: WorkspaceDto;
  private dropDown: boolean = false;
  mounted() {
    if (
      !this.currentWorkspace &&
      this.workspaces &&
      this.workspaces.length > 0
    ) {
      const defaultWorkspace = this.workspaces.find(f => f.default);
      if (defaultWorkspace) {
        this.change(defaultWorkspace);
      } else {
        this.change(this.workspaces[0]);
      }
    }
    if (!this.workspaces) {
      this.services.workspaces.getAllWorkspaces(true);
    }
  }
  add() {
    this.closeDropdown();
    this.$router.push({ name: "app.workspaces.new" });
  }
  closeDropdown() {
    this.dropDown = false;
  }
  toggleDropDown() {
    this.dropDown = !this.dropDown;
  }
  change(workspace: WorkspaceDto) {
    this.closeDropdown();
    this.$store.commit("tenant/currentWorkspace", workspace);
    // this.$router.go(0);
  }
}
</script>
