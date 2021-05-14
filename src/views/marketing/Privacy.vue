<template>
  <div>
    <Header></Header>
    <div class="py-6 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:flex-col sm:align-center space-y-4">
          <p class="font-bold" dir="ltr">
            PLEASE READ THE PRIVACY POLICY CAREFULLY BEFORE ACCESSING OR USING
            THE PLATFORM.
          </p>
          <div>
            ...
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/marketing/Header.vue";
import Footer from "@/components/marketing/Footer.vue";

export default {
  components: { Header, Footer }
};
</script>
<style>
h2 {
  @apply text-lg;
  @apply font-bold;
}
h3 {
  @apply text-base;
  @apply font-bold;
  @apply mt-4;
}
p {
  @apply mt-4;
}
.link {
  @apply text-theme-500;
}
</style>
