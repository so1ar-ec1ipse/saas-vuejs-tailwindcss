import { UserType } from "@/application/enum/master/UserType";
import { i18n } from "@/plugins/vue-i18n";

export const adminRoutes = {
  path: "/admin",
  component: require("@/views/admin/Index.vue").default,
  meta: {
    title: i18n.t("admin.title"),
  },
  redirect: "admin/dashboard",
  userTypes: [UserType.Admin],
  children: [
    {
      path: "dashboard",
      name: "admin.dashboard",
      component: require("@/views/admin/Dashboard.vue").default,
      meta: {
        title: i18n.t("shared.dashboard"),
        userTypes: [UserType.Admin],
      },
    },
    {
      path: "tenants",
      name: "admin.tenants",
      component: require("@/views/admin/Tenants.vue").default,
      meta: {
        title: i18n.t("admin.tenants"),
        userTypes: [UserType.Admin],
      },
    },
    {
      path: "users",
          name: "admin.users",
          component: require("@/views/admin/Users.vue").default,
          meta: {
            title: i18n.t("admin.users"),
            userTypes: [UserType.Admin],
          },
    },
    {
      path: "products",
      name: "admin.pricing",
      component: require("@/views/admin/pricing/SubscriptionProductsList.vue")
        .default,
      meta: {
        title: i18n.t("admin.pricing.title"),
        userTypes: [UserType.Admin],
      },
      children: [
        {
          path: "new",
          component: require("@/views/admin/pricing/SubscriptionProductsForm.vue")
            .default,
        },
      ],
    },
    {
      path: "products/:id",
      name: "admin.product",
      component: require("@/views/admin/pricing/SubscriptionProduct.vue")
        .default,
      children: [
        {
          path: "overview",
          name: "admin.product.overview",
          component: require("@/views/admin/pricing/SubscriptionProductOverview.vue")
            .default,
          meta: {
            title: i18n.t("models.subscriptionProduct.object"),
          },
        },
        {
          path: "edit",
          name: "admin.product.edit",
          component: require("@/views/admin/pricing/SubscriptionProductsForm.vue")
            .default,
          meta: {
            title: i18n.t("models.subscriptionProduct.object"),
          },
        },
        {
          path: "prices",
          name: "admin.product.prices",
          component: require("@/views/admin/pricing/SubscriptionPrices.vue")
            .default,
          meta: {
            title: i18n.t("models.subscriptionPrice.object"),
          },
          children: [
            {
              path: ":id/edit",
              component: require("@/views/admin/pricing/SubscriptionPricesForm.vue")
                .default,
            },
          ],
        },
        {
          path: "features",
          name: "admin.product.features",
          component: require("@/views/admin/pricing/SubscriptionFeatures.vue")
            .default,
          meta: {
            title: i18n.t("models.subscriptionFeature.object"),
          },
        },
      ],
    },

    {
      path: "resources",
      name: "admin.resources",
      component: require("@/views/admin/resources/ResourcesList.vue").default,
      meta: {
        title: i18n.t("admin.resources.title"),
        userTypes: [UserType.Admin],
      },
      // children: [
      //   {
      //     path: "new",
      //     component: require("@/views/admin/pricing/SubscriptionProductsForm.vue")
      //       .default,
      //   },
      // ],
    },
  ],
};
