<template>
  <div class="pt-2 pb-40 md:py-6 mx-auto px-4 sm:px-6 md:px-8">
    <customers-list></customers-list>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import CustomersList from "@/components/app/contacts/CustomersList.vue";

@Component({
  components: {
    CustomersList
  }
})
export default class Customers extends Vue {}
</script>
