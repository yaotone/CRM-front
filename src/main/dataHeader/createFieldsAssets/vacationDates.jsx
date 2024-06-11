import './vacationDates.css'
import React, { useEffect, useState } from 'react'

function VacationDates({}, ref){

    const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

    const [dates, setDates] = useState()
    const [times, setTimes] = useState([])

    // function handleDayDelete(index){
    //     let newDates = dates.filter(number => number !== index)
    //     setDates(newDates)
    // }

    function handleDayDelete(index){

    }

    // function handleDayClick(index){
    //     setDates([...dates, index])
    // }
    function handleDayClick(index){
        setDates(index)
    }

    useEffect(()=>{
        ref.current.value = [dates, times]
    })

    return(
        <>
            <div className='VacationDates_name'>Рабочие дни</div>
            <div className='VacationDates_container'>
                {/* <input type="date" className='VacationDates_input' value={date}
                onChange={(ev)=>handleDateChange(ev)}/>
                {dates.map((item, index)=>{
                    return <div key={index} className='VacationDates_date' onClick={()=>handleDateDelete(index)}>{item}</div>
                })} */}
                {
                    daysOfWeek.map((item, index)=>{
                        return dates === index+1 ?
                            <div className='VacationDates_date active_day' onClick={()=>handleDayDelete(index+1)}>{item}</div> :
                            <div className='VacationDates_date' onClick={()=>handleDayClick(index+1)}>{item}</div>
                    })
                }
            </div>
            <div className='VacationDates_name'>Рабочее время</div>
            <div className='VacationDates_time'>
                <div className='VacationDates_left'>
                    <div>C</div>
                    <input type="time" value={times[0]} onChange={(ev)=>setTimes([ev.target.value, times[1]])}/>
                </div>
                <div className='VacationDates_right'>
                    <div>До</div>
                    <input type="time" value={times[1]} onChange={(ev)=>setTimes([times[0], ev.target.value])}/>
                </div>
            </div>
        </>
    )
}

export default React.forwardRef(VacationDates)