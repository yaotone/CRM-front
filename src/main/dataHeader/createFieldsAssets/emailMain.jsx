import React from 'react'
import './emailMain.css'

const EmailMain = React.forwardRef(function EmailMain({},ref){
    return(
        <>
            <textarea type="text" className='EmailMain_input' placeholder='Сообщение' ref={ref}/>
        </>
    )
})

export default EmailMain