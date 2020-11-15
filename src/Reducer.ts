import { useReducer } from 'react';
import { ContextState, initContextState } from './Context';
import { Actions, PointItem } from './types/types';

export const useMapState = () => {
  const [state, dispatch] = useReducer(
    (state: ContextState, action: Actions<any>) => {
      switch (action.type) {
        case 'PointsUpdate':
          return {
            ...state,
            points: action.payload,
          };
        case 'SelectPoint':
          return {
            ...state,
            index: action.payload,
          };
        default:
          return state;
      }
    },
    initContextState,
  );
  const pointsUpdate = (list: PointItem[]) =>
    dispatch({ type: 'PointsUpdate', payload: list });
  const selectPoint = (index: number) =>
    dispatch({ type: 'SelectPoint', payload: index });

  return {
    state,
    pointsUpdate,
    selectPoint,
  };
};
