<template>
  <div class="ship-filters">
    <ShipFilter
      v-for="filter in filters"
      :key="filter.type"
      :label="filter.type"
      :options="filter.values"
      class="ship-filters__item"
    />
  </div>
</template>

<script setup lang="ts">
import { Filter } from '@/types/Filter';
import ShipFilter from '@/components/ShipFilter.vue';

defineProps<{
  filters: Filter[];
}>();
</script>

<style lang="scss" scoped>
.ship-filters {
  &__item {
    //
  }
}
</style>
