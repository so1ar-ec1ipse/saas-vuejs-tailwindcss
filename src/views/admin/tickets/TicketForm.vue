<template>
  <div>
    <ticket-full-details :admin="true"></ticket-full-details>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import TicketFullDetails from "@/components/app/tickets/TicketFullDetails.vue";

@Component({
  components: {
    TicketFullDetails,
  },
})
export default class TicketForm extends Vue {}
</script>
