<template>
  <div @keyup.enter="close" v-on:keypress.esc="close">
    <div v-if="showing" class="fixed z-50 inset-0 overflow-y-auto">
      <div
        class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <transition
          enter-active-class="ease-out duration-300"
          enter-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="ease-in"
          leave-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
        </transition>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >

        <transition
          enter-active-class="ease-out duration-300"
          enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="ease-in duration-200"
          leave-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            v-show="showing"
            class="z-50 inline-block align-bottom bg-white rounded-sm px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div>
              <div
                class="mx-auto flex items-center justify-center h-12 w-12 rounded-sm bg-rose-50 border border-red-300"
              >
                <svg
                  class="h-6 w-6 text-rose-600"
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
              <div
                v-if="!errors || errors.length === 0"
                class="mt-3 text-center sm:mt-5 overflow-y-auto max-h-40"
              >
                <h3
                  v-if="!errorDescription"
                  class="text-lg leading-6 font-medium text-gray-800"
                  :class="{
                    'text-sm': title.length > 100,
                  }"
                  id="modal-headline"
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
              <div
                v-else
                class="mt-3 text-center sm:mt-5 overflow-y-auto max-h-40"
              >
                <h3
                  class="text-lg leading-6 font-medium text-gray-800"
                >
                  {{ title }}
                </h3>
                <ul class="mt-2 text-left">
                  <li
                    v-for="(item, idx) in errors"
                    :key="idx"
                    class="text-sm font-medium text-gray-800"
                  >
                    <span v-if="item.includes(' <!DOCTYPE html>')"
                      >Tiempo de espera agotado</span
                    >
                    <span v-else> {{ idx + 1 }}. {{ item }} </span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="mt-5 sm:mt-6">
              <button
                type="button"
                @click="close"
                class="inline-flex justify-center w-full rounded-sm border border-transparent px-4 py-2 bg-gray-800 text-base leading-6 font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-shadow focus:bg-gray-900 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                {{ closeText }}
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { JsonHubProtocol } from "@aspnet/signalr";

@Component
export default class ErrorModalComponent extends Vue {
  private title!: string;
  private closeText!: any;
  private showing: boolean = false;
  private errorDescription!: string;
  private errors: string[] = [];
  mounted() {
    this.title = this.$t("shared.error").toString();
    this.closeText = this.$t("shared.accept").toString();
  }
  public show(error: any, closeText?: any) {
    console.log("showing error: " + error);
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
      error = "Tiempo de espera agotado";
    }
    this.errorDescription = error;
    this.showing = true;
  }
  public close() {
    this.$emit("closed");
    this.showing = false;
  }
  public showErrors(errors: string[]) {
    this.title = this.$t("shared.errors").toString();
    this.errors = errors;
    this.showing = true;
  }
}
</script>
