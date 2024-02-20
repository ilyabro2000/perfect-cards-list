import { defineStore } from 'pinia';
import { Store } from '@/types/store';
import observeWindowSize from '@/utils/observeWindowSize';
import { getVehicles } from '@/services/api';
import { FilterType } from '@/types/Filter';

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
      [FilterType.NATION]: {
        options: [],
        values: [],
      },
      [FilterType.TYPE]: {
        options: [],
        values: [],
      },
    },
  }),
  getters: {
    isMobile: (state: Store) => state.windowWidth < 729,

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
  },
});
