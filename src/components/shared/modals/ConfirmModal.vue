<template>
  <div @keyup.enter="accept" v-on:keypress.esc="no">
    <div v-if="showing">
      <div
        class="fixed z-50 inset-x-0 px-4 pb-6 inset-0 p-0 flex items-center justify-center"
      >
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div
          class="bg-blueGray-100 shadow-inner border-2 border-blueGray-400 rounded-sm px-4 pt-5 pb-4 overflow-hidden transform transition-all max-w-md w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div>
            <div
              class="mx-auto flex items-center justify-center h-12 w-12 rounded-sm bg-yellow-50 border border-yellow-300"
            >
              <svg
                class="h-6 w-6 text-yellow-600"
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
            <div class="mt-3 text-center sm:mt-5">
              <h3
                class="text-lg leading-6 font-bold text-gray-900"
                id="modal-headline"
              >
                {{ question }}
              </h3>
              <p v-if="subtitle" class="text-gray-700 text-sm mt-3">
                {{ subtitle }}
              </p>
              <!-- <div class="mt-2">
                <p class="text-sm leading-5 text-gray-500">{{ question }}</p>
              </div>-->
            </div>
          </div>
          <div class="mt-5 sm:mt-6">
            <span class="flex w-full rounded-sm shadow-sm">
              <button
                v-on:click="yes"
                type="button"
                class="inline-flex justify-center w-full rounded-sm border border-transparent px-4 py-2 bg-gray-800 text-base leading-6 font-medium text-white shadow-sm hover:bg-gray-700 focus:bg-gray-900 focus:outline-shadow transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                {{ yesTitle ? yesTitle : $t("shared.yes") }}
              </button>
              <button
                ref="close"
                v-on:click="no"
                type="button"
                class="ml-2 inline-flex justify-center w-full rounded-sm border border-gray-300 px-4 py-2 bg-gray-100 text-base leading-6 font-medium text-gray-800 shadow-sm hover:bg-gray-200 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                {{ noTitle ? noTitle : $t("shared.no") }}
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
export default class ConfirmModalComponent extends Vue {
  public title!: string;
  public closeText!: any;
  public showing: boolean = false;
  private question!: string;
  private yesTitle: string = "";
  private noTitle: string = "";
  private subtitle: string = "";
  mounted() {
    this.title = this.$t("shared.confirm").toString();
    this.closeText = this.$t("shared.close").toString();
  }
  public accept() {
    this.yes();
  }
  public show(
    question: any,
    yesTitle?: string,
    noTitle?: string,
    subtitle?: string
  ) {
    this.question = question;
    this.showing = true;
    if (yesTitle) {
      this.yesTitle = yesTitle;
    }
    if (noTitle) {
      this.noTitle = noTitle;
    }
    if (subtitle) {
      this.subtitle = subtitle;
    }
  }
  public yes() {
    this.$emit("yes");
    this.showing = false;
  }
  public no() {
    this.showing = false;
    this.$emit("no");
  }
}
</script>
