<template>
  <div>
    <div class="bg-secondary pt-12 sm:pt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-extrabold text-secondary sm:text-4xl">
            {{ $t("marketing.benefits.title") }}
          </h2>
          <p class="mt-3 text-xl text-secondary sm:mt-4">
            {{ $t("marketing.benefits.description") }}
          </p>
        </div>
      </div>
      <div class="mt-10 pb-12 sm:pb-16">
        <div class="relative">
          <div class="absolute inset-0 h-1/2 "></div>
          <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-4xl mx-auto">
              <dl
                class="rounded-lg bg-marketing shadow-lg sm:grid sm:grid-cols-3"
              >
                <div
                  class="flex flex-col border-b border-gray-100 dark:border-gray-900 p-6 text-center sm:border-0 sm:border-r"
                >
                  <dt
                    class="order-2 mt-2 text-lg leading-6 font-medium text-primary"
                  >
                    {{ $t("marketing.benefits.benefit1Description") }}
                  </dt>
                  <dd class="order-1 text-5xl font-extrabold text-theme-500">
                    {{ $t("marketing.benefits.benefit1Value") }}
                  </dd>
                </div>
                <div
                  class="flex flex-col border-t border-b border-gray-100 dark:border-gray-900 p-6 text-center sm:border-0 sm:border-l sm:border-r"
                >
                  <dt
                    class="order-2 mt-2 text-lg leading-6 font-medium text-primary"
                  >
                    {{ $t("marketing.benefits.benefit2Description") }}
                  </dt>
                  <dd class="order-1 text-5xl font-extrabold text-theme-500">
                    {{ $t("marketing.benefits.benefit2Value") }}
                    <span class="text-2xl">{{
                      $t("marketing.benefits.benefit2ValueDescription")
                    }}</span>
                  </dd>
                </div>
                <div
                  class="flex flex-col border-t border-gray-100 dark:border-gray-800 p-6 text-center sm:border-0 sm:border-l"
                >
                  <dt
                    class="order-2 mt-2 text-lg leading-6 font-medium text-primary"
                  >
                    {{ $t("marketing.benefits.benefit3Description") }}
                  </dt>
                  <dd class="order-1 text-5xl font-extrabold text-theme-500">
                    <span class="text-2xl">{{
                      $t("marketing.benefits.benefit3ValueDescription")
                    }}</span>
                    {{ $t("marketing.benefits.benefit3Value") }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload);
export default {
  components: {},
  data() {
    return {};
  }
};
</script>
