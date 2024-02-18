<template>
  <li
    class="filter-option"
    @click="handleSelect"
  >
    <img
      v-if="icon"
      :src="icon.default ?? icon.large"
      :alt="value"
      class="filter-option__icon"
    >

    <p>{{ upperCase(value) }}</p>
  </li>
</template>

<script setup lang="ts">
import { VehicleNationIcon, VehicleTypeIcon } from '@/types/Vehicle';
import { FilterOption } from '@/types/Filter';

const props = defineProps<{
  value: FilterOption;
  icon: VehicleTypeIcon | VehicleNationIcon | null;
  color: string | null;
}>();

const emits = defineEmits(['select']);

const handleSelect = () => {
  emits('select', {
    name: props.value,
    icon: props?.icon?.default ?? props?.icon?.large ?? null,
  });
};

const upperCase = (value: FilterOption) => {
  if (typeof value === 'string') {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  return value;
};
</script>

<style lang="scss" scoped>
.filter-option {
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
  gap: 1rem;
  padding: .2rem .3rem;

  @include hover {
    background-color: $color-additional;
  }

  &__icon {
    width: 2rem;
    height: auto;
    max-height: 1.6rem;
  }
}
</style>
