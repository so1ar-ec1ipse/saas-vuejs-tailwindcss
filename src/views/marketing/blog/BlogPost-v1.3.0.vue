<<template>
  <div>
    <Header></Header>
    <div class="relative py-16 pt-24 bg-primary overflow-hidden">
      <div class="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
        <div
          class="relative h-full text-lg max-w-prose mx-auto"
          aria-hidden="true"
        ></div>
      </div>
      <div class="relative px-4 sm:px-6 lg:px-8">
        <div class="text-lg max-w-prose mx-auto">
          <h1>
            <span
              class="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase"
              >DECEMBER 5, 2020</span
            >
            <span
              class="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-primary sm:text-4xl"
              >v1.3 Released - Cleaner Codebase</span
            >
          </h1>
          <p class="mt-8 text-xl text-tertiary leading-8">
            Split the project into Clean Architecture, added +130 integration
            tests and some unit tests as showcase, better Dto to Entity flow,
            upgraded to .NET 5 and TailwindCSS 2.0, ability to impersonate
            users, update user passwords as admin better UI/UX, bug fixes and
            more.
          </p>
        </div>
        <div class="mt-6 prose prose-indigo prose-lg text-tertiary mx-auto">
          <p class="text-4xl font-bold text-secondary">Clean Architecture</p>
          <p>
            Split into Domain, Application, Infrastructure, WebApi and Tests
            projects
          </p>
          <figure>
            <img
              class="w-full rounded-lg"
              v-lazy="imgCleanArchitecture"
              alt="NetcoreSaas Clean Architecture"
            />
            <figcaption>
              Clean Architecture
            </figcaption>
          </figure>
        </div>
        <div class="mt-6 prose prose-indigo prose-lg text-tertiary mx-auto">
          <p class="text-4xl font-bold text-secondary">
            Integration and Unit Tests
          </p>
          <p>
            +130 integration tests connecting to your testing database and
            Stripe
          </p>
          <figure>
            <img
              class="w-full rounded-lg"
              v-lazy="imgIntegrationTests"
              alt="NetcoreSaas Integration Tests"
            />
            <figcaption>
              130 integration + 7 unit tests
            </figcaption>
          </figure>
        </div>
        <div class="mt-6 prose prose-indigo prose-lg text-tertiary mx-auto">
          <p class="text-4xl font-bold text-secondary">Repository Pattern</p>
          <p>
            IUserRepository and UserRepository implementation uses
            IMasterUnitOfWork since its a master catalog, ITransactionRepository
            and TransactionRepository implementation uses IAppUnitOfWork since
            its a tenant related catalog. IUserService uses ITenantRepository
            and ISubscriptionProductRepository so it can authenticate an
            existing user.
          </p>
          <figure>
            <img
              class="w-full rounded-lg"
              v-lazy="imgRepositoryPattern"
              alt="NetcoreSaas Repository Pattern"
            />
            <figcaption>
              Repository Pattern (Interfaces, Implementations and Unit of Work)
            </figcaption>
          </figure>
        </div>
        <div class="mt-6 prose prose-indigo prose-lg text-tertiary mx-auto">
          <p class="text-4xl font-bold text-secondary">Limited time $99 deal</p>
          <p>
            This is the last month the deal will be live on AppSumo.
          </p>
          <p>
            <a href="https://appsumo.com/netcoresaas" target="_blank"
              >You can get the deal here.</a
            >
          </p>
          <figure>
            <img
              class="w-full rounded-lg"
              v-lazy="imgAppSumoDeal"
              alt="NetcoreSaas AppSumo $99 Deal"
            />
            <figcaption>
              AppSumo 🌮 $99 Deal
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Header from "@/components/marketing/Header.vue";

import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload);

@Component({ components: { Header } })
export default class BlogPost1Component extends Vue {
  imgCleanArchitecture = "https://i.ibb.co/W0LcrzM/Clean-Architecture.png";
  imgIntegrationTests = "https://i.ibb.co/DLKjP9V/Integration-Tests.png";
  imgRepositoryPattern = "https://i.ibb.co/8xdGSc9/Repository-Pattern.png";
  imgAppSumoDeal = "https://i.ibb.co/6wpW0KF/NETCORESAAS-v1-3-0-9.png";
}
</script>
