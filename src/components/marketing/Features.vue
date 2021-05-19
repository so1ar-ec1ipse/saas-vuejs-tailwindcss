<template>
  <div class="">
    <div class="overflow-hidden">
      <div class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <div v-for="(feature, idx) in features" :key="idx">
          <div
            v-if="idx % 2 === 0"
            class="relative mt-12 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center"
          >
            <div class="relative">
              <h3
                class="text-2xl font-extrabold text-primary tracking-tight sm:text-3xl"
              >
                {{ feature.headline }}
              </h3>
              <p class="mt-3 text-lg text-gray-500">
                {{ feature.subheadline }}
              </p>

              <dl class="mt-10 space-y-10">
                <div
                  v-for="(subfeature, idxSub) in feature.features"
                  :key="idxSub"
                  class="flex"
                >
                  <div class="flex-shrink-0">
                    <div
                      class="flex items-center justify-center h-6 w-6 rounded-full bg-theme-600 text-white"
                    >
                      <!-- Heroicon name: globe-alt -->
                      <svg
                        class="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <dt class="text-lg leading-6 font-medium text-primary">
                      {{ subfeature.title }}
                    </dt>
                    <dd class="mt-2 text-base text-gray-500">
                      {{ subfeature.description }}
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            <div class="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
              <svg
                class="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
                width="784"
                height="404"
                fill="none"
                viewBox="0 0 784 404"
              >
                <defs>
                  <pattern
                    id="ca9667ae-9f92-4be7-abcb-9e3d727f2941"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="4"
                      height="4"
                      class="text-gray-200 dark:text-black"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width="784"
                  height="404"
                  fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)"
                />
              </svg>
              <img
                class="relative mx-auto rounded-xl shadow-xl"
                width="470"
                v-lazy="feature.image"
                :alt="feature.headline"
              />
            </div>
          </div>

          <div v-else class="relative mt-12 sm:mt-16 lg:mt-24">
            <div
              class="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center"
            >
              <div class="lg:col-start-2">
                <h3
                  class="text-2xl font-extrabold text-secondary tracking-tight sm:text-3xl"
                >
                  {{ feature.headline }}
                </h3>
                <p class="mt-3 text-lg text-gray-500">
                  {{ feature.subheadline }}
                </p>

                <dl class="mt-10 space-y-10">
                  <div
                    v-for="(subfeature, idxSub) in feature.features"
                    :key="idxSub"
                    class="flex"
                  >
                    <div class="flex-shrink-0">
                      <div
                        class="flex items-center justify-center h-6 w-6 rounded-full bg-theme-600 text-white"
                      >
                        <!-- Heroicon name: annotation -->
                        <svg
                          class="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4">
                      <dt class="text-lg leading-6 font-medium text-primary">
                        {{ subfeature.title }}
                      </dt>
                      <dd class="mt-2 text-base text-gray-500">
                        {{ subfeature.description }}
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>

              <div class="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
                <svg
                  class="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
                  width="784"
                  height="404"
                  fill="none"
                  viewBox="0 0 784 404"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="e80155a9-dfde-425a-b5ea-1f6fadd20131"
                      x="0"
                      y="0"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <rect
                        x="0"
                        y="0"
                        width="4"
                        height="4"
                        class="text-gray-200 dark:text-black"
                        fill="currentColor"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width="784"
                    height="404"
                    fill="url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)"
                  />
                </svg>
                <img
                  class="relative mx-auto rounded-xl shadow-xl"
                  width="550"
                  v-lazy="feature.image"
                  :alt="feature.headline"
                />
              </div>
            </div>
          </div>

          <svg
            v-if="idx === 0"
            class="hidden lg:block absolute right-full transform translate-x-1/2 translate-y-12"
            width="404"
            height="784"
            fill="none"
            viewBox="0 0 404 784"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  class="text-gray-200 dark:text-black"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="404"
              height="784"
              fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueLazyload from "vue-lazyload";

const img1 = "https://yahooder.sirv.com/netcoresaas/6-clean-dark.jpg";
const img2 = "https://yahooder.sirv.com/netcoresaas/7-tests.jpg";
const img3 = "https://yahooder.sirv.com/netcoresaas/3-workspaces.jpg";
const img4 = "https://yahooder.sirv.com/netcoresaas/Multi-tenant.png";
const img5 = "https://yahooder.sirv.com/netcoresaas/4-multi-theme.jpg";
const img6 = "https://yahooder.sirv.com/netcoresaas/5-language.jpg";
const img7 = "https://yahooder.sirv.com/netcoresaas/8-db.png";
const img8 = "https://yahooder.sirv.com/netcoresaas/2-dashboard.jpg";
const img9 = "https://yahooder.sirv.com/netcoresaas/1-pricing.jpg";
const img10 = "https://yahooder.sirv.com/netcoresaas/9-resources.jpg";

Vue.use(VueLazyload, {
  // set observer to true
  observer: true,
  // optional
  observerOptions: {
    rootMargin: "0px",
    threshold: 0.1
  }
});

export default {
  components: {},
  data() {
    return {
      features: [
        {
          headline: this.$t("marketing.features.feature1.headline"),
          subheadline: this.$t("marketing.features.feature1.subheadline"),
          image: img1,
          features: [
            {
              title: this.$t("marketing.features.feature1.feature1"),
              description: this.$t(
                "marketing.features.feature1.feature1Description"
              )
            },
            {
              title: this.$t("marketing.features.feature1.feature2"),
              description: this.$t(
                "marketing.features.feature1.feature2Description"
              )
            },
            {
              title: this.$t("marketing.features.feature1.feature3"),
              description: this.$t(
                "marketing.features.feature1.feature3Description"
              )
            }
          ]
        },
        {
          headline: this.$t("marketing.features.feature2.headline"),
          subheadline: this.$t("marketing.features.feature2.subheadline"),
          image: img2,
          features: [
            {
              title: this.$t("marketing.features.feature2.feature1"),
              description: this.$t(
                "marketing.features.feature2.feature1Description"
              )
            },
            {
              title: this.$t("marketing.features.feature2.feature2"),
              description: this.$t(
                "marketing.features.feature2.feature2Description"
              )
            },
            {
              title: this.$t("marketing.features.feature2.feature3"),
              description: this.$t(
                "marketing.features.feature2.feature3Description"
              )
            }
          ]
        },
        {
          headline: this.$t("marketing.features.feature3.headline"),
          subheadline: this.$t("marketing.features.feature3.subheadline"),
          image: img3,
          features: [
            {
              title: this.$t("marketing.features.feature3.feature1"),
              description: this.$t(
                "marketing.features.feature3.feature1Description"
              )
            },
            {
              title: this.$t("marketing.features.feature3.feature2"),
              description: this.$t(
                "marketing.features.feature3.feature2Description"
              )
            },
            {
              title: this.$t("marketing.features.feature3.feature3"),
              description: this.$t(
                "marketing.features.feature3.feature3Description"
              )
            }
          ]
        },
        {
          headline: this.$t("marketing.features.feature4.headline"),
          subheadline: this.$t("marketing.features.feature4.subheadline"),
          image: img4,
          features: [
            {
              title: this.$t("marketing.features.feature4.feature1"),
              description: this.$t(
                "marketing.features.feature4.feature1Description"
              )
            },
            {
              title: this.$t("marketing.features.feature4.feature2"),
              description: this.$t(
                "marketing.features.feature4.feature2Description"
              )
            }
          ]
        },
        {
          headline: this.$t("marketing.features.feature5.headline"),
          subheadline: this.$t("marketing.features.feature5.subheadline"),
          image: img5,
          features: [
            {
              title: this.$t("marketing.features.feature5.feature1"),
              description: this.$t(
                "marketing.features.feature5.feature1Description"
              )
            },
            {
              title: this.$t("marketing.features.feature5.feature2"),
              description: this.$t(
                "marketing.features.feature5.feature2Description"
              )
            }
          ]
        },
        {
          headline: this.$t("marketing.features.feature6.headline"),
          subheadline: this.$t("marketing.features.feature6.subheadline"),
          image: img6,
          features: [
            {
              title: this.$t("marketing.features.feature6.feature1"),
              description: this.$t(
                "marketing.features.feature6.feature1Description"
              )
            },
            {
              title: this.$t("marketing.features.feature6.feature2"),
              description: this.$t(
                "marketing.features.feature6.feature2Description"
              )
            }
          ]
        },
        {
          headline: this.$t("marketing.features.feature7.headline"),
          subheadline: this.$t("marketing.features.feature7.subheadline"),
          image: img7,
          features: [
            {
              title: this.$t("marketing.features.feature7.feature1"),
              description: this.$t(
                "marketing.features.feature7.feature1Description"
              )
            },
            {
              title: this.$t("marketing.features.feature7.feature2"),
              description: this.$t(
                "marketing.features.feature7.feature2Description"
              )
            }
          ]
        },
        {
          headline: this.$t("marketing.features.feature8.headline"),
          subheadline: this.$t("marketing.features.feature8.subheadline"),
          image: img8,
          features: [
            {
              title: this.$t("marketing.features.feature8.feature1"),
              description: this.$t(
                "marketing.features.feature8.feature1Description"
              )
            },
            {
              title: this.$t("marketing.features.feature8.feature2"),
              description: this.$t(
                "marketing.features.feature8.feature2Description"
              )
            },
            {
              title: this.$t("marketing.features.feature8.feature3"),
              description: this.$t(
                "marketing.features.feature8.feature3Description"
              )
            }
          ]
        },
        {
          headline: this.$t("marketing.features.feature9.headline"),
          subheadline: this.$t("marketing.features.feature9.subheadline"),
          image: img9,
          features: [
            {
              title: this.$t("marketing.features.feature9.feature1"),
              description: this.$t(
                "marketing.features.feature9.feature1Description"
              )
            },
            {
              title: this.$t("marketing.features.feature9.feature2"),
              description: this.$t(
                "marketing.features.feature9.feature2Description"
              )
            },
            {
              title: this.$t("marketing.features.feature9.feature3"),
              description: this.$t(
                "marketing.features.feature9.feature3Description"
              )
            }
          ]
        },
        {
          headline: this.$t("marketing.features.feature10.headline"),
          subheadline: this.$t("marketing.features.feature10.subheadline"),
          image: img10,
          features: [
            {
              title: this.$t("marketing.features.feature10.feature1"),
              description: this.$t(
                "marketing.features.feature10.feature1Description"
              )
            },
            {
              title: this.$t("marketing.features.feature10.feature2"),
              description: this.$t(
                "marketing.features.feature10.feature2Description"
              )
            },
            {
              title: this.$t("marketing.features.feature10.feature3"),
              description: this.$t(
                "marketing.features.feature10.feature3Description"
              )
            }
          ]
        }
      ]
    };
  }
};
</script>
