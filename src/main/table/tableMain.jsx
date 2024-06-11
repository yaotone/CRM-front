import './tableMain.css'
import menu from '../../icons/menu.png'
import { useState, useRef, useEffect } from 'react';
import deleteIcon from '../../icons/delete.png'
import edit from '../../icons/edit-line.png'
import check from '../../icons/check.svg'
import cross from '../../icons/white-cross.svg'
import appointment from '../../icons/edit-black.png'
import weekend from '../../icons/weekend.png'

import FieldInput from '../dataHeader/createFieldsAssets/fieldInput';
import Input from '../dataHeader/createFieldsAssets/input';
import PhoneInput from '../dataHeader/createFieldsAssets/phoneInput';
import SpecialInfo from '../dataHeader/createFieldsAssets/specialInfo';
import SubmitCreate from '../dataHeader/createFieldsAssets/submitCreate';
import VacationDates from '../dataHeader/createFieldsAssets/vacationDates';

import {useMutation, useQueryClient} from 'react-query'
import axios from 'axios';

function TableMain({infoRow, rowIndex, activeButton, setClientId, setDoctorId}){
    let info =[]
    
    const [isChangeFieldActive, setIsChangeFieldActive] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDeleteOptionsShown, setIsDeleteOptionsShown] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)
    const [phone, setPhone] = useState('')
    const [inputGender, setInputGender] = useState('')
    const [inputDate, setInputDate] = useState('')
    const [isDayoffsActive, setIsDayoffsActive] = useState(false)
    
    const menuRef = useRef(null)
    const tableRow = useRef(null)
    const lastCell = useRef(null)
    
    const inputOneRef = useRef(null)
    const inputTwoRef = useRef(null)
    const inputThreeRef = useRef(null)
    const inputFourRef = useRef(null)
    const dayOffs = useRef([])

    for (let key in infoRow){
        if(!((key === 'client_id') || (key === 'doctor_id')||(key === 'id'))){
            (key === 'created_at') ? info.push(infoRow[key].slice(0,10)) : info.push(infoRow[key])
        }
    }

    const queryClient = useQueryClient();

    async function setDaysOff(data, path){
        console.log('days-off:',data)
        try{
            const response = await axios.post(`${path}`, data,{
                headers: {
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            return response
        }
        catch(err){
            console.log(err)
            throw err
        }
    }

    async function changeRow(data, uuid, path){
        console.log(data)
        try{
            const response = await axios.put(`${path}/${uuid}`, data,{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response
        }
        catch(err){
            console.log(err)
        }
    }

    async function deleteRow(uuid, path){
        try{
            const response = await axios.delete(`${path}/${uuid}`,{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response
        }
        catch(err){
            console.log(err)
        }
    }

    const clientChange = useMutation((newClient)=>changeRow(newClient, infoRow.id, '/clients'), {
        onSuccess: ()=>{
            queryClient.invalidateQueries(['clients'])
        }
    })

    const clientDelete = useMutation(()=>deleteRow(infoRow.id, '/clients'), {
        onSuccess: ()=>{
            queryClient.invalidateQueries(['clients'])
        }
    })
    const doctorChange = useMutation((newDoctor)=>changeRow(newDoctor, infoRow.id, '/doctors'), {
        onSuccess: ()=>{
            queryClient.invalidateQueries(['doctors'])
        }
    })

    const doctorDelete = useMutation(()=>deleteRow(infoRow.id, '/doctors'), {
        onSuccess: ()=>{
            queryClient.invalidateQueries(['doctors'])
        }
    })
    const doctorDayOffs = useMutation((dayOffs)=>setDaysOff(dayOffs, '/doctors/working-hours'), {
        onSuccess: ()=>{
            queryClient.invalidateQueries(['doctors'])
        }
    })

    const userChange = useMutation((newUser)=>changeRow(newUser, infoRow.id, '/users'), {
        onSuccess: ()=>{
            queryClient.invalidateQueries(['users'])
        }
    })

    const userDelete = useMutation(()=>deleteRow(infoRow.id, '/users'), {
        onSuccess: ()=>{
            queryClient.invalidateQueries(['users'])
        }
    })

    const appointmentDelete = useMutation(()=>deleteRow(infoRow.id, '/appointments'), {
        onSuccess: ()=>{
            queryClient.invalidateQueries(['appointments'])
        }
    })

    
        let changeFelds = [
            <FieldInput inputFieldName={'Редактирование'}
                setIsActive={setIsChangeFieldActive}
                inputs={[<Input key={1} ref={inputOneRef} fieldName={'Фамилия'} inputToChange = {info[0].split(' ')[1]}></Input>,
                <Input key={2} ref={inputTwoRef} fieldName={'Имя'} inputToChange = {info[0].split(' ')[0]}></Input>,
                <Input key={3} ref={inputThreeRef} fieldName={'Отчество'} inputToChange = {info[0].split(' ')[2]}></Input>,
                <Input key={4} ref={inputFourRef} fieldName={'Почта'} inputToChange = {info[2]}></Input>,
                <PhoneInput setNum = {setPhone} phoneToChange={info[3]}></PhoneInput>,
                <SpecialInfo gender={inputGender} setGender={setInputGender} genderToChange = {info[5]}
                date={inputDate} setDate={setInputDate} dateToChage={info[1]} onlyDate={true}/>,
                <SubmitCreate text={'ИЗМЕНИТЬ'} onClick={handleClientChange}></SubmitCreate>
                ]}
            ></FieldInput>,
            <FieldInput inputFieldName={'Редактирование'}
                setIsActive={setIsChangeFieldActive}
                inputs={[<Input key={1} ref={inputOneRef} fieldName={'Фамилия'} inputToChange = {info[0].split(' ')[1]}></Input>,
                <Input key={2} ref={inputTwoRef} fieldName={'Имя'} inputToChange = {info[0].split(' ')[0]}></Input>,
                <Input key={3} ref={inputThreeRef} fieldName={'Отчество'} inputToChange = {info[0].split(' ')[2]}></Input>,
                <Input key={4} ref={inputFourRef} fieldName={'Специальность'} inputToChange = {info[1]}></Input>,
                <PhoneInput setNum = {setPhone} phoneToChange={info[2]}></PhoneInput>,
                <SubmitCreate text={'ИЗМЕНИТЬ'} onClick={handleDoctorChange}></SubmitCreate>
                ]}
            ></FieldInput>,
            <FieldInput inputFieldName={'Редактирование'}
                setIsActive={setIsChangeFieldActive}
                inputs={[<Input key={1} ref={inputOneRef} fieldName={'Логин'} inputToChange = {info[0]}></Input>,
                <Input key={2} ref={inputTwoRef} fieldName={'Имя'} inputToChange = {info[1]}></Input>,
                <Input key={3} ref={inputThreeRef} fieldName={'Фамилия'} inputToChange = {info[2]}></Input>,
                <Input key={4} ref={inputFourRef} fieldName={'Роль'} inputToChange = {info[3]}></Input>,
                <SubmitCreate text={'ИЗМЕНИТЬ'} onClick={handleUserChange}></SubmitCreate>
                ]}
            ></FieldInput>
        ]
    
    function handleMenuOpen(){
        setIsMenuOpen(!isMenuOpen)
    }
    
    function handleChange(){
        
        setIsMenuOpen(false)
        setIsChangeFieldActive(true)
    }

    function handleChangeClose(){
        setIsChangeFieldActive(false)
    }

    function handleDelete(){
        if(activeButton === 1){
            clientDelete.mutate()
        }
        else if(activeButton === 2){
            doctorDelete.mutate()
        }
        else if(activeButton === 3){
            appointmentDelete.mutate()
        }
        else if(activeButton === 4){
            userDelete.mutate()
        }
    }

    function handleUserChange(ev){
        ev.preventDefault()
        userChange.mutate({
            login: inputOneRef.current.value,
            name: inputTwoRef.current.value,
            surname: inputThreeRef.current.value,
            role: inputFourRef.current.value
        })

        inputOneRef.current.value = ''
        inputTwoRef.current.value = ''
        inputThreeRef.current.value = ''
        inputFourRef.current.value = ''

        setIsChangeFieldActive(false)
    }

    function handleDeleteButton(){
        setIsDeleteOptionsShown(!isDeleteOptionsShown)
    }

    function handleClientChange(ev){
        ev.preventDefault()
        clientChange.mutate(
            {
            fullname: `${inputTwoRef.current.value} ${inputOneRef.current.value} ${inputThreeRef.current.value}`,
            email: inputFourRef.current.value,
            phone_number: phone, 
            date_of_birth: inputDate
            }
        )
        setIsChangeFieldActive(false)
    }

    function handleDoctorChange(ev){
        ev.preventDefault()
        doctorChange.mutate({
            fullname: `${inputTwoRef.current.value} ${inputOneRef.current.value} ${inputThreeRef.current.value}`,
            occupation: inputFourRef.current.value,
            phone_number: phone
        })
        setIsChangeFieldActive(false)
    }

    // function handleAppointmentClick(){
    //     if(activeButton === 1 || activeButton === 4){
    //         setClientId([infoRow.id, `${info[0]}`])
    //     }
    //     else if(activeButton === 2){
    //         setDoctorId([infoRow.id, `${info[0]}`])
    //     }
    //     setIsMenuOpen(false)
    // }

    useEffect(()=>{

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false)
                setIsDeleteOptionsShown(false)
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    })

    function handleDayoffsAdd(ev){
        ev.preventDefault()
        doctorDayOffs.mutate({
            doctor_id: infoRow.id,
            day_of_week: dayOffs.current.value[0],
            start_time: dayOffs.current.value[1][0],
            end_time: dayOffs.current.value[1][1]
        })
    }

    return(
        <>
            { !isDeleted && <tr ref={tableRow} className='tableMain_row'> 
                <td className='tableMain_cell' style={{textAlign: 'center', color: `gray`}}>{rowIndex+1}</td>
                {info.map((item, index )=>{
                    if(activeButton === 2){
                        if(index === 3){
                            return<td className='tableMain_cell' style={item ? {color: 'red'} : {color: 'green'}}>{item ? 'В отпуске' : 'Работает'}</td>
                        }
                        else{
                            return <td className='tableMain_cell'>{item}</td>
                        }
                    }
                    else if(activeButton === 3){
                        if(index === 2){
                            return(
                                <>
                                    <td className='tableMain_cell'>{item.split(':')[1]}</td>
                                    <td className='tableMain_cell'></td>
                                    <td className='tableMain_cell'></td>
                                </>
                            )
                        }
                        else if(index === 4){
                            return <td className='tableMain_cell'>{item.split(':')[1]}</td>
                        }
                        else{
                            return <td className='tableMain_cell'>{item}</td>
                        }
                    }
                    else{
                        return <td className='tableMain_cell'>{item}</td>
                    }
                    }
                )
                }
            <td className='tableMain_cell' ref={lastCell}>
                <div className='table_action_wrapper'>
                    <img src={menu} alt="table-action" onClick={handleMenuOpen} className='table_action_icon'/>
                    <div className={isMenuOpen ? 'popup_menu' : 'closed_menu'} ref={menuRef}>
                        {/* {(activeButton === 1 || activeButton === 2 ) &&
                        <div className='popup_menu_button' onClick={handleAppointmentClick}>
                            <img src={appointment} alt="edit" className='popup_menu_button_icon'/>
                            <div className='popup_menu_button_text'>Запись</div>
                        </div>} */}
                        {!(activeButton === 3)&&<div className='popup_menu_button' onClick={handleChange}>
                            <img src={edit} alt="edit" className='popup_menu_button_icon'/>
                            <div className='popup_menu_button_text'>Изменить</div>
                        </div>}
                        {activeButton === 2 ?
                            <div className='popup_menu_button' onClick={()=>setIsDayoffsActive(true)}>
                                <img src={weekend} alt="edit" className='popup_menu_button_icon' style={{marginLeft: '9px'}}/>
                                <div className='popup_menu_button_text'>Выходные</div>
                            </div> : <div></div>
                        }
                        <div className='popup_menu_button' onClick={handleDeleteButton}>
                            <img src={deleteIcon} alt="delete" className='popup_menu_button_icon' style={{marginLeft: '10px'}}/>
                            <div className='popup_menu_button_text'>{isDeleteOptionsShown ? 'Удалить?' : 'Удалить'}</div>
                            {
                                isDeleteOptionsShown && <>
                                <div className='delete_option' id='delete'><img src={check} alt="check" onClick={handleDelete}/></div>
                                <div className='delete_option' id='cancel' onClick={handleDeleteButton}>
                                    <img src={cross} alt="cross" /></div></> 
                            }
                        </div>
                    </div>
                </div>
            </td>
            </tr>}

            {isChangeFieldActive && 
            <div className='dataHeader_create_field_background' onMouseDown={handleChangeClose}>
                <div className='dataHeader_create_field' onMouseDown={(ev)=>ev.stopPropagation()}>
                    {activeButton === 4 ? changeFelds[2] : changeFelds[activeButton-1]}
                </div>
            </div>}

            {isDayoffsActive && 
                <div className='dataHeader_create_field_background' onClick={()=>setIsDayoffsActive(false)}>
                <div className='dataHeader_create_field' onClick={(ev)=>ev.stopPropagation()}>
                    <FieldInput inputFieldName={'Добавление выходных'}
                        setIsActive={setIsDayoffsActive}
                        inputs={[<VacationDates ref={dayOffs}></VacationDates>,
                        <SubmitCreate text={'Добавить'} onClick={handleDayoffsAdd}></SubmitCreate>]}
                    ></FieldInput>
                </div>
            </div>
            }

        </>
    )
}

export default TableMain