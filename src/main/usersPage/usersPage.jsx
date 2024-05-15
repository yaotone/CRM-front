import DataHeader from '../dataHeader/dataHeader'
import { useState } from 'react'
import './usersPage.css'
import TableHead from '../table/tableHead';
import TableMain from '../table/tableMain';

export default function UsersPage({activeButton}){

    const [info, setInfo] = useState([
        {uuid: '12131', name: 'deed', surname: 'wweww', thirdname: 'yyyee', created_at: '12-23-12', phone: '+ 8 123 456 78 90', gender: 'M', birth: '12-02-2003'},
        {uuid: '9900', name: 'hhai', surname: 'mnckls', thirdname: 'wefdjoewnk', created_at: '21-04-23', phone: '210399000', gender: 'Ж', birth: '02-03-2001'},
        {uuid: '1231', name: 'deed', surname: 'wweww', thirdname: 'yyyee', created_at: '12-23-12', phone: '18928989191', gender: 'M', birth: '12-02-2003'},
        {uuid: '90900', name: 'hhai', surname: 'mnckls', thirdname: 'wefdjoewnk', created_at: '21-04-23', phone: '210399000', gender: 'Ж', birth: '02-03-2001'},
    ]
    );

    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')

    return(
        <div className='usersPage' >
            <DataHeader page={currentPage} setPage={setCurrentPage}
            searchQuery={searchQuery} setSearchQuery={setSearchQuery}
            activeButton={activeButton}></DataHeader>
            <div className='usersPage_main'>
                <table className='data_table_container'>
                    <TableHead columns={['uuid', 'Имя', 'Фамилия', 
                    'Отчество', 'Время создания', 'Номер телефона', 'Пол', 'Дата рождения']}></TableHead>
                    <tbody>
                        {info.map((item)=>{
                            return <TableMain key={item.uuid} infoRow={item} indexes={[0,4]} colors={['gray','gray']}></TableMain>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}