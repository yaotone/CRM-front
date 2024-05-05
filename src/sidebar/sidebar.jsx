import './sidebar.css'
import SidebarButton from './sidebarButon/sidebarButton'
import client from '../icons/client.png'
import doctor from '../icons/doctor.png'
import edit from '../icons/edit.png'

export default function Sidebar({active, setActive}){
    return(
        <div className='sidebar_container'>
            <div className='sidebar_company_name'>Саблезубые волки</div>

            <div className='sidebarButtons_container'>
                <SidebarButton buttonIcon={client} buttonName={'Клиенты'} isActive={active === 1} setActive={setActive} buttonId={1}></SidebarButton>
                <SidebarButton buttonIcon={doctor} buttonName={'Врачи'} isActive={active === 2} setActive={setActive} buttonId={2}></SidebarButton>
                <SidebarButton buttonIcon={edit} buttonName={'Записи'} isActive={active === 3} setActive={setActive} buttonId={3}></SidebarButton>
            </div>
        </div>
    )
}