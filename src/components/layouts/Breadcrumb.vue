<template>
  <div>
    <div v-if="breadcrumb.length > 0">
      <nav class="hidden">
        <router-link :to="{ name: 'app' }" class="w-auto">
          <img
            alt="Logo"
            class="h-9 w-auto"
            src="@/assets/img/icon-light.png"
          />
        </router-link>
      </nav>
      <nav class="flex items-center text-base leading-5 font-medium">
        <router-link :to="{ name: 'app' }" class="w-auto">
          <img
            alt="Logo"
            class="hidden sm:block h-7 sm:h-8 md:h-9 w-auto"
            src="@/assets/img/logo-light.png"
          />
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  components: {},
  data() {
    return {
      breadcrumbList: []
    };
  },
  mounted() {
    this.updateList();
  },
  watch: {
    $route(to, from) {
      this.updateList(to);
    }
  },
  methods: {
    routeTo(pRouteTo) {
      if (this.breadcrumbList[pRouteTo].link) {
        this.$router.push(this.breadcrumbList[pRouteTo].link);
      }
    },
    updateList(to) {
      this.breadcrumbList = this.$route.meta.breadcrumb;
    },
    pushToParent() {
      const pathArray = this.$route.path.split("/");
      if (pathArray[pathArray.length - 1] === "") {
        pathArray.pop();
      }
      const routes = [];
      for (let index = 0; index < pathArray.length - 1; index++) {
        const element = pathArray[index];
        routes.push(element);
      }
      const parentRoute = routes.join("/");
      console.log("pushing; " + parentRoute);
      this.$router.push(parentRoute);
    }
  },
  computed: {
    breadcrumb() {
      function isGuid(stringToTest) {
        if (stringToTest[0] === "{") {
          stringToTest = stringToTest.substring(1, stringToTest.length - 1);
        }
        const regexGuid = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;
        return regexGuid.test(stringToTest);
      }

      const pathArray = this.$route.path.split("/");
      if (pathArray[pathArray.length - 1] === "") {
        pathArray.pop();
      }
      const breadcrumbs = [];
      const previousRoutes = [];
      for (let index = 0; index < pathArray.length - 1; index++) {
        const current = previousRoutes.join("/") + "/" + pathArray[index];
        const result = pathArray[index].replace(/(\w)(\w*)/g, (_, i, r) => {
          return i.toUpperCase() + (r != null ? r : "");
        });
        previousRoutes.push(pathArray[index]);
        const element = {
          link: current,
          name: result
        };
        if (!Number.isInteger(pathArray[index]) && !isGuid(pathArray[index])) {
          if (index > 0) {
            breadcrumbs.push(element);
          }
        } else {
          break;
        }
      }

      breadcrumbs[0].name = this.$t("shared.dashboard");
      return breadcrumbs;
    }
  }
};
</script>
