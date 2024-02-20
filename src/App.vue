<template>
  <div class="app">
    <h1 class="app__title">
      Shipopedia
    </h1>

    <ShipFilters class="app__filters" />
  </div>
</template>

<script lang="ts" setup>
import ShipFilters from '@/components/ShipFilters.vue';
import { useMainStore } from '@/store/main';

const mainStore = useMainStore();

mainStore.observeWindowSize();
mainStore.setAllVehicles();
</script>

<style lang="scss">
.app {
  position: relative;
  max-width: 144rem;
  margin: 0 auto;
  min-height: 100vh;
  padding: 1rem 4rem;
  overflow: hidden;

  &__title {
    text-transform: uppercase;
    font-size: 2.6rem;
    font-weight: 700;
    margin-top: 2rem;
  }
}
</style>
