import DataHeader from '../dataHeader/dataHeader'
import { useState } from 'react'
import './usersPage.css'

export default function UsersPage({activeButton}){

    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')

    return(
        <div className='usersPage'>
            <DataHeader page={currentPage} setPage={setCurrentPage}
            searchQuery={searchQuery} setSearchQuery={setSearchQuery}
            activeButton={activeButton}></DataHeader>
        </div>
    )
}