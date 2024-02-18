export interface VehicleTypeData {
  name: string,
  title: string,
  icons: {
    default: string,
  }
}

export interface VehicleNationIcon {
  small: string,
  medium: string,
  large: string,
}

export interface VehicleTypeIcon {
  default: string,
}

export interface VehicleNationData {
  name: string,
  title: string,
  color: string,
  icons: VehicleNationIcon,
}

export interface Vehicle {
  title: string,
  description: string,
  level: number,
  id: number,
  icons: VehicleTypeIcon,
  type: VehicleTypeData,
  nation: VehicleNationData,
}
