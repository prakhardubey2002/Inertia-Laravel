import { router } from '@inertiajs/react';
import React from 'react'

const Pagination = ({links,currentPage,setCurrentPage}) => {
    const handlePageChange =(url)=>{
        const pageParam =new URL(url).searchParams.get('page');
        console.log(url)
        console.log(pageParam)
        setCurrentPage(pageParam);
        router.get(url,{preserveState:true})
    }
  return (
    <nav aria-label='pagination'>
        <ul className='pagination'>
            {
                links.map(link=>(
                    <li className={link.active ? 'page-item active':'page-item'} key={link.url} >
                            <a 
                            className='page-link'
                            href={link.url}
                            onClick={(e)=>{
                                e.preventDefault();
                                handlePageChange(link.url);
                            }}
                            dangerouslySetInnerHTML={{__html:link.label}}
                            ></a>
                    </li>
                ))
            }
        </ul>

    </nav>
  )
}

export default Pagination