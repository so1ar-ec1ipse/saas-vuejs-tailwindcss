export const accountRoutes = {
  name: "account",
  path: "/account",
  alias: "/cuenta",
  component: require("@/views/account/Index.vue").default,
  meta: {
    requiresLoggedOut: true,
  },
  children: [
    {
      name: "account.login",
      path: "login",
      alias: "entrar",
      component: require("@/views/account/Login.vue").default,
    },
    {
      name: "account.register",
      path: "register",
      alias: "crear",
      component: require("@/views/account/Register.vue").default
    },
    {
      name: "account.verify",
      path: "verify",
      alias: "verificar",
      component: require("@/views/account/Verify.vue").default
    },
    {
      name: "account.reset",
      path: "reset",
      alias: "restablecer",
      component: require("@/views/account/Reset.vue").default
    },
  ],
};
