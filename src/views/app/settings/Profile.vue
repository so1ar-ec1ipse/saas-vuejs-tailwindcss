<template>
  <div class="pt-2 pb-40 md:py-6 mx-auto px-4 sm:px-6 md:px-8">
    <div
      v-if="false"
      class="flex items-center justify-between bg-white -m-4 sm:-m-8 p-8 pb-4 shadow-lg mb-4"
    >
      <div class="flex-1 min-w-0">
        <h2
          class="flex text-2xl font-bold leading-9 text-gray-800 sm:text-3xl sm:leading-9 sm:truncate"
        >
          {{ $t("settings.profile.profileTitle") }}
        </h2>
      </div>
    </div>
    <div class=" ">
      <!-- Profile -->
      <div class="md:grid lg:grid-cols-3 md:gap-2">
        <div class="md:col-span-1">
          <div class="sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              {{ $t("settings.profile.profileTitle") }}
            </h3>
            <p class="mt-1 text-xs leading-5 text-gray-600">
              {{ $t("settings.profile.profileText") }}
            </p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form @submit.prevent="updateProfile()">
            <div class="shadow overflow-hidden sm:rounded-sm">
              <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-2">
                  <div class="col-span-6 sm:col-span-6 md:col-span-6">
                    <label
                      for="email_address"
                      class="block text-sm font-medium leading-5 text-gray-700"
                      >{{ $t("account.shared.email") }}</label
                    >
                    <input
                      v-model="profile.email"
                      required
                      :disabled="true"
                      type="email"
                      id="email_address"
                      class="bg-gray-100 mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                  <div class="col-span-6 md:col-span-3">
                    <label
                      for="firstName"
                      class="block text-sm font-medium leading-5 text-gray-700"
                      >{{ $t("settings.profile.firstName") }}</label
                    >
                    <input
                      id="firstName"
                      required
                      v-model="profile.firstName"
                      class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>

                  <div class="col-span-6 md:col-span-3">
                    <label
                      for="lastName"
                      class="block text-sm font-medium leading-5 text-gray-700"
                      >{{ $t("settings.profile.lastName") }}</label
                    >
                    <input
                      v-model="profile.lastName"
                      id="lastName"
                      class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                  <div class="col-span-6 md:col-span-3">
                    <label
                      for="phone"
                      class="block text-sm font-medium leading-5 text-gray-700"
                      >{{ $t("settings.profile.phone") }}</label
                    >
                    <input
                      v-model="profile.phone"
                      id="phone"
                      class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-6">
                    <label
                      for="photo"
                      class="block text-sm leading-5 font-medium text-gray-700"
                      >{{ $t("shared.avatar") }}</label
                    >
                    <div class="mt-2 flex items-center">
                      <span
                        class="h-12 w-12 rounded-sm overflow-hidden bg-gray-100"
                      >
                        <img v-if="avatar" :src="avatar" />
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
                          @click="showUploadImage = true"
                          type="button"
                          class="py-2 px-3 border border-gray-300 rounded-sm text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                        >
                          {{ $t("shared.upload") }}
                        </button>
                      </span>
                      <span v-if="avatar" class="ml-2 rounded-sm shadow-sm">
                        <button
                          @click="loadedImage(null)"
                          type="button"
                          class="py-2 px-3 border bg-rose-50 border-gray-300 rounded-sm text-sm leading-4 font-medium text-red-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                        >
                          {{ $t("shared.delete") }}
                        </button>
                      </span>
                    </div>
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

      <!-- Separator -->
      <div class="block">
        <div class="py-5">
          <div class="border-t border-gray-200"></div>
        </div>
      </div>

      <!-- Security -->
      <div class="md:grid lg:grid-cols-3 md:gap-2">
        <div class="md:col-span-1">
          <div class="sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              {{ $t("settings.profile.securityTitle") }}
            </h3>
            <!-- <p class="mt-1 text-xs leading-5 text-gray-600">
              {{ $t("settings.profile.securityText") }}.
            </p> -->
            <p class="mt-1 text-xs leading-5 text-gray-600">
              {{ $t("account.login.forgot") }}
              <a
                @click="logout"
                class="text-theme-600 font-bold hover:text-theme-500"
                :href="'/cuenta/olvide?e=' + $store.state.account.user.email"
                >{{ $t("account.reset.button") }}</a
              >
            </p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form @submit.prevent="updatePassword()">
            <div class="shadow overflow-hidden sm:rounded-sm">
              <div v-if="canChangePassword()">
                <div class="px-4 py-5 bg-white sm:p-6">
                  <div class="grid grid-cols-6 gap-2">
                    <div class="col-span-6 sm:col-span-6">
                      <label
                        for="passwordCurrent"
                        class="block text-sm font-medium leading-5 text-gray-700"
                        >{{ $t("settings.profile.passwordCurrent") }}</label
                      >
                      <input
                        :required="profile.loginType === 0"
                        type="password"
                        id="passwordCurrent"
                        v-model="updatePasswordRequest.passwordCurrent"
                        class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>
                    <div class="col-span-6 md:col-span-3">
                      <label
                        for="password"
                        class="block text-sm font-medium leading-5 text-gray-700"
                        >{{ $t("settings.profile.password") }}</label
                      >
                      <input
                        required
                        type="password"
                        id="password"
                        v-model="updatePasswordRequest.passwordNew"
                        class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>

                    <div class="col-span-6 md:col-span-3">
                      <label
                        for="passwordConfirm"
                        class="block text-sm font-medium leading-5 text-gray-700"
                        >{{ $t("settings.profile.passwordConfirm") }}</label
                      >
                      <input
                        required
                        type="password"
                        v-model="updatePasswordRequest.passwordConfirm"
                        id="passwordConfirm"
                        class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
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
              <div
                v-else
                class="px-4 py-5 bg-white sm:p-6 block text-sm font-medium leading-5 text-gray-700"
              >
                {{ $t("settings.profile.cannotChangePassword") }}
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- Separator -->
      <div class="block">
        <div class="py-5">
          <div class="border-t border-gray-200"></div>
        </div>
      </div>

      <!-- Preferences -->
      <div class="md:grid lg:grid-cols-3 md:gap-2">
        <div class="md:col-span-1">
          <div class="sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              {{ $t("settings.preferences.title") }}
            </h3>
            <p class="mt-1 text-xs leading-5 text-gray-600">
              {{ $t("settings.preferences.description") }}
            </p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form @submit.prevent>
            <div class="shadow sm:rounded-sm">
              <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-2">
                  <div class="col-span-6 sm:col-span-6">
                    <label
                      for="passwordCurrent"
                      class="block text-sm font-medium leading-5 text-gray-700"
                      >{{ $t("settings.preferences.language") }}</label
                    >
                    <selector
                      :selected="selectedLocale"
                      :options="locales"
                      v-on:selected="changedLocale"
                      translatePath="shared.locales"
                    ></selector>
                  </div>
                </div>
              </div>
              <!-- <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  class="py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-sm text-white bg-gray-800 shadow-sm hover:bg-gray-700 active:bg-gray-900 transition duration-150 ease-in-out"
                >{{ $t("shared.save") }}</button>
              </div>-->
            </div>
          </form>
        </div>
      </div>
      <!-- Separator -->
      <div class="block">
        <div class="py-5">
          <div class="border-t border-gray-200"></div>
        </div>
      </div>
      <!-- Danger -->
      <div class="md:grid lg:grid-cols-3 md:gap-2">
        <div class="md:col-span-1">
          <div class="sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              {{ $t("settings.danger.title") }}
            </h3>
            <p class="mt-1 text-xs leading-5 text-gray-600">
              {{ $t("settings.danger.description") }}
            </p>
          </div>
        </div>
        <div class="mt-12 md:mt-0 md:col-span-2">
          <form @submit.prevent>
            <div class="bg-white shadow sm:rounded-sm">
              <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  {{ $t("settings.danger.deleteYourAccount") }}
                </h3>
                <div class="mt-2 max-w-xl text-sm leading-5 text-gray-500">
                  <p>{{ $t("settings.danger.onceYouDelete") }}.</p>
                </div>
                <div class="mt-5">
                  <button
                    @click="deleteAccount"
                    type="button"
                    class="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-sm text-red-700 bg-rose-50 hover:bg-red-50 focus:outline-none focus:border-red-300 focus:shadow-outline-red active:bg-red-200 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    {{ $t("settings.danger.deleteAccount") }}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <upload-image
      v-if="showUploadImage && !uploadingImage"
      v-on:close="showUploadImage = false"
      :title="$t('shared.avatar')"
      :image="avatar"
      v-on:loaded="loadedImage"
    ></upload-image>
    <success-modal ref="successModal"></success-modal>
    <error-modal ref="errorModal"></error-modal>
    <confirm-modal ref="confirmModal" v-on:yes="confirmDelete"></confirm-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import Selector from "@/components/shared/forms/Selector.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import ConfirmModal from "@/components/shared/modals/ConfirmModal.vue";
import supportedLocales from "../../../locale/supportedLocales";
import UploadImage from "@/components/shared/forms/UploadImage.vue";
import { UserUpdatePasswordRequest } from "../../../application/contracts/master/users/UserUpdatePasswordRequest";
import { UserUpdateAvatarRequest } from "../../../application/contracts/master/users/UserUpdateAvatarRequest";
import { UserDto } from "../../../application/dtos/master/users/UserDto";
import { UserUpdateRequest } from "../../../application/contracts/master/users/UserUpdateRequest";
import timezones from "../../../application/shared/timezones/Timezones";
import ErrorModalComponent from "@/components/shared/modals/NewErrorModal.vue";
import SuccessModalComponent from "@/components/shared/modals/SuccessModal.vue";
import ConfirmModalComponent from "@/components/shared/modals/ConfirmModal.vue";
import { UserLoginType } from "@/application/enums/master/users/UserLoginType";

@Component({
  components: {
    Selector,
    SuccessModal,
    ErrorModal,
    UploadImage,
    ConfirmModal
  }
})
export default class ProfileComponent extends BaseComponent {
  $refs!: {
    errorModal: ErrorModalComponent;
    successModal: SuccessModalComponent;
    confirmModal: ConfirmModalComponent;
  };
  private profile = {} as UserDto;
  private updatePasswordRequest = {} as UserUpdatePasswordRequest;
  private selectedLocale: string = "";
  private locales: string[] = [];
  private showUploadImage = false;
  private timezonesOptions: any[] = [];
  private uploadingImage: boolean = false;
  created() {
    this.timezonesOptions = timezones;
    this.profile.id = this.$store.state.account.user.id;
    this.profile.email = this.$store.state.account.user.email;
    this.profile.firstName = this.$store.state.account.user.firstName;
    this.profile.lastName = this.$store.state.account.user.lastName;
    this.profile.phone = this.$store.state.account.user.phone;
    this.profile.loginType = this.$store.state.account.user.loginType;
    this.selectedLocale = this.$i18n.locale;
  }
  mounted() {
    supportedLocales.forEach(f => {
      this.locales.push(f.lang);
    });
  }
  canChangePassword() {
    if (this.profile.loginType === UserLoginType.PASSWORD) {
      return true;
    }
    return false;
  }
  changedLocale(locale: string) {
    this.services.users
      .updateLocale({ locale })
      .then(() => {
        // this.$router.go(0);
      })
      .catch(error => {
        // this.$refs.errorModal.show(error);
      })
      .finally(() => {
        this.$store.commit("locale/updateLocale", locale);
        this.$i18n.locale = locale;
      });
  }
  updateProfile() {
    const updateRequest: UserUpdateRequest = {
      firstName: this.profile.firstName,
      lastName: this.profile.lastName,
      phone: this.profile.phone
    };
    this.services.users
      .update(this.profile.id, updateRequest)
      .then(response => {
        this.$refs.successModal.show(
          this.$t("settings.profile.profileUpdated")
        );
      })
      .catch(error => {
        this.$refs.errorModal.show(error);
      });
  }
  logout() {
    this.$store.dispatch("auth/logout");
  }
  updatePassword() {
    this.services.users
      .updatePassword(this.updatePasswordRequest)
      .then(() => {
        this.$refs.successModal.show(
          this.$t("settings.profile.passwordUpdated")
        );
        this.updatePasswordRequest.passwordCurrent = "";
        this.updatePasswordRequest.passwordNew = "";
        this.updatePasswordRequest.passwordConfirm = "";
      })
      .catch(error => {
        this.$refs.errorModal.show(error);
      });
  }
  deleteAccount() {
    this.$refs.confirmModal.show(this.$t("settings.danger.confirmDelete"));
  }
  confirmDelete() {
    this.services.users
      .deleteMe()
      .then(response => {
        // ignore
      })
      .catch(error => {
        this.$refs.errorModal.show(error);
      });
  }
  loadedImage(image) {
    const updateAvatar: UserUpdateAvatarRequest = {
      avatar: image
    };
    this.uploadingImage = true;
    this.services.users
      .updateAvatar(updateAvatar)
      .then(response => {
        this.showUploadImage = false;
      })
      .catch(error => {
        console.error("Error: " + JSON.stringify(error));
      })
      .finally(() => {
        this.uploadingImage = false;
      });
  }

  get avatar() {
    return this.$store.state.account.user.avatar;
  }
}
</script>
