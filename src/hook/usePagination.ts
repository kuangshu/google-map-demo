import { useCallback, useReducer } from 'react';
import { Actions } from '../types/types';

type Pagination = {
  total: number;
  pageNum: number;
  pageSize: number;
};

const usePagination = (total = 0, startPageNum = 1, pageSize = 25) => {
  const [state, dispatch] = useReducer<
    (state: Pagination, action: Actions<number>) => Pagination
  >(
    (state, action) => {
      switch (action.type) {
        case 'NextPage':
          return state.pageNum + 1 <= Math.ceil(state.total / state.pageSize)
            ? { ...state, pageNum: state.pageNum + 1 }
            : state;
        case 'PrePage':
          return state.pageNum - 1 > 0
            ? { ...state, pageNum: state.pageNum - 1 }
            : state;
        case 'GoFirstPage':
          return { ...state, pageNum: 1 };
        case 'UpdateTotal':
          return {
            ...state,
            pageNum: 1,
            total:
              typeof action.payload === 'number' ? action.payload : state.total,
          };
        default:
          return state;
      }
    },
    { total, pageNum: startPageNum, pageSize },
  );

  const nextPage = useCallback(() => {
    dispatch({ type: 'NextPage' });
  }, []);
  const prePage = useCallback(() => {
    dispatch({ type: 'PrePage' });
  }, []);
  const goFirstPage = useCallback(() => {
    dispatch({ type: 'GoFirstPage' });
  }, []);
  const updateTotal = useCallback((total: number) => {
    dispatch({ type: 'UpdateTotal', payload: total });
  }, []);
  return {
    state,
    nextPage,
    prePage,
    goFirstPage,
    updateTotal,
  };
};

export default usePagination;
