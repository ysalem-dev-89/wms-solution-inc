import { useState } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import './style.css';

export const TablePagination = (props: {
  numOfPages: number;
  currentPage: number;
  totalCount: number;
  itemsPerPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const pageNumbers = [...Array(props.numOfPages)].map(
    (val, index) => index + 1
  );
  const [start, setStart] = useState<number>(0);

  const getCurrentItems = (): number => {
    return props.currentPage == props.numOfPages
      ? props.totalCount
      : props.currentPage * props.itemsPerPage;
  };
  function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }
  return (
    <div className="d-flex justify-content-between ">
      <div>
        <p className="fw-bold text-dark">
          Showing{' '}
          {`${numberWithCommas(getCurrentItems())} of ${numberWithCommas(
            props.totalCount
          )} entries`}
        </p>
      </div>
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
    </div>
  );
};
