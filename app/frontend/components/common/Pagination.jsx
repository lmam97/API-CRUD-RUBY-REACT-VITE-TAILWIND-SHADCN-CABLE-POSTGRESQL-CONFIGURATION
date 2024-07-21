import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Fragment } from "react";

const PaginationIndex = ({
  prevPage,
  currentPage,
  nextPage,
  handlePageChange
}) => {
  return (
    <Fragment>
      <Pagination>
        <PaginationContent>
          {prevPage && (
            <Fragment>
              <PaginationItem>
                <PaginationPrevious onClick={() => handlePageChange(prevPage)} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => handlePageChange(prevPage)}>{prevPage}</PaginationLink>
              </PaginationItem>
            </Fragment>
          )}
          {nextPage && (
            <Fragment>
              <PaginationItem>
                <PaginationLink isActive>
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem onClick={() => handlePageChange(nextPage)}>
                <PaginationLink onClick={() => handlePageChange(nextPage)}>{nextPage}</PaginationLink>
              </PaginationItem>
              <PaginationItem onClick={() => handlePageChange(nextPage)}>
                <PaginationNext onClick={() => handlePageChange(nextPage)} />
              </PaginationItem>
            </Fragment>
          )}
        </PaginationContent>
      </Pagination>
    </Fragment>
  );
};

export default PaginationIndex;
