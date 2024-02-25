<template>
  <div class="list-item">
    <div class="list-item__vehicle list-item__item">
      <img
        :src="vehicle.icons.medium ?? vehicle.icons.default"
        :alt="vehicle.title"
        class="list-item__image"
      >

      <h3 class="list-item__title list-item__item">
        {{ vehicle.title ?? '[ship name]' }}
      </h3>
    </div>

    <p class="list-item__level list-item__item">
      {{ vehicle.level }}
    </p>

    <p class="list-item__type list-item__item">
      {{ vehicle.type.name }}
    </p>

    <div class="list-item__item">
      <img
        :src="vehicle.nation.icons.large ?? vehicle.nation.icons.default"
        :alt="vehicle.nation.name"
        class="list-item__nation-image"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { Vehicle } from '@/types/Vehicle';

defineProps<{
  vehicle: Vehicle;
}>();
</script>

<style lang="scss" scoped>
.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  transition: background-color 0.3s;
  cursor: pointer;
  text-transform: uppercase;

  &:not(:last-child) {
    border-bottom: .034rem solid rgba($color-gold, .4);
  }

  @include hover {
    background-color: rgba($color-gold, .7);
  }

  &__vehicle {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  &__image {
    width: 4rem;
    height: auto;
  }

  &__nation-image {
    width: 2rem;
    height: auto;
  }

  &__item {
    width: 100%;
    text-align: center;
  }
}
</style>
