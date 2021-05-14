<template>
  <div class="h-full w-full bg-gray-100 border-gray-200 rounded-full">
    <div class="container  justify-center">
      <div class="w-11/12 md:w-2/6 h-2 bg-gray-200 rounded">
        <div class="bg-indigo-700 h-2 rounded relative" :style="widthStyle">
          <div v-if="false" class="absolute right-0">
            <div
              class="relative bg-indigo-700 shadow-lg px-2 py-1 rounded mt-4 -mr-5"
            >
            </div>
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

@Component({})
export default class ProgressBar extends Vue {
  @Prop({ default: 0 }) percentage!: number;

  get widthStyle() {
    return `style='width: ${this.percentage}%'`;
  }
}
</script>
