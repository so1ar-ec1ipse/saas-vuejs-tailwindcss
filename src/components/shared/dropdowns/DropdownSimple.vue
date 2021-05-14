<template>
  <div class="relative inline-block text-left">
    <div v-click-outside="close">
      <div>
        <button
          @click="show = !show"
          type="button"
          class="h-full inline-flex justify-center w-full rounded-sm border border-gray-300 shadow-sm px-3 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          <slot name="icon"></slot>
          <slot name="title"></slot>
          <!-- {{ title }} -->

          <!-- Heroicon name: chevron-down -->
          <!-- <svg
          class="-mr-1 ml-2 h-5 w-5"
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
        </svg> -->
        </button>
      </div>
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-show="show"
          class="origin-top-right absolute right-0 mt-2 rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
          :class="{
            'w-32': size === 'xs',
            'w-52': size === 'sm',
            'w-72': size === 'md',
            'w-96': size === 'lg',
          }"
        >
          <div
            class="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <slot name="items"></slot>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
@Component({})
export default class DropdownSimple extends Vue {
  @Prop() title!: string;
  @Prop({ default: "lg" }) size!: string;
  private show: boolean = false;
  close() {
    this.show = false;
  }
}
</script>
