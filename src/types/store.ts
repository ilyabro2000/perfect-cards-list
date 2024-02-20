import { Vehicle } from '@/types/Vehicle';
import { FilterType, FilterValue } from '@/types/Filter';

export interface Store {
  isMobile: boolean;
  vehicleList: Vehicle[];
  filteredVehicleList: Vehicle[];
  filtersState: {
    [FilterType.LEVEL]: {
      options: FilterValue[];
      values: FilterValue[];
    };
    [FilterType.NATION]: {
      options: FilterValue[];
      values: FilterValue[];
    };
    [FilterType.TYPE]: {
      options: FilterValue[];
      values: FilterValue[];
    };
  };
}
