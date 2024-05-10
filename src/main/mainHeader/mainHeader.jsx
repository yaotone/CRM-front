import './mainHeader.css'
import { memo } from 'react'
import admin from '../../icons/admin.png'
import exit from '../../icons/exit.png'
import enter from '../../icons/enter.png'

const MainHeader = memo(function MainHeader({adminName, activeButton}){
    return(
        <div className='main_header'>
            {adminName && <div className='header_admin_img' style={{backgroundImage: `url(${admin})`}}></div>}
            {adminName && <div className='header_admin_name'>{adminName}</div>}
            <div className='header_exit' style={adminName ? {backgroundImage: `url(${exit})`} : {backgroundImage: `url(${enter})`}}></div>
        </div>
    )
})

export default MainHeader