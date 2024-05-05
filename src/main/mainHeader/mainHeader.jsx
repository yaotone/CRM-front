import './mainHeader.css'
import { memo } from 'react'
import admin from '../../icons/admin.png'
import exit from '../../icons/exit.png'

const MainHeader = memo(function MainHeader({adminName}){
    return(
        <div className='main_header'>
            <div className='header_admin_img' style={{backgroundImage: `url(${admin})`}}></div>
            <div className='header_admin_name'>{adminName}</div>
            <div className='header_exit' style={{backgroundImage: `url(${exit})`}}></div>
        </div>
    )
})

export default MainHeader