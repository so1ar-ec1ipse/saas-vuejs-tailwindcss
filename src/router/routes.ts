import { RouteConfig } from "vue-router";
import { accountRoutes } from "./accountRoutes";
import { adminRoutes } from "./adminRoutes";
import { appRoutes } from "./appRoutes";
const routes: RouteConfig[] = [
  {
    path: "*",
    redirect: "/app/dashboard",
  },
  {
    path: "/",
    component: require("@/views/marketing/Index.vue").default,
    children: [
      {
        name: "product",
        path: "product",
        alias: "producto",
        component: require("@/views/marketing/Product.vue").default,
      },
      {
        name: "prices",
        path: "prices",
        alias: "precios",
        component: require("@/views/marketing/Pricing.vue").default,
      },
      {
        name: "contact",
        path: "contact",
        alias: "contacto",
        component: require("@/views/marketing/Contact.vue").default,
      },
      {
        name: "blog",
        path: "blog",
        component: require("@/views/marketing/Blog.vue").default,
      },
      {
        name: "blog",
        path: "blog/:slug",
        component: require("@/views/marketing/BlogPost.vue").default,
      },
      {
        name: "lang",
        path: "lang/:lang",
        component: require("@/views/marketing/Lang.vue").default,
      },
      {
        name: "lang.spanish",
        path: "es",
        redirect: "lang/es-MX",
      },
      {
        name: "lang.english",
        path: "en",
        redirect: "lang/en-US",
      },
      // {
      //   path: "hi",
      //   redirect: "lang/hi-IN",
      // },
      // {
      //   path: "in",
      //   redirect: "lang/hi-IN",
      // },
      accountRoutes,
    ],
  },
  appRoutes,
  adminRoutes,
  {
    name: "account.forgot",
    path: "/account/forgot",
    alias: "/cuenta/olvide",
    component: require("@/views/account/Forgot.vue").default,
    meta: {
      requiresAuth: false,
    },
  },
  {
    name: "account.invitation",
    path: "/invitation",
    alias: "/invitacion",
    component: require("@/views/account/Invitation.vue").default,
    meta: {
      requiresAuth: false,
    },
  },
  {
    name: "account.join",
    path: "/join/:linkUrl",
    alias: "/unirse/:linkUrl",
    component: require("@/views/account/InviteURL.vue").default,
    meta: {
      requiresAuth: false,
    },
  },
  {
    name: "terms",
    path: "/terms-and-conditions",
    alias: "/terminos-y-condiciones",
    component: require("@/views/marketing/Terms.vue").default,
  },
  {
    name: "privacy",
    path: "/privacy-policy",
    alias: "/politica-de-privacidad",
    component: require("@/views/marketing/Privacy.vue").default,
  },
  {
    name: "logout",
    path: "/logout",
    alias: "/salir",
    component: require("@/views/account/Logout.vue").default,
    meta: {
      requiresAuth: false,
    },
  }
];
export default routes;
