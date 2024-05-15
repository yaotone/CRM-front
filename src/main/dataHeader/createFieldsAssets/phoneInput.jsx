import { memo, useEffect, useState } from 'react'
import './phoneInput.css'

const PhoneInput = memo(function Phoneinput({setNum}){

    const [num2, setNum2] = useState('');
    const [num3, setNum3] = useState('');
    const [num4, setNum4] = useState('');
    const [num5, setNum5] = useState('');
    const [num6, setNum6] = useState('');
    const [num7, setNum7] = useState('');
    const [num8, setNum8] = useState('');
    const [num9, setNum9] = useState('');
    const [num10, setNum10] = useState('');
    const [num11, setNum11] = useState('');

    function handleInput(evt, setNum){
        let charCode = evt.target.value.charCodeAt(0);
        if(!(charCode > 31 && (charCode < 48 || charCode > 57))) {
            setNum(evt.target.value)
            charCode && evt.target.nextSibling?.focus()
        } 
        else{setNum('')} ;
    }  

    function handleKeyDown(ev){
        let value = ev.target.value;
        !value && (ev.keyCode === 8 && ev.target.previousSibling.focus())
    }

    useEffect(()=>{
        setNum(`+8${num2}${num3}${num4}${num5}${num6}${num7}${num8}${num9}${num10}${num11}`)
    })

    return(
        <>
        <div className='PhoneInput_header'>Номер телефона</div>
        <div className='PhoneInput_container'>
            <div className='PhoneInput_plus'>+8</div>


            <input className='PhoneInput_number_input' maxLength={1} onInput={(ev)=>handleInput(ev,setNum2)} value={num2} onKeyDown={handleKeyDown}></input>
            <input className='PhoneInput_number_input' maxLength={1} onInput={(ev)=>handleInput(ev,setNum3)} value={num3} onKeyDown={handleKeyDown}></input>
            <input className='PhoneInput_number_input' maxLength={1} id='spacing' onInput={(ev)=>handleInput(ev,setNum4)} value={num4} onKeyDown={handleKeyDown}></input>

            <input className='PhoneInput_number_input' maxLength={1} onInput={(ev)=>handleInput(ev,setNum5)} value={num5} onKeyDown={handleKeyDown}></input>
            <input className='PhoneInput_number_input' maxLength={1} onInput={(ev)=>handleInput(ev,setNum6)} value={num6} onKeyDown={handleKeyDown}></input>
            <input className='PhoneInput_number_input' maxLength={1} id='spacing' onInput={(ev)=>handleInput(ev,setNum7)} value={num7} onKeyDown={handleKeyDown}></input>

            <input className='PhoneInput_number_input' maxLength={1} onInput={(ev)=>handleInput(ev,setNum8)} value={num8} onKeyDown={handleKeyDown}></input>
            <input className='PhoneInput_number_input' maxLength={1} id='spacing' onInput={(ev)=>handleInput(ev,setNum9)} value={num9} onKeyDown={handleKeyDown}></input>

            <input className='PhoneInput_number_input' maxLength={1} onInput={(ev)=>handleInput(ev,setNum10)} value={num10} onKeyDown={handleKeyDown}></input>
            <input className='PhoneInput_number_input' maxLength={1} onInput={(ev)=>handleInput(ev,setNum11)} value={num11} onKeyDown={handleKeyDown}></input>
        </div>
        </>
    )
})

export default PhoneInput