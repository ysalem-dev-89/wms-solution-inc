import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import './style.css';

export const TablePagination = (props: {
  pagesCount: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const pageNumbers: number[] = [];
  for (let i = 1; i <= props.pagesCount; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination
      aria-label="Page navigation example"
      className="d-flex justify-content-end"
    >
      <PaginationItem>
        <PaginationLink
          first
          onClick={e => {
            props.setCurrentPage(1);
          }}
        />
      </PaginationItem>
      {pageNumbers.map(pageNumber => {
        console.log(pageNumber);
        return (
          <PaginationItem
            key={pageNumber}
            className={pageNumber == props.currentPage ? 'active' : ''}
          >
            <PaginationLink
              onClick={e => {
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
          onClick={e => {
            props.setCurrentPage(props.pagesCount);
          }}
        />
      </PaginationItem>
    </Pagination>
  );
};
