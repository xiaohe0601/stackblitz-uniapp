<template>
  <app-page>
    <text>{{ title }}</text>
  </app-page>
</template>

<script lang="ts" setup>
const title = ref("Hello World!");
</script>

<style lang="scss" scoped>

</style>

<route lang="json5" type="home">
{ }
</route>