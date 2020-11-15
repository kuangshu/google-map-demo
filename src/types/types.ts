export type PointItem = [number, number];
export type Actions<T> = {
  type: string;
  payload?: T;
};
