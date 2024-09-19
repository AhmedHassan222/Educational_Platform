// import { useContext } from "react";

// export default function Pagination() {

//     // Handler to go to the next page
//     const goToNextPage = () => {
//         if (currentPage < totalPages) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     // Handler to go to the previous page
//     const goToPreviousPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     // Generate array for page numbers if you want to show specific pages
//     const pageNumbers = [...Array(totalPages).keys()].map(num => num + 1);

//     return (
//         <div className="pagination">
//             <button onClick={goToPreviousPage} disabled={currentPage === 1}>
//                 Previous
//             </button>

//             {/* Optionally display page numbers */}
//             {pageNumbers.map(page => (
//                 <button
//                     key={page}
//                     onClick={() => setCurrentPage(page)}
//                     disabled={page === currentPage}
//                 >
//                     {page}
//                 </button>
//             ))}

//             <button onClick={goToNextPage} disabled={currentPage === totalPages}>
//                 Next
//             </button>
//         </div>
//     );
// }
