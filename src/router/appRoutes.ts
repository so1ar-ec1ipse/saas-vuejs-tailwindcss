// import { appPermissionsRoutes } from "./appPermissionsRoutes";
import { appSettingsRoutes } from "./appSettingsRoutes";
// import { appIntegrationsRoutes } from "./appIntegrationsRoutes";
import { i18n } from "@/plugins/vue-i18n";
import { defaultProducts } from "@/store/modules/pricing/default-pricing";
import { TenantUserRole } from "@/application/enums/master/tenants/TenantUserRole";
const products = defaultProducts;

export const appRoutes = {
  name: "app",
  path: "/app",
  component: require("@/views/app/Index.vue").default,
  meta: {
    requiresAuth: true,
  },
  redirect: "/app/dashboard",
  children: [
    {
      name: "app.dashboard",
      path: "dashboard",
      component: require("@/views/app/dashboard/Dashboard.vue").default,
      meta: {
        title: i18n.t("shared.dashboard"),
      },
    },
    {
      name: "app.transactions",
      path: "transactions",
      alias: "transacciones",
      component: require("@/views/app/transactions/Transactions.vue").default,
      meta: {
        requiresAuth: true,
        title: i18n.t("models.transaction.plural"),
        subscriptions: [products[1], products[2]],
      },
      children: [
        {
          name: "app.transactions.new",
          path: "new",
          alias: "nueva",
          component: require("@/views/app/transactions/TransactionsForm.vue")
            .default,
        },
        {
          name: "app.transactions.new.manual",
          path: "manual",
          component: require("@/views/app/transactions/TransactionsForm.vue")
            .default,
        },
        {
          name: "app.transactions.edit",
          path: ":id/edit",
          alias: ":id/editar",
          component: require("@/views/app/transactions/TransactionsForm.vue")
            .default,
        },
      ],
    },
    {
      name: "app.tickets",
      path: "receipts",
      alias: "tickets",
      component: require("@/components/app/tickets/Tickets.vue").default,
      meta: {
        requiresAuth: true,
        title: i18n.t("models.ticket.plural"),
      },
      children: [
        {
          name: "app.tickets.details",
          path: ":id",
          component: require("@/views/app/tickets/TicketItemDetails.vue")
            .default,
        },
      ],
    },
    {
      name: "app.invoices",
      path: "invoices",
      alias: "facturas",
      component: require("@/components/app/transactions/Transactions.vue")
        .default,
      meta: {
        requiresAuth: true,
        title: i18n.t("models.invoice.plural"),
      },
      children: [
        {
          name: "app.invoices.details",
          path: "receipt/:id",
          alias: "ticket/:id",
          component: require("@/views/app/tickets/TicketItemDetails.vue")
            .default,
        },
        {
          name: "app.invoices.edit",
          path: ":id/edit",
          alias: ":id/editar",
          component: require("@/views/app/tickets/TransactionItemDetails.vue")
            .default,
        },
        {
          name: "app.invoices.details.ticket",
          path: ":id/receipt",
          alias: ":id/ticket",
          component: require("@/views/app/tickets/TicketItemDetails.vue")
            .default,
        },
      ],
    },
    // {
    //   name: "app.tickets.details",
    //   path: "ticket/:id",
    //   component: require("@/components/app/tickets/TicketFullDetails.vue")
    //     .default,
    //   meta: {
    //     requiresAuth: true,
    //     title: "Ticket",
    //   },
    // },
    {
      name: "app.tickets.upload",
      path: "upload/receipts/:action?",
      alias: "subir/tickets/:action?",
      component: require("@/views/app/tickets/TicketsUpload.vue").default,
      meta: {
        requiresAuth: true,
        title: i18n.t("app.tickets.uploadTickets"),
      },
    },
    {
      name: "app.cfdis.upload",
      path: "upload/cfdis",
      alias: "subir/cfdis",
      component: require("@/views/app/cfdis/CfdisUpload.vue").default,
      meta: {
        requiresAuth: true,
        title: i18n.t("app.cfdis.uploadCfdis"),
      },
    },
    {
      name: "app.reports",
      path: "reports",
      alias: "reportes",
      component: require("@/views/app/reports/Reports.vue").default,
      meta: {
        requiresAuth: true,
        title: i18n.t("app.reports.title"),
      },
    },
    {
      name: "app.suppliers",
      path: "suppliers",
      alias: "proveedores",
      component: require("@/views/app/contacts/Suppliers.vue").default,
      meta: {
        requiresAuth: true,
        title: i18n.t("models.supplier.plural"),
      },
    },
    {
      name: "app.customers",
      path: "customers",
      alias: "clientes",
      component: require("@/views/app/contacts/Customers.vue").default,
      meta: {
        requiresAuth: true,
        title: i18n.t("models.customer.plural"),
      },
    },
    {
      name: "app.workspaces",
      path: "empresas",
      component: require("@/views/app/workspaces/WorkspacesList.vue").default,
      meta: {
        requiresAuth: true,
        title: i18n.t("models.workspace.plural").toString(),
        roles: [TenantUserRole.OWNER, TenantUserRole.ADMIN],
      },
      children: [
        {
          name: "app.workspaces.new",
          path: "new",
          alias: "nueva",
          component: require("@/views/app/workspaces/WorkspacesForm.vue").default,
          meta: {
            roles: [TenantUserRole.OWNER, TenantUserRole.ADMIN],
          },
        },
        {
          name: "app.workspaces.edit",
          path: "edit/:id",
          alias: "editar/:id",
          component: require("@/views/app/workspaces/WorkspacesForm.vue").default,
          meta: {
            roles: [TenantUserRole.OWNER, TenantUserRole.ADMIN],
          },
        },
      ],
    },
    {
      name: "app.projects",
      path: "projects",
      alias: "proyectos",
      component: require("@/views/app/projects/ProjectsList.vue").default,
      meta: {
        requiresAuth: true,
        title: i18n.t("models.project.plural"),
        roles: [
          TenantUserRole.OWNER,
          TenantUserRole.ADMIN,
          TenantUserRole.MEMBER,
        ],
      },
      children: [
        {
          name: "app.projects.new",
          path: "new",
          alias: "nuevo",
          component: require("@/views/app/projects/ProjectsForm.vue").default,
          meta: {
            roles: [
              TenantUserRole.OWNER,
              TenantUserRole.ADMIN,
              TenantUserRole.MEMBER,
            ],
          },
        },
        {
          name: "app.projects.edit",
          path: "edit/:id",
          alias: "editar/:id",
          component: require("@/views/app/projects/ProjectsForm.vue").default,
          meta: {
            roles: [
              TenantUserRole.OWNER,
              TenantUserRole.ADMIN,
              TenantUserRole.MEMBER,
            ],
          },
        },
      ],
    },
    // {
    //   name: "app.resources",
    //   path: "resources",
    //   component: require("@/views/app/resources/MyResources.vue").default,
    //   meta: {
    //     title: i18n.t("models.resource.plural"),
    //   },
    // },
    {
      name: "app.unauthorized",
      path: "unauthorized",
      component: require("@/views/app/common/Unauthorized.vue").default,
      meta: {
        title: i18n.t("shared.unauthorized"),
      },
    },
    appSettingsRoutes,
    {
      name: "tests",
      path: "tests",
      component: require("@/views/app/TestsPlayground.vue").default,
      meta: {
        requiresAuth: false,
      },
    },
  ],
};
