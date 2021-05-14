

<template>
  <div class="" v-click-outside="close">
    <button
      @click="mostrar = !mostrar"
      class="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      id="pinned-project-options-menu-0"
      aria-expanded="false"
      aria-haspopup="true"
    >
      <span class="sr-only">Abrir opciones</span>
      <!-- Heroicon name: solid/dots-vertical -->
      <svg
        class="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        stroke="none"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
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
        v-if="mostrar"
        class="z-10 mx-3 origin-top-right absolute right-10 top-3 w-48 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="pinned-project-options-menu-0"
      >
        <div class="py-0.5 divide-y" role="none">
          <slot name="options"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class DropdownOptions extends Vue {
  @Prop({ default: false }) disabled!: boolean;
  private mostrar: boolean = false;
  close() {
    this.mostrar = false;
  }
}
</script>
