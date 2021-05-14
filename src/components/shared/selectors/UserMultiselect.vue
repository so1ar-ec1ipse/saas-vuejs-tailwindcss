<template>
  <div class="" v-click-outside="close">
    <button
      @click="mostrar = !mostrar"
      class="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none"
      id="pinned-project-options-menu-0"
      aria-expanded="false"
      aria-haspopup="true"
    >
      <span class="sr-only">Seleccionar usuarios</span>
      <!-- Heroicon name: solid/dots-vertical -->
      <svg
        class="w-4 h-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        stroke="none"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
        />
      </svg>
    </button>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <ul
        v-if="mostrar"
        class="z-30 origin-top-right absolute right-10 top-3 mt-1 w-72 bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
      >
        <li
          v-if="loading"
          class="w-full text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
        >
          Cargando usuarios...
        </li>
        <!--
        Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

        Highlighted: "text-white bg-rose-600", Not Highlighted: "text-gray-900"
      -->
        <li
          v-for="(tenantUser, idx) in users"
          :key="idx"
          class="w-full text-gray-900 select-none relative"
          id="listbox-option-0"
          role="option"
          :class="{
            'hover:bg-gray-50 ': !exclude.includes(tenantUser.userId)
          }"
        >
          <button
            :disabled="exclude.includes(tenantUser.userId)"
            @click="select(tenantUser.userId)"
            class="w-full py-2 pl-3 pr-9 focus:outline-none"
            :class="{
              'cursor-not-allowed ': exclude.includes(tenantUser.userId)
            }"
          >
            <!-- <div class="flex items-center">
          <img src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixqx=u9pp0fhbEd&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="flex-shrink-0 h-6 w-6 rounded-full">
          
          <span class="font-normal ml-3 block truncate">
            {{user.firstName}} {{user.lastName}}
          </span>
        </div> -->
            <div class="flex items-center space-x-2">
              <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
              <div
                v-if="tenantUser.firstName || tenantUser.lastName"
                class="font-normal truncate"
              >
                {{ tenantUser.firstName }} {{ tenantUser.lastName }}
              </div>
              <!-- Highlighted: "text-rose-200", Not Highlighted: "text-gray-500" -->
              <div class="text-gray-500 truncate">@{{ tenantUser.email }}</div>
            </div>

            <!--
          Checkmark, only display for selected option.

          Highlighted: "text-white", Not Highlighted: "text-rose-600"
        -->
            <span
              v-if="selected.includes(tenantUser.userId)"
              class="text-rose-600 absolute inset-y-0 right-0 flex items-center pr-4"
            >
              <!-- Heroicon name: solid/check -->
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </button>
        </li>

        <!-- More items... -->
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import services from "@/services";
import { TenantUserDto } from "@/application/dtos/master/tenants/TenantUserDto";

@Component({
  components: {}
})
export default class UserMultiselect extends Vue {
  @Prop() initialSelected!: string[];
  @Prop() exclude!: string[];
  private mostrar: boolean = false;
  private loading: boolean = false;
  private selected: string[] = [];
  private tenantUsers: TenantUserDto[] = [];
  mounted() {
    this.loading = true;
    this.selected = this.initialSelected;
    if (!this.selected) {
      this.selected = [];
    }
    services.tenantUsers
      .getAll()
      .then((response: TenantUserDto[]) => {
        this.tenantUsers = response;
      })
      .finally(() => {
        this.loading = false;
      });
  }
  close() {
    this.mostrar = false;
  }
  select(userId: string) {
    const user = this.tenantUsers.find(f => f.userId === userId);
    if (user) {
      if (this.selected.includes(userId)) {
        this.selected = this.selected.filter(f => f !== userId);
        console.log("removed: " + JSON.stringify(user));
        this.$emit(
          "removed",
          userId,
          user.email,
          user.firstName,
          user.lastName
        );
        this.$emit("updatedSelected", this.selected);
        this.close();
      } else {
        this.selected.push(userId);
        console.log("added: " + JSON.stringify(user));
        this.$emit("added", userId, user.email, user.firstName, user.lastName);
        this.$emit("updatedSelected", this.selected);
        this.close();
      }
    }
  }
  get users() {
    if (!this.tenantUsers || this.tenantUsers.length === 0) {
      return [];
    }
    return this.tenantUsers;
    // const tenantUsers: TenantUserDto[] = [];
    // // this.tenantUsers.forEach((element) => {
    // //   if (!this.exclude || !this.exclude.includes(element.userId)) {
    // //     tenantUsers.push(element);
    // //   }
    // // });
    // return tenantUsers;
  }
}
</script>
