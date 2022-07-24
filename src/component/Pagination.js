function Pagination(props){

     const {page, setPage, lastPage} = props;

     const paginationConfig = {
           isFirstPage: 0,
           isLastPage: lastPage - 1
     }

     function onFirstClick(e){
           setPage({
                 ...page,
                 pageNum: 0,
           })
     }

     function onPrevClick(e){
           setPage({
                 ...page,
                 pageNum: page.pageNum - 1,
           })
     }

     function onNextClick(e){
           setPage({
                 ...page,
                 pageNum: page.pageNum + 1,
           })
     }

     function onLastClick(e){
           setPage({
                 ...page,
                 pageNum: lastPage - 1,
           })
     }

     return(
           <>
                 <div style={{ display: "flex", justifyContent: "center" }}>
                       <ul className="pagination">
                             <li className="page-item">
                                   <a className="page-link" role="button" tabIndex="0" href="# " onClick={onFirstClick} 
                                   style={{pointerEvents: paginationConfig.isFirstPage === page.pageNum? 'none': '',
                                         color: paginationConfig.isFirstPage === page.pageNum? 'gray': ''
                                   }}>
                                         <span aria-hidden="true">First</span>
                                   </a>
                             </li>
                             <li className="page-item">
                                   <a className="page-link" role="button" tabIndex="0" href="# " onClick={onPrevClick}
                                   style={{pointerEvents: paginationConfig.isFirstPage === page.pageNum? 'none': '',
                                         color: paginationConfig.isFirstPage === page.pageNum? 'gray': ''
                                   }}>
                                         <span aria-hidden="true">Previous</span>
                                   </a>
                             </li>
                             <li className="page-item">
                                   <a className="page-link" role="button" disabled tabIndex="0" href="# " 
                                   style={{pointerEvents: 'none', color: 'black'}}>
                                         <span aria-hidden="true">Page {page.pageNum + 1}</span>
                                   </a>
                             </li>
                             <li className="page-item">
                                   <a className="page-link" disabled role="button" tabIndex="0" href="# " onClick={onNextClick}
                                    style={{pointerEvents: paginationConfig.isLastPage === page.pageNum? 'none': '',
                                         color: paginationConfig.isLastPage === page.pageNum? 'gray': ''
                                    }}>
                                         <span aria-hidden="true">Next</span>
                                   </a>
                             </li>
                             <li className="page-item">
                                   <a className="page-link" role="button" tabIndex="0" href="# " onClick={onLastClick}
                                   style={{pointerEvents: paginationConfig.isLastPage === page.pageNum? 'none': '',
                                         color: paginationConfig.isLastPage === page.pageNum? 'gray': ''
                                   }}>
                                         <span aria-hidden="true">Last</span>
                                   </a>
                             </li>
                       </ul>
                 </div>
           </>
     )
}

export default Pagination;