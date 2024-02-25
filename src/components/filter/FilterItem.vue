<template>
  <div :class="shipFilterClassList">
    <div
      class="filters-main__top"
      @click="handleFilterClick"
    >
      <div class="filters-main__label">
        {{ label }}
      </div>

      <ArrowTop
        v-if="isOpened"
        class="filters-main__arrow"
      />

      <div
        v-else
        class="filters-main__values"
      >
        <template v-if="isNumber">
          <p
            v-for="value in values"
            :key="value"
            class="filters-main__value-number"
          >
            {{ value.name }}
          </p>
        </template>

        <template v-else>
          <img
            v-for="value in values"
            :key="value.name"
            class="filters-main__value-image"
            :src="value?.icon ?? ''"
            :alt="value.name"
          >
        </template>
      </div>
    </div>

    <transition name="fade">
      <ul
        v-if="isOpened"
        class="filters-main__selector"
      >
        <FilterOption
          v-for="(option, index) in optionsData"
          :key="option.name"
          :value="option.name"
          :index="index"
          :color="option.color ?? null"
          :icon="option.icons ?? null"
          :is-selected="isOptionSelected(option.name)"
          class="filters-main__option"
          @select="handleFilterSelect"
        >
          {{ option.name }}
        </FilterOption>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { FilterOption as FilterOptionType, FilterType, FilterValue } from '@/types/Filter';
import { computed } from 'vue';
import FilterOption from '@/components/filter/FilterOption.vue';
import ArrowTop from '@/components/icons/ArrowTop.vue';
import { useMainStore } from '@/store/main';
import { storeToRefs } from 'pinia';

const mainStore = useMainStore();
const { filtersState, isMobile, isFiltersOpened } = storeToRefs(mainStore);

const props = defineProps<{
  label: FilterType;
  options: FilterOptionType[];
  isOpened: boolean;
}>();

const values = computed(() => filtersState.value[props.label].values);

const shipFilterClassList = computed(() => [
  'filters-main',
  { 'filters-main--is-active': props.isOpened },
]);

const isNumber = computed(() => values.value?.every((item) => typeof item.name === 'number'));

const optionsData = computed(() => {
  const unSortedOptionsData = props.options.map((item: FilterOptionType) => {
    if (typeof item === 'number') {
      return {
        name: item,
      };
    }

    try {
      return JSON.parse(item);
    } catch (error) {
      console.error(error);
      return {
        name: item,
      };
    }
  });

  return unSortedOptionsData.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
});

const isOptionSelected = (option: FilterOptionType) => (
  values.value.findIndex((value) => value?.name === option) > -1
);

const handleFilterSelect = (value: FilterValue) => {
  mainStore.setOption({
    type: props.label,
    value,
  });
};

const handleFilterClick = () => {
  if (!isMobile.value) return;

  isFiltersOpened.value = !isFiltersOpened.value;
};
</script>

<style lang="scss" scoped>
.filters-main {
  width: 100%;
  overflow-x: hidden;

  &__top {
    position: relative;
    display: flex;
    align-items: center;
    gap: .8rem;
    width: 100%;
    height: 4rem;
    padding: 0.6rem 1rem;
    background-color: $color-additional;

    @include layout-mobile {
      padding: .6rem .8rem;
      height: auto;
      gap: 1rem;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 20%;
      height: 100%;
      background: linear-gradient(90deg, rgba($color-additional, 0) 0%, $color-additional 100%);
      z-index: 10;
      transition-duration: .12s;
    }
  }

  &__values {
    display: flex;
    align-items: center;
    gap: .8rem;
  }

  &__selector {
    display: flex;
    flex-direction: column;
    gap: .1rem;
    width: 100%;
    padding: 0 1.2rem;
    margin-top: .4rem;
    transition-duration: .12s;
    margin-bottom: 1.6rem;
  }

  &__label {
    font-size: 1.4rem;
    font-weight: 700;
    cursor: pointer;
    text-transform: uppercase;

    @include layout-mobile {
      font-size: 1.2rem;
      width: 4rem;
    }
  }

  &--is-active {
    .filters-main__top {
      background-color: transparent;

      &::before {
        background: transparent;
      }

      @include layout-mobile {
        padding: 1rem 2rem;
      }
    }
  }

  &__value-image {
    width: 2.6rem;
    height: auto;
    max-height: 2.3rem;
  }

  &__value-number {
    font-size: 1.5rem;
    font-weight: 700;

    @include layout-mobile {
      font-size: 1.2rem;
    }
  }

  &__arrow {
    width: 2rem;
    height: auto;
    color: $color-white;
  }
}
</style>
