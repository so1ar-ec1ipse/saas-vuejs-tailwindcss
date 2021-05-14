<template>
  <div>
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6"></div>
    </header>
    <div class="pt-2 pb-40 mx-auto px-4 sm:px-6 md:px-8 max-w-3xl">
      <h1 class="pt-4 text-2xl font-bold">
        {{ $t("app.tickets.uploadTickets") }}
      </h1>
      <p class="pb-2 pt-1 text-base font-normal">
        {{ $t("app.tickets.uploadDescription") }}
      </p>
      <upload-tickets-drag-and-drop
        ref="uploadTicketsDragAndDrop"
        class="sm:mx-0"
        v-on:uploaded="uploadedTickets"
      ></upload-tickets-drag-and-drop>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import PageTitle from "../../../components/shared/navigation/PageTitle.vue";
import UploadTicketsDragAndDrop from "./UploadTicketsDragAndDrop.vue";

@Component({
  components: {
    UploadTicketsDragAndDrop,
    PageTitle
  }
})
export default class TicketsUpload extends BaseComponent {
  $refs!: {
    uploadTicketsDragAndDrop: UploadTicketsDragAndDrop;
  };
  mounted() {
    if (this.$route.params.action === "gallery") {
      this.$refs.uploadTicketsDragAndDrop.openGalleryWhenReady = true;
    }
  }
  uploadedTickets() {
    window.scrollTo(0, 0);
    this.$router.push({ name: "app.tickets" });
  }
}
</script>
