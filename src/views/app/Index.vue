<template>
  <app-layout layout="app">
    <div>
      <router-view :key="currentWorkspaceId"></router-view>
    </div>
  </app-layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import AppLayout from "@/components/layouts/AppLayout.vue";
import { WorkspaceDto } from "@/application/dtos/app/workspaces/WorkspaceDto";
import store from "@/store";

@Component({
  components: { AppLayout }
})
export default class AppComponent extends Vue {
  get currentWorkspaceId(): string {
    return store.state.tenant.currentWorkspace?.id ?? "";
  }
  // @Watch("$store.state.tenant.currentWorkspace")
  // changedWorkspace() {
  //   console.log("app.vue. changed workspace.");
  // }
}
</script>
