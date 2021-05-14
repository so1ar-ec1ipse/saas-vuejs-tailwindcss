<template>
  <div>
    <router-view></router-view>
    <Footer class=""></Footer>
  </div>
</template>

<script>
import Footer from "@/components/marketing/Footer.vue";
export default {
  components: {
    Footer,
  },
};
</script>