import React, { memo } from 'react'
import './input.css'

// {fieldName, value, setValue}

const Input = memo(React.forwardRef(function Input({fieldName, inputToChange}, 
    ref){

    return(
        <>
            <div className='fieldInput_name'>{fieldName}</div>
            {inputToChange ? <input className='fieldInput_input' ref={ref} defaultValue={inputToChange}></input> :
            <input className='fieldInput_input' ref={ref}></input>}
        </>
    )
}))

export default Input