<template>
  <transition
    name="slide-up"
    appear
  >
    <li
      :class="filterOptionClassList"
      :style="{ transitionDelay }"
      @click="handleSelect"
      @mouseleave="isHovered = false"
      @mouseenter="isHovered = true"
    >
      <div class="filter-option__inner">
        <img
          v-if="icon"
          :src="icon.default ?? icon.large"
          :alt="value"
          class="filter-option__icon"
        >

        <p>{{ upperCase(value) }}</p>

        <div class="filter-option__status-wrapper">
          <component
            :is="currenIcon"
            class="filter-option__status-icon"
          />
        </div>
      </div>
    </li>
  </transition>
</template>

<script setup lang="ts">
import { VehicleNationIcon, VehicleTypeIcon } from '@/types/Vehicle';
import { FilterOption } from '@/types/Filter';
import { computed, ref } from 'vue';
import DoneIcon from '@/components/icons/DoneIcon.vue';
import PlusIcon from '@/components/icons/PlusIcon.vue';
import CLoseIcon from '@/components/icons/CLoseIcon.vue';

const props = defineProps<{
  value: FilterOption;
  icon: VehicleTypeIcon | VehicleNationIcon | null;
  color: string | null;
  index: number;
  isSelected: boolean;
}>();

const isHovered = ref<boolean>(false);

const emits = defineEmits(['select']);

const transitionDelay = computed(() => `${(props.index * 0.03).toFixed(1)}s`);

const currenIcon = computed(() => {
  if (props.isSelected && !isHovered.value) {
    return DoneIcon;
  }

  if (props.isSelected) {
    return CLoseIcon;
  }

  return PlusIcon;
});
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

const filterOptionClassList = computed(() => [
  'filter-option',
  { 'filter-option--is-selected': props.isSelected },
]);
</script>

<style lang="scss" scoped>
.filter-option {
  width: 100%;
  height: 100%;
  cursor: pointer;
  transform: translate3d(0, 0, 0);

  @include hover {
    .filter-option__inner::before {
      transform: translateX(0);
    }

    .filter-option__status-wrapper {
      opacity: 1;
    }
  }

  &__inner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    padding: .4rem .8rem;
    overflow: hidden;

    &::before {
      position: absolute;
      content: '';
      left: 0;
      width: 100%;
      height: 100%;
      transform: translateX(-101%);
      transition: transform .4s .15s cubic-bezier(0.85, 0, 0.15, 1);
      background-color: $color-additional;
    }
  }

  &--is-selected {
    .filter-option__inner::before {
      transform: translateX(0);
    }

    .filter-option__status-wrapper {
      opacity: 1;
    }
  }

  &__icon {
    width: 2rem;
    height: auto;
    max-height: 1.6rem;
  }

  &__icon,
  p,
  &__status-wrapper {
    position: relative;
    z-index: 5;
  }

  &__status-wrapper {
    margin-left: auto;
    width: 1rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: .05rem solid $color-main;
    opacity: 0;
    transition: opacity .3s ease-in;
  }

  &__status-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
    color: $color-main;
  }
}
</style>
