<template>
  <div class="pt-2 mx-auto px-8 md:px-8">
    <div class="z-40">
      <upload-tickets-drag-and-drop
        :uploaded="uploadedTickets"
        v-if="showSubirTickets"
        class="mb-8"
      ></upload-tickets-drag-and-drop>

      <div class="-mx-8">
        <Warning
          class="mx-4 -mt-0.5"
          v-if="!anyWorkspaces"
          :text="$t('app.workspaces.askAdminToAddYou')"
        />
        <div class="mx-4 flex items-center lg:space-y-0">
          <div class="flex-1">
            <h1 class="flex-1 text-lg font-medium flex items-center">
              <span v-if="onlyTickets">{{ $t("models.ticket.plural") }}</span>
              <span v-else>{{ $t("models.invoice.plural") }}</span>
            </h1>
          </div>
          <div class="flex items-end space-y-2 sm:space-y-0">
            <span
              class="relative sm:inline-flex rounded-sm w-full justify-between space-x-0"
            >
              <span
                class="w-full sm:w-auto relative inline-flex shadow-sm rounded-sm"
              >
                <button-sort
                  v-if="false"
                  ref="buttonSort"
                  v-on:sort="sortByColumn"
                  v-on:toggle="sortDirectionToggle"
                ></button-sort>
                <button
                  v-if="isAdmin && false"
                  @click="download()"
                  id="download"
                  type="button"
                  class="hidden md:inline-flex items-center rounded-sm w-full bg-white border border-gray-300 px-3 py-2 justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
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
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </button>
                <dropdown-simple-full-screen
                  ref="filtersDropdown"
                  :title="$t('app.shared.buttons.filter')"
                >
                  <template v-slot:icon>
                    <svg
                      class="h-5 w-5"
                      :class="
                        filtros.length > 0 ? 'text-gray-900' : 'text-gray-500'
                      "
                      xmlns="http://www.w3.org/2000/svg"
                      :fill="filtros.length > 0 ? 'currentColor' : 'none'"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                  </template>
                  <template v-slot:items>
                    <div
                      v-show="false"
                      class="block px-2 py-1 text-sm text-gray-700"
                      role="menuitem"
                    >
                      <transaction-type-select
                        ref="transactionTypeSelect"
                        :select-all="true"
                        v-on:selectType="selectType"
                      ></transaction-type-select>
                    </div>
                    <div
                      class="block px-2 py-1 text-sm text-gray-700"
                      role="menuitem"
                    >
                      <user-select
                        ref="userSelect"
                        :select-all="true"
                        preSelect="filterUserEmail"
                        v-on:selectUser="selectUser"
                        v-on:selectAllUsers="selectAllUsers"
                      ></user-select>
                    </div>
                    <!-- <div
                      class="block px-2 py-1 text-sm text-gray-700"
                      role="menuitem"
                    >
                      <company-select
                        ref="workspaceSelect"
                        :select-all="true"
                        :initial-selected="
                          filterWorkspaces ? filterWorkspaces : ''
                        "
                        v-on:selectWorkspace="selectWorkspace"
                        v-on:selectAllWorkspaces="selectAllWorkspaces"
                      ></company-select>
                    </div> -->
                    <div
                      v-show="false"
                      class="block px-2 py-1 text-sm text-gray-700"
                      role="menuitem"
                    >
                      <category-select
                        ref="categorySelect"
                        :select-all="true"
                        :preSelect="filterCategory ? filterCategory : ''"
                        v-on:selectItem="selectCategoria"
                        v-on:selectAllItems="selectAllCategories"
                      ></category-select>
                    </div>
                    <div
                      class="block px-2 py-1 text-sm text-gray-700"
                      role="menuitem"
                    >
                      <project-select
                        ref="projectSelect"
                        :select-all="true"
                        :preSelect="filterProjectId ? filterProjectId : ''"
                        v-on:selectProjectId="selectProjectId"
                        v-on:selectAllItems="selectAllProjects"
                      ></project-select>
                    </div>
                    <div
                      class="block px-2 py-1 text-sm text-gray-700"
                      role="menuitem"
                    >
                      <button
                        type="button"
                        @click="resetPageAndReload"
                        class="w-full flex justify-center items-center px-4 py-2 shadow-sm text-sm font-medium rounded-sm text-white bg-gray-800 hover:bg-gray-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                      >
                        {{ $t("app.shared.buttons.applyFilters") }}
                      </button>
                    </div>
                    <div
                      class="block px-2 py-1 pb-2 text-sm text-gray-700"
                      role="menuitem"
                    >
                      <button
                        type="button"
                        @click="clearFilters"
                        class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-sm bg-white focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                      >
                        {{ $t("app.shared.buttons.removeFilters") }}
                      </button>
                    </div>
                  </template>
                </dropdown-simple-full-screen>
                <button
                  v-if="onlyTickets"
                  @click="toggleItemStyle()"
                  id="toggle-item-style"
                  type="button"
                  class="items-center rounded-sm w-full bg-white border border-gray-300 px-3 py-2 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <svg
                    v-if="itemStyle === 1"
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
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <svg
                    v-if="itemStyle === 0"
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
                      d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
                <button
                  @click="reload()"
                  id="reload"
                  type="button"
                  class="items-center rounded-sm w-full bg-white border border-gray-300 px-3 py-2 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
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
            </span>
          </div>
        </div>

        <div v-if="onlyTickets && !loading">
          <div class="py-2 lg:py-0">
            <div class="lg:hidden mx-4">
              <label for="tabs" class="sr-only">{{
                $t("app.shared.selectors.status")
              }}</label>
              <select
                id="tabs"
                name="tabs"
                class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-sm"
                v-model="selectedStatus"
                @change="selectStatus($event.target.value)"
              >
                <option
                  v-for="(status, idxEstatus) in arrTicketGeneralStatus"
                  :key="idxEstatus"
                  :selected="status.value === selectedStatus"
                  :value="status.value"
                >
                  {{ status.name }}
                  <span
                    v-if="itemStyle !== 0 && status.value === selectedStatus"
                  >
                    ({{ countWithStatusSeleccionado }})</span
                  ><span v-else-if="itemStyle !== 0">
                    ({{ countWithStatus(status.value) }})</span
                  >
                </option>
              </select>
            </div>
            <div class="hidden lg:block">
              <div class="border-b border-gray-200">
                <nav class="-mb-px flex space-x-4 px-6" aria-label="Tabs">
                  <!-- Current: "border-rose-500 text-rose-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200" -->

                  <router-link
                    :to="'tickets?estatus=' + status.name.toLowerCase()"
                    v-for="(status, idxEstatus) in arrTicketGeneralStatus"
                    :key="idxEstatus"
                    @click.native="selectStatus(status.value)"
                    :class="[
                      {
                        'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 whitespace-nowrap py-3 px-0.5 border-b-2 font-medium text-sm':
                          status.value !== selectedStatus,
                        'border-rose-500 text-rose-600 whitespace-nowrap py-3 px-0.5 border-b-2 font-medium text-sm':
                          status.value === selectedStatus
                      },
                      status.class
                    ]"
                  >
                    {{ status.name }}
                    <span
                      v-if="itemStyle !== 0"
                      :class="{
                        'bg-gray-100 text-gray-900 hidden ml-1 py-0.5 px-2.5 rounded-sm text-xs font-medium md:inline-block':
                          status.value !== selectedStatus,
                        'bg-rose-100 text-rose-600 hidden ml-1 py-0.5 px-2.5 rounded-sm text-xs font-medium md:inline-block':
                          status.value === selectedStatus
                      }"
                      class=""
                      >{{ countWithStatus(status.value) }}</span
                    >
                  </router-link>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div v-if="loading" class="  ">
          <div class="h-auto w-full flex justify-center py-12">
            <div
              class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"
            ></div>
          </div>
        </div>
        <div v-else class="border-t border-gray-200 bg-gray-50">
          <div class="flex">
            <div class="w-full">
              <div
                class="col-span-3"
                :class="{
                  'min-h-screenn': !loading
                }"
              >
                <div>
                  <form
                    class=""
                    :class="{
                      'mt-2': onlyTransactions
                    }"
                  >
                    <label for="search" class="sr-only">{{
                      $t("shared.search")
                    }}</label>
                    <div class="relative">
                      <div
                        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                        aria-hidden="true"
                      >
                        <!-- Heroicon name: search -->
                        <svg
                          class="mr-3 h-4 w-4 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        :disabled="loading"
                        type="text"
                        name="search"
                        id="search"
                        class="border-0 focus:outline-none block w-full pl-9 text-xs sm:text-sm"
                        :class="loading ? 'bg-gray-50 cursor-not-allowed' : ''"
                        :placeholder="$t('shared.search')"
                        v-model="searchText"
                      />
                    </div>
                  </form>
                </div>
                <div
                  v-if="items.length === 0"
                  :class="{
                    'min-h-screenn': !loading
                  }"
                >
                  <div class="">
                    <div class="text-center flex flex-col justify-center">
                      <div
                        class="w-full flex items-center justify-center pt-16 border-t border-gray-200"
                      >
                        <div v-if="request.search">
                          <p>
                            {{ $t("shared.thereAreNo") }}
                            <span v-if="onlyTickets">{{
                              selectedStatusName
                            }}</span>
                            <span v-else>{{
                              $t("models.invoice.plural")
                                .toString()
                                .toLowerCase()
                            }}</span>
                          </p>
                          <button
                            type="button"
                            @click="clearSearch"
                            class="cursor-pointer text-theme-600 hover:text-gray-800"
                          >
                            {{ $t("app.shared.buttons.clearSearch") }}
                          </button>
                        </div>
                        <div v-else-if="filtros.length > 0">
                          <p>
                            {{ $t("shared.thereAreNo") }}
                            <span v-if="onlyTickets">{{
                              selectedStatusName
                            }}</span>
                            <span v-else>{{
                              $t("models.invoice.plural")
                                .toString()
                                .toLowerCase()
                            }}</span>
                          </p>
                          <button
                            type="button"
                            @click="clearFilters"
                            class="cursor-pointer text-theme-600 hover:text-gray-800"
                          >
                            {{ $t("app.shared.buttons.clearSearch") }}
                          </button>
                        </div>
                        <div v-else>
                          {{ $t("shared.thereAreNo") }}
                          <span v-if="onlyTickets">{{
                            selectedStatusName
                          }}</span>
                          <span v-else>{{
                            $t("models.transaction.plural")
                              .toString()
                              .toLowerCase()
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="items.length > 0">
                  <div
                    class="sticky top-0 w-full py-1 text-xs px-6 bg-gray-50 border border-gray-100"
                  >
                    <div class="flex-1 flex sm:items-center sm:justify-between">
                      <div class="w-2/3">
                        <div class="text-gray-700 flex items-center space-x-1">
                          <div>{{ $t("shared.showing") }}</div>

                          <div class="font-bold">{{ items.length }}</div>
                          <div>
                            {{ onlyTickets ? "tickets" : "transactions" }}
                          </div>
                          <div class="font-bold">
                            (${{ totalItems | intFormat }})
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="grid grid-cols-4 gap-2">
                    <div class="col-span-4">
                      <div class="sm:rounded-sm">
                        <ul
                          v-if="itemStyle === 1 || !onlyTickets"
                          class="border-t border-gray-100 pb-14"
                        >
                          <li
                            v-for="(item, index) in items"
                            :key="index"
                            class="hover:bg-gray-100 bg-white border border-gray-100"
                          >
                            <router-link
                              :to="itemUrl(item)"
                              class="cursor-pointer w-full focus:z-10 focus:outline-none"
                            >
                              <ticket-item
                                v-if="itemStyle === 0 && item.ticket"
                                v-bind="item.ticket"
                                :allowShowDetails="true"
                              ></ticket-item>
                              <ticket-table-item
                                v-if="itemStyle === 1 && item.ticket"
                                v-bind="item.ticket"
                                :allowShowDetails="false"
                                :admin="admin"
                              ></ticket-table-item>
                              <transaction-item
                                v-if="itemStyle === 0 && item.transaction"
                                v-bind="item.transaction"
                                :allowShowDetails="true"
                              ></transaction-item>
                              <transaction-table-item
                                v-if="itemStyle === 1 && item.transaction"
                                v-bind="item.transaction"
                                :allowShowDetails="false"
                                :admin="admin"
                              ></transaction-table-item>
                            </router-link>
                          </li>
                        </ul>
                        <ul
                          v-else-if="itemStyle === 0 && onlyTickets"
                          role="list"
                          class="p-4 grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 xl:gap-x-8 pb-14"
                        >
                          <router-link
                            :to="itemUrl(item)"
                            v-for="(item, index) in items"
                            :key="index"
                            class="relative"
                          >
                            <div
                              class="shadow-lg border border-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 group block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden"
                            >
                              <img
                                :src="item.ticket.thumbnail"
                                alt=""
                                class="group-hover:opacity-75 object-cover pointer-events-none"
                              />
                              <div class="absolute inset-0">
                                <span class="sr-only"
                                  >{{ $t("app.shared.buttons.viewDetails") }}
                                  {{ $t("models.ticket.object") }} #{{
                                    item.ticket.number
                                  }}</span
                                >
                              </div>
                            </div>
                            <div
                              class="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none flex items-center space-x-1 justify-between"
                            >
                              <div class="font-bold">
                                #{{ item.ticket.number }}
                              </div>
                              <div>{{ item.ticket.legalName }}</div>
                            </div>
                            <div
                              class="block text-sm font-medium text-gray-500 pointer-events-none flex items-center justify-between"
                            >
                              <div
                                class="flex items-center space-x-1 text-xs font-light truncate"
                              >
                                <div
                                  v-if="
                                    item.ticket.project &&
                                      item.ticket.project.name
                                  "
                                  class="h-2 w-2 rounded-full"
                                  :class="
                                    projectColor(item.ticket.project.color)
                                  "
                                ></div>
                                <div
                                  class="truncate"
                                  v-if="
                                    item.ticket.project &&
                                      item.ticket.project.name
                                  "
                                >
                                  {{ item.ticket.project.name }}
                                </div>
                                <div v-else class="text-gray-300 truncate">
                                  --
                                  {{
                                    $t("app.projects.notDefined")
                                      .toString()
                                      .toLowerCase()
                                  }}
                                  --
                                </div>
                              </div>
                              <div>
                                ${{ item.ticket.possibleTotal | intFormat }}
                              </div>
                            </div>
                          </router-link>
                        </ul>
                      </div>
                    </div>
                    <div
                      v-if="false"
                      :class="
                        selection
                          ? 'col-span-4 sm:col-span-2 md:col-span-2 min-h-screenn'
                          : 'col-span-0'
                      "
                    >
                      <transition
                        enter-active-class="transition ease-out duration-100"
                        enter-class="transform opacity-0 scale-95"
                        enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95"
                      >
                        <div
                          v-if="selection"
                          class="bg-white shadow overflow-hidden sm:rounded-sm"
                        ></div>
                      </transition>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="!loading"
          class="absolute w-full bottom-0 bg-gray-50 border-l border-b border-r border-gray-200 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
        >
          <div v-if="false" class="flex-1 flex justify-between sm:hidden">
            <button
              :disabled="!previousPageEnabled"
              type="button"
              @click="addPage(-1)"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
              :class="{
                'bg-gray-100 hover:text-gray-500 cursor-not-allowed': !previousPageEnabled,
                'hover:text-gray-500': previousPageEnabled
              }"
            >
              {{ $t("shared.previous") }}
            </button>
            <button
              :disabled="!nextPageEnabled"
              type="button"
              @click="addPage(1)"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white"
              :class="{
                'bg-gray-100 hover:text-gray-500 cursor-not-allowed': !nextPageEnabled,
                'hover:text-gray-500': nextPageEnabled
              }"
            >
              {{ $t("shared.next") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <router-view v-on:closed="closedDetails"></router-view>

    <new-modal maxSize="sm:max-w-xs" ref="newOptionsModal">
      <div class="bg-white">
        <button
          type="button"
          @click="$router.push({ name: 'app.tickets.upload' })"
          class="mt-2 w-full border border-gray-200 rounded-sm hover:bg-gray-200 bg-gray-100 h-10 text-gray-800 font-medium"
        >
          {{ $t("app.tickets.uploadTickets") }}
        </button>
        <button
          type="button"
          @click="$router.push({ name: 'app.cfdis.upload' })"
          class="mt-2 w-full border border-gray-200 rounded-sm hover:bg-gray-200 bg-gray-100 h-10 text-gray-800 font-medium"
        >
          {{ $t("app.cfdis.uploadCfdis") }}
        </button>
      </div>
    </new-modal>

    <modal
      ref="uploadTicketsModal"
      :title="$t('app.tickets.uploadYourTickets')"
      size="2xl"
    >
      <upload-tickets></upload-tickets>
    </modal>

    <error-modal ref="errorModal"></error-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import BaseComponent from "../../shared/BaseComponent.vue";
import ObjectList from "../../shared/forms/ObjectList.vue";
import TableRowSkeleton from "../../shared/skeletons/TableRowSkeleton.vue";
import SvgResultsEmpty from "../../../assets/img/ResultsEmpty.vue";
import SideModal from "../../shared/modals/SideModal.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import PageTitle from "../../shared/navigation/PageTitle.vue";
import Modal from "../../shared/modals/Modal.vue";
import NewModal from "../../shared/modals/NewModal.vue";
import UploadTicketsDragAndDrop from "../../../views/app/tickets/UploadTicketsDragAndDrop.vue";
import TicketItem from "../../../views/app/tickets/TicketItem.vue";
import TicketTableItem from "../../../views/app/tickets/TicketTableItem.vue";
import TransactionItem from "@/views/app/tickets/TransactionItem.vue";
import TransactionTableItem from "@/views/app/tickets/TransactionTableItem.vue";
import TicketItemDetails from "@/views/app/tickets/TicketItemDetails.vue";
import TransactionItemDetails from "@/views/app/tickets/TransactionItemDetails.vue";
import UserSelect from "@/components/app/selectors/UserSelect.vue";
import WorkspaceSelect from "@/components/app/selectors/WorkspaceSelect.vue";
import CategorySelect from "@/components/app/selectors/CategorySelect.vue";
import TransactionTypeSelect from "@/components/app/selectors/TransactionTypeSelect.vue";
import ButtonSort from "@/components/shared/buttons/ButtonSort.vue";
import DropdownSimpleFullScreen from "@/components/shared/dropdowns/DropdownSimpleFullScreen.vue";
import QuicklinksTransactionsSummary from "@/components/app/widgets/QuicklinksTransactionsSummary.vue";
import { Prop } from "vue-property-decorator";
import ProjectSelect from "../selectors/ProjectSelect.vue";
import { mapGetters } from "vuex";
import ErrorModalComponent from "@/components/shared/modals/NewErrorModal.vue";
import Warning from "@/components/shared/banners/Warning.vue";
import { TransactionDto } from "@/application/dtos/app/transactions/TransactionDto";
import { TicketDto } from "@/application/dtos/app/transactions/TicketDto";
import * as projectHelpers from "@/application/modules/projects/ProjectHelpers";
import { GetTransactionOrTicketFilter } from "@/application/enums/app/transactions/GetTransactionOrTicketFilter";
import { TransactionOrTicketDto } from "@/application/dtos/app/transactions/TransactionOrTicketDto";
// tslint:disable-next-line: max-line-length
import { TransactionOrTicketQueryResult } from "@/application/contracts/app/transactions/TransactionOrTicketQueryResult";
import { TicketStatus } from "@/application/enums/app/transactions/TicketStatus";
import { WhoInvoices } from "@/application/enums/app/cfdis/WhoInvoices";
import { GetTransactionsOrTicketsRequest } from "@/application/contracts/app/tickets/GetTransactionsOrTicketsRequest";
import { TicketGeneralStatus } from "@/application/enums/app/transactions/TicketGeneralStatus";
import { WorkspaceDto } from "@/application/dtos/app/workspaces/WorkspaceDto";
import store from "@/store";

@Component({
  components: {
    QuicklinksTransactionsSummary,
    TransactionItem,
    TransactionTableItem,
    TicketItem,
    TicketTableItem,
    UploadTicketsDragAndDrop,
    Modal,
    SideModal,
    ObjectList,
    TableRowSkeleton,
    SvgResultsEmpty,
    ErrorModal,
    Warning,
    PageTitle,
    TicketItemDetails,
    TransactionItemDetails,
    NewModal,
    UserSelect,
    WorkspaceSelect,
    CategorySelect,
    ProjectSelect,
    TransactionTypeSelect,
    ButtonSort,
    DropdownSimpleFullScreen
  },
  computed: {
    ...mapGetters("account", {
      isAdmin: "isAdmin"
    })
  }
})
export default class TransactionsList extends BaseComponent {
  @Prop({ default: false }) admin!: boolean;
  @Prop({ default: false }) onlyTickets!: boolean;
  @Prop({ default: false }) onlyTransactions!: boolean;
  $refs!: {
    uploadTicketsModal: Modal;
    itemDetails: Modal;
    newOptionsModal: Modal;
    buttonSort: ButtonSort;
    userSelect: UserSelect;
    workspaceSelect: WorkspaceSelect;
    categorySelect: CategorySelect;
    projectSelect: ProjectSelect;
    transactionTypeSelect: TransactionTypeSelect;
    filtersDropdown: DropdownSimpleFullScreen;
    errorModal: ErrorModalComponent;
  };
  public searchText: string = "";
  private isAdmin!: boolean;

  private showSubirTickets: boolean = false;
  private dropDownNew: boolean = false;

  private queryResult: TransactionOrTicketQueryResult = {
    totalItems: 0,
    currentPage: 0,
    totalPages: 0,
    pageSize: 0,
    from: 0,
    to: 0,
    items: []
  };
  private selected = {} as TransactionOrTicketDto;
  private filterWorkspaces: string = "";
  private filterUserEmail: string = "";
  private filterTenantId?: string = undefined;
  private filterStatus: TicketStatus[] = [];
  private filterTransactionsOrTickets: GetTransactionOrTicketFilter =
    GetTransactionOrTicketFilter.ALL_TRANSACTIONS;
  private filterCustomerTaxId: string = "";
  private filterSupplierTaxId: string = "";
  private filterCategory: string = "";
  private filterProjectId: string = "";
  private request = {} as GetTransactionsOrTicketsRequest;
  private itemStyle: number = 1;
  private selectedStatus: TicketGeneralStatus = TicketGeneralStatus.PENDING;
  private arrTicketGeneralStatus: any[] = [
    { value: 0, name: this.$t("app.tickets.statusPlural.PENDING") },
    { value: 1, name: this.$t("app.tickets.statusPlural.INVALID") },
    { value: 2, name: this.$t("app.tickets.statusPlural.INVOICED") }
  ];
  created() {
    this.resetQueryResults();

    if (this.$route.query.tipo) {
      if (this.$route.query.tipo.includes("todo")) {
        this.filterTransactionsOrTickets =
          GetTransactionOrTicketFilter.TICKETS_AND_TRANSACTIONS;
      } else if (this.$route.query.tipo.includes("ticket")) {
        this.filterTransactionsOrTickets = GetTransactionOrTicketFilter.TICKETS;
      } else if (this.$route.query.tipo.includes("ingreso")) {
        this.filterTransactionsOrTickets = GetTransactionOrTicketFilter.INCOME;
      } else if (this.$route.query.tipo.includes("egreso")) {
        this.filterTransactionsOrTickets = GetTransactionOrTicketFilter.EXPENSE;
      }
      // this.$refs.transactionTypeSelect.selected = this.filterTransactionsOrTickets;
    }

    if (this.$route.query.cliente) {
      this.filterCustomerTaxId = this.$route.query.cliente.toString();
    }

    if (this.$route.query.proveedor) {
      this.filterSupplierTaxId = this.$route.query.proveedor.toString();
    }

    if (this.$route.query.categoria) {
      this.filterCategory = this.$route.query.categoria.toString();
    }

    if (this.$route.query.proyecto) {
      this.filterProjectId = this.$route.query.proyecto.toString();
    }

    if (this.$route.query.estatus) {
      if (this.$route.query.estatus.includes("pendiente")) {
        this.filterStatus = [TicketStatus.PENDING, TicketStatus.REQUESTED];
        this.selectedStatus = TicketGeneralStatus.PENDING;
      } else if (
        this.$route.query.estatus.includes("invalido") ||
        this.$route.query.estatus.includes("inválido") ||
        this.$route.query.estatus.includes("error")
      ) {
        this.filterStatus = [
          TicketStatus.DUPLICATED,
          TicketStatus.UNREADABLE,
          TicketStatus.EXPIRED,
          TicketStatus.INVALID
        ];
        this.selectedStatus = TicketGeneralStatus.INVALID;
      } else if (
        this.$route.query.estatus.includes("completado") ||
        this.$route.query.estatus.includes("facturado")
      ) {
        this.filterStatus = [TicketStatus.INVOICED];
        this.selectedStatus = TicketGeneralStatus.INVOICED;
      }
    }

    if (this.$route.query.usuario) {
      this.filterUserEmail = this.$route.query.usuario.toString();
    }

    if (this.$route.query.empresa) {
      this.filterWorkspaces = this.$route.query.empresa.toString();
    }

    this.queryResult.currentPage = 1;
    this.queryResult.pageSize = 40;
  }
  mounted() {
    window.scrollTo(0, 0);
    this.reload();
  }
  resetPageAndReload() {
    this.queryResult.currentPage = 1;
    this.reload();
  }
  clearSearch() {
    this.request.search = "";
    this.reload();
  }
  clearFilters() {
    this.$refs.transactionTypeSelect.selected = 0;
    // this.$refs.workspaceSelect.selected = 0;
    this.$refs.userSelect.selected = 0;
    this.$refs.categorySelect.selected = 0;
    this.$refs.projectSelect.selected = 0;

    this.filterWorkspaces = "";
    this.filterUserEmail = "";
    this.filterTenantId = undefined;
    this.filterStatus = [];
    this.filterCustomerTaxId = "";
    this.filterSupplierTaxId = "";
    this.filterCategory = "";
    this.filterProjectId = "";
    console.log("clear filters");

    this.filterTransactionsOrTickets =
      GetTransactionOrTicketFilter.ALL_TRANSACTIONS;
    this.resetPageAndReload();
    this.reload();
  }
  updateRequestValues() {
    this.request.tenantId = this.filterTenantId;
    if (!this.admin && this.currentWorkspace) {
      this.request.workspaceId = this.currentWorkspace.id;
    }
    this.request.filter = this.filterTransactionsOrTickets;
    this.request.ticketStatus = this.selectedStatus;
    this.request.createdByUserId = this.filterUserEmail;
    this.request.customerId = this.filterCustomerTaxId;
    this.request.supplierId = this.filterSupplierTaxId;
    this.request.category = this.filterCategory;
    this.request.projectId = this.filterProjectId;
    this.request.whoInvoices = undefined;

    if (this.itemStyle === 0) {
      this.request.withImage = this.itemStyle === 0 && this.onlyTickets;
    } else {
      this.request.ticketStatus = undefined;
    }

    this.request.onlyPendingTickets = false;
    if (
      this.filterTransactionsOrTickets === GetTransactionOrTicketFilter.TICKETS
    ) {
      this.request.onlyPendingTickets = false;
    }

    this.request.sortBy = this.sortBy;
    this.request.isSortAscending = this.sortDirection === 1;

    this.request.pageSize = this.queryResult.pageSize;
    this.request.page = this.queryResult.currentPage;

    this.queryResult.totalItems = 0;
    this.queryResult.totalPages = 0;
    this.queryResult.from = 0;
    this.queryResult.to = 0;
    let tipo = "todos";
    if (this.request.filter === GetTransactionOrTicketFilter.TICKETS) {
      tipo = "tickets";
    } else if (this.request.filter === GetTransactionOrTicketFilter.INCOME) {
      tipo = "ingresos";
    } else if (this.request.filter === GetTransactionOrTicketFilter.EXPENSE) {
      tipo = "egresos";
    }

    if (this.onlyTickets) {
      this.request.filter = GetTransactionOrTicketFilter.TICKETS;
    }
    if (this.onlyTransactions) {
      this.request.filter = GetTransactionOrTicketFilter.ALL_TRANSACTIONS;
    }
  }
  selectStatus(status) {
    this.selectedStatus = Number(status);
    if (this.request.ticketStatus) {
      this.reload();
    }
  }
  countWithStatus(status: number) {
    const arrStatus = this.ticketStatusFromGeneralStatus(status);
    return (
      this.queryResult.items.filter(f => arrStatus.includes(f.ticket?.status))
        ?.length ?? 0
    );
  }
  ticketStatusFromGeneralStatus(status: number) {
    switch (status) {
      case 0:
        return [0, 1];
      case 1:
        return [3, 4, 5, 6];
      case 2:
        return [2];
    }
    return [];
  }
  resetQueryResults() {
    this.queryResult = {
      pageSize: 10,
      currentPage: 1,
      totalItems: 0,
      totalPages: 0,
      from: 0,
      to: 0,
      items: []
    };
  }
  async download() {
    this.updateRequestValues();

    this.$refs.filtersDropdown.close();
    this.selected = {} as TransactionOrTicketDto;
    this.showSubirTickets = false;
    this.loading = true;
    this.services.tickets
      .downloadAll()
      .then((response: any) => {
        const disposition = response.headers["content-disposition"];
        let fileName = "";

        if (disposition && disposition.indexOf("attachment") !== -1) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1]) {
            fileName = matches[1].replace(/['"]/g, "");
          }
        }
        const type: string = "application/zip";
        const fileUrl = window.URL.createObjectURL(
          new Blob([response.data], { type })
        );
        const fileLink = document.createElement("a");
        fileLink.href = fileUrl;
        fileLink.setAttribute("download", fileName);
        document.body.appendChild(fileLink);
        fileLink.click();
      })
      .catch(error => {
        this.$refs.errorModal.show(error);
      })
      .finally(() => {
        this.loading = false;
      });
  }
  async reload() {
    this.updateRequestValues();

    this.$refs.filtersDropdown.close();
    this.selected = {} as TransactionOrTicketDto;
    this.showSubirTickets = false;
    // this.resetQueryResults();

    this.loading = true;

    // this.request = {
    //   tenantId: this.filterTenantId,
    //   filtro: this.filterTransactionsOrTickets,
    //   estatusDeTicket: this.filterStatus,
    //   createdByUserEmail: this.filterUserEmail,
    //   empresaRfc: this.filterEmpresa,
    //   search: this.search,
    //   sortBy: this.sortBy,
    //   isSortAscending: this.sortDirection === 1,
    //   page: this.page,
    //   pageSize: this.pageSize
    // };

    this.services.transactionsOrTickets
      .getAllTransactionsOrTickets(this.request, this.admin)
      .then((response: TransactionOrTicketQueryResult) => {
        this.queryResult = response;
      })
      .catch(error => {
        this.$refs.errorModal.show(error);
      })
      .finally(() => {
        this.loading = false;
      });
  }
  showNewOptionsModal() {
    this.$refs.newOptionsModal.show();
  }
  showUploadsTickets() {
    this.$refs.uploadTicketsModal.show();
  }
  // deleted(data: TicketDto) {
  //   this.items = this.items.filter((f) => f.id !== data.id);
  // }
  // canceled() {
  //   // console.log("canceled");
  // }
  // added(data: TicketDto) {
  //   // console.log("added data:" + JSON.stringify(data));
  //   this.items.push(data);
  // }
  // saved(data: TicketDto) {
  //   const idx = this.items.findIndex((f) => f.id === data.id);
  //   this.items[idx] = data;
  // }
  closeDropDownNew() {
    this.dropDownNew = false;
  }
  sortByColumn(column: string) {
    this.$refs.buttonSort.sortBy = column;
  }
  sortDirectionToggle() {
    // this.$refs.buttonSort.sortDirection = column;
    if (this.$refs.buttonSort.sortDirection === 1) {
      this.$refs.buttonSort.sortDirection = -1;
    } else {
      this.$refs.buttonSort.sortDirection = 1;
    }
    // console.log("[toggle] sortDirection: " + this.sortDirection);
  }
  uploadedTickets() {
    this.showSubirTickets = false;
    this.reload();
  }
  itemUrl(item: TransactionOrTicketDto) {
    if (this.onlyTickets) {
      return "tickets/" + item.ticket.id;
    } else {
      if (item.transaction.ticketId) {
        return "facturas/" + item.transaction.ticketId + "/ticket";
      }
      return "facturas/" + item.transaction.id + "/editar";
    }
  }
  select(item: TransactionOrTicketDto) {
    this.selected = {} as TransactionOrTicketDto;
    this.selected = item;
  }
  closedDetails(type: number, id: string, deleted: boolean = false) {
    if (deleted) {
      this.reload();
      return;
    }
    if (type === 0) {
      const idx = this.queryResult.items.findIndex(f => f.ticket?.id === id);
      this.services.tickets
        .getTicket(id, this.isAdmin)
        .then((response: TicketDto) => {
          this.queryResult.items[idx].ticket = response;
        });
    } else if (type === 1) {
      const idx = this.queryResult.items.findIndex(
        f => f.transaction?.id === id
      );
      this.services.transactions.get(id).then((response: TransactionDto) => {
        this.queryResult.items[idx].transaction = response;
      });
    }
  }
  deletedItem() {
    this.reload();
  }
  subirTickets() {
    this.dropDownNew = false;
    this.showSubirTickets = true;
  }
  selectUser(userId: string) {
    this.filterUserEmail = userId;
  }
  selectAllUsers() {
    this.filterUserEmail = "";
  }
  selectWorkspace(id: string) {
    this.filterWorkspaces = id;
  }
  selectAllWorkspaces() {
    this.filterWorkspaces = "";
  }
  selectCategoria(value: string) {
    this.filterCategory = value;
  }
  selectAllCategories() {
    this.filterCategory = "";
  }
  selectProjectId(value: string) {
    this.filterProjectId = value;
  }
  selectAllProjects() {
    this.filterProjectId = "";
  }
  selectType(type: GetTransactionOrTicketFilter) {
    this.filterTransactionsOrTickets = type;
  }
  addPage(add) {
    this.queryResult.currentPage += add;
    this.reload();
  }
  goToPage(page) {
    this.queryResult.currentPage = page;
    this.reload();
  }
  changedPage(page) {
    this.queryResult.currentPage = page;
    this.reload();
  }
  toggleItemStyle() {
    if (this.itemStyle === 0) {
      this.itemStyle = 1;
      this.queryResult.pageSize = 40;
    } else {
      this.itemStyle = 0;
      this.queryResult.pageSize = 20;
    }
    this.reload();
  }
  selectGroupByValue(value) {
    //
  }
  projectColor(color) {
    return projectHelpers.getProjectColor(color);
  }
  get workspaces() {
    return store.state.tenant.workspaces;
  }
  get anyWorkspaces() {
    return this.workspaces && this.workspaces.length > 0;
  }
  get currentWorkspace(): WorkspaceDto | null {
    return store.state.tenant.currentWorkspace;
  }
  get countWithStatusSeleccionado() {
    return (
      this.queryResult.items.filter(f =>
        this.selectedStatuss.includes(f.ticket?.status)
      )?.length ?? 0
    );
  }
  get selectedStatusName() {
    return this.$t(
      "app.tickets.statusPlural." + TicketGeneralStatus[this.selectedStatus]
    )
      .toString()
      .toLowerCase();
  }
  get totalItems() {
    let total = 0;
    if (this.onlyTickets) {
      this.items.forEach(item => {
        if (item.ticket?.transactions && item.ticket?.transactions.length > 0) {
          total += item.ticket.transactions[0].total;
        } else if (item.ticket.possibleTotal) {
          total += item.ticket.possibleTotal;
        }
      });
    } else {
      this.items.forEach(item => {
        total += item.transaction.total;
      });
    }
    return total;
  }
  get items() {
    if (this.onlyTickets) {
      return this.queryResult.items
        .filter(
          f =>
            (this.selectedStatuss.length === 0 ||
              this.selectedStatuss.includes(f.ticket?.status)) &&
            ((f.companyTaxId &&
              f.companyTaxId
                .toLowerCase()
                .includes(this.searchText.toLowerCase())) ||
              (f.companyName &&
                f.companyName
                  .toLowerCase()
                  .includes(this.searchText.toLowerCase())) ||
              (f.companyLegalName &&
                f.companyLegalName
                  .toLowerCase()
                  .includes(this.searchText.toLowerCase())) ||
              (f.ticket.createdByUser &&
                f.ticket.createdByUser?.firstName &&
                f.ticket.createdByUser?.firstName
                  .toLowerCase()
                  .includes(this.searchText.toLowerCase())) ||
              (f.ticket.createdByUser &&
                f.ticket.createdByUser?.lastName &&
                f.ticket.createdByUser?.lastName
                  .toLowerCase()
                  .includes(this.searchText.toLowerCase())) ||
              (f.ticket.createdByUser &&
                f.ticket.createdByUser?.email &&
                f.ticket.createdByUser?.email
                  .toLowerCase()
                  .includes(this.searchText.toLowerCase())) ||
              (f.ticket.possibleWebsite &&
                f.ticket.possibleWebsite
                  .toLowerCase()
                  .includes(this.searchText.toLowerCase())) ||
              (f.ticket.legalName &&
                f.ticket.legalName
                  .toLowerCase()
                  .includes(this.searchText.toLowerCase())) ||
              (f.ticket.tenant &&
                f.ticket.tenant.name &&
                f.ticket.tenant.name
                  .toLowerCase()
                  .includes(this.searchText.toLowerCase())) ||
              (f.ticket.project &&
                f.ticket.project.name &&
                f.ticket.project.name
                  .toLowerCase()
                  .includes(this.searchText.toLowerCase())))
        )
        .sort((x, y) => {
          return x.createdAt > y.createdAt ? -1 : 1;
        });
    } else {
      return this.queryResult.items
        .filter(
          f =>
            (f.companyTaxId &&
              f.companyTaxId
                .toLowerCase()
                .includes(this.searchText.toLowerCase())) ||
            (f.companyName &&
              f.companyName
                .toLowerCase()
                .includes(this.searchText.toLowerCase())) ||
            (f.companyLegalName &&
              f.companyLegalName
                .toLowerCase()
                .includes(this.searchText.toLowerCase())) ||
            (f.issuerLegalName &&
              f.issuerLegalName
                .toLowerCase()
                .includes(this.searchText.toLowerCase())) ||
            (f.issuerTaxId &&
              f.issuerTaxId
                .toLowerCase()
                .includes(this.searchText.toLowerCase())) ||
            (f.receiverLegalName &&
              f.receiverLegalName
                .toLowerCase()
                .includes(this.searchText.toLowerCase())) ||
            (f.receiverTaxId &&
              f.receiverTaxId
                .toLowerCase()
                .includes(this.searchText.toLowerCase())) ||
            (f.transaction.createdByUser &&
              f.transaction.createdByUser?.firstName &&
              f.transaction.createdByUser?.firstName
                .toLowerCase()
                .includes(this.searchText.toLowerCase())) ||
            (f.transaction.createdByUser &&
              f.transaction.createdByUser?.lastName &&
              f.transaction.createdByUser?.lastName
                .toLowerCase()
                .includes(this.searchText.toLowerCase())) ||
            (f.transaction.createdByUser &&
              f.transaction.createdByUser?.email &&
              f.transaction.createdByUser?.email
                .toLowerCase()
                .includes(this.searchText.toLowerCase())) ||
            (f.transaction.tenant &&
              f.transaction.tenant.name &&
              f.transaction.tenant.name
                .toLowerCase()
                .includes(this.searchText.toLowerCase())) ||
            (f.transaction.project &&
              f.transaction.project.name &&
              f.transaction.project.name
                .toLowerCase()
                .includes(this.searchText.toLowerCase())) ||
            (f.transaction.category &&
              f.transaction.category
                .toLowerCase()
                .includes(this.searchText.toLowerCase()))
        )
        .sort((x, y) => {
          return x.createdAt > y.createdAt ? -1 : 1;
        });
    }
  }
  get selectedStatuss(): number[] {
    switch (this.selectedStatus) {
      case 0:
        return [0, 1];
      case 1:
        return [3, 4, 5, 6];
      case 2:
        return [2];
    }
    return [];
  }
  get previousPageEnabled() {
    return this.queryResult.currentPage > 1;
  }
  get nextPageEnabled() {
    return this.queryResult.currentPage < this.queryResult.totalPages;
  }
  get filtros(): string[] {
    const arr: string[] = [];
    if (this.filterWorkspaces) {
      arr.push("empresa " + this.filterWorkspaces);
    }
    if (this.filterUserEmail) {
      arr.push("usuario " + this.filterUserEmail);
    }
    if (this.filterCategory) {
      arr.push("categoría " + this.filterCategory);
    }
    // console.log("filtros: " + JSON.stringify(arr));
    return arr;
  }
  get selection(): boolean {
    // return false;
    if (this.selected.ticket) {
      return true;
    } else if (this.selected.transaction) {
      return true;
    } else {
      return false;
    }
  }
  get tickets(): TicketDto[] {
    return this.queryResult.items.filter(f => f.ticket).map(f => f.ticket);
  }
  get transactions(): TransactionDto[] {
    return this.queryResult.items
      .filter(f => f.transaction)
      .map(f => f.transaction);
  }
  // get orderedTransactions(): TransactionDto[] {
  //   if (!this.transactions) {
  //     return [];
  //   }
  //   // console.log("[get] sortDirection: " + this.sortDirection);
  //   // console.log("[get] sortBy: " + this.sortBy);
  //
  //   const direction1 = this.sortDirection;
  //   const direction2 = direction1 === 1 ? -1 : 1;
  //   return this.transactions.sort((x, y) => {
  //     if(!this.sortBy || this.sortBy === 'Fecha subido') {
  //       if (x.createdAt && y.createdAt) {
  //         return (x.createdAt > y.createdAt ? direction1 : direction2) ?? direction2;
  //       }
  //     } else if(this.sortBy === "Usuario"){
  //       if(x.createdByUser && y.createdByUser) {
  //         return (x.createdByUser.firstName > y.createdByUser.firstName ? direction1 : direction2) ?? direction2;
  //       }
  //     }
  //     return direction2;
  //   });
  // }
  get sortDirection() {
    return -1;
    // return this.$refs.buttonSort.sortDirection;
  }
  get sortBy() {
    return "Fecha subido";
    // return this.$refs.buttonSort.sortBy;
  }
  get orderedItems() {
    // return this.queryResult.items
    if (!this.queryResult.items) {
      return [];
    }
    // console.log("[get] sortDirection: " + this.sortDirection);
    // console.log("[get] sortBy: " + this.sortBy);

    const direction1 = this.sortDirection;
    const direction2 = direction1 === 1 ? -1 : 1;
    return this.queryResult.items.sort((x, y) => {
      if (!this.sortBy || this.sortBy === "Fecha modificado") {
        if (x.modifiedAt && y.modifiedAt) {
          return (
            (x.modifiedAt > y.modifiedAt ? direction1 : direction2) ??
            direction2
          );
        }
      } else if (!this.sortBy || this.sortBy === "Fecha subido") {
        if (x.createdAt && y.createdAt) {
          return (
            (x.createdAt > y.createdAt ? direction1 : direction2) ?? direction2
          );
        }
      } else if (this.sortBy === "Empresa") {
        return (
          (x.companyTaxId > y.companyTaxId ? direction1 : direction2) ??
          direction2
        );
      } else if (this.sortBy === "Usuario") {
        if (x.createdByUserName && y.createdByUserName) {
          return (
            (x.createdByUserName > y.createdByUserName
              ? direction1
              : direction2) ?? direction2
          );
        }
      }
      return direction2;
    });
  }
}
</script>

<style scoped>
.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
