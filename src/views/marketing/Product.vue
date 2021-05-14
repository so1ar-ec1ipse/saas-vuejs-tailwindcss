<template>
  <div>
    <Hero class="bg-marketing" />
    <!-- <FeaturesV2 /> -->
    <Benefits />
    <Features />
    <Newsletter />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/marketing/Header.vue";
import Hero from "@/components/marketing/Hero.vue";
import Features from "@/components/marketing/Features.vue";
import FeaturesV2 from "@/components/marketing/FeaturesV2.vue";
import Benefits from "@/components/marketing/Benefits.vue";
import Steps from "@/components/marketing/Steps.vue";
import Newsletter from "@/components/marketing/Newsletter.vue";
import Footer from "@/components/marketing/Footer.vue";
export default {
  components: {
    Header,
    Hero,
    Features,
    FeaturesV2,
    Benefits,
    Steps,
    Newsletter,
    Footer
  }
};
</script>
