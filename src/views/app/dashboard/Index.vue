<template>
  <div>
    <div
      class="flex items-center justify-between bg-white -m-4 sm:-m-8 p-8 pb-4 shadow-lg mb-4"
    >
      <div class="flex-1 min-w-0">
        <h2
          class="flex text-2xl font-bold leading-9 text-gray-800 sm:text-3xl sm:leading-9 sm:truncate"
        >
          Dashboard
        </h2>
      </div>
      <div class="mt-0 flex lg:ml-4">
        <span class="ml-3 shadow-sm rounded-sm">
          <router-link
            to="/app/transactions/new"
            class="h-8 inline-flex items-center px-4 py-2 border border-theme-200 text-xs leading-5 font-medium rounded-sm text-theme-700 bg-theme-100 hover:bg-theme-200 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out"
          >
            <i class="fa fa-receipt -ml-1 mr-2 h-5 w-5 text-theme-700"></i>
            {{ $t("shared.new") }} {{ $t("models.transaction.object") }}
          </router-link>
        </span>
      </div>
    </div>

    <div
      class="mt-4 sm:mt-12 max-w-md mx-auto  px-4 lg:px-10 flex justify-center py-4 md:py-8 lg:py-12 rounded-lg text-center flex-col"
    >
      <SvgDashboard></SvgDashboard>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import Charts from "@/views/app/integrations/Charts.vue";
import SvgDashboard from "../../../assets/img/dashboard.vue";

@Component({
  components: { Charts, SvgDashboard },
})
export default class DashboardComplement extends BaseComponent {}
</script>
