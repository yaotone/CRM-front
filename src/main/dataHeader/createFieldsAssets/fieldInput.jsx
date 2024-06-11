import { memo } from 'react'
import './fieldInput.css'
import close from '../../../icons/close.svg'

const FieldInput = memo(function FieldInput({inputFieldName, setIsActive, inputs, error}){

    function handleClick(){
        setIsActive(false)
    }

    
    return(
        <form>
            <div className='fieldInput_container'>
                <div className='fieldInput_header'>
                    <div className='fieldInput_header_name'>{inputFieldName}</div>
                    <div className='fieldInput_header_close' onClick={handleClick}
                    style={{backgroundImage: `url(${close})`}}></div>
                </div>
                <div className='fieldInput_horizontal'></div>
                {error && <div className='fieldInput_error_container'>
                    <div className='fieldInput_error'>{error}</div>
                </div>}
                {inputs.map((item)=>{
                    return item
                })}
            </div>
        </form>
    )
})

export default FieldInput