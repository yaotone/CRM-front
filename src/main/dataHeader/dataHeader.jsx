import './dataHeader.css'
import arrow from '../../icons/arrow.svg'
import { useEffect, useRef, useState } from 'react'
import FieldInput from './createFieldsAssets/fieldInput'
import Input from './createFieldsAssets/input'
import SpecialInfo from './createFieldsAssets/specialInfo'
import SubmitCreate from './createFieldsAssets/submitCreate'

export default function DataHeader({page, setPage, searchQuery, 
    setSearchQuery, activeButton}){
    
    const inputOneRef = useRef(null);
    const inputTwoRef = useRef(null);
    const inputThreeRef = useRef(null);

    const [inputGender, setInputGender] = useState('M')
    const [inputDate, setInputDate] = useState('')


    const [isCreateFieldActive, setIsCreateFieldActive] = useState(false)
    
    const [fields, setFields] = useState(
    <FieldInput inputFieldName={'Создание клиента'}
        setIsActive={setIsCreateFieldActive}
        inputs={[<Input key={1} ref={inputOneRef} fieldName={'Фамилия'}></Input>,
            <Input key={2} ref={inputTwoRef} fieldName={'Имя'}></Input>,
            <Input key={3} ref={inputThreeRef} fieldName={'Отчество'}></Input>,
            <SpecialInfo gender={inputGender} setGender={setInputGender} date={inputDate} setDate={setInputDate}/>
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

    function handleSubmit(){
        inputOneRef.current.value = ''
        inputTwoRef.current.value = ''
        inputThreeRef.current.value = ''

        setInputGender('M')
        setInputDate(`${new Date().getFullYear()}-${new Date().getMonth() < 10 ? '0' : '' }${new Date().getMonth()}-${new Date().getDate() < 10 ? '0' : ''}${new Date().getDate()}`)
    }

    function onCreateClick(){
        setIsCreateFieldActive(true)
    }

    function closeCreateField(){
        setIsCreateFieldActive(false)
    }
    
    useEffect(()=>{
        if(activeButton === 1){
            setFields(
            <FieldInput inputFieldName={'Создание клиента'}
                setIsActive={setIsCreateFieldActive}
                inputs={[<Input key={1} ref={inputOneRef} fieldName={'Фамилия'}></Input>,
                <Input key={2} ref={inputTwoRef} fieldName={'Имя'} ></Input>,
                <Input key={3} ref={inputThreeRef} fieldName={'Отчество'}></Input>,
                <SpecialInfo gender={inputGender} setGender={setInputGender} date={inputDate} setDate={setInputDate}/>
            ]}
            ></FieldInput>)
        }
        else if(activeButton === 2){

        }
        else if(activeButton === 3){

        }
    },[activeButton, isCreateFieldActive, inputGender, inputDate])

    return(
        <>
        <div className='dataHeader_container'>
            <div className='data_change_page_container'>
                <div className='data_change_page_arrow' id='left_arrow' 
                style={{backgroundImage: `url(${arrow})`}}
                onClick={prevPage}></div>
                <div className='data_change_page_current'>{page}</div>
                <div className='data_change_page_arrow' id='right_arrow' 
                style={{backgroundImage: `url(${arrow})`}}
                onClick={nextPage}></div>
            </div>

            <div className='dataHeader_search_container'>
                <input type='text' className='dataHeader_search_input'
                value={searchQuery} onInput={(ev)=>handleInput(ev)}
                ></input>
                <div className='dataHeader_search_button' onClick={(el)=>handleSubmit(el)}>Поиск</div>
            </div>

            <div className='dataHeader_create_button' onClick={onCreateClick}>
                СОЗДАТЬ
            </div>
        </div>
        <div className={isCreateFieldActive ? 'dataHeader_create_field_background' : 'hide'} onClick={closeCreateField}>
            <div className='dataHeader_create_field' onClick={(ev)=>ev.stopPropagation()}>
                {fields}
                <SubmitCreate onClick={handleSubmit}></SubmitCreate>
            </div>
        </div>
        </>
    )
}