<template>
  <div>
    <router-link :to="{ name: 'product' }">
      <img
        v-if="$store.state.theme.marketingTheme === 'theme-bg-light'"
        class="mx-auto h-16 w-auto"
        src="@/assets/img/logo-light.png"
        alt="Logo"
      />
      <img
        v-else
        class="mx-auto h-16 w-auto"
        src="@/assets/img/logo-dark.png"
        alt="Logo"
      />
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
