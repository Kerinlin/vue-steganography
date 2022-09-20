<template>
  <router-view />
  <notifications :duration="5000" />
</template>

<style lang="scss">
.vue-notification {
  // background: #212223 !important;
  // border-left: 5px solid #323335 !important;
}
</style>
