import React from 'react'

const Pagination = ({ ordersPerPage, currentPage, totalOrders, paginate }) => {


    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalOrders / ordersPerPage); i++) {
        pageNumbers.push(i);
    }

    // const findNumberOfPages = () => {
    //     return Math.ceil(totalOrders / ordersPerPage);
    // }

    // const RenderPageNumbers = () => {
    //     const numberOfPages = findNumberOfPages();
    //     let pages = [];
    //     for (
    //         let i = 1;
    //         (i <= 1 + 4) && (i < numberOfPages);
    //         i++
    //     ) {
    //         pages.push(
    //             <button
    //                 onClick={() => paginate(i)}
    //                 className={currentPage === i ? "pagination-btn active" : "pagination-btn"}
    //                 key={i}>
    //                 {i}
    //             </button>
    //       );
    //     }
    //     return pages;
    // };



    return (
        <nav className="text-center">
            {pageNumbers.map(number => (
                // <li key={number} className="page-item">
                //     <a onClick={() => paginate(number)} className="page-link">
                //         {number}
                //     </a>
                // </li>

                <button
                    onClick={() => paginate(number)}
                    className={currentPage === number ? "pagination-btn active" : "pagination-btn"}
                    key={number}>
                    {number}
                </button>
            ))}
            {/* <RenderPageNumbers /> */}

            {pageNumbers.length > 1
                ?
                <button onClick={() => pageNumbers.length === currentPage ? "" : paginate(currentPage + 1)} className="pagination-btn-next"> Next <span className="icon iconRightArrow"></span>
                </button>
                :
                null
            }
        </nav>
    )
}

export default Pagination
