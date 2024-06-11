import './dateTime.css'
import React, { useEffect, useRef, useState } from 'react'

function DateTime({}, ref){

    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    useEffect(()=>{
        ref.current.value = [date, time]
    })
    
    return(
        <>
            <div className='dateTime_header'>Дата и время</div>
            <div className='dateTime_container'>
                <input type = 'date' 
                    className='dateTime_input' 
                    value={date} 
                    onChange={(ev)=>setDate(ev.target.value)} 
                    min={new Date().toISOString().split('T')[0]}
                ></input>
                <input 
                    type = 'time' 
                    className='dateTime_input' 
                    value={time} 
                    onChange={(ev)=>setTime(ev.target.value)}
                ></input>
            </div>
        </>
    )
}

export default React.forwardRef(DateTime)