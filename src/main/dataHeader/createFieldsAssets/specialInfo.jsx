import './specialInfo.css'
import arrow from '../../../icons/arrow.svg'
import { useState, useRef, useEffect } from 'react'

export default function SpecialInfo({date, gender, setDate, setGender}){

    const dropdown = useRef(null)

    const [isActive, setIsActive] = useState(false)

    function handleUnfold(){
        setIsActive(!isActive)
    }

    function handleDateChange(ev){
        setDate(ev.target.value)
    }

    function hadleGenderClick(ev, gender){
        setGender(gender)
        !(dropdown.current.contains(ev.target) && dropdown.current) && setIsActive(false)
    }

    useEffect(()=>{
        setDate(`${new Date().getFullYear()}-${(new Date().getMonth() < 10) ? '0' : '' }${new Date().getMonth()}-${(new Date().getDate() < 10) ? '0' : ''}${new Date().getDate()}`)
    },[])

    return(
        <div className='specialInfo_container'>
            <div className='specialInfo_gender'>
                <div className='specialInfo_gender_header'>Пол</div>
                <div className='specialInfo_gender_input_container' onClick={handleUnfold}>
                    <div className='gender_dropdown_choosed'>{gender}</div>
                    <div className='gender_dropdown_icon' 
                    style={isActive ? {backgroundImage: `url(${arrow})`, transform: `rotate(270deg)`} : {backgroundImage: `url(${arrow})`}}></div>
                    <div className='genders_to_choose' style={!isActive ? 
                    {top: `25px`, opacity: `0`, visibility: `hidden`} : 
                    {top: `30px`, opacity: `1`, visibility: `visible`}}
                    ref={dropdown}>
                        <div className='choose_gender' onClick={(ev)=>hadleGenderClick(ev, 'М')}>M</div>
                        <div className='choose_gender' onClick={(ev)=>hadleGenderClick(ev, 'Ж')}>Ж</div>
                    </div>
                </div>
            </div>
            <div className='specialInfo_birth'>
                <div className='specialInfo_birth_header'>Дата рождения</div>
                <input type='date' className='specialInfo_birth_input' value={date} onChange={handleDateChange}></input>
            </div>
        </div>
    )
}