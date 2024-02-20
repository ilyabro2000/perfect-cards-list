<template>
  <div
    :class="shipFiltersCLassList"
    @mouseenter="handleFilterMouseEnter"
    @mouseleave="handleFilterMouseLeave"
  >
    <div class="ship-filters__main">
      <ShipFilter
        v-for="filter in filters"
        :key="filter.type"
        :label="filter.type"
        :data="filter.data"
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
      >
        <CLoseIcon class="ship-filters__bottom-bar-button-icon" />
        Reset
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Filter } from '@/types/Filter';
import ShipFilter from '@/components/ShipFilter.vue';
import { computed, ref } from 'vue';
import CLoseIcon from '@/components/icons/CLoseIcon.vue';

defineProps<{
  filters: Filter[];
}>();

const isFiltersOpened = ref<boolean>(false);
const bottomBarEl = ref<HTMLElement | null>(null);

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
