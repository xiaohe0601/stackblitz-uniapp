<template>
  <view class="app-page">
    <slot></slot>
  </view>
</template>

<script lang="ts" setup>
defineOptions({
  name: "AppPage",
  options: {
    virtualHost: true
  }
});

defineSlots<{
  default?: () => any;
}>();
</script>

<style lang="scss" scoped>
.app-page {
  position: relative;
}
</style>