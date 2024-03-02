import ReactPaginate from "react-paginate";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel="Trang trước"
      pageCount={totalPages}
      onPageChange={onPageChange}
      forcePage={currentPage - 1}
      containerClassName={"flex gap-3 justify-center mt-10"}
      previousClassName={`py-2 px-4 border rounded-l `}
      nextClassName={`py-2 px-4 border rounded-r `}
      pageClassName={"py-2 px-4 border"}
      activeClassName={"active"}
      nextLabel="Trang sau"
    />
  );
};

export default Pagination;
