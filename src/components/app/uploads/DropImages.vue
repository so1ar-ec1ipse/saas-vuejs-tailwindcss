<template>
  <div
    class="text-gray-700 overflow-hidden drop text-center flex border border-dashed border-gray-300 hover:border-blueGray-400 hover:border-dotted bg-white rounded-sm items-center"
    :class="getClasses"
    @dragover.prevent="dragOver"
    @dragleave.prevent="dragLeave"
    @drop.prevent="drop($event)"
  >
    <div v-if="loading" class="mx-auto font-medium text-base ">
      {{ $t("shared.loading") }}...
    </div>
    <div v-else>
      <h1
        v-if="getImageSources.length === 0"
        class="mx-auto font-bold text-lg text-blueGray-500"
      >
        <slot name="title"></slot>
      </h1>
      <span v-else>
        <slot name="hasImages"></slot>
      </span>
      <!-- Container -->
      <div class="grid gap-4 w-full" :class="getGridCols">
        <!-- Item -->
        <!-- <img :src="img" class="col-span-3 h-20 w-auto mx-auto" /> -->
        <div
          v-for="(img, index) in getImageSources"
          :key="index"
          class="col-span-3 md:col-span-1"
        >
          <div>
            <img class="h-48 w-full object-cover" :src="img" alt="" />
            <div v-if="false" class="flex flex-col">
              <span class="self-end mt-4">
                <button class="text-blueGray-500 text-sm" @click="remove(img)">
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

      <div class="manual">
        <p class="font-medium text-base">{{ title }}</p>
        <label for="uploadmyfile">
          <p
            class="font-semibold text-md underline cursor-pointer hover:text-blueGray-500"
          >
            {{ $t("app.shared.buttons.orClickHereToAdd") }}...
          </p>
        </label>
        <input
          type="file"
          id="uploadmyfile"
          ref="uploadmyfile"
          :accept="accept"
          multiple
          @change="requestUploadFile"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import imageCompression from "browser-image-compression";
import store from "@/store";
import { FileBase64 } from "@/application/shared/files/FileBase64";
import { i18n } from "@/plugins/vue-i18n";

@Component({})
export default class DropImages extends Vue {
  $refs!: {
    uploadmyfile: HTMLElement;
  };
  @Prop({ default: false, type: Boolean })
  loadImages!: boolean;
  @Prop({ default: i18n.t("app.shared.buttons.dragImagesHere"), type: String })
  title!: boolean;
  @Prop({ default: "image/*", type: String })
  accept!: boolean;

  public isDragging: boolean = false;
  public imageSources: string[] = [];
  private loading: boolean = false;
  openGallery() {
    this.$refs.uploadmyfile.click();
  }
  dragOver() {
    this.isDragging = true;
  }
  dragLeave() {
    this.isDragging = false;
  }
  async compressFile(imageFile: File): Promise<any> {
    // console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
    // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1920 / 2,
      useWebWorker: true
    };
    try {
      const file = await imageCompression(imageFile, options);
      // console.log("compressedFile instanceof Blob", file instanceof Blob); // true
      // console.log(`compressedFile size ${file.size / 1024 / 1024} MB`); // smaller than maxSizeMB
      return Promise.resolve(file);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async compressFileNotImage(imageFile: File): Promise<any> {
    return Promise.resolve(imageFile);
  }
  async drop(e) {
    this.loading = true;
    let files: any[] = [...e.dataTransfer.files];
    const newImagesPromises: any[] = [];
    await files.forEach((element: File) => {
      // console.log("type: " + element.type);
      // console.log("name: " + element.name);
      if (element.type.includes("image")) {
        newImagesPromises.push(this.compressFile(element));
      } else {
        newImagesPromises.push(this.compressFileNotImage(element));
      }
    });
    files = await Promise.all(newImagesPromises);
    this.loading = false;
    // const type = this.accept === 'image/*' ? "image/" : this.accept;
    const filesArray: FileBase64[] = [];
    const self = this;
    const promises: any[] = [];

    files.forEach(file => {
      const promise = self.getBase64(file);
      promises.push(promise);
      promise.then((response: any) => {
        filesArray.push({
          file,
          base64: response
        });
        self.$emit("dropped", response);
      });
    });
    const all = await Promise.all(promises);
    if (this.loadImages) {
      this.imageSources = this.imageSources.concat(
        filesArray.map(f => f.base64)
      );
    }
    this.$emit("droppedFiles", filesArray);
    // console.log("imageSources: " + JSON.stringify(this.imageSources));
    this.isDragging = false;
  }
  remove(img) {
    this.imageSources = this.imageSources.filter(f => f !== img);
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
  get getImageSources(): string[] {
    return this.imageSources.filter(f => f && f !== "");
  }
  get getClasses() {
    return this.isDragging
      ? "bg-blueGray-200 border-2 border-dashed border-blueGray-800"
      : "";
  }
  get getGridCols() {
    if (this.imageSources.length > 0 && this.imageSources.length <= 12) {
      return "grid-cols-" + this.imageSources.length;
    } else if (this.imageSources.length > 12) {
      return "grid-cols-12";
    }
    return "grid-cols-1";
  }
}
</script>

<style scoped>
.drop {
  align-items: center;
  justify-content: center;
  padding: 1rem;
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
