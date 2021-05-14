<template>
  <div class="pt-2 pb-40 md:py-6 mx-auto px-4 sm:px-6 md:px-8 overflow-hidden">
    <div
      class="justify-between flex mb-2 space-x-2 space-y-0 bg-white p-3 items-center -mx-8 -my-3 md:-my-6 px-8 shadow-inner border border-gray-200"
    >
      <div class="">
        <h1 class="flex-1 text-lg font-extrabold flex items-center">
          {{ $t("models.user.plural") }}
          <span
            class="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-50 border border-gray-300 ml-2"
          >
            <span class="text-xs font-medium leading-none text-gray-800">{{
              items.length
            }}</span>
          </span>
        </h1>
        <!--          <p class="text-base">-->
        <!--            {{items.length}}-->
        <!--          </p>-->
      </div>
      <div class="flex items-end space-x-1 space-y-0">
        <span
          class="relative z-0 inline-flex shadow-sm rounded-sm w-full sm:w-auto"
        >
          <button
            @click="reload()"
            id="reload"
            type="button"
            class="items-center w-full bg-white border border-gray-300 rounded-l-none rounded-r-sm shadow-sm px-2 py-2 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <!--                <svg class="ml-2.5 -mr-1.5 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">-->
            <!--                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />-->
            <!--                </svg>-->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </span>
      </div>
    </div>
    <div v-if="loading" class="mt-4 sm:mt-9">
      <table-row-skeleton></table-row-skeleton>
      <table-row-skeleton></table-row-skeleton>
      <table-row-skeleton></table-row-skeleton>
    </div>
    <div v-else>
      <div class="flex flex-col -mt-2 sm:mt-6 -mx-8">
        <div
          class="shadow overflow-scroll border-b border-gray-200 sm:rounded-sm"
        >
          <table class="min-w-full divide-y divide-gray-200 max-w-sm">
            <thead>
              <tr>
                <!--                <th-->
                <!--                  class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"-->
                <!--                >-->
                <!--                  {{ $t("shared.avatar") }}-->
                <!--                </th>-->
                <!--                <th-->
                <!--                  class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"-->
                <!--                >-->
                <!--                  {{ $t("models.user.email") }}-->
                <!--                </th>-->
                <th
                  class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ $t("models.user.object") }}
                </th>
                <th
                  class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ $t("models.user.impersonate") }}
                </th>
                <th
                  class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ $t("settings.profile.changePassword") }}
                </th>
                <th
                  class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ $t("models.user.tenants") }}
                </th>

                <!-- <th
                class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
              </th> -->
                <!-- <th
                class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
              >{{ $t("shared.status") }}</th>-->
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="(item, index) in items"
                :key="index"
                :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img
                        v-if="item.avatar"
                        class="h-10 w-10 rounded-full max-h-10"
                        :src="item.avatar"
                      />
                      <span
                        v-else
                        class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500 shadow-xl"
                      >
                        <span
                          class="text-sm font-medium leading-none text-white"
                          >{{ "?" }}</span
                        >
                      </span>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ item.firstName }} {{ item.lastName }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ item.email }}
                      </div>
                    </div>
                  </div>
                </td>
                <td
                  class="truncate px-6 py-1 text-sm leading-3 font-medium text-gray-900"
                >
                  <button
                    @click="impersonate(item)"
                    class="cursor-pointer text-theme-500 hover:text-theme-400 ml-2 disabled:opacity-75 disabled:cursor-default"
                  >
                    {{ $t("models.user.impersonate") }}
                  </button>
                </td>
                <td
                  class="truncate px-6 py-1 text-sm leading-3 font-medium text-gray-900"
                >
                  <button
                    @click="changePassword(item)"
                    class="cursor-pointer text-theme-500 hover:text-theme-400 ml-2 disabled:opacity-75 disabled:cursor-default"
                  >
                    {{ $t("settings.profile.changePassword") }}
                  </button>
                </td>

                <td
                  class="truncate px-6 py-1 text-sm leading-3 font-medium text-gray-900"
                >
                  <span v-if="item.tenants && item.tenants.length > 0">
                    {{ item.tenants.map(f => f.tenant.name).join(", ") }} </span
                  ><span v-else> ? </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../components/shared/BaseComponent.vue";
import TenantMembers from "@/components/app/settings/tenant/TenantMembers.vue";
import { UserDto } from "../../application/dtos/master/users/UserDto";
import EntityTableList from "@/components/shared/entities/EntityTableList.vue";
import { UserType } from "@/application/enums/master/users/UserType";

@Component({ components: { TenantMembers, EntityTableList } })
export default class Users extends BaseComponent {
  private items: UserDto[] = [];
  mounted() {
    this.reload();
  }
  reload() {
    this.loading = true;
    this.services.users
      .adminGetAll()
      .then((response: UserDto[]) => {
        this.items = response;
      })
      .finally(() => {
        this.loading = false;
      });
  }
  userType(user: UserDto) {
    return UserType[user.type];
  }
  impersonate(user: UserDto) {
    this.services.authentication.impersonate(user.id);
  }
  changePassword(user: UserDto) {
    const password = prompt(
      this.$t("settings.profile.changePassword") + " - " + user.email
    );
    if (!password || password.length < 8) {
      alert("Set a password with 8 characters minimum");
    } else if (user.type === 0) {
      alert("You cannot change password for admin user");
    } else {
      if (
        confirm("[ADMINISTRATOR] Update password for user " + user.email + "?")
      ) {
        this.services.users
          .adminUpdatePassword(user.id, password)
          .then(response => {
            alert("Updated");
          })
          .catch(error => {
            alert("Error: " + this.$t(error));
          });
      }
    }
  }
}
</script>
