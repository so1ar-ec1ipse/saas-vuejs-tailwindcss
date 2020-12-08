"use strict";
exports.__esModule = true;
exports.adminRoutes = void 0;
var vue_i18n_1 = require("@/plugins/vue-i18n");
var IUserDTO_1 = require("@/app/models/master/account/IUserDTO");
exports.adminRoutes = {
    path: "/admin",
    component: require("@/views/admin/Index.vue")["default"],
    meta: {
        title: vue_i18n_1.i18n.t("admin.title")
    },
    redirect: "admin/dashboard",
    userTypes: [IUserDTO_1.UserType.Admin],
    children: [{
            path: "dashboard",
            name: "admin.dashboard",
            component: require("@/views/admin/Dashboard.vue")["default"],
            meta: {
                title: vue_i18n_1.i18n.t("shared.dashboard"),
                userTypes: [IUserDTO_1.UserType.Admin]
            }
        },
        {
            path: "tenants",
            name: "admin.tenants",
            component: require("@/views/admin/Tenants.vue")["default"],
            meta: {
                title: vue_i18n_1.i18n.t("admin.tenants"),
                userTypes: [IUserDTO_1.UserType.Admin]
            },
            children: [{
                path: "users/:tenant/:uuid",
                name: "admin.users",
                component: require("@/views/admin/Users.vue")["default"],
                meta: {
                    title: vue_i18n_1.i18n.t("admin.users"),
                    userTypes: [IUserDTO_1.UserType.Admin]
                }
            }, ]
        },
        {
            path: "products",
            name: "admin.pricing",
            component: require("@/views/admin/pricing/SubscriptionProductsList.vue")["default"],
            meta: {
                title: vue_i18n_1.i18n.t("admin.pricing.title"),
                userTypes: [IUserDTO_1.UserType.Admin]
            },
            children: [{
                path: "new",
                component: require("@/views/admin/pricing/SubscriptionProductsForm.vue")["default"]
            }, ]
        },
        {
            path: "products/:uuid",
            name: "admin.product",
            component: require("@/views/admin/pricing/SubscriptionProduct.vue")["default"],
            children: [{
                    path: "overview",
                    name: "admin.product.overview",
                    component: require("@/views/admin/pricing/SubscriptionProductOverview.vue")["default"],
                    meta: {
                        title: vue_i18n_1.i18n.t("models.subscriptionProduct.object")
                    }
                },
                {
                    path: "edit",
                    name: "admin.product.edit",
                    component: require("@/views/admin/pricing/SubscriptionProductsForm.vue")["default"],
                    meta: {
                        title: vue_i18n_1.i18n.t("models.subscriptionProduct.object")
                    }
                },
                {
                    path: "prices",
                    name: "admin.product.prices",
                    component: require("@/views/admin/pricing/SubscriptionPrices.vue")["default"],
                    meta: {
                        title: vue_i18n_1.i18n.t("models.subscriptionPrice.object")
                    },
                    children: [{
                        path: ":uuid/edit",
                        component: require("@/views/admin/pricing/SubscriptionPricesForm.vue")["default"]
                    }, ]
                },
                {
                    path: "features",
                    name: "admin.product.features",
                    component: require("@/views/admin/pricing/SubscriptionFeatures.vue")["default"],
                    meta: {
                        title: vue_i18n_1.i18n.t("models.subscriptionFeature.object")
                    }
                },
            ]
        },
    ]
};