<template>
  <div>
    <main class="flex-1 relative pb-8 z-0 overflow-y-auto">
      <!-- Page header -->
      <div
        v-if="true"
        class="hidden md:block bg-white shadow lg:border-t lg:border-gray-200"
      >
        <div class="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
          <div class="py-2 md:flex md:items-center md:justify-between">
            <div class="flex-1 min-w-0">
              <!-- Profile -->
              <div class="flex items-center">
                <router-link :to="{ name: 'settings.profile' }">
                  <img
                    v-if="avatar"
                    class="hidden h-12 w-12 rounded-full sm:block"
                    :src="avatar"
                    alt="Profile"
                  />
                  <span
                    v-else-if="false"
                    class="hidden sm:inline-flex items-center justify-center h-12 w-12 rounded-full bg-blueGray-800 shadow-xl"
                  >
                    <span class="text-sm font-medium leading-none text-white">{{
                      avatarText
                    }}</span>
                  </span>
                </router-link>
                <div>
                  <div class="flex items-center">
                    <div>
                      <img
                        v-if="avatar"
                        class="h-12 w-12 rounded-sm sm:hidden"
                        :src="avatar"
                        alt=""
                      />
                      <span
                        v-else
                        class="sm:hidden inline-flex items-center justify-center h-12 w-12 rounded-sm bg-blueGray-800 shadow-xl"
                      >
                        <span
                          class="text-sm font-medium leading-none text-white"
                          >{{ avatarText }}</span
                        >
                      </span>
                    </div>
                    <h1
                      class="ml-3 text-lg font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate"
                    >
                      {{ $t("shared.hi")
                      }}{{ firstName ? " " + firstName : "" }} 👋!
                    </h1>
                  </div>
                  <dl class="flex flex-col sm:ml-3 sm:flex-row sm:flex-wrap">
                    <dt class="sr-only">{{ $t("models.user.email") }}</dt>
                    <dd
                      class="flex items-center text-xs text-gray-500 font-medium lowercase sm:mr-6"
                    >
                      <!-- Heroicon name: office-building -->
                      <svg
                        class="flex-shrink-0 mr-0.5 h-3.5 w-3.5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      {{ email }}
                    </dd>
                    <dt class="sr-only">{{ $t("settings.profile.phone") }}</dt>
                    <dd
                      v-if="phone && phone !== '' && false"
                      class="flex items-center text-sm text-gray-500 font-medium lowercase sm:mr-6"
                    >
                      <!-- Heroicon name: office-building -->
                      <svg
                        class="flex-shrink-0 mr-1 h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                        />
                      </svg>
                      {{ phone }}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="hidden mt-6 space-x-1 md:mt-0 md:ml-4">
              <router-link
                :to="{ name: 'app.cfdis.upload' }"
                class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-sm text-gray-800 bg-gray-100 hover:bg-gray-200 focus:outline-none"
              >
                {{ $t("app.cfdis.uploadCfdis") }}
              </router-link>
              <router-link
                :to="{ name: 'app.tickets.upload' }"
                class="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-sm text-white bg-gray-800 hover:bg-gray-700 focus:outline-none"
              >
                {{ $t("app.tickets.uploadTickets") }}
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"></div>
        <div class="mt-4 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <section aria-labelledby="quick-links-title">
            <div class="">
              <div
                class="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-4 space-y-4 lg:space-y-0"
              >
                <div class="col-span-3 md:col-span-2 space-y-4">
                  <general-summary
                    ref="general"
                    v-on:reloaded="reloaded"
                  ></general-summary>

                  <dashboard-quicklinks></dashboard-quicklinks>
                  <summary-from-type
                    ref="suppliers"
                    :type="1"
                    :details="true"
                    :onlyFacturas="true"
                  ></summary-from-type>
                </div>
                <div class="space-y-4">
                  <active-projects ref="activeProjects"></active-projects>

                  <summary-from-type
                    urlNew="/app/ajustes/organizacion/members/nuevo"
                    v-if="isOwnerOrAdmin"
                    ref="members"
                    :type="7"
                    :admin="isOwnerOrAdmin"
                    :withTickets="false"
                    :withIncome="false"
                  ></summary-from-type>
                  <workspaces-widget
                    v-if="false"
                    ref="workspaces"
                  ></workspaces-widget>
                  <summary-from-type
                    ref="categories"
                    :type="3"
                    :details="true"
                    :withExpenses="true"
                    :withTickets="false"
                    :withIncome="false"
                    :onlyInvoices="true"
                  ></summary-from-type>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../components/shared/BaseComponent.vue";
import { mapGetters } from "vuex";
import ProgressBar from "@/components/shared/progress/ProgressBar.vue";
import { PeriodRequest } from "@/application/contracts/app/shared/PeriodRequest";
import { Period } from "@/application/enums/app/common/Period";
import Loader from "../../../components/shared/progress/Loader.vue";
import GeneralSummary from "@/components/app/widgets/GeneralSummary.vue";
import DashboardQuicklinks from "@/components/app/widgets/DashboardQuicklinks.vue";
import SummaryFromType from "@/components/app/widgets/SummaryFromType.vue";
import ActiveProjects from "../../../components/app/widgets/projects/ActiveProjects.vue";
import WorkspacesWidget from "../../../components/app/widgets/workspaces/WorkspacesWidget.vue";
import { Watch } from "vue-property-decorator";

@Component({
  components: {
    ProgressBar,
    Loader,
    GeneralSummary,
    DashboardQuicklinks,
    SummaryFromType,
    ActiveProjects,
    WorkspacesWidget
  },
  computed: {
    ...mapGetters("account", {
      firstName: "firstName",
      email: "email",
      phone: "phone",
      avatarText: "avatarText",
      avatar: "avatar",
      isAdmin: "isAdmin"
    }),
    ...mapGetters("tenant", {
      isOwnerOrAdmin: "isOwnerOrAdmin"
    })
  }
})
export default class Dashboard extends BaseComponent {
  $refs!: {
    general: GeneralSummary;
    members: SummaryFromType;
    workspaces: SummaryFromType;
    projects: SummaryFromType;
    categories: SummaryFromType;
    suppliers: SummaryFromType;
    activeProjects: ActiveProjects;
  };
  private isOwnerOrAdmin!: boolean;
  private firstName!: string;
  private phone!: string;
  private email!: string;
  private avatar!: string;
  private avatarText!: string;
  mounted() {
    this.load();
  }
  load() {
    this.$refs.general.reload({
      period: Period.LAST_30_DAYS,
      withDetails: true
    });
  }
  reloaded(period: PeriodRequest) {
    if (this.$refs.members) {
      this.$refs.members.reload(period);
    }
    if (this.$refs.projects) {
      this.$refs.projects.reload(period);
    }
    if (this.$refs.workspaces) {
      this.$refs.workspaces.reload(period);
    }
    if (this.$refs.categories) {
      this.$refs.categories.reload(period);
    }
    if (this.$refs.suppliers) {
      this.$refs.suppliers.reload(period);
    }
    if (this.$refs.activeProjects) {
      this.$refs.activeProjects.reloadPeriod(period.period);
    }
  }
}
</script>