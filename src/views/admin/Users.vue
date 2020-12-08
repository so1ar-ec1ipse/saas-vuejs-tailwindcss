<template>
  <div>
    <div
      class="flex items-center justify-between bg-white -m-4 sm:-m-8 p-8 pb-4 shadow-lg mb-4"
    >
      <div class="flex-1 min-w-0">
        <h2
          class="flex text-2xl font-bold leading-9 text-gray-800 sm:text-3xl sm:leading-9 sm:truncate"
        >
          {{ $t("models.user.plural") }}
        </h2>
      </div>
      <div class="mt-0 flex lg:mt-0 lg:ml-4">
        <span class="hidden sm:block ml-3 shadow-sm rounded-sm">
          <button
            @click="reload"
            type="button"
            class="h-8 inline-flex items-center px-4 py-2 border border-gray-300 text-xs leading-5 font-medium rounded-sm text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-theme-900 active:bg-gray-50 active:text-theme-900 transition duration-150 ease-in-out"
          >
            <i class="fa fa-redo -ml-1 mr-2 h-5 w-5 text-gray-500"></i>
            {{ $t("shared.reload") }}
          </button>
        </span>
      </div>
    </div>
    <div v-if="loading" class="mt-4 sm:mt-12">
      <table-row-skeleton></table-row-skeleton>
      <table-row-skeleton></table-row-skeleton>
      <table-row-skeleton></table-row-skeleton>
    </div>
    <div v-else>
      <div class="flex flex-col mt-4 sm:mt-12 -mx-8">
        <div
          class="shadow overflow-scroll border-b border-gray-200 sm:rounded-sm"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ $t("shared.avatar") }}
                </th>
                <th
                  class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ $t("models.user.email") }}
                </th>
                <th
                  class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ $t("shared.name") }}
                </th>
                <th
                  class="px-6 py-2 bg-gray-50 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ $t("models.user.tenants") }}
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
              <tr v-for="(item, index) in items" :key="index">
                <td
                  class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
                >
                  <img
                    v-if="item.avatar"
                    class="h-8 w-8 rounded-sm max-h-8"
                    :src="item.avatar"
                  />
                  <span
                    v-else
                    class="inline-flex items-center justify-center h-8 w-8 rounded-sm bg-gray-500 shadow-xl"
                  >
                    <span class="text-sm font-medium leading-none text-white">{{
                      "?"
                    }}</span>
                  </span>
                </td>
                <td
                  class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
                >
                  {{ item.type === 0 ? `${userType(item)} ` : ""
                  }}{{ item.email }}
                </td>
                <td
                  class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
                >
                  {{ item.firstName }} {{ item.lastName }}
                </td>

                <td
                  class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
                >
                  <span v-if="item.tenants && item.tenants.length > 0">
                    {{
                      item.tenants.map((f) => f.tenant.name).join(", ")
                    }} </span
                  ><span v-else>
                    ?
                  </span>
                </td>
                <td
                  class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
                >
                  <button
                    @click="impersonate(item)"
                    class="cursor-pointer text-theme-600 hover:text-theme-500 ml-2 disabled:opacity-75 disabled:cursor-default"
                  >
                    {{ $t("models.user.impersonate") }}
                  </button>
                </td>
                <td
                  class="truncate px-6 py-4 text-sm leading-3 font-medium text-gray-900"
                >
                  <button
                    @click="changePassword(item)"
                    class="cursor-pointer text-theme-600 hover:text-theme-500 ml-2 disabled:opacity-75 disabled:cursor-default"
                  >
                    {{ $t("settings.profile.changePassword") }}
                  </button>
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
import { ColumnType, ValueType } from "../../application/dtos/ColumnType";
import EntityTableList from "@/components/shared/entities/EntityTableList.vue";
import { UserType } from "../../application/enum/master/UserType";

@Component({ components: { TenantMembers, EntityTableList } })
export default class UsersComponent extends BaseComponent {
  private items?: UserDto[] = [];
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
    // this.services.authentication.impersonate(user.id);
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
        confirm("[ADMINISTRADOR] Update password for user " + user.email + "?")
      ) {
        this.services.users
          .adminUpdatePassword(user.id, password)
          .then((response) => {
            alert("Updated");
          })
          .catch((error) => {
            alert("Error: " + this.$t(error));
          });
      }
    }
  }
}
</script>
