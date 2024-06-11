import React, { memo, useState } from 'react'
import './input.css'

// {fieldName, value, setValue}

const Input = memo(React.forwardRef(function Input({fieldName, inputToChange, placeholder, description, type, pattern, required}, 
    ref){

    const [value, setValue] = useState(inputToChange || '')

    function handleChange(event){
        const value = event.target.value;
        // if (pattern && !value.match(pattern)) return '';
        setValue(value);
        ref.current.value = value;
    }


    return(
        <>
            {!placeholder && <div className='fieldInput_name'>{fieldName}</div>}
            {inputToChange ? <input className='fieldInput_input' value={value} onChange={handleChange} ref={ref} defaultValue={inputToChange}></input> :
            <input pattern={pattern} value={value} onChange={handleChange} type={type ? type : 'text'} className='fieldInput_input'
            ref={ref} placeholder={placeholder ? placeholder : ''}></input>}
            {description && <div className='fieldInput_description'>{description}</div>}
        </>
    )
}))

export default Input