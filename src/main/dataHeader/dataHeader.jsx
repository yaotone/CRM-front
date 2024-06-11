import './dataHeader.css'
import arrow from '../../icons/arrow.svg'
import plus from '../../icons/plus.png'
import { useEffect, useRef, useState } from 'react'
import FieldInput from './createFieldsAssets/fieldInput'
import Input from './createFieldsAssets/input'
import SpecialInfo from './createFieldsAssets/specialInfo'
import SubmitCreate from './createFieldsAssets/submitCreate'
import PhoneInput from './createFieldsAssets/phoneInput'
import letter from './../../icons/letter.png'
import EmailMain from './createFieldsAssets/emailMain'
import VacationDates from './createFieldsAssets/vacationDates'
import DateTime from './createFieldsAssets/dateTime'

import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { useMutation } from 'react-query'
import SearchInput from './createFieldsAssets/searchInput'

export default function DataHeader({page, setPage, searchQuery, 
    setSearchQuery, activeButton, client_uuid, doctor_uuid, setDoctor_uuid, setClient_uuid}){
        
    const queryClient = useQueryClient();
    async function create(data, path){
        try{
            const response = await axios.post(path, data,{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response
        }
        catch(err){
            console.log(err)
            throw err.response.data.detail
        }
    }

    const[errors, setErrors] = useState(['','','',''])

    const clientAdd = useMutation((newClient)=>create(newClient, '/clients'), {
        onSuccess: ()=>{
            setErrors(['', '','',''])
            queryClient.invalidateQueries(['clients'])
        },
        onError:(error)=>{
            setErrors([error[0].msg ? error[0].msg : error, '','',''])
        }
    })
    const doctorAdd = useMutation((newDoctor)=>create(newDoctor, '/doctors'), {
        onSuccess: ()=>{
            setErrors(['', '','',''])
            queryClient.invalidateQueries(['doctors'])
        },
        onError:(error)=>{
            setErrors(['', error[0].msg ? error[0].msg : error, '', ''])
        }
    })
    const userAdd = useMutation((newUser)=>create(newUser, '/users'), {
        onSuccess: ()=>{
            setErrors(['', '','',''])
            queryClient.invalidateQueries(['users'])
        },
        onError:(error)=>{
            setErrors(['','', '', error[0].msg ? error[0].msg : error])
        }
    })
    const appointmentAdd = useMutation((appointment)=>create(appointment, '/appointments'), {
        onSuccess: ()=>{
            setErrors(['', '','',''])
            queryClient.invalidateQueries(['appointments'])
        },
        onError:(error)=>{
            setErrors(['','',error[0].msg ? error[0].msg : error, ''])
        }
    })

    const emailSend = useMutation((mail)=>create(mail, '/clients/mail_delivery'))
    
    const inputOneRef = useRef(null);
    const inputTwoRef = useRef(null);
    const inputThreeRef = useRef(null);
    const inputFourRef = useRef(null);
    const doctorRef = useRef(null);
    const clientRef = useRef(null);
    const inputDateTime = useRef([]);

    const dayOffs = useRef([])
    const emailHeaderRef = useRef(null);
    const emailMainRef = useRef(null);
    const [phone, setPhone] = useState('')

    const [inputGender, setInputGender] = useState('M')
    const [inputDate, setInputDate] = useState('')

    const [isEmailNewsletterActive, setIsEmailNewsletterActive] = useState(false)
    const [isCreateFieldActive, setIsCreateFieldActive] = useState(false)
    
    const [fields, setFields] = useState(
    <FieldInput inputFieldName={'Создание клиента'}
        setIsActive={setIsCreateFieldActive}
        inputs={[<Input key={1} ref={inputOneRef} fieldName={'Фамилия'}></Input>,
            <Input key={2} ref={inputTwoRef} fieldName={'Имя'}></Input>,
            <PhoneInput setNum = {setPhone}></PhoneInput>,
            <SpecialInfo onlyDate={true} gender={inputGender} setGender={setInputGender} date={inputDate} setDate={setInputDate}/>
        ]}
    ></FieldInput>)

    function nextPage(){
        setPage(page+1)
    }
    function prevPage(){
        !(page === 1) && setPage(page-1)
    }

    function handleInput(ev){
        setSearchQuery(ev.target.value)
    }

    function handleClientCreate(ev){
        ev.preventDefault();
        clientAdd.mutate({
            fullname: `${inputTwoRef.current.value} ${inputOneRef.current.value} ${inputThreeRef.current.value}`,
            date_of_birth: `${inputDate}`,
            email: inputFourRef.current.value,
            phone_number: phone
        })

        inputOneRef.current.value = ''
        inputTwoRef.current.value = ''
        inputThreeRef.current.value = ''
        inputFourRef.current.value = ''
        setPhone('')
        // setIsCreateFieldActive(false)

        // setInputDate(`${new Date().getFullYear()}-${new Date().getMonth() < 10 ? '0' : '' }${new Date().getMonth()}-${new Date().getDate() < 10 ? '0' : ''}${new Date().getDate()}`)
    }

    function handleDoctorCreate(ev){
        ev.preventDefault();
        doctorAdd.mutate({
            fullname: `${inputTwoRef.current.value} ${inputOneRef.current.value} ${inputThreeRef.current.value}`,
            occupation: inputFourRef.current.value,
            phone_number: phone
        })
        inputOneRef.current.value = ''
        inputTwoRef.current.value = ''
        inputThreeRef.current.value = ''
        inputFourRef.current.value = ''
        setPhone('')
        // setIsCreateFieldActive(false)
    }

    function onCreateClick(){
        setIsCreateFieldActive(true)
    }

    function closeCreateField(){
        setIsCreateFieldActive(false)
    }

    function handleEmailNewsletterClose(){
        setIsEmailNewsletterActive(false)
    }

    function handleAppointmentCreate(ev){
        ev.preventDefault();
        appointmentAdd.mutate({
            doctor_id: doctor_uuid,
            client_id: client_uuid,
            appointment_date: inputDateTime.current.value[0],
            appointment_time: inputDateTime.current.value[1]
        })
        inputDateTime.current.value[0] = ''
        inputDateTime.current.value[1] = ''
        // setIsCreateFieldActive(false)

    }

    function handleEmailSend(ev){
        ev.preventDefault();
        emailSend.mutate({
            title: emailHeaderRef.current.value,
            content: emailMainRef.current.value
        })

        emailHeaderRef.current.value = ''
        emailMainRef.current.value = ''
        setIsEmailNewsletterActive(false)
    }

    function handleUserCreate(ev){
        ev.preventDefault();
        userAdd.mutate({
            login: inputOneRef.current.value,
            name: inputTwoRef.current.value,
            surname: inputThreeRef.current.value,
            password: inputFourRef.current.value
        })

        inputOneRef.current.value = ''
        inputTwoRef.current.value = ''
        inputThreeRef.current.value = ''
        inputFourRef.current.value = ''
        // setIsCreateFieldActive(false)
    }
    
    useEffect(()=>{
        if(activeButton === 1){
            setFields(
            <FieldInput inputFieldName={'Добавление клиента'}
                setIsActive={setIsCreateFieldActive}
                error = {errors[(activeButton-1)]}
                inputs={[<Input key={1} ref={inputOneRef} fieldName={'Фамилия'} pattern = '[A-Za-z]+' required = {true}></Input>,
                <Input key={2} ref={inputTwoRef} fieldName={'Имя'} pattern = '[A-Za-z]+' required = {true}></Input>,
                <Input key={3} ref={inputThreeRef} fieldName={'Отчество'} pattern = '[A-Za-z]+'></Input>,
                <Input key={4} ref={inputFourRef} fieldName={'Почта'}></Input>,
                <PhoneInput setNum = {setPhone}></PhoneInput>,
                <SpecialInfo onlyDate={true} gender={inputGender} setGender={setInputGender} date={inputDate} setDate={setInputDate}/>,
                <SubmitCreate onClick={handleClientCreate} text={'СОЗДАТЬ'}></SubmitCreate>
            ]}
            ></FieldInput>)
        }
        else if(activeButton === 2){
            setFields(
                <FieldInput inputFieldName={'Добавление врача'}
                    setIsActive={setIsCreateFieldActive}
                    error = {errors[(activeButton-1)]}
                    inputs={[
                    <Input key={1} ref={inputOneRef} fieldName={'Фамилия'}></Input>,
                    <Input key={2} ref={inputTwoRef} fieldName={'Имя'} ></Input>,
                    <Input key={3} ref={inputThreeRef} fieldName={'Отчество'}></Input>,
                    <Input key={4} ref={inputFourRef} fieldName={'Специальность'}></Input>,
                    <PhoneInput setNum = {setPhone}></PhoneInput>,
                    <SubmitCreate onClick={handleDoctorCreate} text={'СОЗДАТЬ'}></SubmitCreate>
                    ]}
                ></FieldInput>)
        }
        else if(activeButton === 3){
            setFields(
                <FieldInput inputFieldName={'Создание записи'}
                    setIsActive={setIsCreateFieldActive}
                    error = {errors[(activeButton-1)]}
                    inputs={[
                    <SearchInput header={'Клиент'} requestPath={'clients/search'} searchKey = {'clients'} setId={setClient_uuid} passId={client_uuid}></SearchInput>,
                    <SearchInput header={'Врач'} requestPath={'doctors/search'} searchKey = {'doctors'} setId={setDoctor_uuid} passId={doctor_uuid}></SearchInput>,
                    <DateTime ref={inputDateTime}></DateTime>,
                    <SubmitCreate onClick={handleAppointmentCreate} text={'СОЗДАТЬ'}></SubmitCreate>
                    ]}
                ></FieldInput>)
        }
        else{
            setFields(
                <FieldInput inputFieldName={'Создание пользователя'}
                    setIsActive={setIsCreateFieldActive}
                    error = {errors[(activeButton-1)]}
                    inputs={[
                    <Input key={1} ref={inputOneRef} fieldName={'Логин'}></Input>,
                    <Input key={2} ref={inputTwoRef} fieldName={'Имя'}></Input>,
                    <Input key={3} ref={inputThreeRef} fieldName={'Фамилия'}></Input>,
                    <Input key={4} ref={inputFourRef} fieldName={'Пароль'} type = {'password'}></Input>,
                    <SubmitCreate onClick={handleUserCreate} text={'СОЗДАТЬ'}></SubmitCreate>
                    ]}
                ></FieldInput>
            )
        }
    },[activeButton, phone, isCreateFieldActive, inputGender, inputDate, client_uuid, doctor_uuid, errors])

    return(
        <>
        <div className='dataHeader_container'>
            <div className='data_change_page_container'>
                <div className='data_change_page_arrow' id='left_arrow' 
                    onClick={prevPage}>
                    <img src={arrow} alt="left-arrow" />
                </div>
                {/* <div className='data_change_page_current'>{page}</div> */}
                <div className='data_change_page_arrow' id='right_arrow' 
                    onClick={nextPage}>
                    <img src={arrow} alt="right-arrow" />
                </div>
            </div>

            {(activeButton === 1 || activeButton === 2)&&<div className='dataHeader_search_container'>
                <input type='text' className='dataHeader_search_input'
                value={searchQuery} onInput={(ev)=>handleInput(ev)}
                placeholder='Поиск...'></input>
                {/* <div className='dataHeader_search_button' onClick={(el)=>handleSubmit(el)}>Поиск!</div> */}
            </div>}

            {(activeButton === 1) && 
            <div className='email_newsletter_button' onClick={()=>setIsEmailNewsletterActive(true)}>
                <img src={letter} alt='letter'></img>
                <div>Рассылка</div>
            </div>}

            <div className={(activeButton === 1) ? 'dataHeader_create_button' : 'dataHeader_create_button_solo'}onClick={onCreateClick}>
                <img src={plus} alt="plus" />
                <div>Добавить</div>
            </div>
        </div>
        <div className={isCreateFieldActive ? 'dataHeader_create_field_background' : 'hide'} onMouseDown={closeCreateField}>
            <div className='dataHeader_create_field' onMouseDown={(ev)=>ev.stopPropagation()}>
                {fields}
            </div>
        </div>

        {isEmailNewsletterActive &&
            <div className='dataHeader_create_field_background' onMouseDown={handleEmailNewsletterClose}>
                <div className='dataHeader_create_field' onMouseDown={(ev)=>ev.stopPropagation()}>
                    <FieldInput inputFieldName={'Рассылка сообщений'}
                        setIsActive={setIsEmailNewsletterActive}
                        inputs={[<Input key={1} ref={emailHeaderRef} fieldName={'Заголовок'}
                        placeholder = {'Заголовок'}></Input>,
                        <EmailMain ref={emailMainRef}></EmailMain>,
                        <SubmitCreate text={'Отправить'} onClick={handleEmailSend}></SubmitCreate>
                    ]}
                    ></FieldInput>
                </div>
            </div>
        }
        </>
    )
}