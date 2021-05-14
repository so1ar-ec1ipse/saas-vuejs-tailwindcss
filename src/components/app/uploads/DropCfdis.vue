<template>
  <div
    class="text-gray-600 overflow-hidden drop text-center flex border border-dashed border-gray-300 bg-white rounded-sm items-center"
    :class="getClasses"
    @dragover.prevent="dragOver"
    @dragleave.prevent="dragLeave"
    @drop.prevent="drop($event)"
  >
    <div v-if="loading" class="mx-auto font-medium text-base">
      {{ $t("shared.loading") }}...
    </div>
    <div v-else>
      <h1
        v-if="getImageSources.length === 0"
        class="mx-auto font-bold text-lg text-theme-500"
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
                <button class="text-rose-500 text-sm" @click="remove(img)">
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

      <div class="manual" v-if="getImageSources.length === 0">
        <div class="flex items-center space-x-2 justify-center">
          <svg
            class="h-12"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              d="M128 0c-17.6 0-32 14.4-32 32v448c0 17.6 14.4 32 32 32h320c17.6 0 32-14.4 32-32V128L352 0H128z"
              fill="#e2e5e7"
            />
            <path
              d="M384 128h96L352 0v96c0 17.6 14.4 32 32 32z"
              fill="#b0b7bd"
            />
            <path fill="#cad1d8" d="M480 224l-96-96h96z" />
            <path
              d="M416 416c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V256c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v160z"
              fill="#50bee8"
            />
            <g fill="#fff">
              <path
                d="M131.28 326.176l22.272-27.888c6.64-8.688 19.568 2.432 12.288 10.752-7.664 9.088-15.728 18.944-23.424 29.024l26.112 32.496c7.024 9.6-7.04 18.816-13.952 9.344l-23.536-30.192-23.152 30.832c-6.528 9.328-20.992-1.152-13.68-9.856l25.712-32.624c-8.064-10.096-15.872-19.936-23.664-29.024-8.064-9.6 6.912-19.44 12.784-10.48l22.24 27.616zM201.264 327.84v47.328c0 5.648-4.608 8.832-9.2 8.832-4.096 0-7.68-3.184-7.68-8.832v-72.016c0-6.656 5.648-8.848 7.68-8.848 3.696 0 5.872 2.192 8.048 4.624l28.16 37.984 29.152-39.408c4.24-5.232 14.592-3.2 14.592 5.648v72.016c0 5.648-3.584 8.832-7.664 8.832-4.608 0-8.192-3.184-8.192-8.832V327.84l-21.248 26.864c-4.592 5.648-10.352 5.648-14.576 0l-19.072-26.864zM294.288 303.152c0-4.224 3.584-7.808 8.064-7.808 4.096 0 7.552 3.6 7.552 7.808v64.096h34.8c12.528 0 12.8 16.752 0 16.752h-42.336c-4.48 0-8.064-3.184-8.064-7.808v-73.04h-.016z"
              />
            </g>
            <path
              d="M400 432H96v16h304c8.8 0 16-7.2 16-16v-16c0 8.8-7.2 16-16 16z"
              fill="#cad1d8"
            />
          </svg>
          <svg
            class="h-12"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              d="M128 0c-17.6 0-32 14.4-32 32v448c0 17.6 14.4 32 32 32h320c17.6 0 32-14.4 32-32V128L352 0H128z"
              fill="#e2e5e7"
            />
            <path
              d="M384 128h96L352 0v96c0 17.6 14.4 32 32 32z"
              fill="#b0b7bd"
            />
            <path fill="#cad1d8" d="M480 224l-96-96h96z" />
            <path
              d="M416 416c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V256c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v160z"
              fill="#f15642"
            />
            <g fill="#fff">
              <path
                d="M101.744 303.152c0-4.224 3.328-8.832 8.688-8.832h29.552c16.64 0 31.616 11.136 31.616 32.48 0 20.224-14.976 31.488-31.616 31.488h-21.36v16.896c0 5.632-3.584 8.816-8.192 8.816-4.224 0-8.688-3.184-8.688-8.816v-72.032zm16.88 7.28v31.872h21.36c8.576 0 15.36-7.568 15.36-15.504 0-8.944-6.784-16.368-15.36-16.368h-21.36zM196.656 384c-4.224 0-8.832-2.304-8.832-7.92v-72.672c0-4.592 4.608-7.936 8.832-7.936h29.296c58.464 0 57.184 88.528 1.152 88.528h-30.448zm8.064-72.912V368.4h21.232c34.544 0 36.08-57.312 0-57.312H204.72zM303.872 312.112v20.336h32.624c4.608 0 9.216 4.608 9.216 9.072 0 4.224-4.608 7.68-9.216 7.68h-32.624v26.864c0 4.48-3.184 7.92-7.664 7.92-5.632 0-9.072-3.44-9.072-7.92v-72.672c0-4.592 3.456-7.936 9.072-7.936h44.912c5.632 0 8.96 3.344 8.96 7.936 0 4.096-3.328 8.704-8.96 8.704h-37.248v.016z"
              />
            </g>
            <path
              d="M400 432H96v16h304c8.8 0 16-7.2 16-16v-16c0 8.8-7.2 16-16 16z"
              fill="#cad1d8"
            />
          </svg>
        </div>
        <p class="font-medium text-base">{{ title }}</p>

        <label for="uploadmyfile">
          <p
            class="font-semibold text-sm underline cursor-pointer hover:text-rose-500"
          >
            {{ $t("app.shared.buttons.orClickHereToAdd") }}...
          </p>
        </label>
        <p class="text-xs font-normal mt-2">
          Asegúrate que el XML y PDF tengan el mismo nombre (CFDi-1.pdf y
          CFDi-1.xml)
        </p>
        <input
          type="file"
          id="uploadmyfile"
          :accept="accept"
          capture="camera"
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

@Component({})
export default class DropImages extends Vue {
  @Prop({ default: false, type: Boolean })
  loadImages!: boolean;
  @Prop({ default: "Arrastra los XMLs y PDFs aquí", type: String })
  title!: boolean;
  @Prop({ default: ".xml,.pdf", type: String })
  accept!: boolean;

  public isDragging: boolean = false;
  public imageSources: string[] = [];
  public loading: boolean = false;

  dragOver() {
    if (!this.loading) {
      this.isDragging = true;
    }
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
    // if (this.loading) {
    //   return false;
    // }
    // this.loading = true;
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
    // console.log("droppedFiles: " + filesArray);
    this.$emit("droppedFiles", filesArray);
    // console.log("imageSources: " + JSON.stringify(this.imageSources));
    this.isDragging = false;
    // this.loading = false;
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
    return this.isDragging && !this.loading
      ? "bg-theme-200 border-2 border-dashed border-theme-800"
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
