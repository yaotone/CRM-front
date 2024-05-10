import React, { memo } from 'react'
import './input.css'

// {fieldName, value, setValue}

const Input = memo(React.forwardRef(function Input({fieldName}, ref){

    return(
        <>
        <div className='fieldInput_name'>{fieldName}</div>
        <input className='fieldInput_input' ref={ref}></input>
        </>
    )
}))

export default Input