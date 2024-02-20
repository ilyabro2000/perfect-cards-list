<template>
  <div
    :class="shipFiltersCLassList"
    @mouseenter="handleFilterMouseEnter"
    @mouseleave="handleFilterMouseLeave"
    @click="handleFilterClick"
  >
    <div class="ship-filters__main">
      <ShipFilter
        v-for="[label, filter] in Object.entries(filtersState)"
        :key="label"
        :label="label"
        :options="filter.options"
        class="ship-filters__item"
        :is-opened="isFiltersOpened"
      />
    </div>

    <div
      ref="bottomBarEl"
      class="ship-filters__bottom-bar"
    >
      <p class="ship-filters__bottom-bar-result">
        Found: 0
      </p>

      <button
        v-show="isFiltersOpened"
        type="button"
        class="ship-filters__bottom-bar-button"
        @click="handleResetButtonClick"
      >
        <CLoseIcon class="ship-filters__bottom-bar-button-icon" />
        Reset
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FilterType } from '@/types/Filter';
import ShipFilter from '@/components/ShipFilter.vue';
import { computed, ref, watch } from 'vue';
import CLoseIcon from '@/components/icons/CLoseIcon.vue';
import { useMainStore } from '@/store/main';
import { storeToRefs } from 'pinia';
import { Vehicle } from '@/types/Vehicle';

const mainStore = useMainStore();
const {
  vehicleList,
  isLoaded,
  filtersState,
} = storeToRefs(mainStore);

const { isMobile } = storeToRefs(mainStore);

const isFiltersOpened = ref<boolean>(false);
const bottomBarEl = ref<HTMLElement | null>(null);

const shipFiltersCLassList = computed(() => [
  'ship-filters',
  { 'ship-filters--is-active': isFiltersOpened.value },
]);

const handleFilterClick = () => {
  if (!isMobile.value) return;

  isFiltersOpened.value = !isFiltersOpened.value;
};

const handleFilterMouseEnter = () => {
  if (isMobile.value) return;

  isFiltersOpened.value = true;
};

const handleFilterMouseLeave = () => {
  if (isMobile.value) return;

  isFiltersOpened.value = false;
};

const initFilterOptions = () => {
  const vehiclePropertiesMaps = {
    [FilterType.LEVEL]: new Set<number>(),
    [FilterType.TYPE]: new Set<string>(),
    [FilterType.NATION]: new Set<string>(),
  };

  vehicleList.value.forEach((vehicle: Vehicle) => {
    vehiclePropertiesMaps[FilterType.LEVEL].add(vehicle.level);
    vehiclePropertiesMaps[FilterType.NATION].add(JSON.stringify(vehicle.nation));
    vehiclePropertiesMaps[FilterType.TYPE].add(JSON.stringify(vehicle.type));
  });

  Object.entries(vehiclePropertiesMaps).forEach(([type, values]) => {
    filtersState.value[type].options = Array.from(values);
  });
};

const handleResetButtonClick = () => {
  Object.keys(filtersState.value).forEach((key) => {
    filtersState.value[key].values = [];
  });
};

watch(isLoaded, () => {
  initFilterOptions();
});
</script>

<style lang="scss" scoped>
.ship-filters {
  width: 100%;
  margin-top: 1rem;
  transition: background-color .3s;

  &__main {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    width: 100%;
  }

  &__item {
    &:nth-child(1) {
      grid-area: 1 / 1 / 2 / 3;
    }

    &:nth-child(2) {
      grid-area: 1 / 3 / 2 / 6;
    }

    &:nth-child(3) {
      grid-area: 1 / 6 / 2 / 9;
    }

    &:not(:last-child) {
      border-right: .034rem solid $color-main;
    }
  }

  &--is-active {
    .ship-filters__item:not(:last-child) {
      border-right: .034rem solid $color-white;
    }

    background-color: $color-dark;

    .ship-filters__bottom-bar {
      border-top: .16rem solid $color-additional;
    }
  }

  &__bottom-bar {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1.2rem;
    padding: 0.6rem 1rem;
    background-color: $color-dark;
    text-transform: uppercase;
    font-size: 0.9rem;

    &-button {
      display: flex;
      align-items: center;
      background-color: transparent;
      font-size: .8rem;
      gap: .2rem;
      text-transform: uppercase;
      color: $color-white;
      opacity: .6;
      transition: opacity .12s linear;
      cursor: pointer;
      line-height: 1;

      @include hover {
        opacity: 1;
      }

      &-icon {
        width: .8rem;
        height: auto;
        color: $color-white;
      }
    }
  }
}
</style>
