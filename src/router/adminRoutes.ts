import { UserType } from "@/application/enums/master/users/UserType";
import { i18n } from "@/plugins/vue-i18n";

export const adminRoutes = {
  name: "admin",
  path: "/admin",
  component: require("@/views/admin/Index.vue").default,
  meta: {
    title: i18n.t("models.ticket.plural"),
  },
  redirect: "admin/tenants",
  userTypes: [UserType.ADMIN],
  children: [
    {
      name: "admin.tenants",
      path: "tenants",
      alias: "organizaciones",
      component: require("@/views/admin/Tenants.vue").default,
      meta: {
        title: i18n.t("admin.tenants"),
        userTypes: [UserType.ADMIN],
      },
    },
    {
      name: "admin.users",
      path: "users",
      alias: "usuarios",
      component: require("@/views/admin/Users.vue").default,
      meta: {
        title: i18n.t("admin.users"),
        userTypes: [UserType.ADMIN],
      },
    },
    {
      name: "admin.pricing",
      path: "products",
      alias: "productos",
      component: require("@/views/admin/pricing/SubscriptionProductsList.vue")
        .default,
      meta: {
        title: i18n.t("admin.pricing.title"),
        userTypes: [UserType.ADMIN],
      },
      children: [
        {
          name: "admin.pricing.name",
          path: "new",
          alias: "nuevo",
          component: require("@/views/admin/pricing/SubscriptionProductsForm.vue")
            .default,
        },
      ],
    },
    {
      name: "admin.product",
      path: "products/:id",
      alias: "productos/:id",
      component: require("@/views/admin/pricing/SubscriptionProduct.vue")
        .default,
      children: [
        {
          name: "admin.product.overview",
          path: "overview",
          alias: "resumen",
          component: require("@/views/admin/pricing/SubscriptionProductOverview.vue")
            .default,
          meta: {
            title: i18n.t("models.subscriptionProduct.object"),
          },
        },
        {
          name: "admin.product.edit",
          path: ":id/edit",
          alias: ":id/editar",
          component: require("@/views/admin/pricing/SubscriptionProductsForm.vue")
            .default,
          meta: {
            title: i18n.t("models.subscriptionProduct.object"),
          },
        },
        {
          name: "admin.product.prices",
          path: "prices",
          alias: "precios",
          component: require("@/views/admin/pricing/SubscriptionPrices.vue")
            .default,
          meta: {
            title: i18n.t("models.subscriptionPrice.object"),
          },
          children: [
            {
              name: "admin.product.prices.edit",
              path: ":price/edit",
              alias: ":price/editar",
              component: require("@/views/admin/pricing/SubscriptionPricesForm.vue")
                .default,
            },
          ],
        },
        {
          name: "admin.product.features",
          path: "features",
          alias: "caracteristicas",
          component: require("@/views/admin/pricing/SubscriptionFeatures.vue")
            .default,
          meta: {
            title: i18n.t("models.subscriptionFeature.object"),
          },
        },
      ],
    },
    {
      name: "admin.tickets",
      path: "receipts",
      alias: "tickets",
      component: require("@/views/admin/tickets/Tickets.vue").default,
      meta: {
        userTypes: [UserType.ADMIN],
        requiresAuth: true,
        title: i18n.t("models.ticket.plural"),
      },
      children: [
        {
          name: "admin.tickets.details",
          path: ":id",
          component: require("@/views/app/tickets/TicketItemDetails.vue")
            .default,
        },
      ],
    },
    {
      name: "admin.invoices",
      path: "invoices",
      alias: "facturas",
      component: require("@/views/admin/tickets/AllTickets.vue").default,
      meta: {
        userTypes: [UserType.ADMIN],
        requiresAuth: true,
        title: i18n.t("models.invoice.plural"),
      },
      children: [
        {
          name: "admin.invoices.edit",
          path: ":id/edit",
          alias: ":id/editar",
          component: require("@/views/app/tickets/TransactionItemDetails.vue")
            .default,
        },
        {
          name: "admin.invoices.ticket",
          path: ":id/receipt",
          alias: ":id/ticket",
          component: require("@/views/app/tickets/TicketItemDetails.vue")
            .default,
        },
      ],
    },
    {
      name: "admin.support",
      path: "support",
      alias: "soporte",
      component: require("@/views/admin/support/Index.vue").default,
      meta: {
        userTypes: [UserType.ADMIN],
        requiresAuth: true,
        title: i18n.t("admin.support").toString(),
      },
    },
    {
      name: "admin.ticket",
      path: "receipt/:id",
      alias: "ticket/:id",
      component: require("@/views/admin/tickets/TicketForm.vue").default,
      meta: {
        userTypes: [UserType.ADMIN],
        requiresAuth: true,
        title: i18n.t("models.ticket.object").toString(),
      },
    }
  ],
};
