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
import ShipFilters from '@/components/filter/FiltersMain.vue';
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
  padding: 1rem 3rem;
  min-height: 100vh;
  overflow-x: hidden;

  @include layout-mobile {
    padding: 1rem 1.6rem;
  }

  &__title {
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 700;
    margin-top: 2rem;

    @include layout-mobile {
      font-size: 2.4rem;
      margin-top: 1rem;
    }
  }

  &__list {
    position: absolute;
    top: 17rem;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    padding: 0 3rem;
    margin: 0 auto;

    @include layout-mobile {
      top: 19.4rem;
      padding: 0 1.6rem;
    }
  }

  &__filters {
    position: relative;
    z-index: 5;
  }
}
</style>
