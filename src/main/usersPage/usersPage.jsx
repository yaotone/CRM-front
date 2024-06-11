import DataHeader from '../dataHeader/dataHeader'
import { useEffect, useState } from 'react'
import './usersPage.css'
import TableHead from '../table/tableHead';
import TableMain from '../table/tableMain';
import { useDebounce } from "@uidotdev/usehooks";

import axios from 'axios'

import {
    useQuery,
    useQueryClient,
} from 'react-query';


axios.defaults.baseURL = 'http://0.0.0.0:9999'

export default function UsersPage({activeButton}){


    const queryClient = useQueryClient();  
    
    const[clientId, setClientId] = useState('')
    const[doctorId, setDoctorId] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    let debouncedSearch = useDebounce(searchQuery, 500)
    
    const {data: clients, status: clientsStatus, error: clientsError} = useQuery('clients', async ()=>(await axios.get('/clients')).data)
    const {data: doctors, status: doctorsStatus, error: doctorsError} = useQuery('doctors', async ()=>(await axios.get('/doctors')).data)
    const {data: appointments, status: appointmentsStatus, error: appointmentsError} = useQuery('appointments', async ()=>(await axios.get('/appointments')).data)
    const {data: users, status: usersStatus, error: usersError} = useQuery('users', async ()=>(await axios.get('/users')).data)

    const {data: clientsSearch, status:clientsSearchStatus} = useQuery(['clientsSearch', debouncedSearch], async()=>(await axios.get(`/clients/search/${debouncedSearch}`)).data)
    const {data: doctorsSearch, status:doctorsSearchStatus} = useQuery(['doctorsSearch', debouncedSearch], async()=>(await axios.get(`/doctors/search/${debouncedSearch}`)).data)

    const tables = [
        <>
            {(searchQuery === '') ? 
            <>
                <TableHead hasIds={true} columns={['Имя', 'Дата рождения', 'Почта', 'Номер телефона', 'Дата создания']}></TableHead>
                <tbody>
                    {clientsStatus === 'success' ?
                    clients?.map((item, index)=>{
                        return <TableMain infoRow={item} indexes={[0]} setClientId={setClientId} setDoctorId={setDoctorId}
                        notChangeable={[0]} colors={['gray']} rowIndex={index} activeButton={activeButton}></TableMain>
                    }):<div>Error!</div>
                }
                </tbody>
            </>:
            <>
            <TableHead hasIds={true} columns={['Имя', 'Дата рождения']}></TableHead>
                <tbody>
                    {clientsSearchStatus === 'success' ?
                    clientsSearch?.map((item, index)=>{
                        return <TableMain infoRow={item} indexes={[0]} setClientId={setClientId} setDoctorId={setDoctorId}
                        notChangeable={[0]} colors={['gray']} rowIndex={index} activeButton={activeButton}></TableMain>
                    }):<div>{clientsSearchStatus}</div>
                }
                </tbody>
            </>
            }
        </>,
        <>
            {(searchQuery === '')?
            <>
                <TableHead hasIds={true} columns={['Имя', 'Специальность', 'Телефон', 'Статус']}></TableHead>
                <tbody>
                    {doctorsStatus === 'success' ?
                    doctors?.map((item, index)=>{
                        return <TableMain infoRow={item} indexes={[0]} setClientId={setClientId} setDoctorId={setDoctorId}
                        notChangeable={[0]} colors={['gray']} rowIndex={index} activeButton={activeButton}></TableMain>
                    }
                    ): <div>Error!</div>}
                </tbody>
            </>:
            <>
                <TableHead hasIds={true} columns={['Имя']}></TableHead>
                <tbody>
                    {doctorsSearchStatus === 'success' ?
                    doctorsSearch?.map((item, index)=>{
                        return <TableMain infoRow={item} indexes={[0]} setClientId={setClientId} setDoctorId={setDoctorId}
                        notChangeable={[0]} colors={['gray']} rowIndex={index} activeButton={activeButton}></TableMain>
                    }
                    ): <div>{doctorsSearchStatus}</div>}
                </tbody>
            </>
            }
        </>
        ,
        <>
            <TableHead hasIds={true} columns={['Клиент', 'Дата рождения', 'Телефон','','', 'Доктор', 'Телефон', 'Дата приема', 'Время приема']}></TableHead>
            <tbody>
                {appointmentsStatus === 'success' ?
                appointments?.map((item, index)=>{
                    return <TableMain infoRow={item} indexes={[0]} setClientId={setClientId} setDoctorId={setDoctorId}
                    notChangeable={[0]} colors={['gray']} rowIndex={index} activeButton={activeButton}></TableMain>
                }):
                <div>Error!</div>
            }
            </tbody>
        </>,
        <>
            <TableHead hasIds={true} columns={['Логин', 'Имя', 'Фамилия', 'Роль']}></TableHead>
            <tbody>
                {users?.map((item, index)=>{
                    return <TableMain infoRow={item} indexes={[0]} setClientId={setClientId} setDoctorId={setDoctorId}
                    notChangeable={[0]} colors={['gray']} rowIndex={index} activeButton={activeButton}></TableMain>
                })}
            </tbody>
        </>
    ]

    useEffect(()=>{

    }, [activeButton])

    const [currentPage, setCurrentPage] = useState(1)

    return(
        <div className='usersPage' >
            <DataHeader page={currentPage} setPage={setCurrentPage}
            searchQuery={searchQuery} setSearchQuery={setSearchQuery}
            activeButton={activeButton} client_uuid={clientId} doctor_uuid={doctorId} setClient_uuid={setClientId} setDoctor_uuid={setDoctorId}></DataHeader>
            <div className='usersPage_main'>
                <table className='data_table_container'>
                    {tables[activeButton-1]}
                </table>
            </div>
        </div>
    )
}