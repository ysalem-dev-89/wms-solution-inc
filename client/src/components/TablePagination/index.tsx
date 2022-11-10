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
          }}
        />
      </PaginationItem>
      {pageNumbers.map(pageNumber => {
        return (
          <PaginationItem
            key={pageNumber}
            className={pageNumber == props.currentPage ? 'active' : ''}
          >
            <PaginationLink
              onClick={_e => {
                props.setCurrentPage(pageNumber);
              }}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        );
      })}
      <PaginationItem>
        <PaginationLink
          last
          onClick={_e => {
            props.setCurrentPage(props.numOfPages);
          }}
        />
      </PaginationItem>
    </Pagination>
  );
};
