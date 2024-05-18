import './sidebar.css'
import SidebarButton from './sidebarButon/sidebarButton'
import client from '../icons/client-white.png'
import clientViolet from '../icons/client-violet.png'
import doctor from '../icons/doctor-white.png'
import doctorViolet from '../icons/doctor-violet.png'
import edit from '../icons/edit-white.png'
import editViolet from '../icons/edit-violet.png'

export default function Sidebar({active, setActive}){
    return(
        <div className='sidebar_container'>
            <div className='sidebar_company_name'>Саблезубые волки</div>

            <div className='sidebarButtons_container'>
                <SidebarButton buttonIcon={client} buttonAlternativeIcon={clientViolet} buttonName={'Клиенты'} isActive={active === 1} setActive={setActive} buttonId={1}></SidebarButton>
                <SidebarButton buttonIcon={doctor} buttonAlternativeIcon={doctorViolet} buttonName={'Врачи'} isActive={active === 2} setActive={setActive} buttonId={2}></SidebarButton>
                <SidebarButton buttonIcon={edit} buttonAlternativeIcon={editViolet} buttonName={'Записи'} isActive={active === 3} setActive={setActive} buttonId={3}></SidebarButton>
            </div>
        </div>
    )
}