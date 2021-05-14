<template>
  <div
    :class="' ' + marketingColor + ' '"
    class="background-pattern relative overflow-hidden bg-secondary text-secondary"
    :key="currentLocale"
  >
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  components: {},
  computed: {
    ...mapGetters("theme", {
      marketingTheme: "marketingTheme",
      marketingColor: "marketingColor"
    })
  }
})
export default class MarketingComponent extends Vue {
  private marketingColor!: string;
  mounted() {
    this.showConversations();

    const htmlClasses = document.querySelector("html")?.classList;
    if (this.currentTheme === "theme-bg-light") {
      this.$store.commit("theme/marketingTheme", "theme-bg-light");
      htmlClasses?.remove("dark");
    } else {
      this.$store.commit("theme/marketingTheme", "theme-bg-dark");
      htmlClasses?.add("dark");
    }
  }
  showConversations() {
    // @ts-ignore
    // if (this.$intercom) {
    //   this.$intercom.boot();
    // }
    // @ts-ignore
    if (this.$drift) {
      // this.$drift.show();
    }
  }
  get currentTheme() {
    return this.$store.state.theme.marketingTheme;
  }
  get currentLocale() {
    return this.$store.state.locale.locale ?? "undefined-locale";
  }
}
</script>
<style scoped></style>
