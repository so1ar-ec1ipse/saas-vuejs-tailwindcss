<template>
  <div
    class="sm:mt-2 px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8"
  >
    <div
      class="relative grid gap-8 row-gap-5 mb-8 md:row-gap-8 lg:grid-cols-3 sm:grid-cols-2"
    >
      <div
        class="col-span-1 p-5 duration-300 transform bg-white border rounded-sm shadow-sm hover:-translate-y-2 select-none"
      >
        <div class="flex items-center justify-between mb-2">
          <p class="text-lg font-bold leading-5">
            Agrega tus empresas <span class="text-sm font-normal"> (RFCs)</span>
          </p>
          <p
            class="flex items-center justify-center w-6 h-6 font-bold rounded-sm text-theme-500 bg-theme-100"
          >
            1
          </p>
        </div>
        <span class="text-center">
          <svg
            v-if="false"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-8 w-8 mx-auto text-teal-accent-400"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </span>
        <p class="text-sm text-gray-900">
          Todas tus razones sociales que usas para facturar.
        </p>
      </div>
      <div
        class="col-span-1 p-5 duration-300 transform bg-white border rounded-sm shadow-sm hover:-translate-y-2 select-none"
      >
        <div class="flex items-center justify-between mb-2">
          <p class="text-lg font-bold leading-5">
            Sube fotos de tickets
            <span class="text-sm font-normal"> (facturables)</span>
          </p>
          <p
            class="flex items-center justify-center w-6 h-6 font-bold rounded-sm text-theme-500 bg-theme-100"
          >
            2
          </p>
        </div>
        <svg
          v-if="false"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="h-8 w-8 mx-auto text-teal-accent-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
          />
        </svg>
        <p class="text-sm text-gray-900">
          Asígnale el RFC, uso de CFDi, y proyecto.
        </p>
      </div>
      <div
        class="col-span-1 sm:col-span-2 md:col-span-1 p-5 duration-300 transform bg-white border rounded-sm shadow-sm hover:-translate-y-2 select-none"
      >
        <div class="flex items-center justify-between mb-2">
          <p class="text-lg font-bold leading-5">
            Espera tus facturas<span class="text-sm font-normal">
              (o facturalos tú)</span
            >
          </p>
          <p
            class="flex items-center justify-center w-6 h-6 font-bold rounded-sm text-theme-500 bg-theme-100"
          >
            3
          </p>
        </div>
        <svg
          v-if="false"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="h-8 w-8 mx-auto text-teal-accent-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p class="text-sm text-gray-900">
          Si optas por que nosotros facturemos espera 48 hrs.
        </p>
      </div>
      <div
        v-if="false"
        class="p-5 duration-300 transform bg-white border rounded-sm shadow-sm hover:-translate-y-2 select-none"
      >
        <div class="flex items-center justify-between mb-2">
          <p class="text-lg font-bold leading-5">Audita</p>
          <p
            class="flex items-center justify-center w-6 h-6 font-bold rounded-sm text-theme-500 bg-theme-100"
          >
            4
          </p>
        </div>
        <svg
          v-if="false"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="h-8 w-8 mx-auto text-teal-accent-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p class="text-sm text-gray-900">
          Consulta tus gastos por proveedor, colaborador...
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload);
export default {
  components: {},
  data() {
    return {
      videoId: "vN61u8MryHU",
      imgNetCore:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/.NET_Core_Logo.svg/1200px-.NET_Core_Logo.svg.png",
      imgVueJS:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1184px-Vue.js_Logo_2.svg.png",
      imgTailwindCSS:
        "https://seeklogo.com/images/T/tailwind-css-logo-5AD4175897-seeklogo.com.png",
      imgMemberManagement: "https://i.ibb.co/zZs1G4Z/Member-management.png",
      imgMultiTenant: "https://i.ibb.co/NnBVLNR/Multi-tenant.png",
      imgMultitheme: "https://i.ibb.co/GcdGMV3/Multi-theme.png",
      imgMultiLanguage: "https://i.ibb.co/2NzQV10/Multi-language.png",
      imgMultiDB: "https://i.ibb.co/RbzQ2Y9/Multi-db.png",
      imgResources: "https://i.ibb.co/cDZn1fj/Resources.png"
    };
  }
};
</script>
