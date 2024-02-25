import { defineStore } from 'pinia';
import { Store } from '@/types/Store';
import observeWindowSize from '@/utils/observeWindowSize';
import { getVehicles } from '@/services/api';
import { FilterType, FilterValue } from '@/types/Filter';

export const useMainStore: Store = defineStore('main', {
  state: () => ({
    windowWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
    isLoaded: false,

    vehicleList: [],
    filteredVehicleList: [],

    filtersState: {
      [FilterType.LEVEL]: {
        options: [],
        values: [],
      },
      [FilterType.TYPE]: {
        options: [],
        values: [],
      },
      [FilterType.NATION]: {
        options: [],
        values: [],
      },
    },
  }),
  getters: {
    isMobile: (state: Store) => state.windowWidth < 729,

    isFiltered({ filtersState }) {
      return Object.values(filtersState).some(({ values }) => values.length);
    },

    filteredVehicleList({ vehicleList, filtersState }) {
      if (!this.isFiltered) {
        return [];
      }

      return vehicleList.filter((vehicle) => (!filtersState.type.values.length
              || filtersState.type.values.some(({ name }) => vehicle.type.name === name))
          && (!filtersState.level.values.length
              || filtersState.level.values.some(({ name }) => vehicle.level === name))
          && (!filtersState.nation.values.length
              || filtersState.nation.values.some(({ name }) => vehicle.nation.name === name)));
    },
  },
  actions: {
    observeWindowSize() {
      observeWindowSize(({ width }: { width: number }) => {
        this.windowWidth = width;
      });
    },

    async setAllVehicles() {
      this.vehicleList = await getVehicles();
      this.isLoaded = true;
    },

    setOption({ type, value }: { type: FilterType; value: FilterValue }) {
      const filterValues = this.filtersState[type].values;
      const isAlreadySelected = filterValues.find(({ name }) => name === value.name);

      if (isAlreadySelected) {
        this.filtersState[type].values = filterValues.filter(({ name }) => name !== value.name);
      } else {
        this.filtersState[type].values.push(value);
      }
    },

    resetFilters() {
      Object.keys(this.filtersState).forEach((key) => {
        this.filtersState[key].values = [];
      });
    },
  },
});
