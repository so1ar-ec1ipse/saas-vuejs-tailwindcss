import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import routes from "./routes";

import VueMeta from "vue-meta";
import { SubscriptionProductDto } from "@/application/dtos/master/subscriptions/SubscriptionProductDto";
import { UserType } from "@/application/enum/master/UserType";
import { TenantUserRole } from "@/application/enum/master/TenantUserRole";
import { TenantProductDto } from '@/application/dtos/master/tenants/TenantProductDto';
Vue.use(VueRouter);
Vue.use(VueMeta);
const debug = process.env.NODE_ENV !== "production";

const router = new VueRouter({
  mode: "history",
  routes,
});

function hasQueryParams(route) {
  return !!Object.keys(route.query).length;
}

router.beforeEach((to, from, next) => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
  if (to.path === "/") {
    next({ path: "/product" });
    return;
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.auth.authenticated) {
      next({
        path: "/account/login",
        query: {
          redirect: to.fullPath,
        },
      });
      return;
    }
    // else if (!store.state.tenant.current) {
    //   next({
    //     path: "/organizations",
    //   });
    //   return;
    // }
  } else if (to.matched.some((record) => record.meta.requiresLoggedOut)) {
    if (store.state.auth.authenticated) {
      next({
        path: "/app/dashboard",
        query: {
          redirect: to.fullPath,
        },
      });
      return;
    }
  }

  const userTypesAllowed = to.meta.userTypes as UserType[];
  if (
    to.matched.some((record) => record.meta && record.meta.userTypes) &&
    userTypesAllowed
  ) {
    const currentType = store.state.account.user?.type as UserType;
    if (debug) {
      // console.log("WILL CHECK USER TYPES");
      // console.log("USER TYPES ALLOWED:" + JSON.stringify(userTypesAllowed));
      // console.log("CURRENT USER TYPE:" + JSON.stringify(currentType));
    }
    if (userTypesAllowed.some((f) => f === currentType) === false) {
      console.log("unauthorized");
      next({
        path: "/app/unauthorized",
      });
      return;
    }
  }

  const rolesAllowed = to.meta.roles as TenantUserRole[];
  if (
    to.matched.some((record) => record.meta && record.meta.roles) &&
    rolesAllowed
  ) {
    const currentRole = store.state.tenant.current?.currentUser?.role as TenantUserRole;
    if (debug) {
      // console.log("WILL CHECK ROLE PERMISSIONS");
      // console.log("ROLES ALLOWED:" + JSON.stringify(rolesAllowed));
      // console.log("CURRENT ROLE:" + JSON.stringify(currentRole));
    }
    if (rolesAllowed.some((f) => f === currentRole) === false) {
      // console.log("unauthorized");
      next({
        path: "/app/unauthorized",
      });
      return;
    }
  }

  const productsAllowed = to.meta.subscriptions as SubscriptionProductDto[];
  if (
    to.matched.some((record) => record.meta && record.meta.subscriptions) &&
    productsAllowed
  ) {
    const currentProduct = store.state.tenant.subscription?.activeProduct as TenantProductDto | undefined;
    if (debug) {
      console.log("WILL CHECK SUBSCRIPTION PERMISSIONS");
      console.log("SUBSCRIPTIONS ALLOWED:" + JSON.stringify(productsAllowed.map(f => f.title)));
      // tslint:disable-next-line: max-line-length
      console.log("CURRENT SUBSCRIPTION:" + JSON.stringify(currentProduct && currentProduct.subscriptionProduct ? currentProduct.subscriptionProduct.title : 'NONE'));
    }
    if (!currentProduct || productsAllowed.some((f) => f.tier === currentProduct.subscriptionProduct.tier) === false) {
      if (debug) {
        console.log("unauthorized");
      }
      next({
        path: "/app/unauthorized",
      });
      return;
    }
  }

  if (to.path.includes("pricing") || to.path.includes("register")) {
    // @ts-ignore
    if (window.analytics) {
      // @ts-ignore
      window.analytics.page(to.path);
    }
    if (!hasQueryParams(to) && hasQueryParams(from)) {
      next({
        path: to.path,
        query: from.query,
      });
      return;
    } else {
      next();
    }
  }

  next();
});
export default router;
