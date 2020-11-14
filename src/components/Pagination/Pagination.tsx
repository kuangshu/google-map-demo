import React, { useState } from 'react';
import './Pagination.css';

function Pagination() {
  return (
    <div className='Pagination'>
      <button>&lt;</button>
      <button>&gt;</button>
    </div>
  );
}

const usePagination = (startNum = 1) => {
  const [pageNum, setPageNum] = useState(startNum);
  const nextPage = () => {
    setPageNum(pageNum + 1);
  };
  const prePage = () => {
    setPageNum(pageNum - 1);
  };
  return {
    nextPage,
    prePage,
  };
};

export default Pagination;
