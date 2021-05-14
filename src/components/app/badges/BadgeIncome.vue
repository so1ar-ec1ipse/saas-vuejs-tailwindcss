<template>
  <div
    class="space-x-0 justify-center items-center uppercase inline-flex text-xs  font-semibold rounded-sm bg-teal-50 text-teal-800 border border-teal-300"
    :class="width"
  >
    <div v-if="text" class="px-1">
      {{ text }}
    </div>
    <svg
      v-else
      class="w-auto"
      :class="height"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
        clip-rule="evenodd"
      />
    </svg>
    <span class="tracking-wide" v-if="withText">
      Ingreso
    </span>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component({})
export default class BadgeIncome extends Vue {
  @Prop({ default: "h-3" }) height!: string;
  @Prop({ default: "w-20 px-2 leading-5" }) width!: string;
  @Prop({ default: true }) withText!: boolean;
  @Prop({ default: "" }) text!: string;
}
</script>
