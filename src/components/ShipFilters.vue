<template>
  <div
    :class="shipFiltersCLassList"
    @mouseenter="handleFilterMouseEnter"
    @mouseleave="handleFilterMouseLeave"
  >
    <ShipFilter
      v-for="filter in filters"
      :key="filter.type"
      :label="filter.type"
      :data="filter.data"
      class="ship-filters__item"
      :is-opened="isFiltersOpened"
    />
  </div>
</template>

<script setup lang="ts">
import { Filter } from '@/types/Filter';
import ShipFilter from '@/components/ShipFilter.vue';
import { computed, ref } from 'vue';

defineProps<{
  filters: Filter[];
}>();

const isFiltersOpened = ref<boolean>(false);

const shipFiltersCLassList = computed(() => [
  'ship-filters',
  { 'ship-filters--is-active': isFiltersOpened.value },
]);

//
// const handleFilterClick = () => {
//   isFilterOpened.value = !isFilterOpened.value;
// };

const handleFilterMouseEnter = () => {
  isFiltersOpened.value = true;
};

const handleFilterMouseLeave = () => {
  isFiltersOpened.value = false;
};
</script>

<style lang="scss" scoped>
.ship-filters {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  width: 100%;
  height: 100%;
  margin-top: 2.6rem;
  background: $color-dark;

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
  }
}
</style>
