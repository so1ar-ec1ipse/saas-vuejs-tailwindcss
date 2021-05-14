<template>
  <div>
    <transactions-list :onlyTransactions="true"></transactions-list>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import TransactionsList from "@/components/app/transactions/TransactionsList.vue";

@Component({
  components: {
    TransactionsList,
  },
})
export default class Transactions extends Vue {}
</script>
