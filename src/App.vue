<template>
  <div class="app">
    <h1 class="app__title">
      Shipopedia
    </h1>

    <ShipFilters
      :filters="filters"
      class="app__filters"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  computed, onBeforeMount, ref,
} from 'vue';
import observeWindowSize from '@/utils/observeWindowSize';
import { getVehicle } from '@/services/api';
import { Vehicle } from '@/types/Vehicle';
import { Filter, FilterType } from '@/types/Filter';
import ShipFilters from '@/components/ShipFilters.vue';

const windowWidth = ref<number>(window.innerWidth);
const allVehicles = ref<Vehicle[]>([]);
const filters = ref<Filter[]>([]);

const isMobile = computed(() => windowWidth.value <= 768);

observeWindowSize(({ width }: { width: number }) => {
  windowWidth.value = width;
});

const getFilterOptions = () => {
  const vehiclePropertiesMaps = {
    [FilterType.LEVEL]: new Set<number>(),
    [FilterType.TYPE]: new Set<string>(),
    [FilterType.NATION]: new Set<string>(),
  };

  allVehicles.value.forEach((vehicle: Vehicle) => {
    vehiclePropertiesMaps[FilterType.LEVEL].add(vehicle.level);
    vehiclePropertiesMaps[FilterType.TYPE].add(vehicle.type.name);
    vehiclePropertiesMaps[FilterType.NATION].add(vehicle.nation.name);
  });

  filters.value = Object.entries(vehiclePropertiesMaps).map(([type, values]) => ({
    type,
    values: Array.from(values),
  }));
};

onBeforeMount(async () => {
  allVehicles.value = await getVehicle();
  getFilterOptions();
});
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
@import "@/assets/scss/responsive.scss";

.app {
  position: relative;
  height: 100%;
  max-height: 100vh;
  max-width: 100vw;
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;

  ::-webkit-scrollbar {
    width: .5rem;

    @include layout-mobile {
      width: .3rem;
      height: 0;
    }
  }

  ::-webkit-scrollbar-track {
    background-color:  transparent;
    -webkit-border-radius: .6rem;
    border-radius: 3rem;

    @include layout-mobile {
      -webkit-border-radius: .5rem;
      border-radius: 3rem;
    }
  }

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: .6rem;
    border-radius: .6rem;
    background: white;

    @include layout-mobile {
      -webkit-border-radius: .5rem;
      border-radius: .5rem;
    }
  }
}
</style>
