<template>
  <div
    :class="marketingTheme + ' ' + marketingColor + ' '"
    class="pt-12 md:pt-0 background-pattern"
  >
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import Header from "@/components/marketing/Header.vue";

@Component({
  components: {},
  computed: {
    ...mapGetters("theme", {
      marketingTheme: "marketingTheme",
      marketingColor: "marketingColor",
    }),
  },
})
export default class MarketingComponent extends Vue {
  mounted() {
    this.showConversations();
  }
  showConversations() {
    // @ts-ignore
    // if (this.$intercom) {
    //   // @ts-ignore
    //   this.$intercom.boot();
    // }

    // @ts-ignore
    if (this.$drift) {
      // @ts-ignore
      // this.$drift.show();
    }
  }
}
</script>
<style scoped></style>
