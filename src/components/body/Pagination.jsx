import React from "react";
import { Link } from "react-router-dom";
import '../../styles/Pagination.css';
import {formatQueryPage} from '../../utils/formatQuery';
export default function Pagination ({totalPages, search, page}) {

    page = Number(page)

    let pagesToShow = ()=> {
   
        let i = 0;
        let myPages = []

        while (i < totalPages) {
            i++;
            myPages.push(
                <Link to={`/home?${formatQueryPage(search, false,i)}`} 
                className='page' key={i}>
                    {i}
                </Link>
                )
        }
        return myPages;
    }

    return(
        <div className="pagination-container">
            <div className="pagination-prev">
                {
                    page - 1 > 0 ? 
                    <div className="previous">
                        <Link to ={`/home?${formatQueryPage(search, 'prev', page)}`} >Previous</Link>
                    </div>:

                    <div className="previous">
                         <Link to ={`/home?${formatQueryPage(search, 'prev', page)}`}  style={{pointerEvents: 'none', opacity: '.7'}}>Previous</Link>
                    </div>
                }
            </div>

            <div className="pagination-intervals">
                {
                    pagesToShow()?.map((pageA, i) => {

                        if(page === i + 1) {
                            return  ( 
                            <Link to={`/home?${formatQueryPage(search, false,page)}`} 
                            className='page' id='page-active' key={i + 1} >

                                {page}

                            </Link>)
                        } else return( pageA)
                    })
                }
            </div>

            <div className="pagination-next">
                {
                    page + 1 > totalPages || page + 1 < 0?
                    <div className="next">
                        <Link to={`/home?${formatQueryPage(search, 'next', page)}`} style={{pointerEvents: 'none', opacity: '.7'}}>Next</Link>
                    </div>:
                    <div className="next">
                        <Link to={`/home?${formatQueryPage(search, 'next', page)}`}>Next</Link>
                    </div>
                }
            </div>
        </div>
    )
}