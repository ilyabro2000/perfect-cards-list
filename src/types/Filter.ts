export enum FilterType {
  NATION = 'nation',
  LEVEL = 'level',
  TYPE = 'type',
}

export interface Filter {
  [FilterType.NATION]: {
    type: string;
    value: string[];
  };
  [FilterType.LEVEL]: {
    type: string;
    value: number[];
  };
  [FilterType.TYPE]: {
    type: string;
    value: string[];
  };
}
