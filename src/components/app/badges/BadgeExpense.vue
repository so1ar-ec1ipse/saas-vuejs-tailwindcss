<template>
  <div
    class="space-x-0 justify-center items-center uppercase inline-flex text-xs font-semibold rounded-sm bg-rose-100 text-rose-800 border border-rose-300"
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
        d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
        clip-rule="evenodd"
      />
    </svg>
    <span class="tracking-wide" v-if="withText"> Gasto </span>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component({})
export default class BadgeExpense extends Vue {
  @Prop({ default: "h-3" }) height!: string;
  @Prop({ default: "w-20 px-2 leading-5" }) width!: string;
  @Prop({ default: true }) withText!: boolean;
  @Prop({ default: "" }) text!: string;
}
</script>
