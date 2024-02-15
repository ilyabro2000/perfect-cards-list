<template>
  <div class="ship-filter">
    <div class="ship-filter__label">
      {{ label }}
    </div>

    <select class="ship-filter">
      <option
        v-for="option in options"
        :key="option"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { FilterType } from '@/types/Filter';

defineProps<{
  label: FilterType;
  options: string[] | number[];
}>();
</script>

<style lang="scss" scoped>
.ship-filter {
  //
}
</style>
