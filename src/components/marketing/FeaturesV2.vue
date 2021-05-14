<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="bg-secondary">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl font-extrabold text-secondary">
          {{ $t("marketing.featuresNetcoreSaasv2.headline") }}
        </h2>
        <p class="mt-4 text-lg text-gray-500">
          {{ $t("marketing.featuresNetcoreSaasv2.subheadline") }}
        </p>
      </div>
      <dl
        class="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8"
      >
        <div v-for="feature in features" :key="feature.name" class="relative">
          <dt>
            <svg
              v-if="feature.name.includes(':(')"
              xmlns="http://www.w3.org/2000/svg"
              class="absolute h-6 w-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="absolute h-6 w-6 text-teal-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
            <p class="ml-9 text-lg leading-6 font-medium text-secondary">
              {{ feature.name }}
            </p>
          </dt>
          <dd class="mt-2 ml-9 text-base text-gray-500">
            {{ feature.description }}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      features: []
    };
  },
  mounted() {
    for (let index = 1; index <= 6; index++) {
      this.features.push({
        name: this.$t(`marketing.featuresNetcoreSaasv2.feature${index}Title`),
        description: this.$t(
          `marketing.featuresNetcoreSaasv2.feature${index}Description`
        )
      });
    }
  }
};
</script>