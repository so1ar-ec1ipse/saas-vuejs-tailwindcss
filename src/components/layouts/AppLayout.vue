<template>
  <div>
    <div
      :class="
        appTheme +
          ' ' +
          appColor +
          ' h-screen flex overflow-hidden bg-gray-100 text-gray-800 '
      "
    >
      <!-- Off-canvas menu for mobile -->
      <div class="md:hidden" v-if="sidebarOpen">
        <div class="fixed inset-0 flex z-40">
          <transition
            enter-active-class="transition-opacity ease-linear duration-300"
            enter-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity ease-linear duration-300"
            leave-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div class="fixed inset-0">
              <div class="absolute inset-0 bg-gray-600 opacity-75"></div>
            </div>
          </transition>

          <transition
            enter-active-class="transition ease-in-out duration-300 transform"
            enter-class="-translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transition ease-in-out duration-300 transform"
            leave-class="translate-x-0"
            leave-to-class="-translate-x-full"
          >
            <div
              class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-primary"
            >
              <div class="absolute top-0 right-0 -mr-14 p-1">
                <button
                  @click="sidebarOpen = !sidebarOpen"
                  class="flex items-center justify-center h-12 w-12 rounded-sm focus:outline-none focus:bg-gray-600"
                  aria-label="Close sidebar"
                >
                  <svg
                    class="text-white h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div class="flex-shrink-0 flex items-center px-4">
                <router-link :to="{ name: 'app' }">
                  <div class="w-32">
                    <div
                      v-if="$store.state.theme.appTheme === 'theme-bg-light'"
                    >
                      <img
                        v-if="currentTenant && currentTenant.logo"
                        :src="currentTenant.logo"
                        alt="Logo"
                      />
                      <img
                        v-else
                        src="@/assets/img/logo-light.png"
                        alt="Logo"
                      />
                    </div>
                    <div v-else>
                      <img
                        v-if="currentTenant && currentTenant.logo"
                        :src="currentTenant.logoDarkmode"
                        alt="Logo"
                      />
                      <img v-else src="@/assets/img/logo-dark.png" alt="Logo" />
                    </div>
                  </div>
                </router-link>
              </div>
              <div class="mt-5 flex-1 h-0 overflow-y-auto">
                <nav class="px-2">
                  <div
                    class="relative shadow-2xl mb-4"
                    v-click-outside="closeDropdownTenant"
                  >
                    <span class="inline-block w-full rounded-sm shadow-sm">
                      <button
                        v-on:click="
                          dropDownTenantMobile = !dropDownTenantMobile
                        "
                        type="button"
                        aria-haspopup="listbox"
                        aria-expanded="true"
                        aria-labelledby="listbox-label"
                        class="text-secondary cursor-default relative w-full border-gray-300 pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5 hover:bg-secondary rounded-sm"
                      >
                        <span class="font-bold">{{ currentTenant.name }}</span>
                        <span
                          class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                        >
                          <svg
                            class="h-5 w-5 text-secondary"
                            viewBox="0 0 20 20"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </span>
                      </button>
                    </span>

                    <!-- Select popover, show/hide based on select state. -->
                    <div
                      class="transition-all duration-1000"
                      :class="
                        dropDownTenantMobile
                          ? 'z-40 absolute object-top mt-1 w-full rounded-sm bg-gray-100 shadow-lg'
                          : 'hidden'
                      "
                    >
                      <ul
                        tabindex="-1"
                        role="listbox"
                        aria-labelledby="listbox-label"
                        class="max-h-60 rounded-sm py-1 text-sm leading-5 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                      >
                        <li
                          v-for="(tenant, index) in myTenants"
                          :key="index"
                          role="option"
                          class="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-300 border-b border-gray-400"
                          v-on:click="changeTenant(tenant)"
                        >
                          <div>
                            <img
                              alt="Tenant icon"
                              v-if="tenant.icon"
                              class="h-8 w-8 rounded-sm overflow-hidden float-left mr-2 -ml-1 mt-1"
                              :src="tenant.icon"
                            />
                            <span class="font-medium">{{ tenant.name }}</span>
                            <span
                              v-if="tenant.id === currentTenant.id"
                              class="text-blueGray-500 absolute inset-y-0 right-0 flex items-center pr-4 -mt-4"
                            >
                              <svg
                                class="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </span>
                            <p class="text-xs">
                              {{ getPlanFromTenant(tenant) }}
                            </p>
                          </div>
                        </li>
                        <button
                          @click="addTenant"
                          role="option"
                          class="w-full text-left font-bold text-blueGray-800 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-300 border-b border-gray-400"
                        >
                          {{ $t("settings.tenant.create") }}
                        </button>

                        <!-- More options... -->
                      </ul>
                    </div>
                  </div>
                  <div v-for="(group, index) in getMenu" :key="index">
                    <div class="mt-2">
                      <h3
                        class="px-1 text-xs leading-4 font-semibold text-blueGray-500 uppercase tracking-wider"
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
                          @click.native="sidebarOpen = !sidebarOpen"
                          :to="{ name: menuItem.pathName }"
                          class="-mx-2 mt-1 group flex items-center py-2 text-sm leading-5 rounded-sm hover:text-primary hover:bg-darker focus:outline-none focus:text-primary focus:bg-lighter transition ease-in-out duration-150"
                          :class="
                            (menuItem.icon ? 'px-4 ' : '-ml-6 ') +
                              ($route.name === menuItem.pathName
                                ? 'text-primary bg-lighter'
                                : 'text-secondary')
                          "
                        >
                          <span
                            class="text-secondary mr-3 h-5 w-5 transition ease-in-out"
                          >
                            <i
                              v-if="menuItem.icon"
                              :class="'   fa fa-' + menuItem.icon + ' '"
                            ></i>
                          </span>
                          {{ menuItem.title }}
                        </router-link>
                      </div>
                      <div v-else class="hover:-translate-y-1 hover:scale-150">
                        <div
                          v-on:click="toggleMenuItem(index)"
                          class="cursor-pointer -mx-2 mt-1 group flex items-center px-4 py-2 text-sm leading-5 rounded-sm text-secondary hover:text-primary hover:bg-darker focus:outline-none focus:text-primary focus:bg-lighter transition ease-in-out duration-150"
                        >
                          <span
                            class="text-secondary mr-3 h-5 w-5 transition ease-in-out"
                          >
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
                            class="hover:bg-darker ml-auto h-5 w-5 transform group-hover:text-gray-400 group-focus:text-gray-400 transition-colors ease-in-out duration-150"
                            viewBox="0 0 20 20"
                          >
                            <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                          </svg>
                        </div>
                        <!-- Expandable link section, show/hide based on state. -->
                        <div class="mt-1" v-if="menuItemIsExpanded(index)">
                          <router-link
                            @click.native="sidebarOpen = !sidebarOpen"
                            v-for="(subItem, index) in menuItem.items"
                            :key="index"
                            :to="{ name: subItem.pathName }"
                            class="-mx-2 pl-12 mt-1 group flex items-center py-2 text-sm leading-5 rounded-sm hover:text-primary hover:bg-darker focus:outline-none focus:text-primary focus:bg-lighter transition ease-in-out duration-150"
                            :class="
                              (subItem.icon ? 'px-4 ' : '-mx-6 ') +
                                ($route.name === subItem.pathName
                                  ? 'text-primary bg-lighter'
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
                </nav>
              </div>
            </div>
          </transition>
          <div class="flex-shrink-0 w-14">
            <!-- Dummy element to force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </div>

      <!-- Static sidebar for desktop -->
      <div
        :class="
          sidebarOpen
            ? 'hidden transition ease-in duration-1000'
            : 'hidden md:flex md:flex-shrink-0 border-r border-theme-200 shadow-sm transition ease-out duration-1000'
        "
      >
        <div class="flex flex-col w-64">
          <!-- Sidebar component, swap this element with another sidebar if you like -->
          <div class="flex flex-col h-0 flex-1 shadow-md bg-lighter">
            <div
              v-if="currentTenant && currentTenant.logo"
              class="flex items-center h-14 flex-shrink-0 px-4"
            >
              <router-link :to="{ name: 'app' }">
                <div class="w-7/12 text-left mx-auto">
                  <div v-if="$store.state.theme.appTheme === 'theme-bg-light'">
                    <img
                      v-if="currentTenant && currentTenant.logo"
                      :src="currentTenant.logo"
                      alt="Logo"
                    />
                    <img v-else src="@/assets/img/logo-light.png" alt="Logo" />
                  </div>
                  <div v-else>
                    <img
                      v-if="currentTenant && currentTenant.logo"
                      :src="currentTenant.logoDarkmode"
                      alt="Logo"
                    />
                    <img v-else src="@/assets/img/logo-dark.png" alt="Logo" />
                  </div>
                </div>
              </router-link>
            </div>
            <div class="flex-1 flex flex-col overflow-y-auto">
              <nav class="flex-1 px-2 py-4" :class="bgPrimary">
                <div
                  class="relative shadow-2xl mb-4"
                  v-click-outside="closeDropdownTenantDesktop"
                >
                  <span class="inline-block w-full rounded-sm shadow-sm">
                    <button
                      class="bg-lighter hover:bg-darker truncate text-primary cursor-pointer w-full pl-3 py-2 text-left focus:outline-none transition ease-in-out duration-150 sm:text-sm sm:leading-5 hover:text-primary rounded-sm shadow-sm"
                      v-on:click="
                        dropDownTenantDesktop = !dropDownTenantDesktop
                      "
                    >
                      <span class="font-bold">
                        <img
                          alt="Tenant icon"
                          v-if="currentTenant.icon"
                          class="h-5 w-5 rounded-sm overflow-hidden float-left mr-2 -ml-1"
                          :src="currentTenant.icon"
                        />
                        <span class="mt-4 text-xs">{{
                          currentTenant.name
                        }}</span>
                      </span>
                      <span
                        class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                      >
                        <svg
                          class="h-5 w-5 text-secondary"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                  </span>

                  <!-- Select popover, show/hide based on select state. -->
                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <div
                      class="z-40 absolute object-top mt-1 w-full rounded-sm bg-gray-100 shadow-lg"
                      v-show="dropDownTenantDesktop"
                    >
                      <ul
                        tabindex="-1"
                        role="listbox"
                        aria-labelledby="listbox-label"
                        class="max-h-60 rounded-sm py-1 text-sm leading-5 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                      >
                        <li
                          v-for="(tenant, index) in myTenants"
                          :key="index"
                          role="option"
                          class="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-300 border-b border-gray-400"
                          v-on:click="changeTenant(tenant)"
                        >
                          <div>
                            <img
                              alt="Tenant icon"
                              v-if="tenant.icon"
                              class="h-8 w-8 rounded-sm overflow-hidden float-left mr-2 -ml-1 mt-1"
                              :src="tenant.icon"
                            />
                            <span class="font-medium">{{ tenant.name }}</span>
                            <span
                              v-if="tenant.id === currentTenant.id"
                              class="text-blueGray-500 absolute inset-y-0 right-0 flex items-center pr-4 -mt-4"
                            >
                              <svg
                                class="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </span>
                            <p class="text-xs">
                              {{ getPlanFromTenant(tenant) }}
                            </p>
                          </div>
                        </li>
                        <button
                          @click="addTenant"
                          role="option"
                          class="w-full text-left font-bold text-blueGray-800 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-300 border-b border-gray-400"
                        >
                          {{ $t("settings.tenant.create") }}
                        </button>
                      </ul>
                    </div>
                  </transition>
                </div>
                <div v-for="(group, index) in getMenu" :key="index">
                  <div class="mt-2">
                    <h3
                      class="px-1 text-xs leading-4 font-semibold text-blueGray-500 uppercase tracking-wider"
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
                        :to="{ name: menuItem.pathName }"
                        class="-mx-2 mt-1 group flex items-center py-2 text-sm leading-5 rounded-sm hover:text-primary hover:bg-darker focus:outline-none focus:text-primary focus:bg-lighter transition ease-in-out duration-150"
                        :class="
                          (menuItem.icon ? 'px-4 ' : '-ml-6 ') +
                            ($route.name === menuItem.pathName
                              ? 'text-primary bg-lighter'
                              : 'text-secondary')
                        "
                      >
                        <span
                          class="text-secondary mr-3 h-5 w-5 transition ease-in-out"
                        >
                          <i
                            v-if="menuItem.icon"
                            :class="'   fa fa-' + menuItem.icon + ' '"
                          ></i>
                        </span>
                        {{ menuItem.title }}
                      </router-link>
                    </div>
                    <div v-else class="hover:-translate-y-1 hover:scale-150">
                      <div
                        v-on:click="toggleMenuItem(index)"
                        class="cursor-pointer -mx-2 mt-1 group flex items-center px-4 py-2 text-sm leading-5 rounded-sm text-secondary hover:text-primary hover:bg-darker focus:outline-none focus:text-primary focus:bg-lighter transition ease-in-out duration-150"
                      >
                        <span
                          class="text-secondary mr-3 h-5 w-5 transition ease-in-out"
                        >
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
                          class="hover:bg-darker ml-auto h-5 w-5 transform group-hover:text-gray-400 group-focus:text-gray-400 transition-colors ease-in-out duration-150"
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
                          :to="{ name: subItem.pathName }"
                          class="-mx-2 pl-12 mt-1 group flex items-center py-2 text-sm leading-5 rounded-sm hover:text-primary hover:bg-darker focus:outline-none focus:text-primary focus:bg-lighter transition ease-in-out duration-150"
                          :class="
                            (subItem.icon ? 'px-4 ' : '-mx-6 ') +
                              ($route.name === subItem.pathName
                                ? 'text-primary bg-lighter'
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
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-0 flex-1 overflow-hidden">
        <div
          class="relative flex-shrink-0 flex h-14 bg-white shadow-inner border-b border-gray-200"
        >
          <button
            @click="sidebarOpen = !sidebarOpen"
            class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-600"
            aria-label="Open sidebar"
          >
            <svg
              class="h-5 w-5"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>

          <div class="flex-1 px-3 flex justify-between">
            <div class="flex-1 flex items-center">
              <div class="w-full flex md:ml-0">
                <div class="align-baseline w-full text-secondary pl-1">
                  <breadcrumb></breadcrumb>
                </div>
              </div>
            </div>
            <div class="flex items-center md:ml-6 space-x-2">
              <workspace-selector
                class="w-40 sm:w-52"
                v-if="layout !== 'admin'"
              ></workspace-selector>

              <div class="relative">
                <div>
                  <div>
                    <label id="listbox-label" class="sr-only">
                      Subir tickets o CFDis
                    </label>
                    <div
                      class="relative"
                      v-click-outside="closeShowUploadTickets"
                    >
                      <div
                        class="inline-flex shadow-none rounded-sm divide-x divide-gray-300"
                      >
                        <div
                          class="text-sm relative z-0 inline-flex shadow-none rounded-full"
                        >
                          <button
                            @click="showUploadTickets = !showUploadTickets"
                            type="button"
                            class="text-gray-800 bg-gray-50 border-gray-100 shadow-inner border relative inline-flex items-center p-2 rounded-full font-medium hover:bg-rose-300 hover:text-rose-800 focus:bg-rose-400 focus:text-rose-900 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-rose-50 focus:ring-rose-50"
                            aria-haspopup="listbox"
                            aria-expanded="true"
                            aria-labelledby="listbox-label"
                          >
                            <span class="sr-only">Nuevo</span>
                            <!-- Heroicon name: solid/chevron-down -->
                            <svg
                              class="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              fill="none"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <transition
                        enter-active-class=""
                        enter-class=""
                        enter-to-class=""
                        leave-active-class="transition ease-in duration-100"
                        leave-class="opacity-100"
                        leave-to-class="opacity-0"
                      >
                        <ul
                          v-show="showUploadTickets"
                          class="z-10 origin-top-right absolute right-0 mt-2 w-72 rounded-sm shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none"
                          tabindex="-1"
                          role="listbox"
                          aria-labelledby="listbox-label"
                          aria-activedescendant="listbox-option-0"
                        >
                          <li
                            class="text-gray-900 cursor-default select-none relative text-sm"
                            id="listbox-option-0"
                            role="option"
                          >
                            <router-link
                              :to="{ name: 'app.tickets.upload' }"
                              @click.native="showUploadTickets = false"
                              class="flex flex-col p-4 hover:bg-gray-50"
                            >
                              <div class="flex justify-between">
                                <p class="font-semibold">
                                  {{ $t("app.tickets.uploadTickets") }}
                                </p>
                              </div>
                              <p class="text-gray-500 mt-2">
                                {{ $t("app.tickets.uploadDescription") }}
                              </p>
                            </router-link>
                          </li>
                          <li
                            v-if="whatsAppLink"
                            class="text-left text-gray-900 cursor-default select-none relative text-sm"
                            id="listbox-option-0"
                            role="option"
                          >
                            <button
                              :disabled="whatsAppLink"
                              :href="whatsAppLink"
                              @click="showUploadTickets = false"
                              class="text-left flex flex-col p-4 hover:bg-gray-50 w-full"
                            >
                              <div class="flex justify-between">
                                <p class="font-semibold">
                                  {{ $t("app.tickets.uploadTicketsWithPhone") }}
                                </p>
                              </div>
                              <p class="text-gray-500 mt-2">
                                {{
                                  $t(
                                    "app.tickets.uploadTicketsWithPhoneDescription"
                                  )
                                }}
                              </p>
                            </button>
                          </li>
                          <li
                            class="text-gray-900 cursor-default select-none relative text-sm"
                            role="option"
                          >
                            <router-link
                              :to="{ name: 'app.cfdis.upload' }"
                              @click.native="showUploadTickets = false"
                              class="flex flex-col p-4 hover:bg-gray-50"
                            >
                              <div class="flex justify-between">
                                <p class="font-semibold">
                                  {{ $t("app.cfdis.uploadCfdis") }}
                                </p>
                              </div>
                              <p class="text-gray-500 mt-2">
                                {{ $t("app.cfdis.uploadDescription") }}
                              </p>
                            </router-link>
                          </li>
                          <li
                            class="text-gray-900 cursor-default select-none relative text-sm"
                            role="option"
                          >
                            <router-link
                              :to="{ name: 'app.projects.new' }"
                              @click.native="showUploadTickets = false"
                              class="flex flex-col p-4 hover:bg-gray-50"
                            >
                              <div class="flex justify-between">
                                <p class="font-semibold">
                                  {{ $t("app.projects.create") }}
                                </p>
                              </div>
                              <p class="text-gray-500 mt-2">
                                {{ $t("app.projects.createDescription") }}
                              </p>
                            </router-link>
                          </li>

                          <li
                            v-if="isOwnerOrAdmin"
                            class="text-gray-900 cursor-default select-none relative text-sm"
                            role="option"
                          >
                            <router-link
                              :to="{ name: 'app.workspaces.new' }"
                              @click.native="showUploadTickets = false"
                              class="flex flex-col p-4 hover:bg-gray-50"
                            >
                              <div class="flex justify-between">
                                <p class="font-semibold">
                                  {{ $t("app.workspaces.create") }}
                                </p>
                              </div>
                              <p class="text-gray-500 mt-2">
                                {{ $t("app.workspaces.createDescription") }}
                              </p>
                            </router-link>
                          </li>
                        </ul>
                      </transition>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Profile dropdown -->
              <div class="relative" v-click-outside="closeDropdownUser">
                <div>
                  <button
                    v-on:click="dropDownUser = !dropDownUser"
                    class="rounded-full h-9 text-xs text-gray-600 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-rose-50 focus:ring-rose-50"
                    id="user-menu"
                    aria-label="User menu"
                    aria-haspopup="true"
                  >
                    <img
                      v-if="avatar"
                      class="inline-flex items-center justify-center h-9 w-9 rounded-full bg-blueGray-800"
                      :src="avatar"
                      alt
                    />
                    <span
                      v-else
                      class="inline-flex items-center justify-center h-9 w-9 rounded-full bg-blueGray-800"
                    >
                      <span class="font-medium leading-none text-white">{{
                        avatarText
                      }}</span>
                    </span>
                    <!-- <i class="fa fa-user rounded-sm" /> -->
                  </button>
                </div>

                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <div
                    v-show="dropDownUser"
                    class="z-50 origin-top-right absolute right-0 mt-2 w-48 rounded-sm shadow-lg"
                  >
                    <div
                      class="py-1 rounded-sm bg-white shadow-xs"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <a
                        class="truncate group flex items-center px-4 py-2 text-sm text-gray-700 font-medium transition ease-in-out duration-150"
                        role="menuitem"
                        >{{ profileName }}</a
                      >
                      <div class="border-t border-gray-300"></div>

                      <router-link
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition ease-in-out duration-150"
                        role="menuitem"
                        @click.native="closeDropdownUser"
                        :to="{ name: 'settings.tenant.subscription' }"
                        >{{ $t("app.navbar.tenant") }}</router-link
                      >
                      <router-link
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition ease-in-out duration-150"
                        role="menuitem"
                        @click.native="closeDropdownUser"
                        :to="{ name: 'settings.profile' }"
                        >{{ $t("app.navbar.profile") }}</router-link
                      >
                      <div class="border-t border-gray-300"></div>

                      <button
                        @click="logout"
                        class="text-left w-full block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 transition ease-in-out duration-150"
                        role="menuitem"
                      >
                        {{ $t("app.navbar.signOut") }}
                      </button>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>

        <main
          ref="mainElement"
          class="flex-1 focus:outline-none overflow-y-auto bg-gray-50"
          tabindex="0"
        >
          <tenant-subscription-status></tenant-subscription-status>
          <div :key="currentWorkspaceId" class="pb-20 sm:pb-0">
            <slot class=""></slot>
          </div>
          <tenant-new
            v-if="addingTenant"
            v-on:close="addingTenant = false"
            v-on:created="createdTenant"
          ></tenant-new>
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { mapGetters } from "vuex";
import TenantNew from "@/components/app/settings/tenant/TenantNew.vue";
import TenantSubscriptionStatus from "@/components/app/settings/tenant/subscription/TenantSubscriptionStatus.vue";
import Breadcrumb from "./Breadcrumb.vue";
import { SignalService } from "@/plugins/SignalR";
import { Prop, Watch } from "vue-property-decorator";
import { RouteConfig } from "vue-router";
import { SideBarItem } from "@/application/sidebar/SidebarItem";
import { SidebarGroup } from "@/application/sidebar/SidebarGroup";
import { AdminSidebar } from "@/application/sidebar/AdminSidebar";
import { AppSidebar } from "@/application/sidebar/AppSidebar";
import services from "../../services";
import { TenantDto } from "@/application/dtos/master/tenants/TenantDto";
import { SubscriptionProductDto } from "@/application/dtos/master/subscriptions/SubscriptionProductDto";
import { UserType } from "@/application/enums/master/users/UserType";
import { TenantUserRole } from "@/application/enums/master/tenants/TenantUserRole";
import WorkspaceSelector from "@/components/app/workspaces/WorkspaceSelector.vue";
import store from "@/store";

@Component({
  components: {
    TenantNew,
    TenantSubscriptionStatus,
    Breadcrumb,
    WorkspaceSelector
  },
  computed: {
    ...mapGetters("account", {
      profileName: "profileName",
      email: "email",
      avatarText: "avatarText",
      avatar: "avatar",
      isAdmin: "isAdmin"
    }),
    ...mapGetters("theme", {
      appTheme: "appTheme",
      appColor: "appColor"
    }),
    ...mapGetters("tenant", {
      activeProduct: "activeProduct",
      roleName: "roleName",
      currentRole: "currentRole",
      isOwnerOrAdmin: "isOwnerOrAdmin"
    })
  }
})
export default class AppLayout extends Vue {
  $refs!: {
    mainElement: HTMLElement;
  };
  @Prop()
  public layout!: string;
  private sidebarOpen: boolean = false;
  private dropDownTenantMobile: boolean = false;
  private dropDownTenantDesktop: boolean = false;
  private dropDownUser: boolean = false;
  private menu: SideBarItem[] = [];
  private expanded: number[] = [];
  private addingTenant: boolean = false;
  private appTheme!: string;
  private appColor!: string;
  private currentRole!: TenantUserRole;
  private showUploadTickets: boolean = false;
  private isOwnerOrAdmin!: boolean;
  private profileName!: string;
  private avatar!: string;
  private avatarText!: string;
  private whatsAppLink: string = "";
  private phone: string = "";
  private token: string = "";
  mounted() {
    if (this.layout === "admin") {
      this.menu = AdminSidebar;
      this.$store.commit("theme/appTheme", "theme-bg-light");
      this.$store.commit("theme/appColor", "theme-indigo");
    } else {
      this.menu = AppSidebar;
      this.$store.commit(
        "theme/appTheme",
        this.$store.state.tenant.current.appTheme ?? "theme-bg-dark"
      );
      this.$store.commit(
        "theme/appColor",
        this.$store.state.tenant.current.appColor
      );
      this.whatsAppLink = "";
      this.phone = process.env.VUE_APP_PHONE?.toString() ?? "";
      if (this.phone) {
        this.whatsAppLink += `https://wa.me/${this.phone}`;
      }
      if (this.token) {
        this.whatsAppLink += `?text=${this.token}`;
      }
    }
    this.menu.forEach(group => {
      group.items?.forEach((element, index) => {
        if (element.open) {
          this.expanded.push(index);
        } else {
          this.expanded = this.expanded.filter(f => f !== index);
        }
      });
    });
    this.showConversations();

    services.tenants.getAll();
    services.workspaces.getAllWorkspaces(true);

    SignalService.on("UserConnected", message => {
      console.log("[Message received] " + message);
      // alert(message);
    });
  }
  showConversations() {
    // @ts-ignore
    if (this.$intercom) {
      // @ts-ignore
      // this.$intercom.boot({
      //   user_id: this.$store.state.account.user.id,
      //   name: this.$store.state.account.user.firstName,
      //   email: this.$store.state.account.user.email,
      // });
      // this.$intercom.show();
    }
    // @ts-ignore
    if (this.$drift) {
      // @ts-ignore
      // this.$drift.identify(this.$store.state.account.user.id, {
      //   name: this.$store.state.account.user.firstName,
      //   email: this.$store.state.account.user.email,
      // });
      // this.$drift.show();
    }
  }
  logout() {
    this.$store.dispatch("auth/logout");
  }
  changeTenant(tenant: TenantDto) {
    this.closeDropdownTenant();
    services.users.updateDefaultTenant(tenant.id).then(() => {
      this.$router.go(0);
    });
  }
  closeShowUploadTickets() {
    this.showUploadTickets = false;
  }
  closeDropdownUser() {
    this.dropDownUser = false;
  }
  closeSidebar() {
    if (this.sidebarOpen) {
      this.sidebarOpen = false;
    }
  }
  closeDropdownTenant() {
    this.dropDownTenantMobile = false;
  }
  closeDropdownTenantDesktop() {
    this.dropDownTenantDesktop = false;
  }
  toggleMenuItem(index) {
    if (this.expanded.includes(index)) {
      this.expanded = this.expanded.filter(item => item !== index);
    } else {
      this.expanded.push(index);
    }
  }
  menuItemIsExpanded(index: number) {
    return this.expanded.includes(index);
  }
  translate(title) {
    return this.$t(title.trim());
  }
  addTenant() {
    this.sidebarOpen = false;
    this.closeDropdownTenantDesktop();
    this.addingTenant = true;
  }
  createdTenant() {
    this.addingTenant = false;
  }
  // addPricesToAdminSidebar(prices: SideBarItem) {
  //   prices.items = [];
  //   if (prices && this.products) {
  //     this.products.forEach((element: SubscriptionProductDto) => {
  //       const price: SideBarItem = {
  //         title: element.title,
  //         pathName: "/admin/products/" + element.id,
  //         items: []
  //       };
  //       if (element.id && price) {
  //         prices.items?.push(price);
  //       }
  //     });
  //     if (prices.items.length > 0) {
  //       prices.items.unshift({
  //         title: this.$t("shared.all"),
  //         name: "admin.products",
  //         items: []
  //       });
  //       // prices.open = true;
  //     }
  //   }
  // }
  addToBreadcrumb(items: any, route: RouteConfig) {
    if (route.path !== this.$route.path) {
      if (!items.some(f => f.link === route.path)) {
        items.push({
          name: route.meta?.title ?? "Untitled",
          link: route.path
        });
      }
    }
  }
  getPlanFromTenant(tenant: TenantDto): string {
    // console.log("getPlanFromTenant: " + JSON.stringify(tenant));
    if (
      tenant.products &&
      tenant.products.length > 0 &&
      tenant.products[0].subscriptionProduct
    ) {
      return tenant.products[0].subscriptionProduct.title;
    } else {
      if (tenant.subdomain === "admin") {
        return "Admin";
      } else {
        return this.$t("settings.tenant.subscription.notSubscribed").toString();
      }
    }
  }
  clickUploadTickets() {
    this.closeShowUploadTickets();
    this.$router.push({ name: "app.tickets.upload" });
  }
  get products(): SubscriptionProductDto[] {
    return this.$store.state.pricing.products as SubscriptionProductDto[];
  }
  get myTenants(): TenantDto[] {
    return this.$store.state.tenant.tenants;
  }
  get currentTenant(): TenantDto {
    return this.$store.state.tenant.current ?? { name: "Undefinded" };
  }
  get currentUserType(): UserType {
    return this.$store.state.account.user.type as UserType;
  }
  get bgPrimary() {
    if (this.$store.state.theme.appTheme === "theme-bg-dynamic") {
      return "bg-theme-900 text-blueGray-100";
    } else {
      return "bg-primary";
    }
  }
  get getMenu(): SidebarGroup[] {
    // if (this.layout === "admin" && this.menu.length > 0 && this.menu[0].items) {
    //   const prices: SideBarItem | undefined = this.menu[0].items.find(
    //     f => f.pathName === "admin.pricing"
    //   );
    //   if (prices) {
    //     prices.items = [];
    //     this.addPricesToAdminSidebar(prices);
    //   }
    // }
    const menu: SidebarGroup[] = [];
    this.menu.forEach(({ title, items, userTypes, userRoles }) => {
      if (
        (!userTypes || userTypes.includes(this.currentUserType)) &&
        (!userRoles || userRoles.includes(this.currentRole))
      ) {
        const validItems: SideBarItem[] = [];
        items.forEach(f => {
          if (
            (!f.userTypes || f.userTypes.includes(this.currentUserType)) &&
            (!f.userRoles || f.userRoles.includes(this.currentRole))
          ) {
            validItems.push(f);
          }
        });
        const addGroup: SidebarGroup = {
          title: title.toString(),
          items: validItems
        };
        if (addGroup.items.length > 0) {
          menu.push(addGroup);
        }
      }
    });
    return menu;
  }
  get currentWorkspaceId(): string {
    return store.state.tenant.currentWorkspace?.id ?? "";
  }
  @Watch("$route.path")
  scroll() {
    this.$refs.mainElement.scrollTo(0, 0);
  }
  // @Watch("$store.state.tenant.currentWorkspace")
  // changedWorkspace() {
  //   console.log("app.vue. changed workspace.");
  // }
}
</script>
