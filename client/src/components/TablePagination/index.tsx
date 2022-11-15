import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Spinner
} from 'reactstrap';
import './style.css';

export const TablePagination = (props: {
  numOfPages: number;
  currentPage: number;
  totalCount: number;
  itemsPerPage: number;
  isLoading: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const pageNumbers = [...Array(props.numOfPages)].map(
    (val, index) => index + 1
  );

  const getCurrentItems = (): number => {
    return props.currentPage == props.numOfPages
      ? props.totalCount
      : props.currentPage * props.itemsPerPage;
  };

  const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  };

  // If we want the page number to appear we return it, otherwise it returns undefined.
  const getPageNumberIfShouldAppear = (pageNumber: number) => {
    if (pageNumber <= 3) {
      return pageNumber;
    } else if (
      pageNumber >= props.currentPage - 1 &&
      pageNumber <= props.currentPage + 1
    ) {
      return pageNumber;
    }
    if (pageNumber == props.numOfPages) {
      return props.numOfPages;
    } else if (
      pageNumber > props.numOfPages - 3 &&
      pageNumber <= props.numOfPages
    ) {
      return pageNumber;
    }
  };

  const paginationItems = () => {
    let minusExists = false;
    const pages = pageNumbers
      .map(pageNumber => getPageNumberIfShouldAppear(pageNumber))
      .map((pageNumber, index, arr) => {
        if (pageNumber == null) {
          if (arr[index + 1] != null) {
            if (minusExists) {
              return -2;
            } else {
              minusExists = true;
              return -1;
            }
          } else return null;
        } else {
          return pageNumber;
        }
      });

    return pages.map((pageNumber, index) => {
      return pageNumber ? (
        <PaginationItem
          key={pageNumber}
          className={pageNumber == props.currentPage ? 'active' : ''}
        >
          {pageNumber == -1 || pageNumber == -2 ? (
            <PaginationLink
              onClick={_e => {
                if (props.currentPage > index) {
                  props.setCurrentPage(props.currentPage - 1);
                } else {
                  props.setCurrentPage(props.currentPage + 1);
                }
              }}
            >
              ...
            </PaginationLink>
          ) : (
            <PaginationLink
              onClick={_e => {
                props.setCurrentPage(pageNumber || 1);
              }}
            >
              {pageNumber}
            </PaginationLink>
          )}
        </PaginationItem>
      ) : null;
    });
  };

  return (
    <div className="pagination-section d-flex justify-content-between align-items-center">
      <div>
        {props.isLoading ? (
          <div className="d-flex gap-1 align-items-center fw-bold text-dark">
            <Spinner className="pagination-spinner">Loading...</Spinner>{' '}
            <span>Loading...</span>
          </div>
        ) : (
          <p className="fw-bold text-dark">
            Showing{' '}
            {`${numberWithCommas(getCurrentItems())} of ${numberWithCommas(
              props.totalCount
            )} entries`}
          </p>
        )}
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
            }}
          />
        </PaginationItem>
        {paginationItems()}
        <PaginationItem>
          <PaginationLink
            last
            onClick={_e => {
              props.setCurrentPage(props.numOfPages);
            }}
          />
        </PaginationItem>
      </Pagination>
    </div>
  );
};
