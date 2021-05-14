<template>
  <div
    class="z-40 p-2 fixed left-0 bottom-0 ml-12 mb-10 rounded-sm bg-opacity-75 border-1 border-gray-500"
  >
    <a
      v-for="(color, index) in colors"
      :key="index"
      :class="
        ' inline-flex cursor-pointer w-4 h-4 rounded-sm mx-1 bg-' +
          color +
          '-500'
      "
      class="border border-text transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-150"
      @click="setColor(color)"
    ></a>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { mapGetters } from "vuex";

@Component({
  components: {},
  computed: {
    ...mapGetters("theme", {
      marketingTheme: "marketingTheme",
      marketingColor: "marketingColor"
    })
  }
})
export default class ColorSwitcherComponent extends Vue {
  colors = [
    "red",
    "orange",
    "amber",
    // "yellow",
    // "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "lightBlue",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    // "pink",
    "rose",
    // "gray",
    "blueGray",
    "coolGray"
    // "trueGray",
    // "warmGray"
  ];
  setColor(color) {
    this.$store.commit("theme/marketingColor", "theme-" + color);
  }
}
</script>
<style></style>
