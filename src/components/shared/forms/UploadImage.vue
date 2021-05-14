<template>
  <div>
    <side-modal v-on:close="close" :title="getTitle">
      <template v-slot:content>
        <picture-input
          ref="pictureInput"
          width="600"
          height="600"
          margin="16"
          accept="image/jpeg,image/png,image/jpg,image/ico"
          size="10"
          button-class="btn"
          :customStrings="getStrings"
          @change="onChange"
        >
        </picture-input>
      </template>
    </side-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import SideModal from "../modals/SideModal.vue";
import { Prop } from "vue-property-decorator";
// @ts-ignore
import PictureInput from "vue-picture-input";

@Component({
  components: {
    PictureInput,
    SideModal
  }
})
export default class UploadImageComponent extends Vue {
  @Prop()
  title!: string;
  @Prop()
  image!: string;
  customStrings = {} as any;
  mounted() {
    // @ts-ignore
    this.$refs.pictureInput.image = this.image;
    this.customStrings = {
      tap: this.$t("app.tickets.pictureInput.tap").toString(),
      change: this.$t("app.tickets.pictureInput.tap").toString(),
      remove: this.$t("app.tickets.pictureInput.remove").toString(),
      select: this.$t("app.tickets.pictureInput.select").toString(),
      selected: this.$t("app.tickets.pictureInput.selected").toString(),
      fileSize: this.$t("app.tickets.pictureInput.fileSize").toString(),
      fileType: this.$t("app.tickets.pictureInput.fileType").toString(),
      aspect: this.$t("app.tickets.pictureInput.aspect").toString(),
      upload: this.$t("app.tickets.pictureInput.upload").toString(),
      drag: this.$t("app.tickets.pictureInput.dragImage").toString()
    };
  }
  get getStrings() {
    return {
      tap: this.$t("app.tickets.pictureInput.tap").toString(),
      change: this.$t("app.tickets.pictureInput.tap").toString(),
      remove: this.$t("app.tickets.pictureInput.remove").toString(),
      select: this.$t("app.tickets.pictureInput.select").toString(),
      selected: this.$t("app.tickets.pictureInput.selected").toString(),
      fileSize: this.$t("app.tickets.pictureInput.fileSize").toString(),
      fileType: this.$t("app.tickets.pictureInput.fileType").toString(),
      aspect: this.$t("app.tickets.pictureInput.aspect").toString(),
      upload: this.$t("app.tickets.pictureInput.upload").toString(),
      drag: this.$t("app.tickets.pictureInput.dragImage").toString()
    };
  }
  onChange() {
    if (this.loadedImage) {
      this.$emit("loaded", this.loadedImage);
    }
  }
  get loadedImage() {
    // @ts-ignore
    return this.$refs.pictureInput.image;
  }
  close() {
    this.$emit("close");
  }
  get getTitle() {
    return this.$t("shared.upload") + " " + this.title;
  }
}
</script>

<style></style>
