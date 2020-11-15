import React from 'react';
import './Pagination.css';

interface IProp {
  pageNum: number;
  nextPage: () => void;
  prePage: () => void;
}
function Pagination({ pageNum, nextPage, prePage }: IProp) {
  return (
    <div className='Pagination'>
      <button onClick={prePage}>&lt;</button>
      <span>{pageNum}</span>
      <button onClick={nextPage}>&gt;</button>
    </div>
  );
}

export default Pagination;
