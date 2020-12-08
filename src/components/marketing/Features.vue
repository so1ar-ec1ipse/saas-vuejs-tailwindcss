<template>
  <div>
    <div v-if="false" class="p-6">
      <div class="relative">
        <h3
          class="text-center text-3xl leading-8 font-extrabold tracking-tight text-primary sm:text-4xl sm:leading-10"
        >
          {{ $t("marketing.features.headline") }}
        </h3>
      </div>
      <div class>
        <div class="max-w-screen-xl mx-auto py-6 px-4 sm:px-6 lg:px-8 mt-2">
          <div class="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-3">
            <div
              class="col-span-1 flex justify-center md:col-span-1 lg:col-span-1"
            >
              <img
                class="h-16 transition duration-500 ease-in-out bg transform hover:-translate-y-1 hover:scale-110"
                v-lazy="imgNetCore"
                alt="NET Core"
              />
            </div>
            <div
              class="col-span-1 flex justify-center md:col-span-1 lg:col-span-1"
            >
              <img
                class="h-16 transition duration-500 ease-in-out bg transform hover:-translate-y-1 hover:scale-110"
                v-lazy="imgVueJS"
                alt="VueJS"
              />
            </div>
            <div
              class="col-span-3 flex justify-center md:col-span-1 lg:col-span-1"
            >
              <img
                class="h-16 transition duration-500 ease-in-out bg transform hover:-translate-y-1 hover:scale-110"
                v-lazy="imgTailwindCSS"
                alt="TailwindCSS"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="py-4 bg-primary overflow-hidden lg:py-8">
      <div
        class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl"
      >
        <!-- Feature 1 -->
        <div
          class="relative mt-12 lg:mt-12 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center"
        >
          <div class="relative">
            <h4
              class="text-2xl leading-8 font-extrabold text-primary tracking-tight sm:text-3xl sm:leading-9"
            >
              {{ $t("marketing.features.feature7.headline") }}
            </h4>
            <p class="mt-3 text-lg leading-7 text-gray-500">
              {{ $t("marketing.features.feature7.subheadline") }}
            </p>

            <ul class="mt-10">
              <li>
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div
                      class="flex items-center justify-center h-6 w-6 rounded-sm bg-teal-500 text-white"
                    >
                      <i class="fa fa-check"></i>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h5 class="text-lg leading-6 font-medium text-primary">
                      {{ $t("marketing.features.feature7.feature1") }}
                    </h5>
                    <p class="mt-2 text-base leading-6 text-gray-500">
                      {{
                        $t("marketing.features.feature7.feature1Description")
                      }}
                    </p>
                  </div>
                </div>
              </li>
              <li class="mt-10">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div
                      class="flex items-center justify-center h-6 w-6 rounded-sm bg-teal-500 text-white"
                    >
                      <i class="fa fa-check"></i>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h5 class="text-lg leading-6 font-medium text-primary">
                      {{ $t("marketing.features.feature7.feature2") }}
                    </h5>
                    <p class="mt-2 text-base leading-6 text-gray-500">
                      {{
                        $t("marketing.features.feature7.feature2Description")
                      }}
                    </p>
                  </div>
                </div>
              </li>
              <li class="mt-10">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div
                      class="flex items-center justify-center h-6 w-6 rounded-sm bg-teal-500 text-white"
                    >
                      <i class="fa fa-check"></i>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h5 class="text-lg leading-6 font-medium text-primary">
                      {{ $t("marketing.features.feature7.feature3") }}
                    </h5>
                    <p class="mt-2 text-base leading-6 text-gray-500">
                      {{
                        $t("marketing.features.feature7.feature3Description")
                      }}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="mt-10 -mx-4 relative lg:mt-0">
            <img
              v-if="$store.state.theme.marketingTheme === 'theme-bg-light'"
              class="shadow-lg relative mx-auto rounded-lg transition duration-500 ease-in-out bg transform hover:-translate-y-1 hover:scale-105"
              width="600"
              v-lazy="imgCleanArchitectureLight"
              alt="Member management"
            />
            <img
              v-else
              class="shadow-lg relative mx-auto rounded-lg transition duration-500 ease-in-out bg transform hover:-translate-y-1 hover:scale-105"
              width="600"
              v-lazy="imgCleanArchitectureDark"
              alt="Member management"
            />
          </div>
        </div>
        <!-- Feature 2 -->
        <div class="relative mt-12 sm:mt-16 lg:mt-24">
          <div
            class="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center"
          >
            <div class="lg:col-start-2">
              <h4
                class="text-2xl leading-8 font-extrabold text-primary tracking-tight sm:text-3xl sm:leading-9"
              >
                {{ $t("marketing.features.feature8.headline") }}
              </h4>
              <p class="mt-3 text-lg leading-7 text-gray-500">
                {{ $t("marketing.features.feature8.subheadline") }}
              </p>
              <ul class="mt-10">
                <li>
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <div
                        class="flex items-center justify-center h-6 w-6 rounded-sm bg-teal-500 text-white"
                      >
                        <i class="fa fa-check"></i>
                      </div>
                    </div>
                    <div class="ml-4">
                      <h5 class="text-lg leading-6 font-medium text-primary">
                        {{ $t("marketing.features.feature8.feature1") }}
                      </h5>
                      <p class="mt-2 text-base leading-6 text-gray-500">
                        {{
                          $t("marketing.features.feature8.feature1Description")
                        }}
                      </p>
                    </div>
                  </div>
                </li>
                <li class="mt-10">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <div
                        class="flex items-center justify-center h-6 w-6 rounded-sm bg-teal-500 text-white"
                      >
                        <i class="fa fa-check"></i>
                      </div>
                    </div>
                    <div class="ml-4">
                      <h5 class="text-lg leading-6 font-medium text-primary">
                        {{ $t("marketing.features.feature8.feature2") }}
                      </h5>
                      <p class="mt-2 text-base leading-6 text-gray-500">
                        {{
                          $t("marketing.features.feature8.feature2Description")
                        }}
                      </p>
                    </div>
                  </div>
                </li>
                <li class="mt-10">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <div
                        class="flex items-center justify-center h-6 w-6 rounded-sm bg-teal-500 text-white"
                      >
                        <i class="fa fa-check"></i>
                      </div>
                    </div>
                    <div class="ml-4">
                      <h5 class="text-lg leading-6 font-medium text-primary">
                        {{ $t("marketing.features.feature8.feature3") }}
                      </h5>
                      <p class="mt-2 text-base leading-6 text-gray-500">
                        {{
                          $t("marketing.features.feature8.feature3Description")
                        }}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div class="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
              <img
                class="shadow-lg relative mx-auto rounded-lg transition duration-500 ease-in-out bg transform hover:-translate-y-1 hover:scale-105"
                width="490"
                v-lazy="imgIntegrationTests"
                alt="Multi tenant"
              />
            </div>
          </div>
        </div>

        <!-- Feature 1 -->
        <div
          class="relative mt-12 lg:mt-12 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center"
        >
          <div class="relative">
            <h4
              class="text-2xl leading-8 font-extrabold text-primary tracking-tight sm:text-3xl sm:leading-9"
            >
              {{ $t("marketing.features.feature1.headline") }}
            </h4>
            <p class="mt-3 text-lg leading-7 text-gray-500">
              {{ $t("marketing.features.feature1.subheadline") }}
            </p>

            <ul class="mt-10">
              <li>
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div
                      class="flex items-center justify-center h-6 w-6 rounded-sm bg-teal-500 text-white"
                    >
                      <i class="fa fa-check"></i>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h5 class="text-lg leading-6 font-medium text-primary">
                      {{ $t("marketing.features.feature1.feature1") }}
                    </h5>
                    <p class="mt-2 text-base leading-6 text-gray-500">
                      {{
                        $t("marketing.features.feature1.feature1Description")
                      }}
                    </p>
                  </div>
                </div>
              </li>
              <li class="mt-10">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div
                      class="flex items-center justify-center h-6 w-6 rounded-sm bg-teal-500 text-white"
                    >
                      <i class="fa fa-check"></i>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h5 class="text-lg leading-6 font-medium text-primary">
                      {{ $t("marketing.features.feature1.feature2") }}
                    </h5>
                    <p class="mt-2 text-base leading-6 text-gray-500">
                      {{
                        $t("marketing.features.feature1.feature2Description")
                      }}
                    </p>
                  </div>
                </div>
              </li>
              <li class="mt-10">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div
                      class="flex items-center justify-center h-6 w-6 rounded-sm bg-teal-500 text-white"
                    >
                      <i class="fa fa-check"></i>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h5 class="text-lg leading-6 font-medium text-primary">
                      {{ $t("marketing.features.feature1.feature3") }}
                    </h5>
                    <p class="mt-2 text-base leading-6 text-gray-500">
                      {{
                        $t("marketing.features.feature1.feature3Description")
                      }}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="mt-10 -mx-4 relative lg:mt-0">
            <img
              class="shadow-lg relative mx-auto rounded-lg transition duration-500 ease-in-out bg transform hover:-translate-y-1 hover:scale-105"
              width="600"
              v-lazy="imgMemberManagement"
              alt="Member management"
            />
          </div>
        </div>
        <!-- Feature 2 -->
        <div class="relative mt-12 sm:mt-16 lg:mt-24">
          <div
            class="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center"
          >
            <div class="lg:col-start-2">
              <h4
                class="text-2xl leading-8 font-extrabold text-primary tracking-tight sm:text-3xl sm:leading-9"
              >
                {{ $t("marketing.features.feature2.headline") }}
              </h4>
              <p class="mt-3 text-lg leading-7 text-gray-500">
                {{ $t("marketing.features.feature2.subheadline") }}
              </p>
              <ul class="mt-10">
                <li>
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <div
                        class="flex items-center justify-center h-6 w-6 rounded-sm bg-teal-500 text-white"
                      >
                        <i class="fa fa-check"></i>
                      </div>
                    </div>
                    <div class="ml-4">
                      <h5 class="text-lg leading-6 font-medium text-primary">
                        {{ $t("marketing.features.feature2.feature1") }}
                      </h5>
                      <p class="mt-2 text-base leading-6 text-gray-500">
                        {{
                          $t("marketing.features.feature2.feature1Description")
                        }}
                      </p>
                    </div>
                  </div>
                </li>
                <li class="mt-10">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <div
                        class="flex items-center justify-center h-6 w-6 rounded-sm bg-teal-500 text-white"
                      >
                        <i class="fa fa-check"></i>
                      </div>
                    </div>
                    <div class="ml-4">
                      <h5 class="text-lg leading-6 font-medium text-primary">
                        {{ $t("marketing.features.feature2.feature2") }}
                      </h5>
                      <p class="mt-2 text-base leading-6 text-gray-500">
                        {{
                          $t("marketing.features.feature2.feature2Description")
                        }}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div class="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
              <img
                class=" shadow-lg relative mx-auto rounded-lg transition duration-500 ease-in-out bg transform hover:-translate-y-1 hover:scale-105"
                width="490"
                v-lazy="imgMultiTenant"
                alt="Multi tenant"
              />
            </div>
          </div>
        </div>
        <!-- Feature 3 -->
        <div
          class="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center"
        >
          <div class="relative">
            <h4
              class="text-2xl leading-8 font-extrabold text-primary tracking-tight sm:text-3xl sm:leading-9"
            >
              {{ $t("marketing.features.feature3.headline") }}
            </h4>
            <p class="mt-3 text-lg leading-7 text-gray-500">
              {{ $t("marketing.features.feature3.subheadline") }}
            </p>

            <ul class="mt-10">
              <li>
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div
                      class="flex items-center justify-center h-6 w-6 rounded-sm bg-teal-500 text-white"
                    >
                      <i class="fa fa-check"></i>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h5 class="text-lg leading-6 font-medium text-primary">
                      {{ $t("marketing.features.feature3.feature1") }}
                    </h5>
                    <p class="mt-2 text-base leading-6 text-gray-500">
                      {{
                        $t("marketing.features.feature3.feature1Description")
                      }}
                    </p>
                  </div>
                </div>
              </li>
              <li class="mt-10">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div
                      class="flex items-center justify-center h-6 w-6 rounded-sm bg-teal-500 text-white"
                    >
                      <i class="fa fa-check"></i>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h5 class="text-lg leading-6 font-medium text-primary">
                      {{ $t("marketing.features.feature3.feature2") }}
                    </h5>
                    <p class="mt-2 text-base leading-6 text-gray-500">
                      {{
                        $t("marketing.features.feature3.feature2Description")
                      }}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="mt-10 -mx-4 relative lg:mt-0">
            <img
              class="shadow-lg relative mx-auto rounded-lg transition duration-500 ease-in-out bg transform hover:-translate-y-1 hover:scale-105"
              width="490"
              v-lazy="imgMultiTheme"
              alt="Multi theme"
            />
          </div>
        </div>
        <!-- Feature 4 -->
        <div class="relative mt-12 sm:mt-16 lg:mt-24">
          <div
            class="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center"
          >
            <div class="lg:col-start-2">
              <h4
                class="text-2xl leading-8 font-extrabold text-primary tracking-tight sm:text-3xl sm:leading-9"
              >
                {{ $t("marketing.features.feature4.headline") }}
              </h4>
              <p class="mt-3 text-lg leading-7 text-gray-500">
                {{ $t("marketing.features.feature4.subheadline") }}
              </p>
              <ul class="mt-10">
                <li>
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <div
                        class="flex items-center justify-center h-6 w-6 rounded-sm bg-teal-500 text-white"
                      >
                        <i class="fa fa-check"></i>
                      </div>
                    </div>
                    <div class="ml-4">
                      <h5 class="text-lg leading-6 font-medium text-primary">
                        {{ $t("marketing.features.feature4.feature1") }}
                      </h5>
                      <p class="mt-2 text-base leading-6 text-gray-500">
                        {{
                          $t("marketing.features.feature4.feature1Description")
                        }}
                      </p>
                    </div>
                  </div>
                </li>
                <li class="mt-10">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <div
                        class="flex items-center justify-center h-6 w-6 rounded-sm bg-teal-500 text-white"
                      >
                        <i class="fa fa-check"></i>
                      </div>
                    </div>
                    <div class="ml-4">
                      <h5 class="text-lg leading-6 font-medium text-primary">
                        {{ $t("marketing.features.feature4.feature2") }}
                      </h5>
                      <p class="mt-2 text-base leading-6 text-gray-500">
                        {{
                          $t("marketing.features.feature4.feature2Description")
                        }}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div class="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
              <img
                class="shadow-lg relative mx-auto rounded-lg transition duration-500 ease-in-out bg transform hover:-translate-y-1 hover:scale-105"
                width="490"
                v-lazy="imgMultiLanguage"
                alt="Multi language"
              />
            </div>
          </div>
        </div>
        <!-- Feature 5 -->
        <div
          class="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center"
        >
          <div class="relative">
            <h4
              class="text-2xl leading-8 font-extrabold text-primary tracking-tight sm:text-3xl sm:leading-9"
            >
              {{ $t("marketing.features.feature5.headline") }}
            </h4>
            <p class="mt-3 text-lg leading-7 text-gray-500">
              {{ $t("marketing.features.feature5.subheadline") }}
            </p>

            <ul class="mt-10">
              <li>
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div
                      class="flex items-center justify-center h-6 w-6 rounded-sm bg-teal-500 text-white"
                    >
                      <i class="fa fa-check"></i>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h5 class="text-lg leading-6 font-medium text-primary">
                      {{ $t("marketing.features.feature5.feature1") }}
                    </h5>
                    <p class="mt-2 text-base leading-6 text-gray-500">
                      {{
                        $t("marketing.features.feature5.feature1Description")
                      }}
                    </p>
                  </div>
                </div>
              </li>
              <li class="mt-10">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div
                      class="flex items-center justify-center h-6 w-6 rounded-sm bg-teal-500 text-white"
                    >
                      <i class="fa fa-check"></i>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h5 class="text-lg leading-6 font-medium text-primary">
                      {{ $t("marketing.features.feature5.feature2") }}
                    </h5>
                    <p class="mt-2 text-base leading-6 text-gray-500">
                      {{
                        $t("marketing.features.feature5.feature2Description")
                      }}
                    </p>
                  </div>
                </div>
              </li>
              <li class="mt-10">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div
                      class="flex items-center justify-center h-6 w-6 rounded-sm bg-teal-500 text-white"
                    >
                      <i class="fa fa-check"></i>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h5 class="text-lg leading-6 font-medium text-primary">
                      {{ $t("marketing.features.feature5.feature3") }}
                    </h5>
                    <p class="mt-2 text-base leading-6 text-gray-500">
                      {{
                        $t("marketing.features.feature5.feature3Description")
                      }}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="mt-10 -mx-4 relative lg:mt-0">
            <img
              class="shadow-lg relative mx-auto rounded-lg transition duration-500 ease-in-out bg transform hover:-translate-y-1 hover:scale-105"
              width="490"
              v-lazy="imgMultiDB"
              alt="Multi database"
            />
          </div>
        </div>
        <!-- Feature 4 -->
        <div class="relative mt-12 sm:mt-16 lg:mt-24">
          <div
            class="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center"
          >
            <div class="lg:col-start-2">
              <h4
                class="text-2xl leading-8 font-extrabold text-primary tracking-tight sm:text-3xl sm:leading-9"
              >
                {{ $t("marketing.features.feature6.headline") }}
              </h4>
              <p class="mt-3 text-lg leading-7 text-gray-500">
                {{ $t("marketing.features.feature6.subheadline") }}
              </p>
              <ul class="mt-10">
                <li>
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <div
                        class="flex items-center justify-center h-6 w-6 rounded-sm bg-teal-500 text-white"
                      >
                        <i class="fa fa-check"></i>
                      </div>
                    </div>
                    <div class="ml-4">
                      <h5 class="text-lg leading-6 font-medium text-primary">
                        {{ $t("marketing.features.feature6.feature1") }}
                      </h5>
                      <p class="mt-2 text-base leading-6 text-gray-500">
                        {{
                          $t("marketing.features.feature6.feature1Description")
                        }}
                      </p>
                    </div>
                  </div>
                </li>
                <li class="mt-10">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <div
                        class="flex items-center justify-center h-6 w-6 rounded-sm bg-teal-500 text-white"
                      >
                        <i class="fa fa-check"></i>
                      </div>
                    </div>
                    <div class="ml-4">
                      <h5 class="text-lg leading-6 font-medium text-primary">
                        {{ $t("marketing.features.feature6.feature2") }}
                      </h5>
                      <p class="mt-2 text-base leading-6 text-gray-500">
                        {{
                          $t("marketing.features.feature6.feature2Description")
                        }}
                      </p>
                    </div>
                  </div>
                </li>
                <li class="mt-10">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <div
                        class="flex items-center justify-center h-6 w-6 rounded-sm bg-teal-500 text-white"
                      >
                        <i class="fa fa-check"></i>
                      </div>
                    </div>
                    <div class="ml-4">
                      <h5 class="text-lg leading-6 font-medium text-primary">
                        {{ $t("marketing.features.feature6.feature3") }}
                      </h5>
                      <p class="mt-2 text-base leading-6 text-gray-500">
                        {{
                          $t("marketing.features.feature6.feature3Description")
                        }}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div class="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
              <img
                class="shadow-lg relative mx-auto rounded-lg transition duration-500 ease-in-out bg transform hover:-translate-y-1 hover:scale-105"
                width="600"
                v-lazy="imgResources"
                alt="Resources"
              />
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
    return {
      videoId: "vN61u8MryHU",
      imgNetCore:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/.NET_Core_Logo.svg/1200px-.NET_Core_Logo.svg.png",
      imgVueJS:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1184px-Vue.js_Logo_2.svg.png",
      imgTailwindCSS:
        "https://seeklogo.com/images/T/tailwind-css-logo-5AD4175897-seeklogo.com.png",
      imgMemberManagement: "https://i.ibb.co/zZs1G4Z/Member-management.png",
      imgMultiTenant: "https://i.ibb.co/NnBVLNR/Multi-tenant.png",
      imgMultiTheme: "https://i.ibb.co/GcdGMV3/Multi-theme.png",
      imgMultiLanguage: "https://i.ibb.co/2NzQV10/Multi-language.png",
      imgMultiDB: "https://i.ibb.co/RbzQ2Y9/Multi-db.png",
      imgResources: "https://i.ibb.co/cDZn1fj/Resources.png",
      imgCleanArchitectureDark:
        "https://i.ibb.co/NS8xMjZ/NETCORESAAS-v1-3-0-4.png",
      imgCleanArchitectureLight:
        "https://i.ibb.co/qRYcH6x/NETCORESAAS-v1-3-0-5.png",
      imgIntegrationTests: "https://i.ibb.co/WcMPvLw/image.png",
    };
  },
};
</script>
