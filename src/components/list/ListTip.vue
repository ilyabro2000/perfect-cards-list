<template>
  <div class="list-tip">
    <CurveArrowIcon
      class="list-tip__icon"
    />

    <div class="list-tip__text">
      <h3 class="list-tip__title">
        Use filters to find vehicles
      </h3>

      <p class="list-tip__description">
        No search parameters specified.
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import CurveArrowIcon from '@/components/icons/CurveArrowIcon.vue';
</script>

<style lang="scss" scoped>
.list-tip {
  position: relative;
  display: flex;
  gap: 2rem;
  color: $color-gold;

  &__icon {
    position: absolute;
    left: -4rem;
    top: -2.5rem;
    width: 3rem;
    height: auto;
  }

  &__text {
    text-align: center;
  }

  &__title {
    font-size: 2rem;
    font-weight: 700;
  }

  &__description {
    font-size: 1.4rem;
  }
}
</style>
