<template>
  <div class="max-w-7xl mx-auto py-8 px-4 sm:py-8 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-extrabold text-secondary text-center">
      {{ $t("marketing.faq.title") }}
    </h2>
    <div class="mt-12">
      <dl
        class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3"
      >
        <div>
          <dt class="text-lg leading-6 font-medium text-primary">
            {{ $t("marketing.faq.questions.q1") }}
          </dt>
          <dd class="mt-2 text-base text-gray-500">
            {{ $t("marketing.faq.questions.a1") }}
          </dd>
        </div>

        <div>
          <dt class="text-lg leading-6 font-medium text-primary">
            {{ $t("marketing.faq.questions.q2") }}
          </dt>
          <dd class="mt-2 text-base text-gray-500">
            {{ $t("marketing.faq.questions.a2") }}
          </dd>
        </div>

        <div>
          <dt class="text-lg leading-6 font-medium text-primary">
            {{ $t("marketing.faq.questions.q3") }}
          </dt>
          <dd class="mt-2 text-base text-gray-500">
            {{ $t("marketing.faq.questions.a3") }}
          </dd>
        </div>

        <div>
          <dt class="text-lg leading-6 font-medium text-primary">
            {{ $t("marketing.faq.questions.q4") }}
          </dt>
          <dd class="mt-2 text-base text-gray-500">
            {{ $t("marketing.faq.questions.a4") }}
          </dd>
        </div>

        <div>
          <dt class="text-lg leading-6 font-medium text-primary">
            {{ $t("marketing.faq.questions.q5") }}
          </dt>
          <dd class="mt-2 text-base text-gray-500">
            {{ $t("marketing.faq.questions.a5") }}
          </dd>
        </div>

        <div>
          <dt class="text-lg leading-6 font-medium text-primary">
            {{ $t("marketing.faq.questions.q6") }}
          </dt>
          <dd class="mt-2 text-base text-gray-500">
            {{ $t("marketing.faq.questions.a6") }}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style>
</style>