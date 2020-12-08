<template>
  <div class="background-pattern">
    <Header></Header>
    <Hero></Hero>
    <Features></Features>
    <Newsletter></Newsletter>
    <FAQ></FAQ>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/marketing/Header.vue";
import Hero from "@/components/marketing/Hero.vue";
import Features from "@/components/marketing/Features.vue";
import Newsletter from "@/components/marketing/Newsletter.vue";
import FAQ from "@/components/marketing/FAQ.vue";
import Footer from "@/components/marketing/Footer.vue";

@Component({
  components: {
    Header,
    Hero,
    Features,
    Newsletter,
    FAQ,
    Footer,
  },
})
export default class MarketingProductComponent extends Vue {
  closed = false;
  mounted() {
    this.$store.commit("theme/marketingTheme", "theme-bg-dark");
    this.$store.commit("theme/marketingColor", "theme-violet");
  }
}
</script>
