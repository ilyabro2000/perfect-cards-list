export interface Vehicle {
  title: string,
  description: string,
  level: number,
  id: number,
  icons: {
    large: string,
    medium: string,
  },
  type: {
    name: string,
    title: string,
    icons: {
      default: string,
    },
  },
  nation: {
    name: string,
    title: string,
    color: string,
    icons: {
      small: string,
      medium: string,
      large: string,
    },
  },
}
