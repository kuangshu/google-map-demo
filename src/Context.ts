import { createContext } from 'react';
import { PointItem } from './types/types';

export type ContextState = {
  points: google.maps.LatLng[];
  index: number;
};
export const initContextState: ContextState = { points: [], index: 0 };
export const Context: React.Context<ContextState> = createContext(
  initContextState,
);
export const centerPoint: PointItem = [30.67, 104.06];
