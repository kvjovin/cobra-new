<template><DefaultLayout></DefaultLayout></template>

<script lang="ts">
import { defineComponent } from "vue";
import DefaultLayout from "./components/layouts/DefaultLayout.vue";
export default defineComponent({
  components: {
    DefaultLayout,
  },
});
</script>
<style lang="scss">
@import "./styles/App.scss";
</style>
