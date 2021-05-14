<template>
  <div
    class="space-x-0 justify-center items-center uppercase inline-flex text-xs leading-5 font-semibold rounded-sm border"
    :class="[
      {
        'w-5 p-1': size === 'xs',
        'w-6 p-1': size === 'sm',
        'w-20 px-2': size === 'md',
        'bg-yellow-50 text-yellow-800 border-yellow-300': status !== 2,
        'bg-teal-50 text-teal-800 border-teal-300': status === 2
      },
      width
    ]"
  >
    <svg
      v-if="status >= 3"
      class="text-yellow-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      :class="[
        {
          'h-3': size === 'xs',
          'h-4': size === 'sm',
          'h-3 mr-1': size === 'md'
        },
        height
      ]"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>

    <span v-else-if="text">
      {{ text }}
    </span>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 512 512"
      aria-hidden="true"
      :class="{
        'h-3': size === 'xs',
        'h-4': size === 'sm',
        'h-3 mr-1': size === 'md'
      }"
    >
      <path
        d="M401.095 38.851L348.683 8.648 296.27 38.851 243.858 8.648 191.445 38.85 124.021 0v402.609h-80.54v54.11C43.481 487.202 68.28 512 98.763 512h314.475c30.482 0 55.282-24.798 55.282-55.281V0l-67.425 38.851zM98.763 481.978c-13.928 0-25.26-11.33-25.26-25.259v-24.088h284.453v24.088a54.966 54.966 0 006.115 25.259H98.763zm314.474 0c-13.927 0-25.259-11.33-25.259-25.259v-54.11H154.043V51.948l37.401 21.551 52.413-30.2 52.413 30.2 52.413-30.201 52.413 30.201 37.402-21.551v404.771c-.001 13.929-11.332 25.259-25.261 25.259z"
      />
      <path
        d="M184.066 135.49h224.405v30.022H184.066zM184.066 192.742h224.405v30.022H184.066zM184.066 249.994h112.203v30.022H184.066z"
      />
    </svg>
    <span v-if="size === 'md' && !text"> Ticket </span>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component({})
export default class BadgeTicket extends Vue {
  @Prop({ default: "md" }) size!: string;
  @Prop({ default: 0 }) status!: boolean;
  @Prop({ default: "" }) text!: string;
  @Prop({ default: "" }) height!: string;
  @Prop({ default: "" }) width!: string;
}
</script>
