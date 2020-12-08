<template>
<div>
  <div v-for="(group, index) in $parent.getMenu" :key="index">
    <div class="mt-2">
      <h3
        class="px-1 text-xs leading-4 font-semibold text-theme-600 uppercase tracking-wider"
        id="Settings-headline"
      >
        {{ group.title }}
      </h3>
    </div>
    <div v-for="(menuItem, index) in group.items" :key="index">
      <div
        class="hover:-translate-y-1 hover:scale-150"
        v-if="!menuItem.items || menuItem.items.length === 0"
      >
        <router-link
          :to="menuItem.path"
          class="-mx-2 mt-1 group flex items-center py-2 text-xs leading-5 rounded-sm hover:text-theme-100 hover:bg-theme-500 focus:outline-none focus:text-theme-800 focus:bg-theme-200 transition ease-in-out duration-150"
          :class="
            (menuItem.icon ? 'px-4 ' : '-ml-6 ') +
              ($route.path === menuItem.path
                ? 'text-theme-800 bg-theme-200'
                : 'text-secondary')
          "
        >
          <span class="text-secondary mr-3 h-5 w-5 transition ease-in-out">
            <i
              v-if="menuItem.icon"
              :class="'   fa fa-' + menuItem.icon + ' '"
            ></i>
          </span>

          <!-- <svg
                    class="mr-4 h-5 w-5 text-secondary group-hover:text-secondary group-focus:text-secondary transition ease-in-out duration-150"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                        </svg>-->
          {{ menuItem.title }}
        </router-link>
      </div>
      <div v-else class="hover:-translate-y-1 hover:scale-150">
        <div
          v-on:click="toggleMenuItem(index)"
          class="cursor-pointer -mx-2 mt-1 group flex items-center px-4 py-2 text-xs leading-5 rounded-sm text-secondary hover:text-theme-100 hover:bg-theme-500 focus:outline-none focus:text-theme-800 focus:bg-theme-200 transition ease-in-out duration-150"
        >
          <span class="text-secondary mr-3 h-5 w-5 transition ease-in-out">
            <i
              v-if="menuItem.icon"
              :class="'   fa fa-' + menuItem.icon + ' '"
            ></i>
          </span>
          {{ menuItem.title }}
          <!-- Expanded: "text-gray-400 rotate-90", Collapsed: "text-secondary" -->
          <svg
            :class="
              menuItemIsExpanded(index)
                ? 'rotate-90 ml-auto h-3 w-3 transform group-hover:text-gray-400 group-focus:text-gray-400 transition-colors ease-in-out duration-150'
                : 'ml-auto h-3 w-3 transform group-hover:text-gray-400 group-focus:text-gray-400 transition-colors ease-in-out duration-150'
            "
            class="hover:bg-theme-900 ml-auto h-5 w-5 transform group-hover:text-gray-400 group-focus:text-gray-400 transition-colors ease-in-out duration-150"
            viewBox="0 0 20 20"
          >
            <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
          </svg>
        </div>
        <!-- Expandable link section, show/hide based on state. -->
        <div class="mt-1" v-if="menuItemIsExpanded(index)">
          <router-link
            v-for="(subItem, index) in menuItem.items"
            :key="index"
            :to="subItem.path"
            class="-mx-2 pl-12 mt-1 group flex items-center py-2 text-xs leading-5 rounded-sm hover:text-theme-100 hover:bg-theme-500 focus:outline-none focus:text-theme-800 focus:bg-theme-200 transition ease-in-out duration-150"
            :class="
              (subItem.icon ? 'px-4 ' : '-mx-6 ') +
                ($route.path === subItem.path
                  ? 'text-theme-800 bg-theme-200'
                  : 'text-secondary')
            "
          >
            <span class="mr-1 h-5 w-5 transition ease-in-out">
              <i
                v-if="subItem.icon"
                :class="'   fa fa-' + subItem.icon + ' '"
              ></i>
            </span>
            {{ subItem.title }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import BaseComponent from "../../../../components/shared/BaseComponent.vue";
import { UserType } from "../../application/enum/master/UserType";
import { SideBarItem } from "../../application/sidebar/SidebarItem";

import { adminSidebar } from "../../application/sidebar/adminSidebar";
import { appSidebar } from "../../application/sidebar/appSidebar";

@Component({
  components: {  },
  computed: { },
})
export default class SidebarDestkop extends Vue {
  private expanded: number[] = [];
  mounted(){
      this.menu.forEach((group) => {
      group.items?.forEach((element, index) => {
        if (element.open) {
          this.expanded.push(index);
        } else {
          this.expanded = this.expanded.filter((f) => f !== index);
        }
      });
    });
  }
  menuItemIsExpanded(index: number) {
    return this.expanded.includes(index);
  }
  toggleMenuItem(index) {
    if (this.expanded.includes(index)) {
      this.expanded = this.expanded.filter((item) => item !== index);
    } else {
      this.expanded.push(index);
    }
  }
  get menu(): SideBarItem[]{  
    // @ts-ignore
    return this.$parent.menu;
  }
  get getMenu() {
    // @ts-ignore
    if (this.$parent.layout === "admin" && this.menu.length > 0 && this.menu[0].items) {
      const prices: SideBarItem | undefined = this.menu[0].items.find(
        (f) => f.path === "/admin/products"
      );
      if (prices) {
        prices.items = [];
        // @ts-ignore
        this.$parent.addPricesToAdminSidebar(prices);
      }
    }
    const menu = this.menu.filter(
      (f) =>
        (!f.userTypes || f.userTypes.includes(this.currentUserType)) &&
        f.items?.find(
          (x) => !x.userTypes || x.userTypes.includes(this.currentUserType)
        )
    );
    return menu;
  }
  get currentUserType(): UserType {
      return this.$store.state.account.user.type as UserType;
  }
}