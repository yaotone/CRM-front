import './tableMain.css'
import menu from '../../icons/menu.png'
import { useState, useRef, useEffect } from 'react';
import deleteIcon from '../../icons/delete.png'
import edit from '../../icons/edit-line.png'
import check from '../../icons/check.svg'
import cross from '../../icons/white-cross.svg'

import FieldInput from '../dataHeader/createFieldsAssets/fieldInput';
import Input from '../dataHeader/createFieldsAssets/input';
import PhoneInput from '../dataHeader/createFieldsAssets/phoneInput';
import SpecialInfo from '../dataHeader/createFieldsAssets/specialInfo';
import SubmitCreate from '../dataHeader/createFieldsAssets/submitCreate';

function TableMain({infoRow, indexes, colors, notChangeable, rowIndex, activeButton}){
    let colorIndex = -1;
    let info =[]

    const [isChangeFieldActive, setIsChangeFieldActive] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDeleteOptionsShown, setIsDeleteOptionsShown] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)
    const [phone, setPhone] = useState('')
    const [inputGender, setInputGender] = useState('')
    const [inputDate, setInputDate] = useState('')

    const menuRef = useRef(null)
    const tableRow = useRef(null)
    const lastCell = useRef(null)

    const inputOneRef = useRef(null)
    const inputTwoRef = useRef(null)
    const inputThreeRef = useRef(null)

    for (let key in infoRow){
        info.push(infoRow[key])
    }

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
        setIsDeleted(true)
    }

    function handleDeleteButton(){
        setIsDeleteOptionsShown(!isDeleteOptionsShown)
    }

    function handleDoneChange(){
        console.log(inputOneRef.current.value, inputTwoRef.current.value, inputThreeRef.current.value, phone, inputGender, inputDate)
    }

    useEffect(()=>{

        indexes?.includes(0) && (colorIndex += 1)

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

    return(
        <>
            { !isDeleted && <tr ref={tableRow} className='tableMain_row'> 

                {
                    indexes?.includes(0) ? <td className='tableMain_cell' style={{textAlign: 'center', color: `gray`}}>{rowIndex+1}</td> :
                    <td className='tableMain_cell' style={{textAlign: 'center'}}>{rowIndex+1}</td>
                }   

                {info.map((item, index )=>{
                    if(indexes?.includes(index+1)){ 
                        colorIndex += 1
                        return <td style = {{color: `${colors[colorIndex]}`}} className='tableMain_cell'>{item}</td>}
                    else{
                        return <td className='tableMain_cell'>{item}</td>}
                    }
                )
            }
            <td className='tableMain_cell' ref={lastCell}>
                <div className='table_action_wrapper'>
                    <img src={menu} alt="table-action" onClick={handleMenuOpen} className='table_action_icon'/>
                    <div className={isMenuOpen ? 'popup_menu' : 'closed_menu'} ref={menuRef}>
                        <div className='popup_menu_button' onClick={handleChange}>
                            <img src={edit} alt="edit" className='popup_menu_button_icon'/>
                            <div className='popup_menu_button_text'>Изменить</div>
                        </div>
                        <div className='popup_menu_button' onClick={handleDeleteButton}>
                            <img src={deleteIcon} alt="delete" className='popup_menu_button_icon'/>
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
            <div className='dataHeader_create_field_background' onClick={handleChangeClose}>
                <div className='dataHeader_create_field' onClick={(ev)=>ev.stopPropagation()}>
                    <FieldInput inputFieldName={'Редактирование'}
                        setIsActive={setIsChangeFieldActive}
                        inputs={[<Input key={1} ref={inputOneRef} fieldName={'Фамилия'} inputToChange = {info[1]}></Input>,
                        <Input key={2} ref={inputTwoRef} fieldName={'Имя'} inputToChange = {info[0]}></Input>,
                        <Input key={3} ref={inputThreeRef} fieldName={'Отчество'} inputToChange = {info[2]}></Input>,
                        <PhoneInput setNum = {setPhone} phoneToChange={info[4]}></PhoneInput>,
                        <SpecialInfo gender={inputGender} setGender={setInputGender} genderToChange = {info[5]}
                        date={inputDate} setDate={setInputDate} dateToChage={info[6]}/>,
                        <SubmitCreate text={'ИЗМЕНИТЬ'} onClick={handleDoneChange}></SubmitCreate>
                    ]}
                    ></FieldInput>
                </div>
            </div>}
        </>
    )
}

export default TableMain