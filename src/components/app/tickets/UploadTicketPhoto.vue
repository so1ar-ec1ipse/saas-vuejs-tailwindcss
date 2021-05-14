<template>
  <drop-images
    :loadImages="true"
    :multiple="false"
    :image="image"
  ></drop-images>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import DropImages from "../uploads/DropImages.vue";

@Component({ components: { DropImages } })
export default class UploadTicketPhotoComponent extends Vue {
  @Prop({ required: true, default: 0 })
  index!: number;
  @Prop({ required: false, default: "", type: String })
  image!: string;
  public loadFile(file: File) {
    // @ts-ignore
    this.$refs.pictureInput.loadFile(file);
  }
  onChange(image) {
    this.$emit("changed", image, this.index);
  }
  onRemove() {
    this.$emit("removed", this.index);
  }
}
</script>

<style scoped>
.picture-input div .preview-container canvas .picture-preview {
  background-color: red;
}
</style>
