<template>
  <div class="pt-2 pb-40 md:py-6 mx-auto px-4 sm:px-6 md:px-8">
    <div class="md:grid lg:grid-cols-3 md:gap-2">
      <div class="md:col-span-1">
        <div class="sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            {{ $t("settings.tenant.general") }}
          </h3>
          <p class="mt-1 text-xs leading-5 text-gray-600">
            {{ $t("settings.tenant.generalDescription") }}
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form @submit.prevent="updateTenant()" method="POST">
          <div class="shadow overflow-hidden sm:rounded-sm">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-2">
                <div class="col-span-6 sm:col-span-6">
                  <label
                    for="name"
                    class="block text-sm font-medium leading-5 text-gray-700"
                    >{{ $t("shared.name") }}</label
                  >
                  <input
                    v-model="tenant.name"
                    required
                    id="name"
                    class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>

                <!-- <div class="col-span-6 sm:col-span-3">
                  <label
                    for="subdomain"
                    class="block text-sm font-medium leading-5 text-gray-700"
                    >{{ $t("settings.tenant.subdomain") }}</label
                  >
                  <input
                    v-model="tenant.subdomain"
                    required
                    id="subdomain"
                    class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div> -->
                <div v-if="false" class="col-span-6 sm:col-span-3 text-left">
                  <label
                    for="appTheme"
                    class="block text-sm font-medium leading-5 text-gray-700"
                    >{{ $t("shared.theme") }}</label
                  >
                  <div class="rounded-sm">
                    <select
                      v-model="tenant.appTheme"
                      @change="
                        $store.commit('theme/appTheme', $event.target.value)
                      "
                      required
                      id="appTheme"
                      class="w-full border border-gray-300 py-2 focus:outline-none text-gray-700 focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    >
                      <option
                        v-for="(appTheme, idx) in appThemes"
                        :key="idx"
                        :value="appTheme.theme"
                        :selected="tenant.appTheme === appTheme.theme"
                      >
                        {{ appTheme.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div v-if="false" class="col-span-6 sm:col-span-3">
                  <label
                    for="appColor"
                    class="block text-sm font-medium leading-5 text-gray-700"
                    >Color</label
                  >
                  <div class="rounded-sm">
                    <select
                      v-model="tenant.appColor"
                      @change="
                        $store.commit('theme/appColor', $event.target.value)
                      "
                      required
                      id="appColor"
                      class="w-full py-2 border border-gray-300 focus:outline-none text-gray-700 focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    >
                      <option
                        v-for="(appColor, idx) in appColors"
                        :key="idx"
                        :value="appColor.theme"
                        :selected="tenant.appColor === appColor.theme"
                        :class="
                          'text-' +
                          appColor.theme.replace('theme-', '') +
                          '-600'
                        "
                      >
                        {{ appColor.name }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="col-span-6 sm:col-span-6">
                  <label
                    for="photo"
                    class="block text-sm leading-5 font-medium text-gray-700"
                    >{{ $t("shared.icon") }}</label
                  >
                  <div class="mt-2 flex items-center">
                    <span
                      class="h-12 w-12 rounded-sm overflow-hidden bg-gray-100"
                    >
                      <img id="photo" v-if="tenantIcon" :src="tenantIcon"  alt="Tenant icon"/>
                      <svg
                        v-else
                        class="h-full w-full text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </span>
                    <span class="ml-5 rounded-sm shadow-sm">
                      <button
                        @click="uploadImage('icon')"
                        type="button"
                        class="py-2 px-3 border border-gray-300 rounded-sm text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                      >
                        {{ $t("shared.upload") }}
                      </button>
                    </span>
                    <span v-if="tenantIcon" class="ml-2 rounded-sm shadow-sm">
                      <button
                        @click="deleteImage('icon')"
                        type="button"
                        class="py-2 px-3 border bg-rose-50 border-gray-300 rounded-sm text-sm leading-4 font-medium text-red-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                      >
                        {{ $t("shared.delete") }}
                      </button>
                    </span>
                  </div>
                </div>

                <div class="col-span-6 sm:col-span-6">
                  <label
                    for="photo"
                    class="block text-sm leading-5 font-medium text-gray-700"
                    >{{ $t("shared.logo") }}</label
                  >
                  <div v-if="tenantLogo" class="mt-2 flex items-center">
                    <span
                      class="h-auto w-30 overflow-hidden bg-gray-100 border border-gray-300 p-5 rounded-sm shadow-md"
                    >
                      <img :src="tenantLogo"  alt="Tenant logo"/>
                    </span>
                  </div>
                  <span class="mt-2 rounded-sm shadow-sm">
                    <button
                      @click="uploadImage('logo')"
                      type="button"
                      class="py-2 px-3 border border-gray-300 rounded-sm text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                    >
                      {{ $t("shared.upload") }}
                    </button>
                  </span>
                  <span v-if="tenantLogo" class="ml-2 rounded-sm shadow-sm">
                    <button
                      @click="deleteImage('logo')"
                      type="button"
                      class="mt-2 py-2 px-3 border bg-rose-50 border-gray-300 rounded-sm text-sm leading-4 font-medium text-red-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                    >
                      {{ $t("shared.delete") }}
                    </button>
                  </span>
                </div>

                <div class="col-span-6 sm:col-span-6">
                  <label
                    for="photo"
                    class="block text-sm leading-5 font-medium text-gray-700"
                    >{{ $t("shared.logoDarkmode") }}</label
                  >
                  <div v-if="tenantLogoDarkMode" class="mt-2 flex items-center">
                    <span
                      class="h-auto w-30 overflow-hidden bg-gray-800 border border-gray-300 p-5 rounded-sm shadow-md"
                    >
                      <img :src="tenantLogoDarkMode" alt="Tenant logo" />
                    </span>
                  </div>
                  <span class="mt-3 rounded-sm shadow-sm">
                    <button
                      @click="uploadImage('logoDarkmode')"
                      type="button"
                      class="mt-2 py-2 px-3 border border-gray-300 rounded-sm text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                    >
                      {{ $t("shared.upload") }}
                    </button>
                  </span>
                  <span
                    v-if="tenantLogoDarkMode"
                    class="ml-2 rounded-sm shadow-sm"
                  >
                    <button
                      @click="deleteImage('logoDarkmode')"
                      type="button"
                      class="mt-2 py-2 px-3 border bg-rose-50 border-gray-300 rounded-sm text-sm leading-4 font-medium text-red-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                    >
                      {{ $t("shared.delete") }}
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                class="ml-1 h-8 inline-flex items-center px-4 py-2 text-xs leading-5 font-medium rounded-sm text-white bg-gray-800 hover:bg-gray-700 focus:outline-shadow active:bg-indigo-900 transition duration-150 ease-in-out"
              >
                {{ $t("shared.save") }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <upload-image
      v-if="showUploadImage && !uploadingImage"
      v-on:close="showUploadImage = false"
      :title="$t('shared.' + imageType)"
      :image="imageCurrent"
      v-on:loaded="loadedImage"
    ></upload-image>
    <success-modal ref="successModal"></success-modal>
    <error-modal ref="errorModal"></error-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../../components/shared/BaseComponent.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import UploadImage from "@/components/shared/forms/UploadImage.vue";
import Toggle from "@/components/shared/forms/Toggle.vue";
import { appThemes, appColors } from "@/store/modules/theme/themes";
import { TenantUpdateImageRequest } from "@/application/contracts/master/tenants/TenantUpdateImageRequest";
import { mapGetters } from "vuex";
import { TenantDto } from "@/application/dtos/master/tenants/TenantDto";
import ErrorModalComponent from "@/components/shared/modals/NewErrorModal.vue";
import SuccessModalComponent from "@/components/shared/modals/SuccessModal.vue";

@Component({
  components: { SuccessModal, ErrorModal, UploadImage, Toggle },
  computed: {
    ...mapGetters("theme", {
      appTheme: "appTheme",
      appColor: "appColor",
    }),
  },
})
export default class TenantSettingsComponent extends BaseComponent {
  $refs!: {
    errorModal: ErrorModalComponent;
    successModal: SuccessModalComponent;
  };
  imageType: string = "";
  imageCurrent: string = "";
  tenant = {} as TenantDto;
  showUploadImage = false;
  uploadingImage: boolean = false;
  appThemes = appThemes;
  appColors = appColors;
  appTheme!: string;
  appColor!: string;
  created() {
    this.getCurrentTenantInForm();
  }
  getCurrentTenantInForm() {
    this.tenant.name = this.$store.state.tenant.current.name;
    this.tenant.subdomain = this.$store.state.tenant.current.subdomain;
    this.tenant.domain = this.$store.state.tenant.current.domain;
    this.tenant.appTheme = this.appTheme;
    this.tenant.appColor = this.appColor;
  }
  updateTenant() {
    this.services.tenants
      .update(this.tenant)
      .then(() => {
        this.services.tenants.getAll().then(() => {
          this.getCurrentTenantInForm();
        });

        this.$refs.successModal.show(this.$t("settings.tenant.updated"));
      })
      .catch((error) => {
        this.$refs.errorModal.show(error);
      });
  }
  uploadImage(type) {
    this.imageType = type;
    if (type === "icon") {
      this.imageCurrent = this.tenantIcon;
    } else if (type === "logo") {
      this.imageCurrent = this.tenantLogo;
    } else if (type === "logoDarkmode") {
      this.imageCurrent = this.tenantLogoDarkMode;
    }
    this.showUploadImage = true;
  }
  deleteImage(type) {
    this.imageType = type;
    this.loadedImage(null);
  }
  loadedImage(image) {
    const payload: TenantUpdateImageRequest = {
      type: this.imageType,
      logo: this.imageType === "logo" ? image : "",
      icon: this.imageType === "icon" ? image : "",
      logoDarkmode: this.imageType === "logoDarkmode" ? image : "",
    };
    payload.type = this.imageType;
    this.uploadingImage = true;
    this.services.tenants
      .updateImage(payload)
      .then(() => {
        this.$store.commit("tenant/currentImage", {
          imageType: this.imageType,
          image,
        });
        this.showUploadImage = false;
      })
      .catch((error) => {
        console.error("Error: " + error);
      })
      .finally(() => {
        this.uploadingImage = false;
      });
  }
  get tenantIcon() {
    return this.$store.state.tenant.current.icon;
  }
  get tenantLogo() {
    return this.$store.state.tenant.current.logo;
  }
  get tenantLogoDarkMode() {
    return this.$store.state.tenant.current.logoDarkmode;
  }
}
</script>
