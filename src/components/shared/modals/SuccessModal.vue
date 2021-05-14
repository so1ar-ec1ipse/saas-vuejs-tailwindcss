<template>
  <div @keyup.enter="close" v-on:keypress.esc="close">
    <div v-if="showing">
      <div
        class="items-center inset-0 flex justify-center z-40 fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center"
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
              class="mx-auto flex items-center justify-center h-12 w-12 rounded-sm bg-green-100 border border-green-300"
            >
              <svg
                class="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-5">
              <h3
                v-if="!successDescription"
                class="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                {{ title }}
              </h3>
              <div v-if="successDescription" class="mt-2">
                <p class="text-lg leading-6 font-medium text-gray-900">
                  {{ successDescription }}
                </p>
              </div>
              <p v-if="subtitle" class="text-gray-700 text-xs mt-3">
                {{ subtitle }}
              </p>
              <div
                v-if="warnings && warnings.length > 0"
                class="mt-2 text-left"
              >
                <br />Advertencias:
                <br />
                <ul class="mt-1">
                  <li
                    v-for="(item, idx) in warnings"
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
          </div>
          <div class="mt-5 sm:mt-6">
            <span class="flex w-full rounded-sm shadow-sm">
              <button
                ref="close"
                v-on:click="close"
                type="button"
                class="inline-flex justify-center w-full rounded-sm border border-transparent px-4 py-2 bg-gray-800 text-base leading-6 font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-shadow focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
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
export default class SuccessModalComponent extends Vue {
  private title!: string;
  private closeText!: any;
  private showing: boolean = false;
  private successDescription!: string;
  private subtitle!: string;
  private warnings: string[] = [];
  mounted() {
    this.title = this.$t("shared.success").toString();
    this.closeText = this.$t("shared.close").toString();
  }
  public show(description: any, subtitle?: any, warnings?: string[]) {
    this.successDescription = description;
    this.subtitle = subtitle;
    this.showing = true;
    if (warnings) {
      this.warnings = warnings;
    }
  }
  public close() {
    this.$emit("closed");
    this.showing = false;
  }
}
</script>
