import React from 'react';
import styled from 'styled-components';
import { ArrowLeft, ArrowRight } from '../components/icons';

const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  .prev,
  .next {
    border: none;
    outline: none;
    background-color: transparent;
    padding: 0;
    margin: 0 4px;
    height: 28px;
    width: 30px;
    .svg-inline--fa {
      font-size: 28px;
    }
  }
  .pages {
    .pages-item {
      margin: 0 2px;
      font-size: 16px;
    }
  }
`;

export default ({ pages, currentPage, onPaginationClick }) => {
  return (
    <PaginationWrapper>
      <button className='prev' disabled={currentPage === 1} onClick={() => onPaginationClick(currentPage-1)}><ArrowLeft /></button>
      <div className='pages'>
        <span className='pages-item current-page'>{currentPage}</span>
        <span className='pages-item separator-page'>/</span>
        <span className='pages-item total-pages'>{pages}</span>
      </div>
      <button className='next' disabled={currentPage === pages} onClick={() => onPaginationClick(currentPage+1)}><ArrowRight /></button>
    </PaginationWrapper>
  );
}