<template>
  <div
    :class="shipFiltersCLassList"
    @mouseenter="handleFilterMouseEnter"
    @mouseleave="handleFilterMouseLeave"
  >
    <div class="filter-item__main">
      <FilterItem
        v-for="[label, filter] in Object.entries(filtersState)"
        :key="label"
        :label="label"
        :options="filter.options"
        class="filter-item__item"
        :is-opened="isFiltersOpened"
      />
    </div>

    <div
      v-if="isFiltered"
      class="filter-item__bottom-bar"
    >
      <p class="filter-item__bottom-bar-result">
        Found: {{ filteredVehicleList.length }}
      </p>

      <button
        v-show="isCancelButtinVisible"
        type="button"
        class="filter-item__bottom-bar-button"
        @click="handleResetButtonClick"
      >
        <CLoseIcon class="filter-item__bottom-bar-button-icon" />
        Reset
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FilterType } from '@/types/Filter';
import FilterItem from '@/components/filter/FilterItem.vue';
import { computed, watch } from 'vue';
import CLoseIcon from '@/components/icons/CLoseIcon.vue';
import { useMainStore } from '@/store/main';
import { storeToRefs } from 'pinia';
import { Vehicle } from '@/types/Vehicle';

const mainStore = useMainStore();
const {
  vehicleList,
  isLoaded,
  filtersState,
  filteredVehicleList,
  isMobile,
  isFiltered,
  isFiltersOpened,
} = storeToRefs(mainStore);

const shipFiltersCLassList = computed(() => [
  'filter-item',
  { 'filter-item--is-active': isFiltersOpened.value },
]);

const isCancelButtinVisible = computed(() => {
  if (isMobile.value) return true;

  return isFiltersOpened.value;
});

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

const handleResetButtonClick = async () => {
  mainStore.resetFilters();

  // wait delete options animation
  setTimeout(() => {
    isFiltersOpened.value = false;
  }, 600);
};

watch(isLoaded, () => {
  initFilterOptions();
});
</script>

<style lang="scss" scoped>
.filter-item {
  width: 100%;
  margin-top: 1.4rem;
  transition: background-color .3s;

  &__main {
    display: grid;
    grid-template-columns: $grid-template-main;
    width: 100%;

    @include layout-mobile {
      display: flex;
      flex-direction: column;
    }
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

      @include layout-mobile {
        border-right: none;
      }
    }
  }

  &--is-active {
    .filter-item__item:not(:last-child) {
      border-right: .034rem solid $color-white;

      @include layout-mobile {
        border-right: none;
      }
    }

    background-color: $color-dark;

    .filter-item__bottom-bar {
      border-top: .16rem solid $color-additional;
    }
  }

  @include  layout-mobile {
    .filter-item__item {
      border: none;
    }

    .filter-item__bottom-bar {
      border-top: .22rem solid $color-additional;
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
    font-size: 1.4rem;

    &-button {
      display: flex;
      align-items: center;
      background-color: transparent;
      font-size: 1.2rem;
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

      @include layout-mobile {
        opacity: 1;
      }

      &-icon {
        width: 1.2rem;
        height: auto;
        color: $color-white;
      }
    }
  }
}
</style>
