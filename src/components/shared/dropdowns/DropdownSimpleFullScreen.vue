<template>
  <div class="relative inline-block text-left">
    <div v-click-outside="close">
      <div>
        <button
          @click="show"
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

      <new-modal maxSize="sm:max-w-md" ref="modalOptions">
        <div class="bg-white">
          <slot name="items"></slot>
        </div>
      </new-modal>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import NewModal from "../modals/NewModal.vue";

@Component({
  components: {
    NewModal,
  },
})
export default class DropdownSimpleFullScreen extends Vue {
  $refs!: {
    modalOptions: NewModal;
  };
  @Prop() title!: string;
  @Prop({ default: "lg" }) size!: string;
  close() {
    this.$refs.modalOptions.close();
  }
  show() {
    this.$refs.modalOptions.show();
  }
}
</script>
