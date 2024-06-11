import './searchInput.css'
import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useState } from 'react'

function SearchInput({requestPath, header, searchKey, setId, passId}){

    const [search, setSearch] = useState('')
    const [isResultsShown, setIsResultsShown] = useState(false)

    const {data: searchResult, status: searchStatus} = useQuery([`${searchKey}Search`, search], async()=>(await axios.get(`${requestPath}/${search}`)).data)

    function handleResultClick(id, name){
        setId(id)
        setSearch(name)
    }

    return(
        <div className='SearchInput_container'>
            <div className='SearchInput_header'>{header}</div>
            <input className='SearchInput_input' onFocus={()=>setIsResultsShown(true)} onBlur={()=>setIsResultsShown(false)}
            value={search} onChange={(ev)=>setSearch(ev.target.value)}></input>
            {isResultsShown && <div className='SearchInput_results_container'>
                {searchStatus === 'success' &&
                    searchResult?.map((item)=>{
                        return(
                        <div className='SearchInput_result' onMouseDown={()=>handleResultClick(item.id, item.fullname)}>
                            <div className='SearchInput_result_name'>{item.fullname}</div>
                            <div className='SearchInput_result_date'>{item.date_of_birth}</div>
                        </div>)
                    })
                } 
            </div>}
        </div>
    )
}

export default SearchInput