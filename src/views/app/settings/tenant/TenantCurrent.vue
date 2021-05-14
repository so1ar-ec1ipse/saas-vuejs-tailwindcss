<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "@/components/shared/BaseComponent.vue";
import NavigationTabs from "@/components/shared/navigation/NavigationTabs.vue";
import PageTitle from "@/components/shared/navigation/PageTitle.vue";
import { adminRoutes } from "../../../../router/adminRoutes";

@Component({
  components: {
    NavigationTabs,
    PageTitle,
  },
})
export default class TenantComponent extends BaseComponent {
  private route: object = {};
  mounted() {
    this.route = adminRoutes;
  }
}
</script>
