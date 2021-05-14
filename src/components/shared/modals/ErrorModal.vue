<template>
  <div @keyup.enter="close" v-on:keypress.esc="close">
    <div v-if="showing">
      <div
        class="items-center inset-0 flex justify-center z-50 fixed top-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center"
      >
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div
          class="bg-blueGray-100 shadow-inner border-2 border-blueGray-400 rounded-sm px-4 pt-5 pb-4 overflow-hidden transform transition-all sm:max-w-sm w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div>
            <div
              class="mx-auto flex items-center justify-center h-12 w-12 rounded-sm bg-rose-50 border border-red-300"
            >
              <svg
                class="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-5 overflow-y-auto max-h-40">
              <h3
                v-if="!errorDescription"
                class="text-lg leading-6 font-medium text-gray-800"
                id="modal-headline"
                :class="{
                  'text-sm': title.length > 100,
                }"
              >
                {{ title }}
              </h3>
              <div v-if="errorDescription" class="mt-2">
                <p
                  class="text-lg leading-6 font-medium text-gray-800"
                  :class="{
                    'text-sm': errorDescription.length > 100,
                  }"
                >
                  {{ errorDescription }}
                </p>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-6">
            <span class="flex w-full rounded-sm shadow-sm">
              <button
                ref="close"
                v-on:click="close"
                type="button"
                class="inline-flex justify-center w-full rounded-sm border border-transparent px-4 py-2 bg-gray-800 text-base leading-6 font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-shadow focus:bg-gray-900 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                {{ closeText }}
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class ErrorModalComponent extends Vue {
  private title!: string;
  private closeText!: any;
  private showing: boolean = false;
  private errorDescription!: string;
  mounted() {
    this.title = this.$t("shared.error").toString();
    this.closeText = this.$t("shared.close").toString();
  }
  public show(error: any, closeText?: any) {
    if (error.toString().includes("Maximum call stack size exceeded")) {
      this.close();
      return;
    }
    if (error.length > 300 && process.env.NODE_ENV !== "production") {
      error = error.substring(0, 300);
    }
    if (
      error.toString().trim().toLowerCase() === "Network Error".toLowerCase()
    ) {
      error = this.$i18n.t("shared.networkError").toString();
    }
    if (
      error.toString().trim().toLowerCase() ===
      "System.TimeoutException".toLowerCase()
    ) {
      error = this.$i18n.t("shared.timeout").toString();
    }

    if (closeText) {
      this.closeText = closeText;
    }
    if (error.toString().includes("<!DOCTYPE")) {
      error = this.$t("shared.timeout");
    }
    this.errorDescription = error;
    this.showing = true;
  }
  public close() {
    this.$emit("closed");
    this.showing = false;
  }
}
</script>
