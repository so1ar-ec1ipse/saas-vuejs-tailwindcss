import { appPermissionsRoutes } from "./appPermissionsRoutes";
import { appSettingsRoutes } from "./appSettingsRoutes";
import { appIntegrationsRoutes } from "./appIntegrationsRoutes";
import { i18n } from "@/plugins/vue-i18n";
import { defaultProductsDevelopment } from "@/store/modules/pricing/default-pricing.Development";
import { defaultProducts } from "@/store/modules/pricing/default-pricing";
const products =
  process.env.NODE_ENV !== "production"
    ? defaultProductsDevelopment
    : defaultProducts;

export const appRoutes = {
  path: "/app",
  component: require("@/views/app/Index.vue").default,
  meta: {
    requiresAuth: true,
  },
  redirect: "/app/dashboard",
  children: [
    {
      path: "dashboard",
      component: require("@/views/app/dashboard/Index.vue").default,
      meta: {
        title: i18n.t("shared.dashboard"),
      },
    },
    {
      path: "transactions",
      component: require("@/views/app/transactions/Transactions.vue").default,
      meta: {
        requiresAuth: true,
        title: "Transactions",
      },
      children: [
        {
          path: "new",
          component: require("@/views/app/transactions/TransactionsForm.vue")
            .default,
        },
        {
          path: ":id/edit",
          component: require("@/views/app/transactions/TransactionsForm.vue")
            .default,
        },
      ],
    },
    {
      path: "transactions2",
      component: require("@/views/app/transactions/TransactionsWithModelListTemplate.vue")
        .default,
      meta: {
        requiresAuth: true,
        title: "Expenses with Model List Template",
      },
    },
    {
      path: "resources",
      component: require("@/views/app/resources/MyResources.vue").default,
      meta: {
        title: i18n.t("models.resource.plural"),
      },
    },
    {
      path: "unauthorized",
      component: require("@/views/app/common/Unauthorized.vue").default,
      meta: {
        title: i18n.t("shared.unauthorized"),
      },
    },
    appPermissionsRoutes,
    appSettingsRoutes,
    appIntegrationsRoutes,
  ],
};
