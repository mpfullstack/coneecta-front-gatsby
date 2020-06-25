import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Pagination } from 'react-bootstrap';
import { range } from '../helpers/helpers';

const PaginationWrapper = styled.div`

`;

export default ({ pages, currentPage, onPaginationClick }) => {
  return (
    <PaginationWrapper>
      <Pagination size="sm">
        {currentPage > 1 ?
          <>
            <Pagination.First onClick={() => onPaginationClick(1)}/>
            <Pagination.Prev onClick={() => onPaginationClick(currentPage-1)} />
          </> : null}
        {
          range(currentPage, Math.min(currentPage+2, pages), 1).map(p => {
            return (<Pagination.Item
              key={`page-${p}`}
              onClick={() => onPaginationClick(p)}
              active={p === currentPage}>
              {p}
            </Pagination.Item>);
          })
        }
        <>
          <Pagination.Next onClick={() => onPaginationClick(currentPage+3)} />
          <Pagination.Last onClick={() => onPaginationClick(pages)} />
        </>
      </Pagination>
    </PaginationWrapper>
  );
}