<template>
  <div class="pt-2 pb-40 md:py-6 mx-auto px-4 sm:px-6 md:px-8">
    <suppliers-list></suppliers-list>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import SuppliersList from "@/components/app/contacts/SuppliersList.vue";

@Component({
  components: {
    SuppliersList
  }
})
export default class Suppliers extends Vue {}
</script>
