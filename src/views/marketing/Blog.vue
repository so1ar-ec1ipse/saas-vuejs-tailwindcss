<template>
  <div>
    <Header></Header>

    <div class="bg-primary pt-20 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div
        class="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl"
      >
        <div>
          <h2
            class="text-3xl tracking-tight font-extrabold text-primary sm:text-4xl"
          >
            Blog
          </h2>
          <div
            class="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center"
          >
            <p class="text-xl text-secondary">
              Get notified on NetcoreSaas codebase updates in your inbox and
              start creating your SaaS apps.
            </p>
            <form class="mt-6 flex flex-col sm:flex-row lg:mt-0 lg:justify-end">
              <div>
                <label for="email-address" class="sr-only">Email address</label>
                <input
                  v-model="email"
                  id="email-address"
                  name="email-address"
                  type="email"
                  autocomplete="email"
                  required
                  class="appearance-none w-full px-4 py-2 border border-gray-300 text-base rounded-sm text-primary bg-white placeholder-gray-500 focus:outline-none focus:ring-theme-500 focus:border-theme-500 lg:max-w-xs"
                  placeholder="you@domain.com"
                />
              </div>
              <div
                class="mt-2 flex-shrink-0 w-full flex rounded-sm shadow-sm sm:mt-0 sm:ml-3 sm:w-auto sm:inline-flex"
              >
                <button
                  type="button"
                  @click="subscribe"
                  class="w-full bg-theme-600 px-4 py-2 border border-transparent rounded-sm flex items-center justify-center text-base font-medium text-white hover:bg-theme-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-500 sm:w-auto sm:inline-flex"
                >
                  Notify me
                </button>
              </div>
            </form>
          </div>
        </div>
        <div
          class="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12"
        >
          <div>
            <p class="text-sm text-secondary">
              <time datetime="2020-03-16">Dec 5, 2020</time>
            </p>
            <router-link
              :to="{
                path: '/blog/v1-3-released-cleaner-saas-starter-codebase',
              }"
              class="mt-2 block "
            >
              <p class="text-xl font-semibold text-primary">
                v1.3 Released - Cleaner Codebase
              </p>
              <p class="mt-3 text-base text-secondary">
                Split the project into Clean Architecture, added +130
                integration tests and some unit tests as showcase, better Dto to
                Entity flow, upgraded to .NET 5 and TailwindCSS 2.0, ability to
                impersonate users, update user passwords as admin better UI/UX,
                bug fixes...
              </p>
            </router-link>
            <div class="mt-3">
              <router-link
                :to="{
                  path: '/blog/v1-3-released-cleaner-saas-starter-codebase',
                }"
                class="text-base font-semibold text-theme-600 hover:text-theme-500"
              >
                Read more
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Header from "@/components/marketing/Header.vue";
import { blogService } from "../../services/marketing/BlogService";

@Component({ components: { Header } })
export default class BlogComponent extends Vue {
  private subscribeURL: string = "";
  private email: string = "";
  mounted() {
    // @ts-ignore
    this.subscribeURL = process.env.VUE_APP_INTEGRATIONS_NEWSLETTER_MAILCHIMP;
  }
  subscribe() {
    if (this.subscribeURL) {
      window.open(this.subscribeURL + "&EMAIL=" + this.email, "_blank");
    }
  }
}
</script>
