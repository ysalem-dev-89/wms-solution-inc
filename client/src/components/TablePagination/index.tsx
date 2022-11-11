import { useState } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import './style.css';

export const TablePagination = (props: {
  numOfPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const pageNumbers = [...Array(props.numOfPages)].map(
    (val, index) => index + 1
  );

  const [start, setStart] = useState<number>(0);

  return (
    <Pagination
      aria-label="Page navigation example"
      className="d-flex justify-content-end"
    >
      <PaginationItem>
        <PaginationLink
          first
          onClick={_e => {
            props.setCurrentPage(1);
            setStart(0);
          }}
        />
      </PaginationItem>
      {pageNumbers.map((pageNumber, index) => {
        return (index >= start && index <= start + 10) ||
          index > pageNumbers.length - 3 ? (
          <PaginationItem
            key={pageNumber}
            className={pageNumber == props.currentPage ? 'active' : ''}
          >
            <PaginationLink
              onClick={_e => {
                props.setCurrentPage(pageNumber);
                if (pageNumber >= start + 9) {
                  setStart(pageNumber);
                } else if (pageNumber <= start + 3) {
                  setStart(pageNumber - 10);
                }
              }}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ) : (
          <></>
        );
      })}
      <PaginationItem>
        <PaginationLink
          last
          onClick={_e => {
            props.setCurrentPage(props.numOfPages);
            setStart(pageNumbers.length - 10);
          }}
        />
      </PaginationItem>
    </Pagination>
  );
};
