<template>
  <div :class="shipFilterClassList">
    <div class="ship-filter__top">
      <div class="ship-filter__label">
        {{ label }}
      </div>

      <div class="ship-filter__values">
        <template v-if="isNumber">
          <p
            v-for="value in values"
            :key="value"
            class="ship-filter__value-number"
          >
            {{ value.name }}
          </p>
        </template>

        <template v-else>
          <img
            v-for="value in values"
            :key="value.name"
            class="ship-filter__value-image"
            :src="value?.icon ?? ''"
            :alt="value.name"
          >
        </template>
      </div>
    </div>

    <ul
      v-show="isOpened"
      class="ship-filter__selector"
    >
      <FilterOption
        v-for="option in optionsData"
        :key="option.name"
        :value="option.name"
        :color="option.color ?? null"
        :icon="option.icons ?? null"
        @select="handleFilterSelect"
      >
        {{ option.name }}
      </FilterOption>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { FilterOption as FilterOptionType, FilterType, FilterValue } from '@/types/Filter';
import { computed, ref } from 'vue';
import FilterOption from '@/components/FilterOption.vue';

const props = defineProps<{
  label: FilterType;
  data: FilterOptionType[];
  isOpened: boolean;
}>();

const values = ref<FilterValue[]>([]);

const shipFilterClassList = computed(() => [
  'ship-filter',
  { 'ship-filter--is-active': props.isOpened },
]);

const isNumber = computed(() => values.value.every((item) => typeof item.name === 'number'));

const optionsData = computed(() => {
  const unSortedOptionsData = props.data.map((item: FilterOptionType) => {
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

const handleFilterSelect = (value: FilterValue) => {
  const isAlreadySelected = values.value.find((filterValue) => filterValue.name === value.name);

  if (isAlreadySelected) {
    values.value = values.value.filter((filterValue) => filterValue.name !== value.name);
    return;
  }

  values.value?.push(value);
};
</script>

<style lang="scss" scoped>
.ship-filter {
  width: 100%;
  overflow-x: hidden;
  height: 100%;

  &__top {
    display: flex;
    align-items: center;
    gap: .8rem;
    width: 100%;
    height: 2.4rem;
    padding: 0.6rem 1rem;
    background-color: $color-additional;
  }

  &__values {
    display: flex;
    align-items: center;
    gap: .4rem;
  }

  &__selector {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 3.2rem;
    padding: 0 1.2rem;
    margin-top: 1rem;
  }

  &__label {
    font-size: .8rem;
    font-weight: 700;
    cursor: pointer;
    text-transform: uppercase;
  }

  &--is-active {
    .ship-filter__label {
      background-color: transparent;
    }
  }

  &__value-image {
    width: 2rem;
    height: auto;
    max-height: 1.6rem;
  }

  &__value-number {
    font-size: 1rem;
    font-weight: 700;
  }
}
</style>
