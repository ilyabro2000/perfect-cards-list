export enum FilterType {
  NATION = 'nation',
  LEVEL = 'level',
  TYPE = 'type',
}

export type FilterOption = string | number;

export interface FilterValue {
  name: FilterOption;
  icon: string | null;
}

export interface Filter {
  options: FilterOption[];
  values: FilterValue[];
}
