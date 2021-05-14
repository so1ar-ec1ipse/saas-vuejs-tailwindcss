<template>
  <div></div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../components/shared/BaseComponent.vue";

@Component({
  components: {},
})
export default class LogoutTemplate extends BaseComponent {
  mounted() {
    this.$store.dispatch("auth/logout");
  }
}
</script>
