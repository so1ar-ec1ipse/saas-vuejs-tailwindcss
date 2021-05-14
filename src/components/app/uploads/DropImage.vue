<template>
  <div
    class="text-gray-600 drop text-center border border-gray-300 shadow-inner bg-white rounded-sm items-center"
    :class="getClasses"
    @dragover.prevent="dragOver"
    @dragleave.prevent="dragLeave"
    @drop.prevent="drop($event)"
  >
    <h1 v-if="!imageSource" class="mx-auto font-bold text-lg text-theme-500">
      <slot name="title"></slot>
    </h1>
    <span v-else>
      <slot name="hasImages"></slot>
    </span>
    <!-- Container -->
    <div class="grid gap-1 w-full" :class="getGridCols" v-if="imageSource">
      <!-- Item -->
      <!-- <img :src="img" class="col-span-3 h-20 w-auto mx-auto" /> -->
      <div class="col-span-3 md:col-span-1">
        <div>
          <img class="h-48 w-full object-cover" :src="imageSource" alt="" />
          <div v-if="false" class="flex flex-col">
            <span class="self-end mt-4">
              <button class="text-rose-500 text-sm" @click="remove">
                {{ $t("app.tickets.upload.remove") }}
              </button>
              <!-- <button @click="upload(img)" class="ml-2 bg-teal-accent-500">
                {{ $t("shared.upload") }}
              </button> -->
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="grid grid-cols-4 gap-4 w-full">
      <div v-for="(img, index) in imageSources" :key="index">
        <img :src="img" class="col-span-3 h-20 w-auto mx-auto" />
      </div>
    </div> -->

    <div class="manual" v-if="!imageSource">
      <p class="font-medium text-base">
        {{ $t("app.shared.buttons.dragImagesHere") }}
      </p>
      <label for="uploadmyfile">
        <p
          class="font-semibold text-base underline cursor-pointer hover:text-rose-500"
        >
          {{ $t("app.shared.buttons.orClickHereToAdd") }}...
        </p>
      </label>
      <input
        type="file"
        id="uploadmyfile"
        :accept="'image/*'"
        capture="camera"
        @change="requestUploadFile"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
@Component({})
export default class DropImage extends Vue {
  @Prop({ default: 0, type: Number })
  index!: number;
  @Prop({ default: "", type: String })
  image!: string;

  public isDragging: boolean = false;
  public imageSource: string = "";
  mounted() {
    if (this.image && this.image !== "") {
      this.imageSource = this.image;
    }
  }
  dragOver() {
    this.isDragging = true;
  }
  dragLeave() {
    this.isDragging = false;
  }
  async drop(e) {
    const self = this;
    const files = [...e.dataTransfer.files];
    const images = files.filter(file => file.type.indexOf("image/") >= 0);
    images.forEach(file => {
      self.getBase64(file).then((response: any) => {
        self.imageSource = response;
        self.$emit("dropped", this.imageSource, this.index);
      });
    });
    self.isDragging = false;
  }
  remove() {
    this.image = "";
  }
  requestUploadFile() {
    const src = this.$el.querySelector("#uploadmyfile");
    this.drop({ dataTransfer: src });
  }
  getBase64(file) {
    const reader = new FileReader();
    return new Promise(resolve => {
      reader.onload = ev => {
        resolve(ev?.target?.result);
      };
      reader.readAsDataURL(file);
    });
  }
  get getClasses() {
    return this.isDragging
      ? "bg-theme-200 border-2 border-dashed border-theme-800"
      : "";
  }
  get getGridCols() {
    return "grid-cols-1";
  }
}
</script>

<style scoped>
.drop {
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease-in-out;
}
.isDragging {
  background-color: #999;
  border-color: #fff;
}

#uploadmyfile {
  display: none;
}
</style>
