<template>
  <Motion
    :auto="['scale-0 opacity-0', 'scale-100 opacity-100']"
    :options="{
      repeat: true,
      duration: 500,
      factor: 4,
      skip: 1,
      instantRollback: true,
    }"
    class="h-3 w-3 bg-indigo-600 rounded-full"
  />
</template>

<script lang="ts">
import Vue from "vue";
import Motion from "tinymotion";

export default {
  components: { Motion },
  data() {
    return {
      //   options: {
      //     repeat: true,
      //     duration: 500,
      //     factor: 4,
      //     skip: 1,
      //     instantRollback: true,
      //     // repeat: true,           // infinite animation until stopped
      //     // rollback: true,         // reverse animation until return to the first keyframe
      //     // instantRollback: true,  // instantly return to the first keyframe
      //     // delay: 0,               // delay before the start
      //     // stepDelay: 0,           // delay between keyframes
      //     // factor: 1,              // delay factor (number of steps to skip) before every step
      //     // skip: 0,                // number of steps to skip before the first flip
      //     // duration: 600,          // default duration. might be overridden by duration-{value} Tailwind class
      //     // ease: 'ease-in-out',    // transition timing function
      //   },
    };
  },
};
</script>
