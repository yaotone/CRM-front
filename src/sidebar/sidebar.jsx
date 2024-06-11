import './sidebar.css'
import SidebarButton from './sidebarButon/sidebarButton'
import client from '../icons/client-white.png'
import clientViolet from '../icons/client-violet.png'
import doctor from '../icons/doctor-white.png'
import doctorViolet from '../icons/doctor-violet.png'
import edit from '../icons/edit-white.png'
import editViolet from '../icons/edit-violet.png'
import user from '../icons/user-white.png'
import userViolet from '../icons/user-violet.png'

export default function Sidebar({active, setActive}){
    return(
        <div className='sidebar_container'>
            <div className='sidebar_company_name'>CRM</div>

            <div className='sidebarButtons_container'>
                <SidebarButton buttonIcon={client} buttonAlternativeIcon={clientViolet} buttonName={'Клиенты'} isActive={active === 1} setActive={setActive} buttonId={1}></SidebarButton>
                <SidebarButton buttonIcon={doctor} buttonAlternativeIcon={doctorViolet} buttonName={'Врачи'} isActive={active === 2} setActive={setActive} buttonId={2}></SidebarButton>
                <SidebarButton buttonIcon={edit} buttonAlternativeIcon={editViolet} buttonName={'Записи'} isActive={active === 3} setActive={setActive} buttonId={3}></SidebarButton>
                <SidebarButton buttonIcon={user} buttonAlternativeIcon={userViolet} buttonName={'Пользователи'} isActive={active === 4} setActive={setActive} buttonId={4}></SidebarButton>
            </div>
        </div>
    )
}