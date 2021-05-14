<template>
  <div>
    <div class="pt-2 pb-40  mx-auto px-4 sm:px-6 md:px-8 max-w-3xl">
      <h1 class="pt-4 text-2xl font-bold">
        {{ $t("app.cfdis.uploadCfdis") }}
      </h1>
      <p class="pb-2 pt-1 text-base font-normal">
        {{ $t("app.cfdis.uploadDescription") }}
      </p>
      <upload-cfdis-drag-and-drop
        class="sm:mx-0"
        :uploaded="uploaded"
      ></upload-cfdis-drag-and-drop>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import PageTitle from "../../../components/shared/navigation/PageTitle.vue";
import UploadCfdisDragAndDrop from "./UploadCfdisDragAndDrop.vue";
import { CfdiXmlPdfDto } from "@/application/dtos/app/cfdis/CfdiXmlPdfDto";

@Component({
  components: {
    UploadCfdisDragAndDrop,
    PageTitle
  }
})
export default class CfdisUpload extends BaseComponent {
  uploaded(cfdis: CfdiXmlPdfDto[]) {
    console.log("uploaded cfdis: " + cfdis.length);
  }
}
</script>
