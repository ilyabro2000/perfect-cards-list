<template>
  <div class="list-main">
    <div
      v-if="isFiltered"
      class="list-main__list"
    >
      <div
        v-if="filteredVehicleList.length"
        class="list-main__inner"
      >
        <div class="list-main__list-item list-main__top-bar">
          <p
            v-for="columnName in COLUMN_NAMES"
            :key="columnName"
            class="list-main__top-bar-item"
          >
            {{ columnName }}
          </p>
        </div>

        <ListItem
          v-for="vehicle in filteredVehicleList"
          :key="vehicle.id"
          :vehicle="vehicle"
          class="list-main__list-item"
        />
      </div>

      <p
        v-else
        class="list-main__tip"
      >
        No vehicles found
      </p>
    </div>

    <ListTip
      v-else
      class="list-main__tip"
    />
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/main';
import { storeToRefs } from 'pinia';
import ListTip from '@/components/list/ListTip.vue';
import ListItem from '@/components/list/ListItem.vue';

const mainStore = useMainStore();

const COLUMN_NAMES = ['Vehicle name', 'Level', 'Type', 'Nation'];

const { isFiltered, filteredVehicleList } = storeToRefs(mainStore);
</script>

<style lang="scss" scoped>
.list-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2rem;

  &__list {
    width: 100%;
  }

  &__list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
    padding: .5rem;
  }

  &__top-bar {
    background-color: rgba($color-gold, .2);
  }

  &__top-bar-item, {
    text-align: center;
    width: 100%;

    &:not(:last-child) {
      border-right: .034rem solid rgba($color-gold, .4);
    }

    @include layout-mobile {
      &:nth-child(1) {
        width: 150%;
      }
    }
  }

  &__tip {
    margin: 2rem 0;
    font-weight: 700;
    text-align: center;
    font-size: 2rem;

    @include layout-mobile {
      margin-top: 4rem;
    }
  }
}
</style>
