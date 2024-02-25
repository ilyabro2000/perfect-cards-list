<template>
  <div class="app">
    <h1 class="app__title">
      Shipopedia
    </h1>

    <ShipFilters class="app__filters" />

    <div class="app__list">
      <ListMain />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ShipFilters from '@/components/filter/FiltersItem.vue';
import { useMainStore } from '@/store/main';
import ListMain from '@/components/list/ListMain.vue';

const mainStore = useMainStore();

mainStore.observeWindowSize();
mainStore.setAllVehicles();
</script>

<style lang="scss">
.app {
  position: relative;
  margin: 0 auto;
  padding: 1rem 4rem;
  min-height: 100vh;
  overflow-x: hidden;

  &__title {
    text-transform: uppercase;
    font-size: 2.6rem;
    font-weight: 700;
    margin-top: 2rem;
  }

  &__list {
    position: absolute;
    top: 12.5rem;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    padding: 0 4rem;
    margin: 0 auto;
  }

  &__filters {
    position: relative;
    z-index: 5;
  }
}
</style>
