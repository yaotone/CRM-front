import './main.css'
import MainHeader from './mainHeader/mainHeader'

export default function Main({children}){
    return(
        <div className='main_container'>
            <MainHeader ></MainHeader>
            {children}
        </div>
    )
}