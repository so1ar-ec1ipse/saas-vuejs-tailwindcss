

<template>
  <div class="" v-click-outside="close">
    <button
      @click="show = !show"
      class="focus:z-10 w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none"
      id="pinned-project-options-menu-0"
      aria-expanded="false"
      aria-haspopup="true"
    >
      <span class="sr-only">Abrir colores</span>
      <!-- Heroicon name: solid/dots-vertical -->
      <svg
        class="w-4 h-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        stroke="currentColor"
        fill="none"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        />
      </svg>
    </button>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="show"
        class="h-64 overflow-y-scroll z-10 mx-3 origin-top-right absolute right-10 top-3 w-48 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="pinned-project-options-menu-0"
      >
        <div class="py-0.5" role="none">
          <button
            v-for="(option, idx) in arr"
            :key="idx"
            :disabled="selected === option.id"
            @click="select(option.id)"
            class="w-full block px-4 py-1 text-sm"
            :class="{
              'cursor-not-allowed bg-gray-50 text-gray-500':
                selected === option.id,
              'hover:bg-gray-100 hover:text-gray-900 text-gray-700':
                selected !== option.id,
            }"
            role="menuitem"
          >
            <div class="w-full flex items-center font-normal">
              <div
                class="h-2 w-2 rounded-full mr-2"
                :class="projectColor(option.id)"
              ></div>
              <div class="truncate mr-2">
                {{ option.name }}
              </div>
            </div>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import BaseComponent from "@/components/shared/BaseComponent.vue";
import { Prop } from "vue-property-decorator";
import * as ProjectHelpers from "@/application/modules/projects/ProjectHelpers";
import {Colors} from "@/application/enums/app/common/Colors";

@Component({
  components: {},
})
export default class ColorSelect extends Vue {
  @Prop({ default: Colors.UNDEFINED }) initial!: Colors;
  @Prop({ default: false }) disabled!: boolean;
  private arr = ProjectHelpers.colors;
  private show: boolean = false;
  private selected: Colors = Colors.UNDEFINED;
  mounted() {
    this.selected = this.initial;
  }
  close() {
    this.show = false;
  }
  select(value) {
    this.close();
    this.selected = value;
    this.$emit("selected", value);
  }
  projectColor(item) {
    return ProjectHelpers.getProjectColor(item);
  }
}
</script>
